/* Interactive distribution widgets (canvas + slider). No dependencies.
   renderBell(root, {mode, init, frame})  — standard normal curve.
     mode "tails": shade beyond ±|z|; readout = share inside/beyond (the |z|≥2 rule).
     mode "above": shade above z; readout = P(next draw beats z) (the placebo engine).
   renderTailShape(root) — log-normal order values with a σ slider; watch the
     mean get dragged away from the fixed median as the tail grows. */

function erf(x) { // Abramowitz–Stegun 7.1.26, |err| < 1.5e-7
  const s = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
    - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
function normCdf(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }

function _colors() {
  const cs = getComputedStyle(document.documentElement);
  const get = (v, fb) => (cs.getPropertyValue(v) || fb).trim() || fb;
  return {
    ink: get("--ink", "#1e2933"), muted: get("--muted", "#5b6b78"),
    rule: get("--rule", "#d8e0e6"), accent: get("--accent", "#0f766e"),
    accentSoft: get("--accent-soft", "#e4f1ef"), trap: get("--trap", "#b3372f"),
    trapSoft: get("--trap-soft", "#f9ebe9"),
  };
}

function _scaffold(root, sliderCfg) {
  root.classList.add("bellwidget");
  const canvas = document.createElement("canvas");
  canvas.width = 900; canvas.height = 280;
  const bar = document.createElement("div");
  bar.className = "bellbar";
  const slider = document.createElement("input");
  Object.assign(slider, { type: "range", ...sliderCfg });
  const readout = document.createElement("div");
  readout.className = "bellread";
  bar.appendChild(slider); bar.appendChild(readout);
  root.appendChild(canvas); root.appendChild(bar);
  return { canvas, slider, readout, ctx: canvas.getContext("2d") };
}

function renderBell(root, opts = {}) {
  const mode = opts.mode || "tails";
  const { canvas, slider, readout, ctx } = _scaffold(root, {
    min: mode === "tails" ? 0 : -4, max: 4, step: 0.05,
    value: opts.init != null ? opts.init : (mode === "tails" ? 2 : -2),
  });
  const C = _colors();
  const W = canvas.width, H = canvas.height, L = 45, R = 15, T = 18, B = 34;
  const xp = z => L + (z + 4) / 8 * (W - L - R);
  const yp = d => T + (1 - d) * (H - T - B);
  const dens = z => Math.exp(-z * z / 2);

  function shadeRegion(z0, z1) {
    ctx.beginPath();
    ctx.moveTo(xp(z0), yp(0));
    for (let z = z0; z <= z1 + 1e-9; z += 0.02) ctx.lineTo(xp(z), yp(dens(z)));
    ctx.lineTo(xp(z1), yp(0));
    ctx.closePath();
    ctx.fill();
  }

  function draw() {
    const zv = parseFloat(slider.value);
    ctx.clearRect(0, 0, W, H);
    // gridlines + labels at integer z
    ctx.strokeStyle = C.rule; ctx.fillStyle = C.muted;
    ctx.font = "12px ui-monospace, Menlo, monospace"; ctx.textAlign = "center";
    for (let g = -3; g <= 3; g++) {
      ctx.beginPath(); ctx.moveTo(xp(g), yp(0)); ctx.lineTo(xp(g), yp(1.02)); ctx.stroke();
      ctx.fillText(g === 0 ? "μ" : (g > 0 ? "+" + g + "σ" : g + "σ"), xp(g), H - 12);
    }
    // shaded region(s)
    if (mode === "tails") {
      const a = Math.abs(zv);
      ctx.fillStyle = C.trapSoft; shadeRegion(-4, -a); shadeRegion(a, 4);
      ctx.fillStyle = C.accentSoft; shadeRegion(-a, a);
    } else {
      ctx.fillStyle = C.accentSoft; shadeRegion(zv, 4);
    }
    // the curve
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath();
    for (let z = -4; z <= 4; z += 0.02) {
      const X = xp(z), Y = yp(dens(z));
      z === -4 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
    }
    ctx.stroke();
    // baseline
    ctx.strokeStyle = C.muted; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L, yp(0)); ctx.lineTo(W - R, yp(0)); ctx.stroke();
    // marker line(s)
    ctx.strokeStyle = mode === "tails" ? C.trap : C.accent; ctx.lineWidth = 2;
    const marks = mode === "tails" ? [-Math.abs(zv), Math.abs(zv)] : [zv];
    for (const m of marks) {
      ctx.beginPath(); ctx.moveTo(xp(m), yp(0)); ctx.lineTo(xp(m), yp(1.02)); ctx.stroke();
    }
    // readout
    if (mode === "tails") {
      const a = Math.abs(zv);
      const inside = 2 * normCdf(a) - 1;
      readout.innerHTML =
        `|z| ≤ ${a.toFixed(2)} : <b>${(inside * 100).toFixed(1)}%</b> of identical-arm gaps land inside · ` +
        `<span class="bad">${((1 - inside) * 100).toFixed(1)}% beyond (a fluke this rare)</span>`;
    } else {
      const beat = 1 - normCdf(zv);
      readout.innerHTML =
        `today sits at z = ${zv.toFixed(2)} · P(a normal tomorrow beats it) = <b>${(beat * 100).toFixed(1)}%</b>`;
    }
  }
  slider.addEventListener("input", draw);
  draw();
}

