# App Integration Playbook

Use this file after reading `guidelines.md`, `shadcn-compatibility.md`, `tailwind-style-usage.md`, and `tailwind-utility-inventory.md`.

## Vite + React
1. Install `gts-central-library` and peer-compatible `react`/`react-dom` (`^18 || ^19`).
2. Ensure Tailwind v4 stack: `tailwindcss` + `@tailwindcss/postcss`.
3. Keep one global stylesheet with `@import "tailwindcss";`.
4. Import GTS once at app root:
```ts
import "gts-central-library/styles.css";
```
5. For duplicate React/runtime issues, dedupe in `vite.config.ts`:
```ts
resolve: { dedupe: ["react", "react-dom"] }
```

## Next.js (App Router or Pages Router)
1. Use Tailwind v4-compatible setup.
2. Import `gts-central-library/styles.css` once in root global entry:
- App Router: `app/layout.tsx`
- Pages Router: `pages/_app.tsx`
3. Do not import global css from leaf pages/components.

## Lovable
1. Follow Vite guidance above.
2. Prioritize token compatibility and verify semantic utility resolution (`bg-background`, `text-foreground`, `border-border`, `ring-ring`).
3. Keep only one semantic source of truth when migrating from shadcn globals.

## shadcn Migration
1. Remove duplicate semantic variable layers when they conflict with GTS mapping.
2. Keep GTS semantic bridge behavior from `src/styles/1_base/globals.css` as the model.
3. Retain shadcn utility usage where compatible; rely on GTS variable mapping for resolution.

## General Validation Checklist
1. Build succeeds.
2. Lint succeeds.
3. No css processing/runtime errors.
4. Key screens visually match expected spacing, typography, and colors.
5. Only one root import of `gts-central-library/styles.css` exists.
