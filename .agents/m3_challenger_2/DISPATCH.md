# Task Assignment: M3 Challenger 2 (Mathematical Oracle for Question Types A–H)

## Mission
Adversarially challenge and verify the mathematical accuracy of every single formula, intermediate arithmetic step, and numerical result in Question Types A through H in `exam_prep.html`.

## Inputs to Read
- `D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md` (authoritative request — MANDATORY)
- `D:\University\Αριθμητικη Αναλυση\PROJECT.md`
- `D:\University\Αριθμητικη Αναλυση\exam_prep.html` (Types A–H in Section 4)

## Mathematical Verification Tasks
Conduct independent derivations and arithmetic checks for:
1. Type A: Root $\sqrt{3}$, $g'(x) = 1 + 2\lambda x$, local convergence interval $(-\sqrt{3}/3, 0)$, optimal $\lambda^* = -\sqrt{3}/6$, $g''(\sqrt{3}) = -\sqrt{3}/3 \ne 0 \implies p=2$.
2. Type B: Gauss-Jordan inversion of $A = \begin{bmatrix}1&1&2\\-1&1&0\\2&-2&4\end{bmatrix}$. Verify partial pivoting row swaps ($R_1 \leftrightarrow R_3, R_2 \leftrightarrow R_3$), elementary multipliers, intermediate matrices, and inverse $A^{-1}$.
3. Type C: Complexity operations count for $(A^{-1} + BC^{-1})x = A^{-1}b$ ($4n^3$) and transformed system $(I + ABC^{-1})x = b$ ($11n^3/3$).
4. Type D: Divided differences table for points $(-2, -3), (-1, 4), (1, 6), (3, 32)$. Check $P_2(x)$, $P_2(0)=7$, $P_3(x)$, $P_3(0)=5$, and Simpson integral on $[-1, 3]$ ($I=40$).
5. Type E: Quadrature formula on $[-1, 1]$ with fixed node $x_2=1$. Check weights $w_1=3/2, w_2=1/2$, node $x_1=-1/3$, exactness on $1, x, x^2$, failure on $x^3 \implies d=2$.
6. Type F: Newton-Raphson 5 global convergence conditions for $f(x)=x^3+6x-1$ on $[0, 1]$. Check Fourier condition $|f(0)/f'(0)| = 1/6 \le 1$.
7. Type G: ODE IVP $y'=y-x^2+1, y(1)=2$. Check implicit derivative $y'' = (y-x^2+1)-2x$, value at $(1, 2)$ ($y''=0$), and Taylor 3-term step $y_1=4$.
8. Type H: MATLAB column-major 1-based indexing, iteration script structure.

## Output Requirements
Write your adversarial mathematical report to `D:\University\Αριθμητικη Αναλυση\.agents\m3_challenger_2\handoff.md`.
Conclude with VERDICT: APPROVE or VERDICT: REJECT.
Notify parent orchestrator via send_message when complete.

## 2026-09-03T14:37:34Z
You are M3 Challenger 2 (teamwork_preview_challenger).
Your working directory is D:\University\Αριθμητικη Αναλυση\.agents\m3_challenger_2.
Read D:\University\Αριθμητικη Αναλυση\.agents\m3_challenger_2\DISPATCH.md for your mission, instructions, and required inputs.
Ensure you read D:\University\Αριθμητικη Αναλυση\ORIGINAL_REQUEST.md first.
Perform independent mathematical proofs and arithmetic checks for all 8 Question Types (A–H) in exam_prep.html.
Write your complete handoff report to D:\University\Αριθμητικη Αναλυση\.agents\m3_challenger_2\handoff.md.
Conclude with VERDICT: APPROVE or VERDICT: REJECT.
Send a message back to parent when done.
