# Master Execution Plan: Orchestrator Generation 2

## Mission
Complete Milestones 2, 3, and 4 for the Numerical Analysis (ΕΚΠΑ DIT) Webnotes overhaul.

## Remaining Milestones

### Phase 1: Milestone 2 Gate Evaluation
- Current State: `m2_worker` has completed implementation (`js/study_plan.js`, `styles/base.css`, `index.html`, `exam_prep.html`).
- Subagents to Dispatch:
  - 2 Reviewers (`teamwork_preview_reviewer`): Code structure, accessibility, localStorage contract, reciprocal links, MathJax typeset hooks.
  - 2 Challengers (`teamwork_preview_challenger`): Micro-drill arithmetic verification, state persistence stress testing, duplicate ID check, responsive layout check.
  - 1 Auditor (`teamwork_preview_auditor`): Forensic integrity verification (no dummy facades, no hardcoded cheating, genuine implementation).
- Gate Decision: Record in `GATE_STATUS.md`. On unanimous APPROVE/CLEAN, mark M2 DONE in `PROJECT.md`.

### Phase 2: Milestone 3 (R3 - ELI5 Overhaul of Core Topic Pages & Exam Prep Recipes)
- Scope:
  - Feature 15: ELI5 tone & recognition formulas ("When you see X, do 1-2-3" recipes) across core topics and `exam_prep.html`.
  - Feature 16: Intermediate calculation steps for all 8 exam question models (Types A–H) in `exam_prep.html`.
  - Feature 17: Explicit student trap warnings (negative multiplier signs, pivot searching, inequality flips, Simpson points, etc.).
  - Feature 18: Patch `js/flashcards.js` property mismatch (`card.q`/`card.a` vs `card.question`/`card.answer`).
- Strategy:
  - Decompose into:
    - Worker 1: `exam_prep.html` Types A–H deep arithmetic unfolding & student traps.
    - Worker 2: Core Topic pages (`topic1` to `topic7`) ELI5 callouts, SOS recipe boxes, and `js/flashcards.js` fix.
  - Review & Gate with Reviewers, Challengers, and Auditor.

### Phase 3: Milestone 4 (R4 - Comprehensive Verification & Navigation Integrity)
- Scope:
  - Feature 19: MathJax hardening & escaping (zero unescaped TeX syntax, `processEscapes: true`).
  - Feature 20: Zero broken relative links & anchors across all HTML pages.
  - Feature 21: Zero console JavaScript errors across all pages.
  - Verification Script: Implementation and execution of `scripts/verify_webnotes.py` testing all 5 suites.
- Strategy:
  - Test Writer / Worker: Create and execute `scripts/verify_webnotes.py`.
  - Reviewers / Auditor: Audit verification results, link integrity, MathJax rendering, and clean execution.

### Phase 4: Final Synthesis & Human Reporting
- Verify all acceptance criteria from `ORIGINAL_REQUEST.md`.
- Produce final report for the user / sentinel.
