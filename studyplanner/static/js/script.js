document.addEventListener("DOMContentLoaded", function () {
    loadSessions();
    initAutocomplete();

    const form = document.getElementById("missionForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const subject    = form.querySelector('input[name="subject"]').value;
        const examDate   = form.querySelector('input[name="exam_date"]').value;
        const diffInput  = form.querySelector('input[name="difficulty"]:checked');
        const difficulty = diffInput ? parseInt(diffInput.value, 10) : 2;

        const btn     = document.getElementById("deployBtn");
        const btnText = btn.querySelector(".btn-text");
        const btnLoad = btn.querySelector(".btn-loading");

        btn.disabled          = true;
        btnText.style.display = "none";
        btnLoad.style.display = "inline";

        try {
            const createRes = await fetch("/api/subjects/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify({
                    name: subject,
                    exam_date: examDate,
                    difficulty: difficulty,
                    syllabus_completion: 0,
                    daily_hours_available: 4,
                }),
            });

            if (!createRes.ok) {
                const err = await createRes.json();
                alert("Oops! " + JSON.stringify(err));
                return;
            }

            const genRes = await fetch("/api/generate/", {
                method: "POST",
                headers: { "X-CSRFToken": getCookie("csrftoken") },
            });

            if (!genRes.ok) { alert("Plan generation failed 😢"); return; }

            const data = await genRes.json();
            if (data.timetable && data.timetable.length > 0) {
                renderTimetable(data.timetable);
            }

            await loadSessions();
            form.reset();

        } catch (err) {
            console.error(err);
        } finally {
            btn.disabled          = false;
            btnText.style.display = "inline";
            btnLoad.style.display = "none";
        }
    });
});


// ── AUTOCOMPLETE ──────────────────────────────────────
const SUBJECTS = [
    "Physics","Chemistry","Biology","Mathematics","Statistics",
    "Calculus","Algebra","Geometry","Trigonometry","Botany",
    "Zoology","Microbiology","Biochemistry","Genetics","Ecology",
    "Astronomy","Earth Science","Environmental Science","Geology","Meteorology",
    "Computer Science","Data Structures","Algorithms","Operating Systems",
    "Database Management","Computer Networks","Cyber Security",
    "Artificial Intelligence","Machine Learning","Deep Learning",
    "Data Science","Web Development","Mobile Development","Cloud Computing",
    "Software Engineering","Computer Architecture","Theory of Computation",
    "Compiler Design","Computer Graphics","Human Computer Interaction",
    "Blockchain","Internet of Things",
    "Python","Java","C Programming","C++","JavaScript","TypeScript",
    "React","Node.js","Django","Flask","Spring Boot","PHP","Ruby",
    "Swift","Kotlin","Go","Rust","SQL","MongoDB",
    "Electrical Engineering","Electronics","Mechanical Engineering",
    "Civil Engineering","Chemical Engineering","Aerospace Engineering",
    "Biomedical Engineering","Industrial Engineering","Structural Engineering",
    "Thermodynamics","Fluid Mechanics","Material Science","Control Systems",
    "Signal Processing","VLSI Design","Embedded Systems","Robotics","Automation",
    "Accountancy","Business Studies","Economics","Microeconomics","Macroeconomics",
    "Finance","Marketing","Management","Human Resource Management",
    "Operations Management","Business Law","Taxation","Auditing",
    "Cost Accounting","Financial Accounting","Investment","Banking",
    "Entrepreneurship","Supply Chain Management","International Business",
    "History","Geography","Political Science","Sociology","Psychology",
    "Philosophy","Anthropology","Archaeology","Public Administration",
    "International Relations","Civics","Social Work","Criminology",
    "Journalism","Mass Communication","Library Science",
    "English","English Literature","Hindi","Hindi Literature","Marathi",
    "Sanskrit","Urdu","French","German","Spanish","Japanese","Chinese",
    "Arabic","Russian","Creative Writing","Communication Skills",
    "Anatomy","Physiology","Pathology","Pharmacology","Nursing",
    "Public Health","Nutrition","Dentistry","Psychiatry","Dermatology",
    "Cardiology","Neurology",
    "Constitutional Law","Criminal Law","Civil Law","Corporate Law",
    "International Law","Contract Law","Property Law","Family Law",
    "Environmental Law","Intellectual Property Law",
    "Fine Arts","Graphic Design","Interior Design","Fashion Design",
    "Architecture","Music","Film Studies","Photography","Animation","UI UX Design",
    "UPSC","JEE Mathematics","JEE Physics","JEE Chemistry",
    "NEET Biology","NEET Physics","NEET Chemistry",
    "CAT Quantitative Aptitude","CAT Verbal Ability","CAT Logical Reasoning",
    "GATE Computer Science","GATE Electronics","GRE","GMAT","IELTS","TOEFL",
    "Aptitude","Logical Reasoning","Verbal Reasoning","Quantitative Reasoning",
    "General Knowledge","Current Affairs"
];

