/* Single source of truth for course navigation.
   New lesson or reference doc → add one entry here; every page's nav updates.
   (nav.js consumes this.) */

const COURSE = {
  lessons: [
    { n: "0001", file: "0001-the-metric-ledger.html", title: "The Metric Ledger" },
    { n: "0002", file: "0002-counting-noise.html", title: "Counting Noise" },
    { n: "0003", file: "0003-heavy-tails-and-whales.html", title: "Heavy Tails & Whales" },
    { n: "0004", file: "0004-reading-while-running.html", title: "Reading While Running" },
    { n: "0005", file: "0005-lifts-ratios-logs.html", title: "Lifts, Ratios & Logs" },
  ],
  refs: [
    { file: "formula-sheet.html", title: "formula sheet" },
    { file: "metric-identities.html", title: "identity tree" },
    { file: "notation-decoder.html", title: "notation decoder" },
    { file: "glossary.html", title: "glossary" },
  ],
};
