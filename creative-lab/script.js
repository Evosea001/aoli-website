/**
 * AI创意实验 — 侧导航 + 星空 + 灯箱
 */

// ==========================================
// 1. 星空粒子
// ==========================================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let particles = [];
const PC = 60;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class P {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.s = Math.random() * 1.2 + 0.4;
    this.sx = (Math.random() - 0.5) * 0.18;
    this.sy = (Math.random() - 0.5) * 0.18;
    this.o = Math.random() * 0.3 + 0.08;
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.sp = Math.random() * 0.002 + 0.001;
  }
  update() {
    this.x += this.sx; this.y += this.sy;
    this.o += this.dir * this.sp;
    if (this.o >= 0.5) this.dir = -1;
    if (this.o <= 0.06) this.dir = 1;
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(140,130,240,${this.o})`;
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < PC; i++) particles.push(new P());
}

function anim() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => { p.update(); p.draw(); });
  requestAnimationFrame(anim);
}

resize(); init(); anim();
window.addEventListener("resize", () => { resize(); init(); });

// ==========================================
// 2. 灯箱
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item img, .process-item img").forEach((img) => {
  img.parentElement.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
  });
});

function closeLB() {
  lightbox.classList.remove("show");
}
lightboxClose.addEventListener("click", closeLB);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLB(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLB();
});

// ==========================================
// 3. 侧导航高亮（IntersectionObserver）
// ==========================================
const navItems = document.querySelectorAll(".nav-item");
const categories = document.querySelectorAll(".category");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach((item) => {
          item.classList.toggle(
            "active",
            item.getAttribute("href") === "#" + id
          );
        });
      }
    });
  },
  { threshold: 0.2, rootMargin: "-60px 0px -40% 0px" }
);

categories.forEach((cat) => navObserver.observe(cat));

// 平滑滚动（覆盖html默认）
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(item.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
