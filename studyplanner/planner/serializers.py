# planner/serializers.py
from rest_framework import serializers
from datetime import date
from .models import Subject, StudySession


class SubjectSerializer(serializers.ModelSerializer):
    days_left      = serializers.IntegerField(read_only=True)
    is_exam_passed = serializers.BooleanField(read_only=True)
    priority_label = serializers.CharField(read_only=True)

    class Meta:
        model  = Subject
        fields = [
            "id", "name", "exam_date", "difficulty",
            "syllabus_completion", "daily_hours_available",
            "days_left", "is_exam_passed", "priority_label",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_exam_date(self, value):
        if value < date.today():
            raise serializers.ValidationError(
                "Exam date cannot be in the past."
            )
        return value

    def validate_syllabus_completion(self, value):
        if not (0 <= value <= 100):
            raise serializers.ValidationError(
                "Syllabus completion must be between 0 and 100."
            )
        return value

    def validate(self, attrs):
        daily_hours = attrs.get("daily_hours_available", 4.0)
        if daily_hours > 16:
            raise serializers.ValidationError(
                {"daily_hours_available": "More than 16 hours/day is not realistic."}
            )
        return attrs


class StudySessionSerializer(serializers.ModelSerializer):
    subject_name   = serializers.CharField(source="subject.name",           read_only=True)
    subject_id     = serializers.IntegerField(source="subject.id",          read_only=True)
    difficulty     = serializers.IntegerField(source="subject.difficulty",   read_only=True)
    priority_label = serializers.CharField(source="subject.priority_label", read_only=True)

    class Meta:
        model  = StudySession
        fields = [
            "id", "subject", "subject_id", "subject_name",
            "date", "hours_allocated", "difficulty",
            "completed", "completed_at",
            "priority_label", "notes",
        ]
        read_only_fields = ["id", "completed_at"]


class SubjectProgressSerializer(serializers.ModelSerializer):
    total_sessions     = serializers.SerializerMethodField()
    completed_sessions = serializers.SerializerMethodField()
    percent_complete   = serializers.SerializerMethodField()

    class Meta:
        model  = Subject
        fields = [
            "id", "name", "difficulty", "days_left",
            "priority_label", "total_sessions",
            "completed_sessions", "percent_complete",
        ]

    def get_total_sessions(self, obj):
        return obj.sessions.count()

    def get_completed_sessions(self, obj):
        return obj.sessions.filter(completed=True).count()

    def get_percent_complete(self, obj):
        total = self.get_total_sessions(obj)
        if not total:
            return 0.0
        return round(self.get_completed_sessions(obj) / total * 100, 2)