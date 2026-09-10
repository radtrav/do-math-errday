/* Course-wide navigation strip. Include on any page (after manifest.js):
     <script src="../assets/manifest.js"></script>
     <script src="../assets/nav.js"></script>
   Inserts a nav bar after the .eyebrow element (or at top of .page as a
   fallback). Current page is highlighted and unlinked. Hidden in print. */

(function () {
  const path = location.pathname;
  const inSubdir = /\/(lessons|reference)\/[^/]+$/.test(path);
  const base = inSubdir ? "../" : "";
  const here = path.split("/").pop();

  const item = (href, label, isHere, title) => {
    if (isHere) return `<span class="here" title="${title || ""}">${label}</span>`;
    return `<a href="${href}" title="${title || ""}">${label}</a>`;
  };

  const lessons = COURSE.lessons.map(l =>
    item(`${base}lessons/${l.file}`, l.n, here === l.file, l.title)
  ).join(" ");

  const refs = COURSE.refs.map(r =>
    item(`${base}reference/${r.file}`, r.title, here === r.file)
  ).join(" · ");

  const nav = document.createElement("nav");
  nav.className = "course-nav";
  nav.innerHTML =
    `<span class="grp">${item(base + "index.html", "course", here === "index.html")}</span>` +
    `<span class="grp">lessons: ${lessons}</span>` +
    `<span class="grp">reference: ${refs}</span>`;

  const eyebrow = document.querySelector(".eyebrow");
  if (eyebrow) eyebrow.insertAdjacentElement("afterend", nav);
  else {
    const page = document.querySelector(".page") || document.body;
    page.insertAdjacentElement("afterbegin", nav);
  }
})();
