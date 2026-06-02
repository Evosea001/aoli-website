/**
 * 李大海 AI视觉作品集 — 交互逻辑
 * 包含：星空粒子、导航栏、灯箱、滚动动画、自定义光标、加载动画、导航高亮、交错渐显
 */

// ==========================================
// 0. 页面加载动画
// ==========================================
(function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  // sessionStorage: 同一次会话内刷新不重复播放
  if (sessionStorage.getItem("loaderShown")) {
    loader.style.display = "none";
    return;
  }
  sessionStorage.setItem("loaderShown", "1");

  // 页面内容加载完成后淡出
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
      // 动画结束后移除DOM
      setTimeout(() => { if (loader.parentNode) loader.remove(); }, 700);
    }, 1200);
  });

  // 兜底：3秒后强制移除
  setTimeout(() => {
    loader.classList.add("hide");
    setTimeout(() => { if (loader.parentNode) loader.remove(); }, 700);
  }, 3500);
})();

// ==========================================
// 0b. 自定义光标
// ==========================================
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  if (!cursor || !ring) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // hover检测
  document.querySelectorAll("a, button, .node, .device-wrapper, " +
    ".platform-card, .color-swatch, .screenshot-img, .image-card, " +
    ".keyframe, .skill-card, .tool-card, .video-placeholder, .creative-card, " +
    ".wechat-item, .theme-dot, .tag, .back-to-top"
  ).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      ring.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      ring.classList.remove("hover");
    });
  });

  function animateCursor() {
    // 缓动跟随
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    ring.style.left = mouseX + "px";
    ring.style.top = mouseY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

// ==========================================
// 1. 星空粒子背景（Canvas）
// ==========================================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// 粒子类
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    // 随机分布在整个画布
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // 粒子大小：随机1-2.5px
    this.size = Math.random() * 1.5 + 0.8;
    // 移动速度
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    // 透明度：随机0.2-0.8
    this.opacity = Math.random() * 0.6 + 0.2;
    // 透明度变化方向
    this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    this.fadeSpeed = Math.random() * 0.005 + 0.002;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 透明度呼吸
    this.opacity += this.fadeDir * this.fadeSpeed;
    if (this.opacity >= 0.8) this.fadeDir = -1;
    if (this.opacity <= 0.15) this.fadeDir = 1;

    // 超出边界时重置到对面
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // 蓝紫色调的粒子光点
    ctx.fillStyle = `rgba(160, 140, 240, ${this.opacity})`;
    ctx.fill();

    // 较大粒子加发光效果
    if (this.size > 1.3) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110, 110, 240, ${this.opacity * 0.12})`;
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
// 2. 导航栏滚动效果
// ==========================================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ==========================================
// 3. 灯箱（图片 + 视频）
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxClose = document.querySelector(".lightbox-close");

function showImage(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxImg.style.display = "";
  lightboxVideo.style.display = "none";
  lightboxVideo.pause();
  lightbox.classList.add("show");
}

function showVideo(src) {
  lightboxVideo.src = src;
  lightboxImg.style.display = "none";
  lightboxVideo.style.display = "";
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
  // 延迟清除，保留关闭动画
  setTimeout(() => {
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }, 400);
}

// 图片点击 → 灯箱
document.querySelectorAll(".image-card, .keyframe, .screenshot-img, .creative-card").forEach((el) => {
  el.addEventListener("click", () => {
    // 如果元素本身就是 img，直接用它的 src
    if (el.tagName === "IMG") {
      showImage(el.src, el.alt);
      return;
    }
    const img = el.querySelector("img");
    if (img) {
      showImage(img.src, img.alt);
    }
  });
});

// 视频占位点击 → 视频灯箱
document.querySelectorAll(".video-placeholder").forEach((el) => {
  el.addEventListener("click", () => {
    const videoSrc = el.dataset.video;
    if (videoSrc && videoSrc !== "path/to/your-video.mp4") {
      showVideo(videoSrc);
    }
  });
});

// 设备框点击 → 视频灯箱
document.querySelectorAll(".device-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    const video = wrapper.querySelector("video");
    if (video) {
      showVideo(video.src);
    }
  });
});

// 设备内视频自动静音循环播放
function playDeviceVideos() {
  document.querySelectorAll(".device-screen video").forEach((video) => {
    video.play().catch(() => {});
  });
}
playDeviceVideos();
document.addEventListener("click", () => { playDeviceVideos(); }, { once: true });

// 关闭灯箱
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("show")) {
    closeLightbox();
  }
});

// ==========================================
// 4. 滚动渐显动画（交错延迟）
// ==========================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
);

const revealSelector =
  ".project-card, .process-step, .image-card, .breakdown-card, " +
  ".platform-card, .skill-card, .flow-step, .app-card, " +
  ".keyframe, .section-header, .about-text, .tool-card, " +
  ".timeline-item, .build-stat, .creative-card";

// 分组 + 注入交错延迟
document.querySelectorAll(revealSelector).forEach((el) => {
  el.classList.add("reveal");

  // 找到最近的section或project-card作为分组容器
  const group = el.closest("section, .project-card, .tools-grid, .skill-grid");
  if (group) {
    const siblings = group.querySelectorAll(revealSelector);
    const idx = Array.from(siblings).indexOf(el);
    if (idx >= 0) {
      el.style.transitionDelay = idx * 60 + "ms";
    }
  }

  revealObserver.observe(el);
});

// ==========================================
// 5. 微信二维码弹窗
// ==========================================
const wechatTrigger = document.getElementById("wechatTrigger");
const wechatPopup = document.getElementById("wechatPopup");
const wechatClose = document.querySelector(".wechat-popup-close");

wechatTrigger.addEventListener("click", () => {
  wechatPopup.classList.add("show");
});

wechatClose.addEventListener("click", () => {
  wechatPopup.classList.remove("show");
});

wechatPopup.addEventListener("click", (e) => {
  // 点击卡片外的黑色区域关闭
  if (e.target === wechatPopup) {
    wechatPopup.classList.remove("show");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && wechatPopup.classList.contains("show")) {
    wechatPopup.classList.remove("show");
  }
});

// ==========================================
// 6. Hero 3D 倾斜效果
// ==========================================
const hero = document.getElementById("hero");
const heroTilt = document.getElementById("heroTilt");

if (hero && heroTilt) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;  // 鼠标在Hero内的X位置
    const y = e.clientY - rect.top;   // 鼠标在Hero内的Y位置

    // 计算偏移比例（-0.5 到 0.5）
    const xRatio = x / rect.width - 0.5;
    const yRatio = y / rect.height - 0.5;

    // 最大倾斜角度约8度
    const maxTilt = 8;
    const rotateY = xRatio * maxTilt;
    const rotateX = -yRatio * maxTilt;

    heroTilt.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  hero.addEventListener("mouseleave", () => {
    // 鼠标离开时平滑归位
    heroTilt.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  });
}

// ==========================================
// 7. 平台卡片翻转
// ==========================================
document.querySelectorAll(".platform-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// 点击卡片背面也能翻回来（已经在上面toggle里处理了）

// ==========================================
// 8. 滚动进度条 + 回到顶部
// ==========================================
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // 滚动进度条
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + "%";

  // 回到顶部按钮
  if (scrollTop > window.innerHeight) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  // 背景光晕视差（不同速度）
  const orb1 = document.querySelector(".orb-1");
  const orb2 = document.querySelector(".orb-2");
  const orb3 = document.querySelector(".orb-3");
  if (orb1) orb1.style.transform = `translateY(${scrollTop * 0.06}px)`;
  if (orb2) orb2.style.transform = `translateY(${-scrollTop * 0.04}px)`;
  if (orb3) orb3.style.transform = `translateY(${scrollTop * 0.08}px)`;

  // 几何图形微视差
  const geos = document.querySelectorAll(".geo-decor");
  geos.forEach((geo, i) => {
    const speed = 0.02 + i * 0.015;
    geo.style.transform = geo.classList.contains("geo-diamond")
      ? `translateY(${-scrollTop * speed}px) rotate(45deg)`
      : `translateY(${-scrollTop * speed}px)`;
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================
// 9. 导航当前区域高亮
// ==========================================
const navLinks = document.querySelectorAll(".nav-links a:not(.nav-tool)");
const sections = [
  document.getElementById("hero"),
  document.getElementById("ai-visual"),
  document.getElementById("motion"),
  document.getElementById("platform"),
  document.getElementById("creative"),
  document.getElementById("tools"),
  document.getElementById("about"),
  document.getElementById("workflow"),
  document.getElementById("contact"),
].filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });

        // Hero区域特殊：多个section可能同时可见，取第一个
        if (id === "hero") {
          navLinks.forEach((link) => link.classList.remove("active"));
        }
      }
    });
  },
  { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" }
);

sections.forEach((s) => navObserver.observe(s));
