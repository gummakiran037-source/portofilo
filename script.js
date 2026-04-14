// Initialize Lucide icons
lucide.createIcons();

// ---- Typing Effect ----
const phrases = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Open Source Contributor',
  'Coffee Aficionado',
  'Clean Code Advocate'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextEl = document.getElementById('typed-text');

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 30 : 60;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ---- Mobile Menu Toggle ----
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ---- Scroll-based Fade In ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- Skill Bar Animation on Scroll ----
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        bar.style.transition = 'width 1.2s ease';
        bar.style.width = width + '%';
      });
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ---- Toast Notification System ----
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'border-emerald-500/30' : 'border-red-500/30';
  const iconColor = type === 'success' ? 'text-emerald-400' : 'text-red-400';
  const icon = type === 'success' ? 'check-circle' : 'alert-circle';

  toast.className = `toast-in flex items-center gap-3 px-4 py-3 bg-flux-panel border ${bgColor} shadow-lg`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-4 h-4 ${iconColor} flex-shrink-0"></i>
    <span class="font-mono text-xs text-flux-text">${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons({ nodes: [toast] });

  setTimeout(() => {
    toast.classList.remove('toast-in');
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Contact Form ----
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="10"></circle>
    </svg>
    SENDING...
  `;

  setTimeout(() => {
    showToast(`Thanks ${name}! Your message has been sent.`, 'success');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      SEND MESSAGE
      <i data-lucide="send" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"></i>
    `;
    lucide.createIcons({ nodes: [submitBtn] });
  }, 1500);
});

// ---- Download Resume Button ----
document.getElementById('download-btn').addEventListener('click', () => {
  showToast('Resume download started!', 'success');
  // In a real scenario, this would trigger an actual file download:
  // window.location.href = '/path/to/resume.pdf';
});
