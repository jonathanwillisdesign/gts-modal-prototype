# Tailwind Utility Inventory (GTS)

Use this reference to understand which utility families are intentionally exposed by GTS.

## Important Context
1. GTS resets theme tokens with `@theme { --*: initial; }`.
2. Do not assume default Tailwind semantic scales are present.
3. Prefer GTS semantic and token-backed utilities.

## Theme-Mapped Utility Families
These are provided through `src/styles/1_base/theme.css` and support normal Tailwind utility patterns.

1. Colors:
- `background`, `foreground`, `foreground-alternative`, `foreground-disabled`
- `card`, `card-foreground`, `popover`, `popover-foreground`
- `primary`, `primary-foreground`, `secondary`, `secondary-foreground`
- `raised`, `raised-foreground`, `strong`, `strong-foreground`
- `accent`, `accent-foreground`, `muted`, `muted-foreground`
- `destructive`, `destructive-foreground`
- `border`, `border-strong`, `input`, `ring`
- `sidebar*` semantic colors

2. Spacing:
- Numeric keys: `0`, `1`, `2`, `4`, `5`, `7`, `10`, `15`, `20`
- Named keys: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- Layout spacing keys: `layout-margin`, `layout-gutter`

3. Radius:
- `none`, `sm`, `md`, `lg`, `full`

4. Typography primitives:
- `font-sans`, `font-heading`
- `font-weight-normal`, `font-weight-medium`, `font-weight-bold`
- `text-body-*`, `text-heading-*`, `text-statement-*`, `text-label-*` token families

5. Containers and breakpoints:
- Container keys: `page`, `modal`
- Breakpoints: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

6. Motion:
- `ease-standard`, `ease-focus`
- `animate-loading`, `animate-loading-shimmer`

## Custom Utilities Declared By GTS
These are declared in `src/styles/3_utilities/*.css`.

1. Foundation:
- `border-hairline`
- `border-thinner`
- `border-thin`
- `border-moderate`
- `border-thick`
- `border-thickest`
- `opacity-visible`
- `opacity-disabled`
- `opacity-hidden`
- `icon-stroke-regular`
- `icon-stroke-bold`
- `text-shadow-default`
- `text-shadow-inverse`

2. Layout:
- `layout-page`
- `layout-grid`
- `layout-stack`

3. Motion:
- `motion-all`
- `motion-transform`
- `motion-press`
- `motion-color`
- `motion-focus`
- `motion-none`
- `gl-shimmer` (class in utilities layer, not `@utility`)

4. Typography:
- `type-body-xs`
- `type-body-sm`
- `type-body-md`
- `type-body-lg`
- `type-body-xl`
- `type-heading-sm`
- `type-heading-md`
- `type-heading-lg`
- `type-heading-xl`
- `type-statement-sm`
- `type-statement-lg`
- `type-label-sm`
- `type-label-md`
- `type-label-lg`
- `type-bold`
- `type-italic`
- `type-underline`

## What Else Is Important
1. Root import discipline:
- Import `gts-central-library/styles.css` once at app root.

2. Variable source discipline:
- Keep one source of truth for semantic vars (`--background`, `--foreground`, etc.).
- Remove duplicate shadcn/global variable layers when migrating.

3. Source scanning caveat:
- If relying on source-level `@utility` generation, ensure the Tailwind `@source` configuration includes files where those classes are used.

4. Safer implementation strategy:
- Prefer GTS components first.
- Use semantic Tailwind utilities second.
- Use custom utility classes when the semantic set does not cover the need.
