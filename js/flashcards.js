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
