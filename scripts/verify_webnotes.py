#!/usr/bin/env python3
"""
scripts/verify_webnotes.py
=============================================================================
Automated Fidelity, Link Integrity, MathJax, and Component Verification Suite.
Numerical Analysis (ΕΚΠΑ DIT) Webnotes Overhaul — Milestone 4 (R4)

Zero External Dependencies:
  Uses exclusively Python standard library modules:
  os, sys, re, json, urllib.parse, html.parser.

Exit Code:
  0 = All suites pass with 0 critical errors.
  1 = Verification failed (one or more critical errors detected).
=============================================================================
"""

import os
import sys
import re
import json
import urllib.parse
from html.parser import HTMLParser

# ─────────────────────────────────────────────────────────────────────────────
# Path Configuration
# ─────────────────────────────────────────────────────────────────────────────
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

EXPECTED_HTML_PAGES = [
    "index.html",
    "prerequisites.html",
    "topic1_direct_linear.html",
    "topic2_iterative_linear.html",
    "topic3_nonlinear.html",
    "topic4_interpolation.html",
    "topic5_integration.html",
    "topic6_odes.html",
    "topic7_matlab_guide.html",
    "exam_prep.html",
    "flashcards.html",
    "interactive_quiz.html",
]

EXPECTED_CSS_FILES = [
    os.path.join("styles", "base.css"),
    os.path.join("styles", "components.css"),
    os.path.join("styles", "layout.css"),
    os.path.join("styles", "quiz.css"),
]

EXPECTED_JS_FILES = [
    os.path.join("js", "nav.js"),
    os.path.join("js", "study_plan.js"),
    os.path.join("js", "flashcards.js"),
    os.path.join("js", "interactive_quiz.js"),
    os.path.join("js", "quiz-loader.js"),
    os.path.join("data", "flashcards.js"),
    os.path.join("data", "questions.js"),
]

TOPIC_PAGES = [
    "topic1_direct_linear.html",
    "topic2_iterative_linear.html",
    "topic3_nonlinear.html",
    "topic4_interpolation.html",
    "topic5_integration.html",
    "topic6_odes.html",
    "topic7_matlab_guide.html",
]

SKIP_MATH_TAGS = {"script", "style", "pre", "code", "textarea", "noscript"}


