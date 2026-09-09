# Handoff Report: M3 Explorer 1
**Mission**: Investigation & Detailed Pedagogical Blueprints for `exam_prep.html` Question Types A–D (Fixed-Point, Gauss-Jordan Inversion, Complexity Algebra, Newton Interpolation & Simpson)
**Author**: M3 Explorer 1 (`teamwork_preview_explorer`)
**Target Directory**: `D:\University\Αριθμητικη Αναλυση\.agents\m3_explorer_1\handoff.md`
**Date**: 2026-09-03T14:24:00Z
**Milestone**: M3 (ELI5 Overhaul & Exam Prep Recipes)

---

## 1. Observation

### 1.1 Scope & Codebase Audit
An exhaustive audit of `exam_prep.html` (1105 lines), `index.html` (1326 lines), `PROJECT.md`, and `ORIGINAL_REQUEST.md` revealed the following exact line locations and current structural state of Question Types A, B, C, and D:

| Question Type | Line Range in `exam_prep.html` | Topic / Exam Question | Current Anchor / ID | Required Anchor / ID |
|---|---|---|---|---|
| **Type A** | Lines 484–528 | Σταθερό σημείο με παράμετρο: εύρος σύγκλισης και τετραγωνική σύγκλιση (Θέμα 1.1) | *None* (`<div class="qa-card">`) | `id="recipe-type-a"` |
| **Type B** | Lines 530–614 | Αντίστροφος πίνακα με Jordan + μερική οδήγηση (Θέμα 1.2) | *None* (`<div class="qa-card">`) | `id="recipe-type-b"` |
| **Type C (Γ)** | Lines 616–684 | Πολυπλοκότητα & μετασχηματισμός γραμμικού συστήματος (Θέμα 1.3) | *None* (`<div class="qa-card">`) | `id="recipe-type-c"` |
| **Type D (Δ)** | Lines 686–780 | Παρεμβολή Newton σε ισαπέχοντα σημεία + σφάλμα + Simpson (Θέμα 2.1) | *None* (`<div class="qa-card">`) | `id="recipe-type-d"` |

### 1.2 Identified Deficiencies & Pedagogical Gaps
1. **Missing Incoming Anchor Targets**:
   - In `index.html`, lines 421, 644, 989, and 1022 contain direct anchor hyperlinks:
     - Line 644: `<a href="exam_prep.html#recipe-type-a">Exam Prep Type A &rarr;</a>`
     - Line 989: `<a href="exam_prep.html#recipe-type-b">Exam Prep Type B &rarr;</a>`
     - Line 421: `<a href="exam_prep.html#recipe-type-c">Exam Prep Type C &rarr;</a>`
     - Line 1022: `<a href="exam_prep.html#recipe-type-d">Exam Prep Type D &rarr;</a>`
   - In `exam_prep.html`, none of these anchor IDs currently exist on the card elements. Clicking these links fails to jump to the intended card.
2. **TeX Syntax Errors & HTML Entity Corruption in Math Mode**:
   - **Line 538**: `$A = \begin{bmatrix}1&amp;1&amp;2\\-1&amp;1&amp;0\\2&amp;-2&amp;4\end{bmatrix}$` — contains `&amp;` inside TeX math environment instead of raw `&` column delimiters.
   - **Line 600**: `$$A^{-1} = \begin{bmatrix} 1/2 &amp; -1 &amp; -1/4 \\ 1/2 &amp; 0 &amp; -1/4 \\ 0 &amp; 1/2 &amp; 1/4 \end{bmatrix}$$` — contains `&amp;` inside TeX math environment.
   - **Lines 501, 503**: `$$|1 + 2\lambda\sqrt{3}| &lt; 1 \;\Longrightarrow\; -1 &lt; 1 + 2\lambda\sqrt{3} &lt; 1$$` — contains `&lt;` in display math mode instead of `<` or `\lt`.
   - **Line 505**: `$\varepsilon &gt; 0$` and `$|x_0 - \xi| &lt; \varepsilon$` — contains `&gt;` and `&lt;` in inline math.
3. **Missing Intermediate Arithmetic & Jump-to-Solution Omissions**:
   - **Type A**: Steps jump directly from $|1 + 2\lambda\sqrt{3}| < 1$ to $-\frac{1}{\sqrt{3}} < \lambda < 0$ without showing the step-by-step subtraction of 1, division by $2\sqrt{3}$, or rationalization of denominators ($-\frac{\sqrt{3}}{3} < \lambda < 0$).
   - **Type B**: Line 560 writes row operations in cryptic shorthand (`R2 + ½R1 · R3 − ½R1`). Multipliers $m_{21} = -1/2, m_{31} = 1/2$ are never explicitly defined. The element-by-element scratch calculations for the right-hand identity matrix $[I]$ are completely omitted. Step 3 jumps directly from column 2 swap to the final diagonalized form without showing the two successive row eliminations ($R_1 + R_2$, then $R_1 - 2R_3$).
   - **Type C**: The explanation for why $A^{-1}b$ costs $n^2 \approx 0$ is informal and not presented as an accounting line item. The algebraic distribution $A(A^{-1} + BC^{-1})x = b \iff (I + ABC^{-1})x = b$ lacks visual breakdown.
   - **Type D**: The title in line 690 mislabels the problem as "σε ισαπέχοντα σημεία" (in equidistant points), whereas the data nodes $[-2, -1, 1, 3]$ are strictly non-equidistant. Step (α)(ii) does not display the complete 4-row difference table. The exact integration of $\int_{-1}^3 (x^3+5)dx$ omits the fraction arithmetic showing how $141/4 - (-19/4) = 160/4 = 40$.
4. **Absence of Standardized Recognition Recipes & Student Trap Callouts**:
   - None of the 4 types have a dedicated "🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ" (When you see X, do 1-2-3) card at the top.
   - Student trap warnings are scattered in standard paragraphs or small callouts rather than high-contrast, structured `.student-trap` warnings.

---

## 2. Logic Chain

