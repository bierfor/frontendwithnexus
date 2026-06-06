import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function init() {
  // Cover image reveal
  const cover = document.querySelector('.article-cover-reveal');
  if (cover) {
    gsap.fromTo(
      cover,
      { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.1, opacity: 0 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1,
      }
    );
  }

  // Title and meta stagger
  const metaEls = document.querySelectorAll('.article-meta-animate');
  if (metaEls.length) {
    gsap.fromTo(
      metaEls,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    );
  }

  // Body paragraphs fade-in
  const body = document.querySelector('.article-md');
  if (body) {
    const children = body.querySelectorAll('p, h2, h3, blockquote, ul, ol, pre, img, figure');
    gsap.fromTo(
      children,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: body,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Recommendations stagger
  const recs = document.querySelectorAll('.rec-card-animate');
  if (recs.length) {
    gsap.fromTo(
      recs,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: recs[0].closest('section'),
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
}
