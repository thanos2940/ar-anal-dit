# Task Assignment: M1 Challenger 1 (Adversarial Link Graph, Anchors & Delimiter Testing)

## Mission
Adversarially challenge and stress-test the link graph, anchor targets, HTML structure, and MathJax delimiter balance of all files affected by Milestone 1.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- All HTML files in `D:\University\Αριθμητικη Αναλυση`

## Adversarial Verification Tasks
Write and execute Python test scripts to verify:
1. Every relative link (`href`, `src`) across all 12 HTML files resolves to an existing file on disk.
2. Every anchor target (e.g. `#sec-matrices`, `#sec-iteration-error`, `#sec-inequalities`, `#sec-row-ops`, `#sec-derivatives`, `#module1` through `#module7`, `#next-steps`) targeted by reciprocal links exists in `prerequisites.html`.
3. Check for any broken `#` fragment IDs across all pages.
4. Verify MathJax delimiter balance (paired `$` and `$$`, matching `\begin{...}` / `\end{...}`) in `prerequisites.html` and modified pages.
5. Check for any syntax errors or broken HTML tags in modified files.

## Output Requirements
Write your adversarial report to `D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_1\handoff.md`.
Include test script code, execution commands, and output logs.
End with a clear, unambiguous verdict: `VERDICT: APPROVE` or `VERDICT: REJECT`.
Notify parent orchestrator via send_message when complete.

## 2026-09-03T09:55:39Z
You are M1 Challenger 1. Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_1.
Read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md (MANDATORY), D:\University\Αριθμητικη Αναλυση\PROJECT.md, and D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_1\DISPATCH.md.
Adversarially test the link graph, all relative URLs, anchor targets, and MathJax delimiter balance across all HTML files.
Write your report to D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_1\handoff.md.
Conclude with VERDICT: APPROVE or VERDICT: REJECT.
Notify parent via send_message when complete.

