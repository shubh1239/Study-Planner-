import json
from pathlib import Path
import logging
from datetime import date, timedelta, datetime, time
from .models import StudySession

BASE_DIR = Path(__file__).resolve().parent

with open(BASE_DIR / "curriculum.json") as f:
    CURRICULUM = json.load(f)


logger = logging.getLogger(__name__)

DIFFICULTY_MULTIPLIERS = {1: 1.0, 2: 2.0, 3: 3.5}
CONCENTRATION_FACTORS  = [(3, 1.5), (7, 1.2)]

# ── TOPIC-SPECIFIC STEPS ─────────────────────────────
TOPIC_STEPS = {
    "python": {
        "Syntax & Basics":     ["Install Python and setup VS Code", "Variables and data types — int, float, str, bool", "Type conversion and input() function", "Comments and indentation rules"],
        "Strings":             ["String creation and indexing", "String slicing and negative indexing", "String methods — upper, lower, strip, split", "f-strings and format() method"],
        "Lists & Tuples":      ["Create and access lists", "List methods — append, insert, remove, pop", "List slicing and copying", "Tuples — immutability and use cases"],
        "Dictionaries":        ["Create dictionaries and access values", "Dictionary methods — keys, values, items", "Add, update and delete entries", "Iterate through dictionaries"],
        "Loops":               ["for loop with range()", "for loop over lists and strings", "while loop and conditions", "break, continue and pass", "Nested loops and pattern printing"],
        "Functions":           ["Define functions with def", "Parameters and return values", "Default and keyword arguments", "*args and **kwargs", "Lambda functions and map/filter"],
        "OOP":                 ["Classes and objects basics", "Constructor __init__ and self", "Inheritance and super()", "Polymorphism and method overriding", "Encapsulation and dunder methods"],
        "File Handling":       ["Open and read files", "Write and append to files", "Working with CSV files", "Using with statement"],
        "Exception Handling":  ["try/except basics", "Multiple except blocks", "finally and else blocks", "Raise custom exceptions"],
        "Modules":             ["import and from import", "Built-in modules — os, sys, math, random", "Installing packages with pip", "Creating your own module"],
        "List Comprehensions": ["Basic list comprehension syntax", "Conditional list comprehensions", "Dictionary comprehensions", "Generator expressions"],
        "Recursion":           ["Base case and recursive case", "Factorial using recursion", "Fibonacci sequence recursively", "When recursion vs loops"],
        "Projects":            ["Build a calculator", "Build a to-do list CLI", "Number guessing game", "Simple contact book"],
    },
    "java": {
        "Basics":             ["JDK setup and Hello World", "Variables, data types and type casting", "Operators and expressions", "Control flow — if/else, switch", "Loops — for, while, do-while"],
        "OOP":                ["Classes and objects", "Constructors and this keyword", "Inheritance and super keyword", "Method overloading and overriding", "Abstract classes and interfaces"],
        "Arrays & Strings":   ["1D array declaration and iteration", "2D arrays and matrix operations", "String class and methods", "StringBuilder for mutable strings"],
        "Collections":        ["ArrayList — add, remove, iterate", "LinkedList operations", "HashMap — key-value pairs", "HashSet for unique elements"],
        "Exception Handling": ["try/catch/finally basics", "Checked vs unchecked exceptions", "throw and throws keywords", "Custom exception classes"],
        "File I/O":           ["FileReader and FileWriter basics", "BufferedReader for efficient reading", "BufferedWriter for writing", "Serialization basics"],
        "Multithreading":     ["Thread class and Runnable interface", "Creating and starting threads", "synchronized keyword", "wait and notify"],
        "Java 8 Features":    ["Lambda expressions syntax", "Functional interfaces", "Stream API — filter, map, collect", "Method references"],
        "Projects":           ["Bank account system", "Student management with ArrayList", "Calculator with OOP", "File-based inventory system"],
    },
    "javascript": {
        "Basics":           ["Variables — var, let, const", "Data types and typeof", "Operators and expressions", "Conditionals — if/else, ternary", "Loops — for, while, for...of"],
        "DOM":              ["Select elements — getElementById, querySelector", "Modify text — textContent, innerHTML", "Change CSS styles with JS", "Add/remove CSS classes", "Create and append elements"],
        "Functions":        ["Function declarations vs expressions", "Arrow functions syntax", "Default parameters", "Closures and lexical scope", "Higher order functions"],
        "Arrays & Objects": ["Array methods — map, filter, reduce", "find, some, every", "Object destructuring", "Spread and rest operators"],
        "Async JS":         ["Promises — then, catch, finally", "async/await syntax", "Fetch API GET request", "POST request with fetch", "Error handling in async"],
        "ES6+":             ["Template literals", "Modules — import and export", "Classes and OOP in JS", "Optional chaining ?."],
        "Projects":         ["Todo app", "Quiz app", "Weather app using fetch", "Expense tracker"],
    },
    "c programming": {
        "Basics":           ["GCC setup and Hello World", "Variables, data types, format specifiers", "Arithmetic operators", "Input with scanf, output with printf"],
        "Control Flow":     ["if/else and nested conditions", "switch/case", "for, while, do-while loops", "break and continue"],
        "Functions":        ["Function declaration and definition", "Pass by value", "Recursive functions"],
        "Arrays & Strings": ["1D array and iteration", "2D arrays", "String functions — strlen, strcpy"],
        "Pointers":         ["Pointer declaration and dereferencing", "Pointer arithmetic", "Pointers as function parameters"],
        "Structures":       ["struct declaration", "Array of structures", "typedef"],
        "File Handling":    ["fopen and fclose", "fscanf and fprintf", "Binary file operations"],
        "Data Structures":  ["Linked list — node creation", "Stack using arrays", "Queue using arrays"],
    },
    "data structures": {
        "Arrays":          ["Array basics", "Insertion and deletion", "Linear and binary search", "Sorting arrays"],
        "Linked Lists":    ["Singly linked list", "Insert and delete", "Reverse a linked list", "Doubly linked list"],
        "Stacks & Queues": ["Stack — push and pop", "Balanced parentheses", "Queue — enqueue and dequeue", "Circular queue"],
        "Trees":           ["Binary tree node structure", "Inorder, preorder, postorder", "BST operations", "Level order traversal"],
        "Graphs":          ["Adjacency matrix and list", "BFS traversal", "DFS traversal", "Cycle detection"],
        "Hashing":         ["Hash function basics", "Collision — chaining", "Open addressing"],
        "Sorting":         ["Bubble and selection sort", "Merge sort", "Quick sort", "Time complexity comparison"],
        "Searching":       ["Linear search", "Binary search iterative", "Binary search recursive"],
    },
    "machine learning": {
        "Python for ML":      ["NumPy arrays and operations", "Pandas DataFrames", "Matplotlib plots", "Scikit-learn overview"],
        "Data Preprocessing": ["Handle missing values", "Encode categorical variables", "Feature scaling", "Train/test split"],
        "Regression":         ["Linear regression theory", "Implement with sklearn", "Evaluate — MSE, R²"],
        "Classification":     ["Logistic regression", "Decision tree", "Random forest", "SVM basics"],
        "Clustering":         ["K-means algorithm", "Elbow method", "Hierarchical clustering"],
        "Neural Networks":    ["Perceptron and activation functions", "Feedforward network with Keras", "Train and evaluate"],
        "Model Evaluation":   ["Confusion matrix", "Precision, recall, F1", "Cross validation"],
        "Projects":           ["House price prediction", "Spam classifier", "Customer segmentation"],
    },
    "web development": {
        "HTML":       ["Document structure and tags", "Forms and semantic elements"],
        "CSS":        ["Selectors and box model", "Flexbox", "Grid", "Responsive design"],
        "JavaScript": ["DOM manipulation", "Event listeners", "Fetch API"],
        "React":      ["Components and props", "useState and useEffect", "React Router"],
        "Node.js":    ["Express server", "Routes", "Connect to MongoDB"],
        "Databases":  ["SQL basics", "MongoDB CRUD", "Mongoose schema"],
        "Git":        ["git init, add, commit", "Branching and merging", "GitHub push/pull"],
        "Deployment": ["Vercel frontend", "Render backend", "Environment variables"],
    },
    "react": {
        "JSX & Components":  ["JSX syntax", "Functional components", "Conditional rendering"],
        "Props & State":     ["Passing props", "useState basics", "Lifting state up"],
        "Hooks":             ["useEffect — fetch on mount", "useContext", "Custom hooks"],
        "Routing":           ["BrowserRouter and Routes", "useParams", "useNavigate"],
        "State Management":  ["Context API", "Redux Toolkit — createSlice", "useSelector"],
        "API Calls":         ["fetch in useEffect", "Axios GET and POST", "Loading and error states"],
        "Performance":       ["React.memo", "useMemo", "useCallback"],
        "Projects":          ["Todo app", "Weather dashboard", "Full stack with Django"],
    },
    "sql": {
        "Basics":              ["CREATE TABLE", "INSERT, UPDATE, DELETE", "SELECT and WHERE"],
        "Filtering & Sorting": ["AND, OR, NOT", "LIKE and wildcards", "ORDER BY and LIMIT"],
        "Joins":               ["INNER JOIN", "LEFT and RIGHT JOIN", "Self join"],
        "Aggregation":         ["COUNT, SUM, AVG", "GROUP BY", "HAVING clause"],
        "Subqueries":          ["Subquery in WHERE", "Correlated subqueries", "EXISTS"],
        "Advanced SQL":        ["Views", "Indexes", "Window functions"],
        "Database Design":     ["Primary and foreign keys", "One-to-many", "Normalization"],
        "Projects":            ["Library system", "E-commerce queries", "Student results"],
    },
    "physics": {
        "Mechanics":           ["Kinematics — equations of motion", "Newton's laws", "Work, energy, power", "Conservation of momentum"],
        "Thermodynamics":      ["Heat transfer", "First law of thermodynamics", "Second law and entropy"],
        "Waves & Sound":       ["Wave properties", "Doppler effect", "Resonance"],
        "Electrostatics":      ["Coulomb's law", "Electric field and potential", "Capacitors"],
        "Current Electricity": ["Ohm's law", "Resistors in series and parallel", "Kirchhoff's laws"],
        "Magnetism":           ["Magnetic field", "Force on moving charge", "Faraday's law"],
        "Optics":              ["Reflection and mirror formula", "Refraction and Snell's law", "Lens formula"],
        "Modern Physics":      ["Photoelectric effect", "Bohr model", "Radioactivity"],
    },
    "chemistry": {
        "Atomic Structure":    ["Subatomic particles", "Bohr model", "Quantum numbers", "Periodic trends"],
        "Chemical Bonding":    ["Ionic bonding", "Covalent bonding", "VSEPR theory", "Hybridization"],
        "States of Matter":    ["Kinetic molecular theory", "Gas laws", "Ideal gas equation"],
        "Thermochemistry":     ["Enthalpy", "Hess's law", "Gibbs free energy"],
        "Equilibrium":         ["Dynamic equilibrium", "Le Chatelier's principle", "Buffer solutions"],
        "Electrochemistry":    ["Redox reactions", "Galvanic cell", "Electrolysis"],
        "Organic Chemistry":   ["IUPAC nomenclature", "Functional groups", "Alkanes and alkenes"],
        "Reaction Mechanisms": ["SN1 and SN2", "Electrophilic addition", "Elimination reactions"],
    },
    "mathematics": {
        "Algebra":             ["Polynomials and factoring", "Quadratic equations", "AP and GP", "Logarithms"],
        "Trigonometry":        ["Trig ratios", "Pythagorean identities", "Compound angle formulas"],
        "Coordinate Geometry": ["Distance and midpoint", "Straight lines", "Circles", "Parabola"],
        "Calculus":            ["Limits and continuity", "Differentiation rules", "Maxima and minima", "Integration"],
        "Vectors":             ["Vector addition", "Dot product", "Cross product"],
        "Matrices":            ["Matrix operations", "Determinant", "Inverse matrix"],
        "Probability":         ["Basic probability", "Conditional probability", "Bayes theorem"],
        "Statistics":          ["Mean, median, mode", "Variance and SD", "Correlation"],
    },
    "biology": {
        "Cell Biology":      ["Prokaryote vs eukaryote", "Cell organelles", "Mitosis", "Meiosis"],
        "Genetics":          ["Mendel's laws", "Monohybrid cross", "Sex-linked traits"],
        "Molecular Biology": ["DNA structure", "DNA replication", "Transcription", "Translation"],
        "Human Physiology":  ["Digestive system", "Circulatory system", "Respiratory system", "Excretory system"],
        "Plant Biology":     ["Photosynthesis — light reactions", "Calvin cycle", "Plant hormones"],
        "Ecology":           ["Ecosystem components", "Food chains", "Energy flow"],
        "Evolution":         ["Darwin's natural selection", "Speciation", "Hardy-Weinberg"],
        "Biotechnology":     ["Recombinant DNA", "PCR", "CRISPR basics"],
    },
    "history": {
        "Ancient History":     ["Indus Valley Civilization", "Mauryan Empire", "Gupta Empire"],
        "Medieval History":    ["Delhi Sultanate", "Mughal Empire", "Maratha Empire"],
        "Modern History":      ["British East India Company", "1857 revolt", "Social reforms"],
        "Indian Independence": ["Non-cooperation movement", "Salt March", "Quit India 1942", "Partition 1947"],
        "World Wars":          ["WWI causes and outcome", "WWII causes", "Cold War"],
        "Revision":            ["Timeline of Indian history", "Key personalities", "Previous year questions"],
    },
    "geography": {
        "Physical Geography": ["Earth's structure", "Rocks and minerals", "Landforms", "Rivers and glaciers"],
        "Human Geography":    ["Population distribution", "Migration", "Urbanization"],
        "Indian Geography":   ["Physical features", "Rivers", "Monsoon", "Natural resources"],
        "World Geography":    ["Continents and oceans", "Climate zones", "Major countries"],
        "Map Skills":         ["Latitude and longitude", "Topographic maps", "Scale and directions"],
        "Revision":           ["Map identification", "Environmental issues", "Previous year questions"],
    },
    "economics": {
        "Microeconomics":    ["Demand — law and determinants", "Supply and equilibrium", "Elasticity of demand"],
        "Macroeconomics":    ["National income — GDP, GNP", "Keynesian multiplier", "AD-AS model"],
        "Money & Banking":   ["Functions of money", "Credit creation", "RBI and monetary policy"],
        "Indian Economy":    ["Economic planning", "Poverty and unemployment", "GST reforms"],
        "International Trade":["Comparative advantage", "Balance of payments", "Exchange rates"],
        "Revision":          ["Key formulas and diagrams", "National income numericals", "Previous year questions"],
    },
    "accountancy": {
        "Journal & Ledger":     ["Rules of debit and credit", "Journal entries", "Ledger posting", "Trial balance"],
        "Financial Statements": ["Trading account", "Profit and loss account", "Balance sheet", "Adjustments"],
        "Partnership":          ["Profit sharing", "Admission of partner", "Retirement", "Dissolution"],
        "Company Accounts":     ["Issue of shares", "Forfeiture and reissue", "Debentures"],
        "Ratio Analysis":       ["Liquidity ratios", "Profitability ratios", "Solvency ratios"],
        "Revision":             ["Journal entry practice", "P&L account", "Previous year questions"],
    },
}

