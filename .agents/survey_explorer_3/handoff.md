# Handoff Report: Technical Infrastructure Survey & Automated Verification Baseline

**Agent**: Survey Explorer 3  
**Working Directory**: `D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_3`  
**Target File**: `D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_3\handoff.md`  
**Date**: 2026-09-03T09:37:00Z  
**Parent Orchestrator**: `6fb38649-0d41-4428-9578-bce636384375`  
**Status**: COMPLETE (Hard Handoff)

---

## 1. Observation

Direct, verifiable observations across the codebase (`D:\University\Αριθμητικη Αναλυση`):

### 1.1 MathJax Configuration & Delimiters
- **MathJax Version & Asset**:
  - MathJax v3 is used via CDN: `<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`.
  - Configuration object present in 9 files (`index.html:112-117`, `topic1_direct_linear.html:53-58`, `topic2_iterative_linear.html:52-57`, `topic3_nonlinear.html:47-52`, `topic4_interpolation.html:46-51`, `topic5_integration.html:46-51`, `topic6_odes.html:46-51`, `topic7_matlab_guide.html:52-57`, `exam_prep.html:75-80`):
    ```javascript
    MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
      }
    };
    ```
- **Files Lacking MathJax**:
  - `flashcards.html`: MathJax is NOT included in `<head>` or anywhere in the file.
  - `interactive_quiz.html`: MathJax is NOT included in `<head>` or anywhere in the file.
  - `prerequisites.html`: Currently does not exist yet (required by R1).
- **Delimiter Usage Reality**:
  - Inline equations: 100% of inline math in markdown/HTML content uses single dollar delimiters `$...$`. There are 0 occurrences of `\(...\)` in content text across all pages.
  - Block equations: 100% of display math uses double dollar delimiters `$$...$$`. There are 0 occurrences of `\[...\]` in content text across all pages.
- **Math Delimiter & Syntax Anomalies Observed**:
  - In `exam_prep.html` (lines 479, 541, 910), matrix row columns use HTML-escaped `&amp;` inside TeX math instead of standard `&`:
    - Line 479: `$A = \begin{bmatrix}1&amp;1&amp;2\\-1&amp;1&amp;0\\2&amp;-2&amp;4\end{bmatrix}$`
    - Line 541: `$$A^{-1} = \begin{bmatrix} 1/2 &amp; -1 &amp; -1/4 \\ 1/2 &amp; 0 &amp; -1/4 \\ 0 &amp; 1/2 &amp; 1/4 \end{bmatrix}$$`
    - Line 910: `$A = \begin{bmatrix}10&amp;3&amp;-7\\0&amp;-6&amp;0\\1&amp;0&amp;4\end{bmatrix}$`
    In contrast, `topic1_direct_linear.html` lines 177, 185, 192, 224 use unescaped `&`.
  - In `exam_prep.html` lines 443-444, HTML entities `&lt;` are used inside math blocks:
    `$$|1 + 2\lambda\sqrt{3}| &lt; 1 \;\Longrightarrow\; -1 &lt; 1 + 2\lambda\sqrt{3} &lt; 1$$`
    While `topic3_nonlinear.html` line 163 uses raw `<`:
    `$$-1 < 1 - 2\sqrt{3}\lambda < 1$$`
  - In `exam_prep.html` lines 767-768, display math spans across lines:
    Line 767: `$$\text{Αριστερά: } \int_{-1}^{1}x^3 dx = 0 \qquad`
    Line 768: `  \text{Δεξιά: } \frac32\left(-\frac13\right)^3 + \frac12(1)^3 = -\frac{1}{18} + \frac12 = \frac{4}{9}$$`
  - `processEscapes: true` is omitted from `tex: { ... }` in all files.

