# Handoff Report: M2 Spec Miner 2
**Mission**: 5-Day Study Sprint Roadmap & Micro-Drills Full HTML Specification
**Author**: M2 Spec Miner 2 (`m2_explorer_2`)
**Date**: 2026-09-03T10:20:00Z
**Target Deliverable**: Complete HTML Markup & Greek Pedagogical Content for Days 1–5 and 5 Verified Micro-Drills

---

## 1. Observation

### 1.1 Authoritative Requirements from `ORIGINAL_REQUEST.md`
- **Requirement R2**: "Interactive 5-Day 'High-ROI First' Study Sprint Plan: Provide an interactive day-by-day study roadmap structured around high-yield exam patterns (MATLAB commands & iteration script, complexity operation counts, quadrature weights & degree of precision, fixed-point/Newton convergence on Days 1-3 to lock in 50-60 marks, followed by Gauss-Jordan partial pivoting and Newton interpolation on Days 4-5). Include a persistent, browser-saved (`localStorage`) checklist for daily milestones and instant-reveal micro-drills for each day."
- **Acceptance Criteria (lines 37–39)**:
  - Daily progress checkboxes persist their state across page reloads using browser `localStorage`.
  - At least 5 instant-reveal micro-drills (one for each sprint day) allow the student to attempt a focused calculation and reveal the verified solution on click.

### 1.2 Interface Contracts from `PROJECT.md`
- **LocalStorage Study Plan Contract (§ Interface Contracts, lines 56–77)**:
  - Storage Key: `'webnotes-sprint-checklist'`
  - Schema:
    ```json
    {
      "tasks": { "day1-task1": true, "day1-task2": false },
      "drills": { "drill1": true },
      "lastUpdated": 1725358000000
    }
    ```
  - DOM Hooks:
    - Container: `#sprint-checklist-container`
    - Checkboxes: `<input type="checkbox" class="sprint-chk" data-task-id="<id>">`
    - Progress fill: `#sprint-progress-fill` (`style.width = "<percentage>%"`)
    - Progress text: `#sprint-progress-text`
    - Micro-drill button: `<button class="drill-reveal-btn" data-drill-id="<id>">`
    - Micro-drill solution: `<div id="drill-sol-<id>" style="display:none">`

### 1.3 Mined Examination Yields from `_build/exam_patterns.md` & `_build/solutions_mined.md`
- **Feb 2026 Blueprint**:
  - Θέμα 1: 40 Μονάδες (1.1 Σταθερό σημείο: 10μ · 1.2 Jordan με οδήγηση: 14μ · 1.3 Πολυπλοκότητα: 16μ).
  - Θέμα 2: 30 Μονάδες (2.1 Παρεμβολή Newton & Simpson: 16μ · 2.2 Προσδιορισμός βαρών $w_i$: 14μ).
  - Θέμα 3: 30 Μονάδες (3.1 Max indexing: 3μ · 3.2 10 Εντολές: 5μ · 3.3 Πολυώνυμο/Γραφική: 10μ · 3.4 Επαναληπτικός πίνακας & $\rho$: 12μ).
- **Pass Plan Yield per Minute**:
  - High-ROI Phase (Days 1–3): MATLAB (30m) + Complexity (15m) + Fixed-Point (15m) = **60 Marks (PASS LOCKED!)** with purely algebraic and mechanical methods.
  - Mastery Phase (Days 4–5): Quadrature Weights (15m) + Gauss-Jordan & Newton Interpolation (25m) = **40 Marks**, pushing the score to 100/100.

---

## 2. Logic Chain

1. **High-ROI Pedagogical Strategy**:
   - A beginner student with 5 days until the exam cannot afford to start with manual $3 \times 3$ Gauss-Jordan elimination on Day 1. Manual elimination is arithmetic-heavy and error-prone.
   - Starting with **Day 1: MATLAB Power-Pack (30 marks)** builds immediate confidence. The student memorizes 10 one-line commands and an 8-line script template that guarantees 30% of the entire exam in under 4 hours of study.
   - **Day 2: Complexity Algebra (15 marks)** requires only the operation cost table and left-multiplying by $A$ to cancel $A^{-1}$. This takes cumulative score to 45/100.
   - **Day 3: Fixed-Point & Newton Convergence (15 marks)** requires 1 polynomial derivative and 1 double inequality. Reaching 60/100 by Day 3 removes exam panic and secures a comfortable PASS.
   - **Day 4: Quadrature Weights & Simpson (15 marks)** introduces $3 \times 3$ systems of moments and degree of precision ($d=2, 3$). Cumulative score: 75/100.
   - **Day 5: Gauss-Jordan Pivoting & Newton Interpolation (25 marks)** tackles manual matrix elimination and divided difference tables, concluding with a full 2.5-hour mock exam simulation. Cumulative score: 100/100.

2. **Milestone Granularity**:
   - Each day contains exactly 4 to 5 atomic, verifiable milestone tasks (total 21 tasks across 5 days).
   - Each task has:
     - A persistent checkbox with unique `data-task-id` (`day1-task1` through `day5-task5`).
     - A concise title and actionable pedagogical description.
     - Direct jump link to the relevant section of the webnotes (`topic7_matlab_guide.html`, `exam_prep.html`, etc.).

3. **Instant-Reveal Micro-Drills Design**:
   - Each day concludes with 1 targeted, exam-grade micro-drill matching an authentic ΕΚΠΑ DIT exam question.
   - Each micro-drill includes:
     - Clear problem statement with mathematical formulas.
     - Mnemonic/Hint box (`💡 Hint`).
     - Interactive reveal button (`.drill-reveal-btn`, `data-drill-id="drillX"`).
     - Hidden solution container (`#drill-sol-drillX`) with highlighted intermediate arithmetic, student trap callouts, and 10-second verification checks.

4. **DOM & Script Integration Safety**:
   - All interactive hooks match the specifications expected by `js/study_plan.js` (engineered by `m2_explorer_1`) and layout styling (by `m2_explorer_3`).
   - Every mathematical formula is valid LaTeX formatted for MathJax 3 rendering without raw syntax leaks.

---

## 3. Caveats

- **Read-Only Explorer Discipline**: This report provides the definitive HTML markup and content blueprint. In accordance with the Specification Miner role, files in the project source tree (`index.html`) are not modified directly by this agent.
- **MathJax Re-Typesetting**: When micro-drill solutions are toggled from `display: none` to `display: block`, `js/study_plan.js` must invoke `window.MathJax && window.MathJax.typesetPromise && window.MathJax.typesetPromise([solutionEl])` so that LaTeX formulas inside the revealed block render properly.
- **LocalStorage Availability**: If cookies/storage are blocked by browser privacy modes, the markup remains 100% accessible and readable, falling back to in-memory state via `study_plan.js`.

---

## 4. Conclusion & Complete Specification

### 4.1 Features Discovered & Specified
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Sprint Core | 5-Day High-ROI Sprint Container | Top-level container `#sprint-checklist-container` embedding 5 days | DOM load | Rendered sprint interface | Fallback container if missing | ORIGINAL_REQUEST R2 |
| 2 | Progress UI | Interactive Progress Bar | Dynamic progress tracker with `#sprint-progress-fill` & `#sprint-progress-text` | Checkbox click | Updated % & count | Defaults to 0% | ORIGINAL_REQUEST R2 |
| 3 | Reset Action | Sprint Reset Button | Button `#sprint-reset-btn` triggering confirmation & reset | User click | Cleared checkboxes & progress | Modal confirmation cancel | PROJECT.md M2 |
| 4 | Day 1 | MATLAB Power-Pack Card | Day 1 module: 10 commands, indexing, $D, C_L, C_U$, iteration matrix function | 4 tasks | 30 Marks mastery | Error in column-major indexing | `_build/exam_patterns.md` |
| 5 | Drill 1 | Iteration Matrix Drill | Micro-Drill 1: $2\times 2$ Jacobi & Gauss-Seidel spectral radius + MATLAB script | User reveal click | Unfolded mathematical solution | Handled by toggle listener | ORIGINAL_REQUEST R2 |
| 6 | Day 2 | Complexity Algebra Card | Day 2 module: SOS cost table, operation accounting, left-multiply by $A$ | 4 tasks | 15 Marks (45 cumul) | Error in matrix non-commutativity | `_build/solutions_mined.md` |
| 7 | Drill 2 | Complexity System Drill | Micro-Drill 2: $(A^{-1}C + BD^{-1})x = A^{-1}b \to (C + ABD^{-1})x = b$, $1.5n^3$ saved | User reveal click | Unfolded operation proof | Handled by toggle listener | ORIGINAL_REQUEST R2 |
| 8 | Day 3 | Fixed-Point & Newton Card | Day 3 module: parameter $\lambda$, $|g'(\xi)|<1$, $g'=0$, 5 global conditions | 4 tasks | 15 Marks (60 PASS LOCKED) | Sign flip error on negative div | ORIGINAL_REQUEST R2 |
| 9 | Drill 3 | Fixed-Point Drill | Micro-Drill 3: $x_{n+1} = x_n - \lambda(x_n^2-5)$, local $\lambda \in (0, 1/\sqrt{5})$, quad $\lambda = 1/(2\sqrt{5})$ | User reveal click | Step-by-step arithmetic | Handled by toggle listener | ORIGINAL_REQUEST R2 |
| 10 | Day 4 | Quadrature & Simpson Card | Day 4 module: moment systems, weights $w_i$, degree of precision, composite Simpson | 4 tasks | 15 Marks (75 cumul) | Error counting points vs intervals | `_build/exam_patterns.md` |
| 11 | Drill 4 | Quadrature Weights Drill | Micro-Drill 4: $\int_0^2 f \approx w_0 f(0) + w_1 f(4/3)$, exact $w_0=1/2, w_1=3/2, d=2$ | User reveal click | Complete monomial proof | Handled by toggle listener | ORIGINAL_REQUEST R2 |
| 12 | Day 5 | Gauss & Interpolation Card | Day 5 module: Gauss-Jordan with pivoting, divided differences, ODE Taylor, mock exam | 5 tasks | 25 Marks (100 cumul) | Error using forward diff on unequal nodes | `_build/exam_patterns.md` |
| 13 | Drill 5 | Newton Divided Diff Drill | Micro-Drill 5: Non-equidistant nodes $[0,1,2,4]$, divided diff table, $P_3(1.5)=5.5, E\equiv 0$ | User reveal click | Full table & error proof | Handled by toggle listener | ORIGINAL_REQUEST R2 |

