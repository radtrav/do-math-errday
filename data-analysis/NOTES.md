# Working Notes

## User preferences
- **Every expression gets a spoken form**: the notation decoder's "Say it out loud" column gives the full verbal reading of each expression (formal + casual), and the pronunciation-atoms table covers reading novel notation in the wild. When introducing new notation in lessons, include how to say it.
- **Math notation is the primary medium** — it's more concise and the user wants to become fluent in reading it. TypeScript appears as the *decoder/analogy* for notation (Σ ↔ reduce, E[X] ↔ mean), not as the main vehicle. Every new symbol links to its row in `reference/notation-decoder.html` on first use.
- **Write every equation twice**: the symbolic form AND a semantic twin with full names spelled out (`RPV ≡ CVR · AOV` + `Revenue Per Visit ≡ ConVersion Rate × Average Order Value`). The semantic line uses the `.dim` style in formula blocks.
- **Acronyms show their letter-to-word mapping**: bold the letters inside the expansion (**C**on**V**ersion **R**ate, **A**verage **O**rder **V**alue) everywhere an expansion appears — definitions, semantic twins, glossary entries.
- Formulas must still be *built up*, never dropped in. Engineering degree, rusty math — the muscle memory exists but needs warming, not re-teaching from zero.
- Loves visual structure: diagrams, tables, trees. Uses emojis in chat, but lessons should stay clean/Tufte.
- Anchor every abstract concept in the real Talbots/Adobe/beacon data where possible — that grounding is what made the original conversation click.
- Dual outcome per topic: (1) can *do* the analysis, (2) can *explain it to a non-technical person* — every lesson should end with a "how you'd say this to a stakeholder" beat.
- Keep lessons short (completable in ~10 min). One win each.
- **Layout: wide pages (72em), prose capped (~48em)** — big screens; tables, formulas, simulators, and card grids span full width, paragraphs keep a readable measure.
- **Diagrams must be geometrically honest**: Ty reads diagrams rigorously and catches conflations (caught the (1+a)(1+b) grid mixing negative "areas" into one frame). Prefer step-by-step/temporal sequences (before → move 1 → move 2) over algebraic composites; never draw a negative quantity as a region.
- **Visual learner**: every lesson must carry at least one visual artifact — an interactive mini-app (simulator, live calculator) or a diagram — that embodies the core concept. Prose alone doesn't stick. (0001 live ledger, 0002 identical-arms sim + z-tails bell slider, 0003 whale sim + σ tail-shape slider, 0004 placebo clicker + Φ bell slider.)
- **Distributions are always shown, never just named**: any mention of the bell curve / a distribution shape gets an interactive graph (`assets/bellcurve.js`: `renderBell` for normal with z-slider in "tails"/"above" modes, `renderTailShape` for log-normal with σ slider), not ASCII or prose alone.
- `reference/formula-sheet.html` summarizes every important formula with intuition + backlinks; add each new lesson's key formulas to it on authoring.
- **Lifts are arm-vs-arm at one moment, never us-vs-us-yesterday.** Ty's work compares test RPV against control's, so analogies for lift math must be cross-sectional: currency pairs / cross rates (flip the quote → reciprocal; chain the legs → middle unit cancels), not stock charts ("loses 50%, needs +100% to get home" implies recovery over time — wrong mental model even though the arithmetic is identical). Diagram "steps" are construction moves from control's rectangle to test's, and should say so. (Flagged 2026-09-10.)

## Curriculum arc (planned, revise by ZPD as records accumulate)
1. ✅ **The metric ledger** — 4 counters, multiplicative identities, decomposition as the first move (lesson 0001)
2. ✅ **Counting noise** — LLN, √n, binomial sd of a rate; simulate in TS; why 10 orders can't tell you anything (lesson 0002)
3. ✅ **Heavy tails & whales** — mean vs median, log-normal order values, pooling (sum/sum) vs averaging ratios (lesson 0003)
4. ✅ **Reading while running** — tampering (Deming), regression to the mean, peeking (Evan Miller), intervention logs, guardrails vs decisions; pulled forward per LR-0002 (lesson 0004)
5. ✅ **Lifts, ratios, and logs** — why lift is a ratio, why logs turn × into +, symmetric percentages (lesson 0005)
5. **Correlation** — Pearson vs Spearman from scratch, confounders, the sign-flip trap
6. **The permutation test** — inference with zero formulas, TS implementation, streak probabilities
7. **p-values & confidence intervals** — what they are and aren't; n=4 vs n=28; power
8. **A/B mechanics** — randomization as identity-forging, arms, why lift cancels shared shocks
9. **Funnel causality** — mechanism checks, upstream gates, nesting, "where could the cause enter?"
10. **Variance decomposition** — var(X+Y) = varX + varY + 2cov, applied to log RPV
11. **Diff-in-diff & natural experiments** — parallel trends, the control as noise-floor gauge
12. **The trap catalog** — sharpshooter, peeking (Evan Miller), Simpson's paradox, multiple comparisons, survivorship
13. **Explaining to humans** — translation patterns: whale orders, always-red alarms, breathing metrics

## Lesson authoring checklist
- Every page includes `assets/manifest.js` + `assets/nav.js` before its other scripts — this injects the course-wide nav strip (all lessons + refs, current page highlighted).
- New lesson or reference doc = add one entry to `assets/manifest.js` and every existing page's nav picks it up automatically. Never hand-write cross-lesson links outside body prose.

## Session log
- 2026-09-10: reframed lift math from time-series to arm-vs-arm. Lesson 0001 §02 rectangle now builds test's rectangle from control's (labels: control → test's CVR ×1.10 → test's AOV ×0.90), the stock analogy is replaced by the currency cross-rate chain (($ per €)·(¥ per $) ⟷ O/V·D/O), quiz Q1 reworded to "reads −20% against control". Lesson 0005 Sin 1 and the formula-sheet undo card describe undo(ℓ) as "the same gap quoted from the other arm" with the currency-pair flip. New preference recorded above.
- 2026-08-28 (later): lesson 0005 (Lifts, Ratios & Logs) authored — three sins of percentages, undo(ℓ)=1/(1+ℓ)−1, log-additivity of the ledger, the "mirror" two-axis widget (percent vs log space), never-average-ratios trap with the +41%-daily-mean vs +11.7%-cume real example. Formula sheet +4 cards, decoder +e^x row, glossary +pp/log points/geometric mean. Quizzes 0002–0005 still unobserved — before 0006 (correlation), probe retention: SE computation, whale-backout, undo rule.
- 2026-08-27: workspace created mid-Talbots-RPV analysis. Lesson 0001 authored. Baseline LR-0001 written from live work session.
- 2026-08-28: lessons 0003 (Heavy Tails & Whales — whale-backout arithmetic, breakdown points, capping, log-normal AOV simulator) and 0004 (Reading While Running — Φ(2) placebo engine + placebo simulator, peeking 26%, two-lane protocol linking the ATT-212 artifact) authored. sim.js gained normalDraw/logNormalDraw; decoder gained Φ; glossary gained log-normal/breakdown/capping + Process traps section. Quiz results still unobserved for 0002–0004 — check retention (especially 0002 Q4 SE computation and 0003 whale-backout) before authoring 0005.
- 2026-08-27 (later): lesson 0002 (Counting Noise) authored — SE(p̂) derived in 4 lines, √-count shortcut, identical-arms simulator (new asset sim.js), Aug 24 z≈1.4 check. Decoder gained p̂/SE/z rows; glossary gained SE/binomial/√-count. Quiz results not yet observed — watch for whether the SE computation (Q4) lands before advancing past lesson 3.