function renderTailShape(root) {
  const { canvas, slider, readout, ctx } = _scaffold(root, { min: 0.05, max: 1.2, step: 0.05, value: 0.8 });
  const C = _colors();
  const W = canvas.width, H = canvas.height, L = 45, R = 15, T = 18, B = 34;
  const MED = 85, MU = Math.log(MED), XMAX = 450;
  const xp = x => L + x / XMAX * (W - L - R);
  const yp = d => T + (1 - d) * (H - T - B);

  function draw() {
    const s = parseFloat(slider.value);
    const f = x => x <= 0 ? 0 : Math.exp(-((Math.log(x) - MU) ** 2) / (2 * s * s)) / (x * s);
    let dmax = 0;
    for (let x = 1; x <= XMAX; x += 1) dmax = Math.max(dmax, f(x));
    ctx.clearRect(0, 0, W, H);
    // x gridlines every $100
    ctx.strokeStyle = C.rule; ctx.fillStyle = C.muted;
    ctx.font = "12px ui-monospace, Menlo, monospace"; ctx.textAlign = "center";
    for (let g = 0; g <= 400; g += 100) {
      ctx.beginPath(); ctx.moveTo(xp(g), yp(0)); ctx.lineTo(xp(g), yp(1.02)); ctx.stroke();
      ctx.fillText("$" + g, xp(g), H - 12);
    }
    // density fill + curve
    ctx.fillStyle = C.accentSoft; ctx.beginPath(); ctx.moveTo(xp(1), yp(0));
    for (let x = 1; x <= XMAX; x += 1) ctx.lineTo(xp(x), yp(f(x) / dmax));
    ctx.lineTo(xp(XMAX), yp(0)); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 1; x <= XMAX; x += 1) {
      const X = xp(x), Y = yp(f(x) / dmax);
      x === 1 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
    }
    ctx.stroke();
    // markers: median (fixed) and mean (dragged right by the tail)
    const mean = MED * Math.exp(s * s / 2);
    const p99 = Math.exp(MU + 2.3263 * s);
    ctx.lineWidth = 2;
    ctx.strokeStyle = C.accent; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(xp(MED), yp(0)); ctx.lineTo(xp(MED), yp(1.02)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = C.trap;
    ctx.beginPath(); ctx.moveTo(xp(mean), yp(0)); ctx.lineTo(xp(mean), yp(1.02)); ctx.stroke();
    ctx.textAlign = "left";
    ctx.fillStyle = C.accent; ctx.fillText("median", xp(MED) + 4, T + 12);
    ctx.fillStyle = C.trap; ctx.fillText("mean", xp(mean) + 4, T + 26);
    readout.innerHTML =
      `tail width σ = ${s.toFixed(2)} · median <b>$${MED}</b> (pinned) · ` +
      `mean <b>$${mean.toFixed(0)}</b> · top 1% of orders ≥ <span class="bad">$${p99.toFixed(0)}</span>`;
  }
  slider.addEventListener("input", draw);
  draw();
}
