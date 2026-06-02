/**
 * 动态壁纸预览页 — 交互逻辑
 * 包含：星空粒子、设备视频播放、全屏灯箱
 */

// ==========================================
// 1. 星空粒子背景（简化版，与主站一致）
// ==========================================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.speedY = (Math.random() - 0.5) * 0.25;
    this.opacity = Math.random() * 0.5 + 0.15;
    this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    this.fadeSpeed = Math.random() * 0.004 + 0.001;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.opacity += this.fadeDir * this.fadeSpeed;
    if (this.opacity >= 0.7) this.fadeDir = -1;
    if (this.opacity <= 0.1) this.fadeDir = 1;

    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(140, 130, 240, ${this.opacity})`;
    ctx.fill();

    if (this.size > 1.1) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110, 110, 240, ${this.opacity * 0.1})`;
      ctx.fill();
    }
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw(ctx);
  });
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

// ==========================================
// 2. 视频自动播放（静音循环）
// ==========================================
// 页面加载后自动播放所有设备中的视频
function playAllVideos() {
  document.querySelectorAll(".device-screen video").forEach((video) => {
    video.play().catch(() => {
      // 某些浏览器可能阻止自动播放，忽略错误
    });
  });
}

// 尝试立即播放
playAllVideos();

// 用户首次交互后再尝试一次（某些浏览器要求用户交互后才能播放）
document.addEventListener("click", () => {
  playAllVideos();
}, { once: true });

// ==========================================
// 3. 设备点击 → 全屏灯箱
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightboxVideo");
const lightboxLabel = document.getElementById("lightboxLabel");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".device-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    const video = wrapper.querySelector("video");
    const deviceName = wrapper.dataset.device;

    // 复制视频源到灯箱
    lightboxVideo.src = video.src;
    lightboxLabel.textContent = deviceName;
    lightbox.classList.add("show");
    lightboxVideo.play();
  });
});

// 关闭灯箱
function closeLightbox() {
  lightbox.classList.remove("show");
  setTimeout(() => {
    lightboxVideo.pause();
  }, 400);
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("show")) {
    closeLightbox();
  }
});
