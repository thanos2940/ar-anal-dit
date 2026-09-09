# Task Assignment: M2 Explorer 3 (Study Sprint Page Integration & UI Layout)

## Mission
Design the layout integration and CSS styling for the 5-Day Study Sprint section on `index.html` (and reciprocal links from `exam_prep.html`), fulfilling R2 of ORIGINAL_REQUEST.md and M2 of PROJECT.md.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- `D:\University\Αριθμητικη Αναλυση\index.html`
- `D:\University\Αριθμητικη Αναλυση\styles/base.css`

## Scope of Specification
1. Location on `index.html`:
   - Determine optimal placement for `#sprint-checklist-container` (e.g. right below the hero search bar, before `.topics-grid`).
   - Include the overall progress bar UI:
     - Header: "5-Day High-ROI PASS Sprint (30 $\to$ 60 $\to$ 100 Marks)"
     - Progress bar container with `#sprint-progress-fill` and `#sprint-progress-text`.
     - Reset progress button (clearing `localStorage` after confirmation).
2. CSS Styling:
   - Provide styling for `.sprint-day-card`, `.sprint-task-item`, `.sprint-chk`, `.drill-reveal-btn`, and progress bar, matching the existing dark theme (`--surf`, `--surf2`, `--border`, `--blue`, `--green`, `--cyan`).
   - Ensure complete responsiveness on mobile devices (<768px).
3. Linking from `exam_prep.html`:
   - Design a compact study sprint jump card in `exam_prep.html` linking directly to `index.html#sprint-plan`.

## Output Requirements
Write your detailed integration and styling report to `D:\University\Αριθμητικη Αναλυση\.agents\m2_explorer_3\handoff.md`.
Notify parent orchestrator via send_message when complete.

## 2026-09-03T10:07:11Z
You are M2 Explorer 3. Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\m2_explorer_3.
Read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md (MANDATORY), D:\University\Αριθμητικη Αναλυση\PROJECT.md, and D:\University\Αριθμητικη Αναλυση\.agents\m2_explorer_3\DISPATCH.md.
Design the page layout, placement on index.html (and reciprocal links from exam_prep.html), and CSS styling for the 5-Day Study Sprint and progress bar matching the dark theme.
Write your report to D:\University\Αριθμητικη Αναλυση\.agents\m2_explorer_3\handoff.md.
Notify parent via send_message when complete.