SUBJECT_CURRICULUM = {
    "python": ["Setup Python, print Hello World", "Variables and data types", "String methods", "Lists — indexing and slicing", "List methods", "Tuples and Sets", "Dictionaries", "If/else conditions", "for loop with range", "while loops", "Functions — def and return", "Default arguments", "Lambda functions", "File handling", "Exception handling", "List comprehensions", "Modules", "OOP — classes and objects", "OOP — inheritance", "OOP — encapsulation", "Popular libraries", "Working with JSON", "Recursion", "Practice: Build a calculator", "Practice: To-do list app", "Revision: Data types", "Revision: OOP", "Mock test"],
    "java": ["JDK setup and Hello World", "Variables and data types", "Operators", "String methods", "Control flow", "Loops", "Arrays — 1D", "2D arrays", "Methods", "Method overloading", "OOP — Classes", "Constructors", "Inheritance", "Method overriding", "Abstract classes", "Polymorphism", "Encapsulation", "ArrayList", "HashMap", "Exception handling", "File I/O", "Lambda expressions", "Streams API", "Practice: Bank system", "Revision: OOP", "Mock test"],
    "javascript": ["Variables — var, let, const", "Data types", "String methods", "Arrays", "Objects", "If/else", "Loops", "Functions", "Arrow functions", "Closures", "DOM selection", "DOM manipulation", "Event listeners", "Promises", "async/await", "Fetch API", "JSON", "ES6 features", "Array methods — map, filter", "Classes", "Practice: Todo app", "Practice: Weather app", "Revision: Async", "Mock test"],
    "mathematics": ["Number system", "Polynomials", "Quadratic equations", "AP and GP", "Logarithms", "Trigonometry ratios", "Trigonometry identities", "Coordinate geometry", "Circles", "Limits", "Differentiation", "Integration", "Definite integrals", "Vectors", "Matrices", "Probability", "Statistics", "Practice problems", "Revision: Calculus", "Mock test"],
    "physics": ["Units and dimensions", "Kinematics", "Newton's laws", "Work and energy", "Momentum", "Rotational motion", "Gravitation", "SHM", "Waves", "Thermodynamics", "Electrostatics", "Current electricity", "Magnetic field", "Electromagnetic induction", "Optics", "Modern physics", "Revision: Mechanics", "Mock test"],
    "chemistry": ["Atomic structure", "Chemical bonding", "States of matter", "Thermochemistry", "Equilibrium", "Acids and bases", "Electrochemistry", "Chemical kinetics", "Organic nomenclature", "Functional groups", "Reaction mechanisms", "Stoichiometry", "Revision: Organic", "Mock test"],
    "biology": ["Cell structure", "Cell division", "Biomolecules", "DNA and replication", "Genetics", "Evolution", "Digestive system", "Circulatory system", "Respiratory system", "Nervous system", "Photosynthesis", "Ecology", "Biotechnology", "Revision: Genetics", "Mock test"],
    "data structures": ["Arrays and complexity", "Linked lists", "Stacks", "Queues", "Binary trees", "BST", "Heaps", "Hashing", "Graphs — BFS", "Graphs — DFS", "Sorting algorithms", "Searching", "Practice", "Mock test"],
    "machine learning": ["NumPy and Pandas", "Data preprocessing", "Linear regression", "Logistic regression", "Decision trees", "Random forests", "SVM", "K-means", "Neural networks", "Model evaluation", "Practice project", "Mock test"],
    "sql": ["CREATE and INSERT", "SELECT and WHERE", "ORDER BY and LIMIT", "Aggregate functions", "GROUP BY", "INNER JOIN", "LEFT JOIN", "Subqueries", "Views", "Indexes", "Normalization", "Practice", "Mock test"],
    "react": ["JSX and components", "Props and state", "useState", "useEffect", "Event handling", "Lists and keys", "Forms", "React Router", "useContext", "Redux basics", "API calls", "Practice: CRUD app", "Mock test"],
    "web development": ["HTML structure", "CSS flexbox", "CSS grid", "JavaScript DOM", "Fetch API", "Git basics", "Node.js", "Express routes", "MongoDB", "Authentication", "React basics", "Deployment", "Practice", "Mock test"],
}

