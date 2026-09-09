import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

files = [
    'topic1_direct_linear.html',
    'topic2_iterative_linear.html',
    'topic3_nonlinear.html',
    'topic4_interpolation.html',
    'topic5_integration.html',
    'topic6_odes.html',
    'topic7_matlab_guide.html',
    'exam_prep.html'
]

jb_pattern = re.compile(r'<details class="jargon-buster">(.*?)</details>', re.DOTALL)
term_pattern = re.compile(r'<summary>.*?<span class="jargon-term">(.*?)</span>.*?</summary>', re.DOTALL)

total_jb = 0
all_passed = True

for fn in files:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    matches = jb_pattern.findall(content)
    print(f"\n=== {fn}: {len(matches)} Jargon Busters ===")
    total_jb += len(matches)
    if len(matches) < 2:
        print(f"  ERROR: Expected at least 2 Jargon Busters, found {len(matches)}")
        all_passed = False

    for idx, jb in enumerate(matches, 1):
        term_match = term_pattern.search(jb)
        term = term_match.group(1).strip() if term_match else 'NO TERM MATCH'
        if not term_match:
            print(f"  ERROR: Jargon Buster #{idx} has invalid summary/term markup!")
            all_passed = False

        # Extract display and inline math
        display_math = re.findall(r'\$\$(.*?)\$\$', jb, re.DOTALL)
        jb_no_disp = re.sub(r'\$\$(.*?)\$\$', '', jb, flags=re.DOTALL)
        inline_math = re.findall(r'\$(.*?)\$', jb_no_disp, re.DOTALL)

        rem = re.sub(r'\$(.*?)\$', '', jb_no_disp, flags=re.DOTALL)
        unclosed_dollar = '$' in rem

        has_content_div = '<div class="jargon-content">' in jb
        has_ti_simainei = 'Τι σημαίνει στα απλά ελληνικά:' in jb
        has_diaisthisi = 'Διαίσθηση / Γιατί σε νοιάζει στις εξετάσεις' in jb

        print(f"  [{idx}] Term: {term}")
        print(f"      Display formulas: {len(display_math)}, Inline formulas: {len(inline_math)}")
        print(f"      Structure check: content_div={has_content_div}, ti_simainei={has_ti_simainei}, diaisthisi={has_diaisthisi}")

        if not (has_content_div and has_ti_simainei and has_diaisthisi):
            print(f"      ERROR: Structure contract failed in {fn} #{idx}!")
            all_passed = False

        if unclosed_dollar:
            print(f"      ERROR: Unclosed dollar sign in {fn} jb #{idx}!")
            all_passed = False
        else:
            print(f"      MathJax TeX delimiters: OK")

print(f"\n======================================")
print(f"Total Jargon Busters audited: {total_jb}")
print(f"Audit overall status: {'ALL CHECKS PASSED' if all_passed and total_jb == 16 else 'FAILED'}")
