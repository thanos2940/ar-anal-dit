# Handoff Report: M3 Spec Miner 2
**Mission**: Full Pedagogical Blueprint for Exam Prep Types E, F, G, H (Intermediate Calculations, Student Traps & Recognition Formulas)
**Author**: M3 Spec Miner 2 (`m3_explorer_2`)
**Date**: 2026-09-03T17:25:00+03:00
**Working Directory**: `D:\University\Αριθμητικη Αναλυση\.agents\m3_explorer_2`
**Target Deliverable**: `D:\University\Αριθμητικη Αναλυση\.agents\m3_explorer_2\handoff.md`

---

## 1. Observation
1. **Target Repository & Files Inspected**:
   - `ORIGINAL_REQUEST.md`: Requirement R3 mandates an ELI5 overhaul of core topic pages and `exam_prep.html` with highlighted intermediate arithmetic, explicit warnings on common student traps, and concrete recognition formulas ("When you see question phrasing X, follow recipe steps 1-2-3") in friendly Greek.
   - `PROJECT.md`: Milestone M3 specifies unfolding all intermediate steps in `exam_prep.html` (Types A–H), adding student traps and recognition recipes with anchor IDs.
   - `exam_prep.html`: Lines 686–1000 contain the current model questions for Types Δ (Newton interpolation & Simpson), Ε (Quadrature weights & degree of precision), ΣΤ (Newton-Raphson 5 global conditions), Ζ (Numerical ODEs with Taylor 3-term), and Η (MATLAB commands, indexing & scripts).
   - `topic4_interpolation.html` to `topic7_matlab_guide.html`: Contain foundational curriculum, formulas, and preliminary Jargon Busters.
   - `styles/components.css` & `m3_explorer_3`: Define styled callouts `.student-trap`, `.recognition-formula`, and `.step-by-step-calc`.

2. **Verbatim Code & Calculation Gaps Observed in `exam_prep.html`**:
   - **Type E (Newton Interpolation, lines 686–760)**:
     - The table of divided differences jumps from definition to values without showing explicit fraction evaluation: e.g., $f[x_0, x_1, x_2] = \frac{1-7}{1 - (-2)} = -2$ does not display the intermediate denominator step $1 + 2 = 3$, leading students to confuse indices.
     - Polynomial expansion $P_2(x) = -3 + 7(x+2) - 2(x+2)(x+1)$ jumps directly to $P_2(0) = 7$ without showing the expanded form $-2x^2 + x + 7$.
     - Step (ii) adds the 4th point $P_3(x) = P_2(x) + 1\cdot(x+2)(x+1)(x-1)$ and gives $P_3(0) = 5$, omitting the polynomial simplification $x^3 + 5$ and algebraic verification.
     - Theoretical error justification states $f^{(4)} \equiv 0$, but does not show the derivative sequence $f'=3x^2, f''=6x, f'''=6, f^{(4)}=0$.
     - Lacks the explicit "🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ" box and anchor `recipe-type-e`.
   - **Type F (Quadrature Weights & Degree of Precision, lines 782–845)**:
     - In lines 815–820, substitution of $w_2 = 2 - w_1$ into $w_1 x_1 + w_2 = 0$ skips intermediate algebraic steps, jumping straight to $w_1 = \frac{-2}{x_1 - 1}$ and $x_1 = -1/3$.
     - Degree of precision testing for $x^3$ calculates $\frac{3}{2}(-1/3)^3 + \frac{1}{2}(1)^3 = -\frac{1}{18} + \frac{1}{2} = \frac{4}{9}$, omitting the common denominator step $(-\frac{1}{18} + \frac{9}{18} = \frac{8}{18} = \frac{4}{9})$.
     - Composite Simpson (lines 762–778) lacks a dedicated recognition box explaining parity of intervals $2m$ vs points $N = 2m + 1$.
     - Lacks the explicit "🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ" box and anchor `recipe-type-f`.
   - **Type G (Numerical ODEs, lines 881–926)**:
     - The implicit chain rule derivative $y'' = \frac{d}{dx}(y - x^2 + 1) = y' - 2x = (y - x^2 + 1) - 2x$ is stated quickly without explaining why $\frac{d}{dx}y = y'$ (student confusion point).
     - Because $y''_1 = 0$, Taylor and Euler yield the same value ($4$), obscuring the difference between Euler and Taylor when curvature is non-zero.
     - Lacks the explicit "🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ" box and anchor `recipe-type-g`.
   - **Type H (MATLAB Drills & Scripting, lines 928–1000)**:
     - The column-major ordering in `find(A > 1)` is stated, but lacks a side-by-side visual matrix diagram showing linear indices $1..9$ mapping to coordinates $(i, j)$.
     - Matrix slicing `A(2:end, :)` and vectorization `sum(A.*B, 2)` lack line-by-line syntax breakdown.
     - Lacks the explicit "🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ" box and anchor `recipe-type-h`.

3. **TeX Syntax Errors & Escapes Observed**:
   - `exam_prep.html` line 75: MathJax configuration lacks `processEscapes: true`.
   - `exam_prep.html` lines 538, 600, 969: Raw HTML entity `&amp;` used instead of `&` inside LaTeX `\begin{bmatrix} ... \end{bmatrix}` blocks.

---

## 2. Logic Chain
1. **Student Cognitive Model**: A zero-background student studying under a 5-day deadline cannot deduce missing algebraic leaps. When an explanation skips from $w_1(x_1 - 1) = -2$ and $w_1 x_1(x_1 - 1) = 2/3$ to $x_1 = -1/3$, the student gets stuck wondering if a hidden theorem was used. Unfolding every step with arithmetic fractions and sign cancellations eliminates panic.
2. **Recognition Recipe Impact**: Greek exam questions follow exact recurring phrasing. By equipping students with a "When you see phrase X $\to$ Execute steps 1-2-3" recipe, exam anxiety is replaced by a mechanical, step-by-step procedure.
3. **Anchor Navigation Contract**: Anchoring `id="recipe-type-e"`, `id="recipe-type-f"`, `id="recipe-type-g"`, `id="recipe-type-h"` allows instant jumping from the 5-Day Sprint Plan (`index.html#sprint-plan`) and flashcards directly to the exact model recipe.
4. **Pedagogical Parity**:
   - Type E (Newton Interpolation) guarantees 15–16 marks in Thema 2.1.
   - Type F (Quadrature Weights & Degree of Precision + Simpson) guarantees 12–14 marks in Thema 2.2.
   - Type G (Numerical ODEs) guarantees 8 marks in Thema 2.3.
   - Type H (MATLAB commands & iteration matrix) guarantees 30 marks in Thema 3.
   Together, Types E–H represent **65 to 68 marks** of the total 100 marks on the exam paper.

---

## 3. Caveats
- No direct code edits have been made to `exam_prep.html` or other project files during this survey (maintaining strict Specification Miner read-only rules).
- The blueprint provides drop-in HTML and MathJax blocks formatted to match the existing dark-mode design system (`var(--surf)`, `var(--cyan)`, `var(--yellow)`, `var(--green)`).
- Both the DISPATCH.md grouping (E: Interpolation, F: Quadrature/Simpson, G: ODEs, H: MATLAB) and the existing Greek letter labels in `exam_prep.html` (Δ: Interpolation, Ε: Weights, Ζ: ODEs, Η: MATLAB) are explicitly cross-referenced to ensure 100% clarity during implementation.

---

## 4. Conclusion & Pedagogical Blueprint

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Exam Prep | Recipe Type E: Newton Interpolation | Recognition recipe & divided differences table with step-by-step arithmetic & error bound | Data table $(x_i, f_i)$ | Polynomial $P_n(x)$, intermediate fractions, $E(x)$ proof | Fallback to divided diffs if non-equidistant | ORIGINAL_REQUEST R3 / exam_prep.html line 686 |
| 2 | Exam Prep | Recipe Type F: Quadrature Weights & Precision | Recognition recipe, moment system solving, monomial testing ($1, x, x^2, x^3$), degree of precision $d$ | Quadrature formula $\int_a^b f \approx \sum w_i f(x_i)$ | Exact weights $w_i$, nodes $x_i$, precision degree $d$ | Fails test on $x^{d+1}$ | ORIGINAL_REQUEST R3 / exam_prep.html line 782 |
| 3 | Exam Prep | Recipe Type F (Composite Simpson): Interval Counting | Verification of interval parity $2m$, coefficient sequence 1-4-2-4-1, step $h=(b-a)/(2m)$, cubic exactness | Integration interval $[a, b]$, points $N$ | Numerical integral $I_{\text{Simp}}$, $E=0$ cubic justification | Error if interval count $n$ is odd | ORIGINAL_REQUEST R3 / exam_prep.html line 762 |
| 4 | Exam Prep | Recipe Type G: Numerical ODEs (Taylor & Euler) | Recognition recipe, implicit differentiation chain rule $y'' = f_x + f_y y'$, initial substitution, comparison | IVP $y'=f(x,y), y(x_0)=y_0$, step $n$ | $y_1, y_2$ approximations, Euler vs Taylor comparison | Error if $y$ treated as constant during diff | ORIGINAL_REQUEST R3 / exam_prep.html line 881 |
| 5 | Exam Prep | Recipe Type H: MATLAB Indexing & Iteration Function | Recognition recipe, column-major visual table, slicing `A(2:end,:)`, `diag(diag(A))`, `iterMatrix` script | Matrix $A$, parameters $\omega, \tau$ | Column-major indices, script lines, spectral radius $\rho$ | Index error if row-major assumed | ORIGINAL_REQUEST R3 / exam_prep.html line 928 |
| 6 | Navigation | Anchor IDs `recipe-type-e..h` | Deep-linking targets for direct jumps from study sprint and flashcards | URL hash `#recipe-type-e..h` | Viewport scrolls to recipe card | Inactive if id missing | BRIEFING.md / PROJECT.md M3 |
| 7 | Verification | MathJax & LaTeX Entity Fixes | Elimination of raw `&amp;` inside matrices and configuration of `processEscapes: true` | LaTeX TeX code | Rendered MathJax math | TeX parse error if `&amp;` present | PROJECT.md M4 / exam_prep.html line 75 |

