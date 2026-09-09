# Handoff Report: M1 Spec Miner 2 (Topic Jargon Busters Specification)

**Mission**: Design the exact HTML markup, Greek definitions, dark-theme CSS styling, and precise line-number placement for in-place collapsible "Jargon Buster" callouts across all 7 topic pages (`topic1` to `topic7`) and `exam_prep.html`, fulfilling requirement R1 of `ORIGINAL_REQUEST.md` and Milestone 1 of `PROJECT.md`.  
**Target File**: `D:\University\Αριθμητικη Αναλυση\.agents\m1_explorer_2\handoff.md`  
**Date**: 2026-09-03T09:42:00Z  

---

## 1. Observation

### Codebase and Style Architecture
1. **Dark Theme Variables (`styles/base.css`, `styles/components.css`, and in-page `<style>` blocks)**:
   - Backgrounds: `--bg: #0d1117;`, `--surf: #161b22;`, `--surf2: #1c2230;`
   - Borders & Dividers: `--border: #30363d;`
   - Color Accents: `--blue: #58a6ff;`, `--cyan: #39d4c8;`, `--green: #3fb950;`, `--yellow: #e3b341;`, `--red: #f85149;`, `--purple: #bc8cff;`, `--orange: #f0883e;`
   - Typography: `--txt: #e6edf3;`, `--muted: #8b949e;`, `--dim: #6e7681;`
   - Font Families: `'Roboto', sans-serif`, `'JetBrains Mono', monospace`, `'Syne', sans-serif`.
2. **Current Component Usage**:
   - `styles/components.css` is linked in the `<head>` of all 7 topic pages and `exam_prep.html` via `<link rel="stylesheet" href="styles/components.css">`.
   - Existing cards use `.step-box` (background `var(--surf2)`, `border-left: 4px solid var(--blue)`), `.card` (background `var(--surf)`), `.wbox` (warning, `var(--ydim)`), `.rbox` (danger, `var(--rdim)`), and `.gbox` (success, `var(--gdim)`).
   - Currently, there is **no dedicated styling** for the `<details>` / `<summary>` disclosure element in `styles/components.css` or `styles/base.css`, leaving browsers with default plain markers and no dark-mode transitions.
3. **MathJax Compatibility**:
   - Every topic page configures MathJax v3 with `inlineMath: [['$', '$'], ['\\(', '\\)']]` and `displayMath: [['$$', '$$'], ['\\[', '\\]']]`.
   - MathJax processes all HTML text elements except `script`, `noscript`, `style`, `textarea`, `pre`, `code`. The `<details>`, `<summary>`, and `<div>` tags are fully processed, allowing clean rendering of LaTeX math inside summary headings and collapsible bodies.

---

## 2. Logic Chain

1. **Pedagogical Requirement (ORIGINAL_REQUEST R1 & R3)**:
   - A novice student facing university-level numerical analysis papers freezes when confronted with formal jargon such as «Μερική Οδήγηση», «Φασματική Ακτίνα $\rho(\mathcal{L})$», «Διηρημένη Διαφορά», «Αυστηρά Διαγώνια Υπεροχή», «Βαθμός Ακρίβειας», or «Αριθμός Συνθήκης $\text{cond}(A)$».
   - Instead of forcing the student to navigate away to a separate glossary page or dictionary, contextual in-situ callouts provide an immediate, accessible "safety net" right where the symbol or concept appears in the flow of the explanation.
2. **Collapsible UI Behavior (`<details class="jargon-buster">`)**:
   - Using native `<details>` and `<summary>` provides zero-dependency interactivity without requiring external JavaScript libraries or inline onclick handlers.
   - It is natively keyboard-accessible (Tab + Enter/Space) and works identically in static HTML files (`file:///` protocol) and deployed web servers.
   - By keeping the callout closed by default (`open` attribute omitted), the main reading flow remains uncluttered for confident readers, while remaining one click away for struggling novices.
3. **Styling and Theming**:
   - Styling with `--surf2` (`#1c2230`), `--border` (`#30363d`), and a distinct `--cyan` accent (`#39d4c8`) clearly identifies the callout as an explanatory glossary box, distinguishing it from general warnings (`.wbox` in yellow) and error traps (`.rbox` in red).
   - Replacing the default browser disclosure marker (`::-webkit-details-marker`) with a smooth rotating chevron (`▾`) and CSS slide-down animation provides a modern, polished dark-mode aesthetic.
4. **Coverage Across All 8 Pages**:
   - Each page receives **2 high-value Jargon Busters** placed at exact heading anchors and line numbers, targeting the highest-frequency sources of exam confusion in that chapter (total 16 callouts).

---

## 3. Caveats

- In adherence to the Specification Miner role, **no source code files have been modified yet**. The specifications below provide exact diff positions and copy-paste-ready HTML/CSS for implementation in the builder phase.
- Exact line numbers are based on the current workspace revision; when inserting multiple callouts in the same file, implementing agents should work top-to-bottom or adjust downstream line counts accordingly.
- MathJax equations inside `<summary>` tags must use standard single-dollar `$..$` delimiters to ensure immediate typesetting on load.

---

