# Add Icon

Add a new icon to the GTS Central Library icon system following the SVG sprite pattern.

## Instructions

This command will help you add a new icon to the sprite system by:
1. Adding the SVG file to the correct location
2. Updating TypeScript types
3. Updating Storybook documentation
4. Ensuring proper icon formatting

## Process

### 1. SVG File Requirements

The icon SVG must meet these requirements:
- Use `currentColor` for stroke/fill to inherit text color
- Use `var(--gts-icon-stroke-width)` for stroke-based icons
- Include proper `viewBox` attribute
- No hardcoded dimensions
- Clean, optimized SVG code

Example proper SVG format:
```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5 12L10 17L19 8"
    stroke="currentColor"
    stroke-width="var(--gts-icon-stroke-width)"
    stroke-linecap="square"
    stroke-linejoin="miter"
  />
</svg>
```

### 2. File Naming

- Use kebab-case for filenames (e.g., `arrow-right.svg`, `check-circle.svg`)
- Be descriptive but concise
- Avoid redundant words like "icon" in the name

### 3. Steps to Add Icon

1. **Save SVG file** to `src/icons/svg/` with kebab-case name
2. **Update IconName type** in `src/components/Icon/Icon.tsx`
3. **Update Storybook** argTypes in `src/components/Icon/Icon.stories.tsx`
4. **Test** the icon in Storybook

### 4. Type Updates

Add the new icon name to the `IconName` union type:

```tsx
// In src/components/Icon/Icon.tsx
export type IconName = 
  | "arrow-right" 
  | "check" 
  | "your-new-icon"; // Add here
```

### 5. Storybook Updates

Add the icon to the select options:

```tsx
// In src/components/Icon/Icon.stories.tsx
argTypes: {
  name: {
    control: "select",
    options: [
      "arrow-right",
      "check", 
      "your-new-icon" // Add here
    ],
  },
},
```

## Icon Guidelines

### Design Requirements
- **Stroke-based icons**: Use `stroke="currentColor"` and `stroke-width="var(--gts-icon-stroke-width)"`
- **Fill-based icons**: Use `fill="currentColor"`
- **Consistent style**: Follow the existing icon style in the library
- **Optimal size**: Design at 24x24px artboard for best results

### Technical Requirements
- **ViewBox**: Always include appropriate viewBox
- **No dimensions**: Remove width/height attributes
- **Clean paths**: Optimize and simplify SVG paths
- **Accessibility**: Consider how the icon will be used with screen readers

### Figma Integration

Icons should be sourced from the GTS Central Library Figma file:
- Node: `4545-143062` (Icons set)
- Export with proper settings for web
- Ensure consistency with existing icons

## Testing

After adding an icon:
1. Start Storybook: `bun run storybook`
2. Navigate to Icon component
3. Verify the new icon appears in the name dropdown
4. Test different sizes and weights
5. Ensure the icon inherits color properly

## Troubleshooting

**Icon not appearing:**
- Check file is saved in `src/icons/svg/`
- Verify filename uses kebab-case
- Ensure TypeScript type is updated
- Restart development server

**Icon not inheriting color:**
- Verify `stroke="currentColor"` or `fill="currentColor"`
- Remove any hardcoded color values
- Check SVG is properly formatted

**Icon looks blurry or misaligned:**
- Verify viewBox is correct
- Check paths are optimized
- Ensure icon was designed at appropriate size
