/* =============================================================
   palmeiromed.com — utilidades compartidas entre variantes
   Sin dependencias. Expone window.PM
   ============================================================= */
(function () {
  'use strict';

  var S = window.SITE;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /** SVG en línea desde SITE.icons */
  function icon(name, cls, size) {
    var d = S.icons[name];
    if (!d) return '';
    return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" width="' + (size || 24) + '" height="' + (size || 24) +
      '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      d + '</svg>';
  }

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  }

  function each(sel, fn, root) {
    var list = (root || document).querySelectorAll(sel);
    Array.prototype.forEach.call(list, fn);
    return list;
  }

  /* ---------- tema claro / oscuro ---------- */

  var KEY = 'pm-theme';

  function applyTheme(mode) {
    if (mode === 'light' || mode === 'dark') {
      document.documentElement.setAttribute('data-theme', mode);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    each('[data-theme-toggle]', function (btn) {
      var dark = resolvedTheme() === 'dark';
      btn.setAttribute('aria-label', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
      btn.setAttribute('aria-pressed', String(dark));
    });

    // quien dibuje con colores del tema (el ECG) se entera por aquí
    try { window.dispatchEvent(new CustomEvent('pm:theme')); }
    catch (e) {
      var ev = document.createEvent('Event');
      ev.initEvent('pm:theme', false, false);
      window.dispatchEvent(ev);
    }
  }

  function resolvedTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function initTheme(defaultMode) {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    applyTheme(stored || defaultMode || null);

    each('[data-theme-toggle]', function (btn) {
      btn.addEventListener('click', function () {
        var next = resolvedTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    });

    // si el usuario no ha elegido, seguimos al sistema cuando cambie
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystem = function () {
      var chosen = null;
      try { chosen = localStorage.getItem(KEY); } catch (e) {}
      if (!chosen) applyTheme(null);
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystem);
    else if (mq.addListener) mq.addListener(onSystem);
  }

  /* ---------- scroll reveal ---------- */

  function initReveal(selector) {
    var items = document.querySelectorAll(selector || '[data-reveal]');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }
    Array.prototype.forEach.call(items, function (el) { el.classList.add('pending'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------- contadores ---------- */

  function countUp(el, target, ms) {
    target = Number(target) || 0;
    if (reduced || target === 0) { el.textContent = String(target); return; }
    var dur = ms || 1100, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters(selector) {
    var items = document.querySelectorAll(selector || '[data-count]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countUp(e.target, e.target.getAttribute('data-count'));
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------- nav: sección activa + header al hacer scroll ---------- */

  function initScrollState(headerSel) {
    var header = document.querySelector(headerSel || '[data-header]');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-stuck', window.scrollY > 24);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var links = document.querySelectorAll('[data-navlink]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    Array.prototype.forEach.call(links, function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      if (id) map[id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.classList.remove('is-active'); });
        var a = map[e.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  /* ---------- menú móvil ---------- */

  function initMobileNav() {
    var btn = document.querySelector('[data-nav-toggle]');
    var panel = document.querySelector('[data-nav-panel]');
    if (!btn || !panel) return;

    function close() {
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
    function open() {
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    }
    close();
    btn.addEventListener('click', function () {
      if (panel.hidden) open(); else close();
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { close(); btn.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760 && !panel.hidden) close();
    });
  }

  /* ---------- año en el pie ---------- */

  function initYear() {
    each('[data-year]', function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- arranque común ---------- */

  function boot(opts) {
    opts = opts || {};
    initTheme(opts.theme);
    initYear();
    initMobileNav();
    initScrollState();
    initReveal();
    initCounters();
  }

  window.PM = {
    S: S,
    esc: esc,
    icon: icon,
    mount: mount,
    each: each,
    reduced: reduced,
    boot: boot,
    initReveal: initReveal,
    initCounters: initCounters,
    countUp: countUp,
    resolvedTheme: resolvedTheme
  };
})();
