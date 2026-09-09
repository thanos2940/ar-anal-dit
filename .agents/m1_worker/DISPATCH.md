# Task Assignment: M1 Worker (Implementation of Prerequisites Hub & Jargon Busters)

## Mission
Execute all source code and markup implementations for Milestone 1 (R1 of ORIGINAL_REQUEST.md and M1 of PROJECT.md):
1. Create `prerequisites.html` ("Μαθηματικά από το Μηδέν") with all 7 modules, dark theme styling matching `styles/base.css`, MathJax v3 script, and 7 interactive mini-drills.
2. Update `js/nav.js` to register `prerequisites.html` in the `topics` array.
3. Update `styles/components.css` with `.jargon-buster` styles and `styles/base.css` with `.prereq-callout` styles.
4. Update `index.html` to add the hero CTA banner and the `TOPIC 00 · FOUNDATIONS` card in `.topics-grid`.
5. Update all 7 topic pages (`topic1` to `topic7`) and `exam_prep.html` to insert:
   - Reciprocal prerequisite callouts at the top of `<div class="wrap">`
   - In-place collapsible Jargon Busters (2 per page) at the specified heading anchors
6. Update `flashcards.html` and `interactive_quiz.html` to insert reciprocal prerequisite callouts in their start screens.
7. Verify your work by running static checks (e.g. verifying files exist, parsing HTML, testing links).

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- `D:\University\Αριθμητικη Αναλυση\.agents\m1_explorer_1\handoff.md` (Complete `prerequisites.html` architecture & content)
- `D:\University\Αριθμητικη Αναλυση\.agents\m1_explorer_2\handoff.md` (Complete Jargon Buster markup, CSS, and coordinates)
- `D:\University\Αριθμητικη Αναλυση\.agents\m1_explorer_3\handoff.md` (Complete Nav, Index card, and Reciprocal callout code)

## File Ownership
You exclusively own and may edit:
- `prerequisites.html` (new file)
- `js/nav.js`
- `styles/base.css`
- `styles/components.css`
- `index.html`
- `topic1_direct_linear.html`
- `topic2_iterative_linear.html`
- `topic3_nonlinear.html`
- `topic4_interpolation.html`
- `topic5_integration.html`
- `topic6_odes.html`
- `topic7_matlab_guide.html`
- `exam_prep.html`
- `flashcards.html`
- `interactive_quiz.html`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Output Requirements
Write your detailed implementation report to `D:\University\Αριθμητικη Αναλυση\.agents\m1_worker\handoff.md` including:
- Summary of all files created/modified
- Verification commands run and test outputs
- Confirmation that all R1 acceptance criteria are satisfied
Notify parent orchestrator via send_message when complete.

## 2026-09-03T09:43:27Z
Received dispatch for M1 Worker: Implement all components for Milestone 1 (Prerequisites Hub, Jargon Busters, Reciprocal callouts, CSS, Nav, Index).