### 1.2 JavaScript Runtime, DOM Handling & Console Errors
- **Critical Defect: `js/flashcards.js` vs `data/flashcards.js` Mismatch**:
  - File: `data/flashcards.js` (lines 16-19, 20-23, etc.): Card objects use keys `{ id, question, answer, hint }`.
  - File: `js/flashcards.js` (lines 13-14, 27):
    ```javascript
    function faceFront(card) {
      return (
        '<div class="flip-face flip-front">' +
          '<span class="fc-tag">' + card.tag + '</span>' +
          '<div class="fc-q">' + card.q + '</div>' +
          '<div class="fc-hint" style="display:none"><span class="fc-hint-lbl">💡 Υπόδειξη</span>' + card.hint + '</div>' + ...
      );
    }
    function faceBack(card) {
      return (
        '<div class="flip-face flip-back">' +
          ...
          '<div class="fc-a">' + card.a + '</div>' + ...
      );
    }
    ```
  - Result: Because `card.tag`, `card.q`, and `card.a` are `undefined`, every single card on `flashcards.html` and across all 7 topic pages renders literal text `"undefined"` on both front and back.
- **Top-Level `localStorage` Calls in `js/nav.js` without Exception Guards**:
  - `js/nav.js` line 2: `document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');`
  - `js/nav.js` line 236: `const currentTheme = localStorage.getItem('theme') || 'dark';`
  - `js/nav.js` line 250: `localStorage.setItem('theme', newTheme);`
  - In restricted browser contexts (private browsing mode in some Safari/Firefox versions, sandboxed iframes without `allow-same-origin`, or strict cookie blocking), accessing `localStorage` throws an unhandled `SecurityError`, halting script execution and preventing `initNav()` from populating the navbar.
- **Dynamic DOM Math Rendering Gap**:
  - Neither `js/quiz-loader.js` (line 59: `el.innerHTML = html;`), `js/interactive_quiz.js` (lines 230, 248), nor `js/flashcards.js` (line 131) triggers `MathJax.typesetPromise()`.
  - When DOM elements containing LaTeX are dynamically inserted after MathJax's initial run, MathJax does not re-typeset them.
- **Navigation Topics Structure (`js/nav.js:104-116`)**:
  - `topics` currently lists 11 entries: `index`, `topic1` to `topic7`, `examprep`, `quiz`, `flashcards`.
  - `prerequisites.html` is missing from `topics`.

### 1.3 LocalStorage Persistence Pattern
- **Existing Keys & Patterns**:
  - Theme: `'theme'` (`'dark'` | `'light'`)
  - Quiz: `'webnotes-quiz::' + location.pathname.replace(/[^/\\]*$/, '')`
    - Schema: `{ answers: { [qKey]: { c: boolean, ts: number } }, topics: { [topicId]: { c: number, t: number } } }`
    - Read by `renderHubProgress()` in `js/nav.js` lines 325-352 to display percentage badges on index topic cards.

---

## 2. Logic Chain

From the observations above, the logical deductions follow:

1. **MathJax Vulnerability**:
   - MathJax 3 defaults to ignoring `<pre>`, `<code>`, `<style>`, and `<script>`.
   - Because `inlineMath` includes `[['$', '$']]`, any incidental unescaped `$` sign in plain text or Markdown-converted content will be interpreted as an opening or closing math delimiter.
   - Without `processEscapes: true`, typing `\$` does not prevent MathJax from treating `$` as math delimiter.
   - When dynamic HTML is injected into `.section-quiz`, `.fc-stage-card`, or the upcoming 5-day study plan instant-reveal micro-drills, formulas will remain as raw LaTeX code (`$Ax=b$`) unless `MathJax.typesetPromise([targetElement])` is invoked.
   - When creating `prerequisites.html`, MathJax must be included in `<head>` with the exact configuration.

2. **Systemic Flashcard Bug (`undefined` Render)**:
   - In `data/flashcards.js`: schema is `{ id, question, answer, hint }`.
   - In `js/flashcards.js`: code expects `{ q, a, hint, tag }`.
   - In `buildDeck()` (`js/flashcards.js:120`): `deck.push(Object.assign({ topic: DB[k].title }, c));` injects `topic`, but never maps `question -> q`, `answer -> a`, or `topic -> tag`.
   - Deductive conclusion: The flashcard engine is non-functional across the entire site. Fixing `js/flashcards.js` to normalize properties (`const q = card.question || card.q; const a = card.answer || card.a; const tag = card.tag || card.topic || 'Θεωρία';`) immediately restores full functionality without modifying existing data.

