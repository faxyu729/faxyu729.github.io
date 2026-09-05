# 從零建立並部署 GitHub 個人網站：React、Vite 與 GitHub Pages 完整手冊

> 本手冊適合第一次建立個人網站的學生。完成後，你會擁有一個使用 React 與 Vite 製作、由 GitHub Actions 自動建置，並發布在 `https://你的帳號.github.io/` 的個人網站。

本文件以「流光檔案館」的實際開發與部署經驗為基礎，並參考 `linyoulun/apple.com` 教學專案的分階段實作、驗收與 GitHub Pages 流程。重點不是複製任何網站，而是學會從需求、實作、測試到公開部署的完整方法。

## 目錄

1. [最後會完成什麼](#1-最後會完成什麼)
2. [先理解網站如何上線](#2-先理解網站如何上線)
3. [準備帳號與開發工具](#3-準備帳號與開發工具)
4. [規劃網站內容](#4-規劃網站內容)
5. [建立 React 與 Vite 專案](#5-建立-react-與-vite-專案)
6. [理解專案結構](#6-理解專案結構)
7. [完成第一版個人網站](#7-完成第一版個人網站)
8. [加入樣式與響應式設計](#8-加入樣式與響應式設計)
9. [管理圖片與公開素材](#9-管理圖片與公開素材)
10. [設定 SEO 與社群預覽](#10-設定-seo-與社群預覽)
11. [本機測試與正式版預覽](#11-本機測試與正式版預覽)
12. [建立 Git 版本紀錄](#12-建立-git-版本紀錄)
13. [建立 GitHub 個人網站 repository](#13-建立-github-個人網站-repository)
14. [設定 GitHub Actions 自動部署](#14-設定-github-actions-自動部署)
15. [第一次部署與線上驗收](#15-第一次部署與線上驗收)
16. [日後更新網站的標準流程](#16-日後更新網站的標準流程)
17. [分支與 Pull Request 協作流程](#17-分支與-pull-request-協作流程)
18. [效能、動效與無障礙原則](#18-效能動效與無障礙原則)
19. [常見錯誤與處理方式](#19-常見錯誤與處理方式)
20. [完整驗收清單](#20-完整驗收清單)
21. [常用指令速查](#21-常用指令速查)

## 1. 最後會完成什麼

完成本手冊後，專案會具備以下能力：

- 使用 React 元件管理首頁、關於我、作品與聯絡區塊。
- 使用 Vite 提供快速開發伺服器與正式版建置。
- 桌面、平板與手機都能正常閱讀。
- 圖片、PDF、favicon 與社群預覽圖能正確載入。
- Git 保存每次修改紀錄。
- GitHub 保存遠端程式碼。
- GitHub Actions 在每次推送後自動執行建置與部署。
- 網站發布在 `https://你的帳號.github.io/`。
- 能從 Actions 紀錄判斷部署成功或失敗。

## 2. 先理解網站如何上線

整體流程如下：

```text
在本機修改 src/
        ↓
npm run build
        ↓
Vite 產生 dist/
        ↓
git commit + git push
        ↓
GitHub Actions 重新執行 npm ci 與 npm run build
        ↓
GitHub Pages 發布 dist/
        ↓
訪客開啟 https://你的帳號.github.io/
```

幾個重要觀念：

- `npm run dev` 是開發模式，只能讓你在自己的電腦預覽。
- `npm run build` 才會產生適合公開部署的正式檔案。
- `dist/` 是建置結果，不是主要原始碼。
- GitHub Pages 不會替你執行 React 原始碼；GitHub Actions 先把 React 編譯成靜態 HTML、CSS 與 JavaScript，再交給 Pages。
- GitHub 登入、Git commit 作者與 Git remote 是三件不同的事，應分別檢查。

## 3. 準備帳號與開發工具

### 3.1 建立 GitHub 帳號

前往 [GitHub](https://github.com/) 註冊帳號。帳號名稱會成為個人網站網址的一部分，例如帳號是 `sampleuser`，網站網址就是：

```text
https://sampleuser.github.io/
```

帳號名稱建議簡短、容易辨識，並避免日後頻繁更改。

### 3.2 安裝 Node.js

前往 [Node.js 官方網站](https://nodejs.org/) 安裝目前的 LTS 版本。不要使用過舊版本，也不要用 `--force` 忽略套件的 Node 版本要求。

安裝後重新開啟終端機並執行：

```bash
node -v
npm -v
```

兩個指令都應顯示版本號。

### 3.3 安裝 Git

macOS 可先確認系統是否已有 Git：

```bash
git --version
```

Windows 建議安裝 [Git for Windows](https://git-scm.com/download/win)，或使用 WSL。Linux 可透過系統套件管理器安裝，例如 Ubuntu：

```bash
sudo apt update
sudo apt install -y git
```

### 3.4 安裝編輯器

可以使用 VS Code、OpenCode 或其他熟悉的編輯工具。無論使用哪一種工具，都應直接在專案根目錄開啟，避免 AI 或編輯器修改到錯誤資料夾。

### 3.5 選用：安裝 GitHub CLI

GitHub CLI 的指令是 `gh`，可用來登入、建立 repository、建立 Pull Request 與查看 Actions。

安裝後執行：

```bash
gh auth login
gh auth status
```

若不使用 `gh`，也可以在 GitHub 網頁完成相同操作。

### 3.6 設定 Git 作者資料

第一次 commit 前檢查：

```bash
git config --global user.name
git config --global user.email
```

若沒有資料，設定自己的名稱與 GitHub 信箱：

```bash
git config --global user.name "你的名稱"
git config --global user.email "你的 GitHub 信箱"
```

如果使用 GitHub 的私人轉寄信箱，請到 GitHub 的 Email settings 查看正確地址。

### 3.7 設定 GitHub 推送驗證

GitHub 已不接受帳號密碼作為 Git push 的驗證方式。已安裝 GitHub CLI 時，推薦執行：

```bash
gh auth login
gh auth setup-git
gh auth status
```

沒有使用 `gh` 時，可以使用 Git Credential Manager、SSH key 或具有適當權限的 Personal Access Token。不要把 token 寫進 remote URL、程式碼或教學截圖。

## 4. 規劃網站內容

不要一開始就堆疊動畫。先寫出網站的核心目標、訪客與內容。

### 4.1 最小內容規格

一個基本個人網站至少可以包含：

| 區塊 | 目的 | 建議內容 |
|---|---|---|
| 首頁 Hero | 讓訪客立刻知道你是誰 | 姓名、專業方向、一句定位 |
| 關於我 | 建立背景與可信度 | 學校、技能、興趣、目標 |
| 作品 | 展示具體成果 | 圖片、作品名稱、說明、連結 |
| 聯絡 | 讓訪客能找到你 | Email、GitHub、其他公開連結 |
| Footer | 補充網站資訊 | 年份、姓名、返回頂端 |

### 4.2 先建立規格文件

可新增 `docs/規格.md`：

```markdown
# 個人網站規格

## 目標

讓老師、同學與未來合作對象在三分鐘內了解我的背景與作品。

## 視覺

- 主色：深藍與淡紫。
- 背景：淺色。
- 語氣：清楚、專業、不浮誇。

## 區塊

1. 首頁
2. 關於我
3. 精選作品
4. 聯絡方式

## 驗收

- 390px 手機寬度沒有水平捲動。
- 所有圖片有替代文字。
- 所有連結可以操作。
- npm run build 成功。
```

規格的作用是讓「好看」變成可以驗收的條件。

### 4.3 使用 AI 時的需求格式

推薦用以下六個部分描述需求：

```text
角色＋背景＋目標＋限制＋交付＋驗收
```

範例：

```text
你是熟悉 React 與響應式設計的前端工程師。

背景：我要建立一個繁體中文學生作品集，使用 Vite 與 React。
目標：完成首頁、關於我、三份作品與聯絡區塊。
限制：不使用真實品牌素材；手機不可水平捲動；動效必須支援 reduced motion。
交付：實作網站並列出修改的檔案。
驗收：執行 npm run build，並說明仍需人工檢查的項目。
```

## 5. 建立 React 與 Vite 專案

### 5.1 使用 Vite 建立專案

在你想存放網站的資料夾執行：

```bash
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install
```

`my-portfolio` 是本機資料夾名稱，不一定要和 GitHub repository 相同。

### 5.2 啟動開發伺服器

```bash
npm run dev
```

終端機通常會顯示：

```text
Local: http://localhost:5173/
```

打開終端機實際提供的網址。若 5173 已被使用，Vite 可能改用其他 port，這不是錯誤。

停止伺服器時按 `Ctrl+C`。

### 5.3 第一個建置檢查

在修改預設頁面前先確認工具鏈正常：

```bash
npm run build
```

成功後會產生 `dist/`。若此時就失敗，應先處理 Node、套件或 Vite 問題，不要繼續加入更多功能。

## 6. 理解專案結構

建議結構如下：

```text
my-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages 自動部署
├── docs/
│   ├── 規格.md
│   └── GitHub個人網站建置手冊.md
├── public/
│   ├── favicon.svg
│   ├── og.png
│   └── works/
├── src/
│   ├── components/          # 可重用畫面元件
│   ├── hooks/               # React hooks
│   ├── lib/                 # 純函式與測試
│   ├── App.jsx              # 全頁內容與元件排列
│   ├── content.js           # 個人資料與作品內容
│   ├── main.jsx             # React 入口
│   └── styles.css           # 全站樣式
├── .gitignore
├── index.html               # metadata 與 React 掛載點
├── package.json             # 套件與 npm scripts
├── package-lock.json        # 精確套件版本
└── vite.config.js           # Vite 設定
```

核心資料流：

```text
content.js 提供資料
        ↓
App.jsx 排列頁面
        ↓
components 輸出結構
        ↓
styles.css 決定視覺與版型
        ↓
main.jsx 將 App 掛載到 index.html 的 #root
```

## 7. 完成第一版個人網站

以下是最小可用範例。實際專案可再拆成元件，不必把所有內容永遠放在一個檔案。

### 7.1 建立 `src/App.jsx`

```jsx
const works = [
  {
    title: '作品一',
    description: '說明你解決了什麼問題，以及使用哪些技術。',
    href: 'https://github.com/你的帳號/作品-repo',
  },
  {
    title: '作品二',
    description: '說明你的角色、製作過程與最後成果。',
    href: '#',
  },
]

export default function App() {
  return (
    <>
      <header className="site-nav">
        <a className="brand" href="#home">你的名字</a>
        <nav aria-label="主要導覽">
          <a href="#about">關於我</a>
          <a href="#works">作品</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <p className="eyebrow">學生 · 前端開發 · 持續學習</p>
          <h1>你好，我是你的名字。</h1>
          <p>我把想法整理成清楚、可操作的數位作品。</p>
          <a className="button" href="#works">查看作品</a>
        </section>

        <section id="about">
          <h2>關於我</h2>
          <p>在這裡寫你的背景、目前正在學習的技術與未來目標。</p>
        </section>

        <section id="works">
          <h2>精選作品</h2>
          <div className="work-grid">
            {works.map((work) => (
              <article className="work-card" key={work.title}>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <a href={work.href}>查看作品</a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2>聯絡我</h2>
          <a href="mailto:you@example.com">you@example.com</a>
        </section>
      </main>

      <footer>© 2026 你的名字</footer>
    </>
  )
}
```

請把範例姓名、Email、作品與年份換成自己的資料，不要直接發布占位文字。

### 7.2 確認 `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 7.3 確認 `index.html` 掛載點

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

`main.jsx` 尋找的 `root` 必須與 `index.html` 的 `id="root"` 完全相同。

## 8. 加入樣式與響應式設計

可從以下 `src/styles.css` 開始：

```css
:root {
  font-family: Inter, "Noto Sans TC", system-ui, sans-serif;
  color: #18263a;
  background: #f7f9fc;
  font-synthesis: none;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}

a {
  color: inherit;
}

.site-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 8%;
}

.site-nav nav {
  display: flex;
  gap: 24px;
}

.brand {
  font-weight: 700;
  text-decoration: none;
}

section {
  padding: 96px 8%;
}

.hero {
  min-height: 85vh;
  display: grid;
  align-content: center;
  gap: 20px;
  background: linear-gradient(135deg, #f8fafc, #e8f1ff);
}

.hero h1 {
  max-width: 850px;
  margin: 0;
  font-size: clamp(48px, 8vw, 100px);
  line-height: 1.05;
}

.eyebrow {
  color: #52657d;
  letter-spacing: 0.12em;
}

.button {
  width: fit-content;
  padding: 14px 20px;
  border-radius: 999px;
  color: white;
  background: #223b5b;
  text-decoration: none;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.work-card {
  padding: 28px;
  border: 1px solid #dce5f0;
  border-radius: 20px;
  background: white;
}

footer {
  padding: 32px 8%;
  border-top: 1px solid #dce5f0;
}

@media (max-width: 700px) {
  .site-nav nav {
    gap: 12px;
    font-size: 14px;
  }

  section {
    padding: 72px 6%;
  }

  .work-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

人工縮放瀏覽器或使用 DevTools 裝置模式檢查：

- 1440×900 桌面。
- 768×1024 平板。
- 390×844 手機。
- 360px 寬的小型手機。

任何尺寸都不應出現非預期的水平捲軸。

## 9. 管理圖片與公開素材

### 9.1 `public/` 的用途

放在 `public/` 的檔案會原樣複製到 `dist/`。例如：

```text
public/works/project-a.webp
```

使用者網站部署後的網址是：

```text
/works/project-a.webp
```

若 `vite.config.js` 的 `base` 是 `/portfolio/`，同一個檔案的正式網址會是 `/portfolio/works/project-a.webp`。因此 React 與 JavaScript 內應使用下一節的 `BASE_URL`，不要直接假設網站永遠位於網域根目錄。

### 9.2 使用 `BASE_URL` 組合素材路徑

若網站未來可能從使用者網站移到專案網站，推薦在 JavaScript 中使用 Vite 的 `BASE_URL`：

```js
const BASE = import.meta.env.BASE_URL

export const works = [
  {
    title: '作品一',
    image: `${BASE}works/project-a.webp`,
    pdf: `${BASE}works/project-a.pdf`,
  },
]
```

這樣 `base` 是 `/` 或 `/repository-name/` 時都能產生正確網址。

### 9.3 圖片最佳化

建議原則：

- 照片與作品縮圖優先使用 WebP 或 AVIF。
- 不要直接上傳數十 MB 的原始相機照片。
- 為圖片設定合理寬高，減少版面跳動。
- 首屏必要圖片可 eager 載入，其餘使用 `loading="lazy"`。
- 每張內容圖片都要有描述用途的 `alt`。
- 純裝飾圖片可使用空 `alt=""` 與 `aria-hidden="true"`。

React 圖片範例：

```jsx
<img
  src={`${import.meta.env.BASE_URL}works/project-a.webp`}
  alt="作品一的首頁畫面"
  width="1200"
  height="675"
  loading="lazy"
/>
```

### 9.4 不應提交的檔案

`.gitignore` 至少包含：

```gitignore
node_modules/
dist/
.env
.env.*
*.local
```

不要把 API key、密碼、私人憑證或 `.env` 上傳到 GitHub。前端網站內的任何資料最後都可能被訪客看到。

## 10. 設定 SEO 與社群預覽

修改 `index.html` 的 `<head>`：

```html
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f7f9fc" />
    <meta name="description" content="你的名字的個人作品集與學習紀錄。" />

    <meta property="og:title" content="你的名字｜個人作品集" />
    <meta property="og:description" content="查看我的作品與學習紀錄。" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://你的帳號.github.io/og.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="你的名字｜個人作品集" />
    <meta name="twitter:description" content="查看我的作品與學習紀錄。" />
    <meta name="twitter:image" content="https://你的帳號.github.io/og.png" />

    <link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />
    <title>你的名字｜個人作品集</title>
  </head>
```

`public/og.png` 建議使用 1200×630。`og:image` 應使用完整的 HTTPS 網址，因為社群爬蟲不一定能正確解析相對路徑。

專案網站必須把 repository 路徑放進完整 OG 網址。例如 repository 是 `portfolio`：

```html
<meta property="og:image" content="https://你的帳號.github.io/portfolio/og.png" />
<meta name="twitter:image" content="https://你的帳號.github.io/portfolio/og.png" />
```

Vite 會在建置 `index.html` 時將 `%BASE_URL%` 替換成 `vite.config.js` 的 `base`，因此適合 favicon 等 HTML 資產；社群預覽圖仍應使用包含實際網域與路徑的完整網址。

## 11. 本機測試與正式版預覽

### 11.1 開發模式

```bash
npm run dev
```

適合快速修改與 Hot Module Replacement，但不能代表正式部署一定正常。

### 11.2 正式建置

```bash
npm run build
```

建置成功通常會看到：

```text
dist/index.html
dist/assets/...
```

### 11.3 預覽正式建置

```bash
npm run preview
```

開啟終端機顯示的網址，通常是：

```text
http://localhost:4173/
```

正式版預覽可提早發現下列問題：

- 錯誤的圖片路徑。
- 只在 dev 模式正常的 import。
- 建置後才出現的 JavaScript 問題。
- 在大小寫敏感檔案系統上的檔名字母大小寫不一致。

Windows 與多數 macOS 磁碟預設不區分檔名大小寫，因此本機可能無法發現 `Image.png` 與 `image.png` 的差異。仍需查看 Linux Actions build 與正式網站的 Network 404。

### 11.4 自動測試

如果專案有純函式，可使用 Node 內建測試，不一定要先加入大型測試框架。

`package.json`：

```json
{
  "scripts": {
    "dev": "vite",
    "test": "node --test",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

執行：

```bash
npm test
npm run build
```

測試通過只代表被測邏輯正確；build 通過只代表可以編譯。視覺、鍵盤操作與手機版仍需人工驗收。

## 12. 建立 Git 版本紀錄

本手冊從這裡開始以全新 repository 的標準預設分支 `main` 為例。若你正在維護既有 repository，請把所有 `main` 換成 GitHub 顯示的實際預設分支；branch 名稱必須完全一致。

可在 GitHub repository 首頁查看預設分支，或執行：

```bash
git remote show origin
git branch --show-current
```

例如本手冊所屬的既有網站使用自訂分支 `faxyu729個人網站` 部署，不能直接套用 `main` 而不修改 workflow。

### 12.1 初始化 Git

```bash
git init
git branch -M main
```

### 12.2 提交前檢查

```bash
git status --short
git diff
```

確認沒有 `.env`、密碼、大型暫存檔與不相關修改。

### 12.3 建立第一個 commit

```bash
git add .
git status --short
git commit -m "feat: create personal portfolio"
```

常用 commit 類型：

| 類型 | 用途 | 範例 |
|---|---|---|
| `feat` | 新功能 | `feat: add works section` |
| `fix` | 修正問題 | `fix: correct image paths` |
| `perf` | 效能改善 | `perf: reduce scroll rendering cost` |
| `docs` | 文件修改 | `docs: add deployment guide` |
| `ci` | 部署流程 | `ci: deploy site to github pages` |
| `style` | 不影響功能的格式或視覺 | `style: align work cards` |

## 13. 建立 GitHub 個人網站 repository

### 13.1 使用者網站與專案網站的差異

GitHub Pages 有兩種常見網址：

| 類型 | Repository 名稱 | 網址 | Vite `base` |
|---|---|---|---|
| 使用者網站 | `username.github.io` | `https://username.github.io/` | `/` |
| 專案網站 | 任意名稱，例如 `portfolio` | `https://username.github.io/portfolio/` | `/portfolio/` |

若目標是 GitHub 個人首頁，repository 必須精確命名為：

```text
你的GitHub帳號.github.io
```

例如帳號是 `sampleuser`：

```text
sampleuser.github.io
```

大小寫與拼字都應和帳號一致。

### 13.2 在 GitHub 網頁建立 repository

1. 登入 GitHub。
2. 點右上角 `+`。
3. 選擇 `New repository`。
4. Repository name 輸入 `你的帳號.github.io`。
5. 建議選擇 Public。
6. 不勾選自動建立 README、`.gitignore` 或 License，避免和本機第一個 commit 衝突。
7. 點 `Create repository`。

### 13.3 設定 remote 並推送

將 `<你的帳號>` 替換成真實帳號：

```bash
git remote add origin https://github.com/<你的帳號>/<你的帳號>.github.io.git
git remote -v
git push -u origin main
```

如果出現 `remote origin already exists`：

```bash
git remote -v
git remote set-url origin https://github.com/<你的帳號>/<你的帳號>.github.io.git
git push -u origin main
```

### 13.4 使用 GitHub CLI 建立 repository

已登入 `gh` 時可改用：

```bash
gh repo create <你的帳號>.github.io --public --source=. --remote=origin --push
```

執行前仍應用 `git status` 確認提交內容。

## 14. 設定 GitHub Actions 自動部署

### 14.1 設定 Vite base

使用者網站的 `vite.config.js`：

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
})
```

若使用 Tailwind CSS Vite plugin：

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
```

專案網站則應設定：

```js
export default defineConfig({
  base: '/repository-name/',
  plugins: [react()],
})
```

`base` 設錯是 GitHub Pages 白畫面與素材 404 最常見的原因之一。

### 14.2 建立 workflow

建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

這份設定會：

1. 在每次 push 到 `main` 時啟動。
2. 下載 repository 原始碼。
3. 使用 `npm ci` 根據 `package-lock.json` 安裝精確版本。
4. 執行 `npm run build`。
5. 上傳 `dist/`。
6. 將 artifact 發布至 GitHub Pages。

Action 的主要版本會隨 GitHub 平台更新。未來若收到 Node runtime deprecated 警告，應查看各 Action 官方 release，分別升級 major version並重新驗證；不要只為消除警告而一次修改所有建置工具。

GitHub Pages 的標準必要權限是 `contents: read`、`pages: write` 與 `id-token: write`。只有 workflow 中的其他步驟明確需要建立一般 Deployment，或錯誤訊息要求時，才額外加入 `deployments: write`。

### 14.3 為什麼使用 `npm ci`

`npm ci` 適合 CI，因為它會嚴格依照 `package-lock.json` 安裝。如果 `package.json` 與 lockfile 不一致，workflow 會失敗，提醒你先在本機修正並提交 lockfile。

因此應將以下檔案一起提交：

```text
package.json
package-lock.json
```

不要提交：

```text
node_modules/
dist/
```

### 14.4 GitHub Pages 設定

在 repository 網頁中：

1. 進入 `Settings`。
2. 左側選擇 `Pages`。
3. 在 Build and deployment 的 Source 選擇 `GitHub Actions`。
4. 不要再選擇從某個 branch 的 `/docs` 發布，避免兩種部署方式互相混淆。

### 14.5 提交部署設定

```bash
npm test
npm run build
git status --short
git add .github/workflows/deploy.yml vite.config.js package.json package-lock.json
git commit -m "ci: deploy site to github pages"
git push
```

如果專案沒有測試 script，可以先執行 `npm run build`。

## 15. 第一次部署與線上驗收

### 15.1 查看 Actions

1. 打開 GitHub repository。
2. 點 `Actions`。
3. 選擇 `Deploy to GitHub Pages`。
4. 等待 build 與 deploy 都顯示綠色勾選。

使用 GitHub CLI：

```bash
gh run list --limit 5
gh run watch
```

若有多個 workflow，可先取得 run ID：

```bash
gh run list --workflow "Deploy to GitHub Pages" --limit 3
gh run watch <run-id> --exit-status
```

### 15.2 打開正式網站

使用者網站網址：

```text
https://你的帳號.github.io/
```

第一次部署完成後，CDN 可能需要短暫時間更新。不要在 workflow 還沒完成時就判斷部署失敗。

### 15.3 確認不是舊快取

如果 Actions 成功但畫面仍是舊版：

- 使用瀏覽器強制重新整理。
- 開啟無痕視窗。
- 在網址後暫時加入查詢字串，例如 `?v=2`。
- 查看 HTML 引用的 `/assets/index-xxxx.js` 是否已更換 hash。

### 15.4 線上必查項目

- 首頁回應正常，不是 404。
- JavaScript 與 CSS 回應正常。
- 圖片、favicon、PDF 與 OG 圖可以開啟。
- 章節錨點可以跳轉。
- 手機版沒有水平溢出。
- Browser Console 沒有未處理錯誤。
- Network 面板沒有大量紅色 404。

## 16. 日後更新網站的標準流程

每次修改建議依照以下順序：

```bash
git pull --ff-only
npm ci
npm run dev
```

一般同步專案使用 `npm ci`，可依 lockfile 重現相同依賴。只有主動新增、移除或升級套件時才使用 `npm install`，並檢查與提交合理的 `package-lock.json` 變更。

完成修改後：

```bash
npm test
npm run build
git status --short
git diff --check
git diff
git add <這次修改的檔案>
git commit -m "feat: describe the update"
git push
```

最後到 Actions 確認部署，再檢查正式網址。

不要養成以下習慣：

- 未看 `git diff` 就直接 `git add .`。
- 測試失敗仍然 push。
- 將 `.env`、密碼或 token commit。
- 只修改 `dist/`，卻沒有修改 `src/`。
- Actions 紅燈時反覆重新執行，不閱讀第一個錯誤。

## 17. 分支與 Pull Request 協作流程

網站只有自己維護時可直接使用 `main`。若希望保留審查與安全部署流程，建議使用功能分支。

### 17.1 建立分支

```bash
git switch main
git pull --ff-only
git switch -c feat/update-portfolio
```

### 17.2 修改、測試與推送

```bash
npm test
npm run build
git status --short
git diff
git add src public
git commit -m "feat: update portfolio projects"
git push -u origin feat/update-portfolio
```

### 17.3 建立 Pull Request

在 GitHub 網頁點 `Compare & pull request`，或使用：

```bash
gh pr create --base main --head feat/update-portfolio
```

PR 應說明：

- 修改了什麼。
- 為什麼修改。
- 執行了哪些測試。
- 哪些內容仍需人工檢查。

### 17.4 合併與部署

當 PR 合併到 workflow 監聽的 branch，例如 `main`，GitHub Pages 才會重新部署。

若 workflow 寫的是：

```yaml
on:
  push:
    branches: [main]
```

但 repository 的預設分支叫其他名稱，push 到其他分支不會自動部署。分支名稱必須完全一致，包括大小寫與非英文字符。

## 18. 效能、動效與無障礙原則

個人網站常見問題不是電腦太慢，而是每個 scroll frame 同時執行太多工作。

### 18.1 優先使用低成本動畫

通常較適合動畫：

```text
transform
opacity
```

成本較高且應節制：

```text
filter: blur(...)
filter: drop-shadow(...)
backdrop-filter
大型 clip-path
box-shadow 大範圍動畫
每幀更新 width、height、top、left
```

大型 Canvas、影格序列與模糊濾鏡同時更新時，容易造成嚴重滾動卡頓。

### 18.2 Scroll handler 原則

- Listener 使用 `{ passive: true }`，除非真的需要阻止預設捲動。
- 不要在每次 scroll 都無條件更新 React state。
- 多次事件可合併到一個 `requestAnimationFrame`。
- 動畫停止後應停止 RAF，不要讓空迴圈永久以 60fps 執行。
- Effect cleanup 必須移除 listener、observer、timer 與 RAF。
- 離開 viewport 的大型動畫應暫停載入與繪製。

### 18.3 影格序列原則

- 不要一次解碼全部高解析度影格。
- 只預載目標前後的小範圍影格。
- 設定快取上限。
- 離開畫面後釋放 bitmap。
- 快速跳到新進度時中止過期 fetch。
- 手機使用較低解析度素材。
- 沒有解碼影格時保留 poster，不要顯示空白 Canvas。

1200×1200 RGBA bitmap 解碼後約占：

```text
1200 × 1200 × 4 bytes ≈ 5.76 MB
```

即使 WebP 檔案只有數十 KB，解碼後的記憶體仍以像素計算。12 張影格就可能接近 69 MB。

### 18.4 支援減少動效

至少加入：

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

CSS media query 只能控制 CSS 動畫，不能自動停止 GSAP、Framer Motion、Canvas、timer、scroll listener 或 RAF。JavaScript 動效建立前也必須檢查系統偏好，例如：

```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

if (!reduceMotion.matches) {
  // 只在允許動效時建立 GSAP timeline、Canvas loop 或 RAF。
}
```

React 專案應監聽 media query 的 `change` 事件，或使用動畫函式庫提供的 reduced-motion API，在偏好改變時停止並清理既有動畫。複雜網站還應提供頁內動效開關。關閉動效後，內容仍必須完整可讀，不能只把元素停在 `opacity: 0`。

### 18.5 無障礙基本要求

- `<html lang="zh-Hant">` 正確標示語言。
- 每頁只有清楚的主要 `h1`，標題階層合理。
- 導覽使用 `<nav>` 並提供 label。
- 互動使用原生 `<button>` 或 `<a>`，不要只用可點擊 `<div>`。
- 鍵盤焦點清楚可見。
- 圖片有適合的 alt。
- 表單控制項有 label。
- 不只用顏色表達狀態。
- 手機觸控目標保持足夠大小。

### 18.6 用 Chrome DevTools 驗證

Performance 面板：

1. 開啟正式版網站。
2. 開啟 DevTools 的 Performance。
3. 開始錄製。
4. 從頂部穩定捲到頁尾。
5. 停止錄製。
6. 查看 FPS、Long task、Rendering、Paint 與 Layout。

Network 面板：

1. 勾選 Disable cache。
2. 重新整理。
3. 查看是否有 404。
4. 查看首頁是否一次下載過多大型素材。
5. 確認非首屏圖片延遲載入。

Lighthouse 可作為參考，但不要只追求單一分數。真實手機操作、鍵盤測試與內容正確性同樣重要。

## 19. 常見錯誤與處理方式

### 19.1 `npm: command not found`

原因：Node.js 未安裝或終端機尚未更新 PATH。

```bash
node -v
npm -v
```

重新安裝 Node LTS，完成後關閉並重開終端機。

### 19.2 `Missing script: dev`

原因：不在專案根目錄，或 `package.json` 沒有 script。

```bash
pwd
ls
npm pkg get scripts
```

目前資料夾應看得到 `package.json`。

### 19.3 `Unsupported engine`

原因：Node 版本低於 Vite 或其他套件要求。

```bash
node -v
npm view vite engines
```

優先升級 Node LTS，或依專案 lockfile 使用相容套件版本。不要直接使用 `--force`。

### 19.4 本機正常，GitHub Pages 白畫面

先查看 Browser Console 與 Network。最常見原因是 `vite.config.js` 的 `base` 不正確。

使用者網站：

```js
base: '/'
```

專案網站：

```js
base: '/repository-name/'
```

### 19.5 圖片或 PDF 404

常見原因：

- 檔案不在 `public/`。
- Git 沒有追蹤該檔案。
- 檔名大小寫不同。
- 專案網站使用了錯誤的根路徑。

檢查：

```bash
git status --short
git ls-files public
npm run build
```

Linux 與 GitHub Pages 會區分 `Image.png` 和 `image.png`。

### 19.6 GitHub Actions 的 `npm ci` 失敗

原因通常是 `package.json` 與 `package-lock.json` 不一致。

本機執行：

```bash
npm install
npm ci
npm run build
git status --short
```

若 lockfile 有合理變更，應一起 commit。

### 19.7 Workflow 沒有被觸發

檢查：

- workflow 是否位於 `.github/workflows/*.yml`。
- YAML 是否可解析。
- push 的 branch 是否和 `branches: [...]` 相同。
- workflow 是否已存在於遠端 branch。
- repository 的 Actions 是否被停用。

```bash
git branch --show-current
git remote -v
gh run list --limit 5
```

### 19.8 Actions 成功但網址仍是舊版

- 等待 Pages CDN 更新。
- 強制重新整理。
- 用無痕視窗。
- 確認最新 run 的 `headSha` 是剛合併的 commit。
- 確認 HTML 中的 hashed JS/CSS 檔名已改變。

### 19.9 `remote origin already exists`

```bash
git remote -v
git remote set-url origin https://github.com/<帳號>/<帳號>.github.io.git
```

不要先刪除 `.git`，這會失去本機版本歷史。

### 19.10 Push 被拒絕

遠端可能已有你本機沒有的 commit：

```bash
git fetch origin
git status --branch --short
git pull --rebase origin main
git push
```

如果出現衝突，應先理解衝突內容再解決。不要使用 `git push --force` 覆蓋遠端，除非你非常確定影響並已取得協作者同意。

### 19.11 Repository 名稱正確但個人網址 404

確認：

- Repository 名稱正好是 `<帳號>.github.io`。
- Actions 的 build 與 deploy 都成功。
- Settings → Pages 的 Source 是 GitHub Actions。
- Repository 沒有被改成無法使用 Pages 的狀態。
- 網址是 `https://帳號.github.io/`，不是多加 repository 名稱。

### 19.12 自訂網域

自訂網域是可選功能。先讓 `username.github.io` 正常，再設定 DNS 與 Pages Custom domain。

安全流程：

1. 向網域商購買網域。
2. 在 GitHub 帳號 Settings → Pages 驗證網域所有權。
3. 保留 GitHub 提供的 TXT 驗證紀錄，即使驗證完成也不要刪除。
4. 先在 repository Settings → Pages 填入 Custom domain。
5. 依 GitHub 官方文件設定 A、AAAA、ALIAS、ANAME 或 CNAME 紀錄。
6. 不要設定 wildcard DNS，例如 `*.example.com`。
7. 等待 DNS 生效後啟用 Enforce HTTPS。
8. 若停用 Pages 或移除自訂網域，立即移除仍指向 GitHub Pages 的 DNS 紀錄。

DNS 設定錯誤可能讓網站暫時無法開啟，因此不要在初次部署時同時處理所有問題。

### 19.13 密鑰已經被 commit 或 push

把檔案加入 `.gitignore` 或在下一個 commit 刪除，不能讓已公開的密鑰恢復安全。應依序處理：

1. 立刻到服務提供者撤銷或輪替 API key、token、密碼或憑證。
2. 從程式碼改用不會公開秘密的後端流程；純前端環境變數最後仍可能被打包給訪客。
3. 使用 `git rm --cached <檔案>` 停止追蹤本機仍需保留的秘密檔案。
4. 將檔案加入 `.gitignore`。
5. 若敏感資料必須從歷史移除，使用 GitHub 官方 sensitive data removal 流程並通知協作者重新同步。

即使完成 Git history rewrite，原密鑰仍必須撤銷，因為它可能已被 clone、快取或記錄。

## 20. 完整驗收清單

### 20.1 自動驗證

- [ ] `npm install` 或 `npm ci` 成功。
- [ ] `npm test` 全部通過，或專案清楚記錄尚未建立測試。
- [ ] `npm run build` 成功。
- [ ] `git diff --check` 沒有空白字元錯誤。
- [ ] GitHub Actions build 成功。
- [ ] GitHub Actions deploy 成功。

### 20.2 桌面與手機

- [ ] 1440×900 桌面版沒有文字遮擋。
- [ ] 768px 平板版面合理。
- [ ] 390×844 手機版沒有水平捲動。
- [ ] 360px 寬度仍能閱讀與操作。
- [ ] 圖片沒有不合理拉伸或裁切。
- [ ] 導覽不會遮住章節標題。

### 20.3 內容

- [ ] 姓名、學校、Email 與 GitHub 連結正確。
- [ ] 沒有 Vite 預設文字或占位內容。
- [ ] 每份作品都有名稱、說明與有效連結。
- [ ] 沒有未授權商標、圖片、字型或文案。
- [ ] 電話、住址等私人資料只在確定要公開時才放入。

### 20.4 可操作性

- [ ] 所有連結可以點擊。
- [ ] Email 使用 `mailto:`。
- [ ] 外部連結若開新分頁，有適當的 `rel="noreferrer"`。
- [ ] 只使用鍵盤也能操作導覽、按鈕與連結。
- [ ] 焦點樣式清楚可見。
- [ ] reduced motion 開啟後內容仍完整。

### 20.5 線上資源

- [ ] 首頁回應 HTTP 200。
- [ ] CSS 與 JavaScript 沒有 404。
- [ ] favicon 正常。
- [ ] OG 圖可以直接用完整網址開啟。
- [ ] 圖片與 PDF 正常。
- [ ] Console 沒有未處理錯誤。

### 20.6 效能

- [ ] 首屏沒有一次載入所有非必要圖片。
- [ ] 非首屏圖片使用 lazy loading。
- [ ] 沒有永久空轉的 RAF 或 timer。
- [ ] 捲動時沒有持續大量 Layout 與 Paint。
- [ ] 大型 Canvas、blur、drop-shadow 與 backdrop-filter 沒有疊加動畫。
- [ ] 離屏動畫會暫停或釋放資源。

## 21. 常用指令速查

### 開發與建置

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

### Git 檢查

```bash
git status --short
git diff
git diff --check
git log --oneline -10
git branch --show-current
git remote -v
```

### 提交與推送

```bash
git add <檔案>
git commit -m "feat: describe the change"
git push
```

### GitHub Actions

```bash
gh auth status
gh run list --limit 5
gh run view <run-id>
gh run watch <run-id> --exit-status
```

### Pull Request

```bash
git switch -c feat/my-update
git push -u origin feat/my-update
gh pr create --base main --head feat/my-update
gh pr view <pr-number>
```

## 結語

完整的網站建置不是「畫面能打開」就結束，而是以下循環：

```text
定義需求
  → 建立最小版本
  → 本機測試
  → 人工驗收
  → Git commit
  → Pull Request 或 push
  → GitHub Actions 部署
  → 線上再次驗收
```

最重要的原則：

1. 先把需求寫成可以驗收的條件。
2. 每次只完成一個可運作的增量。
3. 不把 build 成功誤認為視覺與操作全部正確。
4. 動效必須有目的、停止條件與 reduced-motion 降級方式。
5. 提交前查看 diff，部署後查看 Actions 與正式網站。
6. 保護帳號、token 與私人資料，任何前端內容都應視為公開資訊。

## 參考資料

- [GitHub Pages 官方文件](https://docs.github.com/pages)
- [使用 GitHub Actions 部署 Pages](https://docs.github.com/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Vite Getting Started](https://vite.dev/guide/)
- [Vite Static Deploy](https://vite.dev/guide/static-deploy.html)
- [React 官方文件](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- `linyoulun/apple.com` 私人教學 repository：學生從零部署、分階段 Prompt 與驗收流程
- 本專案 `.github/workflows/deploy.yml`、`vite.config.js`、`src/portfolioContent.js` 與實際 GitHub Pages 部署紀錄
