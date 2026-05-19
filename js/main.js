// Duckling Lab — Shared JS

// ── Load nav ──────────────────────────────────────────────────────────────────
function loadNav(activePage) {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;
  fetch('/nav.html')
    .then(r => r.text())
    .then(html => {
      placeholder.innerHTML = html;

      if (activePage) {
        document.querySelectorAll('[data-page]').forEach(a => {
          if (a.dataset.page === activePage) a.classList.add('active');
        });
      }

      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
      }
    });
}


// ── Back to top ───────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});

// ── Footer: last-updated timestamp from GitHub API ────────────────────────────
// Fetches the most recent commit to duckling-lab/website (public repo, no auth needed).
// Updates #footer-last-updated on every page automatically after each admin push.
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('footer-last-updated');
  if (!el) return;

  fetch('https://api.github.com/repos/duckling-lab/website/commits?per_page=1')
    .then(r => {
      if (!r.ok) throw new Error('API error');
      return r.json();
    })
    .then(data => {
      if (!data || !data[0]) return;
      const raw = data[0].commit.committer.date;
      const d = new Date(raw);
      const str = d.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
      el.textContent = 'Last updated ' + str;
    })
    .catch(() => {
      // Silently fail — footer looks fine without the timestamp
    });
});
