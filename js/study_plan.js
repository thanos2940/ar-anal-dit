/**
 * study_plan.js — Interactive 5-Day High-ROI Study Sprint Engine
 * Numerical Analysis (ΕΚΠΑ DIT) Webnotes
 *
 * Architecture & Responsibilities:
 *  1. Persistent State Management:
 *     - Dedicated localStorage key: 'webnotes-sprint-checklist'.
 *     - Fully encapsulated StorageManager with try/catch guards and in-memory fallback
 *       for restricted browser contexts (Safari private browsing, sandboxed iframes, disabled cookies).
 *     - Safe JSON sanitization and schema versioning.
 *
 *  2. Event Delegation & DOM Interaction:
 *     - Global delegation on document for checkbox change events (.sprint-chk, data-task-id).
 *     - Global delegation for instant-reveal micro-drill buttons (.drill-reveal-btn, data-drill-id).
 *     - Global delegation for sprint progress reset button (#sprint-reset-btn, .sprint-reset-btn).
 *     - Dynamic active state styling (.task-completed, .day-completed, .pass-secured).
 *
 *  3. Dynamic Progress Calculation & Metrics:
 *     - Dynamic task counting from DOM (supports both 16 and 21 task models seamlessly).
 *     - Real-time progress bar fill (#sprint-progress-fill) with aria-valuenow attributes.
 *     - Metric summary text (#sprint-progress-text) showing percentage and completed milestones.
 *     - Weighted marks calculation (#sprint-marks-badge):
 *       * Day 1 (MATLAB): 30 marks
 *       * Day 2 (Complexity): 15 marks (45 cumul)
 *       * Day 3 (Fixed-Point / Newton): 15 marks (60 cumul — PASS LOCKED!)
 *       * Day 4 (Simpson & Weights): 15 marks (75 cumul)
 *       * Day 5 (Gauss-Jordan & Newton Interpolation): 25 marks (100 cumul)
 *     - Motivational status message (#sprint-progress-status) guiding the student.
 *     - Optional per-day progress fills (.day-progress-fill) and badges (.day-progress-text).
 *
 *  4. Micro-Drill Instant Revelation & MathJax Typesetting:
 *     - Instant toggling of solution blocks (#drill-sol-<id> or #drill-sol-drill<id>).
 *     - Dynamic button label and icon switching (Reveal / Hide).
 *     - Asynchronous MathJax typesetting via window.MathJax.typesetPromise([solutionElement])
 *       with MathJax startup promise queueing and error suppression.
 *
 *  5. Cross-Tab Real-Time Synchronization:
 *     - window.addEventListener('storage', ...) listener reacting immediately to changes
 *       made across multiple browser tabs.
 *
 *  6. Public API & External Verifiability:
 *     - window.StudyPlan exposure for programmatic verification, headless testing,
 *       and cross-script interoperability.
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // 1. Configuration & Constants
  // ─────────────────────────────────────────────────────────────
  const STORAGE_KEY = 'webnotes-sprint-checklist';
  const DEFAULT_TOTAL_TASKS = 21; // Standard high-ROI task count

  // Weight distribution strictly mapped to ΕΚΠΑ DIT exam blueprints:
  // Days 1–3 lock in 60 Marks (PASS LOCKED)
  // Days 4–5 provide the remaining 40 Marks for 100/100
  const DAY_WEIGHTS = {
    '1': 30, // Day 1: MATLAB Power-Pack (Θέμα 3: 30 marks)
    '2': 15, // Day 2: Complexity Algebra & Inverses (Θέμα 1.3: 15-16 marks)
    '3': 15, // Day 3: Fixed-Point & Newton Convergence (Θέμα 1.1: 15 marks) -> 60 MARKS PASS
    '4': 15, // Day 4: Quadrature Weights & Simpson (Θέμα 2.1c & 2.2: 15 marks) -> 75 marks
    '5': 25  // Day 5: Gauss-Jordan Pivoting & Interpolation (Θέμα 1.2 & 2.1a-b: 25 marks) -> 100 marks
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

    // Benign probe to test localStorage availability
    // Gracefully catches Safari private mode, sandboxed iframes, or disabled storage
    try {
      const testKey = '__sprint_probe__';
      window.localStorage.setItem(testKey, 'probe');
      window.localStorage.removeItem(testKey);
    } catch (e) {
      isLocalStorageAvailable = false;
      console.warn('[study_plan.js] localStorage is disabled or restricted; running in in-memory session mode.');
    }

    /**
     * Sanitizes stored or loaded JSON data to guarantee valid object schema.
     */
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

    /**
     * Safely reads state from localStorage or in-memory cache.
     */
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
        console.warn('[study_plan.js] Corrupted state in localStorage; falling back to clean cache:', err);
        return Object.assign({}, memoryCache);
      }
    }

    /**
     * Safely saves state to localStorage and in-memory cache.
     */
    function save(state) {
      const sanitized = sanitizeState(state);
      sanitized.lastUpdated = Date.now();
      memoryCache = sanitized;

      if (!isLocalStorageAvailable) return true;

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        return true;
      } catch (err) {
        console.warn('[study_plan.js] Failed to persist state to localStorage (QuotaExceededError or security block):', err);
        return false;
      }
    }

    /**
     * Resets storage completely.
     */
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
          console.warn('[study_plan.js] Failed to remove key from localStorage:', err);
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
  // 3. Dynamic MathJax Typesetting Guard
  // ─────────────────────────────────────────────────────────────
  /**
   * Typesets LaTeX formulas inside an element on demand.
   * Handles asynchronous MathJax v3 loading and startup promises cleanly.
   */
  function typesetMath(element) {
    if (!element) return Promise.resolve();

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      return window.MathJax.typesetPromise([element]).catch(function (err) {
        console.warn('[study_plan.js] MathJax typesetPromise warning:', err);
      });
    } else if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
      // MathJax is still in the middle of initial bundle compilation
      return window.MathJax.startup.promise.then(function () {
        if (typeof window.MathJax.typesetPromise === 'function') {
          return window.MathJax.typesetPromise([element]);
        }
      }).catch(function (err) {
        console.warn('[study_plan.js] Deferred MathJax typeset warning:', err);
      });
    }
    return Promise.resolve();
  }

  // ─────────────────────────────────────────────────────────────
  // 4. Motivational Pedagogical Feedback
  // ─────────────────────────────────────────────────────────────
  /**
   * Returns a supportive, student-to-student message based on current marks & progress.
   */
  function getMotivationalFeedback(percent, marks) {
    if (percent === 0) {
      return 'Ξεκίνα με την 1η Ημέρα (MATLAB) για τα πρώτα 30 μόρια!';
    } else if (marks < 30) {
      return 'Καλή αρχή! Χτίζεις τη βάση σου στα SOS μοτίβα.';
    } else if (marks < 50) {
      return '🔥 Εξαιρετικά! Πλησιάζεις το όριο του PASS (50-60 μόρια).';
    } else if (marks < 75) {
      return '🎯 ΤΟ 5 ΚΛΕΙΔΩΘΗΚΕ! (PASS LOCKED) Συνέχισε ακάθεκτος για βαθμό 7-8.';
    } else if (percent < 100) {
      return '🚀 Στοχεύεις πλέον για 9-10! Λίγα ακόμα milestones.';
    } else {
      return '🏆 ΠΛΗΡΗΣ ΠΡΟΕΤΟΙΜΑΣΙΑ (100 Μόρια)! Είσαι πανέτοιμος για το γραπτό!';
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 5. Progress Calculation & UI Synchronization
  // ─────────────────────────────────────────────────────────────
  /**
   * Reads state, queries DOM, updates checkboxes, progress bars, text,
   * badges, and motivational messages.
   */
  function updateProgressUI() {
    const state = StorageManager.load();
    const allCheckboxes = document.querySelectorAll('.sprint-chk');

    let total = allCheckboxes.length;
    let checked = 0;
    const dayStats = {};

    // 1. Synchronize checkboxes with stored state
    allCheckboxes.forEach(function (chk) {
      const taskId = chk.dataset.taskId || chk.id;
      if (!taskId) return;

      const isChecked = Boolean(state.tasks[taskId]);
      chk.checked = isChecked;

      // Update parent task item visual state (.task-completed)
      const parentItem = chk.closest('.sprint-task-item') ||
                         chk.closest('.task-item') ||
                         chk.closest('label') ||
                         chk.parentElement;
      if (parentItem) {
        if (isChecked) {
          parentItem.classList.add('task-completed');
        } else {
          parentItem.classList.remove('task-completed');
        }
      }

      if (isChecked) checked++;

      // Track per-day completion using taskId convention or parent card data-day
      let dayNum = null;
      const dayMatch = taskId.match(/^day(\d+)-/i);
      if (dayMatch) {
        dayNum = dayMatch[1];
      } else {
        const parentDayCard = chk.closest('[data-day]');
        if (parentDayCard) {
          dayNum = parentDayCard.dataset.day;
        }
      }

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

    // 3. Compute estimated exam marks unlocked based on High-ROI weights
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
      // Fallback linear calculation if day groups are not explicit in markup
      estimatedMarks = Math.round((checked / total) * 100);
    }
    if (estimatedMarks > 100) estimatedMarks = 100;

    // 4. Update overall sprint progress bar & aria attributes
    const fillEl = document.getElementById('sprint-progress-fill');
    if (fillEl) {
      fillEl.style.width = percent + '%';
      fillEl.setAttribute('aria-valuenow', String(percent));
    }

    // 5. Update progress summary text
    const textEl = document.getElementById('sprint-progress-text');
    if (textEl) {
      textEl.textContent = `${percent}% Ολοκληρώθηκε (${checked}/${total} SOS Milestones)`;
    }

    // 6. Update marks badge with pass status highlight
    const marksBadge = document.getElementById('sprint-marks-badge');
    if (marksBadge) {
      marksBadge.textContent = `${estimatedMarks} / 100 Μόρια`;
      if (estimatedMarks >= 50) {
        marksBadge.classList.add('pass-secured');
      } else {
        marksBadge.classList.remove('pass-secured');
      }
    }

    // 7. Update motivational guidance status text
    const statusEl = document.getElementById('sprint-progress-status');
    if (statusEl) {
      statusEl.textContent = getMotivationalFeedback(percent, estimatedMarks);
    }

    // 8. Update per-day progress fills, badges, and card completion classes
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

      const dayCard = document.querySelector(`.sprint-day-card[data-day="${d}"], #sprint-day-${d}, #day-${d}-card`);
      if (dayCard) {
        if (dayPct === 100) {
          dayCard.classList.add('day-completed');
        } else {
          dayCard.classList.remove('day-completed');
        }
      }
    });

    // 9. Update micro-drill attempted badges
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
  /**
   * Toggles the visibility of a micro-drill verified solution and invokes MathJax.
   */
  function handleDrillToggle(btn) {
    const drillId = btn.dataset.drillId;
    if (!drillId) return;

    // Support both ID patterns: #drill-sol-drill1 and #drill-sol-1
    let sol = document.getElementById(`drill-sol-${drillId}`);
    if (!sol) {
      if (drillId.startsWith('drill')) {
        sol = document.getElementById(`drill-sol-${drillId.replace(/^drill/, '')}`);
      } else {
        sol = document.getElementById(`drill-sol-drill${drillId}`);
      }
    }
    if (!sol) return;

    // Detect current visibility
    const isHidden = sol.style.display === 'none' ||
                     getComputedStyle(sol).display === 'none' ||
                     sol.hasAttribute('hidden');

    const state = StorageManager.load();

    if (isHidden) {
      // Reveal solution
      sol.removeAttribute('hidden');
      sol.style.display = 'block';
      btn.classList.add('is-revealed', 'drill-attempted');

      const labelSpan = btn.querySelector('.drill-btn-text') || btn.querySelector('.btn-text');
      if (labelSpan) {
        labelSpan.textContent = 'Απόκρυψη Λύσης';
      } else {
        btn.textContent = '🔒 Απόκρυψη Λύσης';
      }

      // Mark drill as attempted in state
      state.drills[drillId] = true;
      StorageManager.save(state);

      // Trigger dynamic MathJax typesetting on revealed LaTeX
      typesetMath(sol);
    } else {
      // Hide solution
      sol.style.display = 'none';
      btn.classList.remove('is-revealed');

      const labelSpan = btn.querySelector('.drill-btn-text') || btn.querySelector('.btn-text');
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
  /**
   * Resets all checklist milestones and drills after user confirmation.
   */
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
      const parentItem = chk.closest('.sprint-task-item') ||
                         chk.closest('.task-item') ||
                         chk.closest('label') ||
                         chk.parentElement;
      if (parentItem) {
        parentItem.classList.remove('task-completed');
      }
    });

    // Reset all micro-drill solutions and buttons in DOM
    document.querySelectorAll('.drill-reveal-btn').forEach(function (btn) {
      const drillId = btn.dataset.drillId;
      if (drillId) {
        const sol = document.getElementById(`drill-sol-${drillId}`) ||
                    document.getElementById(`drill-sol-drill${drillId}`);
        if (sol) {
          sol.style.display = 'none';
        }
      }
      btn.classList.remove('is-revealed', 'drill-attempted');
      const labelSpan = btn.querySelector('.drill-btn-text') || btn.querySelector('.btn-text');
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
  /**
   * Binds delegated event listeners on document to support static & dynamically injected DOM.
   */
  function initStudyPlan() {
    // 1. Delegated change listener for checklist checkboxes
    document.addEventListener('change', function (e) {
      if (e.target && e.target.matches && e.target.matches('.sprint-chk')) {
        const taskId = e.target.dataset.taskId || e.target.id;
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

    // 4. Perform initial UI update
    updateProgressUI();
  }

  // ─────────────────────────────────────────────────────────────
  // 9. Lifecycle Bootstrapper
  // ─────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudyPlan);
  } else {
    // DOM already ready
    initStudyPlan();
  }

  // ─────────────────────────────────────────────────────────────
  // 10. Public API for Inspection, Verification & External Scripts
  // ─────────────────────────────────────────────────────────────
  window.StudyPlan = {
    version: '1.0.0',
    STORAGE_KEY: StorageManager.KEY,
    DAY_WEIGHTS: DAY_WEIGHTS,
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