FALLBACK_STEPS = [
    "Read through all notes and textbook once",
    "Highlight and summarize key points",
    "Create flashcards for important terms",
    "Solve past exam questions",
    "Test yourself with practice problems",
    "Make a one-page summary sheet",
    "Review weak areas identified",
    "Final quick revision",
]


def get_concentration_factor(days_until_exam: int) -> float:
    for threshold, factor in CONCENTRATION_FACTORS:
        if days_until_exam <= threshold:
            return factor
    return 1.0


def calculate_priority(subject) -> float:
    days_left = subject.days_left
    if not days_left or days_left <= 0:
        return 0.0
    return round(
        (10 / days_left)
        + (subject.difficulty * 2)
        + ((100 - subject.syllabus_completion) / 10),
        4
    )


def _compute_subject_weights(subjects) -> dict:
    return {
        s.id: DIFFICULTY_MULTIPLIERS.get(s.difficulty, 1.0) * s.daily_hours_available
        for s in subjects
        if s.days_left > 0
    }


def _build_slots_for_subject(subject) -> list:
    """
    Build 1-hour time slots within the subject's
    custom study_start_time → study_end_time window.
    """
    slots = []
    current = datetime.combine(date.today(), subject.study_start_time)
    end_dt  = datetime.combine(date.today(), subject.study_end_time)

    # Handle overnight windows e.g. 10PM → 2AM
    if end_dt <= current:
        from datetime import timedelta as td
        end_dt += td(days=1)

    while current + timedelta(hours=1) <= end_dt:
        slots.append((current.time(), (current + timedelta(hours=1)).time()))
        current += timedelta(hours=1)

    return slots if slots else [(subject.study_start_time, subject.study_end_time)]

