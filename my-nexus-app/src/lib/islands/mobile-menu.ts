export default function init(_root: HTMLElement) {
  const toggle = document.querySelector<HTMLButtonElement>('#mobile-menu-toggle');
  const panel = document.querySelector<HTMLDivElement>('#mobile-menu-panel');
  const overlay = document.querySelector<HTMLDivElement>('#mobile-menu-overlay');
  const closeBtn = document.querySelector<HTMLButtonElement>('#mobile-menu-close');
  const links = document.querySelectorAll<HTMLAnchorElement>('.mobile-menu-link');

  if (!toggle || !panel || !overlay) return;

  const open = () => {
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
    overlay.classList.remove('pointer-events-none', 'opacity-0');
    overlay.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('pointer-events-none', 'opacity-0');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', close);
  links.forEach((link) => link.addEventListener('click', close));

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('translate-x-0')) {
      close();
    }
  });
}
