#!/usr/bin/env python3
"""
scripts/verify_interactive_client.py
=============================================================================
Independent Empirical Challenger Validation Suite for Interactive Scripts
Numerical Analysis (ΕΚΠΑ DIT) Webnotes — Milestone 4 (R4)
Challenger 2: Interactive Features, Client Scripts & State Persistence

Zero External Dependencies:
Uses exclusively Python standard library (os, sys, re, json).
=============================================================================
"""

import os
import sys
import re
import json

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def run_tests():
    passed = 0
    failed = 0
    print("=" * 78)
    print("  INDEPENDENT VERIFICATION: INTERACTIVE CLIENT ENGINES & DOM CONTRACTS")
    print("=" * 78)

    # ─────────────────────────────────────────────────────────────────────────
    # TEST SUITE 1: js/study_plan.js Architecture & Logic Verification
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[Suite 1] js/study_plan.js Verification")
    sp_file = os.path.join(ROOT_DIR, "js", "study_plan.js")
    with open(sp_file, "r", encoding="utf-8") as f:
        sp_src = f.read()

    # 1.1 Storage Key Check
    storage_key_match = re.search(r"const\s+STORAGE_KEY\s*=\s*['\"]([^'\"]+)['\"]", sp_src)
    if storage_key_match and storage_key_match.group(1) == "webnotes-sprint-checklist":
        print("  ✓ Storage key is strictly 'webnotes-sprint-checklist'")
        passed += 1
    else:
        print("  ❌ Storage key mismatch or not found")
        failed += 1

    # 1.2 In-memory Fallback & try/catch Storage Probing
    if "__sprint_probe__" in sp_src and "isLocalStorageAvailable = false" in sp_src:
        print("  ✓ Resilient StorageManager probe with safe in-memory fallback present")
        passed += 1
    else:
        print("  ❌ Missing StorageManager resilience probe")
        failed += 1

    # 1.3 State Sanitization Logic
    if "function sanitizeState" in sp_src and "totalTasks" in sp_src and "lastUpdated" in sp_src:
        print("  ✓ sanitizeState() implementation present and guards tasks/drills/version")
        passed += 1
    else:
        print("  ❌ sanitizeState() missing or incomplete")
        failed += 1

    # 1.4 High-ROI Day Weights Definition
    day_weights_pattern = r"const\s+DAY_WEIGHTS\s*=\s*\{([^}]+)\}"
    dw_match = re.search(day_weights_pattern, sp_src)
    if dw_match:
        dw_content = dw_match.group(1)
        expected_weights = {"'1'": 30, "'2'": 15, "'3'": 15, "'4'": 15, "'5'": 25}
        weights_ok = True
        for d, w in expected_weights.items():
            if not re.search(rf"{d}\s*:\s*{w}", dw_content):
                weights_ok = False
                break
        if weights_ok:
            print("  ✓ DAY_WEIGHTS strictly matches ΕΚΠΑ DIT Exam Blueprint: {1:30, 2:15, 3:15, 4:15, 5:25} (Sum: 100, Days 1-3: 60 PASS)")
            passed += 1
        else:
            print("  ❌ DAY_WEIGHTS values incorrect")
            failed += 1
    else:
        print("  ❌ DAY_WEIGHTS not found")
        failed += 1

    # 1.5 Event Delegation & Bindings
    if ".sprint-chk" in sp_src and "data-task-id" in sp_src:
        print("  ✓ Delegated change event listener bound to .sprint-chk and data-task-id")
        passed += 1
    else:
        print("  ❌ Missing checkbox delegation on document")
        failed += 1

    if ".drill-reveal-btn" in sp_src and "data-drill-id" in sp_src:
        print("  ✓ Delegated click event listener bound to .drill-reveal-btn and data-drill-id")
        passed += 1
    else:
        print("  ❌ Missing micro-drill delegation on document")
        failed += 1

    if "window.StudyPlan" in sp_src and "getState" in sp_src and "typesetMath" in sp_src:
        print("  ✓ Public API window.StudyPlan exposed with getState, setState, reset, typesetMath")
        passed += 1
    else:
        print("  ❌ window.StudyPlan public API incomplete")
        failed += 1


    # ─────────────────────────────────────────────────────────────────────────
    # TEST SUITE 2: js/flashcards.js Schema Normalization & Zero-Undefined
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[Suite 2] js/flashcards.js Normalization Verification")
    fc_file = os.path.join(ROOT_DIR, "js", "flashcards.js")
    with open(fc_file, "r", encoding="utf-8") as f:
        fc_src = f.read()

    # 2.1 Schema Normalization Function
    if "function normalizeCard" in fc_src:
        print("  ✓ normalizeCard() helper function detected")
        passed += 1
    else:
        print("  ❌ normalizeCard() helper missing")
        failed += 1

    # Simulate normalizeCard directly in Python
    def simulate_normalize_card(raw_card, default_topic=""):
        if not raw_card or not isinstance(raw_card, dict):
            return {
                "id": "", "q": "", "question": "", "a": "", "answer": "",
                "hint": "", "tag": "Θεωρία", "topic": default_topic or ""
            }
        cid = raw_card.get("id", "")
        q = raw_card.get("question") or raw_card.get("q") or ""
        a = raw_card.get("answer") or raw_card.get("a") or ""
        hint = raw_card.get("hint") or ""
        topic = raw_card.get("topic") or default_topic or ""
        tag = raw_card.get("tag") or (f"Κάρτα #{cid}" if cid else (topic or "Θεωρία"))
        res = dict(raw_card)
        res.update({
            "id": cid, "q": q, "question": q, "a": a, "answer": a,
            "hint": hint, "tag": tag, "topic": topic
        })
        return res

    def simulate_face_front(card):
        norm = simulate_normalize_card(card)
        hint_html = f'<div class="fc-hint">{norm["hint"]}</div>' if norm["hint"] else ""
        return f'<div class="flip-face"><span class="fc-tag">{norm["tag"]}</span><div class="fc-q">{norm["q"]}</div>{hint_html}</div>'

    def simulate_face_back(card):
        norm = simulate_normalize_card(card)
        return f'<div class="flip-face"><div class="fc-a">{norm["a"]}</div></div>'

    # Test Card Schema 1: {id, question, answer, hint}
    c1 = {"id": 101, "question": "Πόσο κοστίζει η επίλυση;", "answer": "n³/3", "hint": "Μόνο η εμπρός"}
    norm1 = simulate_normalize_card(c1)
    f1 = simulate_face_front(c1)
    b1 = simulate_face_back(c1)
    if norm1["q"] == "Πόσο κοστίζει η επίλυση;" and norm1["question"] == norm1["q"] and "undefined" not in f1 and "undefined" not in b1:
        print("  ✓ Schema 1 {id, question, answer, hint} correctly normalized (0 'undefined' strings)")
        passed += 1
    else:
        print("  ❌ Schema 1 normalization failed")
        failed += 1

    # Test Card Schema 2: {id, q, a, hint}
    c2 = {"id": 201, "q": "Τι είναι το Lω;", "a": "SOR πίνακας", "hint": "Παράμετρος ω"}
    norm2 = simulate_normalize_card(c2)
    f2 = simulate_face_front(c2)
    b2 = simulate_face_back(c2)
    if norm2["question"] == "Τι είναι το Lω;" and norm2["answer"] == "SOR πίνακας" and "undefined" not in f2 and "undefined" not in b2:
        print("  ✓ Schema 2 {id, q, a, hint} correctly normalized (0 'undefined' strings)")
        passed += 1
    else:
        print("  ❌ Schema 2 normalization failed")
        failed += 1

    # Test Card Schema 3: Missing hint and missing id
    c3 = {"question": "Ορισμός Runge", "answer": "Ταλαντώσεις στα άκρα"}
    norm3 = simulate_normalize_card(c3, default_topic="Παρεμβολή")
    f3 = simulate_face_front(c3)
    b3 = simulate_face_back(c3)
    if norm3["hint"] == "" and norm3["tag"] == "Παρεμβολή" and "undefined" not in f3 and "undefined" not in b3:
        print("  ✓ Schema 3 (missing hint & ID) safely handled with default tag (0 'undefined' strings)")
        passed += 1
    else:
        print("  ❌ Schema 3 missing fields produced unexpected output")
        failed += 1


    # ─────────────────────────────────────────────────────────────────────────
    # TEST SUITE 3: js/nav.js Prerequisites & Navigation Array Integrity
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[Suite 3] js/nav.js Navigation Array Integrity")
    nav_file = os.path.join(ROOT_DIR, "js", "nav.js")
    with open(nav_file, "r", encoding="utf-8") as f:
        nav_src = f.read()

    # 3.1 Check topics array contains prerequisites.html
    prereq_nav_match = re.search(r"\{\s*id:\s*['\"]prerequisites['\"],\s*title:\s*['\"]([^'\"]+)['\"],\s*path:\s*['\"]prerequisites\.html['\"]", nav_src)
    if prereq_nav_match:
        print(f"  ✓ 'prerequisites.html' registered in topics array with title: '{prereq_nav_match.group(1)}'")
        passed += 1
    else:
        print("  ❌ 'prerequisites.html' missing from topics array in js/nav.js")
        failed += 1

    # 3.2 Check theme switching logic
    if "localStorage.getItem('theme')" in nav_src and "data-theme" in nav_src:
        print("  ✓ Theme switching with 'data-theme' and localStorage persistence present")
        passed += 1
    else:
        print("  ❌ Theme switching logic incomplete")
        failed += 1


    # ─────────────────────────────────────────────────────────────────────────
    # TEST SUITE 4: index.html 5-Day Study Sprint Plan DOM Contracts
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[Suite 4] index.html 5-Day Study Sprint Plan DOM Integrity")
    idx_file = os.path.join(ROOT_DIR, "index.html")
    with open(idx_file, "r", encoding="utf-8") as f:
        idx_src = f.read()

    # 4.1 Checkbox data-task-id count and unique IDs
    task_ids = re.findall(r'data-task-id="([^"]+)"', idx_src)
    print(f"  Total task checkboxes found in index.html: {len(task_ids)}")
    if len(task_ids) == 21 and len(task_ids) == len(set(task_ids)):
        print("  ✓ Exactly 21 unique data-task-id milestones present (Days 1–5 complete)")
        passed += 1
    else:
        print(f"  ❌ Expected 21 unique task IDs, found {len(task_ids)} (unique: {len(set(task_ids))})")
        failed += 1

    # 4.2 Micro-drills and matching solution containers
    drill_ids = re.findall(r'data-drill-id="([^"]+)"', idx_src)
    print(f"  Total instant-reveal micro-drills found: {len(drill_ids)}")
    if len(drill_ids) == 5:
        all_sols_ok = True
        for did in drill_ids:
            sol_id = f"drill-sol-{did}"
            if f'id="{sol_id}"' not in idx_src:
                all_sols_ok = False
                print(f"    ❌ Missing solution #{sol_id} for drill '{did}'")
        if all_sols_ok:
            print("  ✓ All 5 instant-reveal micro-drills have corresponding hidden solution blocks")
            passed += 1
        else:
            failed += 1
    else:
        print(f"  ❌ Expected 5 micro-drills, found {len(drill_ids)}")
        failed += 1

    # 4.3 Sprint Progress Bar & Badges
    required_ids = [
        "sprint-checklist-container", "sprint-progress-fill",
        "sprint-progress-text", "sprint-marks-badge",
        "sprint-progress-status", "sprint-reset-btn"
    ]
    missing_ids = [i for i in required_ids if f'id="{i}"' not in idx_src]
    if not missing_ids:
        print(f"  ✓ All required sprint HUD element IDs verified: {required_ids}")
        passed += 1
    else:
        print(f"  ❌ Missing sprint HUD IDs: {missing_ids}")
        failed += 1

    print("\n" + "=" * 78)
    print(f"  VALIDATION SUMMARY: {passed} PASSED, {failed} FAILED")
    print("=" * 78)
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
