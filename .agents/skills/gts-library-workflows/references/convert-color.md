# Convert Color

Convert between hex codes and OKLCH color format using the built-in conversion tools.

## Instructions

This command helps you accurately convert colors between hex and OKLCH formats for use in design tokens.

## OKLCH Color Format

The GTS Design System uses **OKLCH** (Oklch) for perceptually uniform color representation:

- **L (Lightness)**: 0-1, perceptually uniform brightness
- **C (Chroma)**: 0-0.4+, color intensity/saturation  
- **H (Hue)**: 0-360, color angle in degrees

## Conversion Tools

### Hex to OKLCH

Convert a hex color to OKLCH values:

```bash
bun run scripts/convert-hex-to-oklch.js "#E32B2B"
```

**Output:**
```
Hex: #E32B2B
OKLCH: l: 0.5402, c: 0.2201, h: 25.1234
```

### OKLCH to Hex

Convert OKLCH values back to hex:

```bash
bun run scripts/convert-oklch-to-hex.js 0.54 0.22 25
```

**Output:**
```
OKLCH: l: 0.54, c: 0.22, h: 25
Hex: #E32B2B
```

### Validate Token File

Check if hex codes in token descriptions match OKLCH values:

```bash
bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
```

**What it does:**
- Extracts hex codes from `$description` fields
- Converts them to OKLCH
- Compares with existing `l`, `c`, `h` values
- Reports any discrepancies

## Token Format

In token JSON files, OKLCH values are stored separately:

```json
{
  "red": {
    "$description": "Brand red - #E32B2B",
    "l": { "$type": "number", "$value": 0.5402 },
    "c": { "$type": "number", "$value": 0.2201 },
    "h": { "$type": "number", "$value": 25.1234 }
  }
}
```

## Precision Guidelines

- **Lightness (L)**: Use 4 decimal places (e.g., `0.5402`)
- **Chroma (C)**: Use 4 decimal places (e.g., `0.2201`)  
- **Hue (H)**: Use 1-2 decimal places (e.g., `25.12`)

## Special Cases

### Neutral Colors (Grays)

Neutral colors have very low or zero chroma:

```json
{
  "neutral": {
    "$description": "Neutral gray - #F7F7F7", 
    "l": { "$type": "number", "$value": 0.9761 },
    "c": { "$type": "number", "$value": 0 },
    "h": { "$type": "number", "$value": 0 }
  }
}
```

For true neutral grays:
- Set `c: 0` (or very close to 0)
- Set `h: 0` (hue is undefined for neutrals)

### Very Saturated Colors

Some colors may be outside the sRGB gamut. The conversion tools handle this by:
- Clamping values to displayable range
- Preserving visual intent as much as possible
- Warning if significant color shifts occur

## Workflow Examples

### Adding a New Brand Color

1. **Get hex from design**: `#FF6B35`
2. **Convert to OKLCH**:
   ```bash
   bun run scripts/convert-hex-to-oklch.js "#FF6B35"
   ```
3. **Add to token file**:
   ```json
   {
     "orange": {
       "$description": "Brand orange - #FF6B35",
       "l": { "$type": "number", "$value": 0.7123 },
       "c": { "$type": "number", "$value": 0.1543 },
       "h": { "$type": "number", "$value": 45.6789 }
     }
   }
   ```
4. **Validate accuracy**:
   ```bash
   bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
   ```

### Verifying Existing Colors

1. **Check token file** for discrepancies:
   ```bash
   bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
   ```
2. **If issues found**, re-convert the hex codes:
   ```bash
   bun run scripts/convert-hex-to-oklch.js "#ORIGINALHEX"
   ```
3. **Update token values** with accurate OKLCH
4. **Re-validate** to confirm fix

### Converting Multiple Colors

For batch conversion, use the tools in sequence:

```bash
# Convert multiple hex values
bun run scripts/convert-hex-to-oklch.js "#E32B2B"
bun run scripts/convert-hex-to-oklch.js "#0082C7" 
bun run scripts/convert-hex-to-oklch.js "#00A651"

# Validate after adding to tokens
bun run scripts/validate-tokens.js src/tokens/colors/brands/gts.json
```

## Manual Conversion (Advanced)

For programmatic conversion, use the `culori` library directly:

```javascript
import { converter } from "culori";

// Convert hex to OKLCH
const hexToOklch = converter("oklch");
const oklch = hexToOklch("#E32B2B");
console.log(oklch); // { l: 0.5402, c: 0.2201, h: 25.1234 }

// Convert OKLCH to hex  
const oklchToHex = converter("hex");
const hex = oklchToHex({ mode: "oklch", l: 0.54, c: 0.22, h: 25 });
console.log(hex); // "#E32B2B"
```

## Troubleshooting

### Conversion Issues

**Colors look different after conversion:**
1. Verify the original hex code is correct
2. Check if color is within sRGB gamut
3. Test in different browsers and devices
4. Consider using a different color space if needed

**Validation script reports mismatches:**
1. Re-run conversion with exact hex code from description
2. Update OKLCH values in token file with new results
3. Check for typos in hex codes or OKLCH values
4. Rebuild tokens: `bun run tokens:build`

**Neutral colors have unexpected hue:**
1. For true grays, manually set `c: 0` and `h: 0`
2. Very low chroma values (< 0.01) can cause hue instability
3. Consider using pure neutral values for gray scales

### Common Errors

**"Invalid hex color" error:**
- Ensure hex codes start with `#`
- Use 6-character hex format (`#RRGGBB`)
- Check for typos in hex values

**"Out of range" warnings:**
- Some colors may be outside sRGB gamut
- The tools will clamp to displayable range
- Consider adjusting saturation if color shifts significantly

**"NaN" values in OKLCH:**
- Usually occurs with invalid input colors
- Check that hex codes are properly formatted
- Verify input color is valid RGB

## Best Practices

1. **Always verify conversions** with the validation script
2. **Test converted colors** in actual components
3. **Use consistent precision** (4 decimal places for L and C)
4. **Document hex codes** in token descriptions for reference
5. **Validate after bulk changes** to catch any errors
6. **Test in both themes** when working with color tokens