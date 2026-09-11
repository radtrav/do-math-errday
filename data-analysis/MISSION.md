# Mission: Data Analysis from First Principles (math, ecommerce metrics, and the traps)

## Why
Ty analyzes A/B-test and performance data for ecommerce clients (e.g. the Talbots ATT-212 test) and regularly has to defend or refute revenue claims made by non-technical stakeholders. The goal is to reason about this data from fundamentals — not recipes — so the analysis is *right*, the insights are *actionable*, and the explanation lands with people who don't know the math.

## Success looks like
- Given a metric claim ("RPV dipped because X"), can decompose it, name the causal path, and verify or kill it with the correct statistical tool — unaided.
- Can rebuild the math from scratch when challenged: why √n, why medians, why permutation tests work, what a p-value actually is.
- Can spot the classic traps (whale noise, streaks, post-hoc windows, Simpson's, peeking) in the wild before acting on them.
- Can explain any of the above to a non-technical stakeholder in plain language with a concrete example, in under two minutes.

## Constraints
- Lead with real math notation (it's concise, and fluency in reading it is part of the goal); use TypeScript as the decoder/analogy for each piece of notation, not as the primary medium.
- Engineering degree: had the technical depth once, math is rusty. Formulas always built up from basics — never assumed.
- Lessons should use real work data (Talbots/Adobe/beacon numbers) as worked examples where possible.

## Out of scope
- Bayesian methods beyond intuition-level (revisit after the frequentist core is solid).
- ML/modeling (regression, forecasting) — this mission is about *reading* data honestly, not fitting models.
- Statistics software/R/Python tooling — TS simulations and mental math are the media here.
