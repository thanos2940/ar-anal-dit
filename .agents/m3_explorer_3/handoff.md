# M3 Explorer 3 Blueprint: Flashcard Schema Normalization & ELI5 Component Styling

## 1. Observation

### 1.1 Flashcard Schema Bug in `js/flashcards.js`
- **File**: `D:\University\Αριθμητικη Αναλυση\data\flashcards.js` (lines 4-10, 16-19, 49-53, etc.)
  ```javascript
  * SCHEMA (required by js/flashcards.js):
  *   window.flashcardData = {
  *     "<topicId>": { title: "…", cards: [ { id, question, answer, hint }, … ] }
  *   }
  ...
  { id: 101,
    question: "Πόσο κοστίζει η ΕΠΙΛΥΣΗ ενός συστήματος n×n με Gauss και πόσο με Jordan;",
    answer: "Gauss: n³/3 · Jordan: n³/2.",
    hint: "Η Jordan κάνει παραπάνω δουλειά — καθαρίζει και πάνω από τη διαγώνιο." }
  ```
- **File**: `D:\University\Αριθμητικη Αναλυση\js\flashcards.js` (lines 10-31)
  ```javascript
  function faceFront(card) {
    return (
      '<div class="flip-face flip-front">' +
        '<span class="fc-tag">' + card.tag + '</span>' +
        '<div class="fc-q">' + card.q + '</div>' +
        '<div class="fc-hint" style="display:none"><span class="fc-hint-lbl">💡 Υπόδειξη</span>' + card.hint + '</div>' +
        '<div class="fc-foot">' +
          '<button class="fc-hint-btn" type="button">💡 Υπόδειξη</button>' +
          '<span class="fc-cue">κλικ για απάντηση ↻</span>' +
        '</div>' +
      '</div>'
    );
  }
  function faceBack(card) {
    return (
      '<div class="flip-face flip-back">' +
        '<span class="fc-tag" style="color:var(--green);background:rgba(63,185,80,.12);border-color:rgba(63,185,80,.3)">✓ Απάντηση</span>' +
        '<div class="fc-a">' + card.a + '</div>' +
        '<span class="fc-cue">κλικ για ερώτηση ↻</span>' +
      '</div>'
    );
  }
  ```
- **Direct Consequence Observed**:
  1. `card.tag` is `undefined` across all cards, rendering verbatim text `<span class="fc-tag">undefined</span>`.
  2. `card.q` is `undefined`, rendering `<div class="fc-q">undefined</div>`.
  3. `card.a` is `undefined`, rendering `<div class="fc-a">undefined</div>`.
  4. In `renderDecks()`, cards rendered in chapter containers (`<div data-fc-deck="topicN">`) are not passed topic titles or tags, and MathJax is not invoked after dynamic element insertion.
  5. In `initTest()`, `order.reduce((n, k) => n + DB[k].cards.length, 0)` lacks defensive guard checks against empty or malformed deck keys.

### 1.2 Existing Stylesheet Architecture in `styles/components.css`
- **File**: `D:\University\Αριθμητικη Αναλυση\styles\components.css` (lines 1293–1514)
  - Flashcard flip-card UI is styled at lines 1293–1401 (`.fc-grid`, `.flip-card`, `.flip-inner`, `.flip-face`, `.fc-tag`, `.fc-q`, `.fc-a`, `.fc-hint`, `.fc-hint-btn`).
  - The Jargon Buster callout component was added at lines 1402–1514 (`.jargon-buster`).
  - Total lines in `styles/components.css`: 1514. The end of the file is the designated location for adding new ELI5 components.
- **Design Tokens in Context**:
  - Color variables available sitewide: `--bg`, `--surf`, `--surf2`, `--border`, `--txt`, `--muted`, `--dim`, `--blue`, `--cyan`, `--green`, `--yellow`, `--orange`, `--red`, `--purple`, and dim equivalents (`--bdim`, `--cdim`, `--gdim`, `--ydim`, `--odim`, `--rdim`, `--pdim`).
  - Monospace font: `'JetBrains Mono', monospace`.
  - Display font: `'Syne', sans-serif` / `'Roboto', sans-serif`.

### 1.3 Target Integration Site: `exam_prep.html`
- **File**: `D:\University\Αριθμητικη Αναλυση\exam_prep.html`
  - Links `styles/base.css`, `styles/layout.css`, and `styles/components.css` in `<head>`.
  - Contains 8 model answer question types in Section 4 (`#answers`):
    - **Type A (lines 484–528)**: Σταθερό σημείο με παράμετρο λ & τετραγωνική σύγκλιση (Θέμα 1.1)
    - **Type B (lines 531–614)**: Αντίστροφος Jordan με μερική οδήγηση (Θέμα 1.2)
    - **Type C (lines 617–684)**: Πολυπλοκότητα & μετασχηματισμός γραμμικού συστήματος (Θέμα 1.3)
    - **Type D (lines 687–780)**: Παρεμβολή Newton σε ισαπέχοντα σημεία + σφάλμα + Simpson (Θέμα 2.1)
    - **Type E (lines 783–845)**: Προσδιορισμός βαρών & μέγιστος βαθμός ακρίβειας (Θέμα 2.2)
    - **Type ΣΤ (lines 848–879)**: Newton-Raphson 5 συνθήκες σύγκλισης (Θέμα 1.1 alt)
    - **Type Z (lines 882–926)**: ΣΔΕ με Taylor 3 όρων & παραγώγιση ΣΔΕ (Θέμα 2.3)
    - **Type H (lines 929–999)**: MATLAB εντολές, indexing, πολυώνυμα (Θέμα 3)
  - Currently, model solutions jump between broad step boxes without explicit student trap warnings or formula recognition recipes.

