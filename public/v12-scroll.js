/* ============================================================
   Yu Development V12 — scroll animation engine
   Patterns: generic reveal, parallax scatter, sticky word-reveal
   statement, sticky values list, carousel controls.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Generic on-scroll reveal (.fx) ---------- */
  (function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.fx'));
    if (!els.length) return;
    if (reduce) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    function check() {
      var vh = window.innerHeight;
      els = els.filter(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) { e.classList.add('in'); return false; }
        return true;
      });
      if (!els.length) {
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
  })();

  /* ---------- 2. (removed) statement is now a static section ---------- */

  /* ---------- 2b. Count-up stats (fire once when revealed) ---------- */
  (function countStats() {
    var figs = Array.prototype.slice.call(document.querySelectorAll('.about-stats .fig[data-count]'));
    if (!figs.length) return;
    function format(el, v) {
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var plain = el.getAttribute('data-plain') === '1';
      var n = plain ? String(Math.round(v)) : Math.round(v).toLocaleString();
      return prefix + n + suffix;
    }
    if (reduce) { figs.forEach(function (el) { el.textContent = format(el, +el.getAttribute('data-count')); }); return; }
    figs.forEach(function (el) { el.textContent = format(el, 0); });
    function run(el) {
      var target = +el.getAttribute('data-count');
      var dur = 2000, start = null;
      function frame(t) {
        if (start === null) start = t;
        var p = Math.min(1, (t - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = format(el, target * eased);
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = format(el, target);
      }
      requestAnimationFrame(frame);
    }
    var fired = false;
    function check() {
      if (fired) return;
      var first = figs[0].getBoundingClientRect();
      if (first.top < window.innerHeight * 0.85 && first.bottom > 0) {
        fired = true;
        figs.forEach(run);
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
  })();

  /* ---------- 2c. Count-up single figure (.who-fig) ---------- */
  (function countWhoFig() {
    var els = document.querySelectorAll('.who-fig[data-count], .local-fig[data-count]');
    if (!els.length) return;
    els.forEach(function (el) {
      var target = +el.getAttribute('data-count');
      var suffix = el.getAttribute('data-suffix') || '';
      function format(v) { return Math.round(v) + suffix; }
      if (reduce) { el.textContent = format(target); return; }
      el.textContent = format(0);
      var fired = false;
      function run() {
        var dur = 1600, start = null;
        function frame(t) {
          if (start === null) start = t;
          var p = Math.min(1, (t - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(target * eased);
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = format(target);
        }
        el.textContent = format(0);
        requestAnimationFrame(frame);
      }
      function check() {
        if (fired) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
          fired = true;
          run();
          window.removeEventListener('scroll', check);
          window.removeEventListener('resize', check);
        }
      }
      window.addEventListener('scroll', check, { passive: true });
      window.addEventListener('resize', check);
      check();
    });
  })();

  /* ---------- 3. Parallax image scatter ---------- */
  (function parallax() {
    var section = document.querySelector('.platform');
    var items = Array.prototype.slice.call(document.querySelectorAll('.platform .scatter image-slot'));
    if (!section || !items.length || reduce) return;
    // each item drifts at a depth factor stored in data-depth
    var ticking = false;
    function update() {
      ticking = false;
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      // progress of section through viewport center: -1 (below) .. 1 (above)
      var center = rect.top + rect.height / 2;
      var rel = (center - vh / 2) / (vh / 2 + rect.height / 2);
      items.forEach(function (el) {
        var depth = parseFloat(el.getAttribute('data-depth')) || 0.2;
        var y = rel * depth * 180; // px
        el.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ---------- 4. Sticky values list ---------- */
  (function values() {
    var track = document.getElementById('valuesTrack');
    var items = Array.prototype.slice.call(document.querySelectorAll('.values .vitem'));
    var frames = Array.prototype.slice.call(document.querySelectorAll('.values .frame image-slot'));
    if (!track || !items.length) return;
    if (reduce) {
      items.forEach(function (it) { it.classList.add('active'); });
      if (frames[0]) frames[0].classList.add('show');
      return;
    }
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      var dist = track.offsetHeight - vh;
      var scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), dist);
      var p = dist > 0 ? scrolled / dist : 0;
      var idx = Math.min(items.length - 1, Math.floor(p * items.length * 0.999));
      items.forEach(function (it, i) { it.classList.toggle('active', i === idx); });
      frames.forEach(function (f, i) { f.classList.toggle('show', i === idx); });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ---------- 5. Carousels (infinite wrap-around) ---------- */
  (function carousels() {
    function init(trackId, prevId, nextId, cardSel) {
      var track = document.getElementById(trackId);
      var prev = document.getElementById(prevId);
      var next = document.getElementById(nextId);
      if (!track || !prev || !next) return;
      function step() {
        var card = track.querySelector(cardSel);
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '24') || 24;
        return card ? card.getBoundingClientRect().width + gap : 360;
      }
      function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }
      function atStart() { return track.scrollLeft <= 4; }
      next.addEventListener('click', function () {
        if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });        // past the last → back to first
        else track.scrollBy({ left: step(), behavior: 'smooth' });
      });
      prev.addEventListener('click', function () {
        if (atStart()) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' }); // before first → jump to last
        else track.scrollBy({ left: -step(), behavior: 'smooth' });
      });
    }
    init('insightsTrack', 'insPrev', 'insNext', '.ncard');
  })();

  /* ---------- 6. Nav: solid bar past the hero ---------- */
  (function nav() {
    var header = document.querySelector('header.hf-nav');
    var hero = document.querySelector('.hf');
    if (!header || !hero) return;
    var ticking = false;
    function update() {
      ticking = false;
      var past = window.scrollY > 8;
      header.classList.toggle('navy', past);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  })();

  /* ---------- 7. Smooth-scroll for in-page anchors ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
})();