let activeIndex = -1;

function initAutocomplete() {
    const input = document.getElementById("subjectInput");
    const list  = document.getElementById("autocompleteList");
    if (!input || !list) return;

    input.addEventListener("input", function () {
        const val = this.value.trim().toLowerCase();
        list.innerHTML = "";
        activeIndex = -1;

        if (!val) { list.classList.remove("open"); return; }

        const matches = SUBJECTS.filter(s =>
            s.toLowerCase().startsWith(val)
        ).slice(0, 8);

        if (matches.length === 0) { list.classList.remove("open"); return; }

        matches.forEach((subject) => {
            const item = document.createElement("div");
            item.className = "autocomplete-item";

            const highlighted = `<span class="autocomplete-highlight">${subject.slice(0, val.length)}</span>${subject.slice(val.length)}`;
            item.innerHTML = `<i class="fas fa-book"></i> ${highlighted}`;

            item.addEventListener("mousedown", function (e) {
                e.preventDefault();
                input.value = subject;
                list.classList.remove("open");
            });

            list.appendChild(item);
        });

        list.classList.add("open");
    });

    input.addEventListener("keydown", function (e) {
        const items = list.querySelectorAll(".autocomplete-item");
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            input.value = items[activeIndex].textContent.trim();
            list.classList.remove("open");
            activeIndex = -1;
            return;
        } else if (e.key === "Escape") {
            list.classList.remove("open");
            return;
        }

        items.forEach((item, i) => {
            item.classList.toggle("active", i === activeIndex);
        });
    });

    document.addEventListener("click", function (e) {
        if (!input.contains(e.target) && !list.contains(e.target)) {
            list.classList.remove("open");
        }
    });
}


