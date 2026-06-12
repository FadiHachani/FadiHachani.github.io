/* Flow-field background for the hero  the v2 brand motif.
   Streamlines genuinely re-flow (the original v2 motion), kept smooth by
   precomputing the value-noise field into a grid so per-frame work is just
   cheap lookups instead of thousands of Math.sin() calls. */
(function () {
  var tries = 0;
  function init() {
    var canvas = document.getElementById("flowCanvas");
    if (!canvas) {
      // React/Astro may mount the canvas a touch late  retry briefly
      if (tries++ < 100) setTimeout(init, 100);
      return;
    }
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;

    function cssVar(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
    var inkRGB = "27,23,18", accRGB = "216,64,31", alphaMul = 1;
    function readColors() {
      inkRGB = cssVar("--flow-ink") || inkRGB;
      accRGB = cssVar("--flow-accent") || accRGB;
      alphaMul = parseFloat(cssVar("--flow-alpha")) || 1;
    }

    /* tiny value noise */
    function rand(x, y) {
      var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    }
    function smooth(t) { return t * t * (3 - 2 * t); }
    function noise(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y);
      var xf = x - xi, yf = y - yi;
      var tl = rand(xi, yi), tr = rand(xi + 1, yi);
      var bl = rand(xi, yi + 1), br = rand(xi + 1, yi + 1);
      var u = smooth(xf), v = smooth(yf);
      return (tl * (1 - u) + tr * u) * (1 - v) + (bl * (1 - u) + br * u) * v;
    }

    var FREQ = 0.0036, TURN = Math.PI * 2.2;
    var timePhase = 0;

    /* --- precomputed noise field ---
       The expensive part is noise(x*FREQ + timePhase, y*FREQ). x and y only
       enter as x*FREQ and y*FREQ, so we sample noise on a fixed lattice ONCE
       per resize, then per-frame the drift (timePhase) is just an integer
       offset + fractional blend across two cached columns. */
    var NX = 0, NY = 0, PERX = 0, field = null;   // field[gx*NY + gy] in [0,1]
    var GSTEP = 6;                        // grid resolution in screen px

    function buildField() {
      // Columns must cover the visible width PLUS a full drift period so the
      // animation can scroll the phase forever and wrap seamlessly (toroidal
      // in X) instead of running off the edge and clamping to one column 
      // which is what collapsed the field into straight diagonal lines.
      var visCols = Math.ceil((W + 80) / GSTEP) + 2;
      PERX = visCols * 3;                 // periodic span = 3× the viewport
      NX = PERX + 2;                       // +2 guard cols (we still wrap before reading)
      NY = Math.ceil((H + 80) / GSTEP) + 2;
      field = new Float32Array(NX * NY);
      for (var gx = 0; gx < NX; gx++) {
        // wrap the noise X-coordinate so column PERX matches column 0 → seamless loop
        var wx = gx % PERX;
        var nx = (wx * GSTEP - 40) * FREQ;
        for (var gy = 0; gy < NY; gy++) {
          var ny = (gy * GSTEP - 40) * FREQ;
          field[gx * NY + gy] = noise(nx, ny);
        }
      }
    }

    // sampled value at screen (x,y) for the current timePhase, via the lattice
    function fieldAt(x, y) {
      // timePhase shifts the column offset; wrap modulo PERX so it never clamps
      var fx = (x + 40) / GSTEP + (timePhase / FREQ) / GSTEP;
      fx = fx % PERX; if (fx < 0) fx += PERX;
      var fy = (y + 40) / GSTEP;
      var gx = fx | 0, gy = fy | 0;
      if (gy < 0) gy = 0; else if (gy >= NY - 1) gy = NY - 2;
      var gx1 = (gx + 1) % PERX;            // wrap the neighbour column too
      var tx = fx - gx, ty = fy - gy;
      var a0 = gx * NY + gy, a1 = gx1 * NY + gy;
      var v00 = field[a0], v10 = field[a1];
      var v01 = field[a0 + 1], v11 = field[a1 + 1];
      return (v00 * (1 - tx) + v10 * tx) * (1 - ty) +
             (v01 * (1 - tx) + v11 * tx) * ty;
    }

    function angleAt(x, y) {
      return fieldAt(x, y) * TURN + x * 0.0005;
    }

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildField();
    }

    function streamline(sx, sy, steps, color, alpha, width) {
      var x = sx, y = sy;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (var i = 0; i < steps; i++) {
        var a = angleAt(x, y);
        x += Math.cos(a) * 2;
        y += Math.sin(a) * 2;
        if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(" + color + "," + (alpha * alphaMul).toFixed(3) + ")";
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    function paint() {
      ctx.clearRect(0, 0, W, H);
      var SEEDS = Math.floor(W * H / 950);
      for (var i = 0; i < SEEDS; i++) {
        var r = rand(i * 1.31, i * 7.77);
        var sx = Math.pow(r, 0.55) * (W + 40) - 20;
        var sy = rand(i * 3.17, i * 0.91) * (H + 40) - 20;
        var lengthFactor = 0.4 + (sx / W) * 0.9;
        var steps = Math.floor(36 + lengthFactor * 84);
        // keep the left ~45% nearly clear so the wordmark stays crisp
        var leftFade = Math.min(1, Math.max(0, (sx - W * 0.42) / (W * 0.34)));
        var baseAlpha = 0.01 + leftFade * 0.16;
        if (baseAlpha < 0.02) continue;
        if (i % 13 === 0) streamline(sx, sy, steps, accRGB, baseAlpha * 1.55, 1.1);
        else streamline(sx, sy, steps, inkRGB, baseAlpha, 0.7);
      }
    }

    /* continuous re-flow  the original v2 motion, now cheap thanks to the
       cached field. ~20fps is smooth for this slow drift. */
    var raf = null, lastT = 0, visible = true;
    function tick(t) {
      if (visible && t - lastT > 48) {   // ~20fps
        timePhase += 0.0016;
        paint();
        lastT = t;
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      readColors();
      resize();
      paint();                     // first frame immediately
      if (reduce) return;          // static for reduced-motion users
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { resize(); paint(); }, 150);
    });

    // Stop animating while the hero is scrolled out of view.
    if ("IntersectionObserver" in window) {
      var vis = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { visible = e.isIntersecting; });
      }, { threshold: 0 });
      vis.observe(canvas.parentElement || canvas);
    }

    window.__refreshFlowColors = function () { readColors(); paint(); };

    start();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