### Edge Cases
| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Newton Interpolation | Spacing between nodes is non-uniform (e.g., $x = [-2, -1, 1, 3]$) | Forward difference formula $\Delta^k f_0$ crashes; student must detect non-uniformity and switch to divided differences $f[x_i, \dots, x_{i+k}]$. |
| 2 | Divided Difference Table | Higher-order denominators with negative nodes (e.g. $x_2 - x_0 = 1 - (-2)$) | Double negative mistake: students write $1 - 2 = -1$ instead of $1 + 2 = 3$, corrupting all subsequent columns. |
| 3 | Polynomial Extension | Adding a new point $(x_3, f_3)$ after computing $P_2(x)$ | Students erroneously discard $P_2(x)$ and restart from scratch instead of computing $P_3(x) = P_2(x) + c_3 \prod_{j=0}^2 (x - x_j)$. |
| 4 | Theoretical Error | Interpolating a polynomial $f(x) = x^3 + 5$ with $n=3$ nodes | Theoretical error is identically zero ($E(x) \equiv 0$) because $f^{(4)}(x) \equiv 0$; students often doubt their answer when error is zero. |
| 5 | Quadrature Weights | Quadrature formula with a pre-fixed node (e.g. $x_2 = 1$) | Blind application of Gauss degree of precision $2n-1 = 3$ fails; formula degree is only $d = K - 1 = 2$ because node is not free. |
| 6 | Degree of Precision | Monomial testing fails at $x^3$ ($\int_{-1}^1 x^3 dx = 0 \ne Q(x^3) = 4/9$) | Student mistakenly checks only powers up to $x^2$; exact degree of precision requires demonstrating where the formula breaks. |
| 7 | Composite Simpson | Odd number of intervals $n = 3$ (4 data points) | Standard Simpson 1/3 cannot be applied (requires even $n$); must switch to Simpson 3/8 or combine trapezoidal rule. |
| 8 | ODE Taylor 3-Term | Differentiating $y' = y - x^2 + 1$ with respect to $x$ | Students treat $y$ as a constant and write $y'' = -2x$; correct differentiation requires chain rule $\frac{d}{dx}y = y'$, yielding $y'' = y' - 2x = y - x^2 - 2x + 1$. |
| 9 | ODE Step Size | Exam specifies $n = 1$ interval on $[1, 2]$ | Step size is $h = (2-1)/1 = 1$; students confuse $n=1$ with $h=0.1$ and attempt unnecessary micro-steps. |
| 10 | MATLAB Diagonal Matrix | Calling `diag(A)` on matrix $A$ | Produces a column vector of diagonal entries, not an $n \times n$ matrix; must call `diag(diag(A))` before inverting with `inv()`. |
| 11 | MATLAB Linear Indexing | Evaluating `find(A > 1)` on $3 \times 3$ matrix | MATLAB scans column-by-column (column-major); scanning row-by-row gives completely incorrect linear indices. |
| 12 | MATLAB Polynomial Derivative | Differentiating polynomial vector $p = [1, 0, 5]$ | Using `diff(p)` yields vector differences $[ -1, 5 ]$; the correct polynomial derivative command is `polyder(p)`. |

---

### BLUEPRINT: MODEL SOLUTIONS & ARITHMETIC UNROLLING

```
================================================================================
BLUEPRINT FOR TYPE E: NEWTON INTERPOLATION & DIVIDED DIFFERENCES
Target: exam_prep.html (Lines 686–760) | Anchor: id="recipe-type-e"
================================================================================
```

#### 1. Recognition Recipe ("🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ")
- **Φράσεις-Κλειδιά στην Εκφώνηση**:
  - «Δίνεται ο πίνακας τιμών $(x_i, f_i)$...»
  - «Να κατασκευαστεί το πολυώνυμο παρεμβολής με την πλέον αποτελεσματική μέθοδο...»
  - «(i) στα τρία πρώτα σημεία, (ii) σε όλα τα σημεία...»
  - «Να υπολογιστεί το θεωρητικό σφάλμα παρεμβολής στο σημείο $\bar{x}$ και να σχολιαστεί...»
  - «Να προστεθεί νέο σημείο χωρίς να επανυπολογιστούν οι προηγούμενοι όροι...»
- **Συνταγή Δράσης 1-2-3-4-5**:
  1. **Έλεγχος Ισαποστάσεων (SOS - 2 μόρια)**: Υπολόγισε $\Delta x_i = x_{i+1} - x_i$. Αν είναι σταθερό $h \implies$ Εμπρός διαφορές ($\Delta^k f_0$). Αν ΔΕΝ είναι σταθερό $\implies$ Διηρημένες διαφορές ($f[x_i, \dots, x_{i+k}]$). Γράψε τη δικαιολόγηση ρητά!
  2. **Κατασκευή Πίνακα Διηρημένων**: Στον παρονομαστή της διαφοράς $k$-τάξης αφαιρείς ΠΑΝΤΑ: $x_{\text{τελευταίος}} - x_{\text{πρώτος}} = x_{i+k} - x_i$.
  3. **Συντελεστές Πολυωνύμου**: Είναι ΑΠΟΚΛΕΙΣΤΙΚΑ τα στοιχεία της **πάνω διαγωνίου**: $c_0 = f_0, c_1 = f[x_0, x_1], c_2 = f[x_0, x_1, x_2], \dots$
  4. **Επέκταση Πολυωνύμου (ΜΗΝ ΞΑΝΑΡΧΙΖΕΙΣ)**: $P_{k+1}(x) = P_k(x) + c_{k+1}\prod_{j=0}^k (x - x_j)$. Αυτή είναι η θεμελιώδης υπεροχή της Newton έναντι της Lagrange.
  5. **Θεωρητικό Σφάλμα**: $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^n (x - x_i)$. Αν η $f$ είναι πολυώνυμο βαθμού $m \le n$, τότε $f^{(n+1)} \equiv 0 \implies E(x) \equiv 0$.

#### 2. Προειδοποιήσεις Παγίδων ("⚠️ ΠΑΓΙΔΑ ΦΟΙΤΗΤΗ")
- **Παγίδα 1 (Ο Παρονομαστής στις 2ες και 3ες Διηρημένες)**: Στη 2η διηρημένη $f[x_0, x_1, x_2]$, ο παρονομαστής είναι $x_2 - x_0$, ΟΧΙ $x_1 - x_0$ ούτε $x_2 - x_1$!
- **Παγίδα 2 (Διπλό Μείον στους Αρνητικούς Κόμβους)**: Με $x_0 = -2, x_1 = -1$, ο παρονομαστής είναι $-1 - (-2) = -1 + 2 = 1$. Μην γράψεις $-1 - 2 = -3$!
- **Παγίδα 3 (Επανυπολογισμός από το Μηδέν)**: Στο ερώτημα «σε όλα τα σημεία», ΜΗΝ σβήσεις το $P_2(x)$. Απλώς πρόσθεσε τον επόμενο όρο $+ c_3(x-x_0)(x-x_1)(x-x_2)$.

