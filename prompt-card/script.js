/**
 * AI Prompt 卡片生成器 — 交互逻辑
 * 实时更新卡片 + 随机填充 + 配色切换 + 标签选择
 */

// 所有 DOM 引用
const promptInput = document.getElementById("promptInput");
const negativeInput = document.getElementById("negativeInput");
const modelSelect = document.getElementById("modelSelect");
const resolutionSelect = document.getElementById("resolutionSelect");
const stepsSlider = document.getElementById("stepsSlider");
const cfgSlider = document.getElementById("cfgSlider");
const seedInput = document.getElementById("seedInput");
const stepsVal = document.getElementById("stepsVal");
const cfgVal = document.getElementById("cfgVal");
const tagGroup = document.getElementById("tagGroup");
const themeSwitcher = document.getElementById("themeSwitcher");
const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");

// 卡片 DOM
const promptCard = document.getElementById("promptCard");
const cardModel = document.getElementById("cardModel");
const cardPrompt = document.getElementById("cardPrompt");
const cardNegative = document.getElementById("cardNegative");
const cardTags = document.getElementById("cardTags");
const cardSteps = document.getElementById("cardSteps");
const cardCfg = document.getElementById("cardCfg");
const cardSeed = document.getElementById("cardSeed");
const cardSize = document.getElementById("cardSize");

// ==========================================
// 1. 实时更新卡片
// ==========================================
function updateCard() {
  // 更新文字
  cardModel.textContent = modelSelect.value;
  cardPrompt.textContent = promptInput.value || "在这里输入你的Prompt...";
  cardNegative.textContent = negativeInput.value;
  cardSteps.textContent = stepsSlider.value;
  cardCfg.textContent = cfgSlider.value;
  cardSeed.textContent = seedInput.value;
  cardSize.textContent = resolutionSelect.value;

  // 当无内容时降低透明度
  if (!negativeInput.value.trim()) {
    cardNegative.style.display = "none";
  } else {
    cardNegative.style.display = "";
  }

  // 更新风格标签
  const activeTags = document.querySelectorAll(".tag.active");
  cardTags.innerHTML = "";
  activeTags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag.dataset.tag;
    cardTags.appendChild(span);
  });
}

// 绑定输入事件 — 任何改动都实时刷新卡片
[
  promptInput, negativeInput, modelSelect, resolutionSelect,
  stepsSlider, cfgSlider, seedInput,
].forEach((el) => {
  el.addEventListener("input", updateCard);
  el.addEventListener("change", updateCard);
});

// 滑杆同步显示数值
stepsSlider.addEventListener("input", () => { stepsVal.textContent = stepsSlider.value; });
cfgSlider.addEventListener("input", () => { cfgVal.textContent = cfgSlider.value; });

// ==========================================
// 2. 风格标签切换
// ==========================================
tagGroup.addEventListener("click", (e) => {
  if (e.target.classList.contains("tag")) {
    e.target.classList.toggle("active");
    updateCard();
  }
});

// ==========================================
// 3. 配色切换
// ==========================================
themeSwitcher.addEventListener("click", (e) => {
  if (e.target.classList.contains("theme-dot")) {
    // 移除旧主题
    promptCard.classList.remove("theme-purple", "theme-gold", "theme-cyan", "theme-rose");
    // 添加新主题
    const theme = e.target.dataset.theme;
    promptCard.classList.add("theme-" + theme);
    // 激活态
    document.querySelectorAll(".theme-dot").forEach((d) => d.classList.remove("active"));
    e.target.classList.add("active");
  }
});

// ==========================================
// 4. 随机填充
// ==========================================
const randomPresets = [
  {
    prompt: "东方幻想, 山茶花绽放, 半透明花瓣, 柔和冷光, 中心对称构图, 蓝紫渐变背景, 8K精致细节",
    negative: "模糊, 噪点, 变形花瓣, 杂乱背景, 过曝",
    model: "Stable Diffusion",
    steps: 28,
    cfg: 7.5,
    seed: 384729102,
    resolution: "768×1344",
    tags: ["东方幻想", "柔和光感", "奇幻"],
  },
  {
    prompt: "cyberpunk cityscape at night, neon reflections on wet streets, volumetric fog, cinematic lighting, ultra detailed, octane render",
    negative: "daylight, bright sky, cartoon, low quality, blurry",
    model: "ComfyUI",
    steps: 35,
    cfg: 12,
    seed: 872361094,
    resolution: "1344×768",
    tags: ["赛博朋克", "电影感", "暗黑"],
  },
  {
    prompt: "minimalist interior design, warm sunlight through sheer curtains, soft shadows, beige and cream tones, photorealistic, archviz",
    negative: "clutter, dark, messy, oversaturated, people",
    model: "DALL·E 3",
    steps: 40,
    cfg: 9,
    seed: 555123789,
    resolution: "1024×1024",
    tags: ["极简", "电影感"],
  },
  {
    prompt: "vintage oil painting style, woman in flowing dress in a flower field, impressionist brushstrokes, golden hour glow, Monet inspired",
    negative: "modern, photography, sharp lines, digital art style",
    model: "Midjourney",
    steps: 25,
    cfg: 5,
    seed: 128491632,
    resolution: "768×1344",
    tags: ["复古", "奇幻", "柔和光感"],
  },
];

function randomFill() {
  const preset = randomPresets[Math.floor(Math.random() * randomPresets.length)];

  promptInput.value = preset.prompt;
  negativeInput.value = preset.negative;
  modelSelect.value = preset.model;
  stepsSlider.value = preset.steps;
  stepsVal.textContent = preset.steps;
  cfgSlider.value = preset.cfg;
  cfgVal.textContent = preset.cfg;
  seedInput.value = preset.seed;
  resolutionSelect.value = preset.resolution;

  // 重置标签
  document.querySelectorAll(".tag").forEach((tag) => {
    tag.classList.toggle("active", preset.tags.includes(tag.dataset.tag));
  });

  // 随机配色
  const themes = ["purple", "gold", "cyan", "rose"];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  promptCard.classList.remove("theme-purple", "theme-gold", "theme-cyan", "theme-rose");
  promptCard.classList.add("theme-" + randomTheme);
  document.querySelectorAll(".theme-dot").forEach((d) => {
    d.classList.toggle("active", d.dataset.theme === randomTheme);
  });

  updateCard();
}

randomBtn.addEventListener("click", randomFill);

// ==========================================
// 5. 重置
// ==========================================
function resetAll() {
  promptInput.value = "";
  negativeInput.value = "";
  modelSelect.value = "Stable Diffusion";
  stepsSlider.value = 20;
  stepsVal.textContent = "20";
  cfgSlider.value = 7;
  cfgVal.textContent = "7";
  seedInput.value = "-1";
  resolutionSelect.value = "768×1344";

  document.querySelectorAll(".tag").forEach((t) => t.classList.remove("active"));

  promptCard.classList.remove("theme-gold", "theme-cyan", "theme-rose");
  promptCard.classList.add("theme-purple");
  document.querySelectorAll(".theme-dot").forEach((d) => {
    d.classList.toggle("active", d.dataset.theme === "purple");
  });

  updateCard();
}

resetBtn.addEventListener("click", resetAll);

// ==========================================
// 6. 初始状态
// ==========================================
promptInput.value = "东方幻想, 山茶花, 半透明花瓣, 柔和光感, 中心构图";
document.querySelector('.tag[data-tag="东方幻想"]').classList.add("active");
document.querySelector('.tag[data-tag="柔和光感"]').classList.add("active");
updateCard();
