# 🔥 FocusForge — AI Smart Study Planner

> **Build Discipline. Eliminate Distractions. Execute Consistently.**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)
[![DRF](https://img.shields.io/badge/Django_REST_Framework-3.15-red?style=flat-square)](https://www.django-rest-framework.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

## 🧠 What is FocusForge?

Most students don't fail because they lack knowledge — **they fail because of poor planning and constant distractions.**

FocusForge is a production-grade, AI-powered study planner that solves exactly that. It generates intelligent, **priority-weighted timetables**, tracks your study progress in real time, and includes a **Deep Focus Mode** with live phone detection to keep you locked in.

Built for students who take their work seriously.

---

## ✨ Key Features

### 📅 Smart Scheduling Engine
Automatically generates a full study timetable based on your subjects, exam dates, and difficulty levels. Each session is allocated a specific time slot with an approach strategy and step-by-step study actions.

### ⚡ Priority-Weighted Algorithm
The core algorithm calculates a `priority_score` for each subject using difficulty and time sensitivity, so your schedule always puts the most critical work first.

### 🧠 Study Strategy Engine
Detects the type of subject (Coding, Mathematics, Theory, etc.) and generates a tailored learning approach — not just hours, but *how* to use them.

### 🔴 Deep Focus Mode
A dedicated focus page with live webcam-based **phone detection** powered by TensorFlow.js + COCO-SSD. If you pick up your phone, the system detects it and alerts you instantly. Includes a session timer and distraction counter.

### 📊 Progress Dashboard
Visual doughnut chart with per-subject completion bars. See your overall progress and daily stats at a glance.

### 🔔 Smart Study Reminders
Browser notifications scheduled to fire 30 min, 10 min, 5 min, and exactly when each session starts.

### 🔐 Secure Authentication
Django session-based login/logout with per-user data isolation.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django 6.0 + Django REST Framework |
| Database | SQLite (dev) / PostgreSQL (prod-ready) |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Charts | Chart.js 4.4 |
| AI / Detection | TensorFlow.js + COCO-SSD |
| Fonts & Icons | Google Fonts (Nunito), Font Awesome 6 |
| Config | python-dotenv |

---

## 🏗 Architecture

```
Browser (HTML/CSS/JS)
        │
        ▼
  Django REST API          ← clean separation of concerns
        │
        ▼
  Service Layer            ← scheduling algorithm lives here
  (services.py)
        │
        ▼
   SQLite Database
```

The frontend is fully decoupled from the backend — all communication happens through REST API calls, making the system easy to scale or swap frontends.

---

## 🧮 Core Algorithm

FocusForge uses a **priority-weighted scheduling algorithm** to decide how much time and urgency to assign each subject.

```
priority_score = difficulty_weight × time_sensitivity_factor
```

**Difficulty weights:**

| Level  | Weight |
|--------|--------|
| Easy   | 1.0×   |
| Medium | 2.0×   |
| Hard   | 3.5×   |

**Time sensitivity:**

| Days to Exam | Multiplier |
|---|---|
| ≤ 3 days | 1.5× (Critical) |
| ≤ 7 days | 1.2× (High) |
| > 7 days | 1.0× (Normal) |

**Result:** Urgent + difficult subjects automatically receive more sessions, earlier slots, and a harder study approach. Easier subjects with distant exams are scheduled without panic.

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/subjects/` | List all subjects |
| `POST` | `/api/subjects/` | Add a new subject |
| `PUT` | `/api/subjects/<id>/` | Update subject |
| `DELETE` | `/api/subjects/<id>/` | Delete subject |
| `POST` | `/api/generate/` | Generate timetable |
| `GET` | `/api/sessions/` | Get all sessions |
| `PATCH` | `/api/sessions/<id>/complete/` | Mark session complete |
| `GET` | `/api/progress/` | Overall progress stats |
| `GET` | `/api/timetable/export_pdf/` | Export PDF |

---

## 🗃 Data Model

```
User
 └── Subject
      ├── name
      ├── exam_date
      ├── difficulty          (1=Easy, 2=Medium, 3=Hard)
      ├── syllabus_completion
      ├── selected_topics     (JSON)
      ├── study_start_time
      └── study_end_time
           │
           ▼
      StudySession
        ├── date
        ├── start_time / end_time
        ├── hours_allocated
        ├── priority_label    (Critical / High / Medium / Low)
        ├── approach
        ├── technique
        ├── steps             (JSON)
        └── completed
```

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/focusforge.git
cd focusforge/studyplanner

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
echo "SECRET_KEY=your-secret-key-here" > .env
echo "DEBUG=True" >> .env

# 5. Run migrations
python manage.py migrate

# 6. Create a superuser (optional)
python manage.py createsuperuser

# 7. Start the server
python manage.py runserver
```

Open **http://localhost:8000** and register an account to get started.

---

## 📁 Project Structure

```
focusforge/
├── manage.py
├── requirements.txt
├── .env
│
├── planner/                  ← main app
│   ├── models.py             ← Subject, StudySession
│   ├── serializers.py        ← DRF serializers
│   ├── views.py              ← API views
│   ├── services.py           ← scheduling algorithm
│   ├── urls.py
│   └── tests.py
│
├── studyplanner/             ← project config
│   ├── settings.py
│   └── urls.py
│
├── templates/
│   ├── index.html            ← main dashboard
│   ├── focus.html            ← deep focus mode
│   └── login.html
│
└── static/
    ├── css/style.css
    └── js/script.js
```

---

## 🧪 Running Tests

```bash
python manage.py test planner
```

---

## 🗺 Roadmap

- [x] Priority-weighted timetable generation
- [x] Deep Focus Mode with phone detection
- [x] Progress dashboard with charts
- [x] Browser push notifications
- [x] PDF export
- [ ] AI-powered topic recommendations
- [ ] Mobile app (React Native)
- [ ] Cloud deployment (Render / AWS)
- [ ] Advanced analytics — predicted exam readiness score
- [ ] Collaborative study rooms

---

## 👨‍💻 Author

**Yash Taksale** — Computer Science Engineering

---

> ⭐ If FocusForge helped you, give it a star — it means a lot and helps others find it!