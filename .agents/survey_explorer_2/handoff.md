# Handoff Report: Survey Spec Miner 2
**Mission**: Full Pedagogical Curriculum, Mathematical Prerequisites, Jargon Busters, Exam Traps, and 5-Day Study Sprint Specification for Numerical Analysis (ΕΚΠΑ DIT)
**Author**: Survey Spec Miner 2 (`survey_explorer_2`)
**Date**: 2026-09-03T09:35:00Z
**Target Directory**: `D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_2\handoff.md`

---

## 1. Observation
Across the webnotes repository, the following core source files and artifacts were examined in detail:
1. `ORIGINAL_REQUEST.md`: Defines requirements R1–R4 and acceptance criteria for:
   - Standalone `prerequisites.html` ("Μαθηματικά από το Μηδέν") covering matrices, row operations, inverse, derivatives, inequalities, and iteration error.
   - In-place Jargon Busters across all topic pages (`topic1`–`topic7`).
   - High-ROI 5-Day Study Sprint Plan (Days 1–3: MATLAB, Complexity, Weights, Fixed-Point/Newton; Days 4–5: Gauss-Jordan pivoting, Newton interpolation, exam simulation) with persistent `localStorage` checkboxes and 5 instant-reveal micro-drills.
   - ELI5 overhaul of topic pages and `exam_prep.html` with highlighted intermediate arithmetic and student traps.
2. `topic1_direct_linear.html`: Covers Gauss elimination, forward elimination multipliers ($m_{ik} = a_{ik}^{(k)}/a_{kk}^{(k)}$), row operations ($R_i \leftarrow R_i - m_{ik}R_k$), back-substitution, partial pivoting ($\max_{i \ge k} |a_{ik}|$), Gauss-Jordan diagonalization for $A^{-1}$, and complexity constants ($\frac{1}{3}n^3, \frac{1}{2}n^3, \frac{4}{3}n^3, \frac{3}{2}n^3, n^3, n^2$).
3. `topic2_iterative_linear.html`: Covers matrix splittings $A = D - C_L - C_U$, Greek exam normalized conventions $L = D^{-1}C_L, U = D^{-1}C_U$, Jacobi ($B = L + U$), Gauss-Seidel ($\mathcal{L}_1 = (I-L)^{-1}U$), SOR ($\mathcal{L}_\omega = I - \omega(I-\omega L)^{-1}D^{-1}A$), ESOR ($\mathcal{L}_{t,\omega}$), spectral radius $\rho(\mathcal{L}) = \max |\lambda_i| < 1$, and MATLAB implementation.
4. `topic3_nonlinear.html`: Covers fixed-point iterations $x_{n+1} = g(x_n)$, convergence $|g'(\xi)| < 1$, quadratic convergence $g'(\xi) = 0, g''(\xi) \ne 0$, Newton-Raphson $x_{n+1} = x_n - f(x_n)/f'(x_n)$, and the 5 conditions for global convergence.
5. `topic4_interpolation.html`: Covers divided differences $f[x_i, \dots, x_{i+k}]$, forward differences $\Delta^k f_0$ for equidistant nodes, incremental polynomial construction $P_{k+1}(x) = P_k(x) + \dots$, Runge phenomenon, and theoretical error $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod (x - x_i)$.
6. `topic5_integration.html`: Covers simple & composite Simpson 1/3 and 3/8, degree of precision, determining quadrature weights $w_i$ by integrating monomials $1, x, x^2, \dots$, error term $E = -\frac{h^4(b-a)}{180} f^{(4)}(\xi)$, and why Simpson integrates cubics exactly.
7. `topic6_odes.html`: Covers initial value problems (IVPs) $y' = f(x, y)$, step size $h = (b-a)/n$, Euler method $y_{k+1} = y_k + h f(x_k, y_k)$, and Taylor 3-term method $y_{k+1} = y_k + h y'_k + \frac{h^2}{2} y''_k$ with $y'' = \frac{d}{dx}f(x, y) = f_x + f_y \cdot y'$.
8. `topic7_matlab_guide.html`: Covers MATLAB matrix commands (`norm`, `cond`, `eig`, `det`, `trace`, `rank`, `roots`, `poly`, `polyval`, `polyder`, `conv`, `deconv`, `polyfit`), column-major indexing, and script authoring.
9. `exam_prep.html`: Identifies 8 recurring model question types (Types A–H) comprising 90+ marks of every past exam, strategy ordering, cost algebra table, and missing calculation intermediate steps.
10. `data/flashcards.js` & `data/questions.js`: Over 45 flashcards and 60+ interactive quiz questions spanning topics 1 to 7 and exam prep.

---

## 2. Logic Chain
1. **Student Persona & Constraints**:
   - The user specification dictates a "zero-background" student who must pass the ΕΚΠΑ DIT Numerical Analysis exam (target grade: 5–6/10) within a strict 5–6 day sprint.
   - Students failing this course overwhelmingly fail not because the numerical analysis concepts are unfathomable, but because of **algebraic stumbling blocks** (matrix operations, negative sign distribution, fraction arithmetic, double inequalities, implicit differentiation) and **unexplained mathematical jargon**.
2. **Pedagogical Gap in Topic Pages**:
   - Currently, topic pages jump into formulas such as $m_{ik} = a_{ik}/a_{kk}$, $A = D - L - U$, or $|g'(x)| < 1$ assuming students already comfortably manipulate matrix indices, understand why $A^{-1} \ne 1/A$, know how to solve $-1 < 1 - 2\sqrt{3}\lambda < 1$ without dropping negative signs, and know what a spectral radius is.
   - Therefore, a dedicated `prerequisites.html` page must provide visual, step-by-step arithmetic from first principles with zero assumed knowledge.
3. **In-Place Jargon Demystification**:
   - Students looking at Greek exam papers freeze when they see terms like "φασματική ακτίνα" (spectral radius), "μερική οδήγηση" (partial pivoting), "βαθμός ακρίβειας" (degree of precision), or "κυρίαρχη ιδιοτιμή" (dominant eigenvalue).
   - In-place collapsible Jargon Busters directly on topics 1–7 and exam prep eliminate context switching and demystify mathematical notation into plain student Greek.
4. **High-ROI Sequencing Strategy**:
   - Examination analysis proves that **Thema 3 (MATLAB) yields 30 marks** with purely mechanical memorization (command lookup + 10-line matrix iteration function).
   - **Thema 2.2 (Quadrature weights & precision) yields 12–14 marks** by solving a simple $3 \times 3$ linear system of moments.
   - **Thema 1.1 (Fixed-point / Newton convergence) yields 10–12 marks** with 1 derivative and 1 double inequality.
   - **Thema 1.3 (Complexity algebra) yields 11–16 marks** by counting $n^3$ terms from the SOS table and canceling $A^{-1}$ via multiplying by $A$.
   - Together, Days 1–3 lock in **65–70 marks**, guaranteeing a PASS before the student even tackles the time-consuming manual elimination of Gauss-Jordan (Thema 1.2) or Newton interpolation tables (Thema 2.1) on Days 4–5.