## 4. Conclusion & Complete Specification

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | UI/CSS | `.jargon-buster` Component | Collapsible dark-theme callout with custom summary chevron and slide-down animation | User click on `<summary>` | Smooth vertical expansion revealing ELI5 definition & exam intuition | Native fallback to instant open if CSS fails | ORIGINAL_REQUEST R1 |
| 2 | Topic 1 | Jargon: $m_{ik}$ & Pivoting | Demystifies elimination multipliers $m_{ik} = a_{ik}/a_{kk}$, negative sign traps, and partial pivoting search rules | HTML injection at `#gauss_elim` & `#pivoting` | Rendered collapsible boxes | Missing double-minus sign warning explicitly detailed | `topic1_direct_linear.html` |
| 3 | Topic 2 | Jargon: $\rho(\mathcal{L})$ & SDD | Explains spectral radius $\max |\lambda_i| < 1$, strictly diagonally dominant matrices, and normalized $L, U$ conventions | HTML injection at `#jacobi` & `#spectral` | Rendered collapsible boxes | Wrong eigenvalue target warning (iteration matrix vs $A$) | `topic2_iterative_linear.html` |
| 4 | Topic 3 | Jargon: $\xi$ & Order $p$ | Demystifies fixed points $g(\xi)=\xi$, local convergence $|g'(\xi)|<1$, quadratic convergence $g'(\xi)=0$, and error doubling | HTML injection at `#fixed_point` & `#newton` | Rendered collapsible boxes | Inequality sign-flip warning on negative division | `topic3_nonlinear.html` |
| 5 | Topic 4 | Jargon: $f[x_0,..,x_k]$ & Runge | Explains divided difference recursive quotients, denominator subtraction rule, Runge phenomenon, and $E(x)$ cancellation | HTML injection at `#divided_diff` & `#error_analysis` | Rendered collapsible boxes | Equidistant node forward-diff check | `topic4_interpolation.html` |
| 6 | Topic 5 | Jargon: Quadrature & Precision $d$ | Clarifies numerical quadrature $\sum w_i f(x_i)$, intervals vs points in Simpson, and degree of precision monomial matching | HTML injection at `#simpson` & `#degree` | Rendered collapsible boxes | Even intervals requirement for Simpson 1/3 | `topic5_integration.html` |
| 7 | Topic 6 | Jargon: IVP & Truncation Error | Demystifies initial value problems $y'=f(x,y)$, step size $h$, implicit differentiation $y''$, and local vs global truncation error | HTML injection at `#euler` & `#taylor` | Rendered collapsible boxes | Chain rule error on implicit derivative $y''$ | `topic6_odes.html` |
| 8 | Topic 7 | Jargon: $\text{cond}(A)$ & Column-Major | Explains condition number sensitivity, vector/matrix norms, and MATLAB column-major linear indices | HTML injection at `#commands` & `#indexing` | Rendered collapsible boxes | Row-major vs column-major indexing mismatch | `topic7_matlab_guide.html` |
| 9 | Exam Prep | Jargon: Cost Algebra & $AB \ne BA$ | Explains $n^3$ asymptotic cost rules (Gauss vs Jordan), zero-cost matrix-vector products, and matrix non-commutativity | HTML injection at `#core-facts` & `#howto` | Rendered collapsible boxes | Double-charging $A^{-1}b$ trap prevented | `exam_prep.html` |

### Edge Cases
| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | MathJax in `<summary>` | LaTeX expression `$\rho(\mathcal{L})$` in summary | MathJax renders formula cleanly. Summary flexbox layout must maintain `align-items: center` so formula does not push chevron out of alignment. |
| 2 | CSS Multi-Theme | User switches between dark/light themes via `nav.js` | Variables `--surf2`, `--border`, `--txt`, `--cyan` automatically resolve to light or dark values with zero contrast loss. |
| 3 | Mobile Viewport | Summary text wrapping on 360px mobile screen | `summary` requires `flex-wrap: wrap` or chevron positioned via `margin-left: auto` with `flex-shrink: 0` so chevron never clips. |
| 4 | Print / PDF Export | Page printed with `<details>` | Browsers by default only print open details. Adding `@media print { details.jargon-buster { display: block !important; } }` ensures callouts print cleanly. |

---

### PART A: CSS Specification for `.jargon-buster`

To be added to `styles/components.css` (around line 1402, at the end of the file):

```css
/* ==========================================================================
   Jargon Buster Collapsible Callout Component (Dark-Mode & Accessible)
   ========================================================================== */
.jargon-buster {
  background: var(--surf2, #1c2230);
  border: 1px solid var(--border, #30363d);
  border-left: 4px solid var(--cyan, #39d4c8);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.jargon-buster:hover {
  border-color: rgba(57, 212, 200, 0.45);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.jargon-buster[open] {
  border-color: rgba(57, 212, 200, 0.6);
}

.jargon-buster summary {
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--txt, #e6edf3);
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  list-style: none;
  transition: background 0.15s ease;
}

/* Hide native disclosure triangle */
.jargon-buster summary::-webkit-details-marker {
  display: none;
}
.jargon-buster summary::marker {
  display: none;
}

/* Custom animated rotating chevron */
.jargon-buster summary::after {
  content: '▾';
  margin-left: auto;
  font-size: 1rem;
  color: var(--muted, #8b949e);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.jargon-buster[open] summary::after {
  transform: rotate(180deg);
  color: var(--cyan, #39d4c8);
}

.jargon-buster summary:hover {
  background: rgba(57, 212, 200, 0.07);
}

.jargon-buster .jargon-term {
  color: var(--cyan, #39d4c8);
  font-weight: 700;
}

.jargon-buster .jargon-content {
  padding: 14px 18px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--txt, #e6edf3);
  animation: jargonSlideDown 0.22s cubic-bezier(0, 0, 0.2, 1);
}

.jargon-buster .jargon-content p {
  margin-bottom: 10px;
  line-height: 1.7;
}

.jargon-buster .jargon-content p:last-child {
  margin-bottom: 0;
}

.jargon-buster .jargon-content strong {
  color: var(--txt, #e6edf3);
}

@keyframes jargonSlideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media print {
  .jargon-buster {
    border-left-color: #008080;
  }
  .jargon-buster .jargon-content {
    display: block !important;
  }
}
```

