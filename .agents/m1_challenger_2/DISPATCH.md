# Task Assignment: M1 Challenger 2 (Mathematical Oracles & Numerical Verification)

## Mission
Adversarially challenge and verify the mathematical correctness of every single formula, numerical example, and mini-drill in `prerequisites.html` and in the 16 Jargon Busters.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- `D:\University\Αριθμητικη Αναλυση\prerequisites.html`
- All 16 Jargon Busters across Topics 1–7 and `exam_prep.html`

## Adversarial Mathematical Verification Tasks
Write and execute verification scripts (e.g. Python numpy/sympy) to independently verify:
1. Module 1 & 2: Matrix addition and multiplication examples:
   - Example 1: $\begin{bmatrix} 1 & 2 \\ 3 & -1 \end{bmatrix} \begin{bmatrix} 4 & 0 \\ 2 & 5 \end{bmatrix} = \begin{bmatrix} 8 & 10 \\ 10 & -5 \end{bmatrix}$
   - Reverse: $\begin{bmatrix} 4 & 0 \\ 2 & 5 \end{bmatrix} \begin{bmatrix} 1 & 2 \\ 3 & -1 \end{bmatrix} = \begin{bmatrix} 4 & 8 \\ 17 & -1 \end{bmatrix}$
   - Mini-drill 2: $\begin{bmatrix} 2 & 3 \end{bmatrix} \begin{bmatrix} 4 \\ -1 \end{bmatrix} = [5]$ and $\begin{bmatrix} 4 \\ -1 \end{bmatrix} \begin{bmatrix} 2 & 3 \end{bmatrix} = \begin{bmatrix} 8 & 12 \\ -2 & -3 \end{bmatrix}$
2. Module 3: Inverse $A = \begin{bmatrix} 3 & 1 \\ 5 & 2 \end{bmatrix} \implies \det(A)=1, A^{-1} = \begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix}$. Verify $A A^{-1} = I$.
3. Module 4: Row operations $R_2 + 2R_1 = [0, 5, 3 \mid 18]$, $R_3 - 3R_1 = [0, -5, 4 \mid -13]$. Multipliers $m_{21}=-2, m_{31}=3$. Mini-drill 4: $R_2 + 2R_1 = [0, -3 \mid 6]$.
4. Module 5: Derivatives of $x^3-6x+2$, critical points $\pm\sqrt{2}$. ODE implicit derivative $y'=x+y \implies y''=x+y+1$. Taylor 3-term $y(0.1) \approx 1.21$.
5. Module 6: Solving $-1 < 1 - 2\sqrt{3}\lambda < 1 \implies 0 < \lambda < 1/\sqrt{3}$. Mini-drill 6: $|1+4\lambda| < 1 \implies -0.5 < \lambda < 0$.
6. Module 7: True solution $\xi=[2, 1]^T$, approximation $x^{(1)}=[1.9, 1.1]^T$, $Ax^{(1)}=[6.8, 4.1]^T$, residual $r = [0.2, -0.1]^T$. Mini-drill 7 calculations.
7. Jargon Busters: Verify formulas in all 16 Jargon Busters (e.g. Jacobi, Gauss-Seidel, Simpson, Runge, condition number, complexity operations).

## Output Requirements
Write your adversarial mathematical verification report to `D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_2\handoff.md`.
Include verification code, execution output, and proof traces.
End with a clear, unambiguous verdict: `VERDICT: APPROVE` or `VERDICT: REJECT`.
Notify parent orchestrator via send_message when complete.

## 2026-09-03T09:55:39Z
You are M1 Challenger 2. Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_2.
Read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md (MANDATORY), D:\University\Αριθμητικη Αναλυση\PROJECT.md, and D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_2\DISPATCH.md.
Adversarially test the mathematical accuracy of all numeric calculations, matrix examples, derivatives, inequalities, and residual vectors in prerequisites.html and Jargon Busters.
Write your report to D:\University\Αριθμητικη Αναλυση\.agents\m1_challenger_2\handoff.md.
Conclude with VERDICT: APPROVE or VERDICT: REJECT.
Notify parent via send_message when complete.