#### 3. Πλήρως Αναπτυγμένοι Ενδιάμεσοι Υπολογισμοί (Drop-in HTML/TeX)
```html
<div class="qa-card" id="recipe-type-e">
  <div class="qa-q">
    <span class="qno">Ε.</span>
    <span>Παρεμβολή Newton με Διηρημένες Διαφορές, Επέκταση &amp; Σφάλμα <span class="exam-badge">Θέμα 2.1 — 15–16 Μονάδες</span></span>
  </div>
  <div class="qa-a">
    <div class="recognition-formula" style="background:rgba(57,212,200,0.06);border:1px solid var(--cyan);border-radius:10px;padding:14px 18px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--cyan);margin-bottom:6px;">🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ</div>
      <p style="margin:0;font-size:0.9rem;line-height:1.6;">
        Όταν δίνεται πίνακας τιμών $(x_i, f_i)$ και ζητείται <em>«πολυώνυμο παρεμβολής με την πλέον αποτελεσματική μέθοδο»</em>:
        <br><strong>Βήμα 1:</strong> Ελέγχεις αν ισαπέχουν ($x_{i+1}-x_i$). Αν όχι &rarr; <strong>Διηρημένες διαφορές Newton</strong>.
        <br><strong>Βήμα 2:</strong> Φτιάχνεις τον τριγωνικό πίνακα. Παρονομαστής: $x_{\text{τελευταίο}} - x_{\text{πρώτο}}$.
        <br><strong>Βήμα 3:</strong> Παίρνεις την <strong>πάνω διαγώνιο</strong> για τους συντελεστές $c_k$.
        <br><strong>Βήμα 4:</strong> Για τα επόμενα σημεία προσθέτεις μόνο τον νέο όρο: $P_3(x) = P_2(x) + c_3(x-x_0)(x-x_1)(x-x_2)$.
        <br><strong>Βήμα 5:</strong> Σφάλμα $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod(x-x_i)$. Αν $\deg(f) \le n$, τότε $f^{(n+1)} \equiv 0 \implies E(x) \equiv 0$.
      </p>
    </div>

    <div class="student-trap" style="background:rgba(248,81,73,0.08);border-left:4px solid var(--red);border-radius:8px;padding:12px 16px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--red);margin-bottom:4px;">⚠️ ΠΑΓΙΔΕΣ ΦΟΙΤΗΤΗ</div>
      <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.65;">
        <li><strong>Παγίδα Παρονομαστή:</strong> Στη 2η διαφορά $f[x_0,x_1,x_2]$, ο παρονομαστής είναι $x_2 - x_0 = 1 - (-2) = 3$ (ΟΧΙ $x_1-x_0$ ούτε $x_2-x_1$).</li>
        <li><strong>Παγίδα Προσήμων:</strong> Προσοχή στα διπλά μείον: $1 - (-2) = 1 + 2 = 3$, $-1 - (-2) = -1 + 2 = 1$.</li>
        <li><strong>Παγίδα Επανυπολογισμού:</strong> Στο ερώτημα «σε όλα τα σημεία», δεν ξαναρχίζεις από την αρχή! Κρατάς αυτούσιο το $P_2(x)$ και προσθέτεις 1 όρο.</li>
      </ul>
    </div>

    <p style="color:var(--muted)"><em>Εκφώνηση: Δίνεται ο πίνακας τιμών της συνάρτησης $f(x) = x^3 + 5$:</em></p>
    <div class="tbl-scroll">
      <table class="vtbl" style="width:auto;font-family:'JetBrains Mono',monospace;">
        <tbody>
          <tr><td>$i$</td><td>0</td><td>1</td><td>2</td><td>3</td></tr>
          <tr><td>$x_i$</td><td>−2</td><td>−1</td><td>1</td><td>3</td></tr>
          <tr><td>$f_i$</td><td>−3</td><td>4</td><td>6</td><td>32</td></tr>
        </tbody>
      </table>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 1: Έλεγχος Ισαποστάσεων Κόμβων</div>
      $$\Delta x_0 = x_1 - x_0 = -1 - (-2) = 1$$
      $$\Delta x_1 = x_2 - x_1 = 1 - (-1) = 2 \neq 1$$
      $$\Delta x_2 = x_3 - x_2 = 3 - 1 = 2$$
      <p style="margin:4px 0;font-size:0.9rem;">
        Επειδή $\Delta x_0 \neq \Delta x_1$, τα σημεία <strong>δεν ισαπέχουν</strong>. Επομένως, η πλέον κατάλληλη μέθοδος παρεμβολής είναι η μέθοδος <strong>Newton με διηρημένες διαφορές</strong> (οι εμπρός διαφορές απαιτούν σταθερό βήμα $h$).
      </p>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 2: Πλήρης Πίνακας Διηρημένων Διαφορών</div>
      <p style="font-size:0.9rem;margin-bottom:8px;">Αναλυτικοί υπολογισμοί κάθε κελιού χωρίς παραλείψεις:</p>
      <ul style="font-size:0.88rem;line-height:1.8;">
        <li><strong>1ης Τάξης:</strong>
          <br>$\bullet\; f[x_0, x_1] = \dfrac{f_1 - f_0}{x_1 - x_0} = \dfrac{4 - (-3)}{-1 - (-2)} = \dfrac{4 + 3}{-1 + 2} = \dfrac{7}{1} = \mathbf{7}$
          <br>$\bullet\; f[x_1, x_2] = \dfrac{f_2 - f_1}{x_2 - x_1} = \dfrac{6 - 4}{1 - (-1)} = \dfrac{2}{1 + 1} = \dfrac{2}{2} = \mathbf{1}$
          <br>$\bullet\; f[x_2, x_3] = \dfrac{f_3 - f_2}{x_3 - x_2} = \dfrac{32 - 6}{3 - 1} = \dfrac{26}{2} = \mathbf{13}$
        </li>
        <li><strong>2ης Τάξης:</strong>
          <br>$\bullet\; f[x_0, x_1, x_2] = \dfrac{f[x_1, x_2] - f[x_0, x_1]}{x_2 - x_0} = \dfrac{1 - 7}{1 - (-2)} = \dfrac{-6}{1 + 2} = \dfrac{-6}{3} = \mathbf{-2}$
          <br>$\bullet\; f[x_1, x_2, x_3] = \dfrac{f[x_2, x_3] - f[x_1, x_2]}{x_3 - x_1} = \dfrac{13 - 1}{3 - (-1)} = \dfrac{12}{3 + 1} = \dfrac{12}{4} = \mathbf{3}$
        </li>
        <li><strong>3ης Τάξης:</strong>
          <br>$\bullet\; f[x_0, x_1, x_2, x_3] = \dfrac{f[x_1, x_2, x_3] - f[x_0, x_1, x_2]}{x_3 - x_0} = \dfrac{3 - (-2)}{3 - (-2)} = \dfrac{3 + 2}{3 + 2} = \dfrac{5}{5} = \mathbf{1}$
        </li>
      </ul>

      <div class="tbl-scroll">
        <table class="vtbl" style="width:auto;font-family:'JetBrains Mono',monospace;">
          <thead><tr><th>$x_i$</th><th>$f[x_i]$</th><th>1ης Τάξης</th><th>2ης Τάξης</th><th>3ης Τάξης</th></tr></thead>
          <tbody>
            <tr><td>−2</td><td style="color:var(--green);font-weight:700;">−3</td><td style="color:var(--green);font-weight:700;">7</td><td style="color:var(--green);font-weight:700;">−2</td><td style="color:var(--green);font-weight:700;">1</td></tr>
            <tr><td>−1</td><td>4</td><td>1</td><td>3</td><td></td></tr>
            <tr><td>1</td><td>6</td><td>13</td><td></td><td></td></tr>
            <tr><td>3</td><td>32</td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
      <p style="font-size:0.85rem;color:var(--green);margin-top:4px;">
        &uarr; Η πάνω διαγώνιος (έντονα πράσινα) δίνει τους συντελεστές: $c_0 = -3,\; c_1 = 7,\; c_2 = -2,\; c_3 = 1$.
      </p>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 3: Πολυώνυμο στα 3 Πρώτα Σημεία $P_2(x)$ &amp; Αποτίμηση στο $x=0$</div>
      $$P_2(x) = c_0 + c_1(x - x_0) + c_2(x - x_0)(x - x_1)$$
      $$P_2(x) = -3 + 7(x - (-2)) + (-2)(x - (-2))(x - (-1)) = -3 + 7(x + 2) - 2(x + 2)(x + 1)$$
      <p style="font-size:0.9rem;margin:6px 0;">Αναπτύσσουμε πλήρως τις παρενθέσεις:</p>
      $$P_2(x) = -3 + 7x + 14 - 2(x^2 + 3x + 2) = 11 + 7x - 2x^2 - 6x - 4 = \mathbf{-2x^2 + x + 7}$$
      <p style="font-size:0.9rem;margin:6px 0;">Υπολογισμός της προσεγγιστικής τιμής στο $x = 0$:</p>
      $$P_2(0) = -2(0)^2 + 0 + 7 = \mathbf{7}$$
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 4: Προσθήκη 4ου Σημείου $P_3(x)$ Χωρίς Επανυπολογισμό</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">Προσθέτουμε μόνο τον όρο 3ης τάξης πάνω στο έτοιμο $P_2(x)$:</p>
      $$P_3(x) = P_2(x) + c_3(x - x_0)(x - x_1)(x - x_2) = (-2x^2 + x + 7) + 1 \cdot (x + 2)(x + 1)(x - 1)$$
      <p style="font-size:0.9rem;margin:6px 0;">Απλοποίηση: επειδή $(x+1)(x-1) = x^2 - 1$, έχουμε $(x+2)(x^2-1) = x^3 + 2x^2 - x - 2$. Άρα:</p>
      $$P_3(x) = (-2x^2 + x + 7) + (x^3 + 2x^2 - x - 2) = x^3 + (-2+2)x^2 + (1-1)x + (7-2) = \mathbf{x^3 + 5}$$
      $$P_3(0) = 0^3 + 5 = \mathbf{5} \quad (\text{Ακριβής τιμή, αφού } f(0) = 0^3 + 5 = 5)$$
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 5: Θεωρητικό Σφάλμα Παρεμβολής &amp; Αιτιολόγηση</div>
      <p style="margin:0 0 6px;font-size:0.9rem;">
        Ο γενικός τύπος σφάλματος παρεμβολής βαθμού $n=3$ για $f \in C^4[-2, 3]$ είναι:
      </p>
      $$E(x) = f(x) - P_3(x) = \frac{f^{(4)}(\xi)}{4!} (x - x_0)(x - x_1)(x - x_2)(x - x_3) = \frac{f^{(4)}(\xi)}{24}(x+2)(x+1)(x-1)(x-3)$$
      <p style="margin:6px 0;font-size:0.9rem;">
        Παραγωγίζουμε διαδοχικά τη συνάρτηση $f(x) = x^3 + 5$:
        <br>$\bullet\; f'(x) = 3x^2$
        <br>$\bullet\; f''(x) = 6x$
        <br>$\bullet\; f'''(x) = 6$
        <br>$\bullet\; f^{(4)}(x) \equiv 0 \quad \text{για κάθε } x \in \mathbb{R}$.
      </p>
      <div class="gbox" style="margin-top:8px;">
        <div class="lbl" style="color:var(--green)">✅ Το Τελικό Σχόλιο που Βαθμολογείται</div>
        Επειδή $f^{(4)}(\xi) \equiv 0$, το θεωρητικό σφάλμα είναι <strong>ακριβώς μηδέν</strong> ($E(x) \equiv 0$) για κάθε σημείο $x$.
        <strong>Αιτιολόγηση με βάση τη θεωρία:</strong> Το πολυώνυμο παρεμβολής $P_3(x)$ βαθμού το πολύ 3 που διέρχεται από 4 διακριτά σημεία είναι <em>μοναδικό</em>. Επειδή η ίδια η γεννήτρια συνάρτηση $f(x) = x^3 + 5$ είναι πολυώνυμο 3ου βαθμού, ταυτίζεται ταυτοτικά με το πολυώνυμο παρεμβολής της ($P_3(x) \equiv f(x)$).
      </div>
    </div>
  </div>
</div>
```