---

## 3. Caveats
- No changes have been made to existing codebase HTML/JS files in this survey phase (adhering strictly to Specification Miner read-only rules).
- The syllabus surveyed specifically reflects the ΕΚΠΑ Department of Informatics & Telecommunications (DIT) Numerical Analysis course structure (3 Themes, 100 marks, 2.5 hours, 40/30/30 distribution).
- Course topics such as Hermite interpolation, cubic splines, Chebyshev economization, and Romberg integration exist in departmental theory slides but have never appeared in written exam papers; they are intentionally de-emphasized to maintain High-ROI sprint discipline.

---

## 4. Conclusion & Pedagogical Blueprint

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Navigation | `prerequisites.html` Hub | Dedicated zero-to-hero math foundations page linked across nav and index | User clicks | Rendered guide with numeric drills | 404 if not linked in `nav.js` | ORIGINAL_REQUEST R1 |
| 2 | Prereq | Matrix Algebra 101 | $m \times n$ anatomy, row/col indices, dot products, matrix multiply | Matrix pairs | Product matrix, step-by-step | Dimension mismatch $n_A \ne m_B$ | ORIGINAL_REQUEST R1 |
| 3 | Prereq | Row Ops & Sign Safety | Elementary row operations $R_i \leftarrow R_i - m R_j$ with multiplier tracking | Rows, multipliers | Transformed rows | Multiplier division by zero | ORIGINAL_REQUEST R1 |
| 4 | Prereq | Identity & Inverse | Meaning of $I, A^{-1}$, why $A^{-1} \ne 1/A$, $\det(A) \ne 0$ | Square matrix $A$ | $A^{-1}$ verification | Singular matrix non-invertibility | ORIGINAL_REQUEST R1 |
| 5 | Prereq | Calculus & Taylor Series | Polynomial derivatives, chain rule for ODEs, Taylor 3-term | Function $f(x)$, point | $f'(x), f''(x)$, series | Undefined derivative | ORIGINAL_REQUEST R1 |
| 6 | Prereq | Absolute Value Inequalities | Solving $|x - c| < r$ and $|g'(\xi)| < 1$ with sign flipping | Inequality expression | Valid parameter interval | Direction flip error on negative div | ORIGINAL_REQUEST R1 |
| 7 | Prereq | Iteration Error & Residual | Absolute error, relative error, residual vector $r = b - Ax$ | Iterates $x^{(k)}, \xi$ | Error metrics | Division by near-zero $\xi$ | ORIGINAL_REQUEST R1 |
| 8 | Pedagogy | In-Place Jargon Busters | Collapsible callouts demystifying symbols/terms on Topics 1–7 | Click/hover | ELI5 definition & intuition | Hidden if JS disabled | ORIGINAL_REQUEST R1 |
| 9 | Pedagogy | 5-Day Study Sprint Roadmap | High-ROI study plan (Days 1–3: 60 marks, Days 4–5: 40 marks) | Sprint Day | Checklist, milestones, drills | Saved to localStorage | ORIGINAL_REQUEST R2 |
| 10 | Interactive | LocalStorage Checklist | Checkboxes for daily study progress surviving page reloads | Checkbox click | Persisted JSON state | Fallback to session state | ORIGINAL_REQUEST R2 |
| 11 | Interactive | 5 Instant-Reveal Micro-drills | Daily self-test problems with clickable solution reveals | User click "Αποκάλυψη" | Step-by-step verified solution | Hidden by default | ORIGINAL_REQUEST R2 |
| 12 | Pedagogy | Step-by-Step Arithmetic Overhaul | Unfolding intermediate steps for all model exam questions | Exam problem | Highlighted step calculations | Jump-to-solution omissions | ORIGINAL_REQUEST R3 |
| 13 | Pedagogy | Common Student Trap Warnings | Explicit warnings on recurring exam mistakes per topic | Topic context | Warning callouts | Unwarned student failure | ORIGINAL_REQUEST R3 |

### Edge Cases
| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Row Operations | Negative multiplier $m_{ik} = -2$ | Traps students into subtracting twice: $R_i - (-2)R_k \ne R_i - 2R_k$. Must be written $R_i + 2R_k$. |
| 2 | Partial Pivoting | Zero or near-zero on diagonal $a_{kk} \approx 0$ | Standard Gauss elimination crashes or blows up rounding error. Pivoting selects $\max_{i \ge k} |a_{ik}|$ and swaps rows. |
| 3 | Fixed Point Convergence | Dividing by negative number $-2\sqrt{3}\lambda < 0$ | Students forget that dividing an inequality by a negative number reverses the direction ($<$ becomes $>$). |
| 4 | Fixed Point Order | Parameter $\lambda = 0$ | Gives $g(x) = x$, freezing the iteration into a stationary point $x_0$ that never converges to the root. |
| 5 | Newton Interpolation | Non-equidistant nodes (e.g. $x = [-2, -1, 1, 3]$) | Forward difference formula fails. Must check $\Delta x_i$ and switch to divided differences $f[x_i, \dots, x_k]$. |
| 6 | Simpson Rule | Counting data points instead of intervals | $k$ points mean $n = k - 1$ intervals. Simpson 1/3 requires an **even number of intervals** (odd number of points). |
| 7 | Quadrature Precision | Quadrature with fixed endpoint (e.g. $x_2 = 1$) | Formula degree of precision is NOT $2n-1$. Must count free parameters ($n_{\text{free}} - 1 = 3 - 1 = 2$). |
| 8 | MATLAB Indexing | Column-major vs row-major | `find(A > 1)` lists linear indices scanning down columns first. `A(:)` vectorizes column-wise. |
| 9 | MATLAB Matrix Splitting | `diag(A)` vs `diag(diag(A))` | `diag(A)` on a matrix returns a vector. Calling `diag(diag(A))` is required to produce a diagonal matrix $D$. |
| 10 | MATLAB Polynomial Derivative | `diff(p)` vs `polyder(p)` | `diff` calculates finite differences between vector elements. `polyder` computes actual polynomial derivative coefficients. |

---

### CATALOG 1: Mathematical Prerequisites Specification (`prerequisites.html`)
The new standalone page `prerequisites.html` ("Μαθηματικά από το Μηδέν") must present 7 core modules, each featuring friendly ELI5 language, visual layout, and worked numerical examples:

#### 1.1 Matrix Anatomy & Dimensions ($m \times n$)
- **Core Concept**: A matrix is a rectangular grid of numbers with $m$ rows (horizontal) and $n$ columns (vertical).
- **Notation**: $A \in \mathbb{R}^{m \times n}$. Element $a_{ij}$ lives in row $i$ and column $j$.
- **Mnemonic**: "Γραμμή-Στήλη" (Γ-Σ) like "Γιώργος-Σωτήρης" or Row-Column (RC cola).
- **Concrete Example**:
  $$A = \begin{bmatrix} 5 & -2 & 3 \\ 0 & 4 & 1 \end{bmatrix}$$
  Dimension is $2 \times 3$ (2 rows, 3 columns). $a_{11} = 5, a_{12} = -2, a_{22} = 4, a_{23} = 1$.
- **Relevance**: Used in Topic 1 (Direct methods), Topic 2 (Iterative methods), Topic 7 (MATLAB `size(A, 1)`).

#### 1.2 Matrix Addition & Multiplication
- **Addition**: Only matrices of the **exact same dimensions** can be added/subtracted element-wise.
- **Multiplication**: $A (m \times k)$ can multiply $B (k \times n)$ only if columns of $A$ equal rows of $B$. Result is $m \times n$.
- **The "Row-Times-Column" Dot Product Recipe**:
  $$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} 5 & 6 \\ 0 & -1 \end{bmatrix} = \begin{bmatrix} (1)(5)+(2)(0) & (1)(6)+(2)(-1) \\ (3)(5)+(4)(0) & (3)(6)+(4)(-1) \end{bmatrix} = \begin{bmatrix} 5 & 4 \\ 15 & 14 \end{bmatrix}$$
- **Student Trap**: Matrix multiplication is **not commutative**: $A B \ne B A$ in general!

#### 1.3 The Identity Matrix $I$ and Inverse $A^{-1}$
- **Identity Matrix $I$**: The matrix equivalent of the number 1. Square matrix with 1s on main diagonal and 0s elsewhere:
  $$I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$
  For any matrix $A$, $A I = I A = A$.
- **Inverse Matrix $A^{-1}$**: The matrix such that $A A^{-1} = A^{-1} A = I$.
- **ELI5 Warning**: $A^{-1}$ is **NOT** $1/A$ or dividing each element by 1! You cannot divide by a matrix in linear algebra.
- **Existence Condition**: Inverse exists if and only if $\det(A) \ne 0$ (non-singular matrix).

#### 1.4 Elementary Row Operations & Multiplier Safety
- **Core Formula**: $R_i \leftarrow R_i - m_{ik} R_k$, where $m_{ik} = \frac{a_{ik}}{a_{kk}}$ is the elimination multiplier.
- **Negative Sign Safety Rules**:
  1. Always write down the multiplier with its explicit sign: $m_{ik} = \frac{-4}{2} = -2$.
  2. The row operation is $R_i - (-2)R_k \implies R_i + 2R_k$.
  3. Never perform mental arithmetic on negative row operations; write the scratch row beneath!
- **Concrete Example**:
  Eliminating $x_1$ from row 2 using row 1:
  $$R_1 = [2, 1, -1 \mid 8], \quad R_2 = [4, 3, 1 \mid 19]$$
  $$m_{21} = \frac{4}{2} = 2 \implies R_2 - 2R_1 = [4-4, 3-2, 1-(-2) \mid 19-16] = [0, 1, 3 \mid 3]$$

#### 1.5 Basic Single-Variable Calculus & Taylor Series
- **Power Rule**: $\frac{d}{dx}(x^n) = n x^{n-1}$. Example: $(x^3)' = 3x^2, (6x)' = 6, (5)' = 0$.
- **Critical Points**: Points where $f'(x) = 0$.
- **Implicit Derivative in ODEs**: Since $y$ is an unknown function of $x$, $\frac{d}{dx}(y) = y'$.
  Example: if $y' = y - x^2 + 1$, then $y'' = \frac{d}{dx}(y - x^2 + 1) = y' - 2x = (y - x^2 + 1) - 2x$.
- **Taylor Series (3 terms)**: Approximating a function near $x_0$:
  $$y(x_0 + h) \approx y(x_0) + h y'(x_0) + \frac{h^2}{2} y''(x_0)$$

#### 1.6 Absolute Value Inequalities
- **Fundamental Rule**: $|u| < c \iff -c < u < c$ (for $c > 0$).
- **Convergence Condition $|g'(\xi)| < 1$**:
  $$-1 < g'(\xi) < 1$$
- **Step-by-Step Negative Division Rule**:
  When solving $-2 < -2\sqrt{3}\lambda < 0$:
  Dividing across by $-2\sqrt{3}$ reverses the inequality symbols:
  $$\frac{-2}{-2\sqrt{3}} > \lambda > \frac{0}{-2\sqrt{3}} \iff \frac{1}{\sqrt{3}} > \lambda > 0 \iff 0 < \lambda < \frac{1}{\sqrt{3}}$$
  Failure to reverse signs is the #1 reason students lose 6 marks in Thema 1.1!

#### 1.7 Iteration Error, Residuals & Convergence
- **True Solution $\xi$, Iteration Approximation $x^{(k)}$**:
- **Absolute Error**: $\varepsilon_{\text{abs}} = |x^{(k)} - \xi|$.
- **Relative Error**: $\varepsilon_{\text{rel}} = \frac{|x^{(k)} - \xi|}{|\xi|}$ (or in vector norm: $\frac{\|x^{(k)} - x\|}{\|x\|}$).
- **Residual Vector**: $r = b - A x_{\text{approx}}$. Measures how well the equations are satisfied. A small residual does not always mean a small error if $\text{cond}(A) \gg 1$!
- **Convergence Metric**: An iterative method converges if $x^{(k)} \to \xi$ as $k \to \infty$, guaranteed when $\rho(\mathcal{L}) < 1$ or $|g'(\xi)| < 1$.

---

### CATALOG 2: Topic-by-Topic Jargon Busters
To be embedded as collapsible `<details class="jargon-buster">` callouts across pages:

| Topic | Term | Symbol | Plain-Greek Meaning | ELI5 Intuition / Exam Relevance |
|-------|------|--------|---------------------|---------------------------------|
| **Topic 1** | Πολλαπλασιαστής Απαλοιφής | $m_{ik}$ | Ο λόγος $\frac{a_{ik}}{a_{kk}}$ | Ο αριθμός που πολλαπλασιάζεις τη γραμμή-οδηγό για να μηδενίσεις το στοιχείο από κάτω. |
| **Topic 1** | Μερική Οδήγηση | Partial Pivoting | Εναλλαγή γραμμών ώστε $|a_{kk}| = \max$ | Ψάχνεις στην ίδια στήλη από τη διαγώνιο και κάτω το μεγαλύτερο κατ' απόλυτη τιμή στοιχείο για να αποφύγεις διαίρεση με μικρό αριθμό. |
| **Topic 1** | Επαυξημένος Πίνακας | $[A \mid b]$ | Ο πίνακας με το διάνυσμα δεξιού μέλους κολλημένο δεξιά | Κάνεις τις ίδιες ακριβώς πράξεις ταυτόχρονα και στα δύο μέλη των εξισώσεων. |
| **Topic 1** | Πίσω Αντικατάσταση | Back Substitution | Λύση από κάτω προς τα πάνω | Αφού ο πίνακας γίνει τριγωνικός, βρίσκεις πρώτα το $x_n$, μετά το αντικαθιστάς στην από πάνω εξίσωση για το $x_{n-1}$ κ.ο.κ. |
| **Topic 2** | Φασματική Ακτίνα | $\rho(\mathcal{L})$ | $\max_i |\lambda_i|$ | Το μέγεθος της μεγαλύτερης ιδιοτιμής. Αν $\rho < 1$, η μέθοδος συγκλίνει. Όσο πιο κοντά στο 0, τόσο πιο γρήγορα συγκλίνει! |
| **Topic 2** | Αυστηρά Διαγώνια Υπερέχων | SDD Matrix | $|a_{ii}| > \sum_{j \ne i} |a_{ij}|$ | Το στοιχείο της διαγωνίου σε κάθε γραμμή είναι μεγαλύτερο από το άθροισμα όλων των άλλων μαζί. Εγγυάται σύγκλιση Jacobi & Gauss-Seidel! |
| **Topic 2** | Κανονικοποιημένοι Τριγωνικοί | $L, U$ | $L = D^{-1}C_L, U = D^{-1}C_U$ | Τα κάτω και άνω τρίγωνα αφού διαιρεθούν με τα διαγώνια στοιχεία και αλλάξουν πρόσημο (σύμβαση θεμάτων DIT). |
| **Topic 2** | Συντελεστής Υπερχαλάρωσης | $\omega$ (omega) | Παράμετρος επιτάχυνσης SOR | Για $\omega = 1$ δίνει Gauss-Seidel. Για $1 < \omega < 2$ επιταχύνει τη σύγκλιση (υπερχαλάρωση). |
| **Topic 3** | Σταθερό Σημείο | $\xi$ (xi) | Σημείο όπου $g(\xi) = \xi$ | Ο αριθμός που αν τον περάσεις από τη συνάρτηση $g$ σου επιστρέφει ακριβώς τον ίδιο αριθμό. Εκεί τέμνεται η $y=g(x)$ με την $y=x$. |
| **Topic 3** | Τάξη Σύγκλισης | $p$ (order) | $e_{n+1} \approx C e_n^p$ | $p=1$ (γραμμική): σταθερό κέρδος δεκαδικών. $p=2$ (τετραγωνική): διπλασιάζονται τα σωστά δεκαδικά ψηφία σε κάθε βήμα! |
| **Topic 3** | Τοπική vs Γενική Σύγκλιση | Local vs Global | Κοντά στη ρίζα vs από παντού | Τοπική ($|g'(\xi)| < 1$): συγκλίνει αν ξεκινήσεις «κοντά». Γενική (5 συνθήκες N-R): συγκλίνει από οποιοδήποτε $x_0 \in [a, b]$. |
| **Topic 4** | Κόμβοι Παρεμβολής | $x_0, \dots, x_n$ | Τα γνωστά σημεία στο $x$ | Τα σημεία όπου γνωρίζουμε την ακριβή τιμή της συνάρτησης και από όπου υποχρεούται να περάσει το πολυώνυμο. |
| **Topic 4** | Διηρημένη Διαφορά | $f[x_0, \dots, x_k]$ | Αναδρομικό πηλίκο διαφορών | Το αντίστοιχο της παραγώγου για διακριτά σημεία. Στον παρονομαστή μπαίνει πάντα: τελευταίος κόμβος μείον πρώτος! |
| **Topic 4** | Φαινόμενο Runge | Runge Phenomenon | Άγριες ταλαντώσεις στα άκρα | Όταν αυξάνεις υπερβολικά τον βαθμό πολυωνύμου με ισαπέχοντα σημεία, το πολυώνυμο ξεφεύγει ανεξέλεγκτα στα άκρα. |
| **Topic 5** | Αριθμητική Ολοκλήρωση / Quadrature | $\int_a^b f(x)dx \approx \sum w_i f(x_i)$ | Υπολογισμός εμβαδού με σταθμισμένο άθροισμα | Αντικατάσταση του ολοκληρώματος με άθροισμα τιμών στα σημεία $x_i$ πολλαπλασιασμένων με κατάλληλα βάρη $w_i$. |
| **Topic 5** | Βαθμός Ακρίβειας | Degree of Precision ($d$) | Μέγιστο $k$ ώστε $E(x^k) = 0$ | Ο μεγαλύτερος βαθμός πολυωνύμου που ο τύπος ολοκληρώνει με μηδενικό σφάλμα. Για Simpson είναι 3 (όχι 2!). |
| **Topic 6** | Πρόβλημα Αρχικών Τιμών | IVP | ΣΔΕ $y'=f(x,y)$ με $y(x_0)=y_0$ | Μια εξίσωση ρυθμού μεταβολής με γνωστή αφετηρία, από την οποία προχωράμε βήμα-βήμα στο μέλλον. |
| **Topic 6** | Τοπικό vs Ολικό Σφάλμα | Truncation Error | Σφάλμα 1 βήματος vs σφάλμα στο τέλος | Το τοπικό σφάλμα γίνεται σε κάθε επιμέρους βήμα $h$. Το ολικό σφάλμα συσσωρεύει όλα τα τοπικά σφάλματα μέχρι το τέλος του διαστήματος. |
| **Topic 7** | Αριθμός Συνθήκης | $\text{cond}(A)$ | $\|A\| \cdot \|A^{-1}\|$ | Μετρητής ευαισθησίας του συστήματος $Ax=b$. Αν $\text{cond}(A) \approx 1$ είναι καλά ορισμένο. Αν $\text{cond}(A) \gg 1$ είναι κακορυθμισμένο (μικρό σφάλμα στα δεδομένα προκαλεί τεράστιο σφάλμα στη λύση). |
| **Topic 7** | Column-Major Διάταξη | Column-Major Order | Αρίθμηση κατά στήλες | Στο MATLAB τα στοιχεία ενός πίνακα αποθηκεύονται στη μνήμη κατά στήλη: 1η στήλη όλη, μετά 2η στήλη κ.ο.κ. |

---

### CATALOG 3: Exam Prep Problem Audit, Calculation Gaps & Student Traps
Detailed audit of `exam_prep.html` 8 model question types:

#### Type A: Fixed Point with Parameter $\lambda$ (Thema 1.1, 10–12 marks)
- **Current Gap in Notes**: Notes state $g'(x) = 1 + 2\lambda x$ and then jump to $-1/\sqrt{3} < \lambda < 0$. They omit the explicit two-sided inequality solution step and don't explain what happens when the root is negative ($\xi = -\sqrt{3}$).
- **Step-by-Step Fix**:
  1. Write $g(x) = x + \lambda(x^2 - 3)$.
  2. Differentiate: $g'(x) = 1 + 2\lambda x$.
  3. Substitute $\xi = \sqrt{3}$: $g'(\sqrt{3}) = 1 + 2\sqrt{3}\lambda$.
  4. Write double inequality: $-1 < 1 + 2\sqrt{3}\lambda < 1$.
  5. Subtract 1: $-2 < 2\sqrt{3}\lambda < 0$.
  6. Divide by $2\sqrt{3} > 0$: $-\frac{2}{2\sqrt{3}} < \lambda < 0 \implies -\frac{1}{\sqrt{3}} < \lambda < 0$.
  7. For quadratic convergence: set $g'(\sqrt{3}) = 0 \implies 1 + 2\sqrt{3}\lambda = 0 \implies \lambda = -\frac{1}{2\sqrt{3}}$.
  8. Verify $g''(x) = 2\lambda = -\frac{1}{\sqrt{3}} \ne 0$ and check $-\frac{1}{2\sqrt{3}} \in (-\frac{1}{\sqrt{3}}, 0)$.
- **Student Traps**:
  - *Trap 1*: If $\xi = -\sqrt{3}$ (as in June 2025), $g'(-\sqrt{3}) = 1 - 2\sqrt{3}\lambda$. The inequality is $-2 < -2\sqrt{3}\lambda < 0$. Dividing by $-2\sqrt{3}$ flips inequalities to give $0 < \lambda < \frac{1}{\sqrt{3}}$!
  - *Trap 2*: Choosing $\lambda = 0$. This gives $g(x) = x$, which freezes the sequence at $x_0$.

#### Type B: Gauss-Jordan Inverse with Partial Pivoting (Thema 1.2, 12–14 marks)
- **Current Gap in Notes**: Notes show row operations in shorthand (`R2 + ½R1`, `R3 - ½R1`) and jump between matrix snapshots without writing the element-by-element arithmetic of the right-hand identity matrix $[I]$.
- **Step-by-Step Fix**:
  1. Augment $A$ with $I_3$: $[A \mid I]$.
  2. Column 1: inspect $|a_{11}|, |a_{21}|, |a_{31}|$. Find maximum $|2|$ in Row 3. Swap $R_1 \leftrightarrow R_3$ **across both $A$ and $I$**.
  3. Compute multipliers $m_{21} = a_{21}/a_{11} = -1/2$, $m_{31} = a_{31}/a_{11} = 1/2$.
  4. Perform $R_2 \leftarrow R_2 - (-1/2)R_1 = R_2 + 1/2 R_1$ and $R_3 \leftarrow R_3 - 1/2 R_1$. Show both left and right blocks explicitly.
  5. Column 2: inspect $|a_{22}|=0, |a_{32}|=2$. Swap $R_2 \leftrightarrow R_3$.
  6. Clear column 2 above and below: $R_1 \leftarrow R_1 + R_2$, $R_3$ is already 0.
  7. Clear column 3: $R_1 \leftarrow R_1 - 2R_3$.
  8. Divide each row by its diagonal pivot to normalize to $I_3$. Read off $A^{-1}$.
  9. 10-second verification: multiply row 1 of $A$ by column 1 of $A^{-1}$ to confirm it equals 1.
- **Student Traps**:
  - *Trap 1*: Forgetting to swap elements on the right-hand identity matrix $I$ when doing row interchanges!
  - *Trap 2*: Searching for pivots across the entire matrix rather than strictly in column $k$ from row $k$ downwards.

#### Type C: Complexity Algebra & System Transformation (Thema 1.3, 11–16 marks)
- **Current Gap in Notes**: Lacks explicit explanation of why $A^{-1}b$ costs $n^2$ rather than $3n^3/2$, and why matrix non-commutativity forbids multiplying by $A$ from the right.
- **Step-by-Step Fix**:
  1. Write the SOS cost table on the exam paper margin immediately:
     - Solve system: Gauss $n^3/3$, Jordan $n^3/2$
     - Inverse: Gauss $4n^3/3$, Jordan $3n^3/2$
     - Matrix $\times$ Matrix: $n^3$
     - Matrix $\times$ Vector: $n^2$ (negligible)
  2. Break down every single term in the given equation $(A^{-1} + BC^{-1})x = A^{-1}b$:
     - Term $A^{-1}$: computed once $= 4n^3/3$ (for Gauss)
     - Term $C^{-1}$: computed once $= 4n^3/3$
     - Term $B C^{-1}$: product of two $n \times n$ matrices $= n^3$
     - Term $A^{-1}b$: matrix-vector product with pre-computed $A^{-1} = n^2 \approx 0$
     - Final solve: $(M)x = d$ with Gauss $= n^3/3$
     - Initial Total: $\frac{4}{3}n^3 + \frac{4}{3}n^3 + n^3 + \frac{1}{3}n^3 = 4n^3$.
  3. Transformation: Multiply both sides from the left by $A$:
     $$A(A^{-1} + BC^{-1})x = A A^{-1} b \implies (I + ABC^{-1})x = b$$
  4. Recount new cost:
     - $C^{-1}$: $4n^3/3$
     - $AB$: $n^3$
     - $(AB)C^{-1}$: $n^3$
     - Solve: $n^3/3$
     - Transformed Total: $\frac{4}{3}n^3 + 2n^3 + \frac{1}{3}n^3 = \frac{11}{3}n^3 \approx 3.67n^3$.
  5. Conclusion sentence: "Η πολυπλοκότητα μειώθηκε από $4n^3$ σε $\frac{11}{3}n^3$, εξοικονομώντας έναν πλήρη υπολογισμό αντιστρόφου ($4n^3/3$) με κόστος έναν επιπλέον πολλαπλασιασμό ($n^3$)."
- **Student Traps**:
  - *Trap 1*: Double-charging $A^{-1}$ in $A^{-1}b$.
  - *Trap 2*: Confusing Gauss constants ($n^3/3, 4n^3/3$) with Jordan constants ($n^3/2, 3n^3/2$).

#### Type D: Newton Interpolation & Simpson Rule (Thema 2.1, 15–16 marks)
- **Current Gap in Notes**: Doesn't emphasize the critical initial check: "Are the nodes equidistant?"
- **Step-by-Step Fix**:
  1. Check node spacing $\Delta x_i$: if constant $h \implies$ forward differences $\Delta^k f_0$. If non-constant $\implies$ divided differences $f[x_i, \dots, x_k]$.
  2. Construct full divided difference table. Emphasize that the denominator is $x_{\text{last}} - x_{\text{first}}$.
  3. Form polynomial: $P_k(x) = c_0 + c_1(x-x_0) + c_2(x-x_0)(x-x_1) + \dots$
  4. Adding a point: explicitly write $P_{k+1}(x) = P_k(x) + c_{k+1} \prod_{j=0}^k (x - x_j)$ without recalculating previous terms.
  5. Error analysis: $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod (x - x_i)$. If $f$ is a polynomial of degree $m \le n$, then $f^{(n+1)} \equiv 0 \implies E(x) \equiv 0$.
  6. Simpson: count intervals $N = \text{points} - 1$. If $N=2 \implies$ simple Simpson 1/3: $\frac{h}{3}(f_0 + 4f_1 + f_2)$. Error is $E = -\frac{h^4(b-a)}{180} f^{(4)}(\xi) = 0$ for cubic polynomials.
- **Student Traps**:
  - *Trap 1*: Using forward differences when node intervals differ.
  - *Trap 2*: Confusing number of points with number of intervals in Simpson.

#### Type E: Quadrature Weights & Degree of Precision (Thema 2.2, 12–14 marks)
- **Current Gap in Notes**: Notes omit the step-by-step substitution when solving the $3 \times 3$ linear system for $w_i$.
- **Step-by-Step Fix**:
  1. State: formula must be exact for $f(x) = 1, x, x^2, \dots$ up to the number of free parameters.
  2. Compute exact integrals $\int_a^b x^k dx = \frac{b^{k+1} - a^{k+1}}{k+1}$. Note that on $[-a, a]$, odd powers integrate to 0!
  3. Equate with formula: $\sum w_i (x_i)^k = \int_a^b x^k dx$.
  4. Solve system for $w_i$.
  5. Test the next power $x^{k+1}$ to find where it fails. The degree of precision is the last power that held with equality.
- **Student Traps**:
  - *Trap 1*: Blindly assuming Gauss degree of precision $2n-1$ when nodes $x_i$ are fixed in the problem statement.

#### Type F: Newton-Raphson 5 Global Convergence Conditions (Thema 1.1, 10–12 marks)
- **Current Gap in Notes**: Often students confuse the single local condition ($|g'(\xi)| < 1$) with the 5 global conditions.
- **Step-by-Step Fix**:
  - List with checkboxes:
    1. $f \in C^2[a, b]$ (continuity)
    2. $f(a) f(b) < 0$ (Bolzano root existence)
    3. $f'(x) \ne 0$ for all $x \in [a, b]$ (monotonicity / root uniqueness)
    4. $f''(x)$ maintains constant sign on $[a, b]$ (convexity / no inflection)
    5. $|f(c)/f'(c)| \le b-a$ for an endpoint $c$ (first step stays within interval).

#### Type G: ODEs Taylor 3-Term Method (Thema 2.3, 8 marks)
- **Current Gap in Notes**: Differentiating $y' = f(x, y)$ implicitly.
- **Step-by-Step Fix**:
  1. $h = (b-a)/n$.
  2. $y'' = \frac{d}{dx} f(x, y) = f_x + f_y \cdot y'$.
  3. Evaluate $y'_0$ and $y''_0$ using initial conditions $(x_0, y_0)$.
  4. Apply $y_1 = y_0 + h y'_0 + \frac{h^2}{2} y''_0$.

#### Type H: MATLAB Exam Questions (Thema 3, 30 marks)
- **Current Gap in Notes**: Column-major linear index mapping and the double-diag distinction.
- **Step-by-Step Fix**:
  1. Column-major table diagram for matrix indices.
  2. Clarifying `diag(diag(A))` vs `diag(A)`.
  3. Explaining why `CL = -tril(A, -1)` requires a minus sign (DIT exam convention).

---

### CATALOG 4: 5-Day Study Sprint Plan & 5 Verified Micro-Drills

#### Sprint Architecture (High-ROI First)
- **Day 1: MATLAB Power-Pack (Target: 30 Marks)**
  - Objectives: Master all MATLAB commands (`norm`, `cond`, `eig`, `det`, `roots`, `polyder`, `polyfit`), column-major indexing, and write the 10-line matrix iteration function (`sorMatrix`).
  - Expected Score: 30/100.
- **Day 2: Complexity Algebra & System Optimization (Target: 15 Marks)**
  - Objectives: Memorize the SOS Cost Table (Gauss vs Jordan), master term-by-term operation accounting, and left-multiply by $A$ to cancel $A^{-1}$.
  - Cumulative Score: 45/100.
- **Day 3: Fixed-Point & Newton-Raphson Convergence (Target: 15 Marks)**
  - Objectives: Find parameter $\lambda$ for local convergence $|g'(\xi)| < 1$ and quadratic convergence $g'(\xi) = 0$. Verify the 5 global convergence conditions for Newton-Raphson.
  - Cumulative Score: 60/100 (Pass threshold 50/100 reached!).
- **Day 4: Quadrature Weights & Simpson Rules (Target: 15 Marks)**
  - Objectives: Solve $3 \times 3$ moment systems for weights $w_i$, verify degree of precision, apply composite Simpson 1/3, and justify zero error for cubics.
  - Cumulative Score: 75/100.
- **Day 5: Gauss-Jordan Pivoting & Newton Interpolation (Target: 25 Marks) + Exam Simulation**
  - Objectives: Execute Gauss-Jordan with partial pivoting for $[A \mid I] \to [I \mid A^{-1}]$, build divided difference tables, compute interpolation error, review ODE Taylor 3-term, and complete a full 2.5-hour mock exam.
  - Cumulative Score: 100/100 (Targeting 80+ in real exam).

---

#### 5 Instant-Reveal Micro-Drills (Mathematically Verified)

##### Micro-Drill 1 (Day 1: MATLAB Iteration Matrix & Spectral Radius)
- **Problem**:
  Given the $2 \times 2$ matrix:
  $$A = \begin{bmatrix} 4 & -1 \\ 2 & 4 \end{bmatrix}$$
  (a) Determine the normalized matrices $D, L, U$ according to the course convention.
  (b) Compute the Jacobi iteration matrix $B = L + U$ and its spectral radius $\rho(B)$.
  (c) Compute the Gauss-Seidel iteration matrix $\mathcal{L}_1 = (I - L)^{-1} U$ and its spectral radius $\rho(\mathcal{L}_1)$.
  (d) Write the 5-line MATLAB snippet that computes $\rho(\mathcal{L}_1)$.
- **Hint**: Course convention defines $L = D^{-1}(-\text{tril}(A, -1))$ and $U = D^{-1}(-\text{triu}(A, 1))$. For a $2 \times 2$ matrix, eigenvalues of $\begin{bmatrix} 0 & a \\ b & 0 \end{bmatrix}$ are $\pm \sqrt{ab}$.
- **Verified Solution**:
  1. Diagonal: $D = \begin{bmatrix} 4 & 0 \\ 0 & 4 \end{bmatrix} \implies D^{-1} = \begin{bmatrix} 1/4 & 0 \\ 0 & 1/4 \end{bmatrix}$.
  2. Strict Lower/Upper with opposite sign:
     $$C_L = -\text{tril}(A, -1) = \begin{bmatrix} 0 & 0 \\ -2 & 0 \end{bmatrix}, \quad C_U = -\text{triu}(A, 1) = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$$
  3. Normalized $L, U$:
     $$L = D^{-1} C_L = \begin{bmatrix} 0 & 0 \\ -1/2 & 0 \end{bmatrix}, \quad U = D^{-1} C_U = \begin{bmatrix} 0 & 1/4 \\ 0 & 0 \end{bmatrix}$$
  4. Jacobi matrix $B$:
     $$B = L + U = \begin{bmatrix} 0 & 1/4 \\ -1/2 & 0 \end{bmatrix}$$
     Eigenvalues: $\det(B - \lambda I) = \lambda^2 - (1/4)(-1/2) = \lambda^2 + 1/8 = 0 \implies \lambda = \pm i \frac{1}{\sqrt{8}} = \pm i \frac{\sqrt{2}}{4}$.
     $$\rho(B) = \max |\lambda| = \frac{1}{\sqrt{8}} \approx 0.3536 < 1 \quad (\text{Jacobi converges!})$$
  5. Gauss-Seidel matrix $\mathcal{L}_1$:
     $$I - L = \begin{bmatrix} 1 & 0 \\ 1/2 & 1 \end{bmatrix} \implies (I - L)^{-1} = \begin{bmatrix} 1 & 0 \\ -1/2 & 1 \end{bmatrix}$$
     $$\mathcal{L}_1 = (I - L)^{-1} U = \begin{bmatrix} 1 & 0 \\ -1/2 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1/4 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 1/4 \\ 0 & -1/8 \end{bmatrix}$$
     Eigenvalues: $\lambda_1 = 0, \lambda_2 = -1/8 = -0.125$.
     $$\rho(\mathcal{L}_1) = 1/8 = 0.125 = \rho(B)^2 < 1 \quad (\text{Gauss-Seidel converges twice as fast!})$$
  6. MATLAB code:
     ```matlab
     A = [4 -1; 2 4];
     D = diag(diag(A));
     CL = -tril(A, -1);  CU = -triu(A, 1);
     L = inv(D)*CL;       U = inv(D)*CU;
     L1 = inv(eye(2) - L)*U;
     rho = max(abs(eig(L1))); % Returns 0.125
     ```

##### Micro-Drill 2 (Day 2: Complexity Algebra & System Transformation)
- **Problem**:
  Given non-singular matrices $A, B, C, D \in \mathbb{R}^{n \times n}$ and vector $b \in \mathbb{R}^n$, solve:
  $$(A^{-1} C + B D^{-1}) x = A^{-1} b$$
  with Gauss-Jordan elimination.
  (a) Compute the computational complexity of the system as written.
  (b) Transform the system to minimize operations, and compute the new complexity.
  (c) State the exact operations saved.
- **Hint**: Jordan system solving is $n^3/2$, Jordan inverse is $3n^3/2$. Remember $A^{-1}b$ is negligible ($n^2$) once $A^{-1}$ is known. Multiply both sides by $A$ from the left.
- **Verified Solution**:
  1. Original form $(A^{-1}C + BD^{-1})x = A^{-1}b$:
     - $A^{-1}$: $3n^3/2$
     - $A^{-1}C$: $n^3$
     - $D^{-1}$: $3n^3/2$
     - $BD^{-1}$: $n^3$
     - $A^{-1}b$: $n^2$ (negligible)
     - Jordan system solve: $n^3/2$
     $$\text{Total Cost} = \frac{3}{2}n^3 + n^3 + \frac{3}{2}n^3 + n^3 + \frac{1}{2}n^3 = \frac{11}{2}n^3 = 5.5 n^3$$
  2. Transformation: multiply from the left by $A$:
     $$A(A^{-1}C + BD^{-1})x = A A^{-1} b \implies (C + ABD^{-1})x = b$$
  3. New cost:
     - $AB$: $n^3$
     - $D^{-1}$: $3n^3/2$
     - $(AB)D^{-1}$: $n^3$
     - Right-hand side is $b$: 0 cost
     - Jordan system solve: $n^3/2$
     $$\text{New Total Cost} = n^3 + \frac{3}{2}n^3 + n^3 + \frac{1}{2}n^3 = 4 n^3$$
  4. Savings:
     $$\Delta = \frac{11}{2}n^3 - 4n^3 = \frac{3}{2}n^3 \quad (\text{Exact cost of 1 Jordan matrix inversion saved!})$$

##### Micro-Drill 3 (Day 3: Fixed-Point & Quadratic Convergence)
- **Problem**:
  To compute the positive root $\xi = \sqrt{5}$ of $f(x) = x^2 - 5 = 0$, we consider the iteration:
  $$x_{n+1} = x_n - \lambda(x_n^2 - 5)$$
  (a) Find all values of $\lambda$ for which the iteration converges locally to $\xi = \sqrt{5}$.
  (b) Find the value of $\lambda$ that yields quadratic convergence ($p \ge 2$).
  (c) Compute the first iterate $x_1$ starting from $x_0 = 2$ using the optimal $\lambda$.
- **Hint**: Set $g(x) = x - \lambda(x^2 - 5)$. Condition for local convergence is $|g'(\xi)| < 1$. Condition for quadratic convergence is $g'(\xi) = 0$.
- **Verified Solution**:
  1. $g(x) = x - \lambda(x^2 - 5) \implies g'(x) = 1 - 2\lambda x$.
  2. At the root $\xi = \sqrt{5}$: $g'(\sqrt{5}) = 1 - 2\sqrt{5}\lambda$.
  3. Local convergence condition:
     $$-1 < 1 - 2\sqrt{5}\lambda < 1 \implies -2 < -2\sqrt{5}\lambda < 0$$
     Divide by $-2\sqrt{5} < 0$ (reverses inequality signs):
     $$\frac{-2}{-2\sqrt{5}} > \lambda > 0 \implies 0 < \lambda < \frac{1}{\sqrt{5}} = \frac{\sqrt{5}}{5} \approx 0.4472$$
  4. Quadratic convergence:
     $$g'(\sqrt{5}) = 0 \implies 1 - 2\sqrt{5}\lambda = 0 \implies \lambda = \frac{1}{2\sqrt{5}} = \frac{\sqrt{5}}{10} \approx 0.2236$$
     Check: $\frac{1}{2\sqrt{5}} \in (0, \frac{1}{\sqrt{5}})$. $g''(x) = -2\lambda = -1/\sqrt{5} \ne 0 \implies p = 2$ exactly.
  5. One iteration from $x_0 = 2$:
     $$x_1 = 2 - \frac{2^2 - 5}{2\sqrt{5}} = 2 - \frac{-1}{2\sqrt{5}} = 2 + \frac{\sqrt{5}}{10} \approx 2.2236$$
     (True root is $\sqrt{5} \approx 2.2361$. Error dropped from $0.236$ to $0.0125$ in 1 step!).

##### Micro-Drill 4 (Day 4: Quadrature Weights & Exact Degree of Precision)
- **Problem**:
  Determine the weights $w_0, w_1$ for the numerical integration rule on $[0, 2]$:
  $$\int_0^2 f(x) dx \approx w_0 f(0) + w_1 f(4/3)$$
  (a) Determine $w_0, w_1$ so that the rule has maximum degree of precision.
  (b) Determine the exact degree of precision of this rule.
  (c) Approximate $\int_0^2 x^3 dx$ and compare with the exact value.
- **Hint**: Equate the rule for monomials $f(x) = 1$ and $f(x) = x$. Note that node $4/3$ is fixed. Test $f(x) = x^2$ and $x^3$ to see where it breaks.
- **Verified Solution**:
  1. Unknowns: $w_0, w_1$.
     - $f(x) = 1$: $\int_0^2 1 dx = 2$. Rule: $w_0(1) + w_1(1) = w_0 + w_1 = 2 \quad (1)$
     - $f(x) = x$: $\int_0^2 x dx = \left[\frac{x^2}{2}\right]_0^2 = 2$. Rule: $w_0(0) + w_1(4/3) = \frac{4}{3}w_1 = 2 \implies w_1 = 2 \cdot \frac{3}{4} = \frac{3}{2}$
     - From (1): $w_0 = 2 - 3/2 = 1/2$.
     $$\int_0^2 f(x) dx \approx \frac{1}{2} f(0) + \frac{3}{2} f(4/3)$$
  2. Degree of precision check:
     - Test $f(x) = x^2$:
       $$\text{Exact: } \int_0^2 x^2 dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} \approx 2.6667$$
       $$\text{Rule: } \frac{1}{2}(0)^2 + \frac{3}{2}\left(\frac{4}{3}\right)^2 = \frac{3}{2} \cdot \frac{16}{9} = \frac{24}{9} = \frac{8}{3} \quad (\text{Exact!})$$
     - Test $f(x) = x^3$:
       $$\text{Exact: } \int_0^2 x^3 dx = \left[\frac{x^4}{4}\right]_0^2 = \frac{16}{4} = 4$$
       $$\text{Rule: } \frac{1}{2}(0)^3 + \frac{3}{2}\left(\frac{4}{3}\right)^3 = \frac{3}{2} \cdot \frac{64}{27} = \frac{32}{9} \approx 3.5556 \ne 4$$
     Since it holds for $x^2$ but fails for $x^3$, the exact degree of precision is $d = 2$.
  3. Approximation of $\int_0^2 x^3 dx$:
     $$\text{Estimate} = \frac{32}{9} \approx 3.5556, \quad \text{Error} = \left|4 - \frac{32}{9}\right| = \frac{4}{9} \approx 0.4444$$

##### Micro-Drill 5 (Day 5: Newton Interpolation with Non-Equidistant Nodes)
- **Problem**:
  Given the data table:
  $$\begin{array}{c|cccc} i & 0 & 1 & 2 & 3 \\ \hline x_i & 0 & 1 & 2 & 4 \\ \hline f_i & 1 & 3 & 9 & 33 \end{array}$$
  (a) Verify whether nodes are equidistant and state which interpolation method is appropriate.
  (b) Construct the full divided difference table.
  (c) Write the Newton interpolation polynomial $P_3(x)$ and compute $P_3(1.5)$.
  (d) Given that the true underlying function is $f(x) = 2x^2 + 1$, explain why the theoretical error at any point $x$ is zero.
- **Hint**: Calculate $\Delta x_i$. Denominators for divided differences of order $k$ are $x_{i+k} - x_i$. For error, consider the 4th derivative of a quadratic polynomial.
- **Verified Solution**:
  1. Node spacing: $x_1 - x_0 = 1, x_2 - x_1 = 1, x_3 - x_2 = 2 \ne 1$. Nodes do NOT have equal spacing, so Newton with divided differences must be used.
  2. Divided differences:
     - 0th order: $f[x_0]=1, f[x_1]=3, f[x_2]=9, f[x_3]=33$.
     - 1st order:
       $$f[x_0, x_1] = \frac{3-1}{1-0} = 2, \quad f[x_1, x_2] = \frac{9-3}{2-1} = 6, \quad f[x_2, x_3] = \frac{33-9}{4-2} = 12$$
     - 2nd order:
       $$f[x_0, x_1, x_2] = \frac{6-2}{2-0} = \frac{4}{2} = 2, \quad f[x_1, x_2, x_3] = \frac{12-6}{4-1} = \frac{6}{3} = 2$$
     - 3rd order:
       $$f[x_0, x_1, x_2, x_3] = \frac{2-2}{4-0} = 0$$
     Top diagonal coefficients: $c_0 = 1, c_1 = 2, c_2 = 2, c_3 = 0$.
  3. Polynomial:
     $$P_3(x) = 1 + 2(x - 0) + 2(x - 0)(x - 1) + 0 = 1 + 2x + 2x^2 - 2x = 2x^2 + 1$$
     At $x = 1.5$:
     $$P_3(1.5) = 2(1.5)^2 + 1 = 2(2.25) + 1 = 5.5$$
  4. Error justification:
     $$E(x) = \frac{f^{(4)}(\xi)}{4!} (x-0)(x-1)(x-2)(x-4)$$
     Since $f(x) = 2x^2 + 1$ is of degree 2, $f'(x) = 4x, f''(x) = 4, f'''(x) \equiv 0, f^{(4)}(x) \equiv 0$.
     Therefore, $E(x) \equiv 0$ for all $x$, and the interpolation polynomial matches $f(x)$ identically.

---

## 5. Verification Method
The pedagogical specifications and mathematical formulas in this report can be independently verified using:
1. **MATLAB / Octave**:
   - Run Micro-Drill 1 code in MATLAB/Octave to verify $\rho(B) = \frac{1}{\sqrt{8}} \approx 0.3536$ and $\rho(\mathcal{L}_1) = 0.125$.
   - Run polynomial routines: `p = [2 0 1]; polyval(p, 1.5)` yields `5.5` matching Micro-Drill 5.
2. **Algebraic Symbol Verification**:
   - Solve Micro-Drill 3 inequality $-1 < 1 - 2\sqrt{5}\lambda < 1 \implies 0 < \lambda < 1/\sqrt{5}$ using WolframAlpha or SymPy (`solve(Abs(1 - 2*sqrt(5)*l) < 1, l)`).
   - Integrate Micro-Drill 4 monomials $\int_0^2 x^2 dx = 8/3$ and test with weights $w_0=1/2, w_1=3/2$.
3. **Cross-Reference with Past Exam Archive**:
   - Verify that all questions in `exam_prep.html` correspond to official EKPA DIT exam papers (February 2024, June 2024, February 2025, June 2025).
