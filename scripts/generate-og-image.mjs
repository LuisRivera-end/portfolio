import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"

const rootDir = process.cwd()
const publicDir = path.join(rootDir, "public")
const outputImagePath = path.join(publicDir, "og-image.png")

// Read font files
const geistFontPath = path.join(
  rootDir,
  "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
)
const cormorantFontPath = path.join(
  rootDir,
  "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2",
)

const geistBase64 = fs.existsSync(geistFontPath)
  ? fs.readFileSync(geistFontPath).toString("base64")
  : ""
const cormorantBase64 = fs.existsSync(cormorantFontPath)
  ? fs.readFileSync(cormorantFontPath).toString("base64")
  : ""

// Read screenshots
const facsaPath = path.join(publicDir, "projects/facsa-public.webp")
const openfyPath = path.join(publicDir, "projects/openfy-library.webp")
const openfyMobilePath = path.join(publicDir, "projects/openfy-mobile-player.webp")

const facsaBase64 = fs.existsSync(facsaPath)
  ? `data:image/webp;base64,${fs.readFileSync(facsaPath).toString("base64")}`
  : ""
const openfyBase64 = fs.existsSync(openfyPath)
  ? `data:image/webp;base64,${fs.readFileSync(openfyPath).toString("base64")}`
  : ""
