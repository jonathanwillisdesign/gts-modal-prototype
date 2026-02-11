# Build Design Tokens

Build and validate design tokens from JSON sources using Style Dictionary.

## Instructions

This command will build design tokens from the JSON source files and generate SCSS files containing CSS custom properties.

## What This Does

1. **Reads token sources** from `src/tokens/` directory
2. **Transforms tokens** using Style Dictionary
3. **Generates SCSS files** in `src/styles/tokens/generated/`
4. **Validates output** and reports any issues

## Generated Files

The build process creates these files:

- `src/styles/tokens/generated/colors.scss` - All color tokens as CSS custom properties
- `src/styles/tokens/generated/spacing.scss` - Spacing tokens 
- `src/styles/tokens/generated/layout.scss` - Layout and responsive tokens

**⚠️ DO NOT EDIT GENERATED FILES DIRECTLY** - They will be overwritten on the next build.

## Process

### 1. Run Token Build
```bash
bun run tokens:build
```

### 2. Verify Output
Check the generated files in `src/styles/tokens/generated/` to ensure:
- All expected tokens are present
- CSS custom properties have correct names (--gts-* prefix)
- Token references are properly resolved
- No build errors occurred

### 3. Test in Components
After building tokens:
1. Start development server: `bun run dev`
2. Test components that use the new/updated tokens
3. Check both light and dark themes if applicable

## Token Sources

The build process reads from these source files:

```
src/tokens/
├── primitives/           # Brand colors and core values
│   └── brand/
│       └── gts.json      # OKLCH color definitions
├── palette/              # Color scales for themes
│   ├── light.json        # Light mode luminance
│   └── dark.json         # Dark mode luminance  
├── semantic.json         # Use-case specific tokens
└── spacing/              # Spacing system
    ├── responsive/       # Breakpoint-specific
    └── static/          # Fixed spacing values
```

## Style Dictionary Configuration

Configuration is in `style-dictionary.config.js`:

```javascript
{
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      prefix: "gts",                    // --gts-* prefix
      buildPath: "src/styles/tokens/generated/",
      transformGroup: "css",
      outputReferences: true            // Preserve var() references
    }
  },
  usesDtcg: true                       // Enable DTCG format
}
```

## OKLCH Color Processing

For OKLCH colors, the build process:
1. **Combines L, C, H values** from brand and scale tokens
2. **Generates OKLCH CSS** format: `oklch(L C H)`
3. **Creates palette scales** for all brand colors
4. **Supports theme switching** via different luminance scales

## Validation

After building, validate tokens:

### Color Token Validation
```bash
bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
```

This checks:
- Hex codes in descriptions match OKLCH values
- OKLCH values are properly formatted
- No missing or invalid token references

### Manual Verification
1. Check generated SCSS files for syntax errors
2. Verify token names follow conventions
3. Test token usage in components
4. Confirm theme switching works for colors

## Common Issues

### Build Errors

**"Token not found" errors:**
- Check token reference paths are correct
- Verify referenced tokens exist in source files
- Ensure proper casing (references are case-sensitive)

**Invalid JSON syntax:**
- Validate JSON files with a linter
- Check for trailing commas, missing quotes
- Verify DTCG format with `$type` and `$value`

### Output Issues

**Missing tokens in generated CSS:**
- Verify source files are included in Style Dictionary config
- Check file paths in source array
- Ensure tokens have proper `$type` field

**Incorrect CSS custom property names:**
- Review Style Dictionary transforms and prefix config
- Check if token paths follow naming conventions
- Verify transform groups are applied correctly

**Token references not resolving:**
- Ensure `outputReferences: true` in config
- Check that referenced tokens are loaded before referencing tokens
- Verify reference syntax uses curly braces: `{path.to.token}`

## Development Workflow

### When to Build Tokens

Build tokens whenever you:
1. **Add new tokens** to JSON files
2. **Modify existing token values**
3. **Update token references**
4. **Switch between themes** (light/dark)
5. **Update Style Dictionary configuration**

### Integration with Development

```bash
# Development workflow
bun run tokens:build    # Build tokens
bun run dev            # Start development server
# Test changes in browser/Storybook
```

### Build Scripts

Available token-related scripts:

- `bun run tokens:build` - Build all tokens
- `bun run scripts/convert-hex-to-oklch.js "#HEX"` - Convert colors
- `bun run scripts/validate-tokens.js <file>` - Validate token file

## Advanced Usage

### Custom Transforms

Style Dictionary supports custom transforms for specific token processing. The current setup includes:

- **OKLCH color transforms** - Combines L, C, H values
- **Responsive layout transforms** - Generates breakpoint CSS
- **CSS custom property formatting** - Adds --gts- prefix

### Theme Generation

For color themes:
1. **Light theme**: Uses `src/tokens/palette/light.json` luminance scale
2. **Dark theme**: Uses `src/tokens/palette/dark.json` luminance scale
3. **Brand colors**: Combined with scales to generate full palettes

### Debugging

Enable Style Dictionary logging for detailed build information:

```javascript
// In style-dictionary.config.js
export default {
  // ... config
  log: "verbose"  // Enable detailed logging
};
```
