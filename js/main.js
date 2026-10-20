/* =============================================================
   palmeiromed.com · Variante 1 — Editorial clínico
   Renderiza el contenido de shared/content.js
   ============================================================= */
(function () {
  'use strict';

  var S = window.SITE, PM = window.PM;
  var esc = PM.esc, icon = PM.icon, mount = PM.mount;

  /* ---------- navegación ---------- */
  var navHtml = S.nav.map(function (n) {
    return '<li><a href="' + esc(n.href) + '" data-navlink>' + esc(n.label) + '</a></li>';
  }).join('');
  mount('nav-desktop', navHtml);
  mount('nav-mobile', S.nav.map(function (n) {
    return '<li><a href="' + esc(n.href) + '">' + esc(n.label) + '</a></li>';
  }).join(''));

  /* ---------- ficha ---------- */
  mount('ficha-rows', S.facts.map(function (f) {
    return '<dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd>';
  }).join(''));

  /* ---------- estadísticas ---------- */
  mount('stats', S.stats.map(function (s, i) {
    return '<div class="stat" data-reveal style="--d:' + i + '">' +
      '<span class="stat-num"><span data-count="' + s.value + '">0</span>' + esc(s.suffix || '') + '</span>' +
      '<span class="stat-label">' + esc(s.label) + '</span>' +
      '</div>';
  }).join(''));

  /* ---------- el porqué ---------- */
  var st = S.story;
  mount('porque-eyebrow', esc(st.eyebrow));
  mount('porque-lede', esc(st.lede));
  mount('porque-body', st.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''));
  mount('porque-quote', esc(st.quote));

  mount('timeline', st.timeline.map(function (t, i) {
    return '<li data-reveal style="--d:' + i + '">' +
      '<span class="tl-when">' + esc(t.when) + '</span>' +
      '<span class="tl-what">' + esc(t.what) + '</span>' +
      '<span class="tl-detail">' + esc(t.detail) + '</span>' +
      '</li>';
  }).join(''));

  /* ---------- proyectos ---------- */
  mount('worklist', S.projects.map(function (p, i) {
    var specs = p.specs.map(function (s) {
      return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>';
    }).join('');
    var tags = p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');

    return '<article class="study" data-reveal style="--d:' + i + '">' +
      '<span class="study-index" aria-hidden="true">' + esc(p.index) + '</span>' +

      '<div class="study-body">' +
        '<p class="study-kind"><span class="study-chip">' + esc(p.modality) + '</span>' + esc(p.kind) + '</p>' +
        '<h3 class="study-name"><a href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(p.name) + '</a></h3>' +
        '<p class="study-tagline">' + esc(p.tagline) + '</p>' +
        '<p class="study-desc">' + esc(p.desc) + '</p>' +
        '<p class="study-long">' + esc(p.long) + '</p>' +
        '<ul class="study-tags">' + tags + '</ul>' +
      '</div>' +

      '<div class="study-aside">' +
        '<dl class="study-specs">' + specs + '</dl>' +
        '<a class="study-open" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer" ' +
          'aria-label="Abrir ' + esc(p.name) + ' en una pestaña nueva">abrir' +
          icon('arrow', 'ico', 15) + '</a>' +
        '<span class="study-host">' + esc(p.host) + '</span>' +
      '</div>' +
    '</article>';
  }).join(''));

  /* ---------- principios ---------- */
  mount('principles', S.principles.map(function (p, i) {
    return '<div class="principle" data-reveal style="--d:' + i + '">' +
      icon(p.icon, 'ico', 26) +
      '<h3>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.text) + '</p>' +
      '</div>';
  }).join(''));

  /* ---------- contacto ---------- */
  var c = S.contact;
  mount('contact-eyebrow', esc(c.eyebrow));
  mount('contact-title', esc(c.title));
  mount('contact-lede', esc(c.lede));
  mount('contact-rows', c.rows.map(function (r) {
    var inner = icon(r.icon, 'ico', 18) +
      '<dt>' + esc(r.label) + '</dt>' +
      '<dd>' + esc(r.value) + '</dd>';
    return r.href
      ? '<a class="contact-item" href="' + esc(r.href) + '">' + inner + '</a>'
      : '<div class="contact-item">' + inner + '</div>';
  }).join(''));

  /* ---------- pie ---------- */
  mount('foot-disclaimer', esc(S.footer.disclaimer));
  mount('foot-line', esc(S.footer.line));

  /* ---------- arranque común (tema, reveal, contadores, nav) ---------- */
  PM.boot();

  /* ---------- monitor ECG (después de boot, para que el tema ya esté puesto) ---------- */
  PM.ecg(document.getElementById('ecg-canvas'), {
    bpmEl: document.getElementById('bpm')
  });
})();
