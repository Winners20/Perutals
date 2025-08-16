// Mobile menu toggle
const toggleBtn = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close menu after clicking a link
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Smooth scroll handled by CSS (scroll-behavior). Offset for sticky header is not necessary in a pure CSS setup

// Back to top visibility
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (backToTop) {
    backToTop.classList.toggle('show', y > 500);
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Section reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Contact form validation
const form = document.getElementById('contact-form');
const submitMsg = document.getElementById('submit-message');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Reset errors
    [nameError, emailError, messageError].forEach((el) => el && (el.hidden = true));

    let hasError = false;
    if (!name.value.trim()) { nameError.hidden = false; hasError = true; }
    if (!email.value.trim() || !validateEmail(email.value)) { emailError.hidden = false; hasError = true; }
    if (!message.value.trim()) { messageError.hidden = false; hasError = true; }

    if (hasError) {
      if (submitMsg) submitMsg.textContent = '';
      return;
    }

    // Simulate successful submit
    setTimeout(() => {
      if (submitMsg) {
        submitMsg.textContent = 'Thank you! Your message has been received. We’ll get back to you shortly.';
      }
      form.reset();
    }, 500);
  });
}

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());