---

## 2. Logic Chain

1. **Schema Duality**:
   - `data/flashcards.js` uses `{ id, question, answer, hint }`.
   - `js/flashcards.js` expects `{ tag, q, a, hint }`.
   - To guarantee backwards and forwards compatibility without mutating raw data, `js/flashcards.js` must implement a pure normalization function `normalizeCard(card, defaultTopicTitle)` that sets:
     - `q: card.question || card.q || ''`
     - `question: card.question || card.q || ''`
     - `a: card.answer || card.a || ''`
     - `answer: card.answer || card.a || ''`
     - `hint: card.hint || ''`
     - `tag: card.tag || (card.id ? ('Κάρτα #' + card.id) : (defaultTopicTitle || 'Θεωρία'))`
   - By populating both canonical property pairs (`q` & `question`, `a` & `answer`), any code path reading either property works transparently.

2. **Tag and Hint Defense**:
   - When a card lacks a `hint`, rendering an empty container or a dead "💡 Υπόδειξη" button degrades UX. Normalization must only render the hint container and toggle button if `card.hint` is non-empty.
   - When `renderDecks()` processes chapter cards, it has access to `topic.title` from `DB[container.getAttribute('data-fc-deck')]`. Passing `topic.title` ensures chapter flip cards display meaningful badges (e.g. `Κάρτα #101`) rather than `undefined`.

