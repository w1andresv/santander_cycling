// ==============================
// PRELOADER
// ==============================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 500);
});

// ==============================
// AOS INIT
// ==============================
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

// ==============================
// NAVBAR SCROLL
// ==============================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    navbar.classList.add('nav-scrolled');
    navbar.style.padding = '0.5rem 0';
  } else {
    navbar.classList.remove('nav-scrolled');
    navbar.style.padding = '';
  }
  lastScroll = currentScroll;
});

// ==============================
// MOBILE MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ==============================
// LANGUAGE TOGGLE
// ==============================
let currentLang = localStorage.getItem('santander-lang') || 'es';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('santander-lang', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-lang-es]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update toggle buttons
  document.querySelectorAll('[id^="lang-es-btn"]').forEach(btn => {
    btn.classList.toggle('active', lang === 'es');
  });
  document.querySelectorAll('[id^="lang-en-btn"]').forEach(btn => {
    btn.classList.toggle('active', lang === 'en');
  });
}

// Init language
setLang(currentLang);

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounters() {
  const counters = document.querySelectorAll('.counter-num');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;

      if (decimals > 0) {
        counter.textContent = current.toFixed(decimals);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (decimals > 0) {
          counter.textContent = target.toFixed(decimals);
        } else {
          counter.textContent = target.toLocaleString() + '+';
        }
      }
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters on scroll
const statsSection = document.querySelector('.counter-num')?.closest('section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ==============================
// COUNTDOWN TIMER
// ==============================
function updateCountdown() {
  const eventDate = new Date('2026-07-05T06:00:00-05:00'); // Colombia time
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById('countdown-days').textContent = '0';
    document.getElementById('countdown-hours').textContent = '0';
    document.getElementById('countdown-mins').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById('countdown-days').textContent = days;
  document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('countdown-mins').textContent = mins.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 60000);

// ==============================
// GSAP ANIMATIONS
// ==============================
gsap.registerPlugin(ScrollTrigger);

// Parallax hero
gsap.to('#hero .hero-parallax', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

// Route map SVG animation
gsap.to('#route-path', {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#route-map',
    start: 'top 80%',
    end: 'bottom 40%',
    scrub: 1,
  }
});

// ==============================
// LIGHTBOX
// ==============================
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ==============================
// CHICAMOCHA MODAL + GALLERY
// ==============================
const modalGalleryImages = [
  'images/chicamocha_road/canion.webp',
  'images/chicamocha_road/barichara.webp',
  'images/chicamocha_road/landscape.webp',
  'images/chicamocha_road/puente.webp',
  'images/chicamocha_road/coffe.webp',
  'images/chicamocha_road/canion2.webp',
  'images/chicamocha_road/barichara2.webp',
  'images/chicamocha_road/zapatoca.webp',
];
let modalCurrentIndex = 0;

function openChicamochaModal() {
  const modal = document.getElementById('chicamocha-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  setModalImage(0);
  //setLang(currentLang);
}

function closeChicamochaModal() {
  const modal = document.getElementById('chicamocha-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function setModalImage(index) {
  modalCurrentIndex = index;
  const mainImg = document.getElementById('modal-gallery-main');
  const counter = document.getElementById('modal-gallery-counter');
  mainImg.src = modalGalleryImages[index];
  counter.textContent = `${index + 1} / ${modalGalleryImages.length}`;
  // Update thumbnails
  document.querySelectorAll('#chicamocha-modal .gallery-thumb').forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active-thumb');
    } else {
      thumb.classList.remove('active-thumb');
    }
  });
}

function modalGalleryNext() {
  const next = (modalCurrentIndex + 1) % modalGalleryImages.length;
  setModalImage(next);
}

function modalGalleryPrev() {
  const prev = (modalCurrentIndex - 1 + modalGalleryImages.length) % modalGalleryImages.length;
  setModalImage(prev);
}

// PÁRAMO MODAL
function openParamoModal() {
  document.getElementById('paramo-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeParamoModal() {
  document.getElementById('paramo-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// SIFÓN MODAL
function openSifonModal() {
  document.getElementById('sifon-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSifonModal() {
  document.getElementById('sifon-modal').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const chicModal = document.getElementById('chicamocha-modal');
    const cartModal = document.getElementById('cartagena-modal');
    const paramoModal = document.getElementById('paramo-modal');
    const sifonModal = document.getElementById('sifon-modal');
    if (paramoModal.classList.contains('active')) {
      closeParamoModal();
    } else if (sifonModal.classList.contains('active')) {
      closeSifonModal();
    } else if (cartModal.classList.contains('active')) {
      closeCartagenaModal();
    } else if (chicModal.classList.contains('active')) {
      closeChicamochaModal();
    } else {
      closeLightbox();
    }
  }
  if (document.getElementById('cartagena-modal').classList.contains('active')) {
    if (e.key === 'ArrowRight') cartagenaGalleryNext();
    if (e.key === 'ArrowLeft') cartagenaGalleryPrev();
  }
  if (document.getElementById('chicamocha-modal').classList.contains('active')) {
    if (e.key === 'ArrowRight') modalGalleryNext();
    if (e.key === 'ArrowLeft') modalGalleryPrev();
  }
});

// ==============================
// CARTAGENA MODAL + GALLERY
// ==============================
const cartagenaGalleryImages = [
  'images/nairo/01.webp',
  'images/ciclistas/3.webp',
  'images/ciclistas/5.webp',
  'images/ciclistas/7.webp',
  'images/ciclistas/8.webp',
  'images/ciclistas/10.webp',
  'images/ciclistas/11.webp',
];
let cartagenaCurrentIndex = 0;

function openCartagenaModal() {
  const modal = document.getElementById('cartagena-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  setCartagenaImage(0);
}

function closeCartagenaModal() {
  const modal = document.getElementById('cartagena-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function setCartagenaImage(index) {
  cartagenaCurrentIndex = index;
  const mainImg = document.getElementById('cartagena-gallery-main');
  const counter = document.getElementById('cartagena-gallery-counter');
  mainImg.src = cartagenaGalleryImages[index];
  counter.textContent = `${index + 1} / ${cartagenaGalleryImages.length}`;
  document.querySelectorAll('#cartagena-modal .gallery-thumb').forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active-thumb');
    } else {
      thumb.classList.remove('active-thumb');
    }
  });
}

function cartagenaGalleryNext() {
  const next = (cartagenaCurrentIndex + 1) % cartagenaGalleryImages.length;
  setCartagenaImage(next);
}

function cartagenaGalleryPrev() {
  const prev = (cartagenaCurrentIndex - 1 + cartagenaGalleryImages.length) % cartagenaGalleryImages.length;
  setCartagenaImage(prev);
}

// ==============================
// ACTIVE NAV ON SCROLL
// ==============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('!text-accent');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('!text-accent');
    }
  });
});

