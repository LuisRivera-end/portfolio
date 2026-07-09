# Portfolio Redesign Design

**Date:** 2026-07-09
**Status:** Approved visual direction; awaiting spec review

## Goal

Replace the current dark, highly rounded, gradient-heavy portfolio with a light, editorial portfolio that combines restrained glassmorphism with deliberate brutalist structure. The site should feel authored, technically credible, and focused on Luis Rivera's real work rather than decorative UI.

## Approved Direction

Use a warm-white canvas, near-black typography and borders, acid-lime accents, and ice-blue lighting. Glass is limited to layered information and hover depth; black borders, square shadows, and visible grid lines provide the structure. The top navigation uses the approved editorial treatment: `LR / Portfolio` at left and location/year at right, without an avatar, monogram tile, or profile summary.

## Information Architecture

1. **Header:** editorial wordmark, anchor navigation, locale selector, and locale-specific CV action. Mobile uses the same visual language in a sheet menu.
2. **Hero:** concise value proposition, contact/CV actions, animated grid and a small work/certification signal.
3. **Selected work:** fewer, stronger project cards with clear status, role, stack, and direct case-study links.
4. **Experience and stack:** timeline and concise capability blocks, replacing generic floating glass cards.
5. **Certifications:** a dedicated section for Google *Inteligencia Artificial y productividad* (2024) and DataCamp *Introduction to Agent Skills* (2026), each linking to its source PDF.
6. **Contact and footer:** direct, minimal links and an accurate technology statement.

Project routes remain available but receive the same light theme, borders, spacing, and hierarchy.

## Motion and Visual Behavior

GSAP drives one composed hero entrance, scroll-based reveals, and subtle project-card motion. Magic UI is added selectively through the existing shadcn registry: an animated grid/light treatment and a text or border effect only where it improves hierarchy. Existing Motion-based fades may be retained only where they do not duplicate GSAP. All nonessential motion is disabled or shortened for `prefers-reduced-motion`.

## Content and Data Corrections

- Remove the forced `dark` class and all claims that the current PDF is bilingual.
- Generate `public/cv-luis-eliezer-rivera-gamez-en.pdf`, translating the supplied Spanish CV faithfully. Spanish UI opens the existing Spanish PDF; English UI opens the new English PDF.
- Extend the dictionary/types with locale-aware CV labels and a certificate data model. Copy the two supplied PDFs to descriptive filenames in `public/certificates/`.
- Tighten generic marketing copy into evidence-based statements matching the CV and project records.
- Remove unused starter CSS in `src/App.css` if it remains unreferenced.

## Implementation Boundaries

The redesign preserves React, Vite, Tailwind, routing, static GitHub Pages deployment, project URLs, and bilingual UI. It does not invent project metrics, add a profile photograph, or claim certifications beyond the supplied documents.

## Validation

Run `npm run lint`, `npm test`, and `npm run build`. Extend tests for locale-specific CV links, certificate links, navigation accessibility, and existing direct project routes. Verify desktop and mobile layouts visually, including the GitHub Pages base path. Render and inspect the generated English CV before delivery.
