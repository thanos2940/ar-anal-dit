/**
 * study_plan.js — Interactive 5-Day High-ROI Study Sprint Engine
 * Numerical Analysis (ΕΚΠΑ DIT) Webnotes
 *
 * Capabilities:
 *  - Persistent localStorage checklist across reloads and browser tabs
 *  - Try/catch safe StorageManager with in-memory fallback when localStorage is blocked
 *  - Event delegation for checkbox changes (.sprint-chk, data-task-id)
 *  - Dynamic progress bar calculation (#sprint-progress-fill, #sprint-progress-text)
 *  - Cumulative marks unlocked calculation (#sprint-marks-badge, 30 -> 60 -> 100 marks)
 *  - Per-day progress indicators (.day-progress-fill, .day-progress-text)
 *  - Micro-drill instant-reveal toggling (.drill-reveal-btn, #drill-sol-<id>)
 *  - On-demand MathJax typesetting via MathJax.typesetPromise([element])
 *  - Sprint reset button (#sprint-reset-btn) with confirmation dialog
 *  - Cross-tab real-time synchronization via window.addEventListener('storage', ...)
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // 1. Constants & Configuration
  // ─────────────────────────────────────────────────────────────
  const STORAGE_KEY = 'webnotes-sprint-checklist';
  const DEFAULT_TOTAL_TASKS = 16;

  // Marks allocated per sprint day (ordered strictly by Exam ROI)
  // Day 1: 30 marks (MATLAB block: commands, iteration function)
  // Day 2: 15 marks (Complexity algebra, SOS table, inverse cancellation)
  // Day 3: 15 marks (Fixed-point / Newton convergence, |g'|<1, quadratic) -> 60 Marks PASS LOCKED
  // Day 4: 15 marks (Quadrature weights, moment system, Simpson 1/3)
  // Day 5: 25 marks (Gauss-Jordan partial pivoting, Newton interpolation, Taylor ODE) -> 100 Marks
  const DAY_WEIGHTS = {
    '1': 30,
    '2': 15,
    '3': 15,
    '4': 15,
    '5': 25
  };

  // ─────────────────────────────────────────────────────────────
  // 2. Resilient Storage Manager (LocalStorage + In-Memory Fallback)
  // ─────────────────────────────────────────────────────────────
  const StorageManager = (function () {
    let memoryCache = {
      version: 1,
      lastUpdated: Date.now(),
      tasks: {},
      drills: {}
    };

    let isLocalStorageAvailable = true;

    // Benign probe to test localStorage availability (handles Safari private mode, sandboxed iframes)
    try {
      const probeKey = '__storage_probe__';
      window.localStorage.setItem(probeKey, 'ok');
      window.localStorage.removeItem(probeKey);
    } catch (e) {
      isLocalStorageAvailable = false;
      console.warn('[study_plan.js] localStorage unavailable; falling back to in-memory session store.');
    }

    function sanitizeState(parsed) {
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return {
          version: 1,
          lastUpdated: Date.now(),
          tasks: {},
          drills: {}
        };
      }
      return {
        version: typeof parsed.version === 'number' ? parsed.version : 1,
        lastUpdated: typeof parsed.lastUpdated === 'number' ? parsed.lastUpdated : Date.now(),
        totalTasks: typeof parsed.totalTasks === 'number' ? parsed.totalTasks : undefined,
        tasks: (parsed.tasks && typeof parsed.tasks === 'object' && !Array.isArray(parsed.tasks)) ? parsed.tasks : {},
        drills: (parsed.drills && typeof parsed.drills === 'object' && !Array.isArray(parsed.drills)) ? parsed.drills : {}
      };
    }

    function load() {
      if (!isLocalStorageAvailable) {
        return Object.assign({}, memoryCache);
      }
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return Object.assign({}, memoryCache);
        const parsed = JSON.parse(raw);
        const sanitized = sanitizeState(parsed);
        memoryCache = sanitized;
        return sanitized;
      } catch (err) {
        console.warn('[study_plan.js] Corrupted localStorage or read error; returning cache:', err);
        return Object.assign({}, memoryCache);
      }
    }

    function save(state) {
      const sanitized = sanitizeState(state);
      sanitized.lastUpdated = Date.now();
      memoryCache = sanitized;

      if (!isLocalStorageAvailable) return true;

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        return true;
      } catch (err) {
        console.warn('[study_plan.js] Failed to save state to localStorage (quota exceeded or blocked):', err);
        return false;
      }
    }

    function clear() {
      memoryCache = {
        version: 1,
        lastUpdated: Date.now(),
        tasks: {},
        drills: {}
      };
      if (isLocalStorageAvailable) {
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch (err) {
          console.warn('[study_plan.js] Failed to clear localStorage:', err);
        }
      }
    }

    return {
      KEY: STORAGE_KEY,
      load: load,
      save: save,
      clear: clear,
      isAvailable: function () {
        return isLocalStorageAvailable;
      }
    };
  })();

  // ─────────────────────────────────────────────────────────────
  // 3. MathJax Dynamic Typesetting Guard
  // ─────────────────────────────────────────────────────────────
  function typesetMath(element) {
    if (!element) return Promise.resolve();

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      return window.MathJax.typesetPromise([element]).catch(function (err) {
        console.warn('[study_plan.js] MathJax typesetting failed:', err);
      });
    } else if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
      // MathJax is still initializing; await its startup promise
      return window.MathJax.startup.promise.then(function () {
        if (typeof window.MathJax.typesetPromise === 'function') {
          return window.MathJax.typesetPromise([element]);
        }
      }).catch(function (err) {
        console.warn('[study_plan.js] Deferred MathJax typeset error:', err);
      });
    }
    return Promise.resolve();
  }

  // ─────────────────────────────────────────────────────────────
  // 4. Motivational Pedagogical Feedback
  // ─────────────────────────────────────────────────────────────
  function getMotivationalFeedback(percent, marks) {
    if (percent === 0) {
      return 'Ξεκίνα με την 1η Ημέρα (MATLAB) για τα πρώτα 30 μόρια!';
    } else if (marks < 30) {
      return 'Καλή αρχή! Χτίζεις τη βάση σου στα SOS μοτίβα.';
    } else if (marks < 50) {
      return '🔥 Εξαιρετικά! Πλησιάζεις το όριο του PASS (50-60 μόρια).';
    } else if (marks < 75) {
      return '🎯 ΤΟ 5 ΚΛΕΙΔΩΘΗΚΕ! Συνέχισε ακάθεκτος για βαθμό 7-8.';
    } else if (percent < 100) {
      return '🚀 Στοχεύεις πλέον για 9-10! Λίγα ακόμα milestones.';
    } else {
      return '🏆 ΠΛΗΡΗΣ ΠΡΟΕΤΟΙΜΑΣΙΑ (100 Μόρια)! Είσαι πανέτοιμος για το γραπτό!';
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 5. Progress Calculation & UI Synchronization
  // ─────────────────────────────────────────────────────────────
  function updateProgressUI() {
    const state = StorageManager.load();
    const allCheckboxes = document.querySelectorAll('.sprint-chk');

    let total = allCheckboxes.length;
    let checked = 0;
    const dayStats = {};

    // 1. Sync checkboxes from stored state
    allCheckboxes.forEach(function (chk) {
      const id = chk.dataset.taskId;
      if (!id) return;

      const isChecked = Boolean(state.tasks[id]);
      chk.checked = isChecked;

      // Visual feedback on parent task item
      const parentItem = chk.closest('.sprint-task-item') || chk.closest('label') || chk.parentElement;
      if (parentItem) {
        if (isChecked) {
          parentItem.classList.add('task-completed');
        } else {
          parentItem.classList.remove('task-completed');
        }
      }

      if (isChecked) checked++;

      // Track per-day completion
      const match = id.match(/^day(\d+)-/i);
      const dayNum = match ? match[1] : null;
      if (dayNum) {
        if (!dayStats[dayNum]) {
          dayStats[dayNum] = { total: 0, checked: 0 };
        }
        dayStats[dayNum].total++;
        if (isChecked) {
          dayStats[dayNum].checked++;
        }
      }
    });

    // 2. Off-page handling (e.g. summary card on exam_prep.html with no checkboxes)
    if (total > 0) {
      if (state.totalTasks !== total) {
        state.totalTasks = total;
        StorageManager.save(state);
      }
    } else {
      checked = Object.keys(state.tasks).filter(function (k) {
        return Boolean(state.tasks[k]);
      }).length;
      total = state.totalTasks || DEFAULT_TOTAL_TASKS;
    }

    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

    // 3. Compute estimated marks unlocked
    let estimatedMarks = 0;
    const dayKeys = Object.keys(DAY_WEIGHTS);
    let hasDayStats = false;

    dayKeys.forEach(function (d) {
      if (dayStats[d] && dayStats[d].total > 0) {
        hasDayStats = true;
        const frac = dayStats[d].checked / dayStats[d].total;
        estimatedMarks += Math.round(frac * DAY_WEIGHTS[d]);
      }
    });

    if (!hasDayStats && total > 0) {
      // Fallback marks estimation when day groups are not explicit in DOM
      estimatedMarks = Math.round((checked / total) * 100);
    }
    if (estimatedMarks > 100) estimatedMarks = 100;

    // 4. Update overall progress bar & text
    const fillEl = document.getElementById('sprint-progress-fill');
    if (fillEl) {
      fillEl.style.width = percent + '%';
      fillEl.setAttribute('aria-valuenow', String(percent));
    }

    const textEl = document.getElementById('sprint-progress-text');
    if (textEl) {
      textEl.textContent = `${percent}% Ολοκληρώθηκε (${checked}/${total} SOS Milestones)`;
    }

    // 5. Update marks badge & status text
    const marksBadge = document.getElementById('sprint-marks-badge');
    if (marksBadge) {
      marksBadge.textContent = `${estimatedMarks} / 100 Μόρια`;
      if (estimatedMarks >= 50) {
        marksBadge.classList.add('pass-secured');
      } else {
        marksBadge.classList.remove('pass-secured');
      }
    }

    const statusEl = document.getElementById('sprint-progress-status');
    if (statusEl) {
      statusEl.textContent = getMotivationalFeedback(percent, estimatedMarks);
    }

    // 6. Update optional per-day badges and fills
    Object.keys(dayStats).forEach(function (d) {
      const stat = dayStats[d];
      const dayPct = stat.total > 0 ? Math.round((stat.checked / stat.total) * 100) : 0;

      const dayFill = document.querySelector(`.day-progress-fill[data-day="${d}"], #day-${d}-progress-fill`);
      if (dayFill) {
        dayFill.style.width = dayPct + '%';
      }

      const dayText = document.querySelector(`.day-progress-text[data-day="${d}"], #day-${d}-progress-text`);
      if (dayText) {
        dayText.textContent = `${dayPct}% (${stat.checked}/${stat.total})`;
      }

      const dayCard = document.querySelector(`.sprint-day-card[data-day="${d}"], #day-${d}-card`);
      if (dayCard) {
        if (dayPct === 100) {
          dayCard.classList.add('day-completed');
        } else {
          dayCard.classList.remove('day-completed');
        }
      }
    });

    // 7. Update drill buttons attempted status
    document.querySelectorAll('.drill-reveal-btn').forEach(function (btn) {
      const drillId = btn.dataset.drillId;
      if (drillId && state.drills[drillId]) {
        btn.classList.add('drill-attempted');
      } else {
        btn.classList.remove('drill-attempted');
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 6. Micro-Drill Revelation Handler
  // ─────────────────────────────────────────────────────────────
  function handleDrillToggle(btn) {
    const drillId = btn.dataset.drillId;
    if (!drillId) return;

    const sol = document.getElementById(`drill-sol-${drillId}`);
    if (!sol) return;

    const isHidden = sol.style.display === 'none' ||
                     getComputedStyle(sol).display === 'none' ||
                     sol.hasAttribute('hidden');

    const state = StorageManager.load();

    if (isHidden) {
      sol.removeAttribute('hidden');
      sol.style.display = 'block';
      btn.classList.add('is-revealed', 'drill-attempted');

      const labelSpan = btn.querySelector('.drill-btn-text');
      if (labelSpan) {
        labelSpan.textContent = 'Απόκρυψη Λύσης';
      } else {
        btn.textContent = '🔒 Απόκρυψη Λύσης';
      }

      // Mark drill as attempted in state
      state.drills[drillId] = true;
      StorageManager.save(state);

      // Trigger dynamic MathJax typesetting on revealed solution
      typesetMath(sol);
    } else {
      sol.style.display = 'none';
      btn.classList.remove('is-revealed');

      const labelSpan = btn.querySelector('.drill-btn-text');
      if (labelSpan) {
        labelSpan.textContent = 'Εμφάνιση Λύσης & Επαλήθευση';
      } else {
        btn.textContent = '💡 Εμφάνιση Λύσης & Επαλήθευση';
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 7. Sprint Reset Handler
  // ─────────────────────────────────────────────────────────────
  function handleResetProgress() {
    const confirmed = window.confirm(
      'Είσαι σίγουρος ότι θέλεις να μηδενίσεις την πρόοδο του 5-Day Sprint;\n' +
      'Όλα τα επιλεγμένα milestones θα αποεπιλεγούν.'
    );
    if (!confirmed) return;

    StorageManager.clear();

    // Reset all checkboxes in DOM
    document.querySelectorAll('.sprint-chk').forEach(function (chk) {
      chk.checked = false;
      const parentItem = chk.closest('.sprint-task-item') || chk.closest('label') || chk.parentElement;
      if (parentItem) {
        parentItem.classList.remove('task-completed');
      }
    });

    // Reset all micro-drill solutions and buttons
    document.querySelectorAll('.drill-reveal-btn').forEach(function (btn) {
      const drillId = btn.dataset.drillId;
      if (drillId) {
        const sol = document.getElementById(`drill-sol-${drillId}`);
        if (sol) {
          sol.style.display = 'none';
        }
      }
      btn.classList.remove('is-revealed', 'drill-attempted');
      const labelSpan = btn.querySelector('.drill-btn-text');
      if (labelSpan) {
        labelSpan.textContent = 'Εμφάνιση Λύσης & Επαλήθευση';
      } else {
        btn.textContent = '💡 Εμφάνιση Λύσης & Επαλήθευση';
      }
    });

    updateProgressUI();
  }

  // ─────────────────────────────────────────────────────────────
  // 8. Event Delegation & Initialization
  // ─────────────────────────────────────────────────────────────
  function initStudyPlan() {
    // 1. Delegated change listener for checkboxes
    document.addEventListener('change', function (e) {
      if (e.target && e.target.matches && e.target.matches('.sprint-chk')) {
        const taskId = e.target.dataset.taskId;
        if (!taskId) return;

        const state = StorageManager.load();
        state.tasks[taskId] = Boolean(e.target.checked);
        StorageManager.save(state);
        updateProgressUI();
      }
    });

    // 2. Delegated click listener for micro-drill reveal buttons and reset button
    document.addEventListener('click', function (e) {
      // Micro-drill reveal button
      const drillBtn = e.target.closest('.drill-reveal-btn');
      if (drillBtn) {
        e.preventDefault();
        handleDrillToggle(drillBtn);
        return;
      }

      // Reset progress button
      const resetBtn = e.target.closest('#sprint-reset-btn, .sprint-reset-btn');
      if (resetBtn) {
        e.preventDefault();
        handleResetProgress();
        return;
      }
    });

    // 3. Cross-tab synchronization via storage event
    window.addEventListener('storage', function (e) {
      if (e.key === StorageManager.KEY) {
        updateProgressUI();
      }
    });

    // 4. Initial UI render
    updateProgressUI();
  }

  // ─────────────────────────────────────────────────────────────
  // 9. Lifecycle Bootstrapper
  // ─────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudyPlan);
  } else {
    // Document already parsed or loaded
    initStudyPlan();
  }

  // ─────────────────────────────────────────────────────────────
  // 10. Public API for Inspection, Verification & External Scripts
  // ─────────────────────────────────────────────────────────────
  window.StudyPlan = {
    version: '1.0.0',
    STORAGE_KEY: StorageManager.KEY,
    getState: function () {
      return StorageManager.load();
    },
    setState: function (newState) {
      StorageManager.save(newState);
      updateProgressUI();
    },
    reset: function () {
      StorageManager.clear();
      updateProgressUI();
    },
    updateUI: updateProgressUI,
    typesetMath: typesetMath,
    init: initStudyPlan
  };
})();