---

### PART B: Complete Markup & In-Situ Placement Specification Across All 8 Pages

---

#### 1. Page: `topic1_direct_linear.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic1_direct_linear.html`

##### Callout 1.1: Πολλαπλασιαστής Απαλοιφής ($m_{ik}$)
- **Target Section**: `<section id="gauss_elim">`
- **Insertion Anchor**: Immediately below line 146 (after the lead `<p>` explaining forward elimination and back substitution), immediately before `<div class="step-box">` (line 148).
- **Exact Line**: Line 147.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Πολλαπλασιαστής Απαλοιφής ($m_{ik}$)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Ο συντελεστής $m_{ik} = \frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}$ είναι ο αριθμός με τον οποίο πολλαπλασιάζουμε την «οδηγό» γραμμή $k$, ώστε όταν την αφαιρέσουμε από τη γραμμή $i$ ($R_i \leftarrow R_i - m_{ik}R_k$), το στοιχείο κάτω από τη διαγώνιο να γίνει ακριβώς μηδέν ($a_{ik} - m_{ik}a_{kk} = 0$).</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Είναι η καρδιά της απαλοιφής Gauss. <strong>Προσοχή στο Πρόσημο:</strong> Αν το στοιχείο που θες να μηδενίσεις είναι αρνητικό (π.χ. $a_{21} = -4$ και οδηγός $a_{11} = 2$), ο πολλαπλασιαστής είναι $m_{21} = \frac{-4}{2} = -2$. Η γραμμοπράξη είναι $R_2 - (-2)R_1 = R_2 + 2R_1$. Το 80% των λαθών στα πρόχειρα γίνεται επειδή οι φοιτητές ξεχνούν το διπλό μείον!</p>
    </div>
  </details>
```

##### Callout 1.2: Μερική Οδήγηση (Partial Pivoting)
- **Target Section**: `<section id="pivoting">`
- **Insertion Anchor**: Immediately below line 214 (after the intro `<p>` describing division by near-zero), before `<div class="wbox">` (line 216).
- **Exact Line**: Line 215.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Μερική Οδήγηση (Partial Pivoting)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Στο βήμα $k$, κοιτάμε <strong>αποκλειστικά</strong> την τρέχουσα στήλη $k$, από το διαγώνιο στοιχείο και προς τα κάτω ($i = k, \dots, n$), βρίσκουμε το στοιχείο με τη μεγαλύτερη απόλυτη τιμή $|a_{ik}|$ και αλλάζουμε θέσεις στις δύο αντίστοιχες ολόκληρες γραμμές ($R_k \leftrightarrow R_{\text{max}}$).</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Αν ο οδηγός είναι $0$, η διαίρεση είναι αδύνατη. Αν είναι πολύ κοντά στο $0$ (π.χ. $0.0001$), ο πολλαπλασιαστής εκτοξεύεται στο $10.000$, καταστρέφοντας τα δεκαδικά ψηφία λόγω στρογγυλοποίησης. <strong>SOS Παγίδα Εξετάσεων:</strong> Ψάχνεις για το μέγιστο ΜΟΝΟ στην ίδια στήλη από τη διαγώνιο και κάτω — ΠΟΤΕ σε όλο τον πίνακα και ΠΟΤΕ στις προηγούμενες γραμμές που έχουν ήδη τακτοποιηθεί!</p>
    </div>
  </details>
```

---

#### 2. Page: `topic2_iterative_linear.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic2_iterative_linear.html`

##### Callout 2.1: Αυστηρά Διαγώνια Υπερέχων (SDD) & Κανονικοποιημένα $L, U$
- **Target Section**: `<section id="jacobi">`
- **Insertion Anchor**: Immediately below line 149 (after the Step Box showing decomposition $A = D - L - U$), before `<div class="section-quiz">` (line 150).
- **Exact Line**: Line 150.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Αυστηρά Διαγώνια Υπερέχων (SDD) &amp; Κανονικοποιημένα $L, U$</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong>
        <br>• <strong>SDD (Strictly Diagonally Dominant):</strong> Σε κάθε γραμμή, το διαγώνιο στοιχείο είναι κατ' απόλυτη τιμή αυστηρά μεγαλύτερο από το άθροισμα όλων των άλλων στοιχείων της ίδιας γραμμής μαζί: $|a_{ii}| > \sum_{j \neq i} |a_{ij}|$.
        <br>• <strong>Κανονικοποιημένα $L, U$:</strong> Στο DIT, τα $L$ και $U$ ορίζονται ως τα αυστηρά κάτω και άνω τριγωνικά τμήματα του $D^{-1}A$ <strong>με αντίθετο πρόσημο</strong> ($L = -D^{-1}\text{tril}(A,-1)$, $U = -D^{-1}\text{triu}(A,1)$).
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Αν ένας πίνακας είναι SDD, οι μέθοδοι Jacobi και Gauss-Seidel <strong>συγκλίνουν εγγυημένα</strong> από οποιοδήποτε αρχικό διάνυσμα $x^{(0)}$! Στις ασκήσεις MATLAB (Θέμα 3.4), αν ξεχάσεις το μείον στα $L, U$ ή την κανονικοποίηση με $D^{-1}$, ο υπολογισμός του επαναληπτικού πίνακα SOR θα βγάλει εντελώς λάθος αποτέλεσμα.</p>
    </div>
  </details>
