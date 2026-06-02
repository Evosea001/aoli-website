# 🌌 李大海 — AI视觉设计作品集

> AI视觉设计师 · Blender三维动态 · AI辅助编程实践者  
> 暗色蓝紫宇宙主题 · 星空粒子Canvas背景 · 纯静态交互网站

---

## 📖 项目简介

这是李大海的个人作品集静态网站，以**暗色蓝紫宇宙风格**为视觉基调，配合星空粒子 Canvas 动态背景，全面展示在 AI 视觉设计、Blender 三维动态、平台内容策略以及 AI 辅助编程方面的能力与作品。

网站由作者（零编程基础起步）与 AI（Claude Code）结对编程独立完成，包含 6 个独立页面、5 个交互工具以及 1 个全栈 AI 创意引擎项目。**这个网站本身就是"AI Native 创作者工作方式"的最佳案例。**

**在线预览：** [https://aoli-website.netlify.app](https://aoli-website.netlify.app)（部署后替换）

---

## 🎨 作品集内容章节

### 01 · AI视觉项目
展示校企合作与个人视觉方向的 AI 图像生成作品。

- **华为高校动态壁纸设计** — 与华为合作的校企项目。结合云南民族文化，运用 AI + Blender 制作适配多终端（手机/折叠屏/桌面/车机）的动态壁纸方案。包含完整的灵感来源 → 视觉策略 → AI 工作流展示。
- **智舱光域 — 车机壁纸方案** — 通过 AI 建立光弧、地平线、夜景等视觉方向，验证横向构图与多屏延展。

### 02 · 动态视频项目
以毕业设计「山茶花动态视觉设计」为核心，展示从 AI 概念生成、Blender 三维制作到最终成片的完整创作链路。包含动态设计策略、视觉系统拆解和关键帧序列。

### 03 · 平台内容理解
探讨同一份视觉内容在不同平台（小红书、抖音、B站、视频号）的差异化包装策略。包含翻转卡片交互、内容执行思路（选题→封面→结构→发布→复盘）。

### 04 · AI创意实验
使用 ChatGPT image2、Midjourney、可灵等工具进行的创意探索合集，包含：

| 类别 | 内容 |
|------|------|
| 角色视觉设计 | AI 角色概念设计与风格迭代 |
| 分镜设计 | 文字脚本 → AI 生成构图 → 镜头编排 |
| 广告IP炫彩视觉 | 品牌 IP 形象与炫彩配色方案 |
| 产品AI视频分镜 | 产品广告创意可视化 |
| 品牌护肤广告视频 | 完整广告分镜与视频成片 |
| 游戏视频创作（新增） | 日系战斗风格短片 · 完整 AIGC 导演管线 |

### 05 · AI 创意引擎（全栈项目）
基于 Next.js + TypeScript + DeepSeek API 独立开发的全栈 AI 创意工具。输入粗略想法，AI 自动扩写为专业级图像提示词、视频分镜脚本或品牌设计简报。支持三种专业生成模式（图像提示词 / 视频脚本 / 设计简报），串联 DeepSeek → ChatGPT → Seedance 2.0 多模态管线。

### 关于我
个人定位、教育背景（云南艺术学院 · 数字媒体艺术）、技能矩阵、建站故事、成长时间线（AI工具使用者 → AI视觉创作者 → AI编程实践者）。

---

## 🛠️ 交互工具列表及说明

网站包含 5 个交互式子工具，均可在主站导航栏或"更多工具"区域访问：

| 工具 | 子页面 | 说明 |
|------|--------|------|
| **Prompt 卡片生成器** | `prompt-card/` | 输入 AI 参数实时生成精美展示卡片。支持正向/负向提示词、模型选择（SD/ComfyUI/Midjourney/DALL·E 3）、分辨率、Steps/CFG/Seed 参数调节、风格标签、4 套配色主题（暗紫/金黑/青蓝/玫红），可直接截图分享。 |
| **多终端动态预览** | `wallpaper-preview/` | 手机/折叠屏/桌面/车机四种设备模拟，实时播放动态壁纸。悬停设备查看详情，点击放大全屏播放。独立展示华为动态壁纸项目。 |
| **AI 工作流节点图** | `workflow-graph/` | 交互式 5 节点流程图（需求理解 → 灵感探索 → 风格控制 → Blender → 动态落地），点击节点查看详情面板，支持自动演示播放。SVG 连接线 + 流动粒子动画。 |
| **AI 色彩析出工具** | `color-extractor/` | 纯前端实现的色彩提取工具。拖入或点击上传图片，使用 Median Cut 算法自动提取 8 个主色调，点击色块复制 HEX 色值。图片不会上传到任何服务器。 |
| **AI 创意实验** | `creative-lab/` | 6 大创意类别的完整展示页面，含成果图、过程迭代、个人思考。侧边导航跳转，内嵌视频播放与灯箱浏览。 |

---

## 📁 目录结构

```
aoli-website/
├── index.html                    # 主站首页（884行 · 含完整作品集内容）
├── LICENSE                       # 许可证
├── 简历.jpg                      # 个人简历
├── 全栈测试API.txt               # ⚠️ API Key 已移除
├── 搭建.txt                      # ⚠️ API Key 已移除
│
├── css/
│   ├── style.css                 # 主样式（暗色蓝紫主题 · 星空 · 设备模拟 · 灯箱等）
│   └── enhancements.css          # 增强样式（覆盖/补充）
│
├── js/
│   └── main.js                   # 主脚本（星空粒子Canvas · 滚动动画 · 灯箱 · 交互）
│
├── images/                       # 图片资源（~120+ 文件）
│   ├── slide*.{png,jpg,jpeg}     # 各章节幻灯片/展示图
│   ├── guoc*.png                 # 建站过程截图
│   ├── j*.png                    # AI创意引擎界面截图
│   ├── 角色视觉设计/             # 角色概念设计图集
│   ├── 分镜设计/                 # 分镜设计图集
│   ├── 广告IP形象/               # IP炫彩视觉图集
│   ├── 产品AI视频分镜/           # 产品视频分镜图集
│   ├── 品牌护肤广告/             # 护肤广告图集
│   └── 游戏视频创作/             # 游戏角色与场景设定
│
├── videos/                       # 视频文件 ⚠️ 单个文件较大
│   ├── 动态壁纸.mp4              # 华为动态壁纸展示（被多个页面引用）
│   ├── 毕设.mp4                  # 山茶花毕业设计
│   ├── 护肤类.mp4                # 护肤品牌广告
│   └── 游戏类.mp4                # 日系战斗短片
│
├── prompt-card/                  # 🛠️ Prompt卡片生成器
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── wallpaper-preview/            # 🛠️ 多终端动态预览（独立页）
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── workflow-graph/               # 🛠️ AI工作流节点图
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── color-extractor/              # 🛠️ AI色彩析出工具
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── creative-lab/                 # 🛠️ AI创意实验（完整展示页）
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── ai-image-lab/                 # AI创意引擎（Next.js全栈项目，非静态）
    └── 启动.bat                  # 本地启动脚本
```

---

## 🚀 部署方式

本项目是**纯静态网站**（HTML + CSS + JavaScript），无需构建工具，可直接部署到 Netlify 或 GitHub Pages。

### 部署到 Netlify（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Netlify](https://app.netlify.com/) → **Add new site** → **Import an existing project**
3. 选择对应的 GitHub 仓库
4. 部署设置保持默认即可：
   - **Branch:** `main`
   - **Base directory:** 留空
   - **Publish directory:** `/`
   - **Build command:** 留空（纯静态，无需构建）
5. 点击 **Deploy site**，等待部署完成
6. （可选）自定义域名 → **Site settings** → **Domain management**

### 部署到 GitHub Pages

1. 进入 GitHub 仓库 → **Settings** → **Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 `main`，目录选择 `/ (root)`
4. 点击 **Save**
5. 等待几分钟后访问 `https://<用户名>.github.io/aoli-website/`

> ⚠️ 注意：`ai-image-lab/` 目录是 Next.js 全栈项目，**不包含在此静态部署中**。如需部署该工具，请单独配置 Node.js 构建环境。

---

## ⚠️ 注意事项

### 1. 视频文件较大

`videos/` 目录下的 `.mp4` 文件体积较大（单个可能数 MB 到数十 MB），部署时请注意：

- **Netlify** 免费版单文件上限 10MB，建议将视频压缩至 10MB 以下，或使用外部 CDN 托管
- **GitHub Pages** 同样建议控制仓库体积（推荐 < 1GB）
- **优化建议：** 使用 [HandBrake](https://handbrake.fr/) 压缩视频：H.265 编码、降低码率、缩小分辨率至 1080p
- 视频已使用 `loading="lazy"` 和 `preload="metadata"` 延迟加载
- Canvas 星空粒子动画在低性能设备上可考虑降低粒子数量（`js/main.js` 中调整 `STAR_COUNT`）

### 2. 敏感信息已移除

以下文件已移除其中的 API Key 等敏感信息，仅保留说明文本：

- `全栈测试API.txt` — 内容已清除，仅保留注释提醒
- `搭建.txt` — 内容已清除，仅保留注释提醒

请在提交代码前，确保没有其他文件包含以下敏感信息：
- API Key / Token
- 数据库连接字符串
- 私钥 / 密码
- 个人手机号（注：主页 `index.html` 中已公开的联系电话和邮箱为作者主动公开发布的信息）

### 3. CSS / JS 优化建议

- **CSS 合并：** 目前 `style.css` 和 `enhancements.css` 分离，部署前可合并为一个文件以减少 HTTP 请求
- **CSS 压缩：** 建议使用 [cssnano](https://cssnano.co/) 或在线工具压缩 CSS
- **JS 压缩：** 建议使用 [Terser](https://terser.org/) 或在线工具压缩 `main.js`
- **图片优化：** 大量 `slide*.png` 文件可转换为 WebP 格式（减小 60-80% 体积），需同时保留 `<picture>` 元素做 fallback
- **字体：** 目前使用 Google Fonts（Inter），可考虑预加载（已使用 `preconnect`）或自托管字体文件
- **缓存策略：** 部署后建议配置强缓存（immutable）对图片、CSS、JS 等静态资源

### 4. 浏览器兼容性

- 推荐使用 Chrome / Edge / Firefox 最新版本
- Canvas 星空粒子基于 `requestAnimationFrame`，对低版本浏览器兼容性有限
- 部分 CSS 特性（`backdrop-filter`、`@scroll-timeline` 等）在老旧浏览器中可能不生效

### 5. 版权说明

- 本作品集中的所有视觉作品版权归作者李大海所有
- 华为相关项目展示已获得校企合作授权
- 作品集网站代码采用 MIT 许可证（详见 `LICENSE` 文件）

---

## 🧑‍💻 关于作者

**李大海** — 云南艺术学院 · 数字媒体艺术 · 2026 届

从 AI 工具使用者到 AI 视觉创作者，再到 AI 编程实践者。通过 AI 协作从零掌握 HTML/CSS/JS，独立搭建本作品集网站及多个交互工具。独立开发「AI 创意引擎」全栈应用（Next.js + TypeScript + DeepSeek API）。

- 📧 邮箱：ldh2932309813@163.com
- 📱 电话：19106187419

---

*最后更新：2026 年 6 月*
