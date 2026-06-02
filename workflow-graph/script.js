/**
 * AI 视觉工作流 — 交互节点图
 * 节点点击切换 + 自动演示 + 星空背景
 */

// ==========================================
// 1. 星空粒子背景（复用）
// ==========================================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = 80;

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
    this.size = Math.random() * 1.3 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    this.fadeSpeed = Math.random() * 0.003 + 0.001;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.fadeDir * this.fadeSpeed;
    if (this.opacity >= 0.6) this.fadeDir = -1;
    if (this.opacity <= 0.08) this.fadeDir = 1;
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }
  draw(ctx) {
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => { p.update(); p.draw(ctx); });
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();
window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });

// ==========================================
// 2. 节点数据
// ==========================================
const nodeData = [
  {
    step: "01",
    title: "需求理解",
    what: "确定创作主题、应用场景和最终交付形式。分析目标平台特性与用户审美偏好。",
    tools: "需求文档 / 视觉参考板 / 平台分析",
    key: "先理解场景再动手生成，避免无效探索。明确多终端适配需求。",
  },
  {
    step: "02",
    title: "灵感探索",
    what: "使用 Midjourney 和国产可灵（Kling）进行多方向概念生成，快速产出灵感图和视觉参考。",
    tools: "Midjourney / 可灵 Kling",
    key: "MJ 提供高质量风格参考，可灵补充本土化视觉方向。快速验证不同视觉概念。",
  },
  {
    step: "03",
    title: "风格控制",
    what: "从多组灵感图中筛选方向，统一色彩、材质和光感，收敛为稳定的视觉语言。",
    tools: "Photoshop / Lightroom / 色彩分级",
    key: "冷暖光感、透明材质与黑底关系是东方幻想风格的核心要素。",
  },
  {
    step: "04",
    title: "Blender",
    what: "将 2D 概念转化为 3D 空间中的动态视觉。建模、材质、动画、渲染全流程。",
    tools: "Blender 建模 / 动画 / Cycles 渲染",
    key: "AI 概念是起点，Blender 让静态概念具有空间感和动态表现力。",
  },
  {
    step: "05",
    title: "动态落地",
    what: "完成多终端适配（手机 / 折叠屏 / 桌面 / 车机），输出品牌可用的最终交付版本。",
    tools: "Premiere / DaVinci / 终端预览",
    key: "同一视觉系统在多个设备保持统一识别。迭代生成最终交付版本。",
  },
];

// ==========================================
// 3. 节点点击交互
// ==========================================
const nodes = document.querySelectorAll(".node");
const detailPanel = document.getElementById("detailPanel");
const detailStep = document.getElementById("detailStep");
const detailTitle = document.getElementById("detailTitle");
const detailWhat = document.getElementById("detailWhat");
const detailTools = document.getElementById("detailTools");
const detailKey = document.getElementById("detailKey");

let activeIndex = -1;

function selectNode(index) {
  // 如果点击的是已选中的节点，取消选择
  if (activeIndex === index) {
    deselectAll();
    return;
  }

  // 取消上一个选中
  nodes.forEach((n) => n.classList.remove("active"));

  // 选中当前
  nodes[index].classList.add("active");
  activeIndex = index;

  // 更新详情面板
  const data = nodeData[index];
  detailStep.textContent = data.step;
  detailTitle.textContent = data.title;
  detailWhat.textContent = data.what;
  detailTools.textContent = data.tools;
  detailKey.textContent = data.key;
  detailPanel.classList.add("open");
}

function deselectAll() {
  nodes.forEach((n) => n.classList.remove("active"));
  activeIndex = -1;
  detailPanel.classList.remove("open");
}

nodes.forEach((node, index) => {
  node.addEventListener("click", () => selectNode(index));
});

// ==========================================
// 4. 自动演示
// ==========================================
let autoPlayTimer = null;

document.getElementById("autoPlayBtn").addEventListener("click", () => {
  // 清除之前的定时器
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }

  let step = 0;
  selectNode(step);

  autoPlayTimer = setInterval(() => {
    step++;
    if (step >= nodeData.length) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
      return;
    }
    selectNode(step);
  }, 2200);
});

// ==========================================
// 5. 重置
// ==========================================
document.getElementById("resetBtn").addEventListener("click", () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
  deselectAll();
});
