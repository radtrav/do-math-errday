# Data Analysis from First Principles — Resources

## Knowledge

- [Book: _Trustworthy Online Controlled Experiments_ — Kohavi, Tang & Xu (Cambridge, 2020)](https://experimentguide.com/)
  THE canonical A/B testing text, by the people who built experimentation at Microsoft/Google/LinkedIn. Use for: metric design, experiment trustworthiness, pitfalls. [Chapter 1 is free (PDF)](https://experimentguide.com/wp-content/uploads/TrustworthyOnlineControlledExperiments_PracticalGuideToABTesting_Chapter1.pdf).
- [Article: "How Not To Run an A/B Test" — Evan Miller](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
  The classic essay on peeking / repeated significance testing (5% intended → 26.1% actual false-positive rate). Use for: why you can't stop a test when it "looks significant". His other essays on evanmiller.org are similarly sharp.
- [Book: _The Art of Statistics: How to Learn from Data_ — David Spiegelhalter (Basic Books, 2019)](https://www.goodreads.com/book/show/43722897-the-art-of-statistics)
  The best single book on *reading data honestly* — inference, causation, traps, and communicating findings, built from real problems with almost no formulas. Use for: the general-statistical-literacy half of the mission that Kohavi assumes rather than teaches.
- [Interactive: Seeing Theory — Brown University](https://seeing-theory.brown.edu/)
  Visual, interactive walkthroughs of probability fundamentals (LLN, CLT, inference, regression). Use for: rebuilding rusty math intuition before formulas.
- [Site: Spurious Correlations — Tyler Vigen](https://tylervigen.com/spurious-correlations)
  Thousands of absurd real high-r correlations (e.g. margarine vs divorce rates). Use for: the visceral "correlation ≠ causation" example bank when explaining to stakeholders.

## Wisdom (Communities)

- [Cross Validated (stats.stackexchange.com)](https://stats.stackexchange.com/)
  The Stack Exchange for statistics — high-signal, expert-moderated. Use for: "am I applying this test correctly?" questions with real data (anonymized).
- Internal: colleagues on the analytics/data side at work
  Use for: pressure-testing an analysis before it goes to stakeholders — the real-world feedback loop this mission exists for.

## Gaps

- A first-principles ecommerce-metrics reference (industry definitions of AOV/AUR/UPT/demand vs the Adobe-specific ones) — verify against Adobe Analytics docs when a lesson needs exact semantics.
- A good permutation-testing explainer at the right level (candidate: Jake VanderPlas "Statistics for Hackers" talk — verify link before citing in a lesson).
- Heavy-tail / log-normal intuition resource pitched between pop-sci and measure theory.