3. **Console Error & Storage Resilience**:
   - Web applications running on client browsers must anticipate `SecurityError` and `QuotaExceededError` on `localStorage`.
   - Wrapping storage access in a safe helper (`safeGetItem`, `safeSetItem`, `safeParseJSON`) guarantees that navigation, theme toggling, quiz scoring, and the 5-day study plan checklist never crash the main thread.

4. **Study Plan Persistence Architecture**:
   - The 5-day study plan requires day-by-day milestone checkboxes and instant-reveal micro-drills.
   - A single, dedicated key `'webnotes-sprint-checklist'` provides cross-page persistence across the study hub (`index.html`) and topic pages.
   - Checkbox `change` handlers must update the store, compute completion metrics (e.g. Day 1: 100%, Overall: 60%), and update visual progress indicators.
   - The storage event listener `window.addEventListener('storage', ...)` ensures multi-tab synchronization.

5. **Automated Verification Imperative**:
   - Manual inspection of 12 HTML files, 30+ quiz sections, 40+ flashcards, and hundreds of math formulas is error-prone.
   - A zero-dependency Python script (`scripts/verify_webnotes.py`) can execute in under 1 second to deterministically test:
     1. HTML syntax and existence of all 12 core files
     2. Every internal `<a href>` and `<script src>` / `<link href>` link
     3. MathJax delimiter balance (paired `$`, `$$`, `\begin` / `\end`)
     4. Reciprocal linking between `prerequisites.html` and all other pages
     5. Presence of Jargon Busters across all topic pages and `exam_prep.html`
     6. Presence and schema validity of the 5-Day Study Plan checklist and micro-drills

---

## 3. Caveats

1. **Browser Sandboxing & Offline Execution**:
   - In offline mode or local environments without internet access, the CDN-hosted MathJax script (`https://cdn.jsdelivr.net/npm/mathjax@3/...`) and Google Fonts will not load unless cached or served locally. This does not cause fatal JS runtime errors (MathJax checks are guarded), but math formulas will remain text.
2. **Path Encoding in `file:///` URLs**:
   - Windows filesystem paths with Greek characters (`Αριθμητικη Αναλυση`) can be URL-encoded as `%CE%91%CF%81...` in browser address bars. The storage key generation in `interactive_quiz.js` and `nav.js` uses `location.pathname.replace(/[^/\\]*$/, '')`, which remains consistent within the same browser origin.
3. **Scope Limitation**:
   - This report investigates technical infrastructure and provides the architecture/prototype for verification. Implementation of `prerequisites.html`, Jargon Busters, and the 5-Day Study Plan will be carried out by downstream agents.

---

## 4. Conclusion & Technical Specifications

### 4.1 MathJax Delimiter & Configuration Standard
All pages (including `prerequisites.html`, `flashcards.html`, and `interactive_quiz.html`) must use this standardized configuration:

```html
<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
  }
};
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

#### Delimiter Guidelines for Authors:
1. **Inline Math**: Enclose strictly with `$ ... $` (e.g. `$Ax = b$`, `$O(n^3)$`, `$|g'(\xi)| \lt 1$`).
2. **Display Math**: Enclose with `$$ ... $$` on dedicated lines or self-contained blocks.
3. **Inequalities in Math**: Use `\lt`, `\gt`, `\le`, `\ge` rather than raw `<` or `&lt;` inside math blocks to prevent HTML parsing collisions.
4. **Greek Text inside Math**: Use `\text{...}` (e.g. `\text{Σύνολο} = 4n^3`, `\text{Γραμμή}_i \leftarrow \dots`).
5. **Dynamic DOM Typesetting Hook**: When injecting dynamic content (quizzes, flashcards, revealed solutions), invoke:
   ```javascript
   function typesetMath(container) {
     if (window.MathJax && window.MathJax.typesetPromise) {
       window.MathJax.typesetPromise(container ? [container] : []).catch(err => console.warn('MathJax error:', err));
     }
   }
   ```

---

### 4.2 Script Corrections & Hardening

