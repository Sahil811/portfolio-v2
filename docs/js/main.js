class ImpactCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = window.devicePixelRatio || 1;
    this.nodes = [];
    this.pointer = { x: 0, y: 0, active: false };
    this.frame = 0;
    this.raf = null;
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.handlePointer = this.handlePointer.bind(this);
    this.clearPointer = this.clearPointer.bind(this);

    this.init();
  }

  init() {
    this.resize();
    this.bind();
    this.draw();

    if (!this.reduceMotion) {
      this.animate();
    }
  }

  bind() {
    window.addEventListener("resize", this.resize, { passive: true });
    window.addEventListener("pointermove", this.handlePointer, { passive: true });
    window.addEventListener("pointerleave", this.clearPointer, { passive: true });
  }

  resize() {
    const width = window.innerWidth;
    const height = Math.max(window.innerHeight, 720);

    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(width * this.dpr);
    this.canvas.height = Math.floor(height * this.dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.nodes = this.createNodes(width, height);
    this.draw();
  }

  createNodes(width, height) {
    const labels = ["AI", "RAG", "GKE", "GO", "POS", "MAP", "API", "CI"];
    const count = width < 700 ? 16 : 28;
    const nodes = [];

    for (let i = 0; i < count; i += 1) {
      const label = labels[i % labels.length];
      nodes.push({
        label,
        x: (width * (0.08 + ((i * 37) % 84) / 100)) + Math.sin(i) * 18,
        y: (height * (0.12 + ((i * 29) % 76) / 100)) + Math.cos(i) * 18,
        vx: Math.sin(i * 1.7) * 0.18,
        vy: Math.cos(i * 1.3) * 0.18,
        radius: label.length === 2 ? 18 : 22,
        color: i % 4 === 0 ? "#8ee6c3" : i % 4 === 1 ? "#7cc7ff" : i % 4 === 2 ? "#f4c76a" : "#ff8d7a",
      });
    }

    return nodes;
  }

  handlePointer(event) {
    this.pointer.x = event.clientX;
    this.pointer.y = event.clientY;
    this.pointer.active = true;
  }

  clearPointer() {
    this.pointer.active = false;
  }

  update() {
    const width = window.innerWidth;
    const height = Math.max(window.innerHeight, 720);

    this.nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      if (this.pointer.active) {
        const dx = node.x - this.pointer.x;
        const dy = node.y - this.pointer.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 1 && distance < 150) {
          const force = (150 - distance) / 150;
          node.x += (dx / distance) * force * 0.9;
          node.y += (dy / distance) * force * 0.9;
        }
      }
    });
  }

  drawGrid(width, height) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = "rgba(238, 245, 239, 0.035)";
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawConnections() {
    const ctx = this.ctx;

    for (let i = 0; i < this.nodes.length; i += 1) {
      for (let j = i + 1; j < this.nodes.length; j += 1) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < 210) {
          const opacity = (1 - distance / 210) * 0.18;
          ctx.strokeStyle = `rgba(142, 230, 195, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  drawNodes() {
    const ctx = this.ctx;
    ctx.font = "700 10px JetBrains Mono, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    this.nodes.forEach((node, index) => {
      const pulse = this.reduceMotion ? 0 : Math.sin(this.frame / 28 + index) * 2;
      const radius = node.radius + pulse;

      ctx.beginPath();
      ctx.fillStyle = "rgba(7, 8, 7, 0.68)";
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 1.4;
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = node.color;
      ctx.fillText(node.label, node.x, node.y + 0.5);
    });
  }

  draw() {
    const width = window.innerWidth;
    const height = Math.max(window.innerHeight, 720);

    this.ctx.clearRect(0, 0, width, height);
    this.drawGrid(width, height);
    this.drawConnections();
    this.drawNodes();
  }

  animate() {
    this.frame += 1;
    this.update();
    this.draw();
    this.raf = window.requestAnimationFrame(this.animate);
  }
}

class Navigation {
  constructor() {
    this.nav = document.getElementById("navbar");
    this.toggle = document.getElementById("nav-toggle");
    this.links = document.getElementById("nav-links");
    this.overlay = document.getElementById("nav-overlay");
    this.anchors = Array.from(document.querySelectorAll(".nav__links a[href^='#']"));
    this.sections = Array.from(document.querySelectorAll("section[id]"));
    this.isOpen = false;

    if (!this.nav || !this.toggle || !this.links) return;

    this.bind();
    this.onScroll();
  }

  bind() {
    this.toggle.addEventListener("click", () => this.toggleMenu());
    this.overlay?.addEventListener("click", () => this.closeMenu());
    this.anchors.forEach((anchor) => anchor.addEventListener("click", () => this.closeMenu()));
    window.addEventListener("scroll", () => this.onScroll(), { passive: true });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.closeMenu();
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.toggle.classList.toggle("open", this.isOpen);
    this.links.classList.toggle("open", this.isOpen);
    this.overlay?.classList.toggle("active", this.isOpen);
    this.toggle.setAttribute("aria-expanded", String(this.isOpen));
    document.body.style.overflow = this.isOpen ? "hidden" : "";
  }

  closeMenu() {
    this.isOpen = false;
    this.toggle.classList.remove("open");
    this.links.classList.remove("open");
    this.overlay?.classList.remove("active");
    this.toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  onScroll() {
    const scrollY = window.scrollY;
    this.nav.classList.toggle("scrolled", scrollY > 20);

    let activeId = "";
    this.sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        activeId = section.id;
      }
    });

    this.anchors.forEach((anchor) => {
      anchor.classList.toggle("active", anchor.getAttribute("href") === `#${activeId}`);
    });
  }
}

class ScrollReveal {
  constructor() {
    this.items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.init();
  }

  init() {
    if (this.reduceMotion || !("IntersectionObserver" in window)) {
      this.items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    this.items.forEach((item) => observer.observe(item));
  }
}

class TimelineAccordion {
  constructor() {
    this.items = document.querySelectorAll("[data-expandable]");
    this.bind();
  }

  bind() {
    this.items.forEach((item) => {
      const button = item.querySelector(".timeline__toggle");
      if (!button) return;

      button.addEventListener("click", () => {
        const nextState = !item.classList.contains("expanded");
        this.items.forEach((other) => {
          other.classList.remove("expanded");
          other.querySelector(".timeline__toggle")?.replaceChildren(document.createTextNode("Expand role"));
        });

        item.classList.toggle("expanded", nextState);
        button.textContent = nextState ? "Collapse role" : "Expand role";
      });
    });
  }
}

class CardTilt {
  constructor() {
    this.cards = document.querySelectorAll(".project-card");
    this.canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (this.canHover && !this.reduceMotion) {
      this.bind();
    }
  }

  bind() {
    this.cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => this.move(event, card));
      card.addEventListener("mouseleave", () => this.leave(card));
    });
  }

  move(event, card) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -3;
    const rotateY = ((x / rect.width) - 0.5) * 3;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  }

  leave(card) {
    card.style.transform = "";
  }
}

function initSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const navHeight = document.getElementById("navbar")?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

function setFooterYear() {
  const year = document.getElementById("footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero-canvas");
  if (canvas) new ImpactCanvas(canvas);

  new Navigation();
  new ScrollReveal();
  new TimelineAccordion();
  new CardTilt();
  initSmoothScroll();
  setFooterYear();
});