def _assign_time_slots(day_subjects, day_offset):
    """
    Create sequential time slots for subjects in a single day.
    Prevents overlapping sessions.
    """

    sessions = []

    if not day_subjects:
        return sessions

    # Sort subjects by calculated hours (largest first)
    day_subjects.sort(key=lambda x: x[1], reverse=True)

    subject0 = day_subjects[0][0]

    start_time = subject0.study_start_time
    end_time   = subject0.study_end_time

    current_dt = datetime.combine(date.today(), start_time)
    end_limit  = datetime.combine(date.today(), end_time)

    for subject, hours in day_subjects:

        if hours <= 0:
            continue

        end_dt = current_dt + timedelta(hours=hours)

        # Stop if outside study window
        if end_dt > end_limit:
            break

        sessions.append((subject, current_dt.time(), end_dt.time(), hours))

        current_dt = end_dt

    return sessions

def _get_topic_steps(subject_key: str, selected_topics: list, day_offset: int) -> list:
    topic_map = None
    for k in TOPIC_STEPS:
        if k in subject_key or subject_key in k:
            topic_map = TOPIC_STEPS[k]
            break

    if not topic_map or not selected_topics:
        return None

    all_steps = []
    for topic in selected_topics:
        steps = topic_map.get(topic, [])
        for step in steps:
            all_steps.append(f"[{topic}] {step}")

    if not all_steps:
        return None

    total   = len(all_steps)
    start_i = (day_offset * 4) % total
    end_i   = min(start_i + 4, total)
    result  = all_steps[start_i:end_i]

    if len(result) < 2:
        result = all_steps[-4:]

    return result


