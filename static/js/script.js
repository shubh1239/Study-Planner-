console.log("JS LOADED 🚀");

// ── SUBJECT TOPICS MAP ──────────────────────────────────────────
const SUBJECT_TOPICS = {
    "python": {
        topics: ["Syntax & Basics", "Strings", "Lists & Tuples", "Dictionaries", "Loops", "Functions", "OOP", "File Handling", "Exception Handling", "Modules", "List Comprehensions", "Recursion", "Projects"],
        steps: {
            "Syntax & Basics":     ["Install python and setup VS Code", "Variables and data types — int, float, str, bool", "Type conversion and input() function", "Comments and indentation rules"],
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
        }
    },
    "java": {
        topics: ["Basics", "OOP", "Arrays & Strings", "Collections", "Exception Handling", "File I/O", "Multithreading", "Java 8 Features", "Projects"],
        steps: {
            "Basics":             ["JDK setup and Hello World", "Variables, data types and type casting", "Operators and expressions", "Control flow — if/else, switch", "Loops — for, while, do-while"],
            "OOP":                ["Classes and objects", "Constructors and this keyword", "Inheritance and super keyword", "Method overloading and overriding", "Abstract classes and interfaces"],
            "Arrays & Strings":   ["1D array declaration and iteration", "2D arrays and matrix operations", "String class and methods", "StringBuilder for mutable strings"],
            "Collections":        ["ArrayList — add, remove, iterate", "LinkedList operations", "HashMap — key-value pairs", "HashSet for unique elements"],
            "Exception Handling": ["try/catch/finally basics", "Checked vs unchecked exceptions", "throw and throws keywords", "Custom exception classes"],
            "File I/O":           ["FileReader and FileWriter basics", "BufferedReader for efficient reading", "BufferedWriter for writing", "Serialization basics"],
            "Multithreading":     ["Thread class and Runnable interface", "Creating and starting threads", "synchronized keyword", "wait and notify"],
            "Java 8 Features":    ["Lambda expressions syntax", "Functional interfaces", "Stream API — filter, map, collect", "Method references"],
            "Projects":           ["Bank account system", "Student management with ArrayList", "Calculator with OOP", "File-based inventory system"],
        }
    },
    "javascript": {
        topics: ["Basics", "DOM", "Functions", "Arrays & Objects", "Async JS", "ES6+", "Projects"],
        steps: {
            "Basics":           ["Variables — var, let, const", "Data types and typeof", "Operators and expressions", "Conditionals — if/else, ternary", "Loops — for, while, for...of"],
            "DOM":              ["Select elements — getElementById, querySelector", "Modify text — textContent, innerHTML", "Change CSS styles with JS", "Add/remove CSS classes", "Create and append elements"],
            "Functions":        ["Function declarations vs expressions", "Arrow functions syntax", "Default parameters", "Closures and lexical scope", "Higher order functions"],
            "Arrays & Objects": ["Array methods — map, filter, reduce", "find, some, every", "Object destructuring", "Spread and rest operators"],
            "Async JS":         ["Promises — then, catch, finally", "async/await syntax", "Fetch API GET request", "POST request with fetch", "Error handling in async"],
            "ES6+":             ["Template literals", "Modules — import and export", "Classes and OOP in JS", "Optional chaining ?."],
            "Projects":         ["Todo app", "Quiz app", "Weather app using fetch", "Expense tracker"],
        }
    },
    "c programming": {
        topics: ["Basics", "Control Flow", "Functions", "Arrays & Strings", "Pointers", "Structures", "File Handling", "Data Structures"],
        steps: {
            "Basics":           ["GCC setup and Hello World", "Variables, data types, format specifiers", "Arithmetic operators", "Input with scanf, output with printf"],
            "Control Flow":     ["if/else and nested conditions", "switch/case", "for, while, do-while loops", "break and continue"],
            "Functions":        ["Function declaration and definition", "Pass by value", "Recursive functions"],
            "Arrays & Strings": ["1D array and iteration", "2D arrays", "String functions — strlen, strcpy"],
            "Pointers":         ["Pointer declaration and dereferencing", "Pointer arithmetic", "Pointers as function parameters"],
            "Structures":       ["struct declaration", "Array of structures", "typedef"],
            "File Handling":    ["fopen and fclose", "fscanf and fprintf", "Binary file operations"],
            "Data Structures":  ["Linked list — node creation", "Stack using arrays", "Queue using arrays"],
        }
    },
    "c++": {
        topics: ["Basics", "OOP", "STL", "Templates", "Memory", "Modern C++", "File I/O", "Projects"],
        steps: {
            "Basics":      ["Hello World, namespaces, cin/cout", "Variables, data types, references", "Operators and type conversions", "Control flow and loops", "Function overloading"],
            "OOP":         ["Classes and objects", "Constructors and destructors", "Inheritance — single and multiple", "Polymorphism — virtual functions", "Abstract classes"],
            "STL":         ["vector — push_back, iterate", "map and unordered_map", "set and unordered_set", "STL algorithms — sort, find"],
            "Templates":   ["Function templates", "Class templates", "Template specialization"],
            "Memory":      ["Dynamic memory — new and delete", "Smart pointers — unique_ptr", "shared_ptr and weak_ptr", "RAII principle"],
            "Modern C++":  ["Lambda expressions", "Move semantics", "auto and decltype", "Range-based for loop"],
            "File I/O":    ["ifstream and ofstream", "Reading line by line", "Writing formatted output", "Binary file operations"],
            "Projects":    ["Matrix calculator", "Student management with STL", "Bank system using OOP"],
        }
    },
    "data structures": {
        topics: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Hashing", "Sorting", "Searching"],
        steps: {
            "Arrays":          ["Array basics and memory layout", "Insertion and deletion", "Linear and binary search", "Sorting arrays", "2D arrays"],
            "Linked Lists":    ["Singly linked list — node structure", "Insert at beginning, end, middle", "Delete by value", "Reverse a linked list", "Doubly linked list"],
            "Stacks & Queues": ["Stack using arrays — push and pop", "Balanced parentheses problem", "Queue — enqueue and dequeue", "Circular queue"],
            "Trees":           ["Binary tree — node structure", "Inorder, preorder, postorder traversal", "BST — insert and search", "BST deletion", "Level order traversal"],
            "Graphs":          ["Adjacency matrix and list", "BFS traversal", "DFS traversal", "Cycle detection"],
            "Hashing":         ["Hash function basics", "Collision — chaining", "Open addressing", "HashMap implementation"],
            "Sorting":         ["Bubble and selection sort", "Merge sort", "Quick sort", "Time complexity comparison"],
            "Searching":       ["Linear search", "Binary search — iterative", "Binary search — recursive", "Search in rotated array"],
        }
    },
    "algorithms": {
        topics: ["Complexity", "Divide & Conquer", "Greedy", "Dynamic Programming", "Graph Algorithms", "Backtracking", "String Algorithms", "Bit Manipulation"],
        steps: {
            "Complexity":          ["Big O — O(1), O(n), O(log n)", "Time vs space complexity", "Best/average/worst case", "Recurrence relations"],
            "Divide & Conquer":    ["Merge sort implementation", "Quick sort", "Binary search variations", "Closest pair of points"],
            "Greedy":              ["Activity selection problem", "Fractional knapsack", "Huffman coding", "Dijkstra's shortest path"],
            "Dynamic Programming": ["Memoization vs tabulation", "0/1 Knapsack", "Longest common subsequence", "Coin change problem"],
            "Graph Algorithms":    ["BFS and DFS", "Dijkstra's algorithm", "Bellman-Ford", "Kruskal's MST"],
            "Backtracking":        ["N-Queens problem", "Sudoku solver", "Subset sum", "Permutations"],
            "String Algorithms":   ["KMP pattern matching", "Rabin-Karp", "Longest palindromic substring", "Edit distance"],
            "Bit Manipulation":    ["AND, OR, XOR operations", "Left and right shift", "Count set bits", "Power of 2 tricks"],
        }
    },
    "machine learning": {
        topics: ["python for ML", "Data Preprocessing", "Regression", "Classification", "Clustering", "Neural Networks", "Model Evaluation", "Projects"],
        steps: {
            "python for ML":      ["NumPy — arrays and operations", "Pandas — DataFrames", "Matplotlib — basic plots", "Scikit-learn overview"],
            "Data Preprocessing": ["Handle missing values", "Encode categorical variables", "Feature scaling — MinMax, Standard", "Train/test split"],
            "Regression":         ["Linear regression theory", "Implement with sklearn", "Multiple linear regression", "Evaluate — MSE, R²"],
            "Classification":     ["Logistic regression", "Decision tree classifier", "Random forest", "SVM basics"],
            "Clustering":         ["K-means algorithm", "Elbow method for K", "Hierarchical clustering", "Silhouette score"],
            "Neural Networks":    ["Perceptron and activation functions", "Feedforward network with Keras", "Compile and train model", "Evaluate and predict"],
            "Model Evaluation":   ["Confusion matrix", "Precision, recall, F1", "ROC curve and AUC", "Cross validation"],
            "Projects":           ["House price prediction", "Spam classifier", "Iris classification", "Customer segmentation"],
        }
    },
    "web development": {
        topics: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Databases", "Git", "Deployment"],
        steps: {
            "HTML":       ["Document structure and tags", "Text, links, images", "Lists, tables, forms", "Semantic HTML5 elements"],
            "CSS":        ["Selectors and box model", "Flexbox layout", "CSS Grid layout", "Responsive and media queries", "Animations and transitions"],
            "JavaScript": ["DOM selection and manipulation", "Event listeners", "Fetch API", "Form validation"],
            "React":      ["Components, JSX and props", "useState and useEffect", "Fetch data and render", "React Router"],
            "Node.js":    ["Express server setup", "Routes — GET and POST", "Middleware usage", "Connect to MongoDB"],
            "Databases":  ["SQL basics", "MongoDB CRUD", "Mongoose schema", "Database design"],
            "Git":        ["git init, add, commit", "Branching and merging", "Push and pull from GitHub", "Pull requests"],
            "Deployment": ["Vercel for frontend", "Render for backend", "Environment variables", "CORS setup"],
        }
    },
    "react": {
        topics: ["JSX & Components", "Props & State", "Hooks", "Routing", "State Management", "API Calls", "Performance", "Projects"],
        steps: {
            "JSX & Components":  ["JSX syntax and expressions", "Functional components", "Conditional rendering", "Component composition"],
            "Props & State":     ["Passing and destructuring props", "useState basics", "Updating state correctly", "Lifting state up"],
            "Hooks":             ["useEffect — fetch on mount", "useEffect cleanup", "useContext — global state", "Custom hooks"],
            "Routing":           ["BrowserRouter and Routes", "Route, Link and NavLink", "useParams — dynamic routes", "useNavigate"],
            "State Management":  ["Context API setup", "Redux basics", "Redux Toolkit — createSlice", "useSelector and useDispatch"],
            "API Calls":         ["useEffect with fetch", "Axios GET and POST", "Loading and error states", "Custom useFetch hook"],
            "Performance":       ["React.memo", "useMemo", "useCallback", "Lazy loading with Suspense"],
            "Projects":          ["Todo app — full CRUD", "Weather dashboard", "Auth flow", "Full stack with Django"],
        }
    },
    "sql": {
        topics: ["Basics", "Filtering & Sorting", "Joins", "Aggregation", "Subqueries", "Advanced SQL", "Database Design", "Projects"],
        steps: {
            "Basics":              ["CREATE TABLE — data types", "INSERT, UPDATE, DELETE", "SELECT — retrieve data", "WHERE clause"],
            "Filtering & Sorting": ["AND, OR, NOT operators", "LIKE and wildcards", "IN and BETWEEN", "ORDER BY and LIMIT"],
            "Joins":               ["INNER JOIN", "LEFT and RIGHT JOIN", "FULL OUTER JOIN", "Self join"],
            "Aggregation":         ["COUNT, SUM, AVG, MAX, MIN", "GROUP BY", "HAVING clause", "DISTINCT"],
            "Subqueries":          ["Subquery in WHERE", "Correlated subqueries", "EXISTS and NOT EXISTS", "Subquery vs JOIN"],
            "Advanced SQL":        ["Views", "Indexes", "Stored procedures", "Window functions — ROW_NUMBER, RANK"],
            "Database Design":     ["ER diagram basics", "Primary and foreign keys", "One-to-many relationships", "Normalization — 1NF, 2NF, 3NF"],
            "Projects":            ["Library management system", "E-commerce queries", "Student result system", "Inventory tracking"],
        }
    },
    "physics": {
        topics: ["Mechanics", "Thermodynamics", "Waves & Sound", "Electrostatics", "Current Electricity", "Magnetism", "Optics", "Modern Physics"],
        steps: {
            "Mechanics":           ["Units and kinematics", "Newton's laws", "Work, energy, power", "Conservation of momentum", "Circular and rotational motion"],
            "Thermodynamics":      ["Heat transfer", "Specific heat and calorimetry", "First law of thermodynamics", "Second law and entropy"],
            "Waves & Sound":       ["Wave properties", "Speed of sound", "Doppler effect", "Resonance and standing waves"],
            "Electrostatics":      ["Coulomb's law", "Electric field and potential", "Capacitors in series and parallel", "Energy stored in capacitor"],
            "Current Electricity": ["Ohm's law V=IR", "Resistors in series and parallel", "Kirchhoff's laws KCL and KVL", "Wheatstone bridge"],
            "Magnetism":           ["Magnetic field and field lines", "Force on moving charge", "Biot-Savart law", "Faraday's law"],
            "Optics":              ["Reflection and mirror formula", "Refraction and Snell's law", "Lens formula", "Ray diagrams"],
            "Modern Physics":      ["Photoelectric effect", "de Broglie wavelength", "Bohr model", "Radioactivity"],
        }
    },
    "chemistry": {
        topics: ["Atomic Structure", "Chemical Bonding", "States of Matter", "Thermochemistry", "Equilibrium", "Electrochemistry", "Organic Chemistry", "Reaction Mechanisms"],
        steps: {
            "Atomic Structure":    ["Subatomic particles", "Bohr model and energy levels", "Quantum numbers", "Aufbau principle", "Periodic trends"],
            "Chemical Bonding":    ["Ionic bonding", "Covalent bonding and Lewis structures", "VSEPR and molecular geometry", "Hybridization", "Intermolecular forces"],
            "States of Matter":    ["Kinetic molecular theory", "Gas laws — Boyle, Charles", "Ideal gas equation PV=nRT", "Properties of liquids and solids"],
            "Thermochemistry":     ["Enthalpy — exo and endothermic", "Hess's law", "Bond energies", "Gibbs free energy"],
            "Equilibrium":         ["Dynamic equilibrium", "Kc and Kp expressions", "Le Chatelier's principle", "Buffer solutions"],
            "Electrochemistry":    ["Oxidation states and redox", "Balancing redox equations", "Galvanic cell and EMF", "Electrolysis — Faraday's laws"],
            "Organic Chemistry":   ["IUPAC nomenclature", "Functional groups", "Alkanes, alkenes, alkynes", "Aromatic compounds"],
            "Reaction Mechanisms": ["SN1 and SN2", "Electrophilic addition", "Elimination E1 and E2", "Free radical reactions"],
        }
    },
    "mathematics": {
        topics: ["Algebra", "Trigonometry", "Coordinate Geometry", "Calculus", "Vectors", "Matrices", "Probability", "Statistics"],
        steps: {
            "Algebra":             ["Polynomials and factor theorem", "Quadratic equations", "AP and GP sequences", "Logarithms and exponentials"],
            "Trigonometry":        ["Trig ratios — sin, cos, tan", "Pythagorean identities", "Compound angle formulas", "Solving trig equations"],
            "Coordinate Geometry": ["Distance and midpoint formula", "Straight lines — slope forms", "Circles — standard form", "Parabola and ellipse"],
            "Calculus":            ["Limits and continuity", "Differentiation rules", "Maxima and minima", "Integration — substitution", "Definite integrals"],
            "Vectors":             ["Vector addition and subtraction", "Dot product and angle", "Cross product and area", "Vector equations of lines"],
            "Matrices":            ["Matrix operations", "Determinant — 2x2 and 3x3", "Inverse of a matrix", "Solving linear systems"],
            "Probability":         ["Basic probability rules", "Conditional probability", "Bayes theorem", "Binomial distribution"],
            "Statistics":          ["Mean, median, mode", "Variance and standard deviation", "Correlation coefficient", "Hypothesis testing"],
        }
    },
    "biology": {
        topics: ["Cell Biology", "Genetics", "Molecular Biology", "Human Physiology", "Plant Biology", "Ecology", "Evolution", "Biotechnology"],
        steps: {
            "Cell Biology":      ["Prokaryote vs eukaryote", "Cell organelles and functions", "Cell membrane transport", "Mitosis — PMAT stages", "Meiosis stages"],
            "Genetics":          ["Mendel's law of segregation", "Monohybrid and dihybrid cross", "Codominance and incomplete dominance", "Sex-linked traits", "Chromosomal disorders"],
            "Molecular Biology": ["DNA double helix structure", "DNA replication", "Transcription — DNA to mRNA", "Translation — mRNA to protein"],
            "Human Physiology":  ["Digestive system — organs and enzymes", "Circulatory system — heart", "Respiratory system — gas exchange", "Excretory system — nephron"],
            "Plant Biology":     ["Plant tissue types", "Photosynthesis — light reactions", "Calvin cycle", "Plant hormones"],
            "Ecology":           ["Ecosystem components", "Food chains and food webs", "Energy flow — 10% law", "Biogeochemical cycles"],
            "Evolution":         ["Darwin's natural selection", "Evidence for evolution", "Speciation", "Hardy-Weinberg equilibrium"],
            "Biotechnology":     ["Recombinant DNA technology", "PCR steps and applications", "Gel electrophoresis", "CRISPR-Cas9 basics"],
        }
    },
    "history": {
        topics: ["Ancient History", "Medieval History", "Modern History", "Indian Independence", "World Wars", "Revision"],
        steps: {
            "Ancient History":     ["Indus Valley Civilization", "Vedic period and kingdoms", "Mauryan Empire — Ashoka", "Gupta Empire — golden age"],
            "Medieval History":    ["Delhi Sultanate — five dynasties", "Mughal Empire — Akbar", "Maratha Empire — Shivaji", "Vijayanagara kingdom"],
            "Modern History":      ["British East India Company", "1857 revolt — causes and effects", "Social reform movements", "Early nationalism — INC 1885"],
            "Indian Independence": ["Non-cooperation movement 1920", "Civil disobedience — Salt March", "Quit India 1942", "Partition of India 1947"],
            "World Wars":          ["WWI — causes and outcome", "WWII — causes and Holocaust", "Post-war — UN formation", "Cold War — USA vs USSR"],
            "Revision":            ["Timeline of Indian history", "Key personalities", "Important dates", "Previous year questions"],
        }
    },
    "geography": {
        topics: ["Physical Geography", "Human Geography", "Indian Geography", "World Geography", "Map Skills", "Revision"],
        steps: {
            "Physical Geography": ["Earth's structure", "Rocks and minerals", "Landforms — mountains, plains", "Rivers and glaciers"],
            "Human Geography":    ["Population distribution", "Migration — push and pull", "Urbanization", "Agriculture types"],
            "Indian Geography":   ["Physical features — Himalayas", "Rivers — Ganga, Brahmaputra", "Monsoon mechanism", "Natural resources"],
            "World Geography":    ["Continents and oceans", "Major mountain ranges", "Climate zones", "Major countries capitals"],
            "Map Skills":         ["Latitude and longitude", "Time zones", "Topographic maps — contour lines", "Scale and directions"],
            "Revision":           ["Map identification practice", "Fill in key facts", "Environmental issues", "Previous year questions"],
        }
    },
    "economics": {
        topics: ["Microeconomics", "Macroeconomics", "Money & Banking", "Indian Economy", "International Trade", "Revision"],
        steps: {
            "Microeconomics":    ["Demand — law and determinants", "Supply — law and determinants", "Market equilibrium", "Elasticity of demand"],
            "Macroeconomics":    ["National income — GDP, GNP, NNP", "Circular flow of income", "Keynesian multiplier", "AD-AS model"],
            "Money & Banking":   ["Functions of money", "Commercial bank — credit creation", "RBI functions", "Monetary policy tools"],
            "Indian Economy":    ["Economic planning — Five Year Plans", "Poverty — causes and measures", "Unemployment types", "GST and tax reforms"],
            "International Trade":["Comparative advantage", "Balance of payments", "Exchange rates", "WTO and trade agreements"],
            "Revision":          ["Key definitions and formulas", "Demand supply diagrams", "National income numericals", "Previous year questions"],
        }
    },
    "accountancy": {
        topics: ["Journal & Ledger", "Financial Statements", "Partnership", "Company Accounts", "Ratio Analysis", "Revision"],
        steps: {
            "Journal & Ledger":     ["Rules of debit and credit — DEAD CLIC", "Journal entries — simple and compound", "Ledger posting and balancing", "Trial balance preparation"],
            "Financial Statements": ["Trading account — gross profit", "Profit and loss account", "Balance sheet — assets and liabilities", "Adjustments — prepaid, accrued"],
            "Partnership":          ["Profit sharing and interest on capital", "Admission — goodwill and revaluation", "Retirement — gaining ratio", "Dissolution — realisation account"],
            "Company Accounts":     ["Issue of shares at par and premium", "Forfeiture and reissue of shares", "Issue of debentures", "Redemption of debentures"],
            "Ratio Analysis":       ["Liquidity — current and quick ratio", "Profitability — gross and net profit ratio", "Solvency — debt-equity ratio", "Activity — inventory turnover"],
            "Revision":             ["Journal entry practice", "Prepare P&L account", "Balance sheet from trial balance", "Previous year board questions"],
        }
    },
};