---

```
================================================================================
BLUEPRINT FOR TYPE F: QUADRATURE WEIGHTS, DEGREE OF PRECISION & SIMPSON
Target: exam_prep.html (Lines 762–845) | Anchor: id="recipe-type-f"
================================================================================
```

#### 1. Recognition Recipe ("🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ")
- **Φράσεις-Κλειδιά στην Εκφώνηση**:
  - «Δίνεται ο τύπος αριθμητικής ολοκλήρωσης $\int_a^b f(x)dx \approx \sum w_i f(x_i)$...»
  - «Προσδιορίστε τα βάρη $w_i$ (και τις θέσεις $x_i$) ώστε ο τύπος να έχει τον μέγιστο δυνατό βαθμό ακρίβειας...»
  - «Βρείτε τον βαθμό ακρίβειας του τύπου...»
  - «Υπολογίστε το ολοκλήρωμα με τον σύνθετο κανόνα Simpson...»
  - «Δικαιολογήστε γιατί το σφάλμα του κανόνα Simpson είναι μηδέν...»
- **Συνταγή Δράσης 1-2-3-4-5**:
  1. **Καταμέτρηση Ελεύθερων Παραμέτρων**:
     - Μέτρα πόσους αγνώστους έχεις συνολικά ($K$ άγνωστοι).
     - Αν κάποιο σημείο είναι καρφωμένο (π.χ. $x_2 = 1$), ΔΕΝ είναι άγνωστος!
     - Γράψε $K$ εξισώσεις απαιτώντας ακρίβεια για τα μονώνυμα $f(x) = 1, x, x^2, \dots, x^{K-1}$.
  2. **Σύστημα Ροπών**:
     - Αριστερό μέλος: υπολόγισε αναλυτικά το $\int_a^b x^k dx = \left[\frac{x^{k+1}}{k+1}\right]_a^b = \frac{b^{k+1}-a^{k+1}}{k+1}$.
     - Δεξί μέλος: αντικατάστησε το $f(x) = x^k$ στον τύπο: $\sum w_i (x_i)^k$.
     - Εξίσωσε και λύσε το σύστημα.
  3. **Έλεγχος Αθροίσματος Βαρών**: Πάντα $\sum w_i = b - a = \int_a^b 1 dx$ (έλεγχος σε 5 δευτερόλεπτα!).
  4. **Βαθμός Ακρίβειας (Δοκίμασε την Επόμενη Δύναμη)**:
     - Δοκίμασε το $f(x) = x^K$.
     - Υπολόγισε το αναλυτικό ολοκλήρωμα $\int_a^b x^K dx$ και την τιμή του κανόνα $\sum w_i (x_i)^K$.
     - Αν διαφέρουν $\implies$ ο βαθμός ακρίβειας είναι $d = K - 1$.
  5. **Κανόνας Simpson & Κυβική Ακρίβεια**:
     - Διαστήματα $n = \text{σημεία} - 1$. ΠΡΕΠΕΙ $n$ ΝΑ ΕΙΝΑΙ ΑΡΤΙΟ.
     - Βήμα $h = (b-a)/n$.
     - Σφάλμα: $E = -\frac{h^4(b-a)}{180} f^{(4)}(\xi)$. Επειδή περιέχει την 4η παράγωγο, μηδενίζεται για κάθε πολυώνυμο βαθμού $\le 3$. Άρα ο βαθμός ακρίβειας του Simpson είναι 3, όχι 2!

#### 2. Προειδοποιήσεις Παγίδων ("⚠️ ΠΑΓΙΔΑ ΦΟΙΤΗΤΗ")
- **Παγίδα 1 (Τυφλό $2n-1$ της Gauss)**: Όταν ένα σημείο είναι καρφωμένο (π.χ. $x_2 = 1$), ο βαθμός ΔΕΝ είναι $2n-1 = 3$. Οι ελεύθερες παράμετροι είναι 3, άρα ο βαθμός είναι το πολύ $3-1 = 2$.
- **Παγίδα 2 (Σημεία vs Διαστήματα στον Simpson)**: Με 3 σημεία έχεις $n = 3 - 1 = 2$ διαστήματα (απλός Simpson 1/3). Με 4 σημεία έχεις $n = 3$ διαστήματα (περιττό $\implies$ απαγορεύεται ο Simpson 1/3, πάει σε Simpson 3/8!).
- **Παγίδα 3 (Ξεχασμένος συντελεστής $h/3$)**: Πολλοί φοιτητές υπολογίζουν το άθροισμα $f_0 + 4f_1 + f_2$ και ξεχνούν να πολλαπλασιάσουν με $h/3$.

