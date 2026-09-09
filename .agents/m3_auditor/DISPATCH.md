# Task Assignment: M3 Forensic Auditor (Integrity Forensics & Anti-Cheating Verification)

## Mission
Conduct an independent forensic integrity audit of Milestone 3 to verify that all implementations are genuine, authentic, and free of cheating, dummy facades, hardcoded mocks, or circumventions, adhering strictly to the Integrity Forensics standard.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- `D:\University\Αριθμητικη Αναλυση\.agents\m3_worker\handoff.md`
- `D:\University\Αριθμητικη Αναλυση\exam_prep.html`
- `D:\University\Αριθμητικη Αναλυση\js\flashcards.js`
- `D:\University\Αριθμητικη Αναλυση\topic1_direct_linear.html` through `topic7_matlab_guide.html`

## Forensic Verification Checks
1. Genuine Implementation Audit:
   - Verify `exam_prep.html` contains real, genuine intermediate calculations and authentic recognition recipes for all 8 Question Types (A–H).
   - Verify `js/flashcards.js` contains genuine schema normalization and dynamic MathJax rendering logic (not a dummy mock or hardcoded card list).
   - Verify that all 7 topic pages contain genuine, authentic `.student-trap` and `.recognition-formula` callouts.
   - Verify no dummy or facade implementations exist.
2. Anti-Cheating & Workspace Scan:
   - Scan for fabricated test logs, fake assertions, or pre-canned pass states.

## Binary Veto Rule
⚠️ If ANY integrity violation, cheating, or fake implementation is detected, you MUST report `VERDICT: INTEGRITY VIOLATION`.
If all work is authentic and verified clean, report `VERDICT: CLEAN`.

## Output Requirements
Write your forensic audit report to `D:\University\Αριθμητικη Αναλυση\.agents\m3_auditor\handoff.md`.
Notify parent orchestrator via send_message when complete.

## 2026-09-03T14:37:34Z
You are M3 Forensic Auditor (teamwork_preview_auditor).
Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\m3_auditor.
Read D:\University\Αριθμητικη Αναλυση\.agents\m3_auditor\DISPATCH.md for your mission, instructions, and required inputs.
Ensure you read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md first.
Perform a strict forensic integrity audit of Milestone 3 (anti-cheating, authentic implementations, no facade mocks).
Write your complete handoff report to D:\University\Αριθμητικη Αναλυση\.agents\m3_auditor\handoff.md.
Conclude with VERDICT: CLEAN or VERDICT: INTEGRITY VIOLATION.
Send a message back to parent when done.
