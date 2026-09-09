## 2026-09-03T19:09:21Z

You are M4 Worker (teamwork_preview_worker) responsible for Milestone 4 (R4 - Comprehensive Verification & Navigation Integrity) of the Numerical Analysis (ΕΚΠΑ DIT) Webnotes Overhaul.

Workspace Root: D:\University\Αριθμητικη Αναλυση
Your Working Directory: D:\University\Αριθμητικη Αναλυση\.agents\m4_worker

CRITICAL INPUTS TO READ FIRST:
1. D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md (Authoritative requirements)
2. D:\University\Αριθμητικη Αναλυση\PROJECT.md (Global architecture & feature inventory)
3. D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_3\handoff.md (Verification script architecture and executable prototype in Section 4.4)
4. D:\University\Αριθμητικη Αναλυση\.agents\m3_worker\handoff.md (Recent implementation details)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

SCOPE & TASKS:
1. Implement `scripts/verify_webnotes.py`:
   - Based on the architecture and prototype in `survey_explorer_3/handoff.md` Section 4.4.
   - Zero external dependencies (uses standard library: os, sys, re, json, urllib.parse, html.parser).
   - Test Suite 1: Catalog Check — verifies all 12 required HTML files, CSS files, and JS files exist.
   - Test Suite 2: Link & Anchor Integrity — parses all internal links (`<a>`, `<script>`, `<link>`, `<img>`), verifies relative target files exist on disk, verifies target anchor IDs exist, verifies intra-page anchors exist.
   - Test Suite 3: MathJax & LaTeX Syntax — verifies MathJax script is included in pages, checks paired `$` and `$$` delimiters, checks matching `\begin{env}` and `\end{env}`, flags any `&amp;` or broken syntax inside math.
   - Test Suite 4: Prerequisites & Pedagogical Integrity — verifies `prerequisites.html` is registered in `js/nav.js` and linked in `index.html`; verifies reciprocal links to `prerequisites.html` exist in all 7 topic pages and `exam_prep.html`; verifies Jargon Buster components exist across all 7 topic pages and `exam_prep.html`.
   - Test Suite 5: 5-Day Study Sprint Plan & Interactive Suite — verifies 5-day study plan presence, persistent checkboxes with `data-task-id`, at least 5 instant-reveal micro-drills with `data-drill-id`, and flashcards normalized script logic.
   - Exits with 0 on pass, 1 on failure.

2. Run `python scripts/verify_webnotes.py`:
   - Execute the verification script directly using your command runner tool.
   - If any errors or warnings are found (e.g. missing MathJax in `flashcards.html` or `interactive_quiz.html`, unescaped entities, broken anchor links, etc.), fix the source files cleanly and re-run.
   - Achieve 100% PASS with 0 critical errors.

3. Handoff Deliverables:
   - Write your complete handoff report to `D:\University\Αριθμητικη Αναλυση\.agents\m4_worker\handoff.md` following the Handoff Protocol (Observation, Logic Chain, Caveats, Conclusion, Verification Method with command output).
   - Send completion message to parent via send_message.
