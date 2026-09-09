# Orchestrator Gen 3 Plan: Numerical Analysis Webnotes Overhaul

## 1. Context & Objectives
- Inherited state:
  - Milestone 1: DONE (Prerequisites Hub & Jargon Busters)
  - Milestone 2: DONE (Interactive 5-Day Study Sprint Plan with LocalStorage)
  - Milestone 3: Implementation complete by `m3_worker` (8 exam types unfolded in `exam_prep.html`, 14 ELI5 callouts in Topics 1–7, `js/flashcards.js` normalized). Gate validation needed.
  - Milestone 4: Comprehensive Verification & Navigation Integrity (`scripts/verify_webnotes.py` implementation, static link/MathJax/console integrity check, full acceptance criteria verification).

## 2. Work Breakdown & Action Steps

### Step 1: Milestone 3 Gate Validation
- Verify `m3_worker` artifacts against criteria:
  - `exam_prep.html` Types A–H intermediate calculations, student traps, recognition recipes.
  - Anchors `recipe-type-a` through `recipe-type-h`.
  - Topics 1–7 ELI5 callouts (1 `.student-trap` and 1 `.recognition-formula` per topic).
  - `js/flashcards.js` normalization.
- Update `GATE_STATUS.md` and `PROJECT.md` marking Milestone 3 as DONE.

### Step 2: Milestone 4 Execution — Verification Engine Implementation & Audit
- Dispatch `m4_worker` (`teamwork_preview_worker`) with:
  - Task: Implement `scripts/verify_webnotes.py` based on `survey_explorer_3/handoff.md` specification and enhance it to test:
    1. Catalog of all 12 HTML files + CSS + JS files.
    2. Zero broken relative links (`href` and `src`) across all HTML files.
    3. MathJax scripts and delimiter balance (`$`, `$$`, `\begin`/`\end{...}`) with clean LaTeX syntax.
    4. Pedagogical and navigation integrity (`prerequisites.html` reciprocal links across all topic pages + `exam_prep.html`, Jargon Busters presence across all topic pages + `exam_prep.html`).
    5. 5-Day Study Sprint plan presence, persistent checkboxes (`data-task-id`), and 5 instant-reveal micro-drills (`data-drill-id`).
    6. Script syntax / console safety (valid JSON in localStorage, normalized flashcards).
  - Run `python scripts/verify_webnotes.py` and fix any anomalies identified (e.g. any lingering broken links or missing MathJax tags in `flashcards.html`/`interactive_quiz.html`).
  - Report execution results with 100% pass across all criteria.
- Dispatch Reviewer (`teamwork_preview_reviewer`) to independently review verification script and webnotes integrity.
- Dispatch Challenger (`teamwork_preview_challenger`) to stress-test links, DOM IDs, and MathJax blocks.
- Dispatch Forensic Auditor (`teamwork_preview_auditor`) to verify zero integrity violations and genuine implementation.
- Evaluate Gate for M4.
- Update `PROJECT.md` marking Milestone 4 as DONE.

### Step 3: Final Acceptance Verification & Victory Report
- Confirm all Acceptance Criteria in `ORIGINAL_REQUEST.md`:
  - Navigation & Site Structure (prerequisites, reciprocal links, zero broken relative links).
  - Pedagogical Completeness (prerequisites numeric examples, jargon busters, model solutions).
  - 5-Day Study Plan & Interactive Features (high-ROI roadmap, localStorage persistence, 5 micro-drills).
  - Technical & Script Quality (zero JS errors, MathJax rendering, automated verification script 100% pass).
- Send comprehensive final report to parent via `send_message`.
