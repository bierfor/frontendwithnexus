import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function init() {
  // Hero entrance stagger
  const heroEls = document.querySelectorAll('.hero-animate');
  if (heroEls.length) {
    gsap.fromTo(
      heroEls,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }

  // Ticker fade in
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    gsap.fromTo(ticker, { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.6, ease: 'power2.out' });
  }

  // Hero image parallax
  const heroImg = document.querySelector('.hero-image-parallax');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImg.closest('section'),
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Grid cards stagger reveal
  const grids = document.querySelectorAll('.animate-grid');
  grids.forEach((grid) => {
    const cards = grid.querySelectorAll('.animate-card');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });

  // Section headings reveal
  const headings = document.querySelectorAll('.section-reveal');
  headings.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Relampago cards reveal
  const relampagoCards = document.querySelectorAll('.relampago-card');
  if (relampagoCards.length) {
    gsap.fromTo(
      relampagoCards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: relampagoCards[0].closest('.relampago-grid') || relampagoCards[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
}
