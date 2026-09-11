/* Reusable simulation helpers for lessons. No dependencies. */

/* One binomial draw: n independent trials, each succeeding with probability p. */
function binomialDraw(n, p) {
  let k = 0;
  for (let i = 0; i < n; i++) if (Math.random() < p) k++;
  return k;
}

/* One standard-normal draw (Box–Muller). */
function normalDraw() {
  const u = 1 - Math.random(), v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* One log-normal draw: exp of a normal. median = exp(mu). Heavy right tail. */
function logNormalDraw(mu, sigma) {
  return Math.exp(mu + sigma * normalDraw());
}

function mean(xs) {
  return xs.reduce((a, x) => a + x, 0) / xs.length;
}

function sd(xs) {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
}

/* Longest run of consecutive same-sign values (ignores zeros). */
function longestStreak(xs) {
  let best = 0, run = 0, sign = 0;
  for (const x of xs) {
    const s = Math.sign(x);
    if (s !== 0 && s === sign) run++;
    else { sign = s; run = s === 0 ? 0 : 1; }
    if (run > best) best = run;
  }
  return best;
}

function fmtPct(x, digits = 0) {
  const v = (x * 100).toFixed(digits);
  return (x >= 0 ? "+" : "") + v + "%";
}