### 4.2 Edge Cases Handled in Pedagogical Content
| # | Feature | Input Condition | Handled Behavior in Content |
|---|---------|-----------------|-----------------------------|
| 1 | Micro-Drill 1 | MATLAB Matrix Decomposition | Explicit warning that $C_L = -\text{tril}(A,-1)$ requires the minus sign per course convention. |
| 2 | Micro-Drill 1 | Spectral Radius Eigenvalues | Explains that for $2\times 2$ matrices with zero diagonals $\begin{bmatrix} 0 & a \\ b & 0 \end{bmatrix}$, $\lambda = \pm\sqrt{ab}$ directly. |
| 3 | Micro-Drill 2 | Negligible Complexity Terms | Explicitly explains why $A^{-1}b$ is $O(n^2)$ and doesn't add to $n^3$ leading cost once $A^{-1}$ is calculated. |
| 4 | Micro-Drill 2 | Matrix Multiplication Order | Warns students that multiplying by $A$ from the right is illegal ($A B \ne B A$). Left multiplication is mandatory. |
| 5 | Micro-Drill 3 | Negative Division in Inequalities | Step-by-step display showing that dividing $-2 < -2\sqrt{5}\lambda < 0$ by $-2\sqrt{5}$ flips $<$ to $>$. |
| 6 | Micro-Drill 3 | Freezing Stationary Point | Warns against $\lambda = 0$ which reduces $g(x) = x$ and freezes the iteration at $x_0$. |
| 7 | Micro-Drill 4 | Fixed Node Degree of Precision | Clarifies why degree of precision is $d=2$ and NOT $2n-1=3$, because node $4/3$ is pre-fixed, not free. |
| 8 | Micro-Drill 5 | Non-Equidistant Nodes | Highlights the initial difference test $x_{i+1} - x_i$: $1, 1, 2 \ne \text{const}$, forbidding forward differences $\Delta^k f_0$. |

---

### 4.3 Production-Ready HTML Blueprint (`#sprint-checklist-container`)

Below is the complete, valid, drop-in HTML markup ready for integration into `index.html` (and cross-referenced in `exam_prep.html`):