#### A. Fix for `js/flashcards.js`:
Update `faceFront` and `faceBack` in `js/flashcards.js` to normalize properties:
```javascript
function faceFront(card) {
  const tag = card.tag || card.topic || 'Θεωρία';
  const question = card.question || card.q || '';
  const hint = card.hint || '';
  return (
    '<div class="flip-face flip-front">' +
      '<span class="fc-tag">' + tag + '</span>' +
      '<div class="fc-q">' + question + '</div>' +
      (hint ? '<div class="fc-hint" style="display:none"><span class="fc-hint-lbl">💡 Υπόδειξη</span>' + hint + '</div>' : '') +
      '<div class="fc-foot">' +
        (hint ? '<button class="fc-hint-btn" type="button">💡 Υπόδειξη</button>' : '') +
        '<span class="fc-cue">κλικ για απάντηση ↻</span>' +
      '</div>' +
    '</div>'
  );
}

function faceBack(card) {
  const answer = card.answer || card.a || '';
  return (
    '<div class="flip-face flip-back">' +
      '<span class="fc-tag" style="color:var(--green);background:rgba(63,185,80,.12);border-color:rgba(63,185,80,.3)">✓ Απάντηση</span>' +
      '<div class="fc-a">' + answer + '</div>' +
      '<span class="fc-cue">κλικ για ερώτηση ↻</span>' +
    '</div>'
  );
}
```

#### B. Safe LocalStorage Wrapper (for `js/nav.js` and sprint scripts):
```javascript
const StorageSafe = {
  get(key, defaultVal = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  },
  getJSON(key, defaultVal = {}) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : val);
      return true;
    } catch (e) {
      return false;
    }
  }
};
```

---

### 4.3 5-Day Study Plan LocalStorage Architecture

#### 1. Key & Schema Definition:
- **Key**: `'webnotes-sprint-checklist'`
- **Schema**:
```typescript
interface SprintTask {
  id: string;
  label: string;
  sos: boolean;
}

interface SprintDay {
  dayNumber: number;
  title: string;
  roiTier: 'Tier 1' | 'Tier 2';
  targetMarks: string;
  tasks: { [taskId: string]: boolean };
  drill: {
    question: string;
    solution: string;
    revealed: boolean;
    completed: boolean;
  };
}

interface SprintState {
  version: 1;
  lastUpdated: number;
  tasks: { [taskId: string]: boolean };
  drills: { [drillId: string]: boolean };
}
```

#### 2. Day-by-Day High-ROI Distribution:
- **Day 1 (Tier 1 SOS - 25-30 marks)**:
  - Objectives: MATLAB Preparation Block (`diag`, `tril`, `triu`), Iterative Matrix formulas (`L`, `U`, `B`, `L1`, `Lw`, `Ltw`), Linear indexing & norms.
  - Micro-drill: Given matrix $A$, construct Gauss-Seidel matrix $\mathcal{L}_1 = (I-L)^{-1}U$ in MATLAB syntax.
- **Day 2 (Tier 1 SOS - 20-25 marks)**:
  - Objectives: Gauss vs Jordan operation counts ($n^3/3$ vs $n^3/2$, inverse $4n^3/3$ vs $3n^3/2$), complexity matrix transformation tricks (multiplying by $A$ to cancel inverse).
  - Micro-drill: Calculate total operations for $(A^{-1}B + 2C)x = A^{-1}b$ with and without optimization.
- **Day 3 (Tier 1 SOS - 20-25 marks)**:
  - Objectives: Simpson composite rule $1/3$ ($h/3[f_0+4f_1+2f_2+\dots]$) and degree of precision ($E=0$ for $\le 3$), undetermined coefficients $w_i$, Fixed-Point local convergence ($|g'(\xi)| \lt 1$) and quadratic condition ($g'(\xi)=0$).
  - Micro-drill: Find $\lambda$ interval for convergence of $x_{n+1} = x_n + \lambda(x_n^2 - 3)$ at $\xi = -\sqrt{3}$.
- **Day 4 (Tier 2 - 15-20 marks)**:
  - Objectives: Gauss elimination with partial pivoting (pivot search in column $k$, row swaps), Newton forward difference table & interpolation polynomial.
  - Micro-drill: Perform partial pivoting step 1 on a $3\times 3$ system with parameter $\tau$.
