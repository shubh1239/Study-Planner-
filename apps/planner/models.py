from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import date, time


class Subject(models.Model):
    DIFFICULTY_CHOICES = (
        (1, "Easy"),
        (2, "Medium"),
        (3, "Hard"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="subjects"
    )

    name = models.CharField(max_length=100)

    exam_date = models.DateField()

    difficulty = models.IntegerField(
        choices=DIFFICULTY_CHOICES,
        default=2
    )

    syllabus_completion = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    daily_hours_available = models.FloatField(
        default=4.0,
        validators=[MinValueValidator(0.5), MaxValueValidator(16.0)]
    )

    selected_topics = models.JSONField(
        default=list,
        blank=True
    )

    study_start_time = models.TimeField(
        default=time(9, 0)
    )

    study_end_time = models.TimeField(
        default=time(22, 0)
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["exam_date"]
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["exam_date"]),
        ]

    @property
    def days_left(self):
        return max((self.exam_date - date.today()).days, 0)

    @property
    def is_exam_passed(self):
        return self.exam_date < date.today()

    @property
    def priority_label(self):
        if self.days_left <= 3:
            return "Critical"
        if self.days_left <= 7:
            return "High"
        if self.days_left <= 14:
            return "Medium"
        return "Low"

    def __str__(self):
        return f"{self.name} (Exam: {self.exam_date})"


class StudySession(models.Model):

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="sessions"
    )

    date = models.DateField()

    hours_allocated = models.FloatField(
        validators=[MinValueValidator(0.1)]
    )

    completed = models.BooleanField(
        default=False
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    notes = models.TextField(
        blank=True,
        default=""
    )

    class Meta:
        ordering = ["date"]
        indexes = [
            models.Index(fields=["date"]),
            models.Index(fields=["subject"]),
        ]

    def __str__(self):
        status = "Done" if self.completed else "Pending"
        return f"{self.subject.name} | {self.date} | {status}"