```html
<!-- ==================================================================== -->
<!-- 5-DAY HIGH-ROI STUDY SPRINT PLAN (DAYS 1 TO 5) - AUTHORITATIVE MARKUP -->
<!-- ==================================================================== -->
<section id="sprint-plan" class="sprint-section" aria-label="5-Day Study Sprint Plan">
  <div id="sprint-checklist-container" class="sprint-container">

    <!-- SPRINT HEADER & LIVE PROGRESS BAR -->
    <div class="sprint-header-card">
      <div class="sprint-header-top">
        <div class="sprint-title-group">
          <div class="sprint-tag">⚡ HIGH-ROI EXAM STRATEGY</div>
          <h2 class="sprint-title">5-Day Study Sprint: Από το Μηδέν στο 100</h2>
          <p class="sprint-desc">
            Στοχευμένο πλάνο μελέτης ταξινομημένο αυστηρά κατά <strong>Exam Yield (ROI)</strong>.
            Κλείδωσε <strong>60/100 στις Ημέρες 1–3</strong> (εξασφάλιση PASS με καθαρή άλγεβρα &amp; MATLAB)
            και στόχευσε το <strong>100/100 στις Ημέρες 4–5</strong>.
          </p>
        </div>
        <div class="sprint-action-group">
          <button id="sprint-reset-btn" class="sprint-reset-btn" type="button" title="Μηδενισμός προόδου και επανεκκίνηση sprint">
            <span class="btn-icon">🔄</span> Επαναφορά Sprint
          </button>
        </div>
      </div>

      <!-- PROGRESS TRACKER -->
      <div class="sprint-progress-box">
        <div class="sprint-progress-meta">
          <span class="progress-label">Συνολική Πρόοδος Οροσήμων:</span>
          <span id="sprint-progress-text" class="progress-stats">0 / 21 Ορόσημα (0%) · 0 / 5 Micro-Drills</span>
        </div>
        <div class="sprint-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div id="sprint-progress-fill" class="sprint-progress-bar" style="width: 0%;"></div>
        </div>
        <div class="sprint-milestones-legend">
          <span class="legend-pill pill-day1">Ημέρα 1: 30μ (MATLAB)</span>
          <span class="legend-pill pill-day2">Ημέρα 2: 45μ (Πολυπλοκότητα)</span>
          <span class="legend-pill pill-pass">🎓 Ημέρα 3: 60μ (PASS LOCKED!)</span>
          <span class="legend-pill pill-day4">Ημέρα 4: 75μ (Simpson)</span>
          <span class="legend-pill pill-day5">🏆 Ημέρα 5: 100μ (Άριστα)</span>
        </div>
      </div>
    </div>

    <!-- ================================================================ -->
    <!-- DAY 1: MATLAB POWER-PACK (30 MARKS)                              -->
    <!-- ================================================================ -->
    <div class="sprint-day-card" id="sprint-day-1">
      <div class="day-card-header">
        <div class="day-header-left">
          <span class="day-pill">ΗΜΕΡΑ 1</span>
          <h3 class="day-heading">MATLAB Power-Pack (Θέμα 3)</h3>
        </div>
        <div class="day-badges">
          <span class="badge badge-target">🎯 30 Μονάδες (Θέμα 3)</span>
          <span class="badge badge-time">⏱️ ~3.5 ώρες</span>
          <span class="badge badge-cumul">Σωρευτικά: 30 / 100</span>
        </div>
      </div>

      <div class="day-content">
        <p class="day-intro">
          Το Θέμα 3 χαρίζει <strong>30 ολόκληρες μονάδες</strong> με καθαρή μηχανική αποστήθιση 10 εντολών,
          κατανόηση column-major indexing και ένα στάνταρ script 8 γραμμών για επαναληπτικούς πίνακες.
          Είναι το <em>υψηλότερο ROI ανά λεπτό μελέτης</em> σε ολόκληρο το μάθημα!
        </p>

        <div class="sprint-tasks-section">
          <h4 class="tasks-title">📋 Καθημερινά Ορόσημα Μελέτης (Ημέρα 1)</h4>
          <ul class="sprint-tasks-list">
            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day1-task1">
                <span class="task-title">Αποστήθιση των 10 SOS Εντολών MATLAB</span>
              </label>
              <div class="task-desc">
                Εκμάθηση των εντολών: <code>norm(A, 1/2/inf)</code>, <code>cond(A, 2)</code>, <code>eig(A)</code>, <code>det(A)</code>, <code>trace(A)</code>, <code>rank(A)</code>, <code>roots(p)</code>, <code>poly(r)</code>, <code>polyder(p)</code>, <code>polyfit(x, y, n)</code>.
                <strong>SOS Trap:</strong> Το <code>diag(A)</code> επιστρέφει διάνυσμα· για διαγώνιο πίνακα απαιτείται <code>diag(diag(A))</code>!
              </div>
              <a href="topic7_matlab_guide.html#sos-commands" class="task-link">Μελέτη Οδηγού Εντολών &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day1-task2">
                <span class="task-title">Column-Major Indexing &amp; Εύρεση Μεγίστου</span>
              </label>
              <div class="task-desc">
                Κατανόηση διάταξης στηλών (column-major) στη μνήμη του MATLAB. Εφαρμογή της εντολής <code>[m, p] = max(abs(y))</code> για άμεση εύρεση τιμής και γραμμικής θέσης του μεγίστου κατ' απόλυτη τιμή στοιχείου (Θέμα 3.1).
              </div>
              <a href="topic7_matlab_guide.html#indexing" class="task-link">Μελέτη Indexing &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day1-task3">
                <span class="task-title">Διάσπαση Πίνακα &amp; Σύμβαση Εξετάσεων (CL, CU)</span>
              </label>
              <div class="task-desc">
                Αυστηρή εκμάθηση της σύμβασης του μαθήματος: $D = \text{diag}(\text{diag}(A))$, $C_L = -\text{tril}(A, -1)$, $C_U = -\text{triu}(A, 1)$.
                <strong>SOS Trap:</strong> Το αρνητικό πρόσημο στα $C_L, C_U$ είναι υποχρεωτικό για να ισχύει $A = D - C_L - C_U$.
              </div>
              <a href="topic2_iterative_linear.html#matrix-splitting" class="task-link">Μελέτη Διάσπασης Πινάκων &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day1-task4">
                <span class="task-title">Συνάρτηση Επαναληπτικών Πινάκων &amp; Φασματική Ακτίνα</span>
              </label>
              <div class="task-desc">
                Συγγραφή της έτοιμης συνάρτησης για υπολογισμό επαναληπτικού πίνακα: Jacobi $B = L + U$, Gauss-Seidel $\mathcal{L}_1 = (I - L)^{-1} U$, SOR $\mathcal{L}_\omega = (I - \omega L)^{-1} [(1-\omega)I + \omega U]$ και εύρεση φασματικής ακτίνας με <code>rho = max(abs(eig(L_iter)))</code> (Θέμα 3.4).
              </div>
              <a href="exam_prep.html#recipe-type-h" class="task-link">Έτοιμο Script στο Exam Prep &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- MICRO-DRILL 1 -->
        <div class="drill-card" id="drill-box-1">
          <div class="drill-header">
            <div class="drill-tag-wrap">
              <span class="drill-badge">⚡ MICRO-DRILL 1</span>
              <span class="drill-topic">Επαναληπτικοί Πίνακες &amp; Φασματική Ακτίνα</span>
            </div>
            <span class="drill-pts">12 Μονάδες</span>
          </div>

          <div class="drill-problem">
            <p><strong>Εκφώνηση (Θέμα 3.4 / 1.2β):</strong></p>
            <p>Δίνεται ο πίνακας:
              $$A = \begin{bmatrix} 4 & -1 \\ 2 & 4 \end{bmatrix}$$
            </p>
            <ol class="drill-subq">
              <li>Προσδιόρισε τους κανονικοποιημένους πίνακες $D, L, U$ κατά τη σύμβαση του μαθήματος.</li>
              <li>Υπολόγισε τον πίνακα επανάληψης Jacobi $B = L + U$ και τη φασματική ακτίνα $\rho(B)$.</li>
              <li>Υπολόγισε τον πίνακα Gauss-Seidel $\mathcal{L}_1 = (I - L)^{-1} U$ και τη φασματική ακτίνα $\rho(\mathcal{L}_1)$.</li>
              <li>Γράψε το 5-γραμμο script MATLAB που επιβεβαιώνει το $\rho(\mathcal{L}_1)$.</li>
            </ol>
          </div>

          <div class="drill-hint-box">
            <div class="hint-title">💡 Hint &amp; Mnemonic</div>
            <p class="hint-text">
              $D^{-1} = \text{diag}(1/a_{ii})$. Οι $L, U$ προκύπτουν από τα $C_L = -\text{tril}(A,-1)$ και $C_U = -\text{triu}(A,1)$ πολλαπλασιασμένα με $D^{-1}$. Για $2 \times 2$ πίνακα με μηδενική διαγώνιο $\begin{bmatrix} 0 & a \\ b & 0 \end{bmatrix}$, οι ιδιοτιμές είναι πάντα $\pm\sqrt{ab}$.
            </p>
          </div>

          <div class="drill-actions">
            <button type="button" class="drill-reveal-btn" data-drill-id="drill1">
              <span class="btn-icon">👁️</span> <span class="btn-text">Αποκάλυψη Πλήρους Λύσης &amp; Επαλήθευσης</span>
            </button>
          </div>

          <!-- HIDDEN SOLUTION BLOCK -->
          <div id="drill-sol-drill1" class="drill-solution-block" style="display: none;">
            <h5 class="solution-heading">✅ Επαληθευμένη Βήμα-προς-Βήμα Λύση (Micro-Drill 1)</h5>

            <div class="solution-step">
              <span class="step-num">Βήμα 1</span>
              <p><strong>Διαγώνιος &amp; Τριγωνικοί Πίνακες:</strong></p>
              <p>
                $$D = \begin{bmatrix} 4 & 0 \\ 0 & 4 \end{bmatrix} \implies D^{-1} = \begin{bmatrix} 1/4 & 0 \\ 0 & 1/4 \end{bmatrix}$$
                $$C_L = -\text{tril}(A, -1) = \begin{bmatrix} 0 & 0 \\ -2 & 0 \end{bmatrix}, \quad C_U = -\text{triu}(A, 1) = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$$
                $$L = D^{-1} C_L = \begin{bmatrix} 0 & 0 \\ -1/2 & 0 \end{bmatrix}, \quad U = D^{-1} C_U = \begin{bmatrix} 0 & 1/4 \\ 0 & 0 \end{bmatrix}$$
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 2</span>
              <p><strong>Πίνακας Jacobi $B$ και Φασματική Ακτίνα $\rho(B)$:</strong></p>
              <p>
                $$B = L + U = \begin{bmatrix} 0 & 1/4 \\ -1/2 & 0 \end{bmatrix}$$
                Χαρακτηριστικό πολυώνυμο: $\det(B - \lambda I) = \lambda^2 - (1/4)(-1/2) = \lambda^2 + \frac{1}{8} = 0 \implies \lambda_{1,2} = \pm i \frac{1}{\sqrt{8}} = \pm i \frac{\sqrt{2}}{4}$.<br>
                Μέτρο ιδιοτιμών: $|\lambda| = \sqrt{0^2 + (1/\sqrt{8})^2} = \frac{1}{\sqrt{8}} \approx 0.3536$.<br>
                Άρα: <strong>$\rho(B) = \frac{1}{\sqrt{8}} \approx 0.3536 < 1$</strong> (η μέθοδος Jacobi συγκλίνει!).
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 3</span>
              <p><strong>Πίνακας Gauss-Seidel $\mathcal{L}_1$ και Φασματική Ακτίνα $\rho(\mathcal{L}_1)$:</strong></p>
              <p>
                $$I - L = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} - \begin{bmatrix} 0 & 0 \\ -1/2 & 0 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 1/2 & 1 \end{bmatrix}$$
                Αντίστροφος: $(I - L)^{-1} = \begin{bmatrix} 1 & 0 \\ -1/2 & 1 \end{bmatrix}$.<br>
                Υπολογισμός γινομένου:
                $$\mathcal{L}_1 = (I - L)^{-1} U = \begin{bmatrix} 1 & 0 \\ -1/2 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1/4 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 1/4 \\ 0 & -1/8 \end{bmatrix}$$
                Ο πίνακας είναι άνω τριγωνικός, οπότε οι ιδιοτιμές βρίσκονται στη διαγώνιο: $\lambda_1 = 0, \lambda_2 = -1/8 = -0.125$.<br>
                Άρα: <strong>$\rho(\mathcal{L}_1) = |-1/8| = 0.125 = \rho(B)^2 < 1$</strong>.
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 4</span>
              <p><strong>Script MATLAB Επαλήθευσης:</strong></p>
              <pre class="code-block"><code>A = [4 -1; 2 4];
D = diag(diag(A));
CL = -tril(A, -1);  CU = -triu(A, 1);
L = D \ CL;          U = D \ CU;
L1 = (eye(2) - L) \ U;
rho_L1 = max(abs(eig(L1))) % Εμφανίζει 0.1250</code></pre>
            </div>

            <div class="drill-trap-alert">
              <strong>⚠️ SOS Παγίδα Εξετάσεων:</strong> Πρόσεξε τη σχέση $\rho(\mathcal{L}_1) = \rho(B)^2 = (0.3536)^2 = 0.125$.
              Η μέθοδος Gauss-Seidel χρειάζεται ακριβώς τις <em>μισές επαναλήψεις</em> από τη Jacobi για να φτάσει στην ίδια ακρίβεια!
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================ -->
    <!-- DAY 2: COMPLEXITY ALGEBRA & TRANSFORMATION (15 MARKS -> 45 CUMUL)-->
    <!-- ================================================================ -->
    <div class="sprint-day-card" id="sprint-day-2">
      <div class="day-card-header">
        <div class="day-header-left">
          <span class="day-pill">ΗΜΕΡΑ 2</span>
          <h3 class="day-heading">Άλγεβρα Πολυπλοκότητας &amp; Μετασχηματισμοί (Θέμα 1.3)</h3>
        </div>
        <div class="day-badges">
          <span class="badge badge-target">🎯 15 Μονάδες (Θέμα 1.3)</span>
          <span class="badge badge-time">⏱️ ~2.5 ώρες</span>
          <span class="badge badge-cumul">Σωρευτικά: 45 / 100</span>
        </div>
      </div>

      <div class="day-content">
        <p class="day-intro">
          Το Θέμα 1.3 είναι καθαρή άλγεβρα που μαθαίνεται σε μία ώρα: γράφεις τον πίνακα σταθερών κόστους στο περιθώριο,
          μετράς τους όρους $n^3$ της αρχικής έκφρασης, πολλαπλασιάζεις από αριστερά με $A$ για να εξαφανιστεί ο $A^{-1}$,
          και υπολογίζεις τις πράξεις που γλίτωσες. Χαρίζει 15 μονάδες με μηδενικό ρίσκο!
        </p>

        <div class="sprint-tasks-section">
          <h4 class="tasks-title">📋 Καθημερινά Ορόσημα Μελέτης (Ημέρα 2)</h4>
          <ul class="sprint-tasks-list">
            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day2-task1">
                <span class="task-title">Αποστήθιση Πίνακα Σταθερών Κόστους Πράξεων</span>
              </label>
              <div class="task-desc">
                Αποστήθιση των σταθερών κόστους: Επίλυση συστήματος (Jordan: $n^3/2$, Gauss: $n^3/3$), Αντίστροφος πίνακας (Jordan: $3n^3/2$, Gauss: $4n^3/3$), Πολλαπλασιασμός πινάκων $n \times n$: $n^3$, Πίνακας $\times$ Διάνυσμα: $n^2 \to$ <strong>αμελητέο</strong>.
              </div>
              <a href="exam_prep.html#recipe-type-c" class="task-link">Πίνακας Κόστους στο Exam Prep &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day2-task2">
                <span class="task-title">Αναλυτική Καταγραφή Κόστους Αρχικής Μορφής</span>
              </label>
              <div class="task-desc">
                Ανάλυση κάθε επιμέρους όρου στην έκφραση $(A^{-1}C + BD^{-1})x = A^{-1}b$. Άθροιση των όρων: $A^{-1}$ ($3n^3/2$), $A^{-1}C$ ($n^3$), $D^{-1}$ ($3n^3/2$), $BD^{-1}$ ($n^3$), τελική επίλυση ($n^3/2$) $\implies$ Σύνολο $11n^3/2 = 5.5n^3$.
              </div>
              <a href="topic1_direct_linear.html#complexity" class="task-link">Ανάλυση Πολυπλοκότητας &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day2-task3">
                <span class="task-title">Αλγεβρικός Μετασχηματισμός από Αριστερά</span>
              </label>
              <div class="task-desc">
                Εφαρμογή της χρυσής αρχής: πολλαπλασιάζουμε <em>και τα δύο μέλη</em> από <strong>ΑΡΙΣΤΕΡΑ</strong> με $A$. Ο $A^{-1}$ εξαφανίζεται πλήρως: $A(A^{-1}C + BD^{-1})x = A(A^{-1}b) \implies (C + ABD^{-1})x = b$.
                <strong>SOS Trap:</strong> Ο πολλαπλασιασμός πινάκων ΔΕΝ είναι αντιμεταθετικός ($AB \ne BA$), άρα απαγορεύεται ο πολλαπλασιασμός από δεξιά!
              </div>
              <a href="prerequisites.html#matrix-mult" class="task-link">Προαπαιτούμενα: Πολλ/σμός Πινάκων &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day2-task4">
                <span class="task-title">Υπολογισμός Νέου Κόστους, Εξοικονόμησης &amp; Συμπέρασμα</span>
              </label>
              <div class="task-desc">
                Καταμέτρηση νέου κόστους: $AB$ ($n^3$), $D^{-1}$ ($3n^3/2$), $(AB)D^{-1}$ ($n^3$), επίλυση ($n^3/2$) $\implies$ Νέο Σύνολο $4n^3$.
                Διατύπωση συμπεράσματος: Εξοικονόμηση $\Delta = 5.5n^3 - 4n^3 = 1.5n^3 = \frac{3}{2}n^3$, δηλαδή εξοικονομήθηκε ακριβώς ένας πλήρης αντίστροφος Jordan!
              </div>
              <a href="exam_prep.html#recipe-type-c" class="task-link">Μοντέλο Απάντησης Type C &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- MICRO-DRILL 2 -->
        <div class="drill-card" id="drill-box-2">
          <div class="drill-header">
            <div class="drill-tag-wrap">
              <span class="drill-badge">⚡ MICRO-DRILL 2</span>
              <span class="drill-topic">Μετασχηματισμός Συστήματος &amp; Εξοικονόμηση Jordan</span>
            </div>
            <span class="drill-pts">15 Μονάδες</span>
          </div>

          <div class="drill-problem">
            <p><strong>Εκφώνηση (Θέμα 1.3):</strong></p>
            <p>Δίνονται οι μη ιδιάζοντες πίνακες $A, B, C, D \in \mathbb{R}^{n \times n}$ και το διάνυσμα $b \in \mathbb{R}^n$. Θεωρούμε το γραμμικό σύστημα:
              $$(A^{-1} C + B D^{-1}) x = A^{-1} b$$
            </p>
            <ol class="drill-subq">
              <li>Υπολόγισε την υπολογιστική πολυπλοκότητα επίλυσης του συστήματος όπως δίνεται, θεωρώντας ότι όλες οι πράξεις γίνονται με τη μέθοδο Gauss-Jordan.</li>
              <li>Μετασχημάτισε αλγεβρικά το σύστημα ώστε να ελαχιστοποιηθεί το υπολογιστικό κόστος.</li>
              <li>Υπολόγισε τη νέα πολυπλοκότητα και ανάφερε ακριβώς πόσες πράξεις εξοικονομήθηκαν.</li>
            </ol>
          </div>

          <div class="drill-hint-box">
            <div class="hint-title">💡 Hint &amp; Mnemonic</div>
            <p class="hint-text">
              Σταθερές Jordan: Επίλυση $n^3/2$, Αντίστροφος $3n^3/2$, Πολλαπλασιασμός $n^3$. Το $A^{-1}b$ κοστίζει μόνο $n^2$ (αμελητέο) επειδή ο $A^{-1}$ έχει ήδη υπολογιστεί. Πολλαπλασίασε και τα δύο μέλη από αριστερά με $A$.
            </p>
          </div>

          <div class="drill-actions">
            <button type="button" class="drill-reveal-btn" data-drill-id="drill2">
              <span class="btn-icon">👁️</span> <span class="btn-text">Αποκάλυψη Πλήρους Λύσης &amp; Επαλήθευσης</span>
            </button>
          </div>

          <!-- HIDDEN SOLUTION BLOCK -->
          <div id="drill-sol-drill2" class="drill-solution-block" style="display: none;">
            <h5 class="solution-heading">✅ Επαληθευμένη Βήμα-προς-Βήμα Λύση (Micro-Drill 2)</h5>

            <div class="solution-step">
              <span class="step-num">Βήμα 1</span>
              <p><strong>Ανάλυση Κόστους Αρχικής Μορφής:</strong></p>
              <ul class="clean-list">
                <li>Υπολογισμός $A^{-1}$ με Jordan: $\frac{3}{2}n^3$</li>
                <li>Γινόμενο $A^{-1} C$: $n^3$</li>
                <li>Υπολογισμός $D^{-1}$ με Jordan: $\frac{3}{2}n^3$</li>
                <li>Γινόμενο $B D^{-1}$: $n^3$</li>
                <li>Πρόσθεση $(A^{-1}C + BD^{-1})$: $n^2$ (αμελητέο)</li>
                <li>Γινόμενο $A^{-1}b$: $n^2$ (αμελητέο, ο $A^{-1}$ είναι ήδη γνωστός)</li>
                <li>Επίλυση τελικού γραμμικού συστήματος $M x = d$ με Jordan: $\frac{1}{2}n^3$</li>
              </ul>
              <p><strong>Συνολικό Κόστος Αρχικής Μορφής:</strong>
                $$\text{Cost}_1 = \frac{3}{2}n^3 + n^3 + \frac{3}{2}n^3 + n^3 + \frac{1}{2}n^3 = \frac{11}{2}n^3 = 5.5 n^3$$
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 2</span>
              <p><strong>Αλγεβρικός Μετασχηματισμός:</strong></p>
              <p>
                Πολλαπλασιάζουμε και τα δύο μέλη από <strong>ΑΡΙΣΤΕΡΑ</strong> με τον πίνακα $A$:
                $$A(A^{-1} C + B D^{-1}) x = A(A^{-1} b)$$
                $$(A A^{-1} C + A B D^{-1}) x = (A A^{-1}) b$$
                $$(I C + A B D^{-1}) x = I b$$
                $$\mathbf{(C + A B D^{-1}) x = b}$$
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 3</span>
              <p><strong>Ανάλυση Νέου Κόστους &amp; Εξοικονόμηση:</strong></p>
              <ul class="clean-list">
                <li>Γινόμενο $A B$: $n^3$</li>
                <li>Υπολογισμός $D^{-1}$ με Jordan: $\frac{3}{2}n^3$</li>
                <li>Γινόμενο $(AB) D^{-1}$: $n^3$</li>
                <li>Πρόσθεση $C + (ABD^{-1})$: $n^2$ (αμελητέο)</li>
                <li>Δεξιό μέλος είναι το $b$: $0$ πράξεις</li>
                <li>Επίλυση συστήματος με Jordan: $\frac{1}{2}n^3$</li>
              </ul>
              <p><strong>Νέο Συνολικό Κόστος:</strong>
                $$\text{Cost}_2 = n^3 + \frac{3}{2}n^3 + n^3 + \frac{1}{2}n^3 = 4 n^3$$
              </p>
              <p><strong>Κέρδος / Εξοικονόμηση:</strong>
                $$\Delta = \text{Cost}_1 - \text{Cost}_2 = \frac{11}{2}n^3 - 4n^3 = \frac{3}{2}n^3 = 1.5 n^3$$
                <strong>Συμπέρασμα:</strong> Εξοικονομήθηκε ακριβώς ένας πλήρης υπολογισμός αντιστρόφου πίνακα ($\frac{3}{2}n^3$), μειώνοντας τον υπολογιστικό χρόνο κατά <strong>27.3%</strong>!
              </p>
            </div>

            <div class="drill-trap-alert">
              <strong>⚠️ SOS Παγίδα Εξετάσεων:</strong> Μην ξεχάσεις να αναφέρεις ρητά ότι ο πολλαπλασιασμός γίνεται από ΑΡΙΣΤΕΡΑ.
              Αν γράψεις $(A^{-1}C + BD^{-1})x A = A^{-1}b A$, χάνεις 4 μονάδες επειδή οι διαστάσεις διανύσματος $\times$ πίνακα είναι ασύμβατες!
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================ -->
    <!-- DAY 3: FIXED-POINT & NEWTON CONVERGENCE (15 MARKS -> 60 CUMUL)   -->
    <!-- ================================================================ -->
    <div class="sprint-day-card" id="sprint-day-3">
      <div class="day-card-header">
        <div class="day-header-left">
          <span class="day-pill">ΗΜΕΡΑ 3</span>
          <h3 class="day-heading">Σταθερό Σημείο &amp; Σύγκλιση Newton (Θέμα 1.1)</h3>
        </div>
        <div class="day-badges">
          <span class="badge badge-target">🎯 15 Μονάδες (Θέμα 1.1)</span>
          <span class="badge badge-time">⏱️ ~3.0 ώρες</span>
          <span class="badge badge-pass">🎓 Σωρευτικά: 60 / 100 · PASS LOCKED!</span>
        </div>
      </div>

      <div class="day-content">
        <p class="day-intro">
          <strong>Συγχαρητήρια! Με την ολοκλήρωση της 3ης ημέρας κλειδώνεις 60/100 και εξασφαλίζεις το PASS.</strong>
          Το Θέμα 1.1 απαιτεί μία απλή παραγώγιση $g'(x)$, επίλυση της διπλής ανισότητας $|g'(\xi)| < 1$ για το διάστημα του $\lambda$,
          και μηδενισμό $g'(\xi) = 0$ για τετραγωνική σύγκλιση.
        </p>

        <div class="sprint-tasks-section">
          <h4 class="tasks-title">📋 Καθημερινά Ορόσημα Μελέτης (Ημέρα 3)</h4>
          <ul class="sprint-tasks-list">
            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day3-task1">
                <span class="task-title">Παραγώγιση g'(x) &amp; Συνθήκη Τοπικής Σύγκλισης</span>
              </label>
              <div class="task-desc">
                Ορισμός της επαναληπτικής συνάρτησης $g(x) = x - \lambda f(x)$, υπολογισμός παραγώγου $g'(x) = 1 - \lambda f'(x)$ και αντικατάσταση της ρίζας $\xi$: $g'(\xi) = 1 - \lambda f'(\xi)$. Συνθήκη σύγκλισης: $|g'(\xi)| < 1 \iff -1 < g'(\xi) < 1$.
              </div>
              <a href="topic3_nonlinear.html#fixed-point" class="task-link">Μελέτη Σταθερού Σημείου &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day3-task2">
                <span class="task-title">Επίλυση Διπλής Ανισότητας χωρίς Παγίδες Προσήμου</span>
              </label>
              <div class="task-desc">
                Επίλυση της διπλής ανισότητας $-1 < 1 - c\lambda < 1 \implies -2 < -c\lambda < 0$.
                <strong>SOS Trap:</strong> Κατά τη διαίρεση με τον αρνητικό συντελεστή $-c < 0$, η φορά των ανισοτήτων <em>αντιστρέφεται υποχρεωτικά</em> ($<$ γίνεται $>$).
              </div>
              <a href="prerequisites.html#abs-ineq" class="task-link">Προαπαιτούμενα: Ανισότητες Απολύτων &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day3-task3">
                <span class="task-title">Προσδιορισμός λ για Τετραγωνική Σύγκλιση (Order p=2)</span>
              </label>
              <div class="task-desc">
                Εξίσωση $g'(\xi) = 0$ για εύρεση του βέλτιστου $\lambda^*$. Έλεγχος ότι $g''(\xi) \ne 0$ ώστε η τάξη να είναι ακριβώς $p=2$, και επαλήθευση ότι το $\lambda^*$ ανήκει στο εσωτερικό του διαστήματος σύγκλισης.
              </div>
              <a href="exam_prep.html#recipe-type-a" class="task-link">Μοντέλο Απάντησης Type A &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day3-task4">
                <span class="task-title">Έλεγχος των 5 Συνθηκών Ολικής Σύγκλισης Newton-Raphson</span>
              </label>
              <div class="task-desc">
                Εκμάθηση της λίστας ελέγχου των 5 συνθηκών για σύγκλιση από <em>οποιοδήποτε</em> $x_0 \in [a, b]$: (1) $f \in C^2[a,b]$, (2) $f(a)f(b) < 0$ (Bolzano), (3) $f'(x) \ne 0$ (μονοτονία), (4) $f''(x)$ σταθερό πρόσημο (κυρτότητα), (5) $|f(c)/f'(c)| \le b-a$ στο άκρο $c$.
              </div>
              <a href="exam_prep.html#recipe-type-f" class="task-link">Μοντέλο Απάντησης Type F &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- MICRO-DRILL 3 -->
        <div class="drill-card" id="drill-box-3">
          <div class="drill-header">
            <div class="drill-tag-wrap">
              <span class="drill-badge">⚡ MICRO-DRILL 3</span>
              <span class="drill-topic">Σταθερό Σημείο με Παράμετρο λ &amp; Τετραγωνική Σύγκλιση</span>
            </div>
            <span class="drill-pts">10 Μονάδες</span>
          </div>

          <div class="drill-problem">
            <p><strong>Εκφώνηση (Θέμα 1.1):</strong></p>
            <p>Για την εύρεση της θετικής ρίζας $\xi = \sqrt{5}$ της εξίσωσης $f(x) = x^2 - 5 = 0$, θεωρούμε την επαναληπτική μέθοδο:
              $$x_{n+1} = x_n - \lambda (x_n^2 - 5)$$
              όπου $\lambda \ne 0$ πραγματική παράμετρος.
            </p>
            <ol class="drill-subq">
              <li>Βρες όλες τις τιμές του $\lambda$ για τις οποίες η μέθοδος συγκλίνει τοπικά στη ρίζα $\xi = \sqrt{5}$.</li>
              <li>Βρες την τιμή του $\lambda$ που εξασφαλίζει τουλάχιστον τετραγωνική τάξη σύγκλισης ($p \ge 2$) και επιβεβαίωσε την τάξη.</li>
              <li>Ξεκινώντας από $x_0 = 2$, υπολόγισε το πρώτο βήμα $x_1$ με το βέλτιστο $\lambda$ και σύγκρινε το σφάλμα.</li>
            </ol>
          </div>

          <div class="drill-hint-box">
            <div class="hint-title">💡 Hint &amp; Mnemonic</div>
            <p class="hint-text">
              $g(x) = x - \lambda(x^2 - 5)$. Συνθήκη τοπικής σύγκλισης: $|g'(\sqrt{5})| < 1$. Συνθήκη τετραγωνικής σύγκλισης: $g'(\sqrt{5}) = 0$.
              Προσοχή: κατά τη διαίρεση με $-2\sqrt{5} < 0$, άλλαξε τη φορά των ανισοτήτων!
            </p>
          </div>

          <div class="drill-actions">
            <button type="button" class="drill-reveal-btn" data-drill-id="drill3">
              <span class="btn-icon">👁️</span> <span class="btn-text">Αποκάλυψη Πλήρους Λύσης &amp; Επαλήθευσης</span>
            </button>
          </div>

          <!-- HIDDEN SOLUTION BLOCK -->
          <div id="drill-sol-drill3" class="drill-solution-block" style="display: none;">
            <h5 class="solution-heading">✅ Επαληθευμένη Βήμα-προς-Βήμα Λύση (Micro-Drill 3)</h5>

            <div class="solution-step">
              <span class="step-num">Βήμα 1</span>
              <p><strong>Υπολογισμός Παραγώγου &amp; Διάστημα Σύγκλισης:</strong></p>
              <p>
                Η επαναληπτική συνάρτηση είναι: $g(x) = x - \lambda(x^2 - 5)$.<br>
                Η παράγωγος είναι: $g'(x) = 1 - 2\lambda x$.<br>
                Στη ρίζα $\xi = \sqrt{5}$:
                $$g'(\sqrt{5}) = 1 - 2\sqrt{5}\lambda$$
                Συνθήκη τοπικής σύγκλισης:
                $$|g'(\sqrt{5})| < 1 \iff -1 < 1 - 2\sqrt{5}\lambda < 1$$
                Αφαιρούμε το $1$ από όλα τα μέλη:
                $$-2 < -2\sqrt{5}\lambda < 0$$
                Διαιρούμε με το $-2\sqrt{5} < 0$ (<strong>αναστροφή φοράς ανισότητας!</strong>):
                $$\frac{-2}{-2\sqrt{5}} > \lambda > \frac{0}{-2\sqrt{5}} \iff \frac{1}{\sqrt{5}} > \lambda > 0$$
                Άρα το διάστημα τοπικής σύγκλισης είναι:
                $$\mathbf{\lambda \in \left(0, \frac{1}{\sqrt{5}}\right) = \left(0, \frac{\sqrt{5}}{5}\right) \approx (0, 0.4472)}$$
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 2</span>
              <p><strong>Τετραγωνική Σύγκλιση:</strong></p>
              <p>
                Για να είναι η σύγκλιση τετραγωνική ($p \ge 2$), απαιτείται:
                $$g'(\sqrt{5}) = 0 \iff 1 - 2\sqrt{5}\lambda = 0 \implies \mathbf{\lambda^* = \frac{1}{2\sqrt{5}} = \frac{\sqrt{5}}{10} \approx 0.2236}$$
                Έλεγχος: Το $\lambda^* = \frac{\sqrt{5}}{10}$ ανήκει στο $(0, \frac{\sqrt{5}}{5})$ (ακριβώς στο μέσο του!).<br>
                Ελέγχουμε τη δεύτερη παράγωγο:
                $$g''(x) = -2\lambda \implies g''(\sqrt{5}) = -2\left(\frac{1}{2\sqrt{5}}\right) = -\frac{1}{\sqrt{5}} \ne 0$$
                Εφόσον $g'(\xi) = 0$ και $g''(\xi) \ne 0$, η τάξη σύγκλισης είναι <strong>ακριβώς τετραγωνική ($p = 2$)</strong>.
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 3</span>
              <p><strong>Υπολογισμός Επανάληψης $x_1$ από $x_0 = 2$:</strong></p>
              <p>
                $$x_1 = x_0 - \lambda^* (x_0^2 - 5) = 2 - \frac{\sqrt{5}}{10} (2^2 - 5) = 2 - \frac{\sqrt{5}}{10} (-1) = 2 + \frac{\sqrt{5}}{10} \approx 2.223607$$
                Ακριβής ρίζα: $\sqrt{5} \approx 2.236068$.<br>
                Αρχικό σφάλμα: $|x_0 - \sqrt{5}| = |2 - 2.236068| \approx 0.2361$.<br>
                Νέο σφάλμα: $|x_1 - \sqrt{5}| = |2.223607 - 2.236068| \approx \mathbf{0.0125}$.<br>
                Το σφάλμα μειώθηκε κατά <strong>19 φορές</strong> σε ένα μόλις βήμα!
              </p>
            </div>

            <div class="drill-trap-alert">
              <strong>⚠️ SOS Παγίδα Εξετάσεων:</strong> Αν η εκφώνηση ζητούσε την αρνητική ρίζα $\xi = -\sqrt{5}$, τότε $g'(-\sqrt{5}) = 1 + 2\sqrt{5}\lambda$.
              Η ανίσωση γίνεται $-2 < 2\sqrt{5}\lambda < 0 \implies -\frac{1}{\sqrt{5}} < \lambda < 0$. Να προσέχεις ΠΑΝΤΑ το πρόσημο της ρίζας!
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================ -->
    <!-- DAY 4: QUADRATURE WEIGHTS & SIMPSON RULES (15 MARKS -> 75 CUMUL)  -->
    <!-- ================================================================ -->
    <div class="sprint-day-card" id="sprint-day-4">
      <div class="day-card-header">
        <div class="day-header-left">
          <span class="day-pill">ΗΜΕΡΑ 4</span>
          <h3 class="day-heading">Βάρη Ολοκλήρωσης &amp; Simpson (Θέμα 2.2 &amp; 2.1c)</h3>
        </div>
        <div class="day-badges">
          <span class="badge badge-target">🎯 15 Μονάδες (Θέμα 2.2)</span>
          <span class="badge badge-time">⏱️ ~3.5 ώρες</span>
          <span class="badge badge-cumul">Σωρευτικά: 75 / 100</span>
        </div>
      </div>

      <div class="day-content">
        <p class="day-intro">
          Το Θέμα 2.2 είναι ένα απλό γραμμικό σύστημα 2x2 ή 3x3: εξισώνεις τον προσεγγιστικό τύπο με τα ακριβή ολοκληρώματα
          των μονονύμων $1, x, x^2$, βρίσκεις τα βάρη $w_i$ και δοκιμάζεις τις επόμενες δυνάμεις για να βρεις τον βαθμό ακρίβειας.
          Μαζί με τον σύνθετο Simpson 1/3, εκτοξεύεις τον βαθμό σου στο 75/100!
        </p>

        <div class="sprint-tasks-section">
          <h4 class="tasks-title">📋 Καθημερινά Ορόσημα Μελέτης (Ημέρα 4)</h4>
          <ul class="sprint-tasks-list">
            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day4-task1">
                <span class="task-title">Κατασκευή Συστήματος Ροπών για Προσδιορισμό Βαρών</span>
              </label>
              <div class="task-desc">
                Απαίτηση ακριβούς ισότητας $\int_a^b x^k dx = \sum_{i=0}^n w_i x_i^k$ για τα μονώνυμα $k = 0, 1, \dots$. Υπολογισμός των ακριβών ολοκληρωμάτων $\int_a^b x^k dx = \frac{b^{k+1} - a^{k+1}}{k+1}$.
              </div>
              <a href="topic5_integration.html#weights" class="task-link">Μελέτη Προσδιορισμού Βαρών &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day4-task2">
                <span class="task-title">Επίλυση Γραμμικού Συστήματος &amp; Εύρεση Τύπου</span>
              </label>
              <div class="task-desc">
                Επίλυση του προκύπτοντος γραμμικού συστήματος ως προς τα άγνωστα βάρη $w_i$.
                <strong>10-Second Sanity Check:</strong> Το άθροισμα των βαρών $\sum w_i$ πρέπει ΠΑΝΤΑ να ισούται με το μήκος του διαστήματος $b - a$ ($\int_a^b 1 dx = b - a$)!
              </div>
              <a href="exam_prep.html#recipe-type-e" class="task-link">Μοντέλο Απάντησης Type E &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day4-task3">
                <span class="task-title">Έλεγχος Ακριβούς Βαθμού Ακρίβειας (Degree of Precision)</span>
              </label>
              <div class="task-desc">
                Δοκιμή των επόμενων δυνάμεων $x^{k+1}, x^{k+2}$ στον ευρεθέντα τύπο. Ο μέγιστος βαθμός $d$ για τον οποίο η ισότητα επαληθεύεται ακριβώς ονομάζεται <em>βαθμός ακρίβειας</em>.
                <strong>SOS Trap:</strong> Μην υποθέσεις τυφλά Gauss ακρίβεια $2n-1$ αν οι κόμβοι $x_i$ είναι προκαθορισμένοι στην εκφώνηση!
              </div>
              <a href="topic5_integration.html#precision" class="task-link">Μελέτη Βαθμού Ακρίβειας &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day4-task4">
                <span class="task-title">Σύνθετος Κανόνας Simpson 1/3 &amp; Αιτιολόγηση Σφάλματος</span>
              </label>
              <div class="task-desc">
                Εφαρμογή του τύπου: $I \approx \frac{h}{3}[f_0 + 4\sum_{\text{odd}} f_i + 2\sum_{\text{even}} f_i + f_N]$ με $h = (b-a)/N$. Έλεγχος ότι τα υποδιαστήματα $N$ είναι <strong>άρτιος αριθμός</strong>.
                Αιτιολόγηση ότι για πολυώνυμα 3ου βαθμού το σφάλμα είναι <em>ακριβώς μηδέν</em> επειδή $E \propto f^{(4)}(\xi) \equiv 0$.
              </div>
              <a href="topic5_integration.html#simpson" class="task-link">Μελέτη Κανόνα Simpson &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- MICRO-DRILL 4 -->
        <div class="drill-card" id="drill-box-4">
          <div class="drill-header">
            <div class="drill-tag-wrap">
              <span class="drill-badge">⚡ MICRO-DRILL 4</span>
              <span class="drill-topic">Προσδιορισμός Βαρών Ολοκλήρωσης &amp; Βαθμός Ακρίβειας</span>
            </div>
            <span class="drill-pts">14 Μονάδες</span>
          </div>

          <div class="drill-problem">
            <p><strong>Εκφώνηση (Θέμα 2.2):</strong></p>
            <p>Θεωρούμε τον κανόνα αριθμητικής ολοκλήρωσης στο διάστημα $[0, 2]$:
              $$\int_0^2 f(x) dx \approx w_0 f(0) + w_1 f(4/3)$$
            </p>
            <ol class="drill-subq">
              <li>Προσδιόρισε τα βάρη $w_0, w_1$ ώστε ο τύπος να είναι ακριβής για πολυώνυμα όσο το δυνατόν μεγαλύτερου βαθμού.</li>
              <li>Προσδιόρισε τον ακριβή βαθμό ακρίβειας $d$ του τύπου.</li>
              <li>Υπολόγισε την προσέγγιση του ολοκληρώματος $\int_0^2 x^3 dx$ με τον παραπάνω τύπο και βρες το σφάλμα.</li>
            </ol>
          </div>

          <div class="drill-hint-box">
            <div class="hint-title">💡 Hint &amp; Mnemonic</div>
            <p class="hint-text">
              Υπολόγισε τα ακριβή ολοκληρώματα: $\int_0^2 1 dx = 2$ και $\int_0^2 x dx = 2$. Εξίσωσε με τον τύπο και λύσε το σύστημα $2 \times 2$ για τα $w_0, w_1$. Στη συνέχεια έλεγξε τις συναρτήσεις $f(x) = x^2$ και $f(x) = x^3$.
            </p>
          </div>

          <div class="drill-actions">
            <button type="button" class="drill-reveal-btn" data-drill-id="drill4">
              <span class="btn-icon">👁️</span> <span class="btn-text">Αποκάλυψη Πλήρους Λύσης &amp; Επαλήθευσης</span>
            </button>
          </div>

          <!-- HIDDEN SOLUTION BLOCK -->
          <div id="drill-sol-drill4" class="drill-solution-block" style="display: none;">
            <h5 class="solution-heading">✅ Επαληθευμένη Βήμα-προς-Βήμα Λύση (Micro-Drill 4)</h5>

            <div class="solution-step">
              <span class="step-num">Βήμα 1</span>
              <p><strong>Προσδιορισμός Βαρών $w_0, w_1$:</strong></p>
              <p>
                Απαιτούμε ο τύπος να είναι ακριβής για $f(x) = 1$ και $f(x) = x$:
                <ul class="clean-list">
                  <li>Για $f(x) = 1$:
                    $$\int_0^2 1 dx = [x]_0^2 = 2$$
                    Εφαρμογή τύπου: $w_0(1) + w_1(1) = 2 \implies \mathbf{w_0 + w_1 = 2} \quad (1)$
                  </li>
                  <li>Για $f(x) = x$:
                    $$\int_0^2 x dx = \left[\frac{x^2}{2}\right]_0^2 = \frac{4}{2} = 2$$
                    Εφαρμογή τύπου: $w_0(0) + w_1(4/3) = 2 \implies \frac{4}{3}w_1 = 2 \implies \mathbf{w_1 = 2 \cdot \frac{3}{4} = \frac{3}{2}}$
                  </li>
                </ul>
                Από την εξίσωση (1):
                $$w_0 = 2 - w_1 = 2 - \frac{3}{2} = \mathbf{\frac{1}{2}}$$
                Ο προκύπτων κανόνας ολοκλήρωσης είναι:
                $$\mathbf{\int_0^2 f(x) dx \approx \frac{1}{2} f(0) + \frac{3}{2} f(4/3)}$$
                <em>10-Second Sanity Check:</em> $w_0 + w_1 = \frac{1}{2} + \frac{3}{2} = 2 = b - a$ ✅.
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 2</span>
              <p><strong>Έλεγχος Ακριβούς Βαθμού Ακρίβειας $d$:</strong></p>
              <p>
                Ελέγχουμε τη συνάρτηση $f(x) = x^2$:
                $$\text{Ακριβές: } \int_0^2 x^2 dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} \approx 2.6667$$
                $$\text{Τύπος: } \frac{1}{2}(0)^2 + \frac{3}{2}\left(\frac{4}{3}\right)^2 = \frac{3}{2} \cdot \frac{16}{9} = \frac{24}{9} = \frac{8}{3}$$
                Ο τύπος είναι <strong>ακριβής για $x^2$</strong>! (Αν και είχαμε μόνο 2 ελεύθερες παραμέτρους, ο κόμβος $4/3$ είναι κόμβος τύπου Gauss-Radau).
              </p>
              <p>
                Ελέγχουμε τη συνάρτηση $f(x) = x^3$:
                $$\text{Ακριβές: } \int_0^2 x^3 dx = \left[\frac{x^4}{4}\right]_0^2 = \frac{16}{4} = 4$$
                $$\text{Τύπος: } \frac{1}{2}(0)^3 + \frac{3}{2}\left(\frac{4}{3}\right)^3 = \frac{3}{2} \cdot \frac{64}{27} = \frac{32}{9} \approx 3.5556$$
                Επειδή $4 = \frac{36}{9} \ne \frac{32}{9}$, ο τύπος <em>αποτυγχάνει</em> στο $x^3$.<br>
                Άρα ο ακριβής βαθμός ακρίβειας είναι: <strong>$d = 2$</strong>.
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 3</span>
              <p><strong>Προσέγγιση $\int_0^2 x^3 dx$ &amp; Σφάλμα:</strong></p>
              <p>
                $$\text{Προσέγγιση} = \frac{32}{9} \approx 3.5556$$
                $$\text{Απόλυτο Σφάλμα} = |E| = \left| 4 - \frac{32}{9} \right| = \left| \frac{36}{9} - \frac{32}{9} \right| = \mathbf{\frac{4}{9} \approx 0.4444}$$
              </p>
            </div>

            <div class="drill-trap-alert">
              <strong>⚠️ SOS Παγίδα Εξετάσεων:</strong> Μην μπερδέψεις τον βαθμό ακρίβειας $d=2$ με τον βαθμό Gauss $2n-1 = 2(2)-1 = 3$.
              Στον Gauss ολοκληρωτή όλοι οι κόμβοι είναι ελεύθεροι. Εδώ ο κόμβος $x_0 = 0$ και ο κόμβος $x_1 = 4/3$ ήταν σταθεροί!
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================ -->
    <!-- DAY 5: GAUSS-JORDAN & NEWTON INTERPOLATION (25 MARKS -> 100 CUMUL)-->
    <!-- ================================================================ -->
    <div class="sprint-day-card" id="sprint-day-5">
      <div class="day-card-header">
        <div class="day-header-left">
          <span class="day-pill">ΗΜΕΡΑ 5</span>
          <h3 class="day-heading">Gauss-Jordan, Παρεμβολή Newton &amp; Mock Exam (Θέματα 1.2 &amp; 2.1)</h3>
        </div>
        <div class="day-badges">
          <span class="badge badge-target">🎯 25 Μονάδες (Θέματα 1.2 &amp; 2.1)</span>
          <span class="badge badge-time">⏱️ ~4.5 ώρες</span>
          <span class="badge badge-max">🏆 Σωρευτικά: 100 / 100 · ΑΡΙΣΤΑ!</span>
        </div>
      </div>

      <div class="day-content">
        <p class="day-intro">
          Η τελευταία ημέρα ολοκληρώνει το 100%: εκτελείς μερική οδήγηση στον Gauss-Jordan (επαυξημένος $[A \mid I]$),
          φτιάχνεις πίνακα διηρημένων διαφορών Newton και δικαιολογείς το σφάλμα.
          Κλείνεις με ένα πλήρες mock exam 2.5 ωρών για να πας στην εξέταση με απόλυτη αυτοπεποίθηση!
        </p>

        <div class="sprint-tasks-section">
          <h4 class="tasks-title">📋 Καθημερινά Ορόσημα Μελέτης (Ημέρα 5)</h4>
          <ul class="sprint-tasks-list">
            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day5-task1">
                <span class="task-title">Gauss-Jordan με Μερική Οδήγηση &amp; Επόμενος Οδηγός</span>
              </label>
              <div class="task-desc">
                Κατασκευή επαυξημένου πίνακα $[A \mid I]$. Σε κάθε στήλη $k$, εύρεση $\max_{i \ge k} |a_{ik}|$ και αντιμετάθεση γραμμών $R_k \leftrightarrow R_p$ <strong>σε όλο το πλάτος</strong> (και στο τμήμα του $I$!). Μηδενισμός άνω και κάτω από τη διαγώνιο.
              </div>
              <a href="exam_prep.html#recipe-type-b" class="task-link">Μοντέλο Απάντησης Type B &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day5-task2">
                <span class="task-title">Έλεγχος Ισαπεχόντων Κόμβων &amp; Πίνακας Διηρημένων Διαφορών</span>
              </label>
              <div class="task-desc">
                Έλεγχος αποστάσεων $\Delta x_i = x_{i+1} - x_i$. Αν δεν ισαπέχουν, απαγορεύονται οι εμπρός διαφορές $\Delta^k f_0$ και απαιτούνται <strong>Διηρημένες Διαφορές</strong> $f[x_i, \dots, x_{i+k}] = \frac{f[x_{i+1}, \dots] - f[x_i, \dots]}{x_{i+k} - x_i}$.
              </div>
              <a href="topic4_interpolation.html#divided-diff" class="task-link">Μελέτη Διηρημένων Διαφορών &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day5-task3">
                <span class="task-title">Θεώρημα Σφάλματος Παρεμβολής &amp; Αιτιολόγηση E(x) = 0</span>
              </label>
              <div class="task-desc">
                Εφαρμογή του τύπου σφάλματος: $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{j=0}^n (x - x_j)$.
                Αιτιολόγηση ότι αν η συνάρτηση είναι πολυώνυμο βαθμού $m \le n$, τότε $f^{(n+1)} \equiv 0 \implies E(x) \equiv 0$ για κάθε $x \in \mathbb{R}$.
              </div>
              <a href="exam_prep.html#recipe-type-d" class="task-link">Μοντέλο Απάντησης Type D &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day5-task4">
                <span class="task-title">Μέθοδος Taylor 3 Όρων για ΣΔΕ (IVP)</span>
              </label>
              <div class="task-desc">
                Εκτέλεση του αλγορίθμου: $h = (b-a)/N$, $y_{k+1} = y_k + h y'_k + \frac{h^2}{2} y''_k$.
                Υπολογισμός της πεπλεγμένης παραγώγου $y'' = \frac{d}{dx}f(x, y) = f_x + f_y \cdot y'$.
              </div>
              <a href="exam_prep.html#recipe-type-g" class="task-link">Μοντέλο Απάντησης Type G &rarr;</a>
            </li>

            <li class="sprint-task-item">
              <label class="sprint-chk-label">
                <input type="checkbox" class="sprint-chk" data-task-id="day5-task5">
                <span class="task-title">Προσομοίωση Πλήρους Γραπτού 2.5 Ωρών (Mock Exam)</span>
              </label>
              <div class="task-desc">
                Επίλυση πλήρους θέματος εξετάσεων υπό πραγματικές συνθήκες χρόνου (2 ώρες και 30 λεπτά, κατανομή: 40m Θέμα 1, 30m Θέμα 2, 30m Θέμα 3). Αυτοβαθμολόγηση με τις λύσεις του Exam Prep.
              </div>
              <a href="exam_prep.html" class="task-link">Πλήρες Exam Prep Hub &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- MICRO-DRILL 5 -->
        <div class="drill-card" id="drill-box-5">
          <div class="drill-header">
            <div class="drill-tag-wrap">
              <span class="drill-badge">⚡ MICRO-DRILL 5</span>
              <span class="drill-topic">Παρεμβολή Newton με Μη-Ισαπέχοντες Κόμβους &amp; Μηδενικό Σφάλμα</span>
            </div>
            <span class="drill-pts">16 Μονάδες</span>
          </div>

          <div class="drill-problem">
            <p><strong>Εκφώνηση (Θέμα 2.1):</strong></p>
            <p>Δίνεται ο πίνακας δεδομένων:
              $$\begin{array}{c|cccc} i & 0 & 1 & 2 & 3 \\ \hline x_i & 0 & 1 & 2 & 4 \\ \hline f_i & 1 & 3 & 9 & 33 \end{array}$$
            </p>
            <ol class="drill-subq">
              <li>Εξέτασε αν οι κόμβοι ισαπέχουν και ανάφερε ποια μέθοδος παρεμβολής Newton είναι μαθηματικά κατάλληλη.</li>
              <li>Κατασκεύασε τον πλήρη πίνακα διηρημένων διαφορών.</li>
              <li>Γράψε το πολυώνυμο παρεμβολής $P_3(x)$ και υπολόγισε την τιμή $P_3(1.5)$.</li>
              <li>Αν γνωρίζεις ότι η πραγματική συνάρτηση είναι $f(x) = 2x^2 + 1$, αιτιολόγησε θεωρητικά γιατί το σφάλμα παρεμβολής $E(x)$ είναι μηδέν για κάθε $x$.</li>
            </ol>
          </div>

          <div class="drill-hint-box">
            <div class="hint-title">💡 Hint &amp; Mnemonic</div>
            <p class="hint-text">
              Υπολόγισε τα $x_{i+1} - x_i$: $1, 1, 2 \ne \text{σταθερό}$, άρα αποκλείονται οι εμπρός διαφορές! Στον παρονομαστή της διηρημένης διαφοράς τάξης $k$ μπαίνει πάντα: τελευταίος κόμβος μείον πρώτος ($x_{i+k} - x_i$). Για το σφάλμα, σκέψου την 4η παράγωγο του $2x^2 + 1$.
            </p>
          </div>

          <div class="drill-actions">
            <button type="button" class="drill-reveal-btn" data-drill-id="drill5">
              <span class="btn-icon">👁️</span> <span class="btn-text">Αποκάλυψη Πλήρους Λύσης &amp; Επαλήθευσης</span>
            </button>
          </div>

          <!-- HIDDEN SOLUTION BLOCK -->
          <div id="drill-sol-drill5" class="drill-solution-block" style="display: none;">
            <h5 class="solution-heading">✅ Επαληθευμένη Βήμα-προς-Βήμα Λύση (Micro-Drill 5)</h5>

            <div class="solution-step">
              <span class="step-num">Βήμα 1</span>
              <p><strong>Έλεγχος Ισαπεχόντων Κόμβων:</strong></p>
              <p>
                $$\Delta x_0 = x_1 - x_0 = 1 - 0 = 1$$
                $$\Delta x_1 = x_2 - x_1 = 2 - 1 = 1$$
                $$\Delta x_2 = x_3 - x_2 = 4 - 2 = 2 \ne 1$$
                Επειδή $\Delta x_2 \ne \Delta x_0$, οι κόμβοι <strong>δεν ισαπέχουν</strong>.
                Συνεπώς, η μέθοδος Newton με εμπρός διαφορές $\Delta^k f_0$ δεν εφαρμόζεται·
                υποχρεούμαστε να χρησιμοποιήσουμε τη μέθοδο <strong>Newton με Διηρημένες Διαφορές</strong>.
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 2</span>
              <p><strong>Πίνακας Διηρημένων Διαφορών:</strong></p>
              <ul class="clean-list">
                <li><strong>1ης Τάξης:</strong>
                  $$f[x_0, x_1] = \frac{3 - 1}{1 - 0} = \frac{2}{1} = 2$$
                  $$f[x_1, x_2] = \frac{9 - 3}{2 - 1} = \frac{6}{1} = 6$$
                  $$f[x_2, x_3] = \frac{33 - 9}{4 - 2} = \frac{24}{2} = 12$$
                </li>
                <li><strong>2ης Τάξης:</strong>
                  $$f[x_0, x_1, x_2] = \frac{f[x_1, x_2] - f[x_0, x_1]}{x_2 - x_0} = \frac{6 - 2}{2 - 0} = \frac{4}{2} = 2$$
                  $$f[x_1, x_2, x_3] = \frac{f[x_2, x_3] - f[x_1, x_2]}{x_3 - x_1} = \frac{12 - 6}{4 - 1} = \frac{6}{3} = 2$$
                </li>
                <li><strong>3ης Τάξης:</strong>
                  $$f[x_0, x_1, x_2, x_3] = \frac{f[x_1, x_2, x_3] - f[x_0, x_1, x_2]}{x_3 - x_0} = \frac{2 - 2}{4 - 0} = \frac{0}{4} = 0$$
                </li>
              </ul>
              <p><strong>Συγκεντρωτικός Πίνακας:</strong></p>
              <pre class="code-block"><code>x_i | f[.] | 1η Διηρημένη | 2η Διηρημένη | 3η Διηρημένη
----+------+--------------+--------------+-------------
 0  |  1   |              |              |
    |      |      2       |              |
 1  |  3   |              |      2       |
    |      |      6       |              |      0
 2  |  9   |              |      2       |
    |      |     12       |              |
 4  | 33   |              |              |</code></pre>
              <p>Οι συντελεστές της κορυφής είναι: $c_0 = 1$, $c_1 = 2$, $c_2 = 2$, $c_3 = 0$.</p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 3</span>
              <p><strong>Πολυώνυμο Παρεμβολής $P_3(x)$ &amp; Υπολογισμός $P_3(1.5)$:</strong></p>
              <p>
                $$P_3(x) = c_0 + c_1(x - x_0) + c_2(x - x_0)(x - x_1) + c_3(x - x_0)(x - x_1)(x - x_2)$$
                $$P_3(x) = 1 + 2(x - 0) + 2(x - 0)(x - 1) + 0$$
                $$P_3(x) = 1 + 2x + 2x(x - 1) = 1 + 2x + 2x^2 - 2x = \mathbf{2x^2 + 1}$$
              </p>
              <p>Στο σημείο $x = 1.5$:
                $$P_3(1.5) = 2(1.5)^2 + 1 = 2(2.25) + 1 = 4.5 + 1 = \mathbf{5.5}$$
              </p>
            </div>

            <div class="solution-step">
              <span class="step-num">Βήμα 4</span>
              <p><strong>Θεωρητική Αιτιολόγηση Μηδενικού Σφάλματος:</strong></p>
              <p>
                Ο τύπος του θεωρητικού σφάλματος για $n=3$ σημεία είναι:
                $$E(x) = f(x) - P_3(x) = \frac{f^{(4)}(\xi)}{4!} (x - 0)(x - 1)(x - 2)(x - 4)$$
                όπου $\xi \in (0, 4)$.<br>
                Για τη συνάρτηση $f(x) = 2x^2 + 1$:
                $$f'(x) = 4x, \quad f''(x) = 4, \quad f'''(x) = 0, \quad f^{(4)}(x) \equiv 0$$
                Επειδή η 4η παράγωγος κάθε δευτεροβάθμιου πολυωνύμου μηδενίζεται ταυτοτικά σε όλο το $\mathbb{R}$,
                έχουμε $f^{(4)}(\xi) = 0$, συνεπώς:
                $$\mathbf{E(x) \equiv 0 \quad \forall x \in \mathbb{R}}$$
                Το πολυώνυμο παρεμβολής ταυτίζεται επακριβώς με την αρχική συνάρτηση $f(x)$!
              </p>
            </div>

            <div class="drill-trap-alert">
              <strong>⚠️ SOS Παγίδα Εξετάσεων:</strong> Στον παρανομαστή της 2ης διηρημένης διαφοράς μπαίνει $x_2 - x_0 = 2 - 0 = 2$
              (όχι $x_2 - x_1$!). Ομοίως για το $f[x_1, x_2, x_3]$ μπαίνει $x_3 - x_1 = 4 - 1 = 3$.
              Αν ξεχάσεις να αφαιρέσεις τον πρώτο κόμβο του υποσυνόλου, όλος ο πίνακας καταστρέφεται!
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
<!-- ==================================================================== -->
<!-- END OF 5-DAY HIGH-ROI STUDY SPRINT PLAN MARKUP                       -->
<!-- ==================================================================== -->
```

