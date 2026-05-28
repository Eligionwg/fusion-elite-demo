/* =====================================================
   FUSION ELITE MARTIAL ARTS — SHARED JAVASCRIPT
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll behavior ────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ── Hamburger / mobile menu ───────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Active nav link (detect current page) ─────────
  (function setActiveNav() {
    const path = window.location.pathname;
    const raw = path.split('/').pop();
    const filename = (raw === '' || raw === null) ? 'index.html' : raw;
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === filename) link.classList.add('active');
    });
  })();

  // ── FAQ accordion ─────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    if (item.classList.contains('open')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = '0';
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ── Schedule filter pills (schedule.html only) ────
  const filterPills = document.querySelectorAll('.filter-pill');
  const classCells  = document.querySelectorAll('.schedule-table .class-cell');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.filter;
        classCells.forEach(cell => {
          if (filter === 'all') {
            cell.classList.remove('highlighted', 'dimmed');
          } else {
            const programs = (cell.dataset.program || '').split(' ');
            if (programs.includes(filter)) {
              cell.classList.add('highlighted');
              cell.classList.remove('dimmed');
            } else {
              cell.classList.add('dimmed');
              cell.classList.remove('highlighted');
            }
          }
        });
      });
    });
  }

  // ── Contact form ──────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      if (submitBtn)   submitBtn.style.display   = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
      setTimeout(() => {
        contactForm.reset();
        if (formSuccess) formSuccess.style.display = 'none';
        if (submitBtn)   submitBtn.style.display   = 'block';
      }, 4000);
    });
  }

  // ── Scroll animations (IntersectionObserver) ──────
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    animatedEls.forEach(el => observer.observe(el));
  }

  // ── Stagger card animations ───────────────────────
  document.querySelectorAll(
    '.programs-grid .program-card, .benefits-grid .benefit-card, .testimonials-grid .testimonial-card, .values-grid .value-card, .team-grid .team-card'
  ).forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });

});
