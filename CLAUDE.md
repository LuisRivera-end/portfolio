# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also `AGENTS.md` (style, testing, commit/PR conventions); this file focuses on commands and architecture.

## Commands

- `npm ci` — install pinned deps
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b` + `vite build` + `scripts/copy-pages-fallback.mjs` (copies `dist/index.html` to `dist/404.html` for SPA routing on GitHub Pages)
- `npm run lint` — Oxlint (config in `.oxlintrc.json`); no separate formatter
- `npm test` — Vitest once (jsdom); single file: `npx vitest run src/App.test.tsx`; by name: `npx vitest run -t "pattern"`
- `npm run preview` — serve the production build

## Architecture

Single-page bilingual (es/en) portfolio: React 19 + react-router-dom 7 + Tailwind v4 (`@tailwindcss/vite`) + shadcn-style primitives (`components.json`, Radix) + GSAP/motion for animation. Path alias `@/` → `src/`.

- **All copy lives in one place**: `src/content/site-content.ts` exports `dictionaries: Record<Locale, SiteDictionary>` (projects, experience, stack, certificates, SEO, etc.) and `getDictionary(locale)`. Types are in `src/types/portfolio.ts`. Adding a project or text means editing both locales' entries (projects are matched by `slug` and must exist in each locale).
- **Locale state** is held in `App.tsx` (`useState`), initialised from / persisted to `localStorage` (`portfolio-locale`) via `src/lib/site.ts`, and passed down as `dictionary` + `locale` props — there is no context provider. `App.tsx` also sets `document.lang`, `document.title` and the meta description per route/locale, and handles hash-scroll (`#projects`, etc.) on navigation.
- **Routes** (in `App.tsx`): `/` → `HomePage` (sections addressed by hash), `/projects/:slug` → `ProjectCasePage` (looked up with `getProject(locale, slug)`), `*` → `NotFoundPage`. Page UI lives in `src/components/site/`; generic primitives in `src/components/ui/`.
- **Static assets / CV**: files in `public/` are referenced via `getAssetPath(import.meta.env.BASE_URL, name)`; CV filenames per locale come from `cvFileNames`. Always build asset URLs through this helper, never hardcode `/`.

## Deployment / base path

Deployed to GitHub Pages by `.github/workflows/deploy.yml` (on push to `main`/`master`). `vite.config.ts` derives `base` from `VITE_BASE_PATH`, else `GITHUB_REPOSITORY` (`/<repo>/`, or `/` for `*.github.io`), else `/`. `App.tsx` feeds `BASE_URL` to `BrowserRouter` as `basename`, so any routing/asset change must work under both a subpath and root.

## Repo noise

Root contains scratch artifacts (screenshots `*_real_*.png`, `preview.log`, `rendered_dom.html`, `.superpowers/`, `.playwright-cli/`, `docs/superpowers/`) — not part of the app. `scripts/generate-cv-en.py` generates the English CV; `dist/` is generated.
