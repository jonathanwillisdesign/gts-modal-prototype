# Tailwind Style Usage (With GTS)

Use this reference to set up Tailwind and GTS styles correctly.

## Required Tooling
1. Use Tailwind CSS v4.
2. Use `@tailwindcss/postcss` in PostCSS.
3. Keep one global css entrypoint for Tailwind in the app.

## Theme Reset Behavior
1. GTS uses `@theme { --*: initial; }` in `src/styles/1_base/theme.css`.
2. Treat this as a reset of Tailwind theme tokens to GTS-defined values.
3. Assume default Tailwind semantic scales are not available unless explicitly reintroduced by GTS mappings.
4. Use GTS semantic classes and token-backed classes as the default path.

## Canonical Pattern
1. In the app stylesheet (for example `src/index.css`), include:
```css
@import "tailwindcss";
```
2. In app entry (for example `src/main.tsx` or `app/layout.tsx`), import:
```ts
import "./index.css";
import "gts-central-library/styles.css";
```
3. Import `gts-central-library/styles.css` exactly once.

## Import Order Rules
1. Keep Tailwind app css import before GTS css.
2. If app-specific overrides are required, import one minimal override file after GTS css.
3. Never import GTS css from multiple routes/components.

## What Utilities To Prefer
1. Semantic color utilities mapped by GTS theme (for example `bg-background`, `text-foreground`, `border-border`, `ring-ring`).
2. GTS spacing/radius/container-backed utilities from theme mappings (`p-sm`, `gap-md`, `rounded-sm`, `max-w-page`).
3. GTS custom utilities declared in `src/styles/3_utilities/*.css`.
4. See `tailwind-utility-inventory.md` for the full custom utility list and caveats.

## Do Not Do This
1. Do not use `@tailwind base; @tailwind components; @tailwind utilities;` in new v4 setups.
2. Do not keep duplicate shadcn semantic variable layers if GTS is the source of truth.
3. Do not add multiple global css files that redefine `--background`, `--foreground`, `--primary`, `--border`, or `--ring`.
4. Do not process or wrap `gts-central-library/styles.css` through css modules.

## Semantic Utility Checks
After setup, verify these utility classes resolve correctly:
1. `bg-background`
2. `text-foreground`
3. `border-border`
4. `ring-ring`

If they fail, resolve duplicated semantic variable sources first.

## Framework Notes
1. Vite React: use one root entry import in `src/main.tsx`.
2. Next.js App Router: import global styles in `app/layout.tsx`.
3. Next.js Pages Router: import global styles in `pages/_app.tsx`.
4. Lovable: follow Vite guidance and dedupe React/runtime if needed.