---

## 5. Verification Method

To independently verify the pedagogical fidelity, mathematical correctness, and DOM conformance of this deliverable:

### 5.1 Interactive Element & Checkbox ID Audit
- Run the following Python audit to verify that all 21 task checkboxes and 5 drill reveal buttons are uniquely defined with zero ID collisions:
  ```python
  import re

  html_content = open("handoff.md", "r", encoding="utf-8").read()
  task_ids = re.findall(r'data-task-id="([^"]+)"', html_content)
  drill_ids = re.findall(r'data-drill-id="([^"]+)"', html_content)
  sol_ids = re.findall(r'id="(drill-sol-[^"]+)"', html_content)

  assert len(task_ids) == 21, f"Expected 21 tasks, found {len(task_ids)}"
  assert len(set(task_ids)) == 21, "Duplicate task IDs detected!"
  assert len(drill_ids) == 5, f"Expected 5 drill buttons, found {len(drill_ids)}"
  assert len(sol_ids) == 5, f"Expected 5 solution containers, found {len(sol_ids)}"

  for did in drill_ids:
      assert f"drill-sol-{did}" in sol_ids, f"Mismatch: drill-sol-{did} missing!"

  print("✅ Checkbox & Drill ID Contract Audit PASSED: 21 unique tasks, 5 verified drill pairs.")
  ```