const GENERIC_TOPICS = {
    "history":     ["Ancient History", "Medieval History", "Modern History", "Indian Independence", "World Wars", "Revision"],
    "geography":   ["Physical Geography", "Human Geography", "Indian Geography", "World Geography", "Map Skills", "Revision"],
    "economics":   ["Microeconomics", "Macroeconomics", "Money & Banking", "Indian Economy", "International Trade", "Revision"],
    "accountancy": ["Journal & Ledger", "Financial Statements", "Partnership", "Company Accounts", "Ratio Analysis", "Revision"],
    "english":     ["Grammar", "Reading Comprehension", "Writing Skills", "Literature", "Vocabulary", "Revision"],
};

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[m];
    });
}


document.addEventListener("DOMContentLoaded", function () {
    loadSessions();
    initAutocomplete();
    initTimeWindow();

    const form = document.getElementById("missionForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const subject = document.getElementById("subjectInput").value;
        if (!subject.trim()) {
            alert("Please enter a subject.");
            return;
        }
        const examDate   = form.querySelector('input[name="exam_date"]').value;
        const diffInput  = form.querySelector('input[name="difficulty"]:checked');
        const difficulty = diffInput ? parseInt(diffInput.value, 10) : 2;

        // Collect selected topics
        const selectedTopics = [...document.querySelectorAll(".topic-chip.selected")]
            .map(el => el.dataset.topic);

        // Collect time window
        const startTime = document.getElementById("studyStartTime").value + ":00";
        const endTime   = document.getElementById("studyEndTime").value + ":00";

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
                    name:                  subject,
                    exam_date:             examDate,
                    difficulty:            difficulty,
                    syllabus_completion:   0,
                    daily_hours_available: 4,
                    selected_topics:       selectedTopics,
                    study_start_time:      startTime,
                    study_end_time:        endTime,
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

            // Reset topic section
            document.getElementById("topicSection").style.display = "none";
            document.getElementById("topicChips").innerHTML = "";
            document.getElementById("selectedTopicsPreview").style.display = "none";

            // Reset time window badge
            document.getElementById("timeHoursBadge").textContent = "13h available";
            document.getElementById("studyStartTime").value = "09:00";
            document.getElementById("studyEndTime").value   = "22:00";

        } catch (err) {
            console.error(err);
        } finally {
            btn.disabled          = false;
            btnText.style.display = "inline";
            btnLoad.style.display = "none";
        }
    });
});