#### 3. Πλήρως Αναπτυγμένοι Ενδιάμεσοι Υπολογισμοί (Drop-in HTML/TeX)
```html
<div class="qa-card" id="recipe-type-f">
  <div class="qa-q">
    <span class="qno">ΣΤ.</span>
    <span>Προσδιορισμός Βαρών, Βαθμός Ακρίβειας &amp; Κανόνας Simpson <span class="exam-badge">Θέμα 2.2 — 12–14 Μονάδες</span></span>
  </div>
  <div class="qa-a">
    <div class="recognition-formula" style="background:rgba(88,166,255,0.06);border:1px solid var(--blue);border-radius:10px;padding:14px 18px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--blue);margin-bottom:6px;">🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ</div>
      <p style="margin:0;font-size:0.9rem;line-height:1.6;">
        Όταν ζητείται <em>«προσδιορισμός βαρών $w_i$ ώστε ο τύπος να έχει μέγιστο βαθμό ακρίβειας»</em>:
        <br><strong>Βήμα 1:</strong> Μετράς τους αγνώστους $K$ (βάρη + ελεύθεροι κόμβοι).
        <br><strong>Βήμα 2:</strong> Απαιτείς ακρίβεια για $f(x) = 1, x, x^2, \dots, x^{K-1}$.
        <br><strong>Βήμα 3:</strong> Υπολογίζεις τα αναλυτικά ολοκληρώματα $\int_a^b x^k dx = \frac{b^{k+1}-a^{k+1}}{k+1}$ και εξισώνεις με τον τύπο.
        <br><strong>Βήμα 4:</strong> Λύνεις το σύστημα και ελέγχεις ότι $\sum w_i = b - a$.
        <br><strong>Βήμα 5:</strong> Για τον βαθμό ακρίβειας, <strong>δοκιμάζεις την επόμενη δύναμη</strong> $x^K$. Εκεί που αποτυγχάνει, ο βαθμός είναι $K-1$.
      </p>
    </div>

    <div class="student-trap" style="background:rgba(248,81,73,0.08);border-left:4px solid var(--red);border-radius:8px;padding:12px 16px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--red);margin-bottom:4px;">⚠️ ΠΑΓΙΔΕΣ ΦΟΙΤΗΤΗ</div>
      <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.65;">
        <li><strong>Παγίδα Gauss $2n-1$:</strong> Αν κάποιο σημείο είναι δοσμένο (π.χ. $x_2 = 1$), ο τύπος ΔΕΝ είναι Gauss! Μην γράψεις αυτόματα $2n-1$. Ο βαθμός ισούται με πλήθος ελευθέρων παραμέτρων μείον 1.</li>
        <li><strong>Παγίδα Προσήμων Δυνάμεων:</strong> Προσοχή στο $(-1/3)^3 = -1/27$. Το μείον διατηρείται στις περιττές δυνάμεις!</li>
        <li><strong>Παγίδα Διαστημάτων Simpson:</strong> Στον Simpson, το $n$ είναι το πλήθος των <em>διαστημάτων</em> ($n = \text{σημεία} - 1$). Για Simpson 1/3 το $n$ πρέπει να είναι <strong>άρτιο</strong>.</li>
      </ul>
    </div>

    <p style="color:var(--muted)"><em>Εκφώνηση: Δίνεται ο τύπος $\displaystyle\int_{-1}^{1} f(x)\,dx \approx w_1 f(x_1) + w_2 f(1)$.
      (α) Προσδιορίστε τα $w_1, w_2, x_1$ ώστε ο τύπος να έχει τον μέγιστο δυνατό βαθμό ακρίβειας.
      (β) Βρείτε τον ακριβή βαθμό ακρίβειας του τύπου.
      (γ) Εφαρμόστε τον κανόνα Simpson για την $f(x)=x^3+5$ στα σημεία $\{-1, 1, 3\}$ και αιτιολογήστε το σφάλμα.
    </em></p>

    <div class="step-box">
      <div class="step-title">Βήμα 1: Καταμέτρηση Αγνώστων &amp; Στήσιμο Συστήματος</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">
        Άγνωστοι: $w_1, w_2, x_1$ &rarr; <strong>3 ελεύθερες παράμετροι</strong> (το σημείο $x_2 = 1$ είναι καρφωμένο).
        Απαιτούμε ο τύπος να είναι ακριβής για $f(x) = 1, x, x^2$:
      </p>
      $$\begin{aligned}
      f(x) = 1: &\quad w_1(1) + w_2(1) = \int_{-1}^1 1\,dx = [x]_{-1}^1 = 1 - (-1) = \mathbf{2} &&(1) \\
      f(x) = x: &\quad w_1(x_1) + w_2(1) = \int_{-1}^1 x\,dx = \left[\frac{x^2}{2}\right]_{-1}^1 = \frac{1}{2} - \frac{1}{2} = \mathbf{0} &&(2) \\
      f(x) = x^2: &\quad w_1(x_1^2) + w_2(1^2) = \int_{-1}^1 x^2\,dx = \left[\frac{x^3}{3}\right]_{-1}^1 = \frac{1}{3} - \left(-\frac{1}{3}\right) = \mathbf{\frac{2}{3}} &&(3)
      \end{aligned}$$
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 2: Βήμα-βήμα Επίλυση του Συστήματος</div>
      <ol style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.8;">
        <li>Από την εξίσωση (1) εκφράζουμε το $w_2$:
          $$w_2 = 2 - w_1$$
        </li>
        <li>Αντικαθιστούμε το $w_2$ στην εξίσωση (2):
          $$w_1 x_1 + (2 - w_1) = 0 \implies w_1 x_1 - w_1 = -2 \implies w_1(x_1 - 1) = -2 \implies \mathbf{w_1 = \frac{-2}{x_1 - 1}} \quad (*)$$
        </li>
        <li>Αφαιρούμε την εξίσωση (2) από την (3) κατά μέλη για να εξαλειφθεί το $w_2$:
          $$(w_1 x_1^2 + w_2) - (w_1 x_1 + w_2) = \frac{2}{3} - 0 \implies w_1 x_1^2 - w_1 x_1 = \frac{2}{3} \implies w_1 x_1 (x_1 - 1) = \frac{2}{3}$$
        </li>
        <li>Αντικαθιστούμε το γινόμενο $w_1(x_1 - 1) = -2$ από το προηγούμενο βήμα:
          $$(-2) \cdot x_1 = \frac{2}{3} \implies x_1 = \frac{2/3}{-2} = -\frac{2}{6} \implies \mathbf{x_1 = -\frac{1}{3}}$$
        </li>
        <li>Υπολογίζουμε τα βάρη $w_1$ και $w_2$:
          $$w_1 = \frac{-2}{-\frac{1}{3} - 1} = \frac{-2}{-\frac{4}{3}} = (-2) \cdot \left(-\frac{3}{4}\right) = \frac{6}{4} \implies \mathbf{w_1 = \frac{3}{2}}$$
          $$w_2 = 2 - w_1 = 2 - \frac{3}{2} = \frac{4 - 3}{2} \implies \mathbf{w_2 = \frac{1}{2}}$$
        </li>
      </ol>
      <div class="gbox" style="margin-top:8px;">
        <div class="lbl" style="color:var(--green)">✅ Έλεγχος Αθροίσματος Βαρών</div>
        $w_1 + w_2 = \frac{3}{2} + \frac{1}{2} = \frac{4}{2} = 2 = b - a$. Ο τύπος είναι:
        $$\int_{-1}^1 f(x)\,dx \approx \mathbf{\frac{3}{2} f\left(-\frac{1}{3}\right) + \frac{1}{2} f(1)}$$
      </div>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 3: Έλεγχος Βαθμού Ακρίβειας (Δοκιμή για $f(x) = x^3$)</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">
        Ο τύπος κατασκευάστηκε για να ισχύει έως $x^2$. Ελέγχουμε αν ισχύει και για $f(x) = x^3$:
      </p>
      $$\text{Αναλυτικό Ολοκλήρωμα: } I_3 = \int_{-1}^1 x^3\,dx = \left[\frac{x^4}{4}\right]_{-1}^1 = \frac{1^4}{4} - \frac{(-1)^4}{4} = \frac{1}{4} - \frac{1}{4} = \mathbf{0}$$
      $$\text{Αποτίμηση Τύπου: } Q_3 = \frac{3}{2}\left(-\frac{1}{3}\right)^3 + \frac{1}{2}(1)^3 = \frac{3}{2}\left(-\frac{1}{27}\right) + \frac{1}{2}(1) = -\frac{3}{54} + \frac{1}{2} = -\frac{1}{18} + \frac{9}{18} = \mathbf{\frac{8}{18} = \frac{4}{9}}$$
      <p style="font-size:0.9rem;margin:6px 0;">
        Επειδή $I_3 = 0 \neq Q_3 = \frac{4}{9}$, ο τύπος <strong>αποτυγχάνει</strong> για πολυώνυμα 3ου βαθμού.
        <br>Επομένως, ο μέγιστος βαθμός ακρίβειας του τύπου είναι $\mathbf{d = 2}$.
      </p>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 4: Κανόνας Simpson &amp; Αιτιολόγηση Μηδενικού Σφάλματος</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">
        Ζητείται η ολοκλήρωση της $f(x) = x^3 + 5$ στο $[-1, 3]$ στα 3 σημεία $\{-1, 1, 3\}$:
        <br>$\bullet$ Πλήθος σημείων: $N = 3 \implies$ Πλήθος διαστημάτων: $n = 3 - 1 = 2$ (άρτιος $\implies$ απλός Simpson 1/3).
        <br>$\bullet$ Βήμα: $h = \frac{b - a}{n} = \frac{3 - (-1)}{2} = \frac{4}{2} = 2$.
        <br>$\bullet$ Τιμές: $f(-1) = (-1)^3 + 5 = 4,\; f(1) = 1^3 + 5 = 6,\; f(3) = 3^3 + 5 = 32$.
      </p>
      $$I_{\text{Simp}} = \frac{h}{3}\big[f(-1) + 4f(1) + f(3)\big] = \frac{2}{3}\big[4 + 4(6) + 32\big] = \frac{2}{3}\big[4 + 24 + 32\big] = \frac{2}{3}(60) = \mathbf{40}$$
      <p style="font-size:0.9rem;margin:6px 0;">Αναλυτικό ολοκλήρωμα:</p>
      $$\int_{-1}^3 (x^3 + 5)\,dx = \left[\frac{x^4}{4} + 5x\right]_{-1}^3 = \left(\frac{81}{4} + 15\right) - \left(\frac{1}{4} - 5\right) = \frac{80}{4} + 20 = 20 + 20 = \mathbf{40}$$
      $$\Sigma\varphi\alpha\lambda\mu\alpha: |40 - 40| = \mathbf{0}$$
      <div class="gbox" style="margin-top:8px;">
        <div class="lbl" style="color:var(--green)">✅ Αιτιολόγηση με Βάση τη Θεωρία</div>
        Ο όρος σφάλματος του κανόνα Simpson είναι $E = -\frac{h^4(b-a)}{180} f^{(4)}(\xi)$. Επειδή η συνάρτηση $f(x) = x^3 + 5$ είναι πολυώνυμο 3ου βαθμού, η 4η παράγωγός της είναι παντού μηδέν ($f^{(4)} \equiv 0$), οπότε το σφάλμα μηδενίζεται ταυτοτικά. <strong>Σχόλιο:</strong> Παρότι ο Simpson κατασκευάζεται από παραβολή 2ου βαθμού, λόγω της συμμετρίας του διαστήματος ολοκληρώνει με απόλυτη ακρίβεια και τα κυβικά πολυώνυμα (βαθμός ακρίβειας 3).
      </div>
    </div>
  </div>
</div>
```

---