async function loadSessions() {
    try {
        const res = await fetch("/api/sessions/");
        if (!res.ok) return;

        const sessions  = await res.json();
        const total     = sessions.length;
        const completed = sessions.filter(s => s.completed).length;
        const percent   = total ? Math.round(completed / total * 100) : 0;

        document.getElementById("statTotal").textContent   = total;
        document.getElementById("statDone").textContent    = completed;
        document.getElementById("statPercent").textContent = percent + "%";
        document.getElementById("mainProgressBar").style.width = percent + "%";
        document.getElementById("progressLabel").textContent = total
            ? `${completed} of ${total} sessions completed — keep going! 💪`
            : "Start by adding a subject below";

        const list = document.getElementById("missionList");
        list.innerHTML = "";

        const seen     = {};
        const subjects = [];
        sessions.forEach(s => {
            if (!seen[s.subject_id]) {
                seen[s.subject_id] = true;
                subjects.push(s);
            }
        });

        if (subjects.length === 0) {
            list.innerHTML = `
                <li class="mission-empty">
                    <i class="fas fa-seedling"></i>
                    <p>No subjects yet.<br>Add one above to get started! 🌱</p>
                </li>`;
            return;
        }

        subjects.forEach(s => {
            const li = document.createElement("li");
            li.className = "mission-item" + (s.completed ? " done" : "");
            li.setAttribute("data-sid", String(s.subject_id));

            const diffLabel = ["", "Easy", "Medium", "Hard"][s.difficulty || 2];
            const diffClass = ["", "badge-easy", "badge-med", "badge-hard"][s.difficulty || 2];
            const urgClass  = {
                "Critical": "badge-critical",
                "High":     "badge-high",
                "Medium":   "badge-medium",
                "Low":      "badge-low",
            }[s.priority_label] || "badge-low";

            li.innerHTML = `
                <div class="mission-left">
                    <input type="checkbox" class="mission-check"
                        ${s.completed ? "checked" : ""}
                        onchange="markCompleted(${s.id}, this)">
                    <span class="mission-name">${s.subject_name}</span>
                    <span class="badge ${urgClass}">${s.priority_label || "Low"}</span>
                </div>
                <div class="mission-right">
                    <span class="mission-time">${s.notes || ""}</span>
                    <span class="mission-date">${s.date}</span>
                    <span class="badge ${diffClass}">${diffLabel}</span>
                    <button onclick="editSubject(${s.subject_id}, '${s.subject_name}', ${s.difficulty || 2})"
                        class="icon-btn edit-btn" title="Edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button onclick="deleteSubject(${s.subject_id})"
                        class="icon-btn delete-btn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;
            list.appendChild(li);
        });

        const today     = new Date().toISOString().slice(0, 10);
        const todaySess = sessions.filter(s => s.date === today);
        const statusEl  = document.getElementById("scheduleStatus");
        if (statusEl) {
            statusEl.textContent = todaySess.length > 0
                ? `Today: ${todaySess.filter(s => s.completed).length}/${todaySess.length} done 🎯`
                : total > 0 ? `${total} sessions scheduled 📅` : "Awaiting plan ✨";
        }

    } catch (err) {
        console.error("loadSessions error:", err);
    }
}


function renderTimetable(timetable) {
    const container = document.getElementById("timetableContainer");
    const statusEl  = document.getElementById("scheduleStatus");
    container.innerHTML = "";

    const byDate = {};
    timetable.forEach(e => {
        if (!byDate[e.date]) byDate[e.date] = [];
        byDate[e.date].push(e);
    });

    Object.keys(byDate).forEach(dateStr => {
        const entries = byDate[dateStr];
        const group   = document.createElement("div");
        group.className = "day-group";

        group.innerHTML = `
            <div class="day-header">
                <span class="day-pill">${entries[0].day}</span>
                <span class="day-date-text">${dateStr}</span>
                <span class="day-count-text">${entries.length} session${entries.length > 1 ? "s" : ""}</span>
            </div>`;

        entries.forEach(entry => {
            const card     = document.createElement("div");
            card.className = "session-card";

            const diffLabel = ["", "Easy", "Medium", "Hard"][entry.difficulty] || "Medium";
            const diffClass = ["", "badge-easy", "badge-med", "badge-hard"][entry.difficulty] || "badge-med";
            const urgClass  = {
                "Critical": "badge-critical",
                "High":     "badge-high",
                "Medium":   "badge-medium",
                "Low":      "badge-low",
            }[entry.priority] || "badge-low";

            card.innerHTML = `
                <div class="session-main" onclick="toggleSession(this)">
                    <span class="session-time-badge">⏰ ${entry.start_time} → ${entry.end_time}</span>
                    <span class="session-subject-name">${entry.subject}</span>
                    <div class="session-meta">
                        <span class="badge ${urgClass}">${entry.priority}</span>
                        <span class="badge ${diffClass}">${diffLabel}</span>
                        <span class="session-hrs">${entry.hours}h</span>
                        <i class="fas fa-chevron-down session-chevron"></i>
                    </div>
                </div>
                <div class="session-approach">
                    <div class="approach-grid">
                        <div class="approach-box">
                            <h4><i class="fas fa-brain"></i> Approach</h4>
                            <p>${entry.approach}</p>
                        </div>
                        <div class="approach-box">
                            <h4><i class="fas fa-fire"></i> Technique</h4>
                            <p>${entry.technique}</p>
                        </div>
                        <div class="steps-box">
                            <h4><i class="fas fa-list-check"></i> Study Steps for Today</h4>
                            <ul class="steps-list">
                                ${entry.steps.map(s => `<li>${s}</li>`).join("")}
                            </ul>
                        </div>
                    </div>
                </div>`;

            group.appendChild(card);
        });

        container.appendChild(group);
    });

    if (statusEl) {
        statusEl.textContent = `${timetable.length} sessions · ${Object.keys(byDate).length} days 🗓️`;
    }
}


function toggleSession(el) {
    el.closest(".session-card").classList.toggle("open");
}


async function markCompleted(sessionId, checkbox) {
    try {
        const res = await fetch(`/api/sessions/${sessionId}/complete/`, {
            method: "PATCH",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
        });
        if (res.ok) {
            await loadSessions();
        } else {
            checkbox.checked = !checkbox.checked;
        }
    } catch (err) {
        checkbox.checked = !checkbox.checked;
    }
}


async function deleteSubject(subjectId) {
    if (!confirm("Delete this subject? 🗑️")) return;

    const li = document.querySelector(`[data-sid="${String(subjectId)}"]`);
    if (li) {
        li.style.transition = "all 0.3s";
        li.style.opacity    = "0";
        li.style.transform  = "translateX(20px)";
        setTimeout(() => li.remove(), 300);
    }

    document.getElementById("timetableContainer").innerHTML = `
        <div class="empty-schedule">
            <i class="fas fa-calendar-alt"></i>
            <p>Subject deleted! Click <strong>Regenerate</strong><br>to refresh your schedule 🔄</p>
        </div>`;

    setTimeout(() => {
        const remaining = document.querySelectorAll("#missionList .mission-item").length;
        if (remaining === 0) {
            document.getElementById("missionList").innerHTML = `
                <li class="mission-empty">
                    <i class="fas fa-seedling"></i>
                    <p>No subjects yet.<br>Add one above to get started! 🌱</p>
                </li>`;
        }
    }, 350);

    try {
        await fetch(`/api/subjects/${subjectId}/`, {
            method: "DELETE",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
        });
        await loadSessions();
    } catch (err) {
        console.error(err);
        await loadSessions();
    }
}


async function editSubject(subjectId, currentName, currentDiff) {
    const newName = prompt("Subject name:", currentName);
    if (newName === null || newName.trim() === "") return;

    const newDiff = prompt("Difficulty (1=Easy, 2=Medium, 3=Hard):", currentDiff);
    if (newDiff === null) return;

    const li = document.querySelector(`[data-sid="${String(subjectId)}"]`);
    if (li) {
        const nameEl = li.querySelector(".mission-name");
        if (nameEl) nameEl.textContent = newName.trim();
    }

    try {
        const res = await fetch(`/api/subjects/${subjectId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                name: newName.trim(),
                difficulty: parseInt(newDiff),
            }),
        });
        if (res.ok) {
            await loadSessions();
        } else {
            const err = await res.json();
            alert("Update failed: " + JSON.stringify(err));
            await loadSessions();
        }
    } catch (err) {
        console.error(err);
        await loadSessions();
    }
}