// ── TIME WINDOW ───────────────────────────────────────────────
function initTimeWindow() {
    const startEl = document.getElementById("studyStartTime");
    const endEl   = document.getElementById("studyEndTime");
    const badge   = document.getElementById("timeHoursBadge");

    function updateBadge() {
        if (!startEl || !endEl || !badge) return;
        if (!startEl.value || !endEl.value) return;

        const [sh, sm] = startEl.value.split(":").map(Number);
        const [eh, em] = endEl.value.split(":").map(Number);

        let startMins = sh * 60 + sm;
        let endMins   = eh * 60 + em;

        // Handle overnight — e.g. 10PM to 2AM
        if (endMins <= startMins) endMins += 24 * 60;

        const diff    = endMins - startMins;
        const hours   = Math.floor(diff / 60);
        const minutes = diff % 60;

        badge.textContent = minutes > 0
            ? `${hours}h ${minutes}m available`
            : `${hours}h available`;

        // Warn if less than 1 hour
        badge.style.background = diff < 60
            ? "rgba(255,80,80,0.18)"
            : "rgba(255,107,107,0.1)";
        badge.style.color = diff < 60 ? "#e53e3e" : "var(--coral)";
    }

    if (startEl && endEl) {
        startEl.addEventListener("change", updateBadge);
        endEl.addEventListener("change", updateBadge);
        updateBadge();
    }
}


