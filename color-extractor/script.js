/**
 * AI 色彩析出工具 — Median Cut 算法实现
 */

// ==========================================
// 1. 星空粒子背景
// ==========================================
const starCanvas = document.getElementById("starfield");
const ctx = starCanvas.getContext("2d");
let particles = [];
const particleCount = 70;

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * starCanvas.width;
    this.y = Math.random() * starCanvas.height;
    this.size = Math.random() * 1.2 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.18;
    this.speedY = (Math.random() - 0.5) * 0.18;
    this.opacity = Math.random() * 0.35 + 0.08;
    this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    this.fadeSpeed = Math.random() * 0.0025 + 0.001;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.fadeDir * this.fadeSpeed;
    if (this.opacity >= 0.55) this.fadeDir = -1;
    if (this.opacity <= 0.07) this.fadeDir = 1;
    if (this.x < -10) this.x = starCanvas.width + 10;
    if (this.x > starCanvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = starCanvas.height + 10;
    if (this.y > starCanvas.height + 10) this.y = -10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(140,130,240,${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  particles.forEach((p) => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();
window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });

// ==========================================
// 2. 上传区交互
// ==========================================
const uploadZone = document.getElementById("uploadZone");
const fileInput = document.getElementById("fileInput");
const result = document.getElementById("result");

uploadZone.addEventListener("click", () => fileInput.click());

uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("dragover");
});

uploadZone.addEventListener("dragleave", () => {
  uploadZone.classList.remove("dragover");
});

uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    processImage(file);
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) processImage(file);
});

// ==========================================
// 3. 图像处理 & Median Cut 算法
// ==========================================

/**
 * 一个"颜色盒子"：包含一组像素及其RGB范围
 */
class ColorBox {
  constructor(pixels) {
    this.pixels = pixels;
    this.minR = Infinity; this.maxR = -Infinity;
    this.minG = Infinity; this.maxG = -Infinity;
    this.minB = Infinity; this.maxB = -Infinity;

    for (const p of pixels) {
      if (p[0] < this.minR) this.minR = p[0];
      if (p[0] > this.maxR) this.maxR = p[0];
      if (p[1] < this.minG) this.minG = p[1];
      if (p[1] > this.maxG) this.maxG = p[1];
      if (p[2] < this.minB) this.minB = p[2];
      if (p[2] > this.maxB) this.maxB = p[2];
    }
  }

  /** 范围最大的通道 */
  dominantChannel() {
    const rRange = this.maxR - this.minR;
    const gRange = this.maxG - this.minG;
    const bRange = this.maxB - this.minB;
    if (rRange >= gRange && rRange >= bRange) return 0; // R
    if (gRange >= rRange && gRange >= bRange) return 1; // G
    return 2; // B
  }

  /** 平均色 */
  average() {
    let r = 0, g = 0, b = 0;
    for (const p of this.pixels) { r += p[0]; g += p[1]; b += p[2]; }
    const n = this.pixels.length;
    return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
  }

  /** 按指定通道排序后在中位数处切分为两个盒子 */
  split() {
    const channel = this.dominantChannel();
    this.pixels.sort((a, b) => a[channel] - b[channel]);
    const mid = Math.floor(this.pixels.length / 2);
    return [
      new ColorBox(this.pixels.slice(0, mid)),
      new ColorBox(this.pixels.slice(mid)),
    ];
  }
}

/**
 * Median Cut 递归
 * @param {ColorBox[]} boxes  当前盒子数组
 * @param {number} target     目标数量
 */
function medianCut(boxes, target) {
  if (boxes.length >= target) return boxes;

  // 找到像素最多的盒子
  let maxIdx = 0;
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].pixels.length > boxes[maxIdx].pixels.length) maxIdx = i;
  }

  // 切分
  const toSplit = boxes[maxIdx];
  const [a, b] = toSplit.split();
  boxes.splice(maxIdx, 1, a, b);

  return medianCut(boxes, target);
}

/**
 * RGB转HEX
 */
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/**
 * 判断颜色是亮色还是暗色（用于文字颜色选择）
 */
function isLightColor(r, g, b) {
  // 感知亮度公式
  return (0.299 * r + 0.587 * g + 0.114 * b) > 140;
}

/**
 * 处理上传的图片
 */
function processImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // 缩小到合理尺寸以加速处理
      const maxDim = 200;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      // Canvas 绘制
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const cx = cv.getContext("2d");
      cx.drawImage(img, 0, 0, w, h);

      // 获取像素数据
      const imageData = cx.getImageData(0, 0, w, h);
      const pixels = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        if (imageData.data[i + 3] > 30) { // 忽略透明像素
          pixels.push([r, g, b]);
        }
      }

      if (pixels.length < 8) return;

      // Median Cut
      const initialBox = new ColorBox(pixels);
      const boxes = medianCut([initialBox], 8);

      // 计算每个盒子的平均色和占比
      const totalPixels = pixels.length;
      const colors = boxes.map((box) => {
        const avg = box.average();
        return {
          r: avg[0], g: avg[1], b: avg[2],
          hex: rgbToHex(avg[0], avg[1], avg[2]),
          percent: ((box.pixels.length / totalPixels) * 100).toFixed(1),
          light: isLightColor(avg[0], avg[1], avg[2]),
        };
      });

      // 按像素占比降序
      colors.sort((a, b) => parseFloat(b.percent) - parseFloat(a.percent));

      // 渲染
      renderResult(img, w, h, file.name, colors);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ==========================================
// 4. 渲染结果
// ==========================================
function renderResult(img, w, h, name, colors) {
  const previewImg = document.getElementById("previewImg");
  const previewSize = document.getElementById("previewSize");
  const previewColors = document.getElementById("previewColors");
  const palette = document.getElementById("palette");

  previewImg.src = img.src;
  previewSize.textContent = `${name} · ${w}×${h}`;
  previewColors.textContent = `提取 ${colors.length} 个主色调`;

  palette.innerHTML = colors
    .map((c, i) => {
      const textClass = c.light ? "dark-text" : "light-text";
      return `<div class="color-swatch ${textClass}"
                   style="background:${c.hex}"
                   data-hex="${c.hex}">
                <span class="swatch-hex">${c.hex}</span>
                <span class="swatch-percent">${c.percent}%</span>
              </div>`;
    })
    .join("");

  // 绑定点击复制
  palette.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const hex = swatch.dataset.hex;
      navigator.clipboard.writeText(hex).then(() => showToast());
    });
  });

  result.style.display = "block";
  uploadZone.classList.add("has-image");
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("show"), 1500);
}

// ==========================================
// 5. 算法说明折叠
// ==========================================
const algoToggle = document.getElementById("algoToggle");
const algoDetail = document.getElementById("algoDetail");

algoToggle.addEventListener("click", () => {
  const isOpen = algoDetail.classList.toggle("open");
  algoToggle.textContent = isOpen ? "收起算法说明 ▲" : "了解提取算法 ▼";
});
