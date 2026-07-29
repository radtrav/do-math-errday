---
name: sample-space-cartesian-product
description: Collapsing the sample space is the #1 early mistake; independent experiments multiply, not pool
metadata:
  type: insight
  lesson: 0001
  date: 2026-07-29
---

## Insight: Ω multiplies when experiments combine

**The mistake:** Given two coin flips, the instinct is Ω = {H, T} — the per-coin outcomes.
This collapses two distinguishable experiments into one, breaking the classical formula.

**The correction:** Each experiment contributes its own axis. Two independent experiments
with sample spaces Ω₁ and Ω₂ produce a combined sample space that is their Cartesian product:

```
Ω = Ω₁ × Ω₂
|Ω| = |Ω₁| × |Ω₂|
```

For two coins: 2 × 2 = 4 outcomes: {HH, HT, TH, TT} — not 2.

**Why it matters for P:** The classical formula P(A) = |A|/|Ω| only works when all
outcomes are equally likely. Collapsing {HT, TH} into one "mixed" outcome makes it
appear with weight 1/3 instead of 2/4 — breaking the equal-likelihood assumption silently.

## TypeScript analogy that landed

```typescript
type Coin = 'H' | 'T'

// WRONG mental model (collapsed):
// Ω = Coin  →  only 2 outcomes, loses coin identity

// CORRECT (Cartesian product via template literal):
type TwoFlips = `${Coin}${Coin}`
// expands to: 'HH' | 'HT' | 'TH' | 'TT'  →  4 outcomes
```

TypeScript template literal types *do the multiplication automatically* — exactly
what probability requires. `${A}${B}` over two unions is the Cartesian product.

**Scaling rule:** Two dice → `type TwoDice = \`${Die}${Die}\`` → 6 × 6 = 36 outcomes.

## Complement shortcut (surfaced during Q2 explanation)

"At least one" events are often easier counted via their complement:

```
P(at least one H) = 1 − P(no heads) = 1 − 1/4 = 3/4
```

General pattern: P(at least one X) = 1 − P(zero X). Use this whenever
the "none" case has fewer outcomes than the "some" case.

## Rule of thumb

> When building Ω for multiple experiments: **label and combine**, never pool.
> If in doubt, add subscripts: coin₁, coin₂. Just like naming your TypeScript fields.
