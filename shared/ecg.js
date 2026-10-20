/* =============================================================
   palmeiromed.com — monitor ECG en canvas
   Trazo PQRST con barrido continuo, como un monitor de cabecera.

   Los colores NO se escriben aquí: se leen de variables CSS del
   propio canvas, así cada variante (y cada tema) manda sobre el trazo.

     --ecg-stroke    color del trazo
     --ecg-baseline  color de la línea de base
     --ecg-glow      desenfoque del halo en px (0 = sin halo)

   La velocidad de barrido se deriva de la ALTURA del trazo
   (pxPorSegundo = altura × aspect). Así la proporción alto/ancho del
   complejo PQRST es la misma en un canvas ancho a sangre o en uno
   estrecho dentro de un panel: si se repartieran N segundos sobre el
   ancho disponible, un canvas más ancho ensancharía cada latido.

   Uso:  PM.ecg(canvas, { bpmEl: nodo })
         PM.ecg(canvas, { aspect: 2.32 })   // más alto = trazo más rápido
   ============================================================= */
(function () {
  'use strict';

  var PM = window.PM;

  function ecg(canvas, opts) {
    if (!canvas) return null;
    opts = opts || {};

    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return null;

    /* Con movimiento reducido se dibuja un trazo estático y se acaba. */
    if (PM.reduced) {
      drawStatic();
      window.addEventListener('resize', drawStatic, { passive: true });
      return { static: true };
    }

    var bpmEl = opts.bpmEl || null;
    var aspect = opts.aspect || 2.32;         // px/s por cada px de alto
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var W = 0, H = 0, pxPerSec = 0, buf = null, cursor = 0, phase = 0;
    var bpm = 72, targetBpm = 72;
    var running = true, last = 0;
    var theme = readTheme();

    /* ---------- color desde CSS ---------- */
    function readTheme() {
      var cs = getComputedStyle(canvas);
      var glow = parseFloat(cs.getPropertyValue('--ecg-glow'));
      return {
        stroke:   (cs.getPropertyValue('--ecg-stroke') || '#0d6158').trim(),
        baseline: (cs.getPropertyValue('--ecg-baseline') || 'rgba(0,0,0,.12)').trim(),
        glow:     isNaN(glow) ? 0 : glow
      };
    }

    /* ---------- geometría ---------- */
    function resize() {
      var r = canvas.getBoundingClientRect();
      W = Math.max(240, Math.round(r.width));
      H = Math.max(48, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // velocidad atada a la altura: mantiene la forma del complejo
      pxPerSec = opts.pxPerSec || H * aspect;

      var next = new Float32Array(W);
      if (buf) for (var i = 0; i < W && i < buf.length; i++) next[i] = buf[i];
      buf = next;
      if (cursor >= W) cursor = 0;
    }

    /* ---------- morfología ---------- */
    function gauss(x, mu, sigma) {
      var d = (x - mu) / sigma;
      return Math.exp(-0.5 * d * d);
    }

    /** Complejo PQRST normalizado en [-0.35, 1] para una fase de latido en [0,1) */
    function sample(p) {
      return gauss(p, 0.14,  0.026)  * 0.11    // onda P
           - gauss(p, 0.255, 0.009)  * 0.09    // Q
           + gauss(p, 0.285, 0.0085) * 1.00    // R
           - gauss(p, 0.318, 0.013)  * 0.26    // S
           + gauss(p, 0.47,  0.052)  * 0.25;   // onda T
    }

    /* ---------- bucle ---------- */
    function frame(ts) {
      if (!running) return;
      if (!last) last = ts;
      var dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      // deriva suave del ritmo, como un paciente tranquilo
      bpm += (targetBpm - bpm) * 0.02;
      if (Math.random() < 0.006) targetBpm = 64 + Math.random() * 16;
      if (bpmEl) bpmEl.textContent = String(Math.round(bpm));

      var advance = pxPerSec * dt;
      var beatsPerSec = bpm / 60;

      for (var i = 0; i < advance; i++) {
        phase += beatsPerSec / pxPerSec;
        if (phase >= 1) phase -= 1;
        buf[cursor] = sample(phase);
        cursor = (cursor + 1) % W;
      }

      draw();
      requestAnimationFrame(frame);
    }

    /* ---------- pintado ---------- */
    function draw() {
      var mid = H * 0.56, amp = H * 0.40;
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = theme.baseline;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid); ctx.lineTo(W, mid);
      ctx.stroke();

      var gap = 26;                       // hueco de barrido delante del cursor
      ctx.strokeStyle = theme.stroke;
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      if (theme.glow > 0) {
        ctx.shadowColor = theme.stroke;
        ctx.shadowBlur = theme.glow;
      }

      ctx.beginPath();
      var started = false;
      for (var k = 0; k < W; k++) {
        var x = (cursor + gap + k) % W;
        if (((x - cursor + W) % W) < gap) { started = false; continue; }
        var y = mid - buf[x] * amp;
        if (!started) { ctx.moveTo(x, y); started = true; }
        else if (x === 0) { ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); }
        else { ctx.lineTo(x, y); }
      }
      ctx.stroke();

      // punto de barrido
      ctx.fillStyle = theme.stroke;
      if (theme.glow > 0) ctx.shadowBlur = theme.glow * 1.8;
      ctx.beginPath();
      ctx.arc(cursor, mid - buf[(cursor - 1 + W) % W] * amp, 2.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    /** Trazo fijo para quien pidió movimiento reducido */
    function drawStatic() {
      theme = readTheme();
      resize();
      for (var x = 0; x < W; x++) {
        var p = (x / pxPerSec) * (72 / 60);
        buf[x] = sample(p - Math.floor(p));
      }
      cursor = W - 1;
      draw();
      if (bpmEl) bpmEl.textContent = '72';
    }

    /* ---------- arranque y ciclo de vida ---------- */
    resize();
    window.addEventListener('resize', function () { resize(); }, { passive: true });

    // el trazo cambia de color al cambiar el tema
    window.addEventListener('pm:theme', function () { theme = readTheme(); });

    // no gastar batería cuando el monitor no se ve
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !running) { running = true; last = 0; requestAnimationFrame(frame); }
          else if (!e.isIntersecting) { running = false; }
        });
      }, { threshold: 0 }).observe(canvas);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; last = 0; requestAnimationFrame(frame); }
    });

    requestAnimationFrame(frame);
    return { stop: function () { running = false; } };
  }

  PM.ecg = ecg;
})();