```
================================================================================
BLUEPRINT FOR TYPE G: NUMERICAL ODES (TAYLOR 3-TERM & EULER)
Target: exam_prep.html (Lines 881–926) | Anchor: id="recipe-type-g"
================================================================================
```

#### 1. Recognition Recipe ("🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ")
- **Φράσεις-Κλειδιά στην Εκφώνηση**:
  - «Δίνεται το πρόβλημα αρχικών τιμών (ΠΑΤ / IVP) $y' = f(x, y)$, $a \le x \le b$, $y(a) = y_0$»
  - «Αν $n = 1$ (ή $n = 2$), υπολογίστε την προσεγγιστική τιμή $y(b)$ με τη μέθοδο Taylor 3 όρων...»
  - «Υπολογίστε την τιμή με τη μέθοδο Euler και συγκρίνετε...»
  - «Βρείτε τη δεύτερη παράγωγο $y''$ παραγωγίζοντας τη διαφορική εξίσωση...»
- **Συνταγή Δράσης 1-2-3-4-5**:
  1. **Υπολογισμός Βήματος**: $h = \frac{b - a}{n}$. Γράψε αναλυτικά τα σημεία: $x_0 = a, x_1 = a + h, \dots, x_n = b$.
  2. **Έμμεση Παραγώγιση για το $y''$ (Κανόνας Αλυσίδας - SOS)**:
     - Θυμήσου: το $y$ είναι συνάρτηση του $x$ ($y = y(x)$), άρα $\frac{d}{dx}[y] = y'$.
     - $y'' = \frac{d}{dx}[f(x, y)] = f_x + f_y \cdot y'$.
     - Αντικατάστησε αμέσως το $y'$ με την αρχική έκφραση $f(x, y)$ ώστε η $y''$ να εξαρτάται μόνο από $x$ και $y$.
  3. **Αποτίμηση Παραγώγων στην Αφετηρία**:
     - Βρες $y'_0 = f(x_0, y_0)$.
     - Βρες $y''_0$ βάζοντας τα $(x_0, y_0)$ στον τύπο της 2ης παραγώγου.
  4. **Εφαρμογή Τύπου Taylor 3 Όρων**:
     $$y_{k+1} = y_k + h y'_k + \frac{h^2}{2} y''_k$$
     (Προσοχή στο $\frac{1}{2}$ μπροστά από το $h^2$!).
  5. **Σύγκριση με Euler**:
     - Euler: $y_{k+1}^{\text{Euler}} = y_k + h y'_k$ (αγνοεί τον όρο με το $y''$).
     - Αν $y''_0 = 0$, οι δύο μέθοδοι δίνουν συμπτωματικά την ίδια τιμή. Αν $y''_0 \ne 0$, η Taylor λαμβάνει υπόψη την καμπυλότητα και δίνει ακριβέστερο αποτέλεσμα.

#### 2. Προειδοποιήσεις Παγίδων ("⚠️ ΠΑΓΙΔΑ ΦΟΙΤΗΤΗ")
- **Παγίδα 1 (Θεώρηση του $y$ ως Σταθεράς)**: Αν $y' = y - x^2 + 1$, πολλοί φοιτητές γράφουν $y'' = 0 - 2x = -2x$. ΛΑΘΟΣ! Η παράγωγος του $y$ είναι $y'$. Το σωστό είναι $y'' = y' - 2x = (y - x^2 + 1) - 2x$.
- **Παγίδα 2 (Παράλειψη του $\frac{1}{2}$ στο $h^2$)**: Στον τύπο της Taylor, ο 3ος όρος είναι $\frac{h^2}{2!} y''_k = \frac{h^2}{2} y''_k$. Μην ξεχνάς τη διαίρεση με το 2.
- **Παγίδα 3 (Μπέρδεμα $n$ και $h$)**: Αν η εκφώνηση λέει $n = 1$, κάνεις ΕΝΑ μόνο άλμα μεγέθους $h = b - a$. Αν λέει $n = 2$, κάνεις ΔΥΟ διαδοχικά βήματα ($y_0 \to y_1 \to y_2$).

#### 3. Πλήρως Αναπτυγμένοι Ενδιάμεσοι Υπολογισμοί (Drop-in HTML/TeX)
```html
<div class="qa-card" id="recipe-type-g">
  <div class="qa-q">
    <span class="qno">Ζ.</span>
    <span>Αριθμητική Επίλυση ΣΔΕ: Μέθοδος Taylor 3 Όρων &amp; Σύγκριση με Euler <span class="exam-badge">Θέμα 2.3 — 8 Μονάδες</span></span>
  </div>
  <div class="qa-a">
    <div class="recognition-formula" style="background:rgba(240,136,62,0.06);border:1px solid var(--orange);border-radius:10px;padding:14px 18px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--orange);margin-bottom:6px;">🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ</div>
      <p style="margin:0;font-size:0.9rem;line-height:1.6;">
        Όταν δίνεται Πρόβλημα Αρχικών Τιμών (ΣΔΕ) $y' = f(x, y)$ με $y(x_0) = y_0$ και ζητείται υπολογισμός με Taylor 3 όρων ή Euler:
        <br><strong>Βήμα 1:</strong> Βρίσκεις το βήμα $h = \frac{b-a}{n}$ και ορίζεις τα σημεία $x_k = x_0 + k\cdot h$.
        <br><strong>Βήμα 2:</strong> Παραγωγίζεις τη ΣΔΕ ως προς $x$ για να βρεις την $y''$. <strong>Κανόνας Αλυσίδας:</strong> $\frac{d}{dx}y = y'$.
        <br><strong>Βήμα 3:</strong> Αντικαθιστάς το $y'$ στην $y''$ ώστε να εκφραστεί αποκλειστικά μέσω $x$ και $y$.
        <br><strong>Βήμα 4:</strong> Υπολογίζεις τις τιμές $y'_0$ και $y''_0$ στο αρχικό σημείο $(x_0, y_0)$.
        <br><strong>Βήμα 5:</strong> Εφαρμόζεις τον τύπο: $y_{k+1} = y_k + h y'_k + \frac{h^2}{2} y''_k$. (Για Euler: $y_{k+1} = y_k + h y'_k$).
      </p>
    </div>

    <div class="student-trap" style="background:rgba(248,81,73,0.08);border-left:4px solid var(--red);border-radius:8px;padding:12px 16px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--red);margin-bottom:4px;">⚠️ ΠΑΓΙΔΕΣ ΦΟΙΤΗΤΗ</div>
      <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.65;">
        <li><strong>Το $y$ ΔΕΝ είναι Σταθερά:</strong> Όταν παραγωγίζεις την $y' = y - x^2 + 1$, ο όρος $y$ παραγωγίζεται σε $y'$, ΟΧΙ σε 0! Άρα $y'' = y' - 2x$.</li>
        <li><strong>Ξεχασμένο $1/2$ στον 3ο όρο:</strong> Ο τύπος Taylor έχει $\frac{h^2}{2} y''_k$. Μην προσθέτεις σκέτο $h^2 y''_k$.</li>
        <li><strong>Παραγώγιση Κλάσματος:</strong> Αν $y' = \frac{x-y}{2}$, τότε $y'' = \frac{1 - y'}{2} = \frac{1 - \frac{x-y}{2}}{2} = \frac{2 - x + y}{4}$. Μην ξεχνάς το $-y'/2$!</li>
      </ul>
    </div>

    <p style="color:var(--muted)"><em>Εκφώνηση (Φεβρουάριος 2024): Δίνεται το πρόβλημα αρχικών τιμών $y' = y - x^2 + 1$, $1 \le x \le 2$, με αρχική συνθήκη $y(1) = 2$.
      Αν $n = 1$, υπολογίστε την $y(2.0)$ με τη μέθοδο Taylor με τρεις όρους και συγκρίνετε με τη μέθοδο Euler.
    </em></p>

    <div class="step-box">
      <div class="step-title">Βήμα 1: Υπολογισμός Βήματος $h$ και Πλέγματος</div>
      $$h = \frac{b - a}{n} = \frac{2 - 1}{1} = \mathbf{1}$$
      <p style="margin:4px 0;font-size:0.9rem;">
        Σημεία διαμέρισης: $x_0 = 1,\; x_1 = 2$. Χρειάζεται μόνο <strong>ένα βήμα</strong> ($k=0$) από το $x_0$ στο $x_1$.
      </p>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 2: Έμμεση Παραγώγιση της ΣΔΕ για την Εύρεση της $y''$</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">
        Επειδή η άγνωστη συνάρτηση $y = y(x)$ εξαρτάται από το $x$, εφαρμόζουμε τον κανόνα της αλυσίδας:
      </p>
      $$y' = y - x^2 + 1$$
      $$y'' = \frac{d}{dx}\big(y - x^2 + 1\big) = \frac{dy}{dx} - \frac{d}{dx}(x^2) + \frac{d}{dx}(1) = y' - 2x + 0$$
      <p style="font-size:0.9rem;margin:6px 0;">
        Αντικαθιστούμε το $y' = y - x^2 + 1$ στην παραπάνω σχέση ώστε η $y''$ να εκφραστεί μόνο μέσω $x$ και $y$:
      </p>
      $$y'' = (y - x^2 + 1) - 2x = \mathbf{y - x^2 - 2x + 1}$$
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 3: Αποτίμηση Παραγώγων στο Σημείο Αρχικών Τιμών $(x_0, y_0) = (1, 2)$</div>
      $$\mathbf{y'_0} = f(x_0, y_0) = y_0 - x_0^2 + 1 = 2 - 1^2 + 1 = 2 - 1 + 1 = \mathbf{2}$$
      $$\mathbf{y''_0} = y'_0 - 2x_0 = 2 - 2(1) = 2 - 2 = \mathbf{0}$$
      <p style="font-size:0.85rem;color:var(--muted);margin-top:4px;">
        (Επαλήθευση μέσω της γενικής έκφρασης: $y''_0 = y_0 - x_0^2 - 2x_0 + 1 = 2 - 1 - 2 + 1 = 0$ ✅).
      </p>
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 4: Εφαρμογή Τύπου Taylor 3 Όρων</div>
      $$y(2.0) \approx y_1 = y_0 + h\,y'_0 + \frac{h^2}{2} y''_0$$
      $$y_1 = 2 + (1)\cdot(2) + \frac{1^2}{2}\cdot(0) = 2 + 2 + 0 = \mathbf{4}$$
    </div>

    <div class="step-box">
      <div class="step-title">Βήμα 5: Σύγκριση Euler vs Taylor 3 Όρων</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">
        Αν εφαρμόζαμε την απλή μέθοδο Euler:
      </p>
      $$y_1^{\text{Euler}} = y_0 + h\,f(x_0, y_0) = 2 + 1\cdot(2) = \mathbf{4}$$
      <div class="gbox" style="margin-top:8px;">
        <div class="lbl" style="color:var(--green)">✅ Το Σχόλιο Σύγκρισης</div>
        Παρατηρούμε ότι οι μέθοδοι Euler και Taylor 3 όρων δίνουν <strong>ακριβώς το ίδιο αποτέλεσμα</strong> ($y_1 = 4$).
        <strong>Γιατί συνέβη αυτό;</strong> Επειδή στο συγκεκριμένο σημείο εκκίνησης $(1, 2)$ έτυχε η δεύτερη παράγωγος να μηδενίζεται ($y''_0 = 0$), ο διορθωτικός τετραγωνικός όρος $\frac{h^2}{2}y''_0$ εξαφανίστηκε. Γενικά, αν $y''_0 \neq 0$, η Taylor 3 όρων είναι πολύ ακριβέστερη (τοπικό σφάλμα $O(h^3)$ έναντι $O(h^2)$ της Euler).
      </div>
    </div>
  </div>
</div>
```

