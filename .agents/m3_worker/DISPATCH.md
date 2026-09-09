# Task Assignment: M3 Worker (Implementation of ELI5 Overhaul & Flashcards Fix)

## Mission
Implement all pedagogical and code enhancements for Milestone 3 (R3 of ORIGINAL_REQUEST.md and M3 of PROJECT.md):
1. Patch `js/flashcards.js`: Apply the schema normalization patch from `.agents/m3_explorer_3/handoff.md` to support `{ question, answer }` and `{ q, a }` transparently.
2. Overhaul `exam_prep.html`: Enhance all 8 model exam problems (Types A through H) using blueprints from `.agents/m3_explorer_1/handoff.md` (Types A–D) and `.agents/m3_explorer_2/handoff.md` (Types E–H) with intermediate calculations, student traps (`.rbox`), and recognition recipes (`.gbox`).
3. Enhance Core Topic Pages: Insert the 14 ELI5 Callouts from `.agents/m3_explorer_3/handoff.md` across `topic1_direct_linear.html` through `topic7_matlab_guide.html`.
4. Run self-checks: Verify MathJax delimiter balance, HTML validity, and flashcards rendering.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- `D:\University\Αριθμητικη Αναλυση\.agents\m3_explorer_1\handoff.md` (Types A–D)
- `D:\University\Αριθμητικη Αναλυση\.agents\m3_explorer_2\handoff.md` (Types E–H)
- `D:\University\Αριθμητικη Αναλυση\.agents\m3_explorer_3\handoff.md` (Flashcard patch & 14 Topic Callouts)

## File Ownership
You exclusively own and may edit:
- `js/flashcards.js`
- `exam_prep.html`
- `topic1_direct_linear.html` through `topic7_matlab_guide.html`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Critical Instruction
DO NOT call `run_command`. Perform edits using `replace_file_content` or `write_to_file` and inspect with `view_file`.

## Output Requirements
Write your detailed implementation report to `D:\University\Αριθμητικη Αναλυση\.agents\m3_worker\handoff.md`.
Notify parent orchestrator via send_message when complete.

## 2026-09-03T14:26:45Z
You are M3 Worker (teamwork_preview_worker).
Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\m3_worker.
Read D:\University\Αριθμητικη Αναλυση\.agents\m3_worker\DISPATCH.md for your mission, instructions, and required inputs.
Ensure you read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your tasks:
1. Update D:\University\Αριθμητικη Αναλυση\exam_prep.html with the complete Question Types A–D blueprints from .agents/m3_explorer_1/handoff.md and Question Types E–H blueprints from .agents/m3_explorer_2/handoff.md. Ensure all 8 types have id="recipe-type-a" through id="recipe-type-h", unfolded intermediate calculations, recognition recipes, student traps, and unescaped TeX matrix syntax (&amp; -> &).
2. Update D:\University\Αριθμητικη Αναλυση\js\flashcards.js with Blueprint 1 from .agents/m3_explorer_3/handoff.md to normalize card schema (card.question/card.answer and card.q/card.a).
3. Inject the 7 student traps (.rbox) and 7 SOS recipes (.gbox) from Blueprint 2 in .agents/m3_explorer_3/handoff.md into topic1_direct_linear.html through topic7_matlab_guide.html at the specified section locations.

Write your implementation handoff report to D:\University\Αριθμητικη Αναλυση\.agents\m3_worker\handoff.md.
Send a message back to parent when done.