### 5.2 Mathematical Verification of Micro-Drill Calculations
1. **Micro-Drill 1 (MATLAB & Spectral Radius)**:
   - Matrix: $A = [4, -1; 2, 4]$.
   - Jacobi matrix: $B = [0, 1/4; -1/2, 0]$. Characteristic equation: $\lambda^2 + 1/8 = 0 \implies \lambda = \pm i \sqrt{1/8}$.
   - Spectral radius: $\rho(B) = 1/\sqrt{8} \approx 0.353553$.
   - Gauss-Seidel matrix: $\mathcal{L}_1 = [0, 1/4; 0, -1/8]$. Eigenvalues: $0, -0.125$.
   - Spectral radius: $\rho(\mathcal{L}_1) = 0.125 = \rho(B)^2$. Verified exact.

2. **Micro-Drill 2 (Complexity Algebra)**:
   - Initial Jordan cost: $3n^3/2 (A^{-1}) + n^3 (A^{-1}C) + 3n^3/2 (D^{-1}) + n^3 (BD^{-1}) + n^3/2 (\text{solve}) = 11n^3/2 = 5.5n^3$.
   - Transformed: $(C + ABD^{-1})x = b$. Cost: $n^3 (AB) + 3n^3/2 (D^{-1}) + n^3 ((AB)D^{-1}) + n^3/2 (\text{solve}) = 4n^3$.
   - Difference: $5.5n^3 - 4n^3 = 1.5n^3 = 3n^3/2$ (one full Jordan inverse saved). Verified exact.

