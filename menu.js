/* Mobile hamburger menu — shared by index.html, projects.html, neurolink.html.
   Markup lives in each page's header (#menu-btn + #mobile-menu); this only toggles it. */
(function () {
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  var iconOpen = document.getElementById('menu-icon-open');
  var iconClose = document.getElementById('menu-icon-close');

  function setOpen(open) {
    menu.classList.toggle('hidden', !open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setOpen(menu.classList.contains('hidden'));
  });

  // Close after picking a page, so it doesn't cover the section you tapped
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // Close on outside tap, Esc, or when the screen grows to desktop width
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
  });
})();
