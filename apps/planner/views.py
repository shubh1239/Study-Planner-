# planner/views.py
import logging
from datetime import date
from io import BytesIO

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT

from .models import Subject, StudySession
from .serializers import SubjectSerializer, StudySessionSerializer
from .services import generate_timetable
from django.utils import timezone


logger = logging.getLogger(__name__)


@login_required
def home_page(request):
    return render(request, "index.html")


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def subjects(request):
    if request.method == "GET":
        qs = Subject.objects.filter(user=request.user)
        return Response(SubjectSerializer(qs, many=True).data)

    serializer = SubjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── Timetable Generation ──────────────────────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_plan(request):
    result = generate_timetable(request.user)

    response_data = {
        "message":          "Timetable generated successfully",
        "sessions_created": result["sessions_created"],
        "timetable":        result["timetable"],
    }
    if result["skipped_subjects"]:
        response_data["warning"] = (
            f"Skipped subjects with no exam date: "
            f"{', '.join(result['skipped_subjects'])}"
        )

    return Response(response_data, status=status.HTTP_201_CREATED)


# ─── Sessions ─────────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_sessions(request):
    qs = StudySession.objects.filter(
        subject__user=request.user
    ).select_related("subject").order_by("date")

    date_str = request.GET.get("date")
    if date_str:
        qs = qs.filter(date=date_str)

    return Response(StudySessionSerializer(qs, many=True).data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def mark_completed(request, session_id):
    from django.utils import timezone

    session = get_object_or_404(
        StudySession,
        id=session_id,
        subject__user=request.user
    )

    session.completed = True
    session.completed_at = timezone.now()
    session.save(update_fields=["completed", "completed_at"])

    return Response({"message": "Session marked as completed"})

# ─── Progress ─────────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def progress(request):
    qs = StudySession.objects.filter(subject__user=request.user)

    date_str = request.GET.get("date")
    if date_str:
        qs = qs.filter(date=date_str)

    total     = qs.count()
    completed = qs.filter(completed=True).count()
    percent   = round(completed / total * 100, 2) if total else 0

    return Response({
        "date":                date_str or None,
        "total_sessions":      total,
        "completed_sessions":  completed,
        "progress_percentage": percent,
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def daily_progress(request):
    stats = (
        StudySession.objects
        .filter(subject__user=request.user)
        .values("date")
        .annotate(
            total=Count("id"),
            completed=Count("id", filter=Q(completed=True)),
        )
        .order_by("date")
    )

    result = {
        str(row["date"]): {
            "total":      row["total"],
            "completed":  row["completed"],
            "percentage": round(row["completed"] / row["total"] * 100, 2)
                          if row["total"] else 0,
        }
        for row in stats
    }

    return Response(result)


# ─── PDF Export ───────────────────────────────────────────────
@login_required
def export_pdf(request):
    sessions = (
        StudySession.objects
        .filter(subject__user=request.user)
        .select_related("subject")
        .order_by("date")
    )

    buffer = BytesIO()
    doc    = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=20*mm, leftMargin=20*mm,
        topMargin=20*mm,   bottomMargin=20*mm,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Normal"],
        fontSize=24,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#ff6b6b"),
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    sub_style = ParagraphStyle(
        "Sub",
        parent=styles["Normal"],
        fontSize=10,
        fontName="Helvetica",
        textColor=colors.HexColor("#7a6652"),
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Normal"],
        fontSize=13,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#2d2013"),
        spaceBefore=12,
        spaceAfter=6,
    )

    story = []

    # Header
    story.append(Paragraph("📚 StudyBuddy", title_style))
    story.append(Paragraph(f"Study Plan for {request.user.username}", sub_style))
    story.append(Paragraph(f"Generated on {date.today().strftime('%B %d, %Y')}", sub_style))
    story.append(Spacer(1, 6*mm))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#ff6b6b")))
    story.append(Spacer(1, 6*mm))

    # Group sessions by date
    by_date = {}
    for s in sessions:
        key = str(s.date)
        if key not in by_date:
            by_date[key] = []
        by_date[key].append(s)

    if not by_date:
        story.append(Paragraph("No sessions found. Add subjects and generate a plan first!", styles["Normal"]))
    else:
        for date_str, day_sessions in by_date.items():
            # Day header
            try:
                from datetime import datetime
                d = datetime.strptime(date_str, "%Y-%m-%d")
                day_label = d.strftime("%A, %B %d %Y")
            except:
                day_label = date_str

            story.append(Paragraph(f"📅 {day_label}", section_style))

            # Table for this day
            table_data = [["Time Slot", "Subject", "Hours", "Difficulty", "Urgency", "Status"]]

            diff_map   = {1: "Easy", 2: "Medium", 3: "Hard"}
            status_map = {True: "✅ Done", False: "⬜ Pending"}

            for s in day_sessions:
                table_data.append([
                    s.notes or "—",
                    s.subject.name,
                    f"{s.hours_allocated}h",
                    diff_map.get(s.subject.difficulty, "Medium"),
                    s.subject.priority_label,
                    status_map[s.completed],
                ])

            col_widths = [42*mm, 40*mm, 15*mm, 22*mm, 22*mm, 22*mm]
            table = Table(table_data, colWidths=col_widths, repeatRows=1)
            table.setStyle(TableStyle([
                # Header row
                ("BACKGROUND",   (0,0), (-1,0), colors.HexColor("#ff6b6b")),
                ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
                ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
                ("FONTSIZE",     (0,0), (-1,0), 9),
                ("ALIGN",        (0,0), (-1,0), "CENTER"),
                ("BOTTOMPADDING",(0,0), (-1,0), 6),
                ("TOPPADDING",   (0,0), (-1,0), 6),
                # Data rows
                ("FONTNAME",     (0,1), (-1,-1), "Helvetica"),
                ("FONTSIZE",     (0,1), (-1,-1), 8),
                ("ALIGN",        (0,1), (-1,-1), "CENTER"),
                ("ROWBACKGROUNDS",(0,1),(-1,-1), [colors.HexColor("#fff9f4"), colors.white]),
                ("TOPPADDING",   (0,1), (-1,-1), 5),
                ("BOTTOMPADDING",(0,1), (-1,-1), 5),
                # Grid
                ("GRID",         (0,0), (-1,-1), 0.5, colors.HexColor("#f0e6d8")),
                ("ROUNDEDCORNERS", [4]),
            ]))

            story.append(table)
            story.append(Spacer(1, 4*mm))

    # Summary footer
    total     = sessions.count()
    completed = sessions.filter(completed=True).count()
    percent   = round(completed / total * 100) if total else 0

    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#f0e6d8")))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        f"📊 Summary: {completed}/{total} sessions completed ({percent}%)",
        ParagraphStyle("footer", parent=styles["Normal"], fontSize=10,
                       fontName="Helvetica-Bold", textColor=colors.HexColor("#7a6652"),
                       alignment=TA_CENTER)
    ))

    doc.build(story)
    buffer.seek(0)

    response = HttpResponse(buffer, content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename="studybuddy_plan_{request.user.username}.pdf"'
    return response

# ─── Subject Detail (Edit / Delete) ───────────────────────────
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def subject_detail(request, subject_id):
    subject = get_object_or_404(Subject, id=subject_id, user=request.user)

    if request.method == "GET":
        return Response(SubjectSerializer(subject).data)

    if request.method == "PUT":
        serializer = SubjectSerializer(subject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        subject.delete()
        return Response({"message": "Subject deleted"}, status=status.HTTP_204_NO_CONTENT)
    

def focus_page(request):
    subject = request.GET.get("subject", "Study Session")
    return render(request, "focus.html", {"subject": subject})