---

```
================================================================================
BLUEPRINT FOR TYPE H: MATLAB SCRIPTING, INDEXING & ITERATION SCRIPTS
Target: exam_prep.html (Lines 928–1000) | Anchor: id="recipe-type-h"
================================================================================
```

#### 1. Recognition Recipe ("🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ")
- **Φράσεις-Κλειδιά στην Εκφώνηση**:
  - «Θέμα 3 (30 Μονάδες)»
  - «Γράψτε τις εντολές MATLAB για...»
  - «Δίνεται ο πίνακας $A$. Ποια θα είναι τα αποτελέσματα των εντολών `find(...)`...»
  - «Γράψτε συνάρτηση (function) `[Z, rho] = iterMatrix(A, w, t)` που κατασκευάζει τον επαναληπτικό πίνακα...»
  - «Υπολογίστε τη φασματική ακτίνα $\rho$...»
  - «Δίνονται ρίζες πολυωνύμου... υπολογίστε τιμές σε πλέγμα και κάντε γραφική παράσταση...»
- **Συνταγή Δράσης 1-2-3-4-5**:
  1. **Column-Major Διάταξη (SOS)**:
     - Στο πρόχειρο, σχεδίασε αμέσως το πλέγμα δεικτών για πίνακα $3 \times 3$:
       $$\begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$$
     - Σάρωσε ΚΑΤΑ ΣΤΗΛΕΣ (1η στήλη από πάνω προς τα κάτω &rarr; 2η στήλη &rarr; 3η στήλη).
     - `find(A > c)` επιστρέφει **θέσεις** (δείκτες), ενώ `A(find(A > c))` επιστρέφει **τιμές**.
  2. **Διανυσματοποίηση (Vectorization) αντί για Loops**:
     - Κατά γραμμές εσωτερικό γινόμενο: `sum(A .* B, 2)` (ΟΧΙ `for` loop).
     - Σχετικό σφάλμα: `norm(x - xhat) / norm(x)`.
     - Νόρμα απείρου υπολοίπου: `norm(b - A*xhat, inf)`.
  3. **Πολυώνυμα (Το Λεξικό των 5)**:
     - Ρίζες &rarr; Συντελεστές: `p = poly(r)`.
     - Συντελεστές &rarr; Ρίζες: `r = roots(p)`.
     - Τιμές σε πλέγμα: `y = polyval(p, x)`.
     - Παράγωγος (χωρίς συμβολικές): `dp = polyder(p)`. (Ποτέ `diff`!).
     - Παράγωγος (με συμβολικές): `syms x; df = diff(f, x); subs(df, x, x0)`.
  4. **Συνάρτηση Επαναληπτικού Πίνακα (10 Γραμμές SOS - 12–20 Μονάδες)**:
     - Πάντα ξεκινάς με το standard μπλοκ:
       `D = diag(diag(A));` (Διπλό diag!)
       `CL = -tril(A, -1);` (Μείον κάτω τρίγωνο!)
       `CU = -triu(A, 1);` (Μείον άνω τρίγωνο!)
       `L = inv(D)*CL;  U = inv(D)*CU;`
     - Μεταφράζεις τον δοσμένο τύπο σύμβολο-προς-σύμβολο.
     - Φασματική ακτίνα: `rho = max(abs(eig(Z)));`.

#### 2. Προειδοποιήσεις Παγίδων ("⚠️ ΠΑΓΙΔΑ ΦΟΙΤΗΤΗ")
- **Παγίδα 1 (Μονό `diag(A)` vs Διπλό `diag(diag(A))`):** Το μονό `diag(A)` επιστρέφει διάνυσμα! Αν γράψεις `inv(diag(A))` το MATLAB θα βγάλει σφάλμα. Πρέπει υποχρεωτικά να γράψεις `diag(diag(A))` για διαγώνιο πίνακα.
- **Παγίδα 2 (Ξεχασμένο μείον στα τρίγωνα `CL` και `CU`):** Η σύμβαση των θεμάτων είναι $A = D - C_L - C_U$. Άρα `CL = -tril(A, -1)` και `CU = -triu(A, 1)`. Χωρίς το μείον, όλοι οι πίνακες βγαίνουν ανάποδα!
- **Παγίδα 3 (`diff(p)` αντί για `polyder(p)`):** Το `diff(p)` υπολογίζει διαφορές διαδοχικών στοιχείων ($p_{i+1} - p_i$). Η παράγωγος πολυωνύμου είναι `polyder(p)`.
- **Παγίδα 4 (`max(A)` vs `max(A(:))`):** Η `max(A)` βρίσκει το μέγιστο ανά στήλη. Για το μέγιστο όλου του πίνακα γράφεις `max(A(:))`.