// ── AUTOCOMPLETE ──────────────────────────────────────────────
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
    "python","Java","C Programming","C++","JavaScript","TypeScript",
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

        if (!val) {
            list.classList.remove("open");
            document.getElementById("topicSection").style.display = "none";
            return;
        }

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
                showTopics(subject);
            });

            list.appendChild(item);
        });

        list.classList.add("open");
    });

    // Also trigger topics on blur if value matches
    input.addEventListener("blur", function () {
        const val = this.value.trim();
        if (val) showTopics(val);
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
            const selected = items[activeIndex].textContent.trim();
            input.value = selected;
            list.classList.remove("open");
            activeIndex = -1;
            showTopics(selected);
            return;
        } else if (e.key === "Escape") {
            list.classList.remove("open");
            return;
        }

        items.forEach((item, i) => item.classList.toggle("active", i === activeIndex));
    });

    document.addEventListener("click", function (e) {
        if (!input.contains(e.target) && !list.contains(e.target)) {
            list.classList.remove("open");
        }
    });
}


// ── SHOW TOPIC CHIPS ──────────────────────────────────────────
function showTopics(subjectName) {
    // FIX BUG 5: normalize whitespace to prevent subject matching issues
    const key      = subjectName.toLowerCase().trim().replace(/\s+/g, " ");
    const section  = document.getElementById("topicSection");
    const chipsEl  = document.getElementById("topicChips");
    const preview  = document.getElementById("selectedTopicsPreview");

    let topics = null;

    for (const k of Object.keys(SUBJECT_TOPICS)) {
        if (key.includes(k) || k.includes(key)) {
            topics = SUBJECT_TOPICS[k].topics;
            break;
        }
    }

    if (!topics) {
        for (const k of Object.keys(GENERIC_TOPICS)) {
            if (key.includes(k) || k.includes(key)) {
                topics = GENERIC_TOPICS[k];
                break;
            }
        }
    }

    if (!topics || topics.length === 0) {
        section.style.display = "none";
        return;
    }

    chipsEl.innerHTML = "";
    preview.style.display = "none";

    topics.forEach(topic => {
        const chip = document.createElement("span");
        chip.className     = "topic-chip";
        chip.dataset.topic = topic;
        chip.textContent   = topic;

        chip.addEventListener("click", function () {
            const selected = document.querySelectorAll(".topic-chip.selected");

            if (!this.classList.contains("selected") && selected.length >= 5) {
                alert("Select maximum 5 topics.");
                return;
            }

            this.classList.toggle("selected");
            updateTopicPreview(subjectName);
        });

        chipsEl.appendChild(chip);
    });

    section.style.display = "block";
}


