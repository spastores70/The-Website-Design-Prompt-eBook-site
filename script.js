/* =========================================
   NAV — sticky + scroll class
   ========================================= */
const nav = document.getElementById('nav');

const onScroll = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* =========================================
   FADE-IN ON SCROLL
   ========================================= */
const fadeTargets = document.querySelectorAll(
  '.glass-card, .persona-card, .prompt-category, .trust-item, .feature-box, .section-header, .pricing-card, .vscode-text, .editor-mockup, .split-text'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings by checking dataset index
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// add stagger delays to grid children
document.querySelectorAll('.cards-grid, .persona-grid, .prompts-showcase').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.dataset.delay = i * 80;
  });
});

fadeTargets.forEach(el => observer.observe(el));

/* =========================================
   CTA BUTTON PULSE on hover
   ========================================= */
const buyBtn = document.getElementById('buy-btn');
if (buyBtn) {
  buyBtn.addEventListener('mouseenter', () => {
    buyBtn.style.boxShadow = '0 0 60px rgba(45,212,191,0.5), 0 0 0 4px rgba(45,212,191,0.15)';
  });
  buyBtn.addEventListener('mouseleave', () => {
    buyBtn.style.boxShadow = '';
  });
}

/* =========================================
   SMOOTH SCROLL for anchor links
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =========================================
   BOOK TILT on mouse move (hero area)
   ========================================= */
const book = document.querySelector('.book');
const heroEl = document.querySelector('.hero');

if (book && heroEl) {
  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    const rotY = -15 + dx * 12;
    const rotX = 4 - dy * 8;

    book.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    book.style.animation = 'none';
  });

  heroEl.addEventListener('mouseleave', () => {
    book.style.transform = '';
    book.style.animation = '';
  });
}
