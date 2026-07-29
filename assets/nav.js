/* do-math-errday — shared site header + sidebar navigation.
   Usage: <header class="site-header">...</header>
          <div class="nav-backdrop" id="navBackdrop"></div>
          <nav class="site-sidebar" id="siteSidebar"></nav>
          <main class="page-content">...</main>
          <script src="[../]assets/nav.js"></script>
   The sidebar's link list lives here — add a lesson once, it shows up everywhere. */

(function () {
  const scriptSrc = document.currentScript.getAttribute('src') || '';
  const PREFIX = scriptSrc.replace(/assets\/nav\.js$/, '');

  const NAV = [
    { file: 'index.html', label: '🏠 Home', top: true },
    { group: 'Lessons', items: [
      { file: 'lessons/0001-the-type-system-of-uncertainty.html', label: '1 · The Type System of Uncertainty' },
      { file: 'lessons/0002-the-filter-of-belief.html', label: '2 · The Filter of Belief' },
    ] },
    { group: 'Reference', items: [
      { file: 'reference/formula-trophies.html', label: '🏆 Formula Trophies' },
      { file: 'reference/notation-glossary.html', label: 'Notation Glossary' },
    ] },
    { group: 'Workspace', items: [
      { file: 'MISSION.md', label: 'Mission' },
      { file: 'RESOURCES.md', label: 'Resources' },
      { file: 'NOTES.md', label: 'Notes' },
    ] },
  ];

  function currentFile() {
    const path = location.pathname;
    if (path.endsWith('/')) return 'index.html';
    const segs = path.split('/').filter(Boolean);
    const last = segs[segs.length - 1];
    const parent = segs[segs.length - 2];
    if (parent === 'lessons' || parent === 'reference') return `${parent}/${last}`;
    return last || 'index.html';
  }
  const active = currentFile();

  function link(file, label, extraClass) {
    const a = document.createElement('a');
    a.className = 'side-link' + (file === active ? ' active' : '') + (extraClass ? ' ' + extraClass : '');
    a.href = PREFIX + file;
    a.textContent = label;
    return a;
  }

  const sidebar = document.getElementById('siteSidebar');
  if (sidebar) {
    const inner = document.createElement('div');
    inner.className = 'sidebar-inner';
    NAV.forEach((entry) => {
      if (entry.top) {
        inner.appendChild(link(entry.file, entry.label, 'home'));
        return;
      }
      const groupLabel = document.createElement('div');
      groupLabel.className = 'side-group-label';
      groupLabel.textContent = entry.group;
      inner.appendChild(groupLabel);
      entry.items.forEach((item) => inner.appendChild(link(item.file, item.label)));
    });
    sidebar.appendChild(inner);

    const toggle = document.getElementById('navToggle');
    const backdrop = document.getElementById('navBackdrop');
    function closeNav() {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('visible');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    function openNav() {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('visible');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
    if (toggle) toggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeNav() : openNav();
    });
    if (backdrop) backdrop.addEventListener('click', closeNav);
    sidebar.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeNav();
    });
  }
})();
