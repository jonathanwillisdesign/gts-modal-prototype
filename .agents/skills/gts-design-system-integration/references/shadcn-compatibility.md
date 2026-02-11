# Shadcn Style Compatibility

## Goal
Explain how GTS styles are structured so shadcn-style utility classes (for example `bg-background`, `text-foreground`, `border-border`, `ring-ring`) resolve correctly when this library is consumed.

## Required Consumer Import
Import the compiled stylesheet once in your app entry:

```ts
import "gts-central-library/styles.css";
```

This file is exported by the package and contains all token, base, utility, and component styles.

## Style Layers Used For Compatibility

### 1) Token Sources (`--gts-*`)
Base design values come from token files and are exposed as CSS variables with the `--gts-` prefix (colors, spacing, typography, motion, shadows, radius, etc.).

### 2) Semantic Bridge Variables (`--background`, `--foreground`, etc.)
In `src/styles/1_base/globals.css`, semantic variables commonly used in shadcn-style systems are mapped to GTS tokens, for example:

- `--background -> --gts-color-bg-canvas`
- `--foreground -> --gts-color-fg-text-default`
- `--primary -> --gts-color-bg-solid-default`
- `--border -> --gts-color-border-base-neutral`
- `--ring -> --gts-color-border-strong-default`
- `--radius -> --gts-radius-subtle`

This bridge is what makes semantic class names work against GTS tokens.

### 3) Tailwind Theme Variable Mapping
In `src/styles/1_base/theme.css`, semantic variables are mapped into Tailwind theme variables:

- `--color-background: var(--background)`
- `--color-foreground: var(--foreground)`
- `--color-primary: var(--primary)`
- `--color-border: var(--border)`
- `--color-ring: var(--ring)`

That enables utility classes like:

- `bg-background`
- `text-foreground`
- `border-border`
- `ring-ring`

### 4) Base Rules
Also in `src/styles/1_base/globals.css`:

- `* { @apply border-border; }`
- `body { @apply bg-background text-foreground; }`

These defaults ensure neutral baseline visuals even before component-specific classes are applied.

## Tone Context Overrides
The library includes semantic tone contexts that remap the same semantic variables:

- `[data-tone="info"]`
- `[data-tone="success"]`
- `[data-tone="warning"]`
- `[data-tone="error"]`
- `[data-tone="inverse"]`

Because the semantic variable names stay the same, existing shadcn-style utility classes continue to work inside those contexts without class changes.

## Included In The Published CSS
`styles.css` includes:

- font-face declarations
- token variables
- base reset
- Tailwind theme + utilities
- component styles

No additional local CSS imports are required in consuming apps for standard usage.

## Integration Notes

- Import `gts-central-library/styles.css` once, at app root.
- Avoid redefining semantic variables (`--background`, `--foreground`, `--primary`, etc.) globally unless you intentionally want to override GTS mapping.
- If your app has its own shadcn `globals.css`, keep a single source of truth for semantic variable definitions to prevent drift.