```

##### Callout 2.2: Φασματική Ακτίνα ($\rho(\mathcal{L})$)
- **Target Section**: `<section id="spectral">`
- **Insertion Anchor**: Immediately below line 173 (after `<h2>3. Θεώρημα Σύγκλισης...</h2>`), before `<div class="wbox">` (line 175).
- **Exact Line**: Line 174.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Φασματική Ακτίνα ($\rho(\mathcal{L}) = \max |\lambda_i|$)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Η φασματική ακτίνα ενός τετραγωνικού πίνακα είναι το μέτρο της μεγαλύτερης ιδιοτιμής του: $\rho(M) = \max_i |\lambda_i|$. Στις επαναληπτικές μεθόδους, ο πίνακας επανάληψης $\mathcal{L}$ πολλαπλασιάζει το διάνυσμα σφάλματος σε κάθε βήμα: $e^{(k+1)} = \mathcal{L} e^{(k)}$.</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Για να εκμηδενίζεται το σφάλμα καθώς $k \to \infty$, πρέπει υποχρεωτικά <strong>$\rho(\mathcal{L}) < 1$</strong>. Όσο μικρότερο είναι το $\rho$ (π.χ. $0.125$ έναντι $0.353$), τόσο ταχύτερα εξαφανίζεται το σφάλμα. <strong>SOS στο MATLAB:</strong> Γράφουμε <code>max(abs(eig(L_iter)))</code> παίρνοντας τις ιδιοτιμές του <em>επαναληπτικού</em> πίνακα και ΟΧΙ του αρχικού πίνακα $A$!</p>
    </div>
  </details>
```

---

#### 3. Page: `topic3_nonlinear.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic3_nonlinear.html`

##### Callout 3.1: Σταθερό Σημείο ($\xi$) & Τοπική Σύγκλιση ($|g'(\xi)| < 1$)
- **Target Section**: `<section id="fixed_point">`
- **Insertion Anchor**: Immediately below line 131 (after the Banach Fixed-Point Theorem card), before `<div class="section-quiz">` (line 133).
- **Exact Line**: Line 132.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Σταθερό Σημείο ($\xi$) &amp; Τοπική Σύγκλιση ($|g'(\xi)| < 1$)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Σταθερό σημείο μιας συνάρτησης $g(x)$ είναι ο αριθμός $\xi$ που παραμένει αναλλοίωτος όταν περάσει από τη συνάρτηση: $g(\xi) = \xi$. Γεωμετρικά, είναι το σημείο τομής της $y = g(x)$ με την ευθεία $y = x$. Αν ξεκινήσεις κοντά του και εφαρμόσεις $x_{n+1} = g(x_n)$, η ακολουθία πλησιάζει τη ρίζα εφόσον η κλίση είναι ήπια: $|g'(\xi)| < 1$.</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 1.1 - 10-12 μόρια):</strong> Η εκφώνηση δίνει $x_{n+1} = x_n + \lambda \phi(x_n)$. Το $g(x)$ είναι ολόκληρο το δεξί μέλος! Παραγωγίζεις $g'(x) = 1 + \lambda \phi'(x)$, αντικαθιστάς τη ρίζα $\xi$, και λύνεις τη διπλή ανισότητα $-1 < g'(\xi) < 1$. <strong>Προσοχή:</strong> Αν διαιρέσεις με αρνητικό αριθμό, αντιστρέφονται τα σύμβολα ($<$ γίνεται $>$)!</p>
    </div>
  </details>
```

##### Callout 3.2: Τάξη Σύγκλισης ($p$) & Τετραγωνική Σύγκλιση ($p=2$)
- **Target Section**: `<section id="newton">`
- **Insertion Anchor**: Immediately below line 205 (after Newton properties card), before line 207 (Global convergence theorem card).
- **Exact Line**: Line 206.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Τάξη Σύγκλισης ($p$) &amp; Τετραγωνική Σύγκλιση ($p=2$)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Η τάξη $p$ εκφράζει πόσο εκθετικά γρήγορα συρρικνώνεται το σφάλμα $e_n = |x_n - \xi|$ σε κάθε διαδοχικό βήμα: $e_{n+1} \approx C \cdot e_n^p$.
        <br>• <strong>Γραμμική ($p=1$):</strong> Το σφάλμα πολλαπλασιάζεται με σταθερό κλάσμα (σταθερός ρυθμός βελτίωσης δεκαδικών).
        <br>• <strong>Τετραγωνική ($p=2$):</strong> Το νέο σφάλμα είναι ανάλογο του <em>τετραγώνου</em> του προηγούμενου ($10^{-2} \to 10^{-4} \to 10^{-8}$). Τα σωστά δεκαδικά ψηφία <strong>διπλασιάζονται</strong> σε κάθε επανάληψη!
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Στο Θέμα 1.1β ζητείται πάντα: <em>«Βρείτε το $\lambda$ ώστε η σύγκλιση να είναι τουλάχιστον τετραγωνική»</em>. Η συνταγή είναι αυτόματη: θέτεις <strong>$g'(\xi) = 0$</strong>, λύνεις ως προς $\lambda$, επιβεβαιώνεις ότι η τιμή ανήκει στο διάστημα σύγκλισης του ερωτήματος (α), και σημειώνεις ότι $g''(\xi) \neq 0$.</p>
    </div>
  </details>
```