// ── UPDATE PREVIEW ────────────────────────────────────────────
function updateTopicPreview(subjectName) {
    const selected = [...document.querySelectorAll(".topic-chip.selected")]
        .map(el => el.dataset.topic);
    const preview  = document.getElementById("selectedTopicsPreview");
    const previewT = document.getElementById("topicPreviewText");

    if (selected.length === 0) {
        preview.style.display = "none";
        return;
    }

    const key = subjectName.toLowerCase().trim().replace(/\s+/g, " ");
    const stepsPreview = [];

    for (const k of Object.keys(SUBJECT_TOPICS)) {
        if (key.includes(k) || k.includes(key)) {
            selected.forEach(topic => {
                const topicSteps = SUBJECT_TOPICS[k].steps[topic];
                if (topicSteps && topicSteps[0]) {
                    stepsPreview.push(`<strong>${topic}</strong> → ${topicSteps[0]}`);
                }
            });
            break;
        }
    }

    previewT.innerHTML = stepsPreview.length > 0
        ? stepsPreview.join("  •  ")
        : `Selected: ${selected.join(", ")}`;

    preview.style.display = "flex";
}


async function loadSessions() {
    try {
        // FIX BUG 1: use correct endpoint /api/sessions/
        const res = await fetch(`/api/sessions/`);
        if (!res.ok) return;

        const sessions  = await res.json();
        const total     = sessions.length;
        const completed = sessions.filter(s => s.completed).length;
        const percent   = total ? Math.round(completed / total * 100) : 0;

        document.getElementById("statTotal").textContent        = total;
        document.getElementById("statDone").textContent         = completed;
        document.getElementById("statPercent").textContent      = percent + "%";
        document.getElementById("mainProgressBar").style.width  = percent + "%";
        document.getElementById("progressLabel").textContent    = total
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

            const topicsBadge = entry.topics && entry.topics.length > 0
                ? `<span class="topics-badge">🎯 ${entry.topics.join(", ")}</span>`
                : "";

            card.innerHTML = `
                <div class="session-main" onclick="toggleSession(this)">
                    <span class="session-time-badge">⏰ ${entry.start_time} → ${entry.end_time}</span>
                    <span class="session-subject-name">${escapeHTML(entry.subject)}</span>
                    <div class="session-meta">
                        ${topicsBadge}
                        <span class="badge ${urgClass}">${entry.priority}</span>
                        <span class="badge ${diffClass}">${diffLabel}</span>
                        <span class="session-hrs">${entry.hours}h</span>
                        <button class="focus-btn" onclick="event.stopPropagation(); startFocusMode('${escapeHTML(entry.subject)}')" title="Start Deep Focus">🧠 Focus</button>
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
        // FIX BUG 2: use correct endpoint /api/sessions/${sessionId}/complete/
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
        // FIX BUG 3: use correct endpoint /api/subjects/${subjectId}/
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
                name:       newName.trim(),
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


// ── CHART MODAL ───────────────────────────────────────────────
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

        const colors = ["#ff6b6b","#52d9a6","#5eb8ff","#ffd166","#a78bfa","#ff8fab","#ffa07a","#47ffd4"];

        const total     = sessions.length;
        const completed = sessions.filter(s => s.completed).length;
        const percent   = total ? Math.round(completed / total * 100) : 0;

        document.getElementById("mStatTotal").textContent   = total;
        document.getElementById("mStatDone").textContent    = completed;
        document.getElementById("mStatPending").textContent = total - completed;
        document.getElementById("mStatPercent").textContent = percent + "%";
        document.getElementById("chartCenterLabel").textContent = percent + "%";

        const ctx = document.getElementById("progressChart").getContext("2d");
        if (chartInstance !== null) {
            chartInstance.destroy();
        }

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
                    tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}% done` } }
                },
                animation: { animateRotate: true, duration: 800 }
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

// ── NOTIFICATIONS ─────────────────────────────────────────────
let notificationTimers = [];
let notificationsEnabled = false;

async function toggleNotifications() {
    if (!("Notification" in window)) {
        alert("Your browser does not support notifications.");
        return;
    }

    if (Notification.permission === "default") {
        const perm = await Notification.requestPermission();
        if (perm !== "granted") {
            alert("Notification permission denied. Please allow notifications in your browser settings.");
            return;
        }
    }

    if (Notification.permission !== "granted") {
        alert("Notifications are blocked. Please allow them in your browser settings.");
        return;
    }

    notificationsEnabled = !notificationsEnabled;

    const btn = document.getElementById("notifBtn");
    if (notificationsEnabled) {
        const scheduled = await scheduleNotifications();

        sendNotification(
            "🔔 FOCUSFORGE Reminders Activated!",
            scheduled > 0
                ? `${scheduled} reminder(s) scheduled for today's sessions.`
                : "No upcoming sessions today. Add a subject with a future exam date!",
            "test"
        );

        if (btn) {
            btn.innerHTML = '<i class="fas fa-bell-slash"></i> Reminders On';
            btn.style.borderColor = "var(--mint)";
            btn.style.color = "var(--mint)";
        }
    } else {
        notificationTimers.forEach(t => clearTimeout(t));
        notificationTimers = [];
        if (btn) {
            btn.innerHTML = '<i class="fas fa-bell"></i> Reminders';
            btn.style.borderColor = "";
            btn.style.color = "";
        }
        alert("🔕 Study reminders disabled.");
    }
}