#### 3. Πλήρως Αναπτυγμένοι Ενδιάμεσοι Υπολογισμοί & Script (Drop-in HTML/TeX)
```html
<div class="qa-card" id="recipe-type-h">
  <div class="qa-q">
    <span class="qno">Η.</span>
    <span>MATLAB: Column-Major Indexing, Διανυσματοποίηση &amp; Επαναληπτικοί Πίνακες <span class="exam-badge">Θέμα 3 — 30 Μονάδες</span></span>
  </div>
  <div class="qa-a">
    <div class="recognition-formula" style="background:rgba(63,185,80,0.06);border:1px solid var(--green);border-radius:10px;padding:14px 18px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--green);margin-bottom:6px;">🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ</div>
      <p style="margin:0;font-size:0.9rem;line-height:1.6;">
        Το Θέμα 3 αποτελείται από 3 σκέλη καθαρής μηχανικής αποστήθισης:
        <br><strong>Μέρος 1 (Εντολές):</strong> Μία γραμμή κώδικα ανά ζητούμενο (νόρμες, δείκτης συνθήκης, ορίζουσα, ίχνος).
        <br><strong>Μέρος 2 (Indexing):</strong> Αρίθμηση στοιχείων <strong>κατά στήλες</strong> (column-major order).
        <br><strong>Μέρος 3 (Συνάρτηση):</strong> Στάνταρ template 10 γραμμών για επαναληπτικό πίνακα και φασματική ακτίνα.
      </p>
    </div>

    <div class="student-trap" style="background:rgba(248,81,73,0.08);border-left:4px solid var(--red);border-radius:8px;padding:12px 16px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--red);margin-bottom:4px;">⚠️ ΠΑΓΙΔΕΣ ΦΟΙΤΗΤΗ</div>
      <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.65;">
        <li><strong>Το Διπλό diag:</strong> <code>D = diag(diag(A))</code>. Το μονό <code>diag(A)</code> δίνει διάνυσμα, το διπλό δίνει διαγώνιο πίνακα.</li>
        <li><strong>Πρόσημα στα Τρίγωνα:</strong> <code>CL = -tril(A, -1)</code> και <code>CU = -triu(A, 1)</code>. Το μείον είναι υποχρεωτικό λόγω της σύμβασης $A = D - C_L - C_U$.</li>
        <li><strong>Παράγωγος Πολυωνύμου:</strong> Χωρίς symbolic γράφεις <code>polyder(p)</code>, ΠΟΤΕ <code>diff(p)</code>.</li>
        <li><strong>Στήλες vs Γραμμές:</strong> Η <code>find</code> σαρώνει προς τα κάτω την 1η στήλη, μετά τη 2η στήλη κ.ο.κ.</li>
      </ul>
    </div>

    <div class="step-box">
      <div class="step-title">Μέρος 1: Column-Major Linear Indexing (Αναλυτική Αντιστοίχιση)</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">Δίνεται ο πίνακας:</p>
      $$A = \begin{bmatrix} 10 & 3 & -7 \\ 0 & -6 & 0 \\ 1 & 0 & 4 \end{bmatrix}$$
      <p style="font-size:0.9rem;margin:6px 0;">
        Στο MATLAB τα στοιχεία αποθηκεύονται στη μνήμη <strong>κατά στήλες</strong>. Ο πίνακας των γραμμικών δεικτών είναι:
      </p>
      <div class="tbl-scroll">
        <table class="vtbl" style="width:auto;font-family:'JetBrains Mono',monospace;text-align:center;">
          <thead><tr><th>Γραμμή \ Στήλη</th><th>Στήλη 1</th><th>Στήλη 2</th><th>Στήλη 3</th></tr></thead>
          <tbody>
            <tr><td><strong>Γραμμή 1</strong></td><td>Δείκτης 1 &rarr; <strong>10</strong></td><td>Δείκτης 4 &rarr; <strong>3</strong></td><td>Δείκτης 7 &rarr; <strong>−7</strong></td></tr>
            <tr><td><strong>Γραμμή 2</strong></td><td>Δείκτης 2 &rarr; <strong>0</strong></td><td>Δείκτης 5 &rarr; <strong>−6</strong></td><td>Δείκτης 8 &rarr; <strong>0</strong></td></tr>
            <tr><td><strong>Γραμμή 3</strong></td><td>Δείκτης 3 &rarr; <strong>1</strong></td><td>Δείκτης 6 &rarr; <strong>0</strong></td><td>Δείκτης 9 &rarr; <strong>4</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p style="font-size:0.9rem;margin:8px 0 4px;">Η γραμμική μορφή του πίνακα είναι: $A(:) = [10,\, 0,\, 1,\, 3,\, -6,\, 0,\, -7,\, 0,\, 4]^T$.</p>
      <ul style="font-size:0.88rem;line-height:1.8;">
        <li><code>find(A > 1)</code>: Ψάχνει τα στοιχεία με τιμή $>1$ κατά στήλη:
          <br>&bull; Θέση 1: $10 > 1$ &check; &rarr; <strong>1</strong>
          <br>&bull; Θέση 4: $3 > 1$ &check; &rarr; <strong>4</strong>
          <br>&bull; Θέση 9: $4 > 1$ &check; &rarr; <strong>9</strong>
          <br>&rarr; Αποτέλεσμα: <code>[1; 4; 9]</code> (διάνυσμα δεικτών).
        </li>
        <li><code>A(find(A > 1))</code>: Επιστρέφει τις <strong>τιμές</strong> στις παραπάνω θέσεις:
          <br>&rarr; Αποτέλεσμα: <code>[10; 3; 4]</code>.
        </li>
        <li><code>find(A == 0)</code>: Θέσεις όπου $A_{ij} = 0$:
          <br>&rarr; Αποτέλεσμα: <code>[2; 6; 8]</code>.
        </li>
        <li><code>A(2:end, :)</code>: Επιλογή υποπίνακα (όλες οι γραμμές από τη 2η και κάτω, όλες οι στήλες):
          <br>&rarr; Αποτέλεσμα: $\begin{bmatrix} 0 & -6 & 0 \\ 1 & 0 & 4 \end{bmatrix}$.
        </li>
      </ul>
    </div>

    <div class="step-box">
      <div class="step-title">Μέρος 2: Πλήρης Συνάρτηση Επαναληπτικού Πίνακα &amp; Φασματικής Ακτίνας</div>
      <p style="font-size:0.9rem;margin-bottom:6px;">
        Πρότυπο συνάρτησης για υπολογισμό του πίνακα SOR / ESOR και της φασματικής του ακτίνας:
      </p>
<div class="cb"><code><span class="kw">function</span> [Z, rho] = <span class="fn">iterMatrix</span>(A, w, t)
    <span class="cm">% A: τετραγωνικός πίνακας συντελεστών n x n</span>
    <span class="cm">% w: παράμετρος χαλάρωσης (omega), t: παράμετρος επιτάχυνσης (tau)</span>
    n = <span class="fn">size</span>(A, <span class="nm">1</span>);
    I = <span class="fn">eye</span>(n);
    
    <span class="cm">% 1. Διαγώνιος D (διπλό diag!)</span>
    D = <span class="fn">diag</span>(<span class="fn">diag</span>(A));
    
    <span class="cm">% 2. Αυστηρά κάτω και άνω τρίγωνα με ΑΝΤΙΘΕΤΟ πρόσημο</span>
    CL = -<span class="fn">tril</span>(A, -<span class="nm">1</span>);
    CU = -<span class="fn">triu</span>(A, <span class="nm">1</span>);
    
    <span class="cm">% 3. Κανονικοποιημένα L και U</span>
    L = <span class="fn">inv</span>(D) * CL;
    U = <span class="fn">inv</span>(D) * CU;
    
    <span class="cm">% 4. Μετάφραση δοσμένου τύπου επαναληπτικού πίνακα (π.χ. SOR)</span>
    Z = I - w * <span class="fn">inv</span>(I - w*L) * <span class="fn">inv</span>(D) * A;
    
    <span class="cm">% 5. Υπολογισμός ιδιοτιμών και φασματικής ακτίνας</span>
    eigenvalues = <span class="fn">eig</span>(Z);
    rho = <span class="fn">max</span>(<span class="fn">abs</span>(eigenvalues));
<span class="kw">end</span></code></div>
    </div>
  </div>
</div>
```

---

## 5. Verification Method

To independently verify the mathematical results and blueprint implementations:

1. **Analytical & Numerical Verification**:
   - **Type E**:
     - Evaluate $P_3(x) = -2x^2 + x + 7 + (x+2)(x+1)(x-1) = x^3 + 5$.
     - Test at node points: $P_3(-2) = -8+5 = -3$, $P_3(-1) = -1+5 = 4$, $P_3(1) = 1+5 = 6$, $P_3(3) = 27+5 = 32$. All match data exactly.
     - 4th derivative of cubic $f(x)=x^3+5$ is identically 0, proving $E(x) \equiv 0$.
   - **Type F**:
     - System of moments:
       $w_1 + w_2 = 3/2 + 1/2 = 2 = \int_{-1}^1 1 dx$.
       $w_1 x_1 + w_2 (1) = (3/2)(-1/3) + (1/2)(1) = -1/2 + 1/2 = 0 = \int_{-1}^1 x dx$.
       $w_1 x_1^2 + w_2 (1)^2 = (3/2)(1/9) + 1/2 = 1/6 + 3/6 = 4/6 = 2/3 = \int_{-1}^1 x^2 dx$.
       All 3 moment equations hold with 100% algebraic exactness.
     - Counterexample at $x^3$:
       $w_1 x_1^3 + w_2 (1)^3 = (3/2)(-1/27) + 1/2 = -1/18 + 9/18 = 8/18 = 4/9 \ne 0 = \int_{-1}^1 x^3 dx$.
       Degree of precision is strictly 2.
   - **Type G**:
     - Implicit derivative: $y'' = \frac{d}{dx}(y - x^2 + 1) = y' - 2x = y - x^2 - 2x + 1$.
     - Evaluated at $(1, 2)$: $y'_0 = 2 - 1 + 1 = 2$, $y''_0 = 2 - 2(1) = 0$.
     - Taylor step: $y_1 = 2 + 1(2) + \frac{1}{2}(0) = 4$.
   - **Type H**:
     - For matrix $A = [10, 3, -7; 0, -6, 0; 1, 0, 4]$:
     - Vectorized column order is elements $[10, 0, 1, 3, -6, 0, -7, 0, 4]$.
     - Values $> 1$ are at linear indices 1 ($10$), 4 ($3$), 9 ($4$).
     - `find(A > 1)` strictly yields `[1; 4; 9]`.

2. **Automated Verification Script (`scripts/verify_webnotes.py`)**:
   - The test harness will verify:
     - All 4 anchor IDs `recipe-type-e`, `recipe-type-f`, `recipe-type-g`, `recipe-type-h` exist in `exam_prep.html`.
     - Zero unrendered TeX delimiters or raw `&amp;` entities inside LaTeX blocks.
     - Reciprocal navigation links to `prerequisites.html` intact.