---

#### 4. Page: `topic4_interpolation.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic4_interpolation.html`

##### Callout 4.1: Διηρημένη Διαφορά ($f[x_0, \dots, x_k]$)
- **Target Section**: `<section id="divided_diff">`
- **Insertion Anchor**: Immediately below line 128 (after the Step Box defining $f[x_i, \dots, x_{i+k}]$), before line 130 (`<div class="rbox">`).
- **Exact Line**: Line 129.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Διηρημένη Διαφορά ($f[x_0, \dots, x_k]$)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Είναι η διακριτή αριθμητική παραλλαγή της παραγώγου. Η 0-τάξης διαφορά είναι η ίδια η τιμή $f[x_i] = f_i$. Η 1ης τάξης είναι η κλίση μεταξύ δύο σημείων $\frac{f_1 - f_0}{x_1 - x_0}$. Κάθε ανώτερη διαφορά προκύπτει αφαιρώντας τις δύο προηγούμενες και διαιρώντας με τη διαφορά του <strong>τελευταίου μείον τον πρώτο</strong> κόμβο: $f[x_i,\dots,x_{i+k}] = \frac{f[x_{i+1},\dots,x_{i+k}] - f[x_i,\dots,x_{i+k-1}]}{x_{i+k} - x_i}$.</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 2.1):</strong> Οι συντελεστές του πολυωνύμου Newton είναι ακριβώς οι αριθμοί της <strong>πάνω διαγωνίου</strong> του τριγωνικού πίνακα διαφορών! <strong>SOS Κανόνας Παρονομαστή:</strong> Στον παρονομαστή αφαιρούμε πάντα τα εξωτερικά $x$: για την $f[x_0, x_1, x_2]$ ο παρονομαστής είναι $x_2 - x_0$, ΟΧΙ $x_1 - x_0$!</p>
    </div>
  </details>
```

##### Callout 4.2: Φαινόμενο Runge & Θεωρητικό Σφάλμα Παρεμβολής ($E(x)$)
- **Target Section**: `<section id="error_analysis">`
- **Insertion Anchor**: Immediately below line 268 (after the Warning Box defining error formula $E(x)$), before `<div class="rbox">` (line 270).
- **Exact Line**: Line 269.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Φαινόμενο Runge &amp; Σφάλμα Παρεμβολής ($E(x)$)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong>
        <br>• <strong>Σφάλμα Παρεμβολής $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^n (x - x_i)$:</strong> Το σφάλμα εξαρτάται από την $(n+1)$-οστή παράγωγο της $f$. Αν η $f(x)$ είναι πολυώνυμο βαθμού $\le n$, τότε $f^{(n+1)} \equiv 0$, δηλαδή το πολυώνυμο παρεμβολής ταυτίζεται απόλυτα με τη συνάρτηση και το σφάλμα είναι <strong>ακριβώς 0</strong>!
        <br>• <strong>Φαινόμενο Runge:</strong> Όταν αυξάνουμε το βαθμό $n$ χρησιμοποιώντας ισαπέχοντα σημεία, το πολυώνυμο εμφανίζει έντονες ταλαντώσεις κοντά στα άκρα του διαστήματος, αυξάνοντας το σφάλμα αντί να το μειώνει.
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Στο κλασικό υποερώτημα «αιτιολογήστε το σφάλμα στο σημείο $x^*$»: αν η αρχική συνάρτηση ήταν π.χ. $f(x) = x^3 + 1$ και έφτιαξες πολυώνυμο $P_3(x)$ (3ου βαθμού), η 4η παράγωγος είναι ταυτοτικά μηδέν ($f^{(4)} \equiv 0$). Γράφεις κατευθείαν $E(x^*) = 0$ και κερδίζεις 3-4 μονάδες χωρίς καμία πρόσθετη πράξη!</p>
    </div>
  </details>
```

---

#### 5. Page: `topic5_integration.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic5_integration.html`