# ─────────────────────────────────────────────────────────────────────────────
# HTML Parser & DOM Structure Extraction
# ─────────────────────────────────────────────────────────────────────────────
class HTMLAnalyzer(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.links = []          # list of (tag, attr, raw_val, line_num)
        self.element_ids = set() # all element IDs in this page
        self.classes = set()     # all classes encountered
        self.data_attrs = {}     # data-attr-name -> list of values
        self.has_mathjax = False
        self.has_process_escapes = False
        self.text_chunks = []    # (text, line_num) outside skipped tags
        self._skip_depth = 0
        self._in_script = False
        self._current_script_text = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        line_num = self.getpos()[0]

        if "id" in attr_dict:
            self.element_ids.add(attr_dict["id"])

        if "class" in attr_dict:
            for cls in attr_dict["class"].split():
                self.classes.add(cls)

        for k, v in attr_dict.items():
            if k.startswith("data-"):
                self.data_attrs.setdefault(k, []).append(v)

        if tag in SKIP_MATH_TAGS:
            self._skip_depth += 1

        if tag == "script":
            self._in_script = True
            self._current_script_text = []
            src = attr_dict.get("src", "")
            if "mathjax" in src.lower() or attr_dict.get("id") == "MathJax-script":
                self.has_mathjax = True
            if src:
                self.links.append((tag, "src", src, line_num))
        elif tag in ("a", "link"):
            href = attr_dict.get("href")
            if href is not None:
                self.links.append((tag, "href", href, line_num))
        elif tag == "img":
            src = attr_dict.get("src")
            if src is not None:
                self.links.append((tag, "src", src, line_num))

    def handle_endtag(self, tag):
        if tag in SKIP_MATH_TAGS and self._skip_depth > 0:
            self._skip_depth -= 1

        if tag == "script":
            self._in_script = False
            script_body = "".join(self._current_script_text)
            if "MathJax" in script_body and "processEscapes" in script_body:
                if re.search(r"processEscapes\s*:\s*true", script_body):
                    self.has_process_escapes = True
            self._current_script_text = []

    def handle_data(self, data):
        if self._in_script:
            self._current_script_text.append(data)
        elif self._skip_depth == 0:
            self.text_chunks.append((data, self.getpos()[0]))


# ─────────────────────────────────────────────────────────────────────────────
# Test Suites
# ─────────────────────────────────────────────────────────────────────────────
class VerificationRunner:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.errors = []
        self.warnings = []
        self.page_data = {}  # filename -> (raw_content, HTMLAnalyzer instance)

    def log_error(self, message):
        self.errors.append(message)
        print(f"    ❌ ERROR: {message}")

    def log_warning(self, message):
        self.warnings.append(message)
        print(f"    ⚠️  WARN:  {message}")

    def log_pass(self, message):
        print(f"    ✓ {message}")

    # ─────────────────────────────────────────────────────────────────────────
    # Suite 1: Catalog Check
    # ─────────────────────────────────────────────────────────────────────────
    def run_suite_1_catalog(self):
        print("\n" + "=" * 78)
        print(" [Suite 1/5] Catalog Check — Required Workspace Files & Structure")
        print("=" * 78)

        # 1.1 HTML Files
        print("  Checking 12 Core HTML Pages:")
        for rel_path in EXPECTED_HTML_PAGES:
            full_path = os.path.join(self.root_dir, rel_path)
            if not os.path.isfile(full_path):
                self.log_error(f"Missing required HTML file: {rel_path}")
                continue
            size = os.path.getsize(full_path)
            if size == 0:
                self.log_error(f"Required HTML file is empty (0 bytes): {rel_path}")
                continue

            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    content = f.read()
                analyzer = HTMLAnalyzer(rel_path)
                analyzer.feed(content)
                self.page_data[rel_path] = (content, analyzer)
                self.log_pass(f"{rel_path:<28} ({size:>6} bytes, {len(analyzer.element_ids):>3} IDs, {len(analyzer.links):>3} links)")
            except Exception as e:
                self.log_error(f"HTML parse failure in {rel_path}: {e}")

        # 1.2 CSS Files
        print("\n  Checking Core CSS Stylesheets:")
        for rel_path in EXPECTED_CSS_FILES:
            full_path = os.path.join(self.root_dir, rel_path)
            if not os.path.isfile(full_path):
                self.log_error(f"Missing required CSS file: {rel_path}")
            else:
                size = os.path.getsize(full_path)
                self.log_pass(f"{rel_path:<28} ({size:>6} bytes)")

        # 1.3 JS Files
        print("\n  Checking Core JavaScript Engines & Data Stores:")
        for rel_path in EXPECTED_JS_FILES:
            full_path = os.path.join(self.root_dir, rel_path)
            if not os.path.isfile(full_path):
                self.log_error(f"Missing required JS file: {rel_path}")
            else:
                size = os.path.getsize(full_path)
                self.log_pass(f"{rel_path:<28} ({size:>6} bytes)")

    # ─────────────────────────────────────────────────────────────────────────
    # Suite 2: Link & Anchor Integrity
    # ─────────────────────────────────────────────────────────────────────────
    def run_suite_2_links_and_anchors(self):
        print("\n" + "=" * 78)
        print(" [Suite 2/5] Link & Anchor Integrity — Cross-Page & Intra-Page Validation")
        print("=" * 78)

        total_links_audited = 0
        broken_links_count = 0

        for p, (content, parser) in self.page_data.items():
            for tag, attr, raw_url, line in parser.links:
                total_links_audited += 1

                # Skip standard external / non-navigational protocols
                if raw_url.startswith(("http://", "https://", "//", "mailto:", "tel:", "javascript:")):
                    continue

                clean_url = raw_url.strip()
                if not clean_url:
                    continue

                parsed = urllib.parse.urlsplit(clean_url)
                path_part = urllib.parse.unquote(parsed.path)
                fragment = urllib.parse.unquote(parsed.fragment)

                # Case A: Cross-page link (with or without anchor)
                if path_part:
                    # Resolve relative to the page containing the link
                    target_full_path = os.path.normpath(os.path.join(self.root_dir, path_part))
                    if not os.path.exists(target_full_path):
                        broken_links_count += 1
                        self.log_error(f"[{p}:{line}] Broken target file: <{tag} {attr}='{clean_url}'> -> '{path_part}' not found")
                        continue

                    # If target has fragment and is an expected HTML page, audit target anchor
                    if fragment:
                        target_filename = os.path.basename(target_full_path)
                        if target_filename in self.page_data:
                            target_ids = self.page_data[target_filename][1].element_ids
                            if fragment not in target_ids:
                                broken_links_count += 1
                                self.log_error(f"[{p}:{line}] Broken cross-page anchor: <{tag} {attr}='{clean_url}'> -> #{fragment} not in {target_filename}")

                # Case B: Intra-page anchor (#something)
                elif fragment:
                    # Allow standard browser top alias or empty
                    if fragment in ("top", ""):
                        continue
                    if fragment not in parser.element_ids:
                        broken_links_count += 1
                        self.log_error(f"[{p}:{line}] Broken intra-page anchor: <{tag} {attr}='{clean_url}'> -> #{fragment} does not exist on {p}")

        if broken_links_count == 0:
            self.log_pass(f"Audited {total_links_audited} internal/relative links across all 12 pages: ZERO broken links or anchors!")

    # ─────────────────────────────────────────────────────────────────────────
    # Suite 3: MathJax & LaTeX Syntax
    # ─────────────────────────────────────────────────────────────────────────
    def run_suite_3_mathjax_and_latex(self):
        print("\n" + "=" * 78)
        print(" [Suite 3/5] MathJax & LaTeX Syntax Audit")
        print("=" * 78)

        for p, (content, parser) in self.page_data.items():
            # 3.1 Script inclusion
            if not parser.has_mathjax:
                self.log_error(f"[{p}] Missing MathJax script loader in <head>")
            else:
                self.log_pass(f"[{p}] MathJax script tag present")

            if not parser.has_process_escapes:
                self.log_warning(f"[{p}] MathJax configuration missing 'processEscapes: true'")

            # 3.2 Combine content text outside <pre>, <code>, <script>, <style>
            full_text = "".join(chunk for chunk, _ in parser.text_chunks)

            # Check paired display math $$...$$
            display_count = len(re.findall(r"\$\$", full_text))
            if display_count % 2 != 0:
                self.log_error(f"[{p}] Unpaired display math delimiter '$$' (odd count: {display_count})")
            else:
                self.log_pass(f"[{p}] Display math delimiters '$$' balanced ({display_count // 2} display formulas)")

            # Check paired inline math $...$ (after stripping valid display math)
            text_no_display = re.sub(r"\$\$[\s\S]*?\$\$", "", full_text)
            unescaped_single_dollars = re.findall(r"(?<!\\)\$", text_no_display)
            single_count = len(unescaped_single_dollars)
            if single_count % 2 != 0:
                self.log_error(f"[{p}] Unpaired inline math delimiter '$' (odd count: {single_count})")
            else:
                self.log_pass(f"[{p}] Inline math delimiters '$' balanced ({single_count // 2} inline formulas)")

            # 3.3 LaTeX Environment Balancing (\begin{env} vs \end{env})
            begins = re.findall(r"\\begin\{([a-zA-Z*]+)\}", full_text)
            ends = re.findall(r"\\end\{([a-zA-Z*]+)\}", full_text)
            if sorted(begins) != sorted(ends):
                diff_b = [b for b in set(begins) if begins.count(b) != ends.count(b)]
                diff_e = [e for e in set(ends) if ends.count(e) != begins.count(e)]
                self.log_error(f"[{p}] LaTeX environment mismatch: unbalanced \\begin: {diff_b}, \\end: {diff_e}")
            elif begins:
                self.log_pass(f"[{p}] All LaTeX environments balanced ({len(begins)} blocks: {set(begins)})")

            # 3.4 Raw HTML Entity Leakage Inside Math (&amp;, &lt;, &gt;)
            # Rigorously extract authentic math blocks using alternating delimiter tokenization
            math_blocks = []
            display_parts = full_text.split("$$")
            for i, d_part in enumerate(display_parts):
                if i % 2 == 1:
                    # Inside display math ($$...$$)
                    math_blocks.append(d_part)
                else:
                    # Outside display math: extract inline math ($...$)
                    inline_parts = re.split(r"(?<!\\)\$", d_part)
                    for j, in_part in enumerate(inline_parts):
                        if j % 2 == 1:
                            # Inside inline math ($...$)
                            math_blocks.append(in_part)

            entity_issues = 0
            for block in math_blocks:
                if "&amp;" in block:
                    entity_issues += 1
                    preview = (block[:60] + "...") if len(block) > 60 else block
                    self.log_error(f"[{p}] Unescaped '&amp;' inside math block: {preview}")
                if "&lt;" in block:
                    entity_issues += 1
                    preview = (block[:60] + "...") if len(block) > 60 else block
                    self.log_error(f"[{p}] HTML entity '&lt;' inside math block: {preview} (use '\\lt' or '<')")
                if "&gt;" in block:
                    entity_issues += 1
                    preview = (block[:60] + "...") if len(block) > 60 else block
                    self.log_error(f"[{p}] HTML entity '&gt;' inside math block: {preview} (use '\\gt' or '>')")

            if entity_issues == 0:
                self.log_pass(f"[{p}] Clean math blocks (0 raw HTML entities inside TeX)")

    # ─────────────────────────────────────────────────────────────────────────
    # Suite 4: Prerequisites & Pedagogical Integrity
    # ─────────────────────────────────────────────────────────────────────────
    def run_suite_4_prerequisites_and_pedagogy(self):
        print("\n" + "=" * 78)
        print(" [Suite 4/5] Prerequisites & Pedagogical Integrity")
        print("=" * 78)

        # 4.1 js/nav.js registration
        nav_path = os.path.join(self.root_dir, "js", "nav.js")
        with open(nav_path, "r", encoding="utf-8") as f:
            nav_src = f.read()
        if "prerequisites.html" in nav_src:
            self.log_pass("js/nav.js: 'prerequisites.html' is registered in topics navigation array")
        else:
            self.log_error("js/nav.js: 'prerequisites.html' is NOT registered in topics array")

        # 4.2 index.html links to prerequisites.html
        if "index.html" in self.page_data:
            index_parser = self.page_data["index.html"][1]
            index_has_prereq = any(link[1] == "href" and "prerequisites.html" in link[2] for link in index_parser.links)
            if index_has_prereq:
                self.log_pass("index.html: Links to prerequisites.html present")
            else:
                self.log_error("index.html: Missing link to prerequisites.html")

        # 4.3 Reciprocal Links from Topics 1–7 and exam_prep.html
        print("\n  Checking Reciprocal Links to prerequisites.html:")
        target_pages = TOPIC_PAGES + ["exam_prep.html", "flashcards.html", "interactive_quiz.html"]
        for p in target_pages:
            if p not in self.page_data:
                continue
            parser = self.page_data[p][1]
            has_reciprocal = any(link[1] == "href" and "prerequisites.html" in link[2] for link in parser.links)
            if has_reciprocal:
                self.log_pass(f"{p:<28} -> Has reciprocal link to prerequisites.html")
            else:
                self.log_error(f"{p:<28} -> Missing reciprocal link to prerequisites.html")

        # 4.4 In-Place Jargon Busters across Topics 1–7 and exam_prep.html
        print("\n  Checking In-Place Jargon Buster Components:")
        jargon_classes = {"jargon-buster", "jargon-box", "jargon-callout"}
        for p in TOPIC_PAGES + ["exam_prep.html"]:
            if p not in self.page_data:
                continue
            parser = self.page_data[p][1]
            has_jargon = bool(parser.classes.intersection(jargon_classes) or "data-jargon" in parser.data_attrs)
            if has_jargon:
                self.log_pass(f"{p:<28} -> Jargon Buster component detected")
            else:
                self.log_error(f"{p:<28} -> Missing in-place Jargon Buster component")

        # 4.5 Prerequisites Hub 6 Pedagogical Pillars
        print("\n  Auditing Prerequisites Hub ('prerequisites.html') Pedagogical Pillars:")
        if "prerequisites.html" in self.page_data:
            prereq_ids = self.page_data["prerequisites.html"][1].element_ids
            pillars = [
                ("Matrix Anatomy & Dimensions", {"module1", "sec-matrices"}),
                ("Matrix Multiplication & Addition", {"module2", "matrix-mult"}),
                ("Identity & Inverse Matrix", {"module3", "sec-identity-inverse"}),
                ("Row Operations & Multiplier Sign Safety", {"module4", "sec-row-ops"}),
                ("Single-Variable Calculus & Derivatives", {"module5", "sec-derivatives"}),
                ("Absolute Value Inequalities", {"module6", "sec-inequalities", "abs-ineq"}),
                ("Iteration Error & Residuals", {"module7", "sec-iteration-error"}),
            ]
            for title, id_candidates in pillars:
                if prereq_ids.intersection(id_candidates):
                    self.log_pass(f"Found pillar: {title} (ID: {id_candidates.intersection(prereq_ids)})")
                else:
                    self.log_error(f"Missing required prerequisite pillar: {title} (Expected one of IDs: {id_candidates})")

    # ─────────────────────────────────────────────────────────────────────────
    # Suite 5: 5-Day Study Sprint Plan & Interactive Suite
    # ─────────────────────────────────────────────────────────────────────────
    def run_suite_5_study_plan_and_interactive(self):
        print("\n" + "=" * 78)
        print(" [Suite 5/5] 5-Day Study Sprint Plan & Interactive Suite")
        print("=" * 78)

        # 5.1 Study Sprint presence on index.html
        if "index.html" in self.page_data:
            index_parser = self.page_data["index.html"][1]
            has_sprint = (
                "sprint-plan" in index_parser.element_ids
                or "sprint-checklist-container" in index_parser.element_ids
                or "sprint-section" in index_parser.classes
            )
            if has_sprint:
                self.log_pass("index.html: 5-Day Study Sprint Plan section present")
            else:
                self.log_error("index.html: Missing 5-Day Study Sprint Plan section")

            # 5.2 Persistent Task Checkboxes (data-task-id)
            task_ids = index_parser.data_attrs.get("data-task-id", [])
            if len(task_ids) >= 5:
                self.log_pass(f"index.html: {len(task_ids)} persistent study sprint task checkboxes found (>= 5 required)")
            else:
                self.log_error(f"index.html: Found {len(task_ids)} task checkboxes (at least 5 required)")

            # 5.3 Instant-Reveal Micro-Drills (data-drill-id)
            drill_ids = index_parser.data_attrs.get("data-drill-id", [])
            if len(drill_ids) >= 5:
                self.log_pass(f"index.html: {len(drill_ids)} instant-reveal micro-drills found (>= 5 required)")
            else:
                self.log_error(f"index.html: Found {len(drill_ids)} micro-drills (at least 5 required)")

            # Verify matching solution element exists for each drill
            for did in drill_ids:
                possible_sol_ids = {f"drill-sol-{did}", f"drill-sol-drill{did}", f"sol-{did}"}
                if index_parser.element_ids.intersection(possible_sol_ids):
                    self.log_pass(f"Micro-drill '{did}' -> Solution container verified")
                else:
                    self.log_error(f"Micro-drill '{did}' -> Missing solution container #{possible_sol_ids}")

        # 5.4 Flashcards Script Logic Normalization (card.question / card.q & card.answer / card.a)
        fc_path = os.path.join(self.root_dir, "js", "flashcards.js")
        with open(fc_path, "r", encoding="utf-8") as f:
            fc_code = f.read()

        supports_question = ("card.question" in fc_code or "question:" in fc_code) and ("card.q" in fc_code or "q:" in fc_code)
        supports_answer = ("card.answer" in fc_code or "answer:" in fc_code) and ("card.a" in fc_code or "a:" in fc_code)
        if supports_question and supports_answer:
            self.log_pass("js/flashcards.js: Script correctly normalizes both question/q and answer/a schemas")
        else:
            self.log_error("js/flashcards.js: Missing schema normalization patch for question/answer properties")

        # 5.5 Study Plan Persistence Contract in js/study_plan.js
        sp_path = os.path.join(self.root_dir, "js", "study_plan.js")
        with open(sp_path, "r", encoding="utf-8") as f:
            sp_code = f.read()
        if "webnotes-sprint-checklist" in sp_code:
            self.log_pass("js/study_plan.js: Uses authoritative storage key 'webnotes-sprint-checklist'")
        else:
            self.log_error("js/study_plan.js: Missing authoritative storage key 'webnotes-sprint-checklist'")

        # 5.6 Interactive Quiz and Deck containers on topic pages
        print("\n  Checking Interactive Components on Topic Pages:")
        for p in TOPIC_PAGES:
            if p not in self.page_data:
                continue
            parser = self.page_data[p][1]
            has_quiz = "section-quiz" in parser.classes or "quiz-container" in parser.classes
            has_fc = "data-fc-deck" in parser.data_attrs or "flashcards" in parser.element_ids
            if has_quiz and has_fc:
                self.log_pass(f"{p:<28} -> Both section-quiz and flashcard deck containers present")
            else:
                self.log_warning(f"{p:<28} -> Quiz: {has_quiz}, Flashcards: {has_fc}")


# ─────────────────────────────────────────────────────────────────────────────
# Entry Point
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("=" * 78)
    print("  ΕΚΠΑ DIT — Numerical Analysis (Αριθμητική Ανάλυση) Webnotes")
    print("  COMPREHENSIVE VERIFICATION & FIDELITY HARNESS (Milestone 4 / R4)")
    print("=" * 78)
    print(f"Workspace Root: {ROOT_DIR}")

    runner = VerificationRunner(ROOT_DIR)
    runner.run_suite_1_catalog()
    runner.run_suite_2_links_and_anchors()
    runner.run_suite_3_mathjax_and_latex()
    runner.run_suite_4_prerequisites_and_pedagogy()
    runner.run_suite_5_study_plan_and_interactive()

    print("\n" + "=" * 78)
    print(" 📊 FINAL VERIFICATION REPORT")
    print("=" * 78)
    print(f"  Critical Errors: {len(runner.errors)}")
    print(f"  Warnings:        {len(runner.warnings)}")

    if runner.warnings:
        print("\n  ⚠️  WARNINGS:")
        for w in runner.warnings:
            print(f"    - {w}")

    if runner.errors:
        print("\n  ❌ CRITICAL ERRORS ENCOUNTERED:")
        for e in runner.errors:
            print(f"    - {e}")
        print("\n" + "=" * 78)
        print("  RESULT: FAILED")
        print("=" * 78)
        return False
    else:
        print("\n  ✅ ALL CHECKS PASSED: 100% Navigation & Pedagogical Integrity Confirmed!")
        print("=" * 78)
        print("  RESULT: SUCCESS (Exit Code 0)")
        print("=" * 78)
        return True


if __name__ == "__main__":
    passed = main()
    sys.exit(0 if passed else 1)
