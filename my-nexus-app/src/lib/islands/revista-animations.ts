import { gsap } from 'https://esm.sh/gsap@3.15.0';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.15.0/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function init() {
  // Header reveal
  const header = document.querySelector('.revista-header-animate');
  if (header) {
    gsap.fromTo(
      header.querySelectorAll('.revista-header-child'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    );
  }

  // Sidebar sticky reveal
  const sidebar = document.querySelector('.revista-sidebar');
  if (sidebar) {
    gsap.fromTo(sidebar, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.4 });
  }

  // Initial cards stagger
  const cards = document.querySelectorAll('.revista-card-animate');
  if (cards.length) {
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }

  // Observe dynamically added cards from infinite scroll
  const container = document.getElementById('articles-container');
  if (container) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.classList.contains('revista-card-animate')) {
            gsap.fromTo(node, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
          }
        });
      });
    });
    observer.observe(container, { childList: true });
  }
}
