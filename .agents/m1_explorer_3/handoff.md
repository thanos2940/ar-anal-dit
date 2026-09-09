# Handoff Report: Site Navigation & Reciprocal Link Integration Specification

**Agent**: M1 Explorer 3  
**Working Directory**: `D:\University\Αριθμητικη Αναλυση\.agents\m1_explorer_3`  
**Date**: 2026-09-03  
**Mission**: Deliver an exact, copy-paste-ready navigation architecture blueprint for integrating `prerequisites.html` into `js/nav.js` and `index.html`, and establishing reciprocal prerequisite callouts across all 10 existing site pages (`topic1` through `topic7`, `exam_prep.html`, `flashcards.html`, `interactive_quiz.html`).

---

## 1. Observation

### 1.1 `js/nav.js` Current State
Direct inspection of `D:\University\Αριθμητικη Αναλυση\js\nav.js` reveals:
1. **`SVG_ICONS` Dictionary** (`js/nav.js:62`):
   Contains the required book icon:
   ```javascript
   book: `<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
   ```
2. **`topics` Array** (`js/nav.js:104-116`):
   ```javascript
   const topics = [
       { id: 'index', title: 'Home', path: 'index.html', icon: SVG_ICONS.home },
       { id: 'topic1', title: '1. Gauss & Jordan', path: 'topic1_direct_linear.html', icon: SVG_ICONS.cpu, subpages: [] },
       { id: 'topic2', title: '2. Επαναληπτικές (GS/SOR)', path: 'topic2_iterative_linear.html', icon: SVG_ICONS.radio, subpages: [] },
       { id: 'topic3', title: '3. Μη Γραμμικές (Newton)', path: 'topic3_nonlinear.html', icon: SVG_ICONS.zap, subpages: [] },
       { id: 'topic4', title: '4. Παρεμβολή Newton', path: 'topic4_interpolation.html', icon: SVG_ICONS.distance, subpages: [] },
       { id: 'topic5', title: '5. Ολοκλήρωση Simpson', path: 'topic5_integration.html', icon: SVG_ICONS.barChart, subpages: [] },
       { id: 'topic6', title: '6. Αριθμητική ΣΔΕ', path: 'topic6_odes.html', icon: SVG_ICONS.fork, subpages: [] },
       { id: 'topic7', title: '7. MATLAB Guide', path: 'topic7_matlab_guide.html', icon: SVG_ICONS.terminal, subpages: [] },
       { id: 'examprep', title: 'Exam Prep 🎯', path: 'exam_prep.html', icon: SVG_ICONS.gradCap },
       { id: 'quiz', title: 'Interactive Quiz', path: 'interactive_quiz.html', icon: SVG_ICONS.fileQuestion },
       { id: 'flashcards', title: 'Flashcards Test 🗂️', path: 'flashcards.html', icon: SVG_ICONS.fileQuestion }
   ];
   ```
3. **Active Page Detection** (`js/nav.js:123, 140-142`):
   ```javascript
   const currentPath = window.location.pathname.split('/').pop() || 'index.html';
   ...
   if (currentPath === topic.path) {
       link.classList.add('active');
   }
   ```
4. **Hub Progress Integration** (`js/nav.js:325-352`):
   `renderHubProgress()` iterates through `topics` and safely looks up quiz stats:
   ```javascript
   topics.forEach(topic => {
       const stat = store.topics[topic.id];
       if (!stat || !stat.t) return;
       const card = grid.querySelector('a.topic-card[href="' + topic.path + '"]');
       if (!card) return;
       ...
   ```
   Adding `id: 'prerequisites'` is safe because `stat` will simply be undefined and return cleanly.

### 1.2 `index.html` Current State
Direct inspection of `D:\University\Αριθμητικη Αναλυση\index.html` reveals:
1. **Hero Header** (`index.html:124-132`):
   ```html
   <div class="hub-hero">
       <div class="hero-label">ΕΚΠΑ · ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ & ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ</div>
       <h1>Αριθμητική Ανάλυση</h1>
       <p>Διαδραστικός οδηγός μελέτης <strong>PASS Mode</strong>, χτισμένος πάνω σε <strong>έξι πλήρη γραπτά με λύσεις</strong>...</p>

       <div class="search-container">
           <input type="text" id="topic-search" placeholder="Αναζήτηση θεμάτων, Gauss, Newton, Simpson, MATLAB...">
       </div>
   </div>
   ```
   No hero callout or CTA badge exists pointing students with zero background to start at `prerequisites.html`.
2. **Topic Grid (`.topics-grid`)** (`index.html:134-252`):
   Contains 1 full-width hero card (`exam_prep.html`, lines 137-150) followed immediately by `TOPIC 01` (`topic1_direct_linear.html`, line 153). No card exists for Topic 0 / Prerequisites.
3. **Search Interaction** (`js/nav.js:225-231`):
   `initSearch()` compares `searchInput.value` against `card.innerText.toLowerCase()`. Any text within the card (title, description, tags) will be matched automatically by the existing search engine.

### 1.3 Site Pages & Wrapper Conventions
All 11 existing pages link to `styles/base.css` (verified via grep).
1. **Topic Pages (`topic1` to `topic7`) and `exam_prep.html`** share the exact same macro layout:
   - `<div id="site-nav"></div>`
   - `<div class="hero">...</div>`
   - `<nav class="toc">...</nav>`
   - `<div class="wrap">`
   - Top section (e.g. `<!-- 🎯 ESSENCE SECTION -->` in topics 1–7, `<!-- ============ SECTION 1: STRATEGY ============ -->` in exam prep).
2. **`flashcards.html`**:
   - `<div class="hero">...</div>`
   - `<div id="fc-test" class="fctest-wrap">`
   - `<div id="fc-start" class="fctest-card">` with chapter selector.
3. **`interactive_quiz.html`**:
   - `<main class="quiz-app-container">`
   - `<div id="start-screen" class="glass-card start-screen">`
4. **Current Reciprocal Links**:
   Zero pages currently contain an inline link to `prerequisites.html`.

---

## 2. Logic Chain

```
[Observation 1.1: topics array in js/nav.js defines sidebar items]
         │
         ▼
[Deduction 1: Adding { id: 'prerequisites', title: '0. Προαπαιτούμενα', path: 'prerequisites.html', icon: SVG_ICONS.book } at index 1 registers the page across all 11 existing HTML pages instantly via DOM injection]
         │
         ▼
[Observation 1.1: currentPath = pathname.split('/').pop() || 'index.html']
         │
         ▼
[Deduction 2: When visiting prerequisites.html, currentPath === 'prerequisites.html' evaluates true and applies .active class automatically with zero script side-effects]

─────────────────────────────────────────────────────────────────────────────

[Observation 1.2: index.html has hero section and .topics-grid]
         │
         ▼
[Requirement R1 & DISPATCH: High-visibility card in .topics-grid + Hero CTA banner]
         │
         ▼
[Deduction 3: Placing a pill CTA in .hub-hero directs zero-background students before the search bar; placing a Step 0 card in .topics-grid right after the full-width exam_prep card establishes natural curriculum order]

─────────────────────────────────────────────────────────────────────────────

[Observation 1.3: All topic pages share <div class="wrap"> right below <nav class="toc">]
         │
         ▼
[Requirement R1 & Acceptance Criteria: Reciprocal links from all 7 topics, exam_prep, flashcards, quiz]
         │
         ▼
[Deduction 4: Placing a standardized, responsive .prereq-callout at the top of <div class="wrap"> ensures immediate visibility without disrupting the table of contents or scrollspy navigation]
         │
         ▼
[Pedagogical requirement: Zero-to-hero target audience]
         │
         ▼
[Deduction 5: Tailoring each callout to the specific prerequisite concept required by that topic (matrix operations, derivatives, inequalities, etc.) and deep-linking to corresponding anchors in prerequisites.html maximizes utility]
```

---

## 3. Caveats

1. **Prerequisites Section Anchors Contract**: The reciprocal links designed below utilize 6 standard anchor IDs: `#sec-matrices`, `#sec-row-ops`, `#sec-identity-inverse`, `#sec-derivatives`, `#sec-inequalities`, and `#sec-iteration-error`. The implementation agent creating `prerequisites.html` (M1 Builder 1) must ensure these `<section id="...">` elements are present.
2. **Search Keyword Preservation**: The text inside the prerequisites card in `index.html` includes Greek keywords ("Προαπαιτούμενα", "Πίνακες", "Γραμμοπράξεις", "Παράγωγοι", "Απόλυτα", "Σφάλμα") so that typing any of these terms in `#topic-search` displays the card.
3. **Responsive Spacing**: On mobile screens (< 600px), `.prereq-callout` switches flex direction from row to column to prevent icon clipping.

---

## 4. Conclusion & Implementation Specifications

### 4.1 Modification 1: `js/nav.js` Registration

#### Target File: `D:\University\Αριθμητικη Αναλυση\js\nav.js`
#### Location: Lines 104–116

**Target Content to Replace:**
```javascript
const topics = [
    { id: 'index', title: 'Home', path: 'index.html', icon: SVG_ICONS.home },
    { id: 'topic1', title: '1. Gauss & Jordan', path: 'topic1_direct_linear.html', icon: SVG_ICONS.cpu, subpages: [] },
    { id: 'topic2', title: '2. Επαναληπτικές (GS/SOR)', path: 'topic2_iterative_linear.html', icon: SVG_ICONS.radio, subpages: [] },
    { id: 'topic3', title: '3. Μη Γραμμικές (Newton)', path: 'topic3_nonlinear.html', icon: SVG_ICONS.zap, subpages: [] },
    { id: 'topic4', title: '4. Παρεμβολή Newton', path: 'topic4_interpolation.html', icon: SVG_ICONS.distance, subpages: [] },
    { id: 'topic5', title: '5. Ολοκλήρωση Simpson', path: 'topic5_integration.html', icon: SVG_ICONS.barChart, subpages: [] },
    { id: 'topic6', title: '6. Αριθμητική ΣΔΕ', path: 'topic6_odes.html', icon: SVG_ICONS.fork, subpages: [] },
    { id: 'topic7', title: '7. MATLAB Guide', path: 'topic7_matlab_guide.html', icon: SVG_ICONS.terminal, subpages: [] },
    { id: 'examprep', title: 'Exam Prep 🎯', path: 'exam_prep.html', icon: SVG_ICONS.gradCap },
    { id: 'quiz', title: 'Interactive Quiz', path: 'interactive_quiz.html', icon: SVG_ICONS.fileQuestion },
    { id: 'flashcards', title: 'Flashcards Test 🗂️', path: 'flashcards.html', icon: SVG_ICONS.fileQuestion }
];
```

**Replacement Content:**
```javascript
const topics = [
    { id: 'index', title: 'Home', path: 'index.html', icon: SVG_ICONS.home },
    { id: 'prerequisites', title: '0. Προαπαιτούμενα', path: 'prerequisites.html', icon: SVG_ICONS.book },
    { id: 'topic1', title: '1. Gauss & Jordan', path: 'topic1_direct_linear.html', icon: SVG_ICONS.cpu, subpages: [] },
    { id: 'topic2', title: '2. Επαναληπτικές (GS/SOR)', path: 'topic2_iterative_linear.html', icon: SVG_ICONS.radio, subpages: [] },
    { id: 'topic3', title: '3. Μη Γραμμικές (Newton)', path: 'topic3_nonlinear.html', icon: SVG_ICONS.zap, subpages: [] },
    { id: 'topic4', title: '4. Παρεμβολή Newton', path: 'topic4_interpolation.html', icon: SVG_ICONS.distance, subpages: [] },
    { id: 'topic5', title: '5. Ολοκλήρωση Simpson', path: 'topic5_integration.html', icon: SVG_ICONS.barChart, subpages: [] },
    { id: 'topic6', title: '6. Αριθμητική ΣΔΕ', path: 'topic6_odes.html', icon: SVG_ICONS.fork, subpages: [] },
    { id: 'topic7', title: '7. MATLAB Guide', path: 'topic7_matlab_guide.html', icon: SVG_ICONS.terminal, subpages: [] },
    { id: 'examprep', title: 'Exam Prep 🎯', path: 'exam_prep.html', icon: SVG_ICONS.gradCap },
    { id: 'quiz', title: 'Interactive Quiz', path: 'interactive_quiz.html', icon: SVG_ICONS.fileQuestion },
    { id: 'flashcards', title: 'Flashcards Test 🗂️', path: 'flashcards.html', icon: SVG_ICONS.fileQuestion }
];
```

---

### 4.2 Modification 2: `styles/base.css` Callout Styling

#### Target File: `D:\University\Αριθμητικη Αναλυση\styles\base.css`
#### Location: Append after line 547 (after `.rbox` / `.lbl` definitions)

```css
/* ==========================================================================
   Prerequisite Reciprocal Callout (.prereq-callout)
   ========================================================================== */
.prereq-callout {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: linear-gradient(135deg, rgba(88, 166, 255, 0.08), rgba(88, 166, 255, 0.02));
    border: 1px solid rgba(88, 166, 255, 0.28);
    border-left: 4px solid var(--blue);
    border-radius: 12px;
    padding: 16px 20px;
    margin: 20px 0 28px;
    transition: var(--transition);
}
.prereq-callout:hover {
    border-color: rgba(88, 166, 255, 0.45);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.prereq-callout .prereq-icon {
    font-size: 1.6rem;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 2px;
}
.prereq-callout .prereq-content {
    flex: 1;
    min-width: 0;
}
.prereq-callout .prereq-badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--blue);
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 4px;
}
.prereq-callout .prereq-title {
    font-family: 'Syne', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--txt);
    margin-bottom: 6px;
}
.prereq-callout .prereq-text {
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--muted);
    margin: 0 0 10px;
}
.prereq-callout .prereq-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.88rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    color: var(--blue);
    text-decoration: underline;
    transition: var(--transition);
}
.prereq-callout .prereq-link:hover {
    color: #8cc4ff;
    text-decoration: none;
    transform: translateX(3px);
}
@media (max-width: 600px) {
    .prereq-callout {
        flex-direction: column;
        gap: 10px;
        padding: 14px 16px;
    }
}
```

---

### 4.3 Modification 3: `index.html` Hero CTA & Topics Grid Card

#### Target File: `D:\University\Αριθμητικη Αναλυση\index.html`

#### 4.3.1 Hero CTA Banner (Location: Between line 127 and 129)
**Target Content to Replace (lines 127-130):**
```html
        <p>Διαδραστικός οδηγός μελέτης <strong>PASS Mode</strong>, χτισμένος πάνω σε <strong>έξι πλήρη γραπτά με λύσεις</strong>. Εστιασμένος στα επαναλαμβανόμενα μοτίβα: Gauss/Jordan &amp; οδήγηση, μετασχηματισμοί πολυπλοκότητας, σταθερό σημείο, παρεμβολή Newton, Simpson και MATLAB drills.</p>

        <div class="search-container">
```

**Replacement Content:**
```html
        <p>Διαδραστικός οδηγός μελέτης <strong>PASS Mode</strong>, χτισμένος πάνω σε <strong>έξι πλήρη γραπτά με λύσεις</strong>. Εστιασμένος στα επαναλαμβανόμενα μοτίβα: Gauss/Jordan &amp; οδήγηση, μετασχηματισμοί πολυπλοκότητας, σταθερό σημείο, παρεμβολή Newton, Simpson και MATLAB drills.</p>

        <!-- ZERO-BACKGROUND CTA CALLOUT -->
        <div class="hero-prereq-cta" style="margin-bottom: 28px;">
            <a href="prerequisites.html" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(88, 166, 255, 0.12); border: 1px solid rgba(88, 166, 255, 0.4); padding: 10px 22px; border-radius: 50px; color: var(--txt); text-decoration: none; font-size: 0.95rem; transition: all 0.2s ease;">
                <span style="font-size: 1.25rem; line-height: 1;">📖</span>
                <span>Ξεκινάς από το μηδέν; <strong>Μαθηματικά από το Μηδέν (Step 0) &rarr;</strong></span>
            </a>
        </div>

        <div class="search-container">
```

#### 4.3.2 Card in `.topics-grid` (Location: Immediately after line 150, before `<!-- TOPIC 01 -->`)
**Target Content to Insert before `<!-- TOPIC 01 -->`:**
```html
        <!-- TOPIC 00: PREREQUISITES -->
        <a href="prerequisites.html" class="topic-card" style="border-color: var(--blue); background: linear-gradient(135deg, var(--surf), rgba(88, 166, 255, 0.08));">
            <div class="topic-num" style="color: var(--blue);">TOPIC 00 · FOUNDATIONS</div>
            <h3>0. Προαπαιτούμενα Μαθηματικά 📖</h3>
            <p>Ανατομία πινάκων ($m \times n$, γραμμές, δείκτες $a_{ij}$), πολλαπλασιασμός &amp; πρόσθεση, πράξεις γραμμών χωρίς παγίδες προσήμων, μοναδιαίος &amp; αντίστροφος $A^{-1}$, βασικές παράγωγοι, ανισότητες απολύτων $|g'(x)| < 1$ και σφάλμα επανάληψης.</p>
            <div class="topic-tags">
                <span class="tag" style="border-color: rgba(88, 166, 255, 0.4); color: var(--blue); font-weight: bold;">STEP 0</span>
                <span class="tag">Πίνακες</span>
                <span class="tag">Γραμμοπράξεις</span>
                <span class="tag">Παράγωγοι</span>
                <span class="tag">Απόλυτα</span>
                <span class="tag">Σφάλμα</span>
            </div>
        </a>
```

---

### 4.4 Modification 4: Reciprocal Prerequisite Callouts Across All 10 Pages

| # | Page | Target File | Insertion Point (Line) | Prerequisite Target | Deep Link Anchor |
|---|---|---|---|---|---|
| 1 | Topic 1: Gauss & Jordan | `topic1_direct_linear.html` | Inside `<div class="wrap">` (line 86), before `<!-- 🎯 ESSENCE SECTION -->` (line 88) | Matrix anatomy & row ops sign trap | `prerequisites.html#sec-matrices` |
| 2 | Topic 2: Iterative Linear | `topic2_iterative_linear.html` | Inside `<div class="wrap">` (line 85), before `<!-- 🎯 ESSENCE SECTION -->` (line 87) | Matrix splitting, $D^{-1}$, error bound | `prerequisites.html#sec-iteration-error` |
| 3 | Topic 3: Nonlinear Eq | `topic3_nonlinear.html` | Inside `<div class="wrap">` (line 79), before `<!-- 🎯 ESSENCE SECTION -->` (line 81) | Derivatives & absolute inequalities $|g'(x)| < 1$ | `prerequisites.html#sec-inequalities` |
| 4 | Topic 4: Interpolation | `topic4_interpolation.html` | Inside `<div class="wrap">` (line 78), before `<!-- 🎯 ESSENCE SECTION -->` (line 80) | Subtraction signs & truncation error | `prerequisites.html#sec-row-ops` |
| 5 | Topic 5: Integration | `topic5_integration.html` | Inside `<div class="wrap">` (line 78), before `<!-- 🎯 ESSENCE SECTION -->` (line 80) | Polynomial integration & weight linear systems | `prerequisites.html#sec-derivatives` |
| 6 | Topic 6: ODEs | `topic6_odes.html` | Inside `<div class="wrap">` (line 78), before `<!-- 🎯 ESSENCE SECTION -->` (line 80) | Chain rule for $y'' = f_x + f_y y'$ & Taylor 3-term | `prerequisites.html#sec-derivatives` |
| 7 | Topic 7: MATLAB Guide | `topic7_matlab_guide.html` | Inside `<div class="wrap">` (line 84), before `<!-- 🎯 ESSENCE SECTION -->` (line 86) | Matrix size $m \times n$, indexing, `eye(n)`, `inv(A)` | `prerequisites.html#sec-matrices` |
| 8 | Exam Prep Hub | `exam_prep.html` | Inside `<div class="wrap">` (line 108), before `<!-- ============ SECTION 1: STRATEGY ============ -->` (line 110) | Comprehensive 6 foundation pillars | `prerequisites.html` |
| 9 | Flashcards Hub | `flashcards.html` | Inside `<div id="fc-start" class="fctest-card">` (line 52), after intro paragraph (line 54) | Definitions & identities quick review | `prerequisites.html` |
| 10 | Interactive Quiz | `interactive_quiz.html` | Inside `<div id="start-screen">` (line 59), after intro paragraph (line 61) | Foundations review before quiz attempt | `prerequisites.html` |

#### Detailed HTML Snippets per Page:

#### 1. `topic1_direct_linear.html`
Insert immediately after `<div class="wrap">` (line 86):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Ξεκινάς τώρα με την Απαλοιφή Gauss και τους Πίνακες;</div>
      <p class="prereq-text">
        Αν έχεις αμφιβολία για την ανατομία των πινάκων ($m \times n$, γραμμές $\times$ στήλες), τον υπολογισμό του πολλαπλασιαστή $m_{ik} = a_{ik}/a_{kk}$ ή θέλεις να αποφύγεις την κλασική παγίδα προσήμου στις γραμμοπράξεις ($R_i \leftarrow R_i - m R_k$), δες πρώτα τα θεμέλια.
      </p>
      <a href="prerequisites.html#sec-matrices" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Πίνακες &amp; Γραμμοπράξεις &rarr;</a>
    </div>
  </div>
```

#### 2. `topic2_iterative_linear.html`
Insert immediately after `<div class="wrap">` (line 85):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Προαπαιτούμενα για τις Επαναληπτικές Μεθόδους (Jacobi / GS / SOR)</div>
      <p class="prereq-text">
        Η ανάλυση επαναληπτικών μεθόδων στηρίζεται στον πολλαπλασιασμό πινάκων, στην αντιστροφή του διαγώνιου πίνακα $D^{-1} = \text{diag}(1/a_{ii})$ και στη μέτρηση του σφάλματος επανάληψης ($|x^{(k)} - \xi|$). Φρεσκάρισε τις βάσεις σου πριν ξεκινήσεις.
      </p>
      <a href="prerequisites.html#sec-iteration-error" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Πίνακες &amp; Σφάλμα Επανάληψης &rarr;</a>
    </div>
  </div>
```

#### 3. `topic3_nonlinear.html`
Insert immediately after `<div class="wrap">` (line 79):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Προαπαιτούμενα για Σταθερό Σημείο &amp; Newton-Raphson</div>
      <p class="prereq-text">
        Ο έλεγχος σύγκλισης απαιτεί άμεσο υπολογισμό παραγώγων $g'(x)$, εύρεση κρίσιμων σημείων και επίλυση ανισώσεων με απόλυτη τιμή ($|g'(\xi)| < 1 \iff -1 < g'(\xi) < 1$) χωρίς λάθη στην αναστροφή ανισότητας.
      </p>
      <a href="prerequisites.html#sec-inequalities" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Παράγωγοι &amp; Ανισότητες Απολύτων &rarr;</a>
    </div>
  </div>
```

#### 4. `topic4_interpolation.html`
Insert immediately after `<div class="wrap">` (line 78):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Προαπαιτούμενα για την Παρεμβολή Newton &amp; Διηρημένες Διαφορές</div>
      <p class="prereq-text">
        Η κατασκευή του πίνακα διηρημένων διαφορών και ο σχηματισμός του $P_n(x)$ απαιτούν προσεκτική διαχείριση αρνητικών προσήμων στους παρονομαστές $(x_i - x_{i-k})$ και σαφή κατανόηση του σφάλματος αποκοπής.
      </p>
      <a href="prerequisites.html#sec-row-ops" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Αριθμητική Προσήμων &amp; Σφάλμα &rarr;</a>
    </div>
  </div>
```

#### 5. `topic5_integration.html`
Insert immediately after `<div class="wrap">` (line 78):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Προαπαιτούμενα για Αριθμητική Ολοκλήρωση &amp; Βάρη Simpson</div>
      <p class="prereq-text">
        Ο προσδιορισμός συντελεστών ολοκλήρωσης ($w_i$) και ο έλεγχος βαθμού ακρίβειας απαιτούν υπολογισμό ολοκληρωμάτων πολυωνύμων $\int x^k dx$ και επίλυση απλού γραμμικού συστήματος εξισώσεων.
      </p>
      <a href="prerequisites.html#sec-derivatives" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Ολοκληρώματα &amp; Γραμμικά Συστήματα &rarr;</a>
    </div>
  </div>
```

#### 6. `topic6_odes.html`
Insert immediately after `<div class="wrap">` (line 78):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Προαπαιτούμενα για Αριθμητική Επίλυση ΣΔΕ (Euler &amp; Taylor)</div>
      <p class="prereq-text">
        Η μέθοδος Taylor 3 όρων απαιτεί υπολογισμό της 2ης παραγώγου $y''(x) = f_x(x,y) + f_y(x,y)f(x,y)$ μέσω κανόνα αλυσίδας (chain rule). Αν χρειάζεσαι επανάληψη στις παραγώγους και στο ανάπτυγμα Taylor, δες την ειδική ενότητα.
      </p>
      <a href="prerequisites.html#sec-derivatives" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Παράγωγοι &amp; Ανάπτυγμα Taylor &rarr;</a>
    </div>
  </div>
```

#### 7. `topic7_matlab_guide.html`
Insert immediately after `<div class="wrap">` (line 84):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ΠΡΟΑΠΑΙΤΟΥΜΕΝΟ ΥΠΟΒΑΘΡΟ · STEP 0</div>
      <div class="prereq-title">Προαπαιτούμενα για το MATLAB Guide &amp; Πράξεις Πινάκων</div>
      <p class="prereq-text">
        Οι εντολές `size(A)`, `eye(n)`, `inv(A)`, `det(A)` και η γραμμική δεικτοδότηση (linear indexing) προϋποθέτουν πλήρη σαφήνεια για τις διαστάσεις $m \times n$, τα διανύσματα γραμμής/στήλης και τον μοναδιαίο πίνακα.
      </p>
      <a href="prerequisites.html#sec-matrices" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν: Ανατομία Πινάκων &amp; Αντίστροφοι &rarr;</a>
    </div>
  </div>
```

#### 8. `exam_prep.html`
Insert immediately after `<div class="wrap">` (line 108):
```html
  <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
  <div class="prereq-callout" style="border-color: rgba(88, 166, 255, 0.4); background: linear-gradient(135deg, var(--surf), rgba(88, 166, 255, 0.08));">
    <div class="prereq-icon">📖</div>
    <div class="prereq-content">
      <div class="prereq-badge">ZERO-TO-HERO FOUNDATION · STEP 0</div>
      <div class="prereq-title">Ξεκινάς τώρα την προετοιμασία για τις εξετάσεις και νιώθεις κενά;</div>
      <p class="prereq-text">
        Όλες οι πρότυπες λύσεις των 8 τύπων θεμάτων βασίζονται σε θεμελιώδεις κανόνες: πράξεις πινάκων, ασφαλείς γραμμοπράξεις χωρίς λάθη προσήμων, παραγώγους και ανισότητες απολύτων. Αν κολλήσεις σε οποιοδήποτε ενδιάμεσο βήμα, ανάτρεξε αμέσως στον οδηγό θεμελίων.
      </p>
      <a href="prerequisites.html" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν (Οδηγός Προαπαιτουμένων) &rarr;</a>
    </div>
  </div>
```

#### 9. `flashcards.html`
Insert inside `<div id="fc-start" class="fctest-card">` after `<p style="color:var(--muted);font-size:0.9rem">...` (line 54):
```html
    <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
    <div class="prereq-callout" style="margin: 16px 0;">
      <div class="prereq-icon">📖</div>
      <div class="prereq-content">
        <div class="prereq-badge">ΒΑΣΙΚΗ ΘΕΩΡΙΑ · STEP 0</div>
        <div class="prereq-title">Χρειάζεσαι επανάληψη στις βασικές μαθηματικές έννοιες;</div>
        <p class="prereq-text">
          Πριν ξεκινήσεις το τεστ θεωρίας, βεβαιώσου ότι θυμάσαι τις βασικές ιδιότητες πινάκων, παραγώγων και σφαλμάτων.
        </p>
        <a href="prerequisites.html" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν &rarr;</a>
      </div>
    </div>
```

#### 10. `interactive_quiz.html`
Insert inside `<div id="start-screen" class="glass-card start-screen">` after `<p>Επίλεξε τις ενότητες...` (line 61):
```html
            <!-- 📖 RECIPROCAL PREREQUISITE CALLOUT -->
            <div class="prereq-callout" style="margin: 16px 0; text-align: left;">
              <div class="prereq-icon">📖</div>
              <div class="prereq-content">
                <div class="prereq-badge">ΠΡΟΕΤΟΙΜΑΣΙΑ QUIZ · STEP 0</div>
                <div class="prereq-title">Έλεγξε τα προαπαιτούμενα πριν το τεστ</div>
                <p class="prereq-text">
                  Οι ερωτήσεις του quiz περιέχουν υπολογισμούς γραμμοπράξεων, πολλαπλασιαστών και ανισοτήτων. Φρεσκάρισε τις βάσεις σου αν χρειάζεσαι βοήθεια.
                </p>
                <a href="prerequisites.html" class="prereq-link">Μετάβαση στα Μαθηματικά από το Μηδέν &rarr;</a>
              </div>
            </div>
```

---

## 5. Verification Method

Once implemented by M1 Builder 1 / M1 Builder 2, independent verification can be executed via the following programmatic and manual steps:

1. **Static Link & Presence Audit**:
   Execute Python link check:
   ```powershell
   python -c "
   import os, re
   html_files = [f for f in os.listdir('.') if f.endswith('.html')]
   for hf in html_files:
       with open(hf, 'r', encoding='utf-8') as f:
           content = f.read()
       if hf != 'index.html' and hf != 'prerequisites.html':
           assert 'prerequisites.html' in content, f'Missing reciprocal link in {hf}'
   print('All non-hub HTML pages contain reciprocal links to prerequisites.html!')
   "
   ```
2. **Nav Array Integrity**:
   Verify in `js/nav.js` that `topics[1].path === 'prerequisites.html'` and `topics[1].icon === SVG_ICONS.book`.
3. **Active State Highlighting**:
   When opening `file:///D:/University/Αριθμητικη Αναλυση/prerequisites.html` in browser:
   Inspect `#site-nav a.nav-link.active` — verify it points to `prerequisites.html` and has the active accent style.
4. **Search Filter Verification**:
   On `index.html`, typing `"προαπαιτ"` or `"μηδέν"` into `#topic-search` keeps the Topic 0 card visible while hiding irrelevant topics.
5. **Console Errors Audit**:
   Open browser dev tools console on all 12 pages (`prerequisites.html`, `index.html`, `topic1`-`topic7`, `exam_prep`, `flashcards`, `quiz`) and verify zero errors (`TypeError`, `ReferenceError`, `SyntaxError`).