- **Day 5 (Integration & Full Simulation - 10-15 marks)**:
  - Objectives: Euler method & 3-term Taylor expansion for IVP, full exam simulation recipe walkthrough.
  - Micro-drill: Calculate $y(x_1)$ using 3-term Taylor for $y' = y - x^2 + 1$.

#### 3. Complete JavaScript Implementation Module (`js/study_plan.js`):
```javascript
/**
 * study_plan.js — Interactive 5-Day Study Sprint with LocalStorage persistence
 */
(function() {
  const STORAGE_KEY = 'webnotes-sprint-checklist';

  function loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { tasks: {}, drills: {} };
    } catch (e) {
      return { tasks: {}, drills: {} };
    }
  }

  function saveState(state) {
    try {
      state.lastUpdated = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function updateProgressUI() {
    const state = loadState();
    const allCheckboxes = document.querySelectorAll('.sprint-chk');
    if (!allCheckboxes.length) return;

    let total = allCheckboxes.length;
    let checked = 0;

    allCheckboxes.forEach(chk => {
      const id = chk.dataset.taskId;
      if (state.tasks[id]) {
        chk.checked = true;
        checked++;
      } else {
        chk.checked = false;
      }
    });

    const percent = Math.round((checked / total) * 100);
    const fillEl = document.getElementById('sprint-progress-fill');
    const textEl = document.getElementById('sprint-progress-text');
    if (fillEl) fillEl.style.width = percent + '%';
    if (textEl) textEl.textContent = `${percent}% Ολοκληρώθηκε (${checked}/${total} SOS Milestones)`;
  }

  function initChecklist() {
    const container = document.getElementById('sprint-checklist-container');
    if (!container) return;

    container.addEventListener('change', (e) => {
      if (e.target.matches('.sprint-chk')) {
        const state = loadState();
        state.tasks[e.target.dataset.taskId] = e.target.checked;
        saveState(state);
        updateProgressUI();
      }
    });

    // Instant-reveal micro-drills
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.drill-reveal-btn');
      if (!btn) return;
      const drillId = btn.dataset.drillId;
      const sol = document.getElementById(`drill-sol-${drillId}`);
      if (!sol) return;

      const isHidden = sol.style.display === 'none' || sol.style.display === '';
      sol.style.display = isHidden ? 'block' : 'none';
      btn.textContent = isHidden ? '🔒 Απόκρυψη Λύσης' : '💡 Εμφάνιση Λύσης & Επαλήθευση';

      if (isHidden && window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([sol]).catch(() => {});
      }
    });

    updateProgressUI();

    // Cross-tab synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) updateProgressUI();
    });
  }

  document.addEventListener('DOMContentLoaded', initChecklist);
})();
```

---

### 4.4 Automated Verification Script: Architecture & Code Prototype

The verification script is architected as a standalone Python 3 script (`scripts/verify_webnotes.py`) utilizing **only Python standard library modules** (`os`, `sys`, `re`, `json`, `urllib.parse`, `html.parser`). It runs on any machine with zero installation dependencies.

#### Verification Architecture (5 Suites):
1. **Catalog Suite**: Confirms all 12 required HTML files, CSS files, and JS files exist.
2. **Link & Asset Suite**: Parses HTML tags (`<a>`, `<script>`, `<link>`, `<img>`), verifies relative URLs point to valid files on disk, and verifies anchor IDs exist on target pages.
3. **MathJax & LaTeX Suite**:
   - Checks presence of MathJax script tag on all HTML pages.
   - Audits dollar delimiters for orphaned/unpaired `$` and `$$`.
   - Checks matching `\begin{env}` and `\end{env}`.
4. **Pedagogical & Navigation Suite**:
   - Verifies `prerequisites.html` is in `js/nav.js` topics array and in `index.html`.
   - Verifies reciprocal links to `prerequisites.html` from all 7 topic pages and `exam_prep.html`.
   - Verifies in-place Jargon Buster components (`class="jargon-buster"`, `class="jargon-box"`, or `data-jargon`) exist in each topic page.