def get_study_approach(subject_name: str, difficulty: int,
                       day_offset: int = 0, selected_topics: list = None) -> dict:
    difficulty_tips = {
        1: {"approach": "Light Review",    "technique": "Spaced repetition + quick quizzes"},
        2: {"approach": "Active Learning", "technique": "Pomodoro (25min study / 5min break)"},
        3: {"approach": "Deep Work",       "technique": "Feynman technique + practice problems"},
    }

    name_lower = subject_name.lower().strip()
    tips       = difficulty_tips.get(difficulty, difficulty_tips[2])

    # 1. Topic-specific steps
    if selected_topics and len(selected_topics) > 0:
        topic_steps = _get_topic_steps(name_lower, selected_topics, day_offset)
        if topic_steps:
            return {"approach": tips["approach"], "technique": tips["technique"], "steps": topic_steps}

    # 2. Full curriculum
    curriculum = None
    for key, steps in SUBJECT_CURRICULUM.items():
        if key in name_lower or name_lower in key:
            curriculum = steps
            break

    if curriculum:
        total       = len(curriculum)
        start_i     = (day_offset * 2) % total
        end_i       = min(start_i + 4, total)
        today_steps = curriculum[start_i:end_i]
        if len(today_steps) < 2:
            today_steps = curriculum[-4:]
        return {"approach": tips["approach"], "technique": tips["technique"], "steps": today_steps}

    # 3. Generic fallback
    if any(k in name_lower for k in ["math", "calculus", "algebra", "statistics"]):
        today_steps = ["Review theory and key formulas", "Solve 5 warm-up problems", "Attempt past exam questions", "Identify weak areas"]
    elif any(k in name_lower for k in ["physics", "chemistry", "science"]):
        today_steps = ["Study diagrams and processes", "Memorize key formulas", "Solve numerical problems", "Revise chapter summary"]
    elif any(k in name_lower for k in ["history", "geography", "civics"]):
        today_steps = ["Create timeline of key events", "Make mind maps", "Write summaries", "Answer previous year questions"]
    elif any(k in name_lower for k in ["english", "language", "literature"]):
        today_steps = ["Read chapter carefully", "Note key themes", "Practice grammar", "Write one practice essay"]
    elif any(k in name_lower for k in ["law", "legal", "constitution"]):
        today_steps = ["Read the relevant act", "Note key definitions", "Study landmark cases", "Solve hypothetical problems"]
    elif any(k in name_lower for k in ["account", "finance", "commerce"]):
        today_steps = ["Study the concept", "Practice journal entries", "Prepare trial balance", "Solve past numericals"]
    else:
        idx = (day_offset * 2) % len(FALLBACK_STEPS)
        today_steps = FALLBACK_STEPS[idx:idx+4] or FALLBACK_STEPS[:4]

    return {"approach": tips["approach"], "technique": tips["technique"], "steps": today_steps}