async function regeneratePlan() {
    const btn = document.getElementById("regenBtn");
    if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    try {
        const genRes = await fetch("/api/generate/", {
            method: "POST",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
        });

        if (!genRes.ok) { alert("Generation failed 😢"); return; }

        const data = await genRes.json();
        if (data.timetable && data.timetable.length > 0) {
            renderTimetable(data.timetable);
        }
        await loadSessions();
    } catch (err) {
        console.error(err);
    } finally {
        if (btn) btn.innerHTML = '<i class="fas fa-rotate-right"></i> Regenerate';
    }
}


// ── CHART MODAL ───────────────────────────────────────
let chartInstance = null;

async function openChart() {
    document.getElementById("chartModal").classList.add("open");
    await loadChartData();
}

function closeChart(e) {
    if (e && e.target !== document.getElementById("chartModal")) return;
    document.getElementById("chartModal").classList.remove("open");
}

async function loadChartData() {
    try {
        const res = await fetch("/api/sessions/");
        if (!res.ok) return;
        const sessions = await res.json();

        if (sessions.length === 0) return;

        const bySubject = {};
        sessions.forEach(s => {
            if (!bySubject[s.subject_name]) {
                bySubject[s.subject_name] = { total: 0, completed: 0 };
            }
            bySubject[s.subject_name].total++;
            if (s.completed) bySubject[s.subject_name].completed++;
        });

        const names    = Object.keys(bySubject);
        const percents = names.map(n =>
            Math.round(bySubject[n].completed / bySubject[n].total * 100)
        );

        const colors = [
            "#ff6b6b","#52d9a6","#5eb8ff",
            "#ffd166","#a78bfa","#ff8fab",
            "#ffa07a","#47ffd4",
        ];

        const total     = sessions.length;
        const completed = sessions.filter(s => s.completed).length;
        const percent   = total ? Math.round(completed / total * 100) : 0;

        document.getElementById("mStatTotal").textContent   = total;
        document.getElementById("mStatDone").textContent    = completed;
        document.getElementById("mStatPending").textContent = total - completed;
        document.getElementById("mStatPercent").textContent = percent + "%";
        document.getElementById("chartCenterLabel").textContent = percent + "%";

        const ctx = document.getElementById("progressChart").getContext("2d");
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: names,
                datasets: [{
                    data: percents,
                    backgroundColor: colors.slice(0, names.length),
                    borderWidth: 3,
                    borderColor: "#ffffff",
                    hoverOffset: 8,
                }]
            },
            options: {
                cutout: "72%",
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => ` ${ctx.label}: ${ctx.raw}% done`
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 800,
                }
            }
        });

        const barsEl = document.getElementById("subjectBars");
        barsEl.innerHTML = "";
        names.forEach((name, i) => {
            const pct   = percents[i];
            const color = colors[i % colors.length];
            const div   = document.createElement("div");
            div.className = "subject-bar-item";
            div.innerHTML = `
                <div class="subject-bar-top">
                    <span class="subject-bar-name">${name}</span>
                    <span class="subject-bar-pct">${bySubject[name].completed}/${bySubject[name].total} · ${pct}%</span>
                </div>
                <div class="subject-bar-track">
                    <div class="subject-bar-fill" style="width:${pct}%; background:${color};"></div>
                </div>`;
            barsEl.appendChild(div);
        });

    } catch (err) {
        console.error("Chart error:", err);
    }
}


function downloadPlan() {
    window.location.href = "/api/timetable/export_pdf/";
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
}