/**
 * Rapid Fire: random order with session reshuffle; reveal answer on demand.
 */
(function () {
  const bank = window.RAPID_FIRE_QUESTIONS;
  if (!bank || !bank.length) return;

  const ORDER_KEY = 'rapidFireOrder';
  const PTR_KEY = 'rapidFirePtr';

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function ensureQueue() {
    let order = sessionStorage.getItem(ORDER_KEY);
    let ptr = parseInt(sessionStorage.getItem(PTR_KEY) || '0', 10);
    if (!order) {
      order = JSON.stringify(shuffle([...Array(bank.length).keys()]));
      sessionStorage.setItem(ORDER_KEY, order);
      sessionStorage.setItem(PTR_KEY, '0');
      ptr = 0;
    }
    return { order: JSON.parse(order), ptr };
  }

  function nextIndex() {
    let { order, ptr } = ensureQueue();
    if (ptr >= order.length) {
      order = shuffle([...Array(bank.length).keys()]);
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
      ptr = 0;
    }
    const idx = order[ptr];
    sessionStorage.setItem(PTR_KEY, String(ptr + 1));
    return idx;
  }

  function displayQuestion() {
    const idx = nextIndex();
    const item = bank[idx];
    document.getElementById('rapid-topic').textContent = item.t;
    document.getElementById('rapid-question').innerHTML = item.q;
    document.getElementById('rapid-answer').innerHTML = item.a;
    document.getElementById('rapid-explanation').innerHTML = item.x;
    const block = document.getElementById('rapid-answer-block');
    const btn = document.getElementById('rapid-see-answer');
    block.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.disabled = false;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const see = document.getElementById('rapid-see-answer');
    const next = document.getElementById('rapid-next');
    const block = document.getElementById('rapid-answer-block');
    if (!see || !next || !block) return;

    displayQuestion();

    see.addEventListener('click', function () {
      block.hidden = false;
      see.setAttribute('aria-expanded', 'true');
      see.disabled = true;
    });
    next.addEventListener('click', displayQuestion);
  });
})();
