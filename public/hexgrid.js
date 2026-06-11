/* Animated H3-style hexagonal grid background.
   A nod to Déligo's spatial driver-matching grid. Plain JS canvas. */
(function () {
  function initHexGrid() {
    var canvas = document.getElementById("hexCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var R = 34;                 // hex radius
    var hexW = Math.sqrt(3) * R;
    var hexH = 2 * R;
    var cells = [];             // {cx, cy} centers
    var pulses = [];            // active highlight pulses

    function cssVar(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
    var inkColor = "rgba(255,255,255,0.05)";
    var liveColor = "rgba(183,148,255,0.55)";

    function readColors() {
      inkColor = cssVar("--hex-ink") || inkColor;
      liveColor = cssVar("--hex-live") || liveColor;
    }

    function hexPath(cx, cy) {
      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        var a = Math.PI / 180 * (60 * i - 30);
        var x = cx + R * Math.cos(a);
        var y = cy + R * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function build() {
      var rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cells = [];
      var vstep = hexH * 0.75;
      var row = 0;
      for (var cy = 0; cy <= H + hexH; cy += vstep) {
        var offset = (row % 2) ? hexW / 2 : 0;
        for (var cx = -hexW; cx <= W + hexW; cx += hexW) {
          cells.push({ cx: cx + offset, cy: cy });
        }
        row++;
      }
    }

    function spawnPulse() {
      if (!cells.length) return;
      // bias pulses toward the upper-left where the hero sits
      var pick;
      for (var t = 0; t < 6; t++) {
        pick = cells[(Math.random() * cells.length) | 0];
        if (pick.cx < W * 0.6 && pick.cy < H * 0.7) break;
      }
      pulses.push({ cx: pick.cx, cy: pick.cy, t: 0, life: 2400 + Math.random() * 1800 });
    }

    var last = performance.now();
    var sinceSpawn = 0;

    function draw(now) {
      var dt = now - last; last = now;
      sinceSpawn += dt;
      ctx.clearRect(0, 0, W, H);

      // base grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = inkColor;
      for (var i = 0; i < cells.length; i++) {
        hexPath(cells[i].cx, cells[i].cy);
        ctx.stroke();
      }

      // pulses
      if (sinceSpawn > 900) { sinceSpawn = 0; if (pulses.length < 7) spawnPulse(); }
      for (var p = pulses.length - 1; p >= 0; p--) {
        var pu = pulses[p];
        pu.t += dt;
        var prog = pu.t / pu.life;
        if (prog >= 1) { pulses.splice(p, 1); continue; }
        // ease in-out alpha
        var alpha = Math.sin(prog * Math.PI);
        // ring of neighbours fades with distance
        drawCell(pu.cx, pu.cy, alpha);
      }

      raf = requestAnimationFrame(draw);
    }

    function drawCell(cx, cy, alpha) {
      hexPath(cx, cy);
      var base = liveColor;
      // fill
      ctx.fillStyle = withAlpha(base, alpha * 0.16);
      ctx.fill();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = withAlpha(base, alpha * 0.8);
      ctx.stroke();
    }

    function withAlpha(rgba, mult) {
      // rgba string -> scale its alpha by mult
      var m = rgba.match(/rgba?\(([^)]+)\)/);
      if (!m) return rgba;
      var parts = m[1].split(",").map(function (s) { return s.trim(); });
      var a = parts.length > 3 ? parseFloat(parts[3]) : 1;
      return "rgba(" + parts[0] + "," + parts[1] + "," + parts[2] + "," + (a * mult).toFixed(3) + ")";
    }

    function drawBase() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1; ctx.strokeStyle = inkColor;
      for (var i = 0; i < cells.length; i++) { hexPath(cells[i].cx, cells[i].cy); ctx.stroke(); }
    }

    var raf = null;
    function start() {
      readColors();
      build();
      drawBase();              // paint a static grid immediately
      if (reduce) return;      // and stop if reduced motion
      if (raf) cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { readColors(); build(); if (reduce) drawBase(); }, 150);
    });

    // expose so theme toggle can refresh colors
    window.__refreshHexColors = function () { readColors(); if (reduce) drawBase(); };

    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHexGrid);
  } else {
    initHexGrid();
  }
})();
