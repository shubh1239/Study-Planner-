from django.urls import path
from . import views

urlpatterns = [
    path("subjects/",                           views.subjects,       name="subjects"),
    path("generate/",                           views.generate_plan,  name="generate_plan"),
    path("sessions/",                           views.get_sessions,   name="sessions"),
    path("sessions/<int:session_id>/complete/", views.mark_completed, name="mark_completed"),
    path("progress/",                           views.progress,       name="progress"),
    path("progress/daily/",                     views.daily_progress, name="daily_progress"),
    path("timetable/export_pdf/",               views.export_pdf,     name="export_pdf"),
]