# Repository Guidelines

## Project Structure & Module Organization

This is a React 19, TypeScript, and Vite portfolio. Application entry points live in `src/main.tsx` and `src/App.tsx`. Keep page-level and portfolio-specific UI in `src/components/site/`; reusable primitives belong in `src/components/ui/`. Put bilingual portfolio copy and project data in `src/content/site-content.ts`, shared helpers in `src/lib/`, and domain types in `src/types/`. Tests live beside the code they exercise (for example, `src/App.test.tsx`), with shared setup in `src/test/`. Static files such as the CV and icons belong in `public/`; do not edit generated `dist/` output.

## Build, Test, and Development Commands

- `npm ci` installs the lockfile-pinned dependencies used by CI.
- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` type-checks, builds `dist/`, and creates the GitHub Pages `404.html` fallback.
- `npm run lint` runs Oxlint for React, TypeScript, and Oxc rules.
- `npm test` runs the Vitest suite once; `npm run test:watch` keeps it running locally.
- `npm run preview` serves the production build for a final check.

## Coding Style & Naming Conventions

Use TypeScript and functional React components. Match the surrounding file: two-space indentation, no semicolons, and single or double quotes as already used locally. Name components and interfaces in `PascalCase`; use kebab-case filenames such as `project-card.tsx`; use `camelCase` for values and functions. Prefer the `@/` alias for imports from `src/`, and use `import type` for type-only dependencies. Keep Tailwind utility classes in JSX and preserve the existing responsive class patterns. Run `npm run lint` before submitting; no standalone formatter is configured.

## Testing Guidelines

Vitest runs in `jsdom` with React Testing Library and `@testing-library/jest-dom`. Name tests `*.test.ts` or `*.test.tsx`, group behavior with `describe`, and write user-visible assertions (roles, labels, and rendered copy). Cover changes to routing, locale switching, and interactive components. There is no configured coverage threshold; add focused regression tests for changed behavior.

## Commit & Pull Request Guidelines

Recent history uses short, imperative summaries, usually beginning with `fix` (for example, `fix root route for GitHub Pages basename`). Keep each commit narrowly scoped. Pull requests should explain the user-facing change, list validation commands run, link any relevant issue, and include screenshots for visual changes. For deployment-related work, confirm the GitHub Pages base path still works under both a repository subpath and a root `*.github.io` site.
