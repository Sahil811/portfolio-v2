/* ============================================
   GOD-TIER PORTFOLIO — INTERACTIONS & ANIMATIONS
   Sahil Siddiqui © 2026
   ============================================ */

// ==================== PARTICLE CONSTELLATION ====================
class ParticleConstellation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    this.resizeTimeout = null;

    this.config = {
      particleCount: 80,
      particleMinSize: 1,
      particleMaxSize: 2.5,
      lineDistance: 150,
      speed: 0.3,
      particleColor: 'rgba(99, 102, 241, ',
      lineColor: 'rgba(99, 102, 241, ',
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';

    // Adjust particle count for mobile
    if (window.innerWidth < 768) {
      this.config.particleCount = 35;
      this.config.lineDistance = 100;
    } else if (window.innerWidth < 1024) {
      this.config.particleCount = 50;
      this.config.lineDistance = 120;
    } else {
      this.config.particleCount = 80;
      this.config.lineDistance = 150;
    }
  }

  createParticles() {
    this.particles = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        size: Math.random() * (this.config.particleMaxSize - this.config.particleMinSize) + this.config.particleMinSize,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.createParticles();
      }, 250);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  update() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Keep in bounds
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));

      // Mouse interaction — subtle push
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.lineDistance) {
          const opacity = (1 - dist / this.config.lineDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.config.lineColor + opacity + ')';
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.config.particleColor + p.opacity + ')';
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
  }
}


// ==================== TYPEWRITER EFFECT ====================
class TypewriterEffect {
  constructor(element, phrases, options = {}) {
    this.element = element;
    this.phrases = phrases;
    this.currentPhrase = 0;
    this.currentChar = 0;
    this.isDeleting = false;
    this.typeSpeed = options.typeSpeed || 80;
    this.deleteSpeed = options.deleteSpeed || 40;
    this.pauseDuration = options.pauseDuration || 2000;
    this.type();
  }

  type() {
    const phrase = this.phrases[this.currentPhrase];

    if (this.isDeleting) {
      this.currentChar--;
      this.element.textContent = phrase.substring(0, this.currentChar);
    } else {
      this.currentChar++;
      this.element.textContent = phrase.substring(0, this.currentChar);
    }

    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentChar === phrase.length) {
      speed = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false;
      this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
      speed = 400;
    }

    setTimeout(() => this.type(), speed);
  }
}


// ==================== SCROLL ANIMATIONS ====================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, stop observing (animate only once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    this.elements.forEach((el) => observer.observe(el));
  }
}


// ==================== COUNTER ANIMATION ====================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-target]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  }
}


// ==================== TESTIMONIAL CAROUSEL ====================
class TestimonialCarousel {
  constructor() {
    this.track = document.getElementById('testimonials-track');
    this.dotsContainer = document.getElementById('testimonial-dots');
    this.prevBtn = document.getElementById('testimonial-prev');
    this.nextBtn = document.getElementById('testimonial-next');

    if (!this.track) return;

    this.cards = this.track.querySelectorAll('.testimonial-card');
    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.goTo(0);
    this.startAutoPlay();
  }

  createDots() {
    for (let i = 0; i < this.totalCards; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonials__dot');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
    this.dots = this.dotsContainer.querySelectorAll('.testimonials__dot');
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Pause on hover
    this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.track.addEventListener('mouseleave', () => this.startAutoPlay());

    // Touch support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoPlay();
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
      this.startAutoPlay();
    }, { passive: true });
  }

  goTo(index) {
    this.currentIndex = index;
    const offset = -index * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  prev() {
    const index = this.currentIndex === 0 ? this.totalCards - 1 : this.currentIndex - 1;
    this.goTo(index);
  }

  next() {
    const index = this.currentIndex === this.totalCards - 1 ? 0 : this.currentIndex + 1;
    this.goTo(index);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}


// ==================== NAVIGATION ====================
class Navigation {
  constructor() {
    this.nav = document.getElementById('navbar');
    this.toggle = document.getElementById('nav-toggle');
    this.links = document.getElementById('nav-links');
    this.overlay = document.getElementById('nav-overlay');
    this.sections = document.querySelectorAll('section[id]');
    this.navAnchors = document.querySelectorAll('.nav__links li a:not(.nav__resume-btn)');
    this.isOpen = false;
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    this.bindEvents();
    this.onScroll();
  }

  bindEvents() {
    // Hamburger toggle
    this.toggle.addEventListener('click', () => this.toggleMenu());

    // Close on overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMenu());
    }

    // Close on link click
    this.navAnchors.forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Scroll effects
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.closeMenu();
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.toggle.classList.toggle('open', this.isOpen);
    this.links.classList.toggle('open', this.isOpen);
    if (this.overlay) this.overlay.classList.toggle('active', this.isOpen);
    this.toggle.setAttribute('aria-expanded', this.isOpen);
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isOpen = false;
    this.toggle.classList.remove('open');
    this.links.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }

  onScroll() {
    const scrollY = window.scrollY;

    // Background on scroll
    this.nav.classList.toggle('scrolled', scrollY > 50);

    // Active section tracking
    let currentSection = '';
    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    this.navAnchors.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    this.lastScrollY = scrollY;
  }
}


// ==================== EXPERIENCE ACCORDION ====================
class ExperienceAccordion {
  constructor() {
    this.cards = document.querySelectorAll('[data-expandable]');
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      card.addEventListener('click', () => {
        // Close all others
        this.cards.forEach((c) => {
          if (c !== card) c.classList.remove('expanded');
        });
        // Toggle this one
        card.classList.toggle('expanded');

        // Update text
        const expandLabel = card.querySelector('.timeline__expand span');
        if (expandLabel) {
          expandLabel.textContent = card.classList.contains('expanded')
            ? 'Click to collapse'
            : 'Click to expand';
        }
      });
    });
  }
}


// ==================== TILT EFFECT ON PROJECT CARDS ====================
class TiltEffect {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    if (window.matchMedia('(hover: hover)').matches) {
      this.init();
    }
  }

  init() {
    this.cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
      card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
    });
  }

  onMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.transition = 'transform 0.1s ease-out';
  }

  onMouseLeave(e, card) {
    card.style.transform = '';
    card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
  }
}


// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });
}


// ==================== FOOTER YEAR ====================
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
  // Particle background
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    new ParticleConstellation(canvas);
  }

  // Typewriter
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    new TypewriterEffect(typewriterEl, [
      'Senior Software Engineer.',
      'Full-Stack Architect.',
      'AI / LLM Engineer.',
      'Cloud & Platform Engineer.',
    ]);
  }

  // Scroll reveal
  new ScrollReveal();

  // Counter animation
  new CounterAnimation();

  // Navigation
  new Navigation();

  // Experience accordion
  new ExperienceAccordion();

  // Testimonials carousel
  new TestimonialCarousel();

  // Project card tilt
  new TiltEffect();

  // Smooth scroll
  initSmoothScroll();

  // Footer year
  setFooterYear();
});