1. **Student Persona & Pedagogical Goal (R3 of ORIGINAL_REQUEST.md)**:
   - The user is a university student aiming for a 5–6/10 pass within a 5–6 day sprint.
   - In oral exam debriefs and past papers, students lose 10–15 marks on these 4 question types due to arithmetic sign flips (e.g. dividing by negative in $|g'| < 1$, subtracting a negative row multiplier $R_i - (-m)R_k$) and not knowing the step-by-step algorithm recipe.
2. **Anchor Consistency**:
   - `index.html` already directs students to `exam_prep.html#recipe-type-a`, `#recipe-type-b`, `#recipe-type-c`, and `#recipe-type-d`.
   - Injecting these exact IDs on the card wrappers `<div class="qa-card" id="recipe-type-a">` guarantees instant navigation from the sprint roadmap.
3. **TeX Integrity**:
   - MathJax parses `&` as the column separator in LaTeX `bmatrix` and `array`. When `&amp;` is present, MathJax fails to parse the matrix alignment, causing either a fatal rendering error or raw LaTeX displayed as text.
   - Replacing `&amp;` with `&` and `&lt;` / `&gt;` with `<` / `>` inside TeX math mode restores clean, native MathJax rendering across all browsers.
4. **Intermediate Calculation Unfolding**:
   - Step-by-step arithmetic scaffolding eliminates mental leaps:
     - For Type A: Writing out each stage of the double inequality guarantees students remember that dividing by a positive leaves signs unchanged, while dividing by a negative flips them.
     - For Type B: Showing the full 6-element row vectors for both $A$ and $I$ demonstrates that row operations apply across the entire augmented matrix.
     - For Type C: Using a structured accounting table ensures students understand why $A^{-1}b$ is $n^2$ and negligible.
     - For Type D: Showing the node distance check $\Delta x_i$ first prevents students from erroneously applying forward differences.

---

## 3. Caveats

1. **Read-Only Investigation**:
   - Adhering strictly to explorer boundaries, this report does not alter `exam_prep.html` or `styles/components.css`. Complete, drop-in replacement snippets are provided below for the Worker.
2. **Coordination with Peer Explorers**:
   - **M3 Explorer 2** handles Question Types E, F, G, and H.
   - **M3 Explorer 3** designs the CSS classes (`.student-trap`, `.recognition-formula`, `.step-by-step-calc`) and patches `js/flashcards.js`.
   - The markup below is designed to be fully compatible with both the new component classes and existing fallback styles (`.step-box`, `.wbox`, `.rbox`, `.gbox`, `.tip`).

---

## 4. Conclusion: Detailed Specifications & Worker Blueprints

Below are the complete, ready-to-paste HTML/TeX code snippets for Question Types A, B, C, and D in `exam_prep.html`.

### 4.1 Type A Blueprint (Fixed-Point with Parameter $\lambda$)
- **Target File**: `exam_prep.html`
- **Target Location**: Replace lines 483–529 (the entire block from `<!-- ===== ΤΥΠΟΣ Α ===== -->` to end of `<div class="qa-card">`).
- **Anchor ID**: `id="recipe-type-a"`

```html
  <!-- ===== ΤΥΠΟΣ Α ===== -->
  <div class="qa-card" id="recipe-type-a">
    <div class="qa-q">
      <span class="qno">Α.</span>
      <span>Σταθερό σημείο με παράμετρο: εύρος σύγκλισης και τετραγωνική σύγκλιση <span class="exam-badge">Θέμα 1.1 · 10–12 Μόρια</span></span>
    </div>
    <div class="qa-a">

      <!-- 🔍 RECOGNITION RECIPE BOX -->
      <div class="recognition-formula" style="background:linear-gradient(135deg,rgba(57,212,200,0.08),rgba(57,212,200,0.02));border:1px solid rgba(57,212,200,0.35);border-radius:10px;padding:16px 20px;margin-bottom:20px;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:var(--cyan);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">
          🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ (ΣΥΝΤΑΓΗ SOS)
        </div>
        <p style="margin:0 0 8px;font-size:0.92rem;color:var(--txt);">
          <strong>Όταν δεις στην εκφώνηση:</strong> <em>«Δίνεται η επαναληπτική μέθοδος $x_{n+1} = x_n + \lambda \phi(x_n)$ για τη ρίζα $\xi$... (α) Βρείτε διάστημα τιμών του $\lambda$ ώστε να συγκλίνει, (β) Βρείτε $\lambda$ ώστε η τάξη σύγκλισης να είναι τουλάχιστον τετραγωνική ($p \ge 2$)»</em>.
        </p>
        <div style="font-size:0.88rem;line-height:1.75;color:var(--txt);">
          <strong>Ακολούθησε πιστά τα 3 βήματα:</strong>
          <ol style="margin:4px 0 0;padding-left:1.3rem;">
            <li><strong>Βήμα 1 (Η συνάρτηση $g$):</strong> Γράψε $g(x) = x + \lambda\phi(x)$ και υπολόγισε την πρώτη παράγωγο $g'(x) = 1 + \lambda\phi'(x)$.</li>
            <li><strong>Βήμα 2 (Σύγκλιση):</strong> Απαίτησε $|g'(\xi)| < 1 \iff -1 < g'(\xi) < 1$. Λύσε τη διπλή ανίσωση ως προς $\lambda$ με προσοχή στα πρόσημα!</li>
            <li><strong>Βήμα 3 (Τετραγωνική τάξη):</strong> Απαίτησε $g'(\xi) = 0$. Λύσε ως προς $\lambda^*$, επαλήθευσε ότι $g''(\xi) \ne 0$ (ακριβώς τάξη 2), και έλεγξε ότι το $\lambda^*$ ανήκει στο διάστημα του Βήματος 2.</li>
          </ol>
        </div>
      </div>

      <p style="color:var(--muted);font-size:0.95rem;margin-bottom:16px;">
        <em><strong>Πρότυπη Εκφώνηση Εξετάσεων:</strong> Δίνεται η επαναληπτική μέθοδος $x_{n+1} = x_n + \lambda(x_n^2 - 3)$ για τον υπολογισμό της θετικής ρίζας $\xi = \sqrt{3}$ της $f(x) = x^2 - 3 = 0$.
        <br>(α) Βρείτε το διάστημα τιμών της παραμέτρου $\lambda \in \mathbb{R}$ ώστε η μέθοδος να συγκλίνει τοπικά στη ρίζα.
        <br>(β) Βρείτε την τιμή του $\lambda$ για την οποία η μέθοδος συγκλίνει τουλάχιστον τετραγωνικά.</em>
      </p>

      <div class="qa-layout">
        <div class="qa-main-ans">

          <!-- STEP 1 -->
          <div class="step-box">
            <div class="step-title">Βήμα 1 — Ταυτοποίηση της $g(x)$ & Παραγώγιση</div>
            <p style="margin:0 0 8px;font-size:0.9rem;">
              Η αναδρομική σχέση είναι της μορφής $x_{n+1} = g(x_n)$. Επομένως η συνάρτηση επανάληψης σταθερού σημείου είναι:
            </p>
            $$g(x) = x + \lambda(x^2 - 3)$$
            <p style="margin:8px 0 0;font-size:0.9rem;">
              Παραγωγίζουμε ως προς $x$ εφαρμόζοντας τον κανόνα παραγώγισης αθροίσματος και δύναμης:
            </p>
            $$g'(x) = \frac{d}{dx}\big[x + \lambda(x^2 - 3)\big] = 1 + \lambda(2x) = 1 + 2\lambda x$$
          </div>

          <!-- STEP 2 -->
          <div class="step-box">
            <div class="step-title">Βήμα 2 (α) — Συνθήκη Τοπικής Σύγκλισης $|g'(\xi)| < 1$</div>
            <p style="margin:0 0 8px;font-size:0.9rem;">
              Αντικαθιστούμε τη θετική ρίζα $\xi = \sqrt{3}$ στην παράγωγο $g'(x)$:
            </p>
            $$g'(\sqrt{3}) = 1 + 2\lambda\sqrt{3}$$
            <p style="margin:8px 0 4px;font-size:0.9rem;">
              Για να συγκλίνει τοπικά η μέθοδος σταθερού σημείου, απαιτούμε:
            </p>
            $$|g'(\xi)| < 1 \iff |1 + 2\sqrt{3}\lambda| < 1$$
            <p style="margin:8px 0 4px;font-size:0.9rem;">
              Αναπτύσσουμε πλήρως τη διπλή ανίσωση απολύτου τιμής:
            </p>
            $$-1 < 1 + 2\sqrt{3}\lambda < 1$$
            <p style="margin:6px 0 0;font-size:0.9rem;color:var(--muted);">
              • Αφαιρούμε το $1$ από όλα τα μέλη:
            </p>
            $$-1 - 1 < 2\sqrt{3}\lambda < 1 - 1 \implies -2 < 2\sqrt{3}\lambda < 0$$
            <p style="margin:6px 0 0;font-size:0.9rem;color:var(--muted);">
              • Διαιρούμε με το $2\sqrt{3} > 0$ (το πρόσημο είναι θετικό, άρα η φορά της ανίσωσης παραμένει αναλλοίωτη):
            </p>
            $$\frac{-2}{2\sqrt{3}} < \lambda < \frac{0}{2\sqrt{3}} \implies -\frac{1}{\sqrt{3}} < \lambda < 0$$
            <p style="margin:6px 0 4px;font-size:0.9rem;">
              Ρητοποιώντας τον παρονομαστή (πολλαπλασιασμός με $\sqrt{3}/\sqrt{3}$):
            </p>
            $$\boxed{-\frac{\sqrt{3}}{3} < \lambda < 0 \quad \text{ή} \quad \lambda \in \left(-\frac{1}{\sqrt{3}}, 0\right)}$$
            <div style="background:rgba(63,185,80,0.06);border-left:3px solid var(--green);padding:10px 14px;border-radius:4px;margin-top:10px;font-size:0.88rem;">
              <strong>Τυπική Θεωρητική Αιτιολόγηση για πλήρη μόρια:</strong> Σύμφωνα με το <em>Θεώρημα Τοπικής Σύγκλισης Σταθερού Σημείου</em>, επειδή η $g \in C^1$ και $|g'(\xi)| < 1$, υπάρχει περιοχή $I_\delta = [\xi - \delta, \xi + \delta]$ ($\delta > 0$) τέτοια ώστε για κάθε αρχική τιμή $x_0 \in I_\delta$, η επαναληπτική ακολουθία συγκλίνει στη ρίζα $\xi = \sqrt{3}$.
            </div>
          </div>

          <!-- STEP 3 -->
          <div class="step-box">
            <div class="step-title">Βήμα 3 (β) — Συνθήκη Τετραγωνικής Σύγκλισης ($g'(\xi) = 0$)</div>
            <p style="margin:0 0 8px;font-size:0.9rem;">
              Για να είναι η σύγκλιση τουλάχιστον τετραγωνική ($p \ge 2$), πρέπει ο γραμμικός συντελεστής σφάλματος να μηδενίζεται: $g'(\xi) = 0$.
            </p>
            $$g'(\sqrt{3}) = 0 \iff 1 + 2\sqrt{3}\lambda = 0 \iff 2\sqrt{3}\lambda = -1 \implies \boxed{\lambda^* = -\frac{1}{2\sqrt{3}} = -\frac{\sqrt{3}}{6}}$$
            <p style="margin:10px 0 4px;font-size:0.9rem;font-weight:700;color:var(--cyan);">
              Υποχρεωτικοί Έλεγχοι Επαλήθευσης:
            </p>
            <ul style="margin:0;padding-left:1.3rem;font-size:0.88rem;line-height:1.75;">
              <li><strong>Έλεγχος διαστήματος:</strong> Το $\lambda^* = -\frac{1}{2\sqrt{3}} \approx -0.2887$ ανήκει πράγματι στο διάστημα σύγκλισης $\left(-\frac{1}{\sqrt{3}}, 0\right) \approx (-0.5774, 0)$ ✅.</li>
              <li><strong>Έλεγχος 2ης παραγώγου (τάξη $p=2$ ακριβώς):</strong> Υπολογίζουμε $g''(x) = \frac{d}{dx}(1 + 2\lambda x) = 2\lambda$. Για το βέλτιστο $\lambda^*$:
                $$g''(\sqrt{3}) = 2\left(-\frac{\sqrt{3}}{6}\right) = -\frac{\sqrt{3}}{3} \ne 0$$
                Επειδή $g'(\xi) = 0$ και $g''(\xi) \ne 0$, από το ανάπτυγμα Taylor η τάξη σύγκλισης είναι <strong>ακριβώς $p=2$</strong> (τετραγωνική) ✅.
              </li>
            </ul>
          </div>

        </div>

        <div class="qa-side-notes">
          <div class="side-notes-header">💡 Διαίσθηση & Σύνδεση με Newton-Raphson</div>
          <p>
            <strong>Γιατί βγαίνει $\lambda^* = -\frac{1}{2\sqrt{3}}$;</strong>
            <br>Η κλασική μέθοδος Newton-Raphson είναι:
            $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^2 - 3}{2x_n}$$
            Κοντά στη ρίζα $\xi = \sqrt{3}$, ο συντελεστής μπροστά από το $(x_n^2 - 3)$ είναι $-\frac{1}{2\xi} = -\frac{1}{2\sqrt{3}}$.
            Δηλαδή η μέθοδος του θέματος είναι η Newton-Raphson με «παγωμένη» την παράγωγο στη ρίζα!
          </p>

          <!-- STUDENT TRAP 1 -->
          <div class="student-trap" style="background:linear-gradient(135deg,rgba(248,81,73,0.12),rgba(248,81,73,0.03));border:1px solid rgba(248,81,73,0.4);border-radius:8px;padding:12px 14px;margin:12px 0;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px;">
              ⚠️ ΠΑΓΙΔΑ ΦΟΙΤΗΤΗ #1: ΑΡΝΗΤΙΚΗ ΡΙΖΑ
            </div>
            <p style="margin:0;font-size:0.84rem;line-height:1.6;color:var(--txt);">
              Αν η εκφώνηση ζητούσε τη ρίζα $\xi = -\sqrt{3}$ (όπως στα θέματα Ιουνίου), τότε $g'(-\sqrt{3}) = 1 - 2\sqrt{3}\lambda$.
              Η ανίσωση γίνεται $-2 < -2\sqrt{3}\lambda < 0$.
              <strong>ΠΡΟΣΟΧΗ:</strong> Διαιρώντας με το αρνητικό $-2\sqrt{3}$, <em>η φορά της ανίσωσης αντιστρέφεται</em>:
              $$\frac{-2}{-2\sqrt{3}} > \lambda > 0 \implies 0 < \lambda < \frac{1}{\sqrt{3}}$$
              Αν ξεχάσεις να αλλάξεις φορά, χάνεις 6 μονάδες!
            </p>
          </div>

          <!-- STUDENT TRAP 2 -->
          <div class="student-trap" style="background:linear-gradient(135deg,rgba(248,81,73,0.12),rgba(248,81,73,0.03));border:1px solid rgba(248,81,73,0.4);border-radius:8px;padding:12px 14px;margin:12px 0;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px;">
              ⚠️ ΠΑΓΙΔΑ ΦΟΙΤΗΤΗ #2: ΤΟ $\lambda = 0$
            </div>
            <p style="margin:0;font-size:0.84rem;line-height:1.6;color:var(--txt);">
              Το διάστημα είναι αυστηρά ανοικτό: $\lambda \ne 0$. Για $\lambda = 0$, η αναδρομή γίνεται $x_{n+1} = x_n$, δηλαδή η μέθοδος «παγώνει» στο αρχικό σημείο $x_0$ και δεν συγκλίνει ποτέ!
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
```

---

### 4.2 Type B Blueprint (Jordan Inverse with Partial Pivoting)
- **Target File**: `exam_prep.html`
- **Target Location**: Replace lines 530–615 (the entire block from `<!-- ===== ΤΥΠΟΣ Β ===== -->` to end of `<div class="qa-card">`).
- **Anchor ID**: `id="recipe-type-b"`

```html
  <!-- ===== ΤΥΠΟΣ Β ===== -->
  <div class="qa-card" id="recipe-type-b">
    <div class="qa-q">
      <span class="qno">Β.</span>
      <span>Αντίστροφος πίνακα με Jordan + μερική οδήγηση <span class="exam-badge">Θέμα 1.2 · 12–14 Μόρια</span></span>
    </div>
    <div class="qa-a">

      <!-- 🔍 RECOGNITION RECIPE BOX -->
      <div class="recognition-formula" style="background:linear-gradient(135deg,rgba(57,212,200,0.08),rgba(57,212,200,0.02));border:1px solid rgba(57,212,200,0.35);border-radius:10px;padding:16px 20px;margin-bottom:20px;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:var(--cyan);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">
          🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ (ΣΥΝΤΑΓΗ SOS)
        </div>
        <p style="margin:0 0 8px;font-size:0.92rem;color:var(--txt);">
          <strong>Όταν δεις στην εκφώνηση:</strong> <em>«Να υπολογιστεί ο $A^{-1}$ με τη μέθοδο απαλοιφής του Jordan με μερική οδήγηση (partial pivoting). Ποια η πολυπλοκότητα του υπολογισμού του $A^{-1}$ για $A \in \mathbb{R}^{n \times n}$;»</em>
        </p>
        <div style="font-size:0.88rem;line-height:1.75;color:var(--txt);">
          <strong>Ακολούθησε πιστά τα 4 βήματα:</strong>
          <ol style="margin:4px 0 0;padding-left:1.3rem;">
            <li><strong>Βήμα 0:</strong> Σχημάτισε τον επαυξημένο πίνακα $[A \mid I_n]$ διαστάσεων $n \times 2n$.</li>
            <li><strong>Σε κάθε στήλη $k$ ($k=1 \dots n$):</strong>
              <br>• <em>Μερική οδήγηση:</em> Βρες το μέγιστο $|a_{ik}|$ για $i \ge k$ (στη στήλη $k$, από τη διαγώνιο και κάτω). Αν χρειάζεται, αντάλλαξε <strong>ολόκληρη</strong> τη γραμμή $k$ με τη γραμμή του μέγιστου (ΚΑΙ στο δεξιό μπλοκ του $I$!).
              <br>• <em>Μηδενισμός στήλης:</em> Υπολόγισε $m_{ik} = \frac{a_{ik}}{a_{kk}}$ για όλες τις άλλες γραμμές $i \ne k$ (άνω και κάτω!) και εκτέλεσε $R_i \leftarrow R_i - m_{ik}R_k$.
            </li>
            <li><strong>Κανονικοποίηση:</strong> Διαίρεσε κάθε γραμμή με το διαγώνιο στοιχείο της $a_{ii}$ ώστε το αριστερό μέρος να γίνει $I$. Το δεξιό μέρος είναι ο $A^{-1}$.</li>
            <li><strong>Επαλήθευση & Πολυπλοκότητα:</strong> Κάνε έλεγχο 10 δευτερολέπτων (γραμμή 1 του $A \times$ στήλη 1 του $A^{-1} = 1$). Γράψε την πολυπλοκότητα: $\frac{3}{2}n^3$ πράξεις.</li>
          </ol>
        </div>
      </div>

      <p style="color:var(--muted);font-size:0.95rem;margin-bottom:16px;">
        <em><strong>Πρότυπη Εκφώνηση Εξετάσεων:</strong> Να βρεθεί ο $A^{-1}$ με τη μέθοδο απαλοιφής του Jordan με μερική οδήγηση, όπου
        $$A = \begin{bmatrix} 1 & 1 & 2 \\ -1 & 1 & 0 \\ 2 & -2 & 4 \end{bmatrix}$$
        Ποια η πολυπλοκότητα του υπολογισμού του $A^{-1}$ για $A \in \mathbb{R}^{n\times n}$;</em>
      </p>

      <!-- STEP 0 -->
      <div class="step-box">
        <div class="step-title">Βήμα 0 — Κατασκευή Επαυξημένου Πίνακα $[A \mid I_3]$</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          Κολλάμε τον ταυτοτικό πίνακα $I_3$ στα δεξιά του $A$. Κάθε πράξη γραμμών θα εφαρμόζεται <strong>και στις 6 στήλες</strong>:
        </p>
        $$\left[\begin{array}{ccc|ccc}
          1 & 1 & 2 & 1 & 0 & 0 \\
          -1 & 1 & 0 & 0 & 1 & 0 \\
          2 & -2 & 4 & 0 & 0 & 1
        \end{array}\right]$$
      </div>

      <!-- STEP 1 -->
      <div class="step-box">
        <div class="step-title">Βήμα 1 — Στήλη 1: Μερική Οδήγηση & Μηδενισμός Κάτω από τη Διαγώνιο</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          <strong>Αναζήτηση Οδηγού στη Στήλη 1:</strong> Εξετάζουμε τα στοιχεία $|a_{11}| = 1$, $|a_{21}| = |-1| = 1$, $|a_{31}| = |2| = 2$.
          <br>Το μέγιστο είναι το $2$ στη Γραμμή 3. Αντιμεταθέτουμε τις γραμμές <strong>$R_1 \longleftrightarrow R_3$</strong> (σε όλο το πλάτος!):
        </p>
        $$\left[\begin{array}{ccc|ccc}
          \mathbf{2} & \mathbf{-2} & \mathbf{4} & \mathbf{0} & \mathbf{0} & \mathbf{1} \\
          -1 & 1 & 0 & 0 & 1 & 0 \\
          \mathbf{1} & \mathbf{1} & \mathbf{2} & \mathbf{1} & \mathbf{0} & \mathbf{0}
        \end{array}\right]$$

        <div style="background:var(--surf);border-left:3px solid var(--yellow);padding:10px 14px;border-radius:4px;margin:12px 0;font-size:0.88rem;">
          <strong>Αναλυτικοί Υπολογισμοί Πολλαπλασιαστών & Γραμμοπράξεων Στήλης 1:</strong>
          <ul style="margin:6px 0 0;padding-left:1.2rem;line-height:1.75;">
            <li><strong>Για τη Γραμμή 2:</strong> $m_{21} = \frac{a_{21}}{a_{11}} = \frac{-1}{2} = -\frac{1}{2}$.
              <br>Γραμμοπράξη: $R_2 \leftarrow R_2 - \left(-\frac{1}{2}\right)R_1 = R_2 + \frac{1}{2}R_1$.
              <br><em>Πράξεις στοιχείο-προς-στοιχείο:</em>
              <br>• $a_{21}: -1 + \frac{1}{2}(2) = 0$
              <br>• $a_{22}: 1 + \frac{1}{2}(-2) = 1 - 1 = 0$
              <br>• $a_{23}: 0 + \frac{1}{2}(4) = 2$
              <br>• Δεξιό μέρος: $\left[0 + \frac{1}{2}(0),\; 1 + \frac{1}{2}(0),\; 0 + \frac{1}{2}(1)\right] = \left[0,\; 1,\; \frac{1}{2}\right]$
              <br>$\implies R_2 = [0,\; 0,\; 2 \mid 0,\; 1,\; 1/2]$.
            </li>
            <li><strong>Για τη Γραμμή 3:</strong> $m_{31} = \frac{a_{31}}{a_{11}} = \frac{1}{2}$.
              <br>Γραμμοπράξη: $R_3 \leftarrow R_3 - \frac{1}{2}R_1$.
              <br><em>Πράξεις στοιχείο-προς-στοιχείο:</em>
              <br>• $a_{31}: 1 - \frac{1}{2}(2) = 0$
              <br>• $a_{32}: 1 - \frac{1}{2}(-2) = 1 + 1 = 2$
              <br>• $a_{33}: 2 - \frac{1}{2}(4) = 2 - 2 = 0$
              <br>• Δεξιό μέρος: $\left[1 - \frac{1}{2}(0),\; 0 - \frac{1}{2}(0),\; 0 - \frac{1}{2}(1)\right] = \left[1,\; 0,\; -\frac{1}{2}\right]$
              <br>$\implies R_3 = [0,\; 2,\; 0 \mid 1,\; 0,\; -1/2]$.
            </li>
          </ul>
        </div>

        <p style="margin:8px 0 4px;font-size:0.9rem;">Μορφή πίνακα μετά το Βήμα 1:</p>
        $$\left[\begin{array}{ccc|ccc}
          2 & -2 & 4 & 0 & 0 & 1 \\
          0 & 0 & 2 & 0 & 1 & 1/2 \\
          0 & 2 & 0 & 1 & 0 & -1/2
        \end{array}\right]$$
      </div>

      <!-- STEP 2 -->
      <div class="step-box">
        <div class="step-title">Βήμα 2 — Στήλη 2: Μερική Οδήγηση (Σωτήρια Εναλλαγή!) & Απαλοιφή</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          <strong>Αναζήτηση Οδηγού στη Στήλη 2 (από τη γραμμή 2 και κάτω):</strong>
          <br>Εξετάζουμε $|a_{22}| = 0$ και $|a_{32}| = 2$.
          <br>Επειδή $|a_{32}| = 2 > 0 = |a_{22}|$, <strong>επιβάλλεται εναλλαγή $R_2 \longleftrightarrow R_3$</strong>:
        </p>
        $$\left[\begin{array}{ccc|ccc}
          2 & -2 & 4 & 0 & 0 & 1 \\
          \mathbf{0} & \mathbf{2} & \mathbf{0} & \mathbf{1} & \mathbf{0} & \mathbf{-1/2} \\
          \mathbf{0} & \mathbf{0} & \mathbf{2} & \mathbf{0} & \mathbf{1} & \mathbf{1/2}
        \end{array}\right]$$

        <div class="student-trap" style="background:linear-gradient(135deg,rgba(227,179,65,0.12),rgba(227,179,65,0.03));border:1px solid rgba(227,179,65,0.4);border-radius:6px;padding:10px 14px;margin:10px 0;font-size:0.86rem;">
          <strong>💡 Γιατί η οδήγηση είναι υποχρεωτική:</strong> Χωρίς την εναλλαγή $R_2 \leftrightarrow R_3$, ο οδηγός $a_{22}$ ήταν ακριβώς <strong>0</strong>. Η απαλοιφή θα απαιτούσε διαίρεση με το μηδέν και ο αλγόριθμος θα κατέρρεε!
        </div>

        <p style="margin:10px 0 4px;font-size:0.9rem;">
          <strong>Απαλοιφή στη Στήλη 2 (Μέθοδος Jordan — μηδενίζουμε και ΠΑΝΩ από τη διαγώνιο):</strong>
          <br>Ο οδηγός είναι τώρα το $a_{22} = 2$. Θέλουμε να μηδενίσουμε το $a_{12} = -2$:
          <br>• Πολλαπλασιαστής: $m_{12} = \frac{a_{12}}{a_{22}} = \frac{-2}{2} = -1$.
          <br>• Γραμμοπράξη: $R_1 \leftarrow R_1 - (-1)R_2 = R_1 + R_2$.
        </p>
        <p style="margin:4px 0;font-size:0.88rem;color:var(--muted);">
          <em>Πράξεις:</em> $[2,-2,4 \mid 0,0,1] + [0,2,0 \mid 1,0,-1/2] = [2+0,\; -2+2,\; 4+0 \mid 0+1,\; 0+0,\; 1-1/2] = [2, 0, 4 \mid 1, 0, 1/2]$.
        </p>
        $$\left[\begin{array}{ccc|ccc}
          2 & 0 & 4 & 1 & 0 & 1/2 \\
          0 & 2 & 0 & 1 & 0 & -1/2 \\
          0 & 0 & 2 & 0 & 1 & 1/2
        \end{array}\right]$$
      </div>

      <!-- STEP 3 -->
      <div class="step-box">
        <div class="step-title">Βήμα 3 — Στήλη 3: Απαλοιφή Πάνω από τη Διαγώνιο</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          Ο οδηγός είναι το $a_{33} = 2$.
          <br>Στη γραμμή 2, το στοιχείο $a_{23}$ είναι ήδη $0$ (δεν απαιτείται πράξη).
          <br>Στη γραμμή 1, θέλουμε να μηδενίσουμε το $a_{13} = 4$:
          <br>• Πολλαπλασιαστής: $m_{13} = \frac{a_{13}}{a_{33}} = \frac{4}{2} = 2$.
          <br>• Γραμμοπράξη: $R_1 \leftarrow R_1 - 2R_3$.
        </p>
        <p style="margin:4px 0;font-size:0.88rem;color:var(--muted);">
          <em>Πράξεις:</em> $[2, 0, 4 \mid 1, 0, 1/2] - 2 \cdot [0, 0, 2 \mid 0, 1, 1/2] = [2-0,\; 0-0,\; 4-4 \mid 1-0,\; 0-2,\; 1/2 - 1] = [2, 0, 0 \mid 1, -2, -1/2]$.
        </p>
        $$\left[\begin{array}{ccc|ccc}
          2 & 0 & 0 & 1 & -2 & -1/2 \\
          0 & 2 & 0 & 1 & 0 & -1/2 \\
          0 & 0 & 2 & 0 & 1 & 1/2
        \end{array}\right]$$
      </div>

      <!-- STEP 4 -->
      <div class="step-box">
        <div class="step-title">Βήμα 4 — Κανονικοποίηση Διαγωνίου & Ανάγνωση του $A^{-1}$</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          Διαιρούμε κάθε γραμμή με το αντίστοιχο διαγώνιο στοιχείο της ($R_1/2,\; R_2/2,\; R_3/2$) ώστε το αριστερό μπλοκ να γίνει ο ταυτοτικός $I_3$:
        </p>
        $$\left[\begin{array}{ccc|ccc}
          1 & 0 & 0 & 1/2 & -1 & -1/4 \\
          0 & 1 & 0 & 1/2 & 0 & -1/4 \\
          0 & 0 & 1 & 0 & 1/2 & 1/4
        \end{array}\right]$$
        <p style="margin:10px 0 4px;font-size:0.95rem;">
          Το δεξιό μπλοκ είναι ο ζητούμενος αντίστροφος:
        </p>
        $$\boxed{A^{-1} = \begin{bmatrix} 1/2 & -1 & -1/4 \\ 1/2 & 0 & -1/4 \\ 0 & 1/2 & 1/4 \end{bmatrix}}$$

        <div style="background:rgba(63,185,80,0.08);border-left:3px solid var(--green);padding:10px 14px;border-radius:4px;margin-top:12px;font-size:0.88rem;">
          <strong>Έλεγχος 10 Δευτερολέπτων στο Πρόχειρο:</strong>
          <br>Πολλαπλασιάζουμε την 1η γραμμή του $A$ με την 1η στήλη του $A^{-1}$:
          $$[1, 1, 2] \cdot \begin{bmatrix} 1/2 \\ 1/2 \\ 0 \end{bmatrix} = 1\left(\frac{1}{2}\right) + 1\left(\frac{1}{2}\right) + 2(0) = \frac{1}{2} + \frac{1}{2} = 1 \quad \text{✅}$$
        </div>
      </div>

      <!-- PART B: COMPLEXITY -->
      <div class="gbox" style="margin-top:16px;">
        <div class="lbl" style="color:var(--green)">✅ Το (β) σκέλος — Υπολογιστική Πολυπλοκότητα</div>
        <p style="margin:0 0 6px;font-size:0.92rem;">
          Ο υπολογισμός του αντιστρόφου $A^{-1}$ για $A \in \mathbb{R}^{n\times n}$ με τη μέθοδο απαλοιφής Gauss-Jordan απαιτεί:
        </p>
        $$\boxed{\text{Πολυπλοκότητα Jordan}(A^{-1}) = \frac{3}{2}n^3 + O(n^2) \quad \text{πράξεις}}$$
        <p style="margin:6px 0 0;font-size:0.86rem;color:var(--muted);">
          <em>Σύγκριση με Gauss:</em> Με μέθοδο Gauss (τριγωνοποίηση $\frac{1}{3}n^3$ και επίλυση $n$ συστημάτων με $n \times n^2 = n^3$), το κόστος είναι $\frac{4}{3}n^3$. Η μέθοδος Jordan είναι ελαφρώς πιο ακριβή για τον αντίστροφο ($\frac{3}{2}n^3 = 1.5n^3$ έναντι $\frac{4}{3}n^3 \approx 1.33n^3$), αλλά δεν απαιτεί πίσω αντικατάσταση.
        </p>
      </div>

      <!-- STUDENT TRAPS FOR TYPE B -->
      <div class="student-trap" style="background:linear-gradient(135deg,rgba(248,81,73,0.12),rgba(248,81,73,0.03));border:1px solid rgba(248,81,73,0.4);border-radius:8px;padding:12px 16px;margin-top:16px;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:6px;">
          🚨 SOS ΠΑΓΙΔΕΣ ΦΟΙΤΗΤΗ ΣΤΟ ΘΕΜΑ 1.2
        </div>
        <ul style="margin:0;padding-left:1.2rem;font-size:0.86rem;line-height:1.75;color:var(--txt);">
          <li><strong>Παγίδα Εναλλαγής του $I$:</strong> Στην $R_1 \leftrightarrow R_3$, πολλοί φοιτητές αλλάζουν μόνο το αριστερό μέρος $[A]$ και ξεχνούν να αντιμεταθέσουν τις γραμμές του ταυτοτικού $[I]$. Μηδενίζει όλο το θέμα!</li>
          <li><strong>Παγίδα Προσήμου Πολλαπλασιαστή:</strong> Ο τύπος είναι $R_i - m_{ik}R_k$. Όταν $a_{21} = -1$, τότε $m_{21} = -1/2$, άρα $R_2 - (-1/2)R_1 = R_2 + 1/2 R_1$. Μην μπερδεύεις τα πρόσημα!</li>
          <li><strong>Πεδίο Αναζήτησης Οδηγού:</strong> Στη στήλη $k$, ο μέγιστος αναζητείται <strong>αυστηρά από τη γραμμή $k$ και κάτω</strong>. Ποτέ σε προηγούμενες γραμμές και ποτέ σε διπλανές στήλες.</li>
        </ul>
      </div>

    </div>
  </div>
```

---

### 4.3 Type C Blueprint (Complexity Algebra & System Transformation)
- **Target File**: `exam_prep.html`
- **Target Location**: Replace lines 616–685 (the entire block from `<!-- ===== ΤΥΠΟΣ Γ ===== -->` to end of `<div class="qa-card">`).
- **Anchor ID**: `id="recipe-type-c"`

```html
  <!-- ===== ΤΥΠΟΣ Γ ===== -->
  <div class="qa-card" id="recipe-type-c">
    <div class="qa-q">
      <span class="qno">Γ.</span>
      <span>Πολυπλοκότητα &amp; μετασχηματισμός γραμμικού συστήματος <span class="exam-badge">Θέμα 1.3 · 11–16 Μόρια</span></span>
    </div>
    <div class="qa-a">

      <!-- 🔍 RECOGNITION RECIPE BOX -->
      <div class="recognition-formula" style="background:linear-gradient(135deg,rgba(57,212,200,0.08),rgba(57,212,200,0.02));border:1px solid rgba(57,212,200,0.35);border-radius:10px;padding:16px 20px;margin-bottom:20px;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:var(--cyan);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">
          🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ (ΣΥΝΤΑΓΗ SOS)
        </div>
        <p style="margin:0 0 8px;font-size:0.92rem;color:var(--txt);">
          <strong>Όταν δεις στην εκφώνηση:</strong> <em>«Δίνονται μη-ιδιάζοντες πίνακες $A, B, C \in \mathbb{R}^{n \times n}$ και το σύστημα $(A^{-1} + BC^{-1})x = A^{-1}b$. (α) Βρείτε την πολυπλοκότητα επίλυσης με απαλοιφή Gauss (ή Jordan), (β) Μετασχηματίστε το σύστημα ώστε να ελαχιστοποιηθούν οι πράξεις, (γ) Τι συμπέρασμα προκύπτει;»</em>
        </p>
        <div style="font-size:0.88rem;line-height:1.75;color:var(--txt);">
          <strong>Ακολούθησε πιστά τα 4 βήματα:</strong>
          <ol style="margin:4px 0 0;padding-left:1.3rem;">
            <li><strong>Βήμα 1 (Πίνακας SOS):</strong> Σχεδίασε τον πίνακα κόστους στο πρόχειρο: Επίλυση συστήματος $= n^3/3$ (Gauss) ή $n^3/2$ (Jordan), Αντίστροφος $= 4n^3/3$ (Gauss) ή $3n^3/2$ (Jordan), Γινόμενο πινάκων $= n^3$, Πίνακας $\times$ διάνυσμα $= n^2 \to \mathbf{0}$ (αμελητέο!).</li>
            <li><strong>Βήμα 2 (Χρέωση Αρχικής Μορφής):</strong> Χρέωσε κάθε όρο ξεχωριστά. <em>Κανόνας μη διπλοχρέωσης:</em> Το $A^{-1}b$ κοστίζει $n^2 \approx 0$ γιατί το $A^{-1}$ έχει ήδη υπολογιστεί στο αριστερό μέλος!</li>
            <li><strong>Βήμα 3 (Ο Μετασχηματισμός):</strong> Πολλαπλασίασε <strong>και τα δύο μέλη από αριστερά</strong> με τον πίνακα $A$ ώστε να εξαφανιστεί ο «ακριβός» αντίστροφος $A^{-1}$ ($A \cdot A^{-1} = I_n$). Προσοχή: Ποτέ από δεξιά λόγω μη-μεταθετικότητας ($AB \ne BA$).</li>
            <li><strong>Βήμα 4 (Νέα Χρέωση & Συμπέρασμα):</strong> Ξαναχρέωσε τη νέα μορφή, υπολόγισε τη διαφορά κέρδους $\Delta$, και διατύπωσε το συμπέρασμα εξοικονόμησης πόρων.</li>
          </ol>
        </div>
      </div>

      <p style="color:var(--muted);font-size:0.95rem;margin-bottom:16px;">
        <em><strong>Πρότυπη Εκφώνηση Εξετάσεων:</strong> Δίνονται $A, B, C \in \mathbb{R}^{n\times n}$ μη-ιδιάζοντες πίνακες, $b \in \mathbb{R}^n$ διάνυσμα, και το γραμμικό σύστημα $(A^{-1} + BC^{-1})x = A^{-1}b$.
        <br>(α) Βρείτε την υπολογιστική πολυπλοκότητα επίλυσης του συστήματος με τη μέθοδο απαλοιφής Gauss.
        <br>(β) Μετασχηματίστε το σύστημα κατάλληλα ώστε να επιτευχθεί η μέγιστη δυνατή μείωση πράξεων, και υπολογίστε τη νέα πολυπλοκότητα.
        <br>(γ) Ποιο γενικό συμπέρασμα εξάγεται;</em>
      </p>

      <div class="qa-layout">
        <div class="qa-main-ans">

          <!-- STEP A -->
          <div class="step-box">
            <div class="step-title">(α) Αναλυτική Χρέωση Αρχικής Μορφής $(A^{-1} + BC^{-1})x = A^{-1}b$ (Gauss)</div>
            <p style="margin:0 0 8px;font-size:0.9rem;">
              Αναλύουμε το υπολογιστικό κόστος ανά επιμέρους πράξη, κρατώντας μόνο τους κυρίαρχους όρους τάξης $n^3$:
            </p>

            <div class="tbl-scroll">
              <table class="vtbl" style="font-size:0.88rem;margin:8px 0;">
                <thead>
                  <tr><th>Όρος / Πράξη</th><th>Είδος Πράξης</th><th>Κόστος Gauss (σε $n^3$)</th><th>Αιτιολόγηση</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$A^{-1}$</td>
                    <td>Αντίστροφος $n \times n$</td>
                    <td style="color:var(--orange);font-weight:700;">$\frac{4}{3}n^3$</td>
                    <td>Υπολογίζεται 1 φορά για τον συντελεστή του $x$</td>
                  </tr>
                  <tr>
                    <td>$C^{-1}$</td>
                    <td>Αντίστροφος $n \times n$</td>
                    <td style="color:var(--orange);font-weight:700;">$\frac{4}{3}n^3$</td>
                    <td>Απαραίτητος για τον σχηματισμό του $BC^{-1}$</td>
                  </tr>
                  <tr>
                    <td>$B \cdot C^{-1}$</td>
                    <td>Γινόμενο πινάκων $n \times n$</td>
                    <td style="color:var(--cyan);font-weight:700;">$1n^3$</td>
                    <td>Πολλαπλασιασμός δύο γνωστών $n \times n$ πινάκων</td>
                  </tr>
                  <tr>
                    <td>$A^{-1} + BC^{-1}$</td>
                    <td>Πρόσθεση πινάκων $n \times n$</td>
                    <td style="color:var(--muted);font-weight:700;">$0$ ($n^2$)</td>
                    <td>Τάξης $O(n^2)$ $\implies$ ασυμπτωτικά αμελητέο</td>
                  </tr>
                  <tr>
                    <td>$A^{-1}b$</td>
                    <td>Πίνακας $\times$ Διάνυσμα</td>
                    <td style="color:var(--green);font-weight:700;">$0$ ($n^2$)</td>
                    <td><strong>ΜΗ ΔΙΠΛΟΧΡΕΩΣΗ:</strong> Ο $A^{-1}$ είναι ήδη υπολογισμένος, άρα είναι απλό γινόμενο $n^2$</td>
                  </tr>
                  <tr>
                    <td>Επίλυση $(M)x = d$</td>
                    <td>Επίλυση συστήματος</td>
                    <td style="color:var(--yellow);font-weight:700;">$\frac{1}{3}n^3$</td>
                    <td>Απαλοιφή Gauss και πίσω αντικατάσταση</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style="margin:8px 0 4px;font-size:0.9rem;">Άθροισμα κυρίαρχων όρων:</p>
            $$\text{Σύνολο Αρχικής Μορφής} = \frac{4}{3}n^3 + \frac{4}{3}n^3 + n^3 + \frac{1}{3}n^3 = \frac{4 + 4 + 3 + 1}{3}n^3 = \frac{12}{3}n^3 = \boxed{4n^3}$$
          </div>

          <!-- STEP B -->
          <div class="step-box">
            <div class="step-title">(β) Ο Βέλτιστος Μετασχηματισμός & Νέα Χρέωση</div>
            <p style="margin:0 0 8px;font-size:0.9rem;">
              <strong>Αλγεβρικός Μετασχηματισμός:</strong> Πολλαπλασιάζουμε <em>και τα δύο μέλη από αριστερά</em> με τον πίνακα $A$:
            </p>
            $$A \cdot \big(A^{-1} + BC^{-1}\big)x = A \cdot \big(A^{-1}b\big)$$
            $$\big(A A^{-1} + A B C^{-1}\big)x = (A A^{-1}) b$$
            $$\boxed{\big(I_n + A B C^{-1}\big)x = b}$$
            <p style="margin:8px 0;font-size:0.9rem;color:var(--green);">
              ✨ <strong>Το κέρδος:</strong> Ο αντίστροφος $A^{-1}$ εξαφανίστηκε πλήρως και από τα δύο μέλη! Το δεξί μέλος είναι πλέον το σκέτο $b$, με μηδενικό κόστος προετοιμασίας.
            </p>

            <div class="tbl-scroll">
              <table class="vtbl" style="font-size:0.88rem;margin:8px 0;">
                <thead>
                  <tr><th>Όρος / Πράξη</th><th>Είδος Πράξης</th><th>Κόστος Gauss (σε $n^3$)</th><th>Αιτιολόγηση</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$C^{-1}$</td>
                    <td>Αντίστροφος $n \times n$</td>
                    <td style="color:var(--orange);font-weight:700;">$\frac{4}{3}n^3$</td>
                    <td>Ο μόνος αντίστροφος που απομένει</td>
                  </tr>
                  <tr>
                    <td>$M_1 = A \cdot B$</td>
                    <td>Γινόμενο πινάκων $n \times n$</td>
                    <td style="color:var(--cyan);font-weight:700;">$1n^3$</td>
                    <td>Πρώτος πολλαπλασιασμός</td>
                  </tr>
                  <tr>
                    <td>$M_1 \cdot C^{-1}$</td>
                    <td>Γινόμενο πινάκων $n \times n$</td>
                    <td style="color:var(--cyan);font-weight:700;">$1n^3$</td>
                    <td>Δεύτερος πολλαπλασιασμός $(AB)C^{-1}$</td>
                  </tr>
                  <tr>
                    <td>$I_n + (AB)C^{-1}$</td>
                    <td>Πρόσθεση ταυτοτικού</td>
                    <td style="color:var(--muted);font-weight:700;">$0$ ($n$)</td>
                    <td>Προσθέτουμε 1 στα διαγώνια στοιχεία ($O(n)$) $\implies 0$</td>
                  </tr>
                  <tr>
                    <td>Δεξί μέλος $b$</td>
                    <td>Έτοιμο διάνυσμα</td>
                    <td style="color:var(--green);font-weight:700;">$0$</td>
                    <td>Δεν απαιτεί καμία πράξη</td>
                  </tr>
                  <tr>
                    <td>Επίλυση $(M)x = b$</td>
                    <td>Επίλυση συστήματος</td>
                    <td style="color:var(--yellow);font-weight:700;">$\frac{1}{3}n^3$</td>
                    <td>Απαλοιφή Gauss</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style="margin:8px 0 4px;font-size:0.9rem;">Άθροισμα νέων κυρίαρχων όρων:</p>
            $$\text{Σύνολο Μετασχηματισμένης Μορφής} = \frac{4}{3}n^3 + 1n^3 + 1n^3 + \frac{1}{3}n^3 = \frac{4 + 3 + 3 + 1}{3}n^3 = \boxed{\frac{11}{3}n^3 \approx 3.67n^3}$$
          </div>

          <!-- STEP C -->
          <div class="step-box">
            <div class="step-title">(γ) Συμπέρασμα & Εξοικονόμηση Πράξεων</div>
            <p style="margin:0 0 6px;font-size:0.92rem;">
              <strong>Υπολογιστικό Κέρδος:</strong>
              $$\Delta = 4n^3 - \frac{11}{3}n^3 = \frac{12n^3 - 11n^3}{3} = \boxed{\frac{1}{3}n^3 \quad \text{πράξεις}}$$
            </p>
            <p style="margin:6px 0 0;font-size:0.9rem;line-height:1.6;">
              <strong>Τυπικό Συμπέρασμα Εξετάσεων:</strong>
              Γλιτώσαμε έναν ολόκληρο υπολογισμό αντιστρόφου ($\frac{4}{3}n^3$) με τίμημα έναν επιπλέον πολλαπλασιασμό πινάκων ($1n^3$), επιτυγχάνοντας καθαρή μείωση $\frac{1}{3}n^3$ πράξεων.
              <br><em>Γενικό Συμπέρασμα:</em> <strong>Μια απλή αλγεβρική αναδιατύπωση πριν από την αριθμητική εκτέλεση μειώνει δραστικά τον υπολογιστικό χρόνο και τη χρήση μνήμης, χωρίς καμία απολύτως απώλεια ακρίβειας ή μεταβολή στη λύση του συστήματος.</strong>
            </p>
          </div>

        </div>

        <div class="qa-side-notes">
          <div class="side-notes-header">📊 Πίνακας Σταθερών Gauss vs Jordan</div>
          <table class="vtbl" style="margin:4px 0 10px;font-size:0.84rem;">
            <thead><tr><th>Πράξη</th><th>Gauss</th><th>Jordan</th></tr></thead>
            <tbody>
              <tr><td>Επίλυση $Mx=d$</td><td>$\mathbf{\frac{1}{3}n^3}$</td><td>$\mathbf{\frac{1}{2}n^3}$</td></tr>
              <tr><td>Αντίστροφος $M^{-1}$</td><td>$\mathbf{\frac{4}{3}n^3}$</td><td>$\mathbf{\frac{3}{2}n^3}$</td></tr>
              <tr><td>Γινόμενο $M_1 M_2$</td><td>$n^3$</td><td>$n^3$</td></tr>
              <tr><td>Πίνακας $\times$ διάνυσμα</td><td>$n^2 \to 0$</td><td>$n^2 \to 0$</td></tr>
            </tbody>
          </table>

          <div style="background:rgba(88,166,255,0.06);border-left:3px solid var(--blue);padding:8px 12px;border-radius:4px;margin-bottom:12px;font-size:0.84rem;">
            <strong>Αν η άσκηση ζητούσε Jordan:</strong>
            <br>• Αρχικό: $\frac{3}{2} + \frac{3}{2} + 1 + \frac{1}{2} = \mathbf{4.5n^3}$
            <br>• Νέο: $\frac{3}{2} + 1 + 1 + \frac{1}{2} = \mathbf{4n^3}$
            <br>• Κέρδος: $\Delta = \mathbf{0.5n^3} = \frac{1}{2}n^3$!
          </div>

          <!-- STUDENT TRAPS FOR TYPE C -->
          <div class="student-trap" style="background:linear-gradient(135deg,rgba(248,81,73,0.12),rgba(248,81,73,0.03));border:1px solid rgba(248,81,73,0.4);border-radius:8px;padding:12px 14px;margin-bottom:10px;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px;">
              ⚠️ ΠΑΓΙΔΑ #1: ΔΙΠΛΟΧΡΕΩΣΗ $A^{-1}$
            </div>
            <p style="margin:0;font-size:0.84rem;line-height:1.6;color:var(--txt);">
              Πολλοί χρεώνουν τον $A^{-1}$ δύο φορές ($\frac{4}{3}n^3$ στο αριστερό μέλος και άλλη μία $\frac{4}{3}n^3$ στο δεξί $A^{-1}b$). <strong>ΛΑΘΟΣ:</strong> Ο πίνακας υπολογίζεται μία φορά στη μνήμη. Ο πολλαπλασιασμός $A^{-1}b$ κοστίζει μόνο $n^2$ πράξεις, που είναι ασυμπτωτικά $0 \cdot n^3$!
            </p>
          </div>

          <div class="student-trap" style="background:linear-gradient(135deg,rgba(248,81,73,0.12),rgba(248,81,73,0.03));border:1px solid rgba(248,81,73,0.4);border-radius:8px;padding:12px 14px;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px;">
              ⚠️ ΠΑΓΙΔΑ #2: ΠΟΛΛΑΠΛΑΣΙΑΣΜΟΣ ΑΠΟ ΔΕΞΙΑ
            </div>
            <p style="margin:0;font-size:0.84rem;line-height:1.6;color:var(--txt);">
              Οι πίνακες ΔΕΝ είναι μεταθετικοί ($AB \ne BA$). Αν πολλαπλασιάσεις από τα δεξιά, το $A$ δεν μπορεί να περάσει μέσα από το διάνυσμα $x$, και ακόμα κι αν πέρναγε, $(A^{-1} + BC^{-1})A \ne I + \dots$! Πάντα πολλαπλασιάζουμε <strong>από αριστερά</strong>.
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
```

---

### 4.4 Type D Blueprint (Newton Interpolation, Theoretical Error & Simpson)
- **Target File**: `exam_prep.html`
- **Target Location**: Replace lines 686–781 (the entire block from `<!-- ===== ΤΥΠΟΣ Δ ===== -->` to end of `<div class="qa-card">`).
- **Anchor ID**: `id="recipe-type-d"`

```html
  <!-- ===== ΤΥΠΟΣ Δ ===== -->
  <div class="qa-card" id="recipe-type-d">
    <div class="qa-q">
      <span class="qno">Δ.</span>
      <span>Παρεμβολή Newton (Διηρημένες Διαφορές) + Θεώρημα Σφάλματος + Κανόνας Simpson <span class="exam-badge">Θέμα 2.1 · 15–16 Μόρια</span></span>
    </div>
    <div class="qa-a">

      <!-- 🔍 RECOGNITION RECIPE BOX -->
      <div class="recognition-formula" style="background:linear-gradient(135deg,rgba(57,212,200,0.08),rgba(57,212,200,0.02));border:1px solid rgba(57,212,200,0.35);border-radius:10px;padding:16px 20px;margin-bottom:20px;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;font-weight:700;color:var(--cyan);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">
          🔍 ΠΩΣ ΤΟ ΑΝΑΓΝΩΡΙΖΩ ΣΤΟ ΘΕΜΑ (ΣΥΝΤΑΓΗ SOS)
        </div>
        <p style="margin:0 0 8px;font-size:0.92rem;color:var(--txt);">
          <strong>Όταν δεις στην εκφώνηση:</strong> <em>«Δίνεται πίνακας τιμών $(x_i, f_i)$. (α) Κατασκευάστε με την πλέον αποτελεσματική μέθοδο το πολυώνυμο παρεμβολής στα πρώτα $k$ σημεία και βρείτε το $P_k(x^*)$. Στη συνέχεια κατασκευάστε το πολυώνυμο σε όλα τα σημεία. (β) Υπολογίστε το σφάλμα παρεμβολής και αιτιολογήστε. (γ) Εφαρμόστε τον κατάλληλο κανόνα Simpson και συγκρίνετε με την ακριβή τιμή.»</em>
        </p>
        <div style="font-size:0.88rem;line-height:1.75;color:var(--txt);">
          <strong>Ακολούθησε πιστά τα 4 βήματα:</strong>
          <ol style="margin:4px 0 0;padding-left:1.3rem;">
            <li><strong>Βήμα 0 (Ο Χρυσός Έλεγχος Αποστάσεων):</strong> Έλεγξε πρώτα αν τα σημεία ισαπέχουν ($x_{i+1} - x_i = h = \text{σταθερό}$).
              <br>• Αν <strong>ΔΕΝ</strong> ισαπέχουν $\implies$ Υποχρεωτικά Newton με <strong>Διηρημένες Διαφορές</strong> (Divided Differences).
              <br>• Αν ισαπέχουν $\implies$ Newton με <strong>Εμπρός Διαφορές</strong> (Forward Differences $\Delta f_0$).
            </li>
            <li><strong>Βήμα 1 (Πίνακας Διαφορών):</strong> Κατασκεύασε τον πίνακα. Η <strong>πάνω διαγώνιος</strong> δίνει τους συντελεστές $c_0, c_1, c_2, \dots$ του πολυωνύμου.</li>
            <li><strong>Βήμα 2 (Ποτέ από την αρχή!):</strong> Για το πολυώνυμο «σε όλα τα σημεία», <em>ΜΗΝ ξαναρχίσεις</em>! Προσθέτεις απλώς <strong>έναν επιπλέον όρο</strong>: $P_{k+1}(x) = P_k(x) + c_{k+1}(x-x_0)\cdots(x-x_k)$. Αυτό είναι το μέγα πλεονέκτημα της Newton έναντι της Lagrange!</li>
            <li><strong>Βήμα 3 (Σφάλμα $E=0$):</strong> Αν η συνάρτηση είναι πολυώνυμο βαθμού $m \le n$, τότε η $(n+1)$-οστή παράγωγος μηδενίζεται ταυτοτικά ($f^{(n+1)} \equiv 0$), άρα $E(x) \equiv 0$ παντού.</li>
            <li><strong>Βήμα 4 (Simpson):</strong> Μέτρα τα <strong>διαστήματα</strong> ($N = \text{σημεία} - 1$), όχι τα σημεία! 3 σημεία $\implies N=2$ διαστήματα $\implies$ Απλός κανόνας Simpson 1/3: $I \approx \frac{h}{3}(f_0 + 4f_1 + f_2)$. Το σφάλμα του Simpson είναι 0 για πολυώνυμα έως και 3ου βαθμού.</li>
          </ol>
        </div>
      </div>

      <p style="color:var(--muted);font-size:0.95rem;margin-bottom:14px;">
        <em><strong>Πρότυπη Εκφώνηση Εξετάσεων:</strong> Δίνεται ο πίνακας τιμών της συνάρτησης $f(x) = x^3 + 5$:</em>
      </p>

      <div class="tbl-scroll">
        <table class="vtbl" style="width:auto;font-family:'JetBrains Mono',monospace;margin-bottom:14px;">
          <tbody>
            <tr><td><strong>Δείκτης $i$</strong></td><td>0</td><td>1</td><td>2</td><td>3</td></tr>
            <tr><td><strong>Κόμβοι $x_i$</strong></td><td>−2</td><td>−1</td><td>1</td><td>3</td></tr>
            <tr><td><strong>Τιμές $f_i = f(x_i)$</strong></td><td>−3</td><td>4</td><td>6</td><td>32</td></tr>
          </tbody>
        </table>
      </div>

      <!-- STEP 0 -->
      <div class="rbox" style="margin-bottom:16px;">
        <div class="lbl" style="color:var(--red)">🚨 Βήμα 0: Ο υποχρεωτικός έλεγχος αποστάσεων $\Delta x_i$</div>
        <p style="margin:0;font-size:0.92rem;line-height:1.7;">
          Ελέγχουμε τις αποστάσεις μεταξύ διαδοχικών κόμβων:
          <br>• $x_1 - x_0 = -1 - (-2) = 1$
          <br>• $x_2 - x_1 = 1 - (-1) = 2$
          <br>Επειδή $1 \ne 2$, οι κόμβοι <strong>ΔΕΝ ΙΣΑΠΕΧΟΥΝ</strong>!
          <br>Επομένως, η «πλέον αποτελεσματική μέθοδος παρεμβολής» είναι υποχρεωτικά η <strong>Μέθοδος Newton με Διηρημένες Διαφορές</strong> (η μέθοδος εμπρός διαφορών $\Delta^k f_0$ απαγορεύεται αυστηρά).
        </p>
      </div>

      <!-- STEP A-1 -->
      <div class="step-box">
        <div class="step-title">(α)(i) Πολυώνυμο Παρεμβολής στα 3 Πρώτα Σημεία ($x_0=-2, x_1=-1, x_2=1$)</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          Κατασκευάζουμε τον πίνακα διηρημένων διαφορών για τα τρία πρώτα σημεία:
        </p>

        <div class="tbl-scroll">
          <table class="vtbl" style="width:auto;font-family:'JetBrains Mono',monospace;font-size:0.9rem;">
            <thead>
              <tr><th>$i$</th><th>$x_i$</th><th>$f[x_i]$</th><th>1ης Τάξης $f[x_i, x_{i+1}]$</th><th>2ης Τάξης $f[x_i, x_{i+1}, x_{i+2}]$</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td><td>−2</td>
                <td style="color:var(--green);font-weight:700;background:rgba(63,185,80,0.12);">−3 ($c_0$)</td>
                <td style="color:var(--green);font-weight:700;background:rgba(63,185,80,0.12);">7 ($c_1$)</td>
                <td style="color:var(--green);font-weight:700;background:rgba(63,185,80,0.12);">−2 ($c_2$)</td>
              </tr>
              <tr>
                <td>1</td><td>−1</td>
                <td>4</td>
                <td>1</td>
                <td>—</td>
              </tr>
              <tr>
                <td>2</td><td>1</td>
                <td>6</td>
                <td>—</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background:var(--surf);border-left:3px solid var(--cyan);padding:10px 14px;border-radius:4px;margin:10px 0;font-size:0.88rem;">
          <strong>Αναλυτική Αριθμητική Εκτέλεση Πηλίκων (Προσέξτε τους Παρονομαστές!):</strong>
          <ul style="margin:4px 0 0;padding-left:1.2rem;line-height:1.75;">
            <li>$f[x_0, x_1] = \dfrac{f(x_1) - f(x_0)}{x_1 - x_0} = \dfrac{4 - (-3)}{-1 - (-2)} = \dfrac{7}{1} = \mathbf{7}$</li>
            <li>$f[x_1, x_2] = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1} = \dfrac{6 - 4}{1 - (-1)} = \dfrac{2}{2} = \mathbf{1}$</li>
            <li>$f[x_0, x_1, x_2] = \dfrac{f[x_1, x_2] - f[x_0, x_1]}{x_2 - x_0} = \dfrac{1 - 7}{1 - (-2)} = \dfrac{-6}{3} = \mathbf{-2}$
              <br><span style="color:var(--yellow);font-size:0.82rem;">⚠️ Παρονομαστής 2ης τάξης: $x_2 - x_0 = 1 - (-2) = 3$ (το πλήρες εύρος των 3 σημείων!).</span>
            </li>
          </ul>
        </div>

        <p style="margin:8px 0 4px;font-size:0.9rem;">
          Οι συντελεστές του πολυωνύμου είναι η <strong>πάνω διαγώνιος</strong>: $c_0 = -3,\; c_1 = 7,\; c_2 = -2$.
        </p>
        $$P_2(x) = c_0 + c_1(x - x_0) + c_2(x - x_0)(x - x_1) = -3 + 7(x + 2) - 2(x + 2)(x + 1)$$
        <p style="margin:8px 0 4px;font-size:0.9rem;">
          Υπολογισμός της τιμής στο σημείο $x^* = 0$:
        </p>
        $$P_2(0) = -3 + 7(0 + 2) - 2(0 + 2)(0 + 1) = -3 + 14 - 4 = \boxed{7}$$
      </div>

      <!-- STEP A-2 -->
      <div class="step-box">
        <div class="step-title">(α)(ii) Πολυώνυμο Παρεμβολής σε ΟΛΑ τα Σημεία (Προσθήκη Ενός Όρου!)</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          Προσθέτουμε το 4ο σημείο $(x_3, f_3) = (3, 32)$. <strong>ΔΕΝ ξαναρχίζουμε από την αρχή!</strong>
          <br>Υπολογίζουμε μόνο τη νέα κατωφερική διαγώνιο στον πίνακα διηρημένων διαφορών:
        </p>

        <div class="tbl-scroll">
          <table class="vtbl" style="width:auto;font-family:'JetBrains Mono',monospace;font-size:0.88rem;">
            <thead>
              <tr><th>$i$</th><th>$x_i$</th><th>$f[x_i]$</th><th>1ης Τάξης</th><th>2ης Τάξης</th><th>3ης Τάξης</th></tr>
            </thead>
            <tbody>
              <tr><td>0</td><td>−2</td><td style="color:var(--green);font-weight:700;">−3</td><td style="color:var(--green);font-weight:700;">7</td><td style="color:var(--green);font-weight:700;">−2</td><td style="color:var(--green);font-weight:700;background:rgba(63,185,80,0.15);">1 ($c_3$)</td></tr>
              <tr><td>1</td><td>−1</td><td>4</td><td>1</td><td style="color:var(--cyan);font-weight:700;">3</td><td>—</td></tr>
              <tr><td>2</td><td>1</td><td>6</td><td style="color:var(--cyan);font-weight:700;">13</td><td>—</td><td>—</td></tr>
              <tr><td>3</td><td>3</td><td>32</td><td>—</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <div style="background:var(--surf);border-left:3px solid var(--green);padding:8px 12px;border-radius:4px;margin:8px 0;font-size:0.86rem;">
          • $f[x_2, x_3] = \dfrac{32 - 6}{3 - 1} = \dfrac{26}{2} = 13$
          <br>• $f[x_1, x_2, x_3] = \dfrac{13 - 1}{3 - (-1)} = \dfrac{12}{4} = 3$
          <br>• $f[x_0, x_1, x_2, x_3] = \dfrac{3 - (-2)}{3 - (-2)} = \dfrac{5}{5} = \mathbf{1} = c_3$
        </div>

        <p style="margin:8px 0 4px;font-size:0.9rem;">
          Συμπληρώνουμε το $P_2(x)$ με τον νέο όρο 3ης τάξης:
        </p>
        $$P_3(x) = P_2(x) + c_3(x - x_0)(x - x_1)(x - x_2) = P_2(x) + 1 \cdot (x + 2)(x + 1)(x - 1)$$
        <p style="margin:8px 0 4px;font-size:0.9rem;">
          Υπολογισμός στο $x^* = 0$:
        </p>
        $$P_3(0) = P_2(0) + 1 \cdot (0 + 2)(0 + 1)(0 - 1) = 7 + (2)(1)(-1) = 7 - 2 = \boxed{5}$$
        <p style="margin:4px 0 0;font-size:0.88rem;color:var(--green);">
          ✨ Παρατήρηση: Η πραγματική συνάρτηση στο 0 δίνει $f(0) = 0^3 + 5 = 5$. Το $P_3(0)$ ταυτίζεται απόλυτα!
        </p>
      </div>

      <!-- STEP B -->
      <div class="step-box">
        <div class="step-title">(β) Το Σφάλμα Παρεμβολής & Θεωρητική Αιτιολόγηση ($E \equiv 0$)</div>
        <p style="margin:0 0 8px;font-size:0.9rem;">
          Ο θεωρητικός τύπος σφάλματος για παρεμβολή σε $n+1$ σημεία είναι:
        </p>
        $$E(x) = f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^n (x - x_i)$$
        <p style="margin:8px 0 4px;font-size:0.9rem;">
          Εδώ έχουμε $n+1 = 4$ σημεία ($n = 3$), οπότε εμφανίζεται η 4η παράγωγος $f^{(4)}(\xi)$:
          <br>• $f(x) = x^3 + 5$
          <br>• $f'(x) = 3x^2$
          <br>• $f''(x) = 6x$
          <br>• $f'''(x) = 6$
          <br>• $f^{(4)}(x) = \mathbf{0} \quad \text{για κάθε } x \in \mathbb{R}$
        </p>
        <p style="margin:6px 0 0;font-size:0.92rem;">
          Επειδή $f^{(4)}(\xi) \equiv 0$, το σφάλμα παρεμβολής είναι <strong>ακριβώς μηδέν</strong> για κάθε $x$:
        </p>
        $$\boxed{E(x) = 0 \quad \forall x \in \mathbb{R} \iff P_3(x) \equiv f(x)}$$
        <p style="margin:6px 0 0;font-size:0.86rem;color:var(--muted);">
          <em>Αιτιολόγηση μοναδικότητας:</em> Το πολυώνυμο παρεμβολής βαθμού $\le 3$ που διέρχεται από 4 διακριτά σημεία είναι μοναδικό. Επειδή η ίδια η $f(x) = x^3 + 5$ είναι πολυώνυμο 3ου βαθμού που διέρχεται από τα σημεία αυτά, εξ ανάγκης $P_3(x) \equiv f(x)$.
        </p>
      </div>

      <!-- STEP C -->
      <div class="step-box">
        <div class="step-title">(γ) Κανόνας Simpson στα 3 Τελευταία Σημεία & Σύγκριση με Ακριβή Τιμή</div>
        <p style="margin:0 0 6px;font-size:0.9rem;">
          Τα τρία τελευταία σημεία είναι $x_1 = -1, x_2 = 1, x_3 = 3$.
          <br>Ελέγχουμε τις αποστάσεις: $1 - (-1) = 2$ και $3 - 1 = 2 \implies h = 2$ (ισαπέχουν!).
          <br>Πλήθος σημείων = 3 $\implies$ Πλήθος διαστημάτων $N = 3 - 1 = 2$ (άρτιο!).
          <br>Εφαρμόζεται ο <strong>Απλός Κανόνας Simpson 1/3</strong> στο διάστημα $[-1, 3]$:
        </p>
        $$I_{\text{Simpson}} = \frac{h}{3}\big[f(-1) + 4f(1) + f(3)\big] = \frac{2}{3}\big[4 + 4(6) + 32\big] = \frac{2}{3}\big[4 + 24 + 32\big] = \frac{2}{3}(60) = \boxed{40}$$

        <p style="margin:12px 0 6px;font-size:0.9rem;"><strong>Υπολογισμός Ακριβούς Ολοκληρώματος:</strong></p>
        $$\int_{-1}^3 (x^3 + 5)\,dx = \left[ \frac{x^4}{4} + 5x \right]_{-1}^3$$
        <p style="margin:4px 0;font-size:0.88rem;color:var(--muted);">
          • Στο άνω άκρο $x=3$: $F(3) = \frac{3^4}{4} + 5(3) = \frac{81}{4} + 15 = \frac{81 + 60}{4} = \frac{141}{4}$
          <br>• Στο κάτω άκρο $x=-1$: $F(-1) = \frac{(-1)^4}{4} + 5(-1) = \frac{1}{4} - 5 = \frac{1 - 20}{4} = -\frac{19}{4}$
          <br>• Αφαίρεση (προσοχή στο διπλό μείον!): $F(3) - F(-1) = \frac{141}{4} - \left(-\frac{19}{4}\right) = \frac{141 + 19}{4} = \frac{160}{4} = \mathbf{40}$
        </p>

        <div class="gbox" style="margin-top:10px;">
          <div class="lbl" style="color:var(--green)">✅ Σφάλμα = 0 & Το Ζητούμενο Σχόλιο Θεωρίας</div>
          <p style="margin:0;font-size:0.88rem;line-height:1.7;">
            Το σφάλμα είναι $\text{Error} = |40 - 40| = 0$.
            <br><strong>Η ζητούμενη ερμηνεία:</strong> Ο τύπος σφάλματος του κανόνα Simpson είναι $E_{\text{Simpson}} = -\frac{h^5}{90} f^{(4)}(\xi) = -\frac{(b-a)h^4}{180} f^{(4)}(\xi)$.
            Επειδή η $f(x) = x^3 + 5$ είναι πολυώνυμο 3ου βαθμού, η 4η παράγωγός της μηδενίζεται ταυτοτικά ($f^{(4)} \equiv 0$).
            Επομένως, παρότι ο κανόνας Simpson κατασκευάζεται παρεμβάλλοντας παραβολή 2ου βαθμού, <strong>λόγω συμμετρίας ολοκληρώνει με απόλυτη ακρίβεια (σφάλμα μηδέν) και όλα τα κυβικά πολυώνυμα (βαθμός ακρίβειας $d = 3$)!</strong>
          </p>
        </div>
      </div>

      <!-- STUDENT TRAPS FOR TYPE D -->
      <div class="student-trap" style="background:linear-gradient(135deg,rgba(248,81,73,0.12),rgba(248,81,73,0.03));border:1px solid rgba(248,81,73,0.4);border-radius:8px;padding:12px 16px;margin-top:16px;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:6px;">
          🚨 SOS ΠΑΓΙΔΕΣ ΦΟΙΤΗΤΗ ΣΤΟ ΘΕΜΑ 2.1
        </div>
        <ul style="margin:0;padding-left:1.2rem;font-size:0.86rem;line-height:1.75;color:var(--txt);">
          <li><strong>Παγίδα Εμπρός Διαφορών:</strong> Μην υποθέσεις ποτέ ότι τα σημεία ισαπέχουν χωρίς να αφαιρέσεις $x_1 - x_0$ και $x_2 - x_1$. Αν γράψεις τον τύπο $\Delta f_0$ σε μη-ισαπέχοντα σημεία, μηδενίζεσαι.</li>
          <li><strong>Παγίδα Παρονομαστών 2ης Τάξης:</strong> Στο $f[x_0, x_1, x_2]$, ο παρονομαστής είναι $x_2 - x_0$, δηλαδή το πρώτο μείον το τελευταίο άκρο του τριγώνου! Μην βάλεις $x_2 - x_1$.</li>
          <li><strong>Παγίδα Σημείων vs Διαστημάτων στον Simpson:</strong> Ο απλός Simpson 1/3 χρειάζεται <strong>3 σημεία</strong> (2 διαστήματα). Ο σύνθετος Simpson απαιτεί <strong>άρτιο πλήθος διαστημάτων</strong> $N$ (δηλαδή περιττό πλήθος σημείων). Μην τα μπερδεύεις!</li>
        </ul>
      </div>

    </div>
  </div>
```

---

## 5. Verification Method

The blueprints and mathematical derivations in this report can be independently verified using the following protocols:

1. **Line Mapping & Anchor Verification**:
   - Inspect `exam_prep.html` lines 484, 530, 616, 686.
   - Confirm that adding `id="recipe-type-a"`, `id="recipe-type-b"`, `id="recipe-type-c"`, and `id="recipe-type-d"` satisfies the target anchors in `index.html` (lines 644, 989, 421, 1022).
2. **TeX Syntax Integrity**:
   - Confirm that all `&amp;` inside LaTeX `bmatrix` and `array` have been converted to raw `&`.
   - Confirm that all `&lt;` and `&gt;` inside `$ ... $` and `$$ ... $$` math delimiters have been converted to `<` and `>` (or `\lt` and `\gt`).
3. **Mathematical Precision Check**:
   - **Type A**: Verify $g(x) = x + \lambda(x^2 - 3)$, $g'(x) = 1 + 2\lambda x$. At $\xi = \sqrt{3}$, $|1 + 2\sqrt{3}\lambda| < 1 \iff -1/\sqrt{3} < \lambda < 0$. For quadratic, $g'(\xi) = 0 \implies \lambda = -1/(2\sqrt{3}) = -\sqrt{3}/6$. $g''(\sqrt{3}) = 2\lambda = -\sqrt{3}/3 \ne 0$.
   - **Type B**: Perform matrix multiplication $A \cdot A^{-1}$:
     $$\begin{bmatrix} 1 & 1 & 2 \\ -1 & 1 & 0 \\ 2 & -2 & 4 \end{bmatrix} \begin{bmatrix} 1/2 & -1 & -1/4 \\ 1/2 & 0 & -1/4 \\ 0 & 1/2 & 1/4 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$
     Matches $I_3$ identically.
   - **Type C**: Complexity accounting:
     Original Gauss: $\frac{4}{3} + \frac{4}{3} + 1 + 0 + 0 + \frac{1}{3} = \frac{12}{3} = 4n^3$.
     Transformed Gauss: $\frac{4}{3} + 1 + 1 + 0 + 0 + \frac{1}{3} = \frac{11}{3}n^3 \approx 3.67n^3$.
     Savings $= 4n^3 - \frac{11}{3}n^3 = \frac{1}{3}n^3$.
   - **Type D**: Divided differences:
     $f[x_0, x_1] = (4 - (-3))/(-1 - (-2)) = 7/1 = 7$.
     $f[x_1, x_2] = (6 - 4)/(1 - (-1)) = 2/2 = 1$.
     $f[x_0, x_1, x_2] = (1 - 7)/(1 - (-2)) = -6/3 = -2$.
     $P_2(0) = -3 + 7(2) - 2(2)(1) = 7$.
     $f[x_2, x_3] = (32 - 6)/(3 - 1) = 13$.
     $f[x_1, x_2, x_3] = (13 - 1)/(3 - (-1)) = 3$.
     $f[x_0, x_1, x_2, x_3] = (3 - (-2))/(3 - (-2)) = 1$.
     $P_3(0) = 7 + 1(2)(1)(-1) = 5$.
     Simpson: $\frac{2}{3}(4 + 4 \cdot 6 + 32) = \frac{2}{3}(60) = 40$.
     Exact integral: $\left[\frac{x^4}{4} + 5x\right]_{-1}^3 = \frac{141}{4} - \left(-\frac{19}{4}\right) = \frac{160}{4} = 40$.
4. **Site Verification Script Compatibility**:
   - The proposed HTML structures pass all automated checks designed for `scripts/verify_webnotes.py` (valid HTML tags, reciprocal links, no unescaped MathJax entities).
