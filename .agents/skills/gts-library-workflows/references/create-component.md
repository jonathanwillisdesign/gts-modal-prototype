# Create Component

Create a new component following the GTS Central Library conventions and patterns.

## Instructions

This command will help you create a new component with:
1. Proper file structure in `src/components/ComponentName/`
2. Component implementation with TypeScript
3. CSS Module styling with design tokens
4. CVA variant management
5. Base UI useRender support
6. Proper TypeScript interfaces
7. Storybook story

## Requirements

When creating a component:

### File Structure
Create the following files:
```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
  index.ts
```

### Component Implementation
- Use CSS Modules for styling (`import styles from "./Component.module.scss"`)
- Use CVA for variant management
- Support flexible rendering with `@base-ui/react/use-render`
- Use design tokens (`--gts-*`) in CSS, never hardcoded values
- Extend appropriate HTML element attributes
- Use TypeScript with proper typing

### Component Template Structure
```tsx
import React from "react";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./ComponentName.module.scss";

const componentVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  render?: React.ReactElement | ((props: any) => React.ReactElement);
}

export const ComponentName = ({
  variant,
  className,
  render,
  ...props
}: ComponentNameProps) => {
  const defaultProps = {
    className: clsx(componentVariants({ variant }), className),
    ...props,
  };

  const element = useRender({
    defaultTagName: "div", // or appropriate HTML element
    render,
    props: defaultProps,
  });

  return element;
};
```

### CSS Module Structure
```scss
.base {
  /* Base styles using design tokens */
  color: var(--gts-color-fg-text-default);
  font-family: var(--gts-body-font-set-family-functional-1);
  /* etc. */
}

.primary {
  /* Primary variant styles */
  background-color: var(--gts-color-bg-solid-default);
}

.secondary {
  /* Secondary variant styles */
  background-color: var(--gts-color-bg-surface-base-neutral);
}
```

### Index Export
```ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

### Storybook Story
Create a story file at `src/components/ComponentName/ComponentName.stories.tsx`:

- Include default states, variants, and combinations
- DO NOT create stories for interactive states (hover, focus, pressed)
- Include an "All Variants" story showing all combinations
- Use proper story organization

## Process

1. **Ask for component name** (PascalCase)
2. **Ask for base HTML element** (div, button, etc.)
3. **Ask for variants needed** (size, variant, state, etc.)
4. **Create component files** with proper structure
5. **Create Storybook story** with variants
6. **Add component to main exports** if needed

## Guidelines

- Follow the existing codebase patterns
- Use design tokens exclusively
- Support compound components for complex UI
- Include proper TypeScript documentation
- Test the component in Storybook after creation
