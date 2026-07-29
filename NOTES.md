# Teaching Notes

## User Preferences

- **Visual learner** — lead with diagrams/simulations, formulas second
- **TypeScript fluent** — code analogies work great (e.g., "a random variable is a function", "a distribution is a Map<outcome, probability>")
- **Notation: rusty, rebuild from basics** — NEVER assume a symbol is known. Introduce each symbol as: plain language → programming analogy → symbol. Examples:
  - Σ (sigma) → `array.reduce((a, b) => a + b)`
  - P(A|B) → probability computed on a `.filter(B)`-ed dataset
  - 𝔼[X] → weighted average / reduce over a Map<outcome, prob>
  - ∈ ("element of") → `set.has(x)`
  - Keep a running notation glossary in reference/
- **Formulas = trophies** — after a lesson earns a formula, add it to `reference/formula-trophies.html`
- **Daily cadence** — keep each lesson completable in ~10-15 min
- **Analogies of all kinds** welcome, not just CS

## Working Notes

- 2026-07-28: Workspace initialized. Started with Lesson 1 (probability as measure, sample spaces). Next candidates: conditional probability → Bayes, then expected value.
