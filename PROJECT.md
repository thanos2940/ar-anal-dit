# Project: Numerical Analysis (ΕΚΠΑ DIT) Webnotes Overhaul

## Architecture
- **Client-Side Static Web Platform**: Pure HTML5, CSS3, ES6+ JavaScript, MathJax v3 for TeX mathematical rendering. No build step or server runtime required, functioning seamlessly via `file:///` and HTTP web servers.
- **Shared Navigation Component (`js/nav.js`)**: Dynamic injection of `#site-nav` across all pages, active page highlighting via `window.location.pathname`, theme switching (light/dark with `localStorage`), and responsive mobile drawer.
- **Interactive State & Storage (`js/study_plan.js`, `localStorage`)**: Persistent key `'webnotes-sprint-checklist'` tracking daily milestone checkboxes and instant-reveal micro-drill attempts across pages and tabs.
- **Pedagogical Hierarchy**:
  - `prerequisites.html`: Foundations ("Μαθηματικά από το Μηδέν") bridging secondary school math to numerical algorithms.
  - `index.html`: Sprint hub with 5-Day Study Sprint Plan, progress bar, daily micro-drills, and chapter roadmap.
  - `topic1_direct_linear.html` to `topic7_matlab_guide.html`: Core curriculum pages with in-place Jargon Busters, step-by-step arithmetic, and student trap warnings.
  - `exam_prep.html`: 8 fully unfolded model exam question types (Types A–H) with intermediate calculations and SOS recognition recipes.
  - `flashcards.html` & `interactive_quiz.html`: Self-testing applications.