const openfyMobileBase64 = fs.existsSync(openfyMobilePath)
  ? `data:image/webp;base64,${fs.readFileSync(openfyMobilePath).toString("base64")}`
  : ""

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Geist';
    src: url('data:font/woff2;base64,${geistBase64}') format('woff2');
    font-weight: 100 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    src: url('data:font/woff2;base64,${cormorantBase64}') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 1200px;
    height: 630px;
    background-color: #f8f7f4;
    color: #1c1b18;
    font-family: 'Geist', -apple-system, sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
  }

  /* Subtle background grid */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(28, 27, 24, 0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(28, 27, 24, 0.045) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  /* Ambient colored glows */
  .glow-lime {
    position: absolute;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(217, 249, 157, 0.45) 0%, rgba(217, 249, 157, 0) 70%);
    top: -100px;
    right: 250px;
    filter: blur(40px);
    pointer-events: none;
  }

  .glow-ice {
    position: absolute;
    width: 440px;
    height: 440px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(186, 230, 253, 0.5) 0%, rgba(186, 230, 253, 0) 70%);
    bottom: -80px;
    right: -40px;
    filter: blur(40px);
    pointer-events: none;
  }

  /* Solid brutalist card frame border */
  .outer-border {
    position: absolute;
    inset: 12px;
    border: 2px solid #1c1b18;
    pointer-events: none;
  }

  /* Left column */
  .left-col {
    position: relative;
    z-index: 10;
    width: 650px;
    padding: 48px 36px 44px 52px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .brand-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .monogram-box {
    width: 52px;
    height: 52px;
    background: #d9f99d;
    border: 2.5px solid #1c1b18;
    box-shadow: 4px 4px 0 #1c1b18;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: -0.04em;
    color: #1c1b18;
  }

  .brand-text h2 {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #1c1b18;
    line-height: 1.2;
  }

  .brand-text p {
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b6964;
    margin-top: 2px;
  }

  .main-heading {
    margin-top: 24px;
  }

  .eyebrow-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1.5px solid #1c1b18;
    box-shadow: 2.5px 2.5px 0 #1c1b18;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #1c1b18;
    margin-bottom: 12px;
  }

  .eyebrow-pill span.dot {
    width: 7px;
    height: 7px;
    background: #16a34a;
    border-radius: 50%;
  }

  .headline {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 56px;
    font-weight: 700;
    line-height: 0.94;
    letter-spacing: -0.04em;
    color: #1c1b18;
  }

  .headline mark {
    background: #d9f99d;
    color: #1c1b18;
    padding: 0 4px;
  }

  .tagline {
    font-size: 15.5px;
    line-height: 1.45;
    color: #52504b;
    margin-top: 14px;
    max-width: 530px;
    font-weight: 500;
  }

  /* Badges & Stats */
  .middle-section {
    margin-top: 18px;
  }

  .stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .stack-badge {
    background: #ffffff;
    border: 1.5px solid #1c1b18;
    padding: 4px 10px;
    font-size: 11.5px;
    font-weight: 700;
    color: #1c1b18;
    box-shadow: 2px 2px 0 #1c1b18;
  }

  .stack-badge.accent {
    background: #e0f2fe;
  }

  .stats-row {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }

  .stat-card {
    background: #ffffff;
    border: 1.5px solid #1c1b18;
    box-shadow: 3px 3px 0 #1c1b18;
    padding: 8px 14px;
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 900;
    line-height: 1;
    color: #1c1b18;
    font-family: 'Geist', sans-serif;
  }

  .stat-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #73716b;
    margin-top: 3px;
  }

  .footer-url {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 800;
    color: #1c1b18;
    letter-spacing: -0.01em;
    margin-top: 12px;
  }

  .footer-url-tag {
    background: #1c1b18;
    color: #f8f7f4;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  /* Right column - Project mockups */
  .right-col {
    position: relative;
    flex: 1;
    height: 100%;
    z-index: 5;
  }

  /* Mockup windows */
  .window {
    position: absolute;
    background: #fff;
    border: 2.5px solid #1c1b18;
    border-radius: 4px;
    box-shadow: 9px 9px 0 #1c1b18;
    overflow: hidden;
  }

  .window-topbar {
    height: 28px;
    background: #f1efea;
    border-bottom: 2px solid #1c1b18;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }

  .window-dots {
    display: flex;
    gap: 5px;
  }

  .window-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid #1c1b18;
  }
  .dot-red { background: #f87171; }
  .dot-yellow { background: #fde047; }
  .dot-green { background: #4ade80; }

  .window-title {
    font-size: 10.5px;
    font-weight: 700;
    color: #555;
    background: #fff;
    border: 1px solid #1c1b18;
    padding: 1px 12px;
    border-radius: 2px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .window-badge {
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 6px;
    border: 1px solid #1c1b18;
  }

  .badge-live {
    background: #bbf7d0;
    color: #14532d;
  }

  .badge-multi {
    background: #bae6fd;
    color: #0c4a6e;
  }

  .window-img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Window 1: FACSA (Top-right) */
  .window-facsa {
    top: 40px;
    right: 38px;
    width: 440px;
    transform: rotate(1deg);
  }

  /* Window 2: Openfy (Bottom-right, overlapping) */
  .window-openfy {
    top: 238px;
    right: 68px;
    width: 410px;
    transform: rotate(-1.5deg);
    z-index: 12;
  }

  /* Phone mockup overlapping Openfy */
  .phone-mockup {
    position: absolute;
    top: 265px;
    right: 26px;
    width: 130px;
    background: #1c1b18;
    border: 2.5px solid #1c1b18;
    border-radius: 18px;
    box-shadow: 6px 6px 0 rgba(28, 27, 24, 0.9);
    padding: 5px;
    z-index: 20;
    transform: rotate(2.5deg);
  }

  .phone-screen {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    display: block;
    border: 1px solid #333;
  }
</style>
</head>
<body>
  <div class="grid-pattern"></div>
  <div class="glow-lime"></div>
  <div class="glow-ice"></div>
  <div class="outer-border"></div>

  <div class="left-col">
    <div>
      <div class="brand-header">
        <div class="monogram-box">LR</div>
        <div class="brand-text">
          <h2>Luis Eliezer Rivera Gámez</h2>
          <p>Desarrollador Web Full Stack</p>
        </div>
      </div>

      <div class="main-heading">
        <div class="eyebrow-pill">
          <span class="dot"></span>
          Disponible para proyectos y roles
        </div>
        <h1 class="headline">
          Sistemas web que hacen<br><mark>el trabajo.</mark>
        </h1>
        <p class="tagline">
          Portales en producción con 60+ páginas, apps multiplataforma (Web, Windows, Android), APIs REST y e-commerce con foco en estabilidad y arquitectura.
        </p>
      </div>
    </div>

    <div class="middle-section">
      <div class="stack-list">
        <span class="stack-badge accent">Nuxt 4 / Nitro</span>
        <span class="stack-badge">Vue 3 / React 19</span>
        <span class="stack-badge accent">Express 5</span>
        <span class="stack-badge">MariaDB / SQLite</span>
        <span class="stack-badge">.NET · WinUI 3</span>
        <span class="stack-badge">Kotlin Compose</span>
        <span class="stack-badge">Docker · Vitest</span>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-value">1.5+</span>
          <span class="stat-label">Años de exp</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">60+</span>
          <span class="stat-label">Páginas en prod</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">4</span>
          <span class="stat-label">Plataformas Openfy</span>
        </div>
      </div>
    </div>

    <div class="footer-url">
      <div class="footer-url-tag">
        <span>luisrivera-end.github.io/portfolio</span>
        <span>↗</span>
      </div>
      <span style="font-size:12px; color:#6b6964; font-weight:600;">Gómez Palacio, Durango</span>
    </div>
  </div>

  <div class="right-col">
    <!-- FACSA Window -->
    <div class="window window-facsa">
      <div class="window-topbar">
        <div class="window-dots">
          <div class="window-dot dot-red"></div>
          <div class="window-dot dot-yellow"></div>
          <div class="window-dot dot-green"></div>
        </div>
        <div class="window-title">🔒 facsa.ujed.mx</div>
        <div class="window-badge badge-live">En línea</div>
      </div>
      <img class="window-img" src="${facsaBase64}" alt="FACSA Portal">
    </div>

    <!-- Openfy Window -->
    <div class="window window-openfy">
      <div class="window-topbar">
        <div class="window-dots">
          <div class="window-dot dot-red"></div>
          <div class="window-dot dot-yellow"></div>
          <div class="window-dot dot-green"></div>
        </div>
        <div class="window-title">🎵 Openfy · Multiplataforma</div>
        <div class="window-badge badge-multi">Repo público</div>
      </div>
      <img class="window-img" src="${openfyBase64}" alt="Openfy">
    </div>

    <!-- Phone mockup -->
    <div class="phone-mockup">
      <img class="phone-screen" src="${openfyMobileBase64}" alt="Openfy Mobile">
    </div>
  </div>
</body>
</html>`

const tempHtmlPath = path.join(rootDir, "temp-og.html")
fs.writeFileSync(tempHtmlPath, htmlContent, "utf-8")

console.log("Generating og-image.png with headless Chrome...")
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const fileUrl = `file:///${tempHtmlPath.replace(/\\/g, "/")}`

spawnSync(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1200,630",
    `--screenshot=${outputImagePath}`,
    fileUrl,
  ],
  { stdio: "inherit" },
)

if (fs.existsSync(tempHtmlPath)) {
  fs.unlinkSync(tempHtmlPath)
}

if (fs.existsSync(outputImagePath)) {
  const stats = fs.statSync(outputImagePath)
  console.log(`Successfully generated ${outputImagePath} (${stats.size} bytes)`)
} else {
  console.error("Failed to generate og-image.png")
  process.exit(1)
}