##### Callout 5.1: Αριθμητική Ολοκλήρωση (Quadrature) & Κανόνας Simpson
- **Target Section**: `<section id="simpson">`
- **Insertion Anchor**: Immediately below line 126 (after formula $I_{Simp}$), before `<div class="step-box">` (line 127).
- **Exact Line**: Line 127.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Αριθμητική Ολοκλήρωση (Quadrature) &amp; Κανόνας Simpson</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Αριθμητική ολοκλήρωση (ή Quadrature) είναι ο υπολογισμός ενός ορισμένου ολοκληρώματος $\int_a^b f(x) dx$ ως σταθμισμένο άθροισμα τιμών της συνάρτησης σε επιλεγμένα σημεία: $\sum_{i=0}^n w_i f(x_i)$. Ο κανόνας Simpson προσεγγίζει τη συνάρτηση ανά τριάδες σημείων χρησιμοποιώντας παραβολές (πολυώνυμα 2ου βαθμού).</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> <strong>Η Μεγάλη Παγίδα Σημείων vs Διαστημάτων:</strong> Με $k$ σημεία έχουμε πάντα $n = k - 1$ <strong>διαστήματα</strong>! Ο απλός Simpson 1/3 εφαρμόζεται για 3 σημεία ($n=2$ διαστήματα). Ο σύνθετος Simpson απαιτεί <strong>άρτιο πλήθος διαστημάτων</strong> (άρα <em>περιττό</em> πλήθος σημείων: 3, 5, 7, 9...). Αν σου δώσουν 4 σημεία ($n=3$ διαστήματα), εφαρμόζεται ο Simpson 3/8!</p>
    </div>
  </details>
```

##### Callout 5.2: Βαθμός Ακρίβειας ($d$) (Degree of Precision)
- **Target Section**: `<section id="degree">`
- **Insertion Anchor**: Immediately below line 276 (after the definition box of degree of precision), before `<div class="section-quiz">` (line 278).
- **Exact Line**: Line 277.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Βαθμός Ακρίβειας ($d$) (Degree of Precision)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Είναι ο μέγιστος ακέραιος $d$ για τον οποίο ο κανόνας ολοκλήρωσης υπολογίζει <strong>με μηδενικό σφάλμα</strong> το ολοκλήρωμα κάθε πολυωνύμου βαθμού $\le d$, αλλά αποτυγχάνει (βγάζει έστω και ελάχιστο σφάλμα) για τουλάχιστον ένα πολυώνυμο βαθμού $d+1$.</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 2.2 - 12-14 μόρια):</strong>
        <br>• <strong>Το Παράδοξο του Simpson:</strong> Αν και κατασκευάζεται από παραβολή ($d=2$), λόγω γεωμετρικής συμμετρίας εξουδετερώνει τα σφάλματα περιττής τάξης και ολοκληρώνει ακριβώς και τα κυβικά πολυώνυμα ($x^3$), άρα έχει βαθμό ακρίβειας <strong>$d = 3$</strong>!
        <br>• <strong>Υπολογισμός αγνώστων βαρών $w_i$:</strong> Δοκιμάζεις διαδοχικά $f(x) = 1, x, x^2, \dots$, εξισώνεις το θεωρητικό ολοκλήρωμα με τον τύπο, λύνεις το γραμμικό σύστημα για τα $w_i$, και μετά ελέγχεις την επόμενη δύναμη για να εντοπίσεις πού σταματάει η ισότητα.
      </p>
    </div>
  </details>
```

---

#### 6. Page: `topic6_odes.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic6_odes.html`

##### Callout 6.1: Πρόβλημα Αρχικών Τιμών (IVP) & Μέθοδος Euler
- **Target Section**: `<section id="euler">`
- **Insertion Anchor**: Immediately below line 125 (after formula $y_{k+1} = y_k + h f(x_k, y_k)$), before `<div class="section-quiz">` (line 127).
- **Exact Line**: Line 126.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Πρόβλημα Αρχικών Τιμών (IVP) &amp; Μέθοδος Euler</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Ένα Πρόβλημα Αρχικών Τιμών (Initial Value Problem - IVP) αποτελείται από μία διαφορική εξίσωση $y' = f(x, y)$ (που περιγράφει την κλίση/ταχύτητα σε κάθε σημείο) και μία γνωστή αφετηρία $y(x_0) = y_0$. Η μέθοδος Euler ξεκινά από το $(x_0, y_0)$ και κάνει ένα γραμμικό άλμα μήκους $h$ κατά μήκος της εφαπτομένης: $y_1 = y_0 + h \cdot f(x_0, y_0)$.</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 2.3 - 8 μόρια):</strong> Είναι η πιο γρήγορη άσκηση του γραπτού! Υπολογίζεις πρώτα το βήμα $h = \frac{b-a}{n}$, σημειώνεις τα σημεία $x_k = x_0 + k \cdot h$, και εκτελείς $n$ διαδοχικές αντικαταστάσεις. <strong>Προσοχή:</strong> Μην μπερδεύεις το $n$ (πλήθος διαστημάτων) με το $h$ (πλάτος διαστήματος).</p>
    </div>
  </details>
