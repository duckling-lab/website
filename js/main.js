// Duckling Lab — Shared JS

// ── Load nav ──────────────────────────────────────────────────────────────────
function loadNav(activePage) {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;
  fetch('nav.html')
    .then(r => r.text())
    .then(html => {
      placeholder.innerHTML = html;

      // Set active link
      if (activePage) {
        document.querySelectorAll('[data-page]').forEach(a => {
          if (a.dataset.page === activePage) a.classList.add('active');
        });
      }

      // Wire hamburger
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
      }
    });
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });

function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', observeReveals);

// ── Back to top ───────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});
