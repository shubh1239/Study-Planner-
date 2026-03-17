from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Subject, StudySession


class TimetableTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="tester",
            password="testpass123"
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.sub1 = Subject.objects.create(
            user=self.user,
            name="EasySubject",
            exam_date="2099-12-31",
            difficulty=1,
            syllabus_completion=0,
            daily_hours_available=2
        )

        self.sub2 = Subject.objects.create(
            user=self.user,
            name="HardSubject",
            exam_date="2099-12-31",
            difficulty=3,
            syllabus_completion=0,
            daily_hours_available=4
        )

    def test_daily_progress_endpoint(self):
        StudySession.objects.create(
            subject=self.sub1,
            date="2099-01-01",
            hours_allocated=2
        )

        StudySession.objects.create(
            subject=self.sub2,
            date="2099-01-01",
            hours_allocated=4,
            completed=True
        )

        StudySession.objects.create(
            subject=self.sub1,
            date="2099-01-02",
            hours_allocated=2
        )

        response = self.client.get(reverse("daily_progress"))
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIn("2099-01-01", data)
        self.assertEqual(data["2099-01-01"]["total"], 2)
        self.assertEqual(data["2099-01-01"]["completed"], 1)

    def test_progress_with_date_filter(self):
        StudySession.objects.create(
            subject=self.sub1,
            date="2099-05-05",
            hours_allocated=1
        )

        response = self.client.get(reverse("progress") + "?date=2099-05-05")
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data["date"], "2099-05-05")
        self.assertEqual(data["total_sessions"], 1)

    def test_harder_subject_gets_more_weight(self):
        from .services import _compute_subject_weights

        weights = _compute_subject_weights([self.sub1, self.sub2])
        self.assertGreater(weights[self.sub2.id], weights[self.sub1.id])

    def test_unauthenticated_request_blocked(self):
        unauthenticated = APIClient()
        response = unauthenticated.get(reverse("sessions"))
        self.assertEqual(response.status_code, 401)