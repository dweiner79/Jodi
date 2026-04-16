/* ============================================
   Life in Color Studios — site scripts
   ============================================ */

// ---- Mobile navigation toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Sticky header shadow on scroll ----
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(61,43,31,0.10)'
    : 'none';
}, { passive: true });

// ---- FAQ accordion ----
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });

    // Toggle this one
    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.classList.toggle('open', !isOpen);
  });
});

// ---- Scroll-reveal (lightweight, no library) ----
const revealEls = document.querySelectorAll(
  '.benefit-card, .service-card, .testimonial, .step, .faq-item'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