async function scheduleNotifications() {
    notificationTimers.forEach(t => clearTimeout(t));
    notificationTimers = [];

    try {
        const res = await fetch("/api/sessions/");
        if (!res.ok) return 0;
        const sessions = await res.json();

        const todayStr = new Date().toISOString().slice(0, 10);
        const todaySessions = sessions.filter(s => s.date === todayStr && !s.completed);

        todaySessions.forEach(session => {
            if (!session.notes) return;

            const timePart = session.notes.split(/[–-]/)[0].trim();
            const sessionStart = parseTimeToDate(timePart);
            if (!sessionStart) return;

            const now = new Date();
            const subject = session.subject_name;

            const reminders = [
                { offset: 30, title: `📚 ${subject} starts in 30 minutes`, body: "Get your notes and materials ready!" },
                { offset: 10, title: `⚡ 10 minutes to go — ${subject}`,   body: "Wrap up what you're doing and prepare!" },
                { offset: 5,  title: `🔔 5 minutes! — ${subject}`,         body: "Almost time. Head to your study spot now!" },
                { offset: 0,  title: `🚀 ${subject} starts RIGHT NOW!`,    body: "Your study session has begun. Let's go! 💪" },
            ];

            reminders.forEach(({ offset, title, body }) => {
                const fireAt = new Date(sessionStart.getTime() - offset * 60 * 1000);
                const delay  = fireAt - now;

                if (delay < 0) return;

                const timer = setTimeout(() => {
                    sendNotification(title, body, subject);
                }, delay);

                notificationTimers.push(timer);

                console.log(`🔔 Scheduled: "${title}" in ${Math.round(delay/60000)} min`);
            });
        });

        console.log(`✅ ${notificationTimers.length} notifications scheduled for today`);
        return notificationTimers.length;

    } catch (err) {
        console.error("Notification scheduling error:", err);
        return 0;
    }
}


function parseTimeToDate(timeStr) {
    try {
        const [time, meridiem] = timeStr.trim().split(" ");
        let [hours, minutes]   = time.split(":").map(Number);

        if (meridiem === "PM" && hours !== 12) hours += 12;
        if (meridiem === "AM" && hours === 12) hours = 0;

        const d = new Date();
        d.setHours(hours, minutes, 0, 0);
        return d;
    } catch (e) {
        return null;
    }
}