- **Automated Verification Harness (`scripts/verify_webnotes.py`)**: Zero-dependency Python verification script auditing HTML, links, anchors, MathJax delimiters, reciprocal prerequisite links, Jargon Busters, and study sprint components.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | `prerequisites.html` Hub | Standalone page with visual explanations and concrete numerical examples for 6 prerequisite math pillars | M1 | ORIGINAL_REQUEST R1 |
| 2 | Matrix Anatomy & Multiply | Matrix dimensions ($m \times n$), indices $a_{ij}$, addition, dot-product row-by-column multiplication | M1 | ORIGINAL_REQUEST R1 |
| 3 | Row Ops & Sign Safety | Elementary row operations $R_i \leftarrow R_i - m_{ik}R_k$ with explicit negative multiplier safety rules | M1 | ORIGINAL_REQUEST R1 |
| 4 | Identity & Inverse Matrix | Meaning of $I, A^{-1}$, why $A^{-1} \ne 1/A$, non-singularity condition $\det(A) \ne 0$ | M1 | ORIGINAL_REQUEST R1 |
| 5 | Polynomial Calculus & ODE Chain Rule | Power rule derivatives, critical points, implicit derivative for ODEs ($y'' = f_x + f_y y'$), Taylor 3-term | M1 | ORIGINAL_REQUEST R1 |
| 6 | Absolute Value Inequalities | Solving $|u| < c \iff -c < u < c$ and $|g'(\xi)| < 1$ with sign flipping on negative division | M1 | ORIGINAL_REQUEST R1 |
| 7 | Iteration Error & Residuals | Absolute error $|x^{(k)} - \xi|$, relative error, residual vector $r = b - Ax$, convergence metrics | M1 | ORIGINAL_REQUEST R1 |
| 8 | In-Place Jargon Busters | Collapsible `<details class="jargon-buster">` callouts across Topics 1–7 and `exam_prep.html` | M1 | ORIGINAL_REQUEST R1 |
| 9 | Site-wide Nav Integration | Register `prerequisites.html` in `js/nav.js` and add dedicated card in `index.html` | M1 | ORIGINAL_REQUEST R1 |
| 10 | Reciprocal Prereq Links | Add reciprocal callouts/breadcrumbs to `prerequisites.html` from all 7 topic pages and `exam_prep.html` | M1 | ORIGINAL_REQUEST R1 |
| 11 | High-ROI 5-Day Sprint Roadmap | Structured day-by-day study roadmap ordered by marks ROI (Days 1–3: 60 marks, Days 4–5: 40 marks) | M2 | ORIGINAL_REQUEST R2 |
| 12 | Browser-Saved LocalStorage Checklist | Checkboxes persisting daily milestone completion across reloads and browser tabs | M2 | ORIGINAL_REQUEST R2 |
| 13 | 5 Instant-Reveal Micro-Drills | One calculation drill per day with clickable reveal button and step-by-step solution | M2 | ORIGINAL_REQUEST R2 |
| 14 | Study Plan UI & Progress Bar | Dynamic percentage progress bar and milestone counter updating in real time | M2 | ORIGINAL_REQUEST R2 |
| 15 | ELI5 Tone & Recognition Formulas | Direct, friendly Greek student-to-student tone and "When you see X, do 1-2-3" recipes | M3 | ORIGINAL_REQUEST R3 |
| 16 | Intermediate Calculation Steps | Unfolding all intermediate steps in `exam_prep.html` model solutions (Types A–H) | M3 | ORIGINAL_REQUEST R3 |
| 17 | Student Trap Warnings | Explicit warnings on negative multiplier signs, pivot searching, inequality flips, Simpson points | M3 | ORIGINAL_REQUEST R3 |
| 18 | Flashcard Script Normalization | Fix `card.q`/`card.a` property mismatch in `js/flashcards.js` to restore flashcard rendering | M3 | Survey Explorer 1 & 3 |
| 19 | MathJax Hardening & Escaping | Include MathJax on all pages, fix TeX syntax (`&amp;` -> `&`, `&lt;` -> `\lt`), add `processEscapes: true` | M4 | ORIGINAL_REQUEST R4 |
| 20 | Zero Broken Relative Links | Validate and guarantee 100% working internal `href` links and anchors across all 12 pages | M4 | ORIGINAL_REQUEST R4 |
| 21 | Automated Verification Script | Implement `scripts/verify_webnotes.py` covering all 5 test suites with zero external dependencies | M4 | ORIGINAL_REQUEST R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Prerequisites Hub & Jargon Busters | Create `prerequisites.html`, register in `js/nav.js`, add card to `index.html`, add reciprocal links and Jargon Busters to Topics 1–7 & `exam_prep.html` | Survey (Done) | DONE (prerequisites.html, 10 reciprocal links, 16 Jargon Busters) |
| M2 | Interactive 5-Day Study Sprint Plan | Implement `js/study_plan.js`, embed sprint roadmap with persistent checklist and 5 instant-reveal micro-drills in `index.html` & `exam_prep.html` | M1 | DONE (js/study_plan.js, 21 checklist tasks, 5 micro-drills, reciprocal jump card) |
| M3 | ELI5 Overhaul & Exam Prep Recipes | Unfold all intermediate steps in `exam_prep.html` (Types A–H), add student traps and recognition recipes, patch `js/flashcards.js` | M1, M2 | DONE (8 exam types unfolded, 14 ELI5 callouts, js/flashcards.js normalized, CSS components appended) |
| M4 | Verification & Navigation Integrity | Implement and execute `scripts/verify_webnotes.py`, verify MathJax rendering, fix HTML/TeX entities, confirm zero console errors | M1, M2, M3 | DONE (scripts/verify_webnotes.py 100% pass across 5 suites, 0 broken links/anchors, MathJax standardized, audit CLEAN) |

## Interface Contracts

### Navigation Contract (`js/nav.js`)
- Element: `<div id="site-nav"></div>` present in `<header class="topbar">` or `<aside class="sidebar">` of every HTML page.
- Array `topics`: Contains objects `{ id: string, title: string, path: string, icon: SVG_STRING }`.
- Active detection: `window.location.pathname.split('/').pop() || 'index.html'` matches `topic.path` and adds `.active` class.

### LocalStorage Study Plan Contract (`js/study_plan.js`)
- Storage Key: `'webnotes-sprint-checklist'`
- Schema:
  ```json
  {
    "tasks": {
      "day1-task1": true,
      "day1-task2": false
    },
    "drills": {
      "drill1": true
    },
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

### Jargon Buster Contract
- Markup:
  ```html
  <details class="jargon-buster">
    <summary><strong>🔤 Jargon Buster:</strong> <span class="jargon-term">Όρος (Σύμβολο)</span></summary>
    <div class="jargon-content">
      <p><strong>Τι σημαίνει στα απλά ελληνικά:</strong> ...</p>
      <p><strong>Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις:</strong> ...</p>
    </div>
  </details>
  ```
- CSS: Defined in `styles/base.css` or scoped `<style>` matching the dark theme (`--surf`, `--border`, `--txt`).

### MathJax Configuration Contract
- Script tags in `<head>`:
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
- Dynamic rendering hook: `window.MathJax && window.MathJax.typesetPromise && window.MathJax.typesetPromise([el])`.

## Code Layout
- Root Directory: `D:\University\Αριθμητικη Αναλυση`
  - `index.html`: Main home dashboard and 5-Day Study Sprint Hub
  - `prerequisites.html`: Dedicated "Μαθηματικά από το Μηδέν" Hub
  - `topic1_direct_linear.html`: Topic 1 Guide
  - `topic2_iterative_linear.html`: Topic 2 Guide
  - `topic3_nonlinear.html`: Topic 3 Guide
  - `topic4_interpolation.html`: Topic 4 Guide
  - `topic5_integration.html`: Topic 5 Guide
  - `topic6_odes.html`: Topic 6 Guide
  - `topic7_matlab_guide.html`: Topic 7 Guide
  - `exam_prep.html`: Exam Prep Hub with 8 model solutions
  - `flashcards.html`: Flashcards test application
  - `interactive_quiz.html`: Interactive quiz application
  - `js/nav.js`: Navigation engine
  - `js/study_plan.js`: 5-Day study plan engine
  - `js/flashcards.js`: Flashcards engine
  - `js/interactive_quiz.js`: Quiz engine
  - `styles/base.css`, `styles/components.css`, `styles/layout.css`: Stylesheets
  - `scripts/verify_webnotes.py`: Automated verification suite
