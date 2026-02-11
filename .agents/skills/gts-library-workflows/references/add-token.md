# Add Design Token

Add a new design token to the GTS Central Library following Style Dictionary and DTCG format conventions.

## Instructions

This command will guide you through adding new design tokens while maintaining the proper architecture and naming conventions.

## Token Architecture

Tokens are organized in a 3-layer hierarchy:

1. **Primitives** (`src/tokens/primitives/`) - Raw brand values
2. **Palette** (`src/tokens/palette/`) - Semantic scales  
3. **Semantic** (`src/tokens/semantic.json`) - Use-case specific tokens

## Token Types

### Color Tokens

For color tokens, determine which layer is appropriate:

**Primitive**: New brand color
```json
{
  "color": {
    "brand": {
      "newColor": {
        "$type": "color",
        "$value": "#HEX",
        "$description": "Brand color description"
      }
    }
  }
}
```

**Palette**: Semantic color scale
```json
{
  "color": {
    "palette": {
      "newScale": {
        "1": { "$type": "color", "$value": "#LIGHT" },
        "12": { "$type": "color", "$value": "#DARK" }
      }
    }
  }
}
```

**Semantic**: Use-case token (recommended for components)
```json
{
  "color": {
    "bg": {
      "newSurface": {
        "$type": "color",
        "$value": "{color.palette.neutral.2}",
        "$description": "Background for new component"
      }
    }
  }
}
```

### OKLCH Color Format

For brand colors, use OKLCH values stored as separate properties:

```json
{
  "red": {
    "$description": "Brand red - #E32B2B",
    "l": { "$type": "number", "$value": 0.54 },
    "c": { "$type": "number", "$value": 0.22 },
    "h": { "$type": "number", "$value": 25 }
  }
}
```

Use conversion script: `bun run scripts/convert-hex-to-oklch.js "#HEXCODE"`

### Other Token Types

**Spacing**:
```json
{
  "space": {
    "newSize": {
      "$type": "dimension",
      "$value": "24px"
    }
  }
}
```

**Typography**:
```json
{
  "typography": {
    "fontSize": {
      "newSize": {
        "$type": "dimension", 
        "$value": "1.125rem"
      }
    }
  }
}
```

**Duration**:
```json
{
  "motion": {
    "duration": {
      "newTiming": {
        "$type": "duration",
        "$value": "250ms"
      }
    }
  }
}
```

## Naming Conventions

### Token Path Structure
```
{category}.{subcategory}.{variant}.{state}
```

### Categories and Prefixes

| Category | Purpose | CSS Prefix |
|----------|---------|------------|
| `color.brand` | Brand primitives | `--gts-color-brand-*` |
| `color.palette` | Semantic scales | `--gts-color-palette-*` |
| `color.bg` | Background colors | `--gts-color-bg-*` |
| `color.border` | Border colors | `--gts-color-border-*` |
| `color.fg` | Foreground/text | `--gts-color-fg-*` |
| `space` | Spacing values | `--gts-space-*` |
| `typography` | Text properties | `--gts-typography-*` |

### Naming Rules
- Use **camelCase** in JSON files
- Style Dictionary converts to **kebab-case** in CSS
- Use descriptive, purpose-based names
- Avoid color names in semantic tokens (use `error` not `red`)

## Process

### 1. Determine Token Type and Layer
- **What type**: color, dimension, duration, etc.
- **Which layer**: primitive, palette, or semantic
- **File location**: Which JSON file to edit

### 2. Add Token to JSON
- Use proper DTCG format with `$type` and `$value`
- Include `$description` for documentation
- Use token references with `{path.to.token}` when appropriate

### 3. Build Tokens
```bash
bun run tokens:build
```

### 4. Verify Output
Check generated files in `src/styles/tokens/generated/`

### 5. Document in Storybook
Add examples and documentation to relevant Storybook pages

## Color Token Workflow

### Adding a New Color

1. **Get hex code** from design files
2. **Convert to OKLCH**:
   ```bash
   bun run scripts/convert-hex-to-oklch.js "#HEXCODE"
   ```
3. **Add to appropriate JSON file**
4. **Validate conversion**:
   ```bash
   bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
   ```
5. **Build tokens**: `bun run tokens:build`
6. **Test** in components

## Best Practices

1. **Prefer semantic tokens** in components over primitives
2. **Use token references** instead of hardcoded values when possible
3. **Document purpose** with `$description` field
4. **Test in both themes** for color tokens
5. **Follow existing patterns** in the codebase
6. **Keep primitives minimal** - most tokens should be semantic

## Common Patterns

### Status Color Variant
```json
{
  "color": {
    "bg": {
      "surface": {
        "muted": {
          "warning": {
            "$type": "color",
            "$value": "{color.palette.yellow.1}"
          }
        }
      }
    }
  }
}
```

### Component-Specific Token
```json
{
  "color": {
    "component": {
      "button": {
        "primary": {
          "bg": {
            "$type": "color",
            "$value": "{color.palette.contrast.high}"
          }
        }
      }
    }
  }
}
```

## Configuration

Style Dictionary configuration is in `style-dictionary.config.js`:
- Source files from `src/tokens/`
- Output to `src/styles/tokens/generated/`
- Prefix: `--gts-`
- Supports token references with `outputReferences: true`

## Troubleshooting

**Token not appearing in CSS:**
1. Check JSON syntax
2. Verify `$type` is correct
3. Ensure file is in source array
4. Rebuild tokens

**Reference not resolving:**
1. Check referenced token exists
2. Verify path is exact (case-sensitive)
3. Ensure load order is correct

**Color conversion issues:**
1. Validate with conversion script
2. Check OKLCH values are properly formatted
3. Test in both light and dark themes