def generate_timetable(user) -> dict:
    subjects = list(user.subjects.select_related().all())
    StudySession.objects.filter(
    subject__user=user,
    completed=False
    ).delete()

    if not subjects:
        return {"sessions_created": 0, "skipped_subjects": [], "timetable": []}

    skipped        = [s.name for s in subjects if s.is_exam_passed]
    valid_subjects = [s for s in subjects if not s.is_exam_passed]

    if not valid_subjects:
        return {"sessions_created": 0, "skipped_subjects": skipped, "timetable": []}

    max_days = max(s.days_left for s in valid_subjects)
    if max_days <= 0:
        return {"sessions_created": 0, "skipped_subjects": skipped, "timetable": []}

    sessions_to_create = []
    timetable_preview  = []
    today = date.today()

    for day_offset in range(max_days):
        current_date    = today + timedelta(days=day_offset)
        active_subjects = [s for s in valid_subjects if s.days_left > day_offset]
        if not active_subjects:
            continue

        daily_weights = _compute_subject_weights(active_subjects)
        total_weight  = sum(daily_weights.values())

        day_subjects = []
        for subject in active_subjects:
            weight          = daily_weights.get(subject.id, 0)
            base_hours      = (weight / total_weight * subject.daily_hours_available
                               if total_weight else
                               subject.daily_hours_available / len(active_subjects))
            days_until_exam = subject.days_left - day_offset
            final_hours     = round(base_hours * get_concentration_factor(days_until_exam), 2)
            day_subjects.append((subject, final_hours))

        assignments = _assign_time_slots(day_subjects, day_offset)

        for subject, start_time, end_time, hours in assignments:
            sessions_to_create.append(
                StudySession(
                    subject=subject,
                    date=current_date,
                    hours_allocated=hours,
                    notes=f"{start_time.strftime('%I:%M %p')} – {end_time.strftime('%I:%M %p')}",
                )
            )

            if day_offset < 14:
                approach = get_study_approach(
                    subject.name,
                    subject.difficulty,
                    day_offset,
                    selected_topics=subject.selected_topics or [],
                )
                timetable_preview.append({
                    "date":       current_date.strftime("%d %b %Y"),
                    "day":        current_date.strftime("%A"),
                    "subject":    subject.name,
                    "priority":   subject.priority_label,
                    "days_left":  subject.days_left - day_offset,
                    "start_time": start_time.strftime("%I:%M %p"),
                    "end_time":   end_time.strftime("%I:%M %p"),
                    "hours":      hours,
                    "approach":   approach["approach"],
                    "technique":  approach["technique"],
                    "steps":      approach["steps"],
                    "difficulty": subject.difficulty,
                    "topics":     subject.selected_topics or [],
                })

    StudySession.objects.bulk_create(sessions_to_create)

    return {
        "sessions_created": len(sessions_to_create),
        "skipped_subjects": skipped,
        "timetable":        timetable_preview,
    }