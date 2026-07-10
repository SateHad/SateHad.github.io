gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initCustomCursor();
  initMagnetic();
  initHeroIntro();
  initScrambleText();
  initScrollReveals();
  initGpaBar();
  initExpCardTilt();
});

/* =========================================================
   CUSTOM CURSOR
========================================================= */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
  const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
  const setRingX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
  const setRingY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    setDotX(e.clientX);
    setDotY(e.clientY);
    setRingX(e.clientX);
    setRingY(e.clientY);
  });

  const hoverTargets = 'a, button, [data-magnetic], [data-magnetic-card], .project-card, .exp-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('is-hover');
  });

  document.addEventListener('mousedown', () => gsap.to(dot, { scale: 0.5, duration: 0.2 }));
  document.addEventListener('mouseup', () => gsap.to(dot, { scale: 1, duration: 0.2 }));
}

/* =========================================================
   MAGNETIC HOVER (buttons, nav links, contact links)
========================================================= */
function initMagnetic() {
  const magnets = document.querySelectorAll('[data-magnetic]');

  magnets.forEach((el) => {
    const strength = 0.35;
    const setX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const setY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(relX * strength);
      setY(relY * strength);
    });

    el.addEventListener('mouseleave', () => {
      setX(0);
      setY(0);
    });
  });

  // Subtler magnetic pull for project cards (whole-card tilt-toward-cursor)
  const cards = document.querySelectorAll('[data-magnetic-card]');
  cards.forEach((card) => {
    const setX = gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power3.out' });
    const setY = gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3.out' });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(relX * 0.06);
      setY(relY * 0.06);
    });

    card.addEventListener('mouseleave', () => {
      setX(0);
      setY(0);
    });
  });
}

/* =========================================================
   HERO INTRO TIMELINE
========================================================= */
function initHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.reveal-line', {
      y: '0%',
      duration: 1,
      ease: 'power3.out',
    })
    .to('.hero-word', {
      y: '0%',
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
    }, '-=0.6')
    .to('.hero-fade', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.5')
    .to('.scroll-cue', {
      opacity: 1,
      duration: 0.6,
    }, '-=0.3');

  gsap.set('.scroll-cue', { opacity: 0 });
}

/* =========================================================
   SCRAMBLE TEXT EFFECT (cyber-themed decode-in)
========================================================= */
function initScrambleText() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01#$%&';

  document.querySelectorAll('[data-scramble]').forEach((el) => {
    const finalText = el.textContent.trim();
    el.textContent = '';

    const chunks = finalText.split('');
    const obj = { progress: 0 };

    // Delay scramble start slightly after hero timeline kicks in
    gsap.delayedCall(1.0, () => {
      gsap.to(obj, {
        progress: 1,
        duration: 1.4,
        ease: 'power1.inOut',
        onUpdate: () => {
          const revealCount = Math.floor(obj.progress * chunks.length);
          let output = '';
          for (let i = 0; i < chunks.length; i++) {
            if (i < revealCount) {
              output += chunks[i];
            } else if (chunks[i] === ' ') {
              output += ' ';
            } else {
              output += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          el.textContent = output;
        },
        onComplete: () => {
          el.textContent = finalText;
        },
      });
    });
  });
}

/* =========================================================
   SCROLL-TRIGGERED REVEALS
========================================================= */
function initScrollReveals() {
  // Generic fade-up reveal for section headers, cards, etc.
  const revealEls = gsap.utils.toArray('.reveal-up');

  revealEls.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Stagger the two experience cards slightly for a cascading feel
  gsap.utils.toArray('.exp-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Project cards cascade
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Section headers: subtle parallax on the small mono label
  gsap.utils.toArray('section').forEach((section) => {
    const label = section.querySelector('p.font-mono.text-accent');
    if (!label) return;
    gsap.to(label, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });

  // Big footer heading parallax
  const footerHeading = document.querySelector('#contact h2');
  if (footerHeading) {
    gsap.fromTo(footerHeading,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerHeading,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}

/* =========================================================
   GPA PROGRESS BAR
========================================================= */
function initGpaBar() {
  const bar = document.querySelector('.gpa-bar-fill');
  if (!bar) return;
  const target = parseFloat(bar.dataset.gpa) || 0;
  const maxScale = 100; // percentage scale reference

  ScrollTrigger.create({
    trigger: bar,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(bar, {
        width: `${(target / maxScale) * 100}%`,
        duration: 1.6,
        ease: 'power3.out',
      });
    },
  });
}

/* =========================================================
   SUBTLE 3D TILT ON EXPERIENCE CARDS
========================================================= */
function initExpCardTilt() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.exp-card').forEach((card) => {
    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 4);
      rotateX(-py * 4);
    });

    card.addEventListener('mouseleave', () => {
      rotateX(0);
      rotateY(0);
    });
  });
}