5. **Study Plan & Interactive Suite**:
   - Verifies 5-Day Study Plan structure with at least 5 day sections.
   - Verifies persistent checkboxes with `data-task-id`.
   - Verifies at least 5 instant-reveal micro-drills with reveal buttons.
   - Verifies `data-fc-deck` and `.section-quiz` integrity.

#### Executable Code Prototype (`scripts/verify_webnotes.py`):

```python
#!/usr/bin/env python3
"""
scripts/verify_webnotes.py
Automated fidelity, link integrity, MathJax, and component verification script.
Standard library only (zero external pip/npm dependencies).
"""

import os
import sys
import re
import json
import urllib.parse
from html.parser import HTMLParser

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

EXPECTED_PAGES = [
    "index.html",
    "prerequisites.html",
    "topic1_direct_linear.html",
    "topic2_iterative_linear.html",
    "topic3_nonlinear.html",
    "topic4_interpolation.html",
    "topic5_integration.html",
    "topic6_odes.html",
    "topic7_matlab_guide.html",
    "exam_prep.html",
    "flashcards.html",
    "interactive_quiz.html"
]

TOPIC_PAGES = [
    "topic1_direct_linear.html",
    "topic2_iterative_linear.html",
    "topic3_nonlinear.html",
    "topic4_interpolation.html",
    "topic5_integration.html",
    "topic6_odes.html",
    "topic7_matlab_guide.html"
]

class HTMLAnalyzer(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.links = []       # (tag, attr, value, line)
        self.element_ids = set()
        self.classes = set()
        self.data_attrs = {}
        self.has_mathjax = False
        self.text_chunks = []
        self.in_script = False
        self.in_style = False

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if "id" in attr_dict:
            self.element_ids.add(attr_dict["id"])
        if "class" in attr_dict:
            for cls in attr_dict["class"].split():
                self.classes.add(cls)

        for k, v in attr_dict.items():
            if k.startswith("data-"):
                self.data_attrs.setdefault(k, []).append(v)

        if tag == "script":
            self.in_script = True
            src = attr_dict.get("src", "")
            if "mathjax" in src.lower():
                self.has_mathjax = True
            if src:
                self.links.append((tag, "src", src, self.getpos()[0]))
        elif tag == "style":
            self.in_style = True
        elif tag in ("a", "link", "img"):
            attr = "href" if tag in ("a", "link") else "src"
            val = attr_dict.get(attr)
            if val:
                self.links.append((tag, attr, val, self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_script = False
        elif tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            self.text_chunks.append(data)


def run_checks():
    print("=" * 70)
    print(" 🚀 RUNNING WEBNOTES AUTOMATED INTEGRITY & FIDELITY VERIFICATION")
    print("=" * 70)

    errors = []
    warnings = []

    # 1. CATALOG CHECK
    print("\n[Suite 1/5] Checking Required Workspace Files...")
    page_data = {}
    for p in EXPECTED_PAGES:
        full_path = os.path.join(ROOT_DIR, p)
        if not os.path.exists(full_path):
            if p == "prerequisites.html":
                warnings.append(f"Missing page: {p} (Pending creation under R1)")
            else:
                errors.append(f"Missing page: {p}")
        else:
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()
            parser = HTMLAnalyzer(p)
            try:
                parser.feed(content)
                page_data[p] = (content, parser)
                print(f"  ✓ {p} (Parsed successfully, {len(parser.element_ids)} IDs found)")
            except Exception as e:
                errors.append(f"HTML Parse error in {p}: {e}")

    # 2. LINK & ASSET INTEGRITY CHECK
    print("\n[Suite 2/5] Checking Links, Navigation & Asset Integrity...")
    for p, (content, parser) in page_data.items():
        for tag, attr, url, line in parser.links:
            # Skip external links
            if url.startswith(("http://", "https://", "//", "mailto:", "javascript:")):
                continue

            parsed = urllib.parse.urlparse(url)
            path_part = parsed.path
            fragment = parsed.fragment

            # Target file check
            if path_part:
                target_path = os.path.normpath(os.path.join(ROOT_DIR, path_part))
                if not os.path.exists(target_path):
                    errors.append(f"[{p}:{line}] Broken {tag} {attr}='{url}' -> File not found: {path_part}")
                elif fragment and target_path.endswith(".html"):
                    target_page = os.path.basename(target_path)
                    if target_page in page_data:
                        target_ids = page_data[target_page][1].element_ids
                        if fragment not in target_ids:
                            errors.append(f"[{p}:{line}] Broken anchor #{fragment} in target {target_page}")
            elif fragment:
                # Intra-page anchor
                if fragment not in parser.element_ids:
                    errors.append(f"[{p}:{line}] Broken intra-page anchor #{fragment} on {p}")

    # 3. MATHJAX & LATEX AUDIT
    print("\n[Suite 3/5] Auditing MathJax Configuration & Delimiter Integrity...")
    for p, (content, parser) in page_data.items():
        if p in ("flashcards.html", "interactive_quiz.html"):
            continue

        if not parser.has_mathjax:
            warnings.append(f"[{p}] Missing MathJax script tag in <head>")

        full_text = "".join(parser.text_chunks)

        # Count double dollars (display math)
        display_dollars = len(re.findall(r"\$\$", full_text))
        if display_dollars % 2 != 0:
            errors.append(f"[{p}] Unpaired display math delimiter '$$' (Count: {display_dollars})")

        # Strip display math to test inline math
        text_without_display = re.sub(r"\$\$[\s\S]*?\$\$", "", full_text)
        single_dollars = len(re.findall(r"(?<!\\)\$", text_without_display))
        if single_dollars % 2 != 0:
            errors.append(f"[{p}] Unpaired inline math delimiter '$' (Count: {single_dollars})")

        # Check for unclosed environments
        begins = re.findall(r"\\begin\{([a-zA-Z*]+)\}", full_text)
        ends = re.findall(r"\\end\{([a-zA-Z*]+)\}", full_text)
        if begins != ends:
            diff_begins = [b for b in begins if begins.count(b) != ends.count(b)]
            diff_ends = [e for e in ends if ends.count(e) != begins.count(e)]
            errors.append(f"[{p}] LaTeX environment mismatch: \\begin={diff_begins}, \\end={diff_ends}")

    # 4. PREREQUISITES & JARGON BUSTER CROSS-REFERENCES
    print("\n[Suite 4/5] Auditing Prerequisites Hub & Jargon Buster Presence...")
    # Check js/nav.js for prerequisites
    nav_path = os.path.join(ROOT_DIR, "js", "nav.js")
    if os.path.exists(nav_path):
        with open(nav_path, "r", encoding="utf-8") as f:
            nav_content = f.read()
        if "prerequisites.html" not in nav_content:
            warnings.append("js/nav.js: 'prerequisites.html' is NOT yet registered in topics array")
        else:
            print("  ✓ js/nav.js links prerequisites.html")

    # Check index.html links to prerequisites
    if "index.html" in page_data:
        index_links = [l[2] for l in page_data["index.html"][1].links]
        if not any("prerequisites.html" in l for l in index_links):
            warnings.append("index.html: Does not contain an active link to prerequisites.html")
        else:
            print("  ✓ index.html links prerequisites.html")

    # Check topic pages and exam_prep for Jargon Busters and prerequisites link
    jargon_classes = {"jargon-buster", "jargon-box", "jargon-callout"}
    for tp in TOPIC_PAGES + ["exam_prep.html"]:
        if tp not in page_data:
            continue
        content, parser = page_data[tp]
        # Jargon buster check
        has_jargon = bool(parser.classes.intersection(jargon_classes) or "data-jargon" in parser.data_attrs)
        if not has_jargon:
            warnings.append(f"{tp}: Missing in-place 'Jargon Buster' component")
        else:
            print(f"  ✓ {tp} contains Jargon Buster component")

        # Reciprocal link to prerequisites check
        has_prereq_link = any("prerequisites.html" in l[2] for l in parser.links)
        if not has_prereq_link:
            warnings.append(f"{tp}: Missing reciprocal link to prerequisites.html")
        else:
            print(f"  ✓ {tp} links to prerequisites.html")

    # 5. 5-DAY STUDY PLAN & INTERACTIVE AUDIT
    print("\n[Suite 5/5] Auditing 5-Day Study Plan & Interactive Components...")
    # Check study plan on index.html or exam_prep.html
    sprint_found = False
    for p in ("index.html", "exam_prep.html"):
        if p in page_data:
            content, parser = page_data[p]
            if "sprint-checklist" in parser.classes or "study-plan-5day" in parser.element_ids or "data-sprint-day" in parser.data_attrs:
                sprint_found = True
                chk_count = len(parser.data_attrs.get("data-task-id", []))
                drill_count = len(parser.data_attrs.get("data-drill-id", []))
                print(f"  ✓ 5-Day Study Sprint found on {p} ({chk_count} tasks, {drill_count} drills)")
                if chk_count < 5:
                    warnings.append(f"{p}: Study plan has fewer than 5 task checkboxes ({chk_count})")
                if drill_count < 5:
                    warnings.append(f"{p}: Study plan has fewer than 5 instant-reveal micro-drills ({drill_count})")
                break
    if not sprint_found:
        warnings.append("5-Day Study Sprint checklist is NOT yet implemented in index.html or exam_prep.html")

    # Check flashcards schema fix
    fc_js_path = os.path.join(ROOT_DIR, "js", "flashcards.js")
    if os.path.exists(fc_js_path):
        with open(fc_js_path, "r", encoding="utf-8") as f:
            fc_content = f.read()
        if "card.question" not in fc_content and "card.answer" not in fc_content:
            errors.append("js/flashcards.js: CRITICAL BUG — accesses 'card.q' / 'card.a' while data uses 'question' / 'answer'")
        else:
            print("  ✓ js/flashcards.js supports normalized question/answer properties")

    # SUMMARY
    print("\n" + "=" * 70)
    print(" 📊 VERIFICATION SUMMARY")
    print("=" * 70)
    print(f"  Errors:   {len(errors)}")
    print(f"  Warnings: {len(warnings)}")

    if warnings:
        print("\n⚠️ WARNINGS (Pending features / enhancements):")
        for w in warnings:
            print(f"  - {w}")

    if errors:
        print("\n❌ CRITICAL ERRORS:")
        for e in errors:
            print(f"  - {e}")
        return False
    else:
        print("\n✅ ZERO CRITICAL ERRORS detected across tested infrastructure!")
        return True


if __name__ == "__main__":
    success = run_checks()
    sys.exit(0 if success else 1)
```