3. **Micro-Drill 3 (Fixed-Point Convergence)**:
   - Derivative: $g'(x) = 1 - 2\lambda x \implies g'(\sqrt{5}) = 1 - 2\sqrt{5}\lambda$.
   - Double inequality: $-1 < 1 - 2\sqrt{5}\lambda < 1 \implies -2 < -2\sqrt{5}\lambda < 0$.
   - Division by $-2\sqrt{5} < 0$: $1/\sqrt{5} > \lambda > 0$.
   - Quadratic condition: $1 - 2\sqrt{5}\lambda = 0 \implies \lambda = 1/(2\sqrt{5}) = \sqrt{5}/10$.
   - Iterate $x_1 = 2 - (\sqrt{5}/10)(4 - 5) = 2 + \sqrt{5}/10 \approx 2.223607$. Error: $0.0125$. Verified exact.

4. **Micro-Drill 4 (Quadrature Weights & Degree of Precision)**:
   - $\int_0^2 1 dx = 2 \implies w_0 + w_1 = 2$.
   - $\int_0^2 x dx = 2 \implies (4/3)w_1 = 2 \implies w_1 = 3/2, w_0 = 1/2$.
   - Monomial $x^2$: $\int_0^2 x^2 dx = 8/3$. Rule: $(1/2)(0)^2 + (3/2)(4/3)^2 = (3/2)(16/9) = 8/3$. Exact!
   - Monomial $x^3$: $\int_0^2 x^3 dx = 4$. Rule: $(3/2)(4/3)^3 = (3/2)(64/27) = 32/9 \approx 3.5556 \ne 4$. Exact degree of precision is $d = 2$. Verified exact.

5. **Micro-Drill 5 (Newton Interpolation with Non-Equidistant Nodes)**:
   - Nodes: $[0, 1, 2, 4]$. Spacings: $1, 1, 2 \ne \text{constant}$.
   - 1st differences: $f[x_0, x_1] = 2$, $f[x_1, x_2] = 6$, $f[x_2, x_3] = 12$.
   - 2nd differences: $f[x_0, x_1, x_2] = (6-2)/(2-0) = 2$, $f[x_1, x_2, x_3] = (12-6)/(4-1) = 2$.
   - 3rd difference: $(2-2)/(4-0) = 0$.
   - Polynomial: $P_3(x) = 1 + 2x + 2x(x-1) = 2x^2 + 1$.
   - $P_3(1.5) = 2(2.25) + 1 = 5.5$.
   - Error: $f^{(4)}(x) \equiv 0 \implies E(x) \equiv 0$ everywhere. Verified exact.
