/* Flow-field background for the hero — the v2 brand motif.
   Streamlines drift slowly; ink + occasional vermilion threads. */
(function () {
  var tries = 0;
  function init() {
    var canvas = document.getElementById("flowCanvas");
    if (!canvas) {
      // React mounts the canvas after Babel transpiles — retry briefly
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
    function angleAt(x, y) {
      return noise(x * FREQ + timePhase, y * FREQ) * TURN + x * 0.0005;
    }

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
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

    /* very slow drift: re-render with shifting phase a few times/sec */
    var raf = null, lastT = 0;
    function tick(t) {
      if (t - lastT > 90) {       // ~11fps is plenty for slow drift
        timePhase += 0.0035;
        paint();
        lastT = t;
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      readColors();
      resize();
      paint();                     // static frame immediately
      if (reduce) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { resize(); paint(); }, 150);
    });

    window.__refreshFlowColors = function () { readColors(); paint(); };

    start();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