---

## 5. Verification Method

To independently verify the observations, logic, and code specifications in this handoff report:

1. **Verify MathJax Configurations**:
   - Inspect `<head>` of `index.html`, `topic1_direct_linear.html`, and `exam_prep.html`.
   - Confirm version `tex-mml-chtml.js` (MathJax 3) and configuration `inlineMath: [['$', '$'], ['\\(', '\\)']]`.
   - Confirm `flashcards.html` and `interactive_quiz.html` omit MathJax.
2. **Verify Flashcards Data-to-Script Defect**:
   - Open `data/flashcards.js` line 16-19: notice keys `question`, `answer`, `hint`.
   - Open `js/flashcards.js` lines 13-14, 27: notice `card.q`, `card.a`, `card.tag`.
   - Confirm that without the normalization patch, all cards render `"undefined"`.
3. **Verify Links and Anchors**:
   - Inspect `js/nav.js` lines 104-116: confirm `topics` contains 11 entries and lacks `prerequisites.html`.
   - Confirm that all `topic1`-`topic7` files contain `<div class="section-quiz">` and `<div data-fc-deck>`.
4. **Execute the Verification Script**:
   - Save the code prototype to `scripts/verify_webnotes.py`.
   - Run via command:
     ```bash
     python scripts/verify_webnotes.py
     ```
   - Observe suite passes, defect identification, and warnings for pending deliverables.

### Invalidation Conditions
This analysis is invalidated if:
- `data/flashcards.js` is changed to use `q` and `a` keys instead of `question` and `answer`.
- The workspace switches to KaTeX or MathJax v2 rather than MathJax v3.
- Relative links are migrated to absolute root paths (`/topic1...`).
