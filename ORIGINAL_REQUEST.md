# Original User Request

## Initial Request — 2026-09-03T09:29:15Z

Overhaul the Numerical Analysis (ΕΚΠΑ DIT) webnotes into an ultra-accessible, beginner-friendly study hub designed for a student with zero prior background to pass the exam (target: 5-6/10) within a 5-6 day study sprint.

Working directory: D:\University\Αριθμητικη Αναλυση
Integrity mode: development

## Requirements

### R1. Standalone Prerequisites Hub ("Μαθηματικά από το Μηδέν") & In-Place Jargon Busters
Deliver a dedicated prerequisites module (`prerequisites.html`) linked in the navigation bar and home page. Provide plain-language, visual explanations from scratch for foundational concepts: matrix anatomy ($m \times n$, rows, columns, indices $a_{ij}$), matrix addition/multiplication, the identity matrix $I$, inverse matrix $A^{-1}$, elementary row operations ($R_i \leftarrow R_i - m R_j$) with sign-trap warnings, basic single-variable calculus (derivatives of polynomials, critical points), absolute value inequalities ($|g'(x)| < 1$), and the concept of an iteration error. In addition, embed contextual "Jargon Buster" collapsible/callout components across all existing topic pages for immediate in-situ clarification of mathematical symbols.

### R2. Interactive 5-Day "High-ROI First" Study Sprint Plan
Provide an interactive day-by-day study roadmap structured around high-yield exam patterns (MATLAB commands & iteration script, complexity operation counts, quadrature weights & degree of precision, fixed-point/Newton convergence on Days 1-3 to lock in 50-60 marks, followed by Gauss-Jordan partial pivoting and Newton interpolation on Days 4-5). Include a persistent, browser-saved (`localStorage`) checklist for daily milestones and instant-reveal micro-drills for each day.

### R3. ELI5 Overhaul of Core Topic Pages & Exam Prep Recipes
Enhance all primary topic pages and `exam_prep.html` with beginner-oriented "Explain Like I'm 5" walkthroughs, fully annotated step-by-step calculations with highlighted intermediate arithmetic, explicit warnings on common student traps, and concrete recognition formulas ("When you see question phrasing X, follow recipe steps 1-2-3"). Write in a friendly, direct, student-to-student tone in Greek without unnecessary academic formality.

### R4. Comprehensive Verification & Navigation Integrity
Ensure seamless site-wide navigation (navbar across all pages including new modules), functional MathJax LaTeX equation rendering with zero raw unrendered TeX syntax, validated responsive layout, and programmatic verification ensuring all links and interactive elements operate without JavaScript errors.

## Acceptance Criteria

### Navigation & Site Structure
- [ ] `prerequisites.html` exists, is linked in `js/nav.js` and `index.html`, and renders valid HTML with complete styling matching the existing dark theme.
- [ ] All topic pages (`topic1` through `topic7`), `exam_prep.html`, `flashcards.html`, and `interactive_quiz.html` have working reciprocal navigation links to `prerequisites.html`.
- [ ] Zero broken relative links (`href`) across all HTML files in the workspace.

### Pedagogical Completeness (Zero-to-Hero)
- [ ] `prerequisites.html` contains dedicated explanations with concrete numeric examples for: (1) Matrices & dimensions, (2) Row operations and multiplier calculations with negative sign safety, (3) Identity and inverse matrices, (4) Basic derivative rules, and (5) Absolute value inequalities.
- [ ] Each of the 7 topic pages and `exam_prep.html` contains at least one in-place "Jargon Buster" callout demystifying topic-specific symbols and terminology.
- [ ] Every model solution in `exam_prep.html` contains step-by-step intermediate calculation steps rather than jumping directly to final equations.

### 5-Day Study Plan & Interactive Features
- [ ] The 5-day study roadmap is present with day-by-day objectives ordered by High-ROI (Days 1-3: MATLAB, Complexity, Weights, Fixed-Point; Days 4-5: Gauss/Jordan, Interpolation, Full Exam Simulation).
- [ ] Daily progress checkboxes persist their state across page reloads using browser `localStorage`.
- [ ] At least 5 instant-reveal micro-drills (one for each sprint day) allow the student to attempt a focused calculation and reveal the verified solution on click.

### Technical & Script Quality
- [ ] Zero console JavaScript errors (`SyntaxError`, `TypeError`, or unresolved variables) during page load across all pages.
- [ ] MathJax renders all mathematical formulas without raw unescaped TeX delimiters visible as text.
- [ ] Automated fidelity/verification script or check confirms that all course topics and prerequisite concepts are intact and correctly cross-referenced.