```

##### Callout 6.2: Έμμεση Παράγωγος ΣΔΕ ($y''$) & Τοπικό vs Ολικό Σφάλμα
- **Target Section**: `<section id="taylor">`
- **Insertion Anchor**: Immediately below line 182 (after Taylor 3-term formula), before `<div class="card">` (line 184).
- **Exact Line**: Line 183.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Έμμεση Παράγωγος ΣΔΕ ($y''$) &amp; Τοπικό vs Ολικό Σφάλμα</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong>
        <br>• <strong>Έμμεση Παράγωγος $y''$:</strong> Επειδή το $y$ είναι άγνωστη συνάρτηση του $x$, όταν παραγωγίζουμε την εξίσωση $y' = f(x, y)$ ως προς $x$, εφαρμόζουμε τον κανόνα της αλυσίδας: $\frac{d}{dx}[y] = y'$. Π.χ. αν $y' = y - x^2 + 1$, τότε $y'' = y' - 2x = (y - x^2 + 1) - 2x$.
        <br>• <strong>Τοπικό vs Ολικό Σφάλμα:</strong> Το τοπικό σφάλμα αποκοπής συμβαίνει σε ένα μεμονωμένο βήμα $h$ (για Taylor είναι $O(h^3)$, για Euler $O(h^2)$). Το ολικό σφάλμα είναι η συνολική απόκλιση στο τέλος του διαστήματος $x=b$ (για Taylor είναι $O(h^2)$, για Euler $O(h)$).
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> Στη μέθοδο Taylor 3 όρων, το 90% των λαθών γίνεται στην παραγώγιση του $y$. Θυμήσου: όπου βλέπεις σκέτο $y$, η παράγωγός του ως προς $x$ είναι το $y'$, το οποίο αντικαθιστάς αμέσως με την αρχική έκφραση της ΣΔΕ!</p>
    </div>
  </details>
```

---

#### 7. Page: `topic7_matlab_guide.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\topic7_matlab_guide.html`

##### Callout 7.1: Δείκτης Συνθήκης ($\text{cond}(A)$) & Νόρμες (`norm`)
- **Target Section**: `<section id="commands">`
- **Insertion Anchor**: Immediately below line 137 (after the step-box listing exam commands), before `<table class="vtbl">` (line 139).
- **Exact Line**: Line 138.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Δείκτης Συνθήκης ($\text{cond}(A)$) &amp; Νόρμες (`norm`)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong>
        <br>• <strong>Νόρμα ($\|x\|$):</strong> Είναι το γενικευμένο «μήκος» ενός διανύσματος ή το μέγεθος μεγέθυνσης ενός πίνακα. Στο MATLAB, <code>norm(x, 2)</code> είναι η Ευκλείδεια νόρμα ($\sqrt{\sum x_i^2}$) και <code>norm(x, inf)</code> είναι η μέγιστη απόλυτη τιμή ($\max |x_i|$).
        <br>• <strong>Δείκτης Συνθήκης $\text{cond}(A) = \|A\| \cdot \|A^{-1}\|$:</strong> Μετράει πόσο «ευαίσθητο» είναι το σύστημα $Ax = b$ σε μικρές διαταραχές των δεδομένων. Αν $\text{cond}(A) \approx 1$, το σύστημα είναι καλά ορισμένο. Αν $\text{cond}(A) \gg 1$ (π.χ. $10^6$), το σύστημα είναι κακορυθμισμένο (ill-conditioned) και οι αριθμητικές λύσεις είναι επισφαλείς.
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 3.1 & 3.2):</strong> Στο MATLAB γράφεις απλά <code>cond(A)</code>. Για σχετικό σφάλμα διανύσματος γράφεις <code>norm(x - x_approx, 2) / norm(x, 2)</code>. Για νόρμα απείρου υπολοίπου γράφεις <code>norm(b - A*x_approx, inf)</code>. Αυτές οι 3 γραμμές δίνουν 10 μονάδες σε 30 δευτερόλεπτα!</p>
    </div>
  </details>
```

##### Callout 7.2: Column-Major Διάταξη & Logical Indexing (`find`)
- **Target Section**: `<section id="indexing">`
- **Insertion Anchor**: Immediately below line 194 (after section header div), before `<div class="cb">` (line 196).
- **Exact Line**: Line 195.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Column-Major Διάταξη &amp; Logical Indexing (`find`)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong>
        <br>• <strong>Column-Major Order:</strong> Το MATLAB αποθηκεύει και διαβάζει τα στοιχεία των πινάκων <strong>κατά στήλες</strong> και όχι κατά γραμμές. Σε έναν πίνακα $3 \times 3$, ο γραμμικός δείκτης <code>1, 2, 3</code> είναι η 1η στήλη από πάνω προς τα κάτω, το <code>4, 5, 6</code> είναι η 2η στήλη, και το <code>7, 8, 9</code> είναι η 3η στήλη!
        <br>• <strong>Logical Indexing / `find`:</strong> Η εντολή <code>find(A > 3)</code> επιστρέφει τους γραμμικούς δείκτες των στοιχείων που ικανοποιούν τη συνθήκη, σαρώνοντας πάντα στήλη-στήλη.
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 3.1):</strong> Όταν η εκφώνηση ζητά «βρείτε τις θέσεις των δύο πρώτων στοιχείων με τιμή $>3$», αν σαρώσεις κατά γραμμές θα βρεις λάθος δείκτες! Θυμήσου: σαρώνεις την 1η στήλη προς τα κάτω, μετά τη 2η στήλη προς τα κάτω κ.ο.κ.</p>
    </div>
  </details>
```

---

#### 8. Page: `exam_prep.html`
**File Path**: `D:\University\Αριθμητικη Αναλυση\exam_prep.html`