3. **MathJax Formula Rendering in Flashcards**:
   - Mathematical expressions (such as $|g'(\xi)| < 1$, $n^3/3$, $A^{-1}$) must be rendered via MathJax when cards are constructed or flipped. Calling `window.MathJax && window.MathJax.typesetPromise && window.MathJax.typesetPromise([el])` after building decks and updating `#fc-stage-card` ensures zero raw TeX code is shown to students.

4. **ELI5 Component Architecture in `styles/components.css`**:
   - **`.student-trap`**: Must visually scream "DANGER / MISTAKE HERE" using a red/orange accent (`var(--red)` / `var(--orange)`), a warning badge, a comparison layout (`.student-trap-wrong` vs `.student-trap-right`), and a memorable takeaway box.
   - **`.recognition-formula`**: Must provide the student with immediate pattern recognition ("When you see phrase X in the exam, follow recipe steps 1-2-3") using a cyan/blue accent (`var(--cyan)`), a structured ordered step list, and a high-contrast mathematical formula box (`.key-formula-box`).
   - **`.step-by-step-calc`**: Must break down multi-step arithmetic that students typically stumble over (such as multiplier signs $R_i - (-m)R_k$, divided difference table arithmetic, and Simpson coefficient multiplication) with numbered badges, connecting vertical timeline tracks, and highlighted arithmetic badges (`.calc-inline-calc`, `.calc-val-highlight`).

---

## 3. Caveats

1. **No External Network Dependencies**:
   - MathJax calls must check for `window.MathJax && window.MathJax.typesetPromise` and attach a `.catch(() => {})` handler so that pages loaded offline or in restricted environments do not throw uncaught promise errors.
2. **CSS Specificity**:
   - Component styles use standard class selectors with high specificity and fallbacks (`var(--cyan, #39d4c8)`) ensuring compatibility whether variables are loaded from `base.css` or embedded in `<style>`.
3. **No Direct Source Modification by Explorer**:
   - In accordance with the Explorer archetype constraint, this blueprint provides exact, drop-in replacement snippets for M3 Worker to apply directly to `js/flashcards.js`, `styles/components.css`, and `exam_prep.html`.

---

## 4. Conclusion & Concrete Blueprint

### 4.1 Drop-in Replacement for `js/flashcards.js`
The following is the complete, drop-in code for `D:\University\Αριθμητικη Αναλυση\js\flashcards.js`:

```javascript
/**
 * flashcards.js — renders theory flip-cards from window.flashcardData.
 *  • On chapter pages: fills every [data-fc-deck="topicN"] with that chapter's cards.
 *  • On flashcards.html: drives the "test" experience (#fc-test) across all chapters.
 *
 * NORMALIZATION PATCH (M3):
 *  • Normalizes both data schemas: supports card.question / card.q and card.answer / card.a.
 *  • Guarantees valid tag, safe hint button visibility, and safe MathJax typeset rendering.
 */
(function () {
  const DB = window.flashcardData || {};

  /* ---------- Schema Normalization Helper ---------- */
  function normalizeCard(rawCard, defaultTopicTitle) {
    if (!rawCard || typeof rawCard !== 'object') {
      return {
        id: '',
        q: '',
        question: '',
        a: '',
        answer: '',
        hint: '',
        tag: 'Θεωρία',
        topic: defaultTopicTitle || ''
      };
    }

    const id = rawCard.id !== undefined ? rawCard.id : '';
    const q = rawCard.question || rawCard.q || '';
    const a = rawCard.answer || rawCard.a || '';
    const hint = rawCard.hint || '';
    const topic = rawCard.topic || defaultTopicTitle || '';
    const tag = rawCard.tag || (id ? ('Κάρτα #' + id) : (topic || 'Θεωρία'));

    return Object.assign({}, rawCard, {
      id: id,
      q: q,
      question: q,
      a: a,
      answer: a,
      hint: hint,
      tag: tag,
      topic: topic
    });
  }

  /* ---------- shared card markup ---------- */
  function faceFront(card) {
    const norm = normalizeCard(card);
    const hintHtml = norm.hint
      ? '<div class="fc-hint" style="display:none"><span class="fc-hint-lbl">💡 Υπόδειξη</span>' + norm.hint + '</div>'
      : '';
    const hintBtnHtml = norm.hint
      ? '<button class="fc-hint-btn" type="button">💡 Υπόδειξη</button>'
      : '';

    return (
      '<div class="flip-face flip-front">' +
        '<span class="fc-tag">' + norm.tag + '</span>' +
        '<div class="fc-q">' + norm.q + '</div>' +
        hintHtml +
        '<div class="fc-foot">' +
          hintBtnHtml +
          '<span class="fc-cue">κλικ για απάντηση ↻</span>' +
        '</div>' +
      '</div>'
    );
  }

  function faceBack(card) {
    const norm = normalizeCard(card);
    return (
      '<div class="flip-face flip-back">' +
        '<span class="fc-tag" style="color:var(--green);background:rgba(63,185,80,.12);border-color:rgba(63,185,80,.3)">✓ Απάντηση</span>' +
        '<div class="fc-a">' + norm.a + '</div>' +
        '<span class="fc-cue">κλικ για ερώτηση ↻</span>' +
      '</div>'
    );
  }

  function buildCard(card) {
    const el = document.createElement('div');
    el.className = 'flip-card';
    el.tabIndex = 0;
    el.innerHTML = '<div class="flip-inner">' + faceFront(card) + faceBack(card) + '</div>';
    wire(el);
    return el;
  }

  function wire(el) {
    if (el.dataset.wired) return;
    el.dataset.wired = "true";

    el.addEventListener('click', function (e) {
      const hintBtn = e.target.closest('.fc-hint-btn');
      if (hintBtn) {
        e.stopPropagation();
        const hint = el.querySelector('.fc-hint');
        if (hint) {
          const show = hint.style.display === 'none';
          hint.style.display = show ? 'block' : 'none';
          hintBtn.classList.toggle('active', show);
        }
        return;
      }
      el.classList.toggle('flipped');
    });

    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.classList.toggle('flipped');
      }
    });
  }

  /* ---------- chapter decks ---------- */
  function renderDecks() {
    document.querySelectorAll('[data-fc-deck]').forEach(function (container) {
      const topicKey = container.getAttribute('data-fc-deck');
      const topic = DB[topicKey];
      if (!topic || !Array.isArray(topic.cards)) return;

      const grid = document.createElement('div');
      grid.className = 'fc-grid';
      topic.cards.forEach(function (c) {
        const norm = normalizeCard(c, topic.title);
        grid.appendChild(buildCard(norm));
      });
      container.appendChild(grid);

      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([grid]).catch(function () {});
      }
    });
  }

  /* ---------- test app (flashcards.html) ---------- */
  function initTest() {
    const app = document.getElementById('fc-test');
    if (!app) return;

    const startEl = document.getElementById('fc-start');
    const stageEl = document.getElementById('fc-stage');
    const resultEl = document.getElementById('fc-results');
    const topicGrid = document.getElementById('fc-topic-grid');
    const startBtn = document.getElementById('fc-start-btn');
    const shuffleChk = document.getElementById('fc-shuffle');

    const selected = new Set();
    let deck = [], idx = 0, known = 0;

    // build topic chooser (All + each chapter)
    const order = Object.keys(DB);
    const totalCardCount = order.reduce(function (n, k) {
      return n + (DB[k] && Array.isArray(DB[k].cards) ? DB[k].cards.length : 0);
    }, 0);

    const allBtn = mkTopicBtn('all', 'Όλα τα κεφάλαια', totalCardCount);
    topicGrid.appendChild(allBtn);

    order.forEach(function (k) {
      if (DB[k] && Array.isArray(DB[k].cards)) {
        topicGrid.appendChild(mkTopicBtn(k, DB[k].title || k, DB[k].cards.length));
      }
    });

    function mkTopicBtn(id, label, count) {
      const b = document.createElement('button');
      b.className = 'fc-topic-btn';
      b.dataset.id = id;
      b.innerHTML = label + '<span class="fct-count">' + count + ' κάρτες</span>';
      b.addEventListener('click', function () {
        if (id === 'all') {
          const turningOn = !b.classList.contains('sel');
          selected.clear();
          topicGrid.querySelectorAll('.fc-topic-btn').forEach(function (x) { x.classList.remove('sel'); });
          if (turningOn) {
            order.forEach(function (k) { selected.add(k); });
            topicGrid.querySelectorAll('.fc-topic-btn').forEach(function (x) { x.classList.add('sel'); });
          }
        } else {
          b.classList.toggle('sel');
          if (b.classList.contains('sel')) {
            selected.add(id);
          } else {
            selected.delete(id);
          }
          allBtn.classList.toggle('sel', selected.size === order.length);
        }
        startBtn.disabled = selected.size === 0;
      });
      return b;
    }

    function buildDeck() {
      deck = [];
      order.forEach(function (k) {
        if (selected.has(k) && DB[k] && Array.isArray(DB[k].cards)) {
          DB[k].cards.forEach(function (c) {
            const norm = normalizeCard(c, DB[k].title);
            norm.topic = DB[k].title || k;
            deck.push(norm);
          });
        }
      });
      if (shuffleChk && shuffleChk.checked) {
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = deck[i];
          deck[i] = deck[j];
          deck[j] = temp;
        }
      }
    }

    function show(el) {
      [startEl, stageEl, resultEl].forEach(function (x) { x.style.display = 'none'; });
      el.style.display = 'block';
    }

    function renderCard() {
      const card = deck[idx];
      const holder = document.getElementById('fc-stage-card');
      holder.innerHTML = '<div class="flip-inner">' + faceFront(card) + faceBack(card) + '</div>';
      holder.className = 'flip-card fctest-stage-card';
      holder.tabIndex = 0;
      wire(holder);

      document.getElementById('fc-cur').textContent = idx + 1;
      document.getElementById('fc-tot').textContent = deck.length;
      document.getElementById('fc-chap').textContent = card.topic || card.tag;
      document.getElementById('fc-fill').style.width = ((idx) / deck.length * 100) + '%';
      document.getElementById('fc-prev').disabled = idx === 0;

      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([holder]).catch(function () {});
      }
    }

    function advance(wasKnown) {
      if (wasKnown) known++;
      if (idx < deck.length - 1) {
        idx++;
        renderCard();
      } else {
        finish();
      }
    }

    function finish() {
      show(resultEl);
      const pct = Math.round(known / deck.length * 100);
      document.getElementById('fc-score').textContent = pct + '%';
      document.getElementById('fc-score-detail').textContent = 'Ήξερες ' + known + ' από ' + deck.length + ' κάρτες.';
    }

    startBtn.addEventListener('click', function () {
      buildDeck();
      idx = 0;
      known = 0;
      if (!deck.length) return;
      show(stageEl);
      renderCard();
    });

    document.getElementById('fc-flip').addEventListener('click', function () {
      document.getElementById('fc-stage-card').classList.toggle('flipped');
    });
    document.getElementById('fc-know').addEventListener('click', function () { advance(true); });
    document.getElementById('fc-dunno').addEventListener('click', function () { advance(false); });
    document.getElementById('fc-prev').addEventListener('click', function () {
      if (idx > 0) {
        idx--;
        renderCard();
      }
    });
    document.getElementById('fc-restart').addEventListener('click', function () { show(startEl); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderDecks();
    initTest();
  });
})();
```

---

### 4.2 Component CSS to Append to `styles/components.css`
The following CSS should be appended directly to the end of `D:\University\Αριθμητικη Αναλυση\styles\components.css` (starting at line 1515):

```css
/* ==========================================================================
   ELI5 Pedagogy: Student Trap Warning Component (.student-trap)
   ========================================================================== */
.student-trap {
  background: linear-gradient(145deg, rgba(248, 81, 73, 0.08) 0%, var(--surf2, #1c2230) 100%);
  border: 1px solid rgba(248, 81, 73, 0.32);
  border-left: 5px solid var(--red, #f85149);
  border-radius: 12px;
  padding: 18px 22px;
  margin: 22px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.student-trap:hover {
  border-color: rgba(248, 81, 73, 0.55);
  box-shadow: 0 6px 24px rgba(248, 81, 73, 0.12), 0 4px 16px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}

.student-trap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.student-trap-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--red, #f85149);
  background: rgba(248, 81, 73, 0.14);
  border: 1px solid rgba(248, 81, 73, 0.35);
  padding: 3px 10px;
  border-radius: 6px;
}

.student-trap-scope {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--dim, #8892b0);
}

.student-trap-title {
  font-family: 'Syne', 'Roboto', sans-serif;
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--txt, #e6edf3);
  line-height: 1.4;
  margin-bottom: 12px;
}

.student-trap-body {
  font-size: 0.94rem;
  line-height: 1.68;
  color: var(--txt, #e6edf3);
}

.student-trap-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 14px 0;
}

@media (max-width: 768px) {
  .student-trap-comparison {
    grid-template-columns: 1fr;
  }
}

.student-trap-wrong {
  background: rgba(248, 81, 73, 0.07);
  border: 1px solid rgba(248, 81, 73, 0.22);
  border-radius: 8px;
  padding: 12px 14px;
}

.student-trap-wrong .student-trap-lbl {
  color: var(--red, #f85149);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.student-trap-right {
  background: rgba(63, 185, 80, 0.07);
  border: 1px solid rgba(63, 185, 80, 0.22);
  border-radius: 8px;
  padding: 12px 14px;
}

.student-trap-right .student-trap-lbl {
  color: var(--green, #3fb950);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.student-trap-wrong p,
.student-trap-right p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.58;
}

.student-trap-takeaway {
  background: rgba(240, 136, 62, 0.1);
  border: 1px dashed rgba(240, 136, 62, 0.35);
  border-radius: 7px;
  padding: 8px 12px;
  font-size: 0.88rem;
  color: var(--txt, #e6edf3);
  margin-top: 10px;
}

/* ==========================================================================
   ELI5 Pedagogy: SOS Recognition Recipe Formula (.recognition-formula)
   ========================================================================== */
.recognition-formula {
  background: linear-gradient(145deg, rgba(57, 212, 200, 0.08) 0%, var(--surf2, #1c2230) 100%);
  border: 1px solid rgba(57, 212, 200, 0.32);
  border-left: 5px solid var(--cyan, #39d4c8);
  border-radius: 12px;
  padding: 18px 22px;
  margin: 22px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.recognition-formula:hover {
  border-color: rgba(57, 212, 200, 0.55);
  box-shadow: 0 6px 24px rgba(57, 212, 200, 0.12), 0 4px 16px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}

.recognition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.recognition-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--cyan, #39d4c8);
  background: rgba(57, 212, 200, 0.14);
  border: 1px solid rgba(57, 212, 200, 0.35);
  padding: 3px 10px;
  border-radius: 6px;
}

.recognition-topic {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--dim, #8892b0);
}

.recognition-title {
  font-family: 'Syne', 'Roboto', sans-serif;
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--txt, #e6edf3);
  line-height: 1.4;
  margin-bottom: 12px;
}

.recognition-trigger {
  background: rgba(88, 166, 255, 0.06);
  border: 1px solid rgba(88, 166, 255, 0.2);
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 14px;
}

.recognition-trigger .recognition-lbl,
.recognition-recipe .recognition-lbl {
  color: var(--blue, #58a6ff);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.recognition-trigger p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.58;
}

.recognition-steps {
  margin: 8px 0 14px 20px;
  padding: 0;
  line-height: 1.8;
  font-size: 0.92rem;
}

.recognition-steps li {
  margin-bottom: 6px;
}

.key-formula-box {
  background: #060a10;
  border: 1.5px solid rgba(57, 212, 200, 0.4);
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 14px;
  text-align: center;
}

.key-formula-lbl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--cyan, #39d4c8);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.key-formula-math {
  overflow-x: auto;
  font-size: 1rem;
}

/* ==========================================================================
   ELI5 Pedagogy: Step-by-Step Arithmetic Calculation (.step-by-step-calc)
   ========================================================================== */
.step-by-step-calc {
  background: var(--surf, #161b22);
  border: 1px solid var(--border, #30363d);
  border-radius: 12px;
  padding: 18px 20px;
  margin: 20px 0;
}

.calc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.calc-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--purple, #bc8cff);
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(188, 140, 255, 0.12);
  border: 1px solid rgba(188, 140, 255, 0.3);
  padding: 3px 10px;
  border-radius: 6px;
}

.calc-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: var(--dim, #8892b0);
}

.calc-step {
  position: relative;
  padding-left: 36px;
  margin-bottom: 18px;
}

.calc-step:last-child {
  margin-bottom: 0;
}

/* Connecting line between steps */
.calc-step::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 28px;
  bottom: -10px;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.calc-step:last-child::before {
  display: none;
}

.calc-step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.calc-step-num {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--purple, #bc8cff);
  color: #1d1040;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(188, 140, 255, 0.35);
}

.calc-step-title {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--txt, #e6edf3);
}

.calc-step-content {
  font-size: 0.9rem;
  line-height: 1.68;
  color: var(--muted, #8b949e);
}

.calc-step-content p {
  margin-bottom: 8px;
}

.calc-math-row {
  overflow-x: auto;
  margin: 8px 0;
}

/* Intermediate highlighted values & arithmetic pills */
.calc-val-highlight {
  background: rgba(227, 179, 65, 0.15);
  color: var(--yellow, #e3b341);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(227, 179, 65, 0.3);
  font-weight: 700;
}

.calc-val-zero {
  background: rgba(63, 185, 80, 0.15);
  color: var(--green, #3fb950);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(63, 185, 80, 0.3);
  font-weight: 700;
}

.calc-intermediate-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: 8px;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--txt, #e6edf3);
}

.calc-intermediate-badge {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--yellow, #e3b341);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.calc-inline-calc {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(88, 166, 255, 0.1);
  color: var(--blue, #58a6ff);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.82rem;
  margin: 0 2px;
}

/* Light Mode Overrides for ELI5 Components */
html[data-theme="light"] .student-trap {
  background: linear-gradient(145deg, #fff5f5 0%, #ffffff 100%);
  border-color: #fca5a5;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.08);
}
html[data-theme="light"] .student-trap-wrong {
  background: #fef2f2;
  border-color: #fecaca;
}
html[data-theme="light"] .student-trap-right {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
html[data-theme="light"] .student-trap-takeaway {
  background: #fff7ed;
  border-color: #fed7aa;
}
html[data-theme="light"] .recognition-formula {
  background: linear-gradient(145deg, #f0fdfa 0%, #ffffff 100%);
  border-color: #99f6e4;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.08);
}
html[data-theme="light"] .key-formula-box {
  background: #f8fafc;
  border-color: #0d9488;
}
html[data-theme="light"] .step-by-step-calc {
  background: #ffffff;
  border-color: #e2e8f0;
}
html[data-theme="light"] .calc-step-num {
  color: #ffffff;
}
html[data-theme="light"] .calc-step::before {
  background: #e2e8f0;
}
html[data-theme="light"] .calc-intermediate-box {
  background: #f8fafc;
  border-color: #cbd5e1;
}
```

---

### 4.3 Integration Blueprint for Model Solutions in `exam_prep.html`

The following blueprints provide exact snippets to insert into `exam_prep.html` for Types A through H:

#### Model Type A: Fixed Point with Parameter $\lambda$ (Θέμα 1.1)
- **Insert Location**: Inside `.qa-a` of Type A (lines 495–517), right before `Βήμα 1`.
- **Snippet**:
```html
<div class="recognition-formula">
  <div class="recognition-header">
    <span class="recognition-badge">⚡ SOS ΣΥΝΤΑΓΗ ΕΠΙΤΥΧΙΑΣ</span>
    <span class="recognition-topic">ΘΕΜΑ 1.1 · ΣΤΑΘΕΡΟ ΣΗΜΕΙΟ</span>
  </div>
  <div class="recognition-title">Όταν η εκφώνηση λέει: «Βρείτε εύρος τιμών του λ ώστε να συγκλίνει στη ρίζα ξ»</div>
  <div class="recognition-trigger">
    <div class="recognition-lbl">🔍 Πώς το αναγνωρίζεις αμέσως</div>
    <p>Σου δίνουν αναδρομικό σχήμα $x_{n+1} = x_n + \lambda \cdot \phi(x_n)$ και ζητούν (α) εύρος σύγκλισης, (β) τιμή του $\lambda$ για τετραγωνική σύγκλιση.</p>
  </div>
  <div class="recognition-recipe">
    <div class="recognition-lbl">📋 Η Μηχανική Συνταγή</div>
    <ol class="recognition-steps">
      <li><strong>Βήμα 1:</strong> Ορίζεις $g(x) = x + \lambda(x^2 - 3)$ και παραγωγίζεις $g'(x) = 1 + 2\lambda x$.</li>
      <li><strong>Βήμα 2 (Σύγκλιση):</strong> Θέτεις $x = \xi = \sqrt{3}$ και λύνεις την ανίσωση $|g'(\xi)| < 1 \iff -1 < 1 + 2\lambda\sqrt{3} < 1$.</li>
      <li><strong>Βήμα 3 (Τετραγωνική):</strong> Μηδενίζεις την πρώτη παράγωγο στη ρίζα: $g'(\xi) = 0 \iff 1 + 2\lambda\sqrt{3} = 0$.</li>
    </ol>
  </div>
  <div class="key-formula-box">
    <div class="key-formula-lbl">🔑 Ο ΤΥΠΟΣ-ΚΛΕΙΔΙ</div>
    <div class="key-formula-math">
      $$|g'(\xi)| < 1 \iff -1 < g'(\xi) < 1 \quad \text{και} \quad g'(\xi) = 0 \iff \text{Τετραγωνική Σύγκλιση}$$
    </div>
  </div>
</div>

<div class="student-trap">
  <div class="student-trap-header">
    <span class="student-trap-badge">⚠️ ΠΑΓΙΔΑ ΣΤΙΣ ΕΞΕΤΑΣΕΙΣ</span>
    <span class="student-trap-scope">ΘΕΜΑ 1.1 · ΠΡΟΣΗΜΟ ΑΝΙΣΩΣΗΣ</span>
  </div>
  <div class="student-trap-title">Προσοχή στη διαίρεση με αρνητικό αριθμό και στο άκρο $\lambda = 0$!</div>
  <div class="student-trap-body">
    <div class="student-trap-comparison">
      <div class="student-trap-wrong">
        <div class="student-trap-lbl">❌ Κλασικό Λάθος</div>
        <p>Ο φοιτητής θεωρεί ότι το $\lambda = 0$ δίνει σύγκλιση επειδή $|g'(\sqrt{3})| = |1+0| \le 1$. Όμως για $\lambda = 0$ έχουμε $g(x) = x$, άρα η μέθοδος κολλάει στο αρχικό $x_0$ και δεν προχωράει ποτέ προς τη ρίζα!</p>
      </div>
      <div class="student-trap-right">
        <div class="student-trap-lbl">✅ Πώς το γράφεις σωστά</div>
        <p>Η ανίσωση είναι <strong>αυστηρή</strong>: $|g'(\xi)| < 1$. Το διάστημα είναι ανοικτό: $-\frac{1}{\sqrt{3}} < \lambda < 0$. Το 0 εξαιρείται ρητά!</p>
      </div>
    </div>
    <div class="student-trap-takeaway">
      <strong>💡 Κανόνας:</strong> Στο θεώρημα σταθερού σημείου η ανισότητα είναι πάντα <em>αυστηρή</em> ($|g'(\xi)| < 1$), ποτέ με $\le$!
    </div>
  </div>
</div>
```

#### Model Type B: Jordan with Partial Pivoting (Θέμα 1.2)
- **Insert Location**: Inside `.qa-a` of Type B (lines 552–597).
- **Snippet**:
```html
<div class="step-by-step-calc">
  <div class="calc-header">
    <span class="calc-badge">🔢 ΕΝΔΙΑΜΕΣΕΣ ΠΡΑΞΕΙΣ ΓΡΑΜΜΟΠΡΑΞΕΩΝ</span>
    <span class="calc-tag">ΒΗΜΑ 1 & 2 JORDAN</span>
  </div>
  <div class="calc-step">
    <div class="calc-step-header">
      <span class="calc-step-num">1</span>
      <span class="calc-step-title">Υπολογισμός Πολλαπλασιαστή $m_{21}$ &amp; $m_{31}$</span>
    </div>
    <div class="calc-step-content">
      <p>Μετά την εναλλαγή $R_1 \longleftrightarrow R_3$, ο οδηγός είναι $a_{11} = 2$. Υπολογίζουμε τους πολλαπλασιαστές:</p>
      <div class="calc-math-row">
        $$m_{21} = \frac{-1}{2} = -\frac{1}{2}, \quad m_{31} = \frac{1}{2}$$
      </div>
      <div class="calc-intermediate-box">
        <span class="calc-intermediate-badge">💡 Αναλυτική Εφαρμογή Προσήμων</span>
        <div>$R_2 \leftarrow R_2 - \left(-\frac{1}{2}\right)R_1 = R_2 + \frac{1}{2}R_1$:
          <span class="calc-inline-calc">[1 + \tfrac{1}{2}(-2) = 0]</span>,
          <span class="calc-inline-calc">[0 + \tfrac{1}{2}(4) = 2]</span>,
          <span class="calc-inline-calc">[1 + \tfrac{1}{2}(0) = 1]</span>,
          <span class="calc-inline-calc">[0 + \tfrac{1}{2}(1) = \tfrac{1}{2}]</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="student-trap">
  <div class="student-trap-header">
    <span class="student-trap-badge">⚠️ ΠΑΓΙΔΑ ΣΤΙΣ ΕΞΕΤΑΣΕΙΣ</span>
    <span class="student-trap-scope">ΘΕΜΑ 1.2 · ΜΕΡΙΚΗ ΟΔΗΓΗΣΗ</span>
  </div>
  <div class="student-trap-title">Μην ψάχνεις για μέγιστο στοιχείο σε ολόκληρο τον πίνακα!</div>
  <div class="student-trap-body">
    <div class="student-trap-comparison">
      <div class="student-trap-wrong">
        <div class="student-trap-lbl">❌ Κλασικό Λάθος</div>
        <p>Ψάχνει το μέγιστο κατ' απόλυτη τιμή σε όλο τον πίνακα ή σε άλλες στήλες και κάνει εναλλαγή στηλών, αλλάζοντας τη σειρά των αγνώστων χωρίς να το καταλάβει.</p>
      </div>
      <div class="student-trap-right">
        <div class="student-trap-lbl">✅ Πώς το γράφεις σωστά</div>
        <p>Στο βήμα $k$, ψάχνεις <strong>ΜΟΝΟ στην $k$-οστή στήλη</strong> και <strong>από τη διαγώνιο και κάτω</strong> ($i \ge k$): $|a_{rk}| = \max_{k \le i \le n} |a_{ik}|$. Εναλλάσσεις μόνο τις γραμμές $R_k \longleftrightarrow R_r$.</p>
      </div>
    </div>
  </div>
</div>
```

#### Model Type C: Matrix Complexity & Algebraic Transform (Θέμα 1.3)
- **Insert Location**: Inside `.qa-a` of Type C (lines 627–664).
- **Snippet**:
```html
<div class="recognition-formula">
  <div class="recognition-header">
    <span class="recognition-badge">⚡ SOS ΣΥΝΤΑΓΗ ΕΠΙΤΥΧΙΑΣ</span>
    <span class="recognition-topic">ΘΕΜΑ 1.3 · ΠΟΛΥΠΛΟΚΟΤΗΤΑ $O(n^3)$</span>
  </div>
  <div class="recognition-title">Όταν η εκφώνηση ζητά: «Βρείτε πολυπλοκότητα, μετασχηματίστε για μέγιστη βελτίωση και συγκρίνετε»</div>
  <div class="recognition-recipe">
    <div class="recognition-lbl">📋 Η Μηχανική Συνταγή</div>
    <ol class="recognition-steps">
      <li><strong>Βήμα 1 (Χρέωση):</strong> Γράφεις αναλυτικό πινακάκι: κάθε αντίστροφος $X^{-1}$ κοστίζει $\frac{4}{3}n^3$ (Gauss) ή $\frac{3}{2}n^3$ (Jordan). Κάθε πολλαπλασιασμός δύο $n\times n$ πινάκων κοστίζει $n^3$. Προσθέσεις και γινόμενα με διανύσματα είναι $n^2 \approx 0$.</li>
      <li><strong>Βήμα 2 (Μετασχηματισμός):</strong> Πολλαπλασιάζεις <em>και τα δύο μέλη από αριστερά</em> με τον πίνακα που ακυρώνει τον αντίστροφο στο δεξί μέλος (π.χ. επί $A$). Στόχος: δεξιά να μείνει σκέτο $b$.</li>
      <li><strong>Βήμα 3 (Σύγκριση):</strong> Υπολογίζεις τη νέα πολυπλοκότητα. Η διαφορά είναι ακριβώς το κόστος του αντιστρόφου που εξαλείφθηκε!</li>
    </ol>
  </div>
</div>

<div class="student-trap">
  <div class="student-trap-header">
    <span class="student-trap-badge">⚠️ ΠΑΓΙΔΑ ΣΤΙΣ ΕΞΕΤΑΣΕΙΣ</span>
    <span class="student-trap-scope">ΘΕΜΑ 1.3 · ΔΙΠΛΟΧΡΕΩΣΗ ΑΝΤΙΣΤΡΟΦΟΥ</span>
  </div>
  <div class="student-trap-title">Μην ξαναχρεώνεις τον ίδιο αντίστροφο δύο φορές!</div>
  <div class="student-trap-body">
    <div class="student-trap-comparison">
      <div class="student-trap-wrong">
        <div class="student-trap-lbl">❌ Κλασικό Λάθος</div>
        <p>Χρεώνει $\frac{4}{3}n^3$ για το $A^{-1}$ στο αριστερό μέλος και ξανά $\frac{4}{3}n^3$ για το $A^{-1}b$ στο δεξί μέλος.</p>
      </div>
      <div class="student-trap-right">
        <div class="student-trap-lbl">✅ Πώς το γράφεις σωστά</div>
        <p>Ο $A^{-1}$ έχει ήδη υπολογιστεί. Άρα το $A^{-1}b$ είναι απλός πολλαπλασιασμός πίνακα επί διάνυσμα, κόστους $n^2$, που θεωρείται <strong>αμελητέος (0)</strong> στην κλίμακα $n^3$.</p>
      </div>
    </div>
  </div>
</div>
```

#### Model Type D: Newton Interpolation & Simpson (Θέμα 2.1)
- **Insert Location**: Inside `.qa-a` of Type D (lines 694–760).
- **Snippet**:
```html
<div class="student-trap">
  <div class="student-trap-header">
    <span class="student-trap-badge">⚠️ ΠΑΓΙΔΑ ΣΤΙΣ ΕΞΕΤΑΣΕΙΣ</span>
    <span class="student-trap-scope">ΘΕΜΑ 2.1 · ΕΛΕΓΧΟΣ ΙΣΑΠΕΧΟΝΤΩΝ ΣΗΜΕΙΩΝ</span>
  </div>
  <div class="student-trap-title">Μην αρχίζεις ποτέ εμπρός διαφορές χωρίς να μετρήσεις τα διαστήματα!</div>
  <div class="student-trap-body">
    <div class="student-trap-comparison">
      <div class="student-trap-wrong">
        <div class="student-trap-lbl">❌ Κλασικό Λάθος</div>
        <p>Εφαρμόζει τον τύπο των εμπρός διαφορών (με $\theta$) σε σημεία που δεν ισαπέχουν (π.χ. $x = -2, -1, 1, 3$). Το αποτέλεσμα είναι εντελώς λάθος.</p>
      </div>
      <div class="student-trap-right">
        <div class="student-trap-lbl">✅ Πώς το γράφεις σωστά</div>
        <p>Γράφεις πρώτα: $x_1 - x_0 = 1 \ne x_2 - x_1 = 2$. Τα σημεία <strong>δεν ισαπέχουν</strong>, άρα η «πλέον αποτελεσματική μέθοδος» είναι υποχρεωτικά οι <strong>διηρημένες διαφορές</strong>!</p>
      </div>
    </div>
  </div>
</div>
```

#### Model Type E: Quadrature Weights & Precision Degree (Θέμα 2.2)
- **Insert Location**: Inside `.qa-a` of Type E (lines 788–833).
- **Snippet**:
```html
<div class="student-trap">
  <div class="student-trap-header">
    <span class="student-trap-badge">⚠️ ΠΑΓΙΔΑ ΣΤΙΣ ΕΞΕΤΑΣΕΙΣ</span>
    <span class="student-trap-scope">ΘΕΜΑ 2.2 · ΚΑΡΦΩΜΕΝΟΙ ΚΟΜΒΟΙ</span>
  </div>
  <div class="student-trap-title">Μην γράφεις μηχανικά «βαθμός ακρίβειας = 2n - 1»!</div>
  <div class="student-trap-body">
    <div class="student-trap-comparison">
      <div class="student-trap-wrong">
        <div class="student-trap-lbl">❌ Κλασικό Λάθος</div>
        <p>Βλέπει 2 σημεία και γράφει $2n - 1 = 2(2) - 1 = 3$. Όμως το ένα σημείο είναι καρφωμένο ($x_2 = 1$).</p>
      </div>
      <div class="student-trap-right">
        <div class="student-trap-lbl">✅ Πώς το γράφεις σωστά</div>
        <p>Μετράς τις <strong>ελεύθερες παραμέτρους</strong>: έχουμε 3 ($w_1, w_2, x_1$), όχι 4. Άρα ο τύπος μπορεί να εξασφαλίσει ακρίβεια έως βαθμό $3 - 1 = 2$. Επαληθεύεις πάντα δοκιμάζοντας $f(x) = x^3$!</p>
      </div>
    </div>
  </div>
</div>
```

---

## 5. Verification Method

To verify these implementations independently:

1. **Verify Flashcards Rendering**:
   - Open `flashcards.html` in browser.
   - Verify that no card face shows `undefined`.
   - Verify that clicking "💡 Υπόδειξη" shows and hides the hint smoothly.
   - Verify that category buttons ("Όλα τα κεφάλαια", "1 · Gauss & Jordan", etc.) filter the deck accurately and update card counts.
   - Navigate to `topic1_direct_linear.html#flashcards` and verify that the 7 chapter flip cards load and flip without any JavaScript console errors.

2. **Verify CSS Component Styles**:
   - Inspect elements matching `.student-trap`, `.recognition-formula`, and `.step-by-step-calc` in browser Developer Tools.
   - Toggle theme between dark mode and light mode (`html[data-theme="light"]`) and verify that colors, contrast, borders, and shadows maintain WCAG AA readability.
   - Resize viewport below 768px and verify that `.student-trap-comparison` drops to a clean 1-column layout without overflow.

3. **Verify Automated Project Verification Suite**:
   - Execute `python scripts/verify_webnotes.py` once implemented in M4 to confirm all HTML pages, relative links, MathJax delimiters, and interactive elements pass with zero errors.
