# GTS Design System Integration Guidelines

## Purpose
Use `gts-central-library` as the primary source of styling, tokens, and shared UI patterns when integrating into an app.

## Core Standards
1. Use Tailwind CSS v4.
2. Treat `gts-central-library` as the styling source of truth.
3. Keep existing app behavior and routing unchanged during integration.
4. Remove conflicting local design-system styling (shadcn theme token layers, duplicated global component styling, or parallel token systems).
5. Keep local CSS minimal and app-specific (feature/layout exceptions only).

## Install Standard
Install the design system package and ensure peer compatibility.
Use this pinned version:
- `gts-central-library@0.1.0-beta.2`

Package install (choose one):

```bash
npm install gts-central-library@0.1.0-beta.2
pnpm add gts-central-library@0.1.0-beta.2
yarn add gts-central-library@0.1.0-beta.2
bun add gts-central-library@0.1.0-beta.2
```

Tailwind v4 + PostCSS v4-compatible tooling (if missing):

```bash
npm install -D tailwindcss@^4 @tailwindcss/postcss@^4
```

Peer dependency requirement:
- `react` and `react-dom` must be compatible with `^18 || ^19`.

## CSS Import Standard
Import GTS CSS exactly once at the app root level:

```ts
import "gts-central-library/styles.css";
```

Do not load GTS styles through `index.html` link hacks, `?url` workarounds, or copied public assets.

## Vite + React Standard
1. Use Tailwind v4-compatible tooling (`tailwindcss` + `@tailwindcss/postcss`).
2. Use `@import "tailwindcss";` in the app stylesheet.
3. Keep app entry import order:

```ts
import "./index.css";
import "gts-central-library/styles.css";
```

4. Avoid adding alternate Tailwind processing paths that can reprocess library CSS.

## Next.js Standard
1. Use Tailwind v4-compatible tooling (`tailwindcss` + `@tailwindcss/postcss`).
2. Keep Tailwind setup in global CSS with `@import "tailwindcss";`.
3. Import GTS CSS once:
   - App Router: root `app/layout.tsx`
   - Pages Router: `pages/_app.tsx`
4. Do not import global CSS from leaf components/pages.

## Layout Standard (Margin + Max Width)
All primary page wrappers should use GTS layout tokens:

- `padding-inline: var(--gts-layout-margin)`
- `max-width: var(--gts-layout-max-width)`
- `margin-inline: auto`
- `gap: var(--gts-layout-gutter)`

Recommended utility pattern:

```css
.gts-layout-shell {
  width: 100%;
  padding-inline: var(--gts-layout-margin);
}

.gts-layout-container {
  width: 100%;
  max-width: var(--gts-layout-max-width);
  margin-inline: auto;
}

.gts-layout-grid {
  display: grid;
  gap: var(--gts-layout-gutter);
}
```

Avoid hardcoded layout wrappers that conflict with this model (`container`, fixed `1200px/1440px` wrappers, arbitrary page paddings for primary structure).

## Ad Hoc Component Radius Rule
1. Default to no radius (`rounded-none` / `border-radius: 0`).
2. Only circles and pills may use full radius (`rounded-full`).
3. Do not introduce intermediate ad hoc radius values.

## Component Usage Guidance
1. Prefer GTS components for common UI (`Button`, `TextInput`, `SearchBar`, etc.).
2. Avoid local style overrides on GTS components unless required by product behavior.
3. If customization is required, prefer token-aligned values over one-off styles.

## Validation Standard
1. Build passes.
2. Lint passes.
3. No CSS processing/runtime errors in dev or production preview.
4. GTS components render with expected styling.
5. Existing routes/navigation remain unchanged.
6. Primary page wrappers follow the GTS margin/max-width layout approach.

## Figma Make Placement
If using this with Figma Make, place this content in `guidelines/Guidelines.md` so it is loaded first by the agent.