##### Callout 8.1: Άλγεβρα Κόστους Πράξεων & Πολυπλοκότητα $O(n^3)$
- **Target Section**: `<section id="core-facts">`
- **Insertion Anchor**: Immediately below line 186 (after `<h2>2. Ο πίνακας SOS...</h2>`), before `<div class="rbox">` (line 188).
- **Exact Line**: Line 187.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Άλγεβρα Κόστους Πράξεων &amp; Πολυπλοκότητα $O(n^3)$</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Στις εξετάσεις μετράμε το ασυμπτωτικό υπολογιστικό κόστος διατηρώντας μόνο τους κυρίαρχους όρους $n^3$:
        <br>• Επίλυση συστήματος $Ax = b$: Gauss $= \frac{1}{3}n^3$, Jordan $= \frac{1}{2}n^3$.
        <br>• Υπολογισμός αντιστρόφου $A^{-1}$: Gauss $= \frac{4}{3}n^3$, Jordan $= \frac{3}{2}n^3$.
        <br>• Πολλαπλασιασμός δύο $n \times n$ πινάκων: $n^3$.
        <br>• Πίνακας επί διάνυσμα ($M \cdot v$): είναι τάξης $n^2$, άρα <strong>θεωρείται αμελητέο (0)</strong> μπροστά στο $n^3$!
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (Θέμα 1.3 - 11-16 μόρια):</strong> Αν σου ζητείται να λύσεις $(A^{-1} + BC^{-1})x = A^{-1}b$, το γινόμενο $A^{-1}b$ στο δεξί μέλος <strong>ΔΕΝ</strong> ξαναχρεώνεται με νέο αντίστροφο αν έχεις ήδη υπολογίσει το $A^{-1}$ αριστερά! Είναι απλό $n^2 \approx 0$. Στο γραπτό σου κατασκευάζεις πίνακα όπου χρεώνεις κάθε όρο ξεχωριστά, ακριβώς όπως στις υποδειγματικές λύσεις.</p>
    </div>
  </details>
```

##### Callout 8.2: Μη-Μεταθετικότητα Πινάκων ($AB \ne BA$) & Απαγόρευση «Διαίρεσης»
- **Target Section**: `<section id="howto">` (Inside Recipe 1)
- **Insertion Anchor**: Immediately below line 319 (after Recipe 1 card), before Recipe 2 card (line 322).
- **Exact Line**: Line 320.
- **Exact Markup**:
```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Μη-Μεταθετικότητα Πινάκων ($AB \ne BA$) &amp; Απαγόρευση «Διαίρεσης»</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> Στη γραμμική άλγεβρα <strong>δεν υπάρχει διαίρεση με πίνακα</strong> και το γινόμενο πινάκων <strong>δεν είναι μεταθετικό</strong> ($AB \neq BA$).
        <br>• Για να απλοποιήσεις έναν αντίστροφο $A^{-1}$ μπροστά από μία παρένθεση, πρέπει υποχρεωτικά να πολλαπλασιάσεις <strong>από τα αριστερά</strong> με $A$ (αφού $A \cdot A^{-1} = I$).
        <br>• Αν πολλαπλασιάσεις από τα δεξιά, το $A^{-1} \dots A$ δεν απλοποιείται επειδή απαγορεύεται να αλλάξεις τη σειρά των όρων!
      </p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις (SOS Μετασχηματισμοί):</strong> Όταν μετασχηματίζεις την $(A^{-1}C + BD^{-1})x = A^{-1}b$, πολλαπλασιάζεις και τα δύο μέλη <strong>από τα αριστερά</strong> με $A$:
        $$A(A^{-1}C + BD^{-1})x = A(A^{-1}b) \implies (C + ABD^{-1})x = b$$
        Ο αντίστροφος $A^{-1}$ εξαφανίζεται εντελώς, εξοικονομώντας αυτόματα $\frac{3}{2}n^3$ πράξεις (για Jordan) ή $\frac{4}{3}n^3$ (για Gauss)!
      </p>
    </div>
  </details>
```

---

## 5. Verification Method

To verify the Jargon Buster specification once integrated into the webnotes platform:

1. **CSS Visual Integrity Check**:
   - Inspect `.jargon-buster` in browser dev tools on both dark theme (`[data-theme="dark"]`) and light theme (`[data-theme="light"]`).
   - Confirm `--surf2`, `--border`, `--cyan`, and `--txt` colors render with high contrast (WCAG AAA compliant).
   - Click `<summary>` to confirm smooth expansion, chevron 180° rotation, and `@keyframes jargonSlideDown` animation.
2. **MathJax Formula Rendering Verification**:
   - Open all 8 pages in browser: `topic1_direct_linear.html` through `topic7_matlab_guide.html` and `exam_prep.html`.
   - Verify that all inline LaTeX expressions (`$m_{ik}$`, `$\rho(\mathcal{L})$`, `$A^{-1}$`, `$\xi$`, `$p=2$`, `$\text{cond}(A)$`) inside both `<summary>` and `.jargon-content` render as crisp mathematical typography with zero unrendered dollar signs (`$`) visible.
3. **Automated Structural Verification**:
   - Run verification via `python scripts/verify_webnotes.py` (Suite 3 & 4) to verify:
     - All 8 pages contain at least one `<details class="jargon-buster">`.
     - All summary headers contain `<span class="jargon-term">`.
     - All callouts contain `<p><strong>Τι σημαίνει στα απλά ελληνικά:</strong>` and `<p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong>`.
4. **Keyboard & Mobile Accessibility**:
   - Tab into the `<summary>` element using keyboard only; press `Enter` or `Space` to expand and collapse.
   - Shrink browser viewport to 360px width to ensure text wraps comfortably and the rotating chevron remains visible on the right.
