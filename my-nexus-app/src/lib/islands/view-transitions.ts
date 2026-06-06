export default function init() {
  const overlay = document.getElementById('vt-overlay');
  if (!overlay) return;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="/"]') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();

    // Fade out
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');

    setTimeout(() => {
      window.location.href = href;
    }, 250);
  });

  // Fade in on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
    });
  } else {
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
  }
}