function sendNotification(title, body, subject) {
    if (Notification.permission !== "granted") return;

    const n = new Notification(title, {
        body,
        icon:  "https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/72x72/1f4da.png",
        badge: "https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/72x72/1f514.png",
        tag:   `studybuddy-${subject}`,
        renotify: true,
    });

    n.onclick = () => {
        window.focus();
        n.close();
    };
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
}


// ── FOCUS MODE VARIABLES ──────────────────────────────────────
let focusModel      = null;
let focusStream     = null;
let focusDetectLoop = null;
let focusTimerLoop  = null;
let focusStartTime  = null;

let focusDistCount  = 0;
let focusFocusSecs  = 0;

let focusAlarmCtx   = null;
let focusAlarmOsc   = null;
let focusAlarmGain  = null;

let phoneDetected   = false;


// FIX BUG 4: Single clean startFocusMode — opens in new tab, no orphaned code
function startFocusMode(subjectName) {
    const encoded = encodeURIComponent(subjectName);
    window.open(`/focus/?subject=${encoded}`, "_blank");
}


// ─────────────────────────────────
function stopFocusMode() {
    const modal = document.getElementById("focusModal");
    modal.style.display = "none";

    if (focusStream) {
        focusStream.getTracks().forEach(t => t.stop());
        focusStream = null;
    }

    if (focusDetectLoop) {
        cancelAnimationFrame(focusDetectLoop);
        focusDetectLoop = null;
    }

    if (focusTimerLoop) {
        clearInterval(focusTimerLoop);
        focusTimerLoop = null;
    }

    stopAlarm();

    const mins = Math.floor(focusFocusSecs / 60);

    alert(
`🧠 Focus session complete!

⏱ Focus time: ${mins} minute(s)
⚠️ Distractions: ${focusDistCount}`
    );
}

function runDetection() {
    const video  = document.getElementById("focusWebcam");
    const canvas = document.getElementById("focusCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    async function detect() {
        if (!focusStream || !focusModel) {
            return;
        }

        canvas.width  = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        try {
            const predictions = await focusModel.detect(video);

            const phoneFound = predictions.some(
                p => p.class === "cell phone" && p.score > 0.40
            );

            const personFound = predictions.some(
                p => p.class === "person" && p.score > 0.40
            );

            if (phoneFound || !personFound) {
                if (!phoneDetected) {
                    phoneDetected = true;
                    focusDistCount++;
                    document.getElementById("focusDistractions").textContent = focusDistCount;
                    playAlarm();
                }

                setFocusStatus(
                    "distracted",
                    phoneFound
                        ? "⚠️ Phone detected!"
                        : "⚠️ You left the camera!"
                );
            } else {
                if (phoneDetected) {
                    phoneDetected = false;
                    stopAlarm();
                }

                setFocusStatus("focused", "✅ You're focused!");

                focusFocusSecs++;

                const mins = Math.floor(focusFocusSecs / 60);
                document.getElementById("focusFocusTime").textContent = `${mins}m`;
            }

        } catch (e) {
            console.error("Detection error:", e);
        }

        focusDetectLoop = requestAnimationFrame(detect);
    }

    detect();
}

// ─────────────────────────────────
function setFocusStatus(type, text) {
    const statusEl = document.getElementById("focusStatus");
    const iconEl   = document.getElementById("focusStatusIcon");
    const textEl   = document.getElementById("focusStatusText");

    statusEl.className = `focus-status ${type === "distracted" ? "distracted" : ""}`;

    iconEl.className = `focus-status-icon ${type}`;

    iconEl.innerHTML =
        type === "distracted"
        ? '<i class="fas fa-exclamation-triangle"></i>'
        : '<i class="fas fa-check-circle"></i>';

    textEl.textContent = text;
}


// ─────────────────────────────────
function updateFocusTimer() {
    if (!focusStartTime) return;

    const elapsed = Math.floor((Date.now() - focusStartTime) / 1000);

    const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");

    document.getElementById("focusTimer").textContent = `${h}:${m}:${s}`;
}


function toggleCameraPreview() {
    const preview = document.getElementById("focusPreviewContainer");

    if (!preview) return;

    if (preview.style.display === "none") {
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
    }
}


function playAlarm() {
    if (focusAlarmCtx) return;

    focusAlarmCtx = new (window.AudioContext || window.webkitAudioContext)();

    focusAlarmGain = focusAlarmCtx.createGain();
    focusAlarmGain.gain.value = 0.3;
    focusAlarmGain.connect(focusAlarmCtx.destination);

    function beep() {
        if (!focusAlarmCtx) return;

        const osc = focusAlarmCtx.createOscillator();
        osc.type = "square";
        osc.frequency.value = 800;
        osc.connect(focusAlarmGain);
        osc.start();
        osc.stop(focusAlarmCtx.currentTime + 0.15);

        focusAlarmOsc = setTimeout(beep, 500);
    }

    beep();
}


function stopAlarm() {
    if (focusAlarmOsc) {
        clearTimeout(focusAlarmOsc);
        focusAlarmOsc = null;
    }

    if (focusAlarmCtx) {
        focusAlarmCtx.close();
        focusAlarmCtx = null;
        focusAlarmGain = null;
    }
}