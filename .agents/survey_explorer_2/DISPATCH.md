# Task Assignment: Survey Spec Miner 2 (Pedagogical Content & Exam Syllabus Mining)

## Mission
Extract and mine the complete mathematical and pedagogical specification of the Numerical Analysis course across all topic pages, exam prep solutions, flashcards, and quizzes. Map the exact mathematical prerequisites, jargon terms, student traps, and high-ROI exam patterns.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative requirements)
- `topic1.html` through `topic7.html`
- `exam_prep.html`, `flashcards.html`, `interactive_quiz.html`
- Any course notes or syllabus references in the workspace

## Scope of Investigation
1. Map out the 7 topics: what numerical methods, formulas, algorithms, and theorems does each cover?
2. Identify all mathematical prerequisites needed by students (Matrix algebra, row operations, inverse, derivatives, absolute values, iteration errors) and where each is used in topics 1-7.
3. Catalog the technical jargon terms across all 7 topics that confuse beginners (e.g. Spectral radius, dominant eigenvalue, condition number, interpolation remainder, degree of precision, pivot, convergence order, machine epsilon) for in-place Jargon Busters.
4. Analyze `exam_prep.html`: list all model exam problems, evaluate where intermediate steps are currently missing or abrupt, and identify common student traps.
5. Detail the 5-day study roadmap structure (Days 1-3 high-yield: MATLAB, complexity, weights/quadrature, fixed-point/Newton; Days 4-5: Gauss-Jordan with pivoting, Newton interpolation, exam simulation) and design 5 concrete micro-drills with step-by-step solutions.

## Output Requirements
Write your comprehensive specification report to `D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_2\handoff.md`.
Include:
- Comprehensive Feature & Concept Inventory across all topics
- Specific prerequisite definitions and numerical examples required for `prerequisites.html`
- Topic-by-topic Jargon Buster catalog (term, symbol, plain-Greek translation, intuition)
- Exam problem audit with step-by-step intermediate calculation gaps
- Detailed 5-Day Sprint blueprint and 5 verified micro-drills with numeric answers
When complete, notify parent orchestrator via send_message.

## 2026-09-03T09:30:59Z
You are Survey Spec Miner 2. Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_2.
Read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md and D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_2\DISPATCH.md.
Mine the full pedagogical curriculum across topic1-7.html, exam_prep.html, flashcards.html, and interactive_quiz.html.
Catalog:
1. Mathematical prerequisites required for prerequisites.html with concrete numerical examples.
2. Jargon Busters for each of the 7 topics.
3. Exam prep intermediate step gaps and student traps.
4. Detailed 5-Day Study Sprint plan and 5 micro-drills with verified numeric solutions.
Write your complete report to D:\University\Αριθμητικη Αναλυση\.agents\survey_explorer_2\handoff.md.
When finished, send a message to parent using send_message with a summary and the path to your handoff.md.