// ==============================
// ==============================
// CONTACT FORM — BREVO API
// ==============================
const BREVO_API_KEY = 'TU_API_KEY_DE_BREVO'; // Reemplaza con tu API key de Brevo

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submit = document.getElementById('contact-submit');
    const spinner = document.getElementById('contact-spinner');
    const sendIcon = document.getElementById('contact-send-icon');
    const btnLabel = document.getElementById('contact-btn-label');
    const successMsg = document.getElementById('contact-success');
    const errorMsg = document.getElementById('contact-error');

    const nombre = document.getElementById('contact-nombre').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const mensaje = document.getElementById('contact-mensaje').value.trim();

    // Loading state
    submit.disabled = true;
    spinner.classList.remove('hidden');
    sendIcon.classList.add('hidden');
    btnLabel.textContent = '...';
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: nombre, email: email },
          to: [{ email: 'info@santandercycling.com', name: 'Santander Cycling' }],
          replyTo: { email: email, name: nombre },
          subject: `Nuevo mensaje de ${nombre} — Santander Cycling`,
          htmlContent: `<h3>Nuevo mensaje desde santandercycling.com</h3><p><strong>Nombre:</strong> ${nombre}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong></p><p>${mensaje.replace(/\n/g, '<br>')}</p>`
        })
      });

      if (res.ok) {
        successMsg.classList.remove('hidden');
        contactForm.reset();
      } else {
        errorMsg.classList.remove('hidden');
      }
    } catch {
      errorMsg.classList.remove('hidden');
    } finally {
      submit.disabled = false;
      spinner.classList.add('hidden');
      sendIcon.classList.remove('hidden');
      const lang = document.documentElement.lang || 'es';
      btnLabel.textContent = lang === 'en' ? 'Send Message' : 'Enviar Mensaje';
    }
  });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
