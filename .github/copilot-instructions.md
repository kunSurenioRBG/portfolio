# Celestial Chasm - Portfolio Template

## Project Overview
This is an **Astro-based multilingual portfolio** template with a focus on performance, internationalization, and visual effects. The site features a dark/light theme toggle, animated canvas backgrounds (starfield/gridfield), and comprehensive SEO optimization.

## Architecture & Structure

### Routing Pattern
- **Single-page application**: Main route is `src/routes/index.astro`
- **Page sections** live in `src/pages/_home/` (Hero, Experience, Projects, Contributions, About, Contact)
- Each section is imported and composed in the main index route

### Path Aliases (tsconfig.json)
Use these import aliases consistently:
```typescript
@components/* → src/components/*
@data/* → src/data/*
@images/* → src/images/*
@layouts/* → src/layouts/*
@pages/* → src/pages/*
@scripts/* → src/scripts/*
@styles/* → src/styles/*
```

Example: `import Hero from '@pages/_home/Hero.astro'`

## Internationalization (i18n)

### Key Integration: `@astrolicious/i18n`
- **Default locale**: `es` (Spanish)
- **Supported locales**: `es`, `en`
- **Translation files**: `src/locales/{locale}/common.json`

### Usage Pattern
```astro
import { t } from 'i18n:astro'

const { title, description } = t('hero', { returnObjects: true })
```

**Critical**: All user-facing text must be externalized to locale files. Never hardcode Spanish/English text in components.

## Styling Conventions

### CSS Variables & Theming
- Theme switching via `html.dark` class toggle
- Global variables defined in `src/styles/global.css`
- Dark mode inverts colors using `color-mix()` function
```css
html { --bg-color: #000; }
html.dark { --bg-color: #fff; }
```

### Technology Badge Colors
- Tech-specific colors in `src/styles/tech-colors.css`
- Badge classes follow pattern: `.badge-tech.{tech-name-lowercase}`
- Example: `.badge-tech.react`, `.badge-tech.typescript`

### Responsive Breakpoints
Standard breakpoint: `@media (width >= 768px)` for tablet/desktop
Desktop max-width: `@media (width >= 1200px)`

## Component Patterns

### Image Handling
Use Astro's `Picture` component with glob imports:
```astro
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/projects/*.{jpeg,jpg,png,gif}'
)
if (!images[src])
  throw new Error(
    `"${src}" no existe en: "/src/images/projects/*.{jpeg,jpg,png,gif}"`
  )

<Picture 
  src={images[src]()} 
  formats={['avif', 'webp']} 
  fallbackFormat="webp" 
/>
```

**Critical**: Always include all supported image formats (.jpeg, .jpg, .png, .gif) in glob patterns. Update both the glob pattern and error message when adding new formats.

### Icons
Using `astro-icon` package:
```astro
import { Icon } from 'astro-icon/components'
<Icon name="techs/javascript" size={24} />
```
Icons stored in `src/icons/` (SVG format)

## Development Workflow

### Commands
- **Dev server**: `pnpm dev`
- **Build**: `pnpm build` (runs Astro check + build)
- **Preview**: `pnpm preview`

### Code Quality
- **ESLint**: Configured for Astro, TypeScript, and standard JavaScript
- **Prettier**: Auto-formats with import sorting (custom order in `.prettierrc.mjs`)
- **Husky + lint-staged**: Pre-commit hooks enforce linting/formatting

### Import Order (Prettier)
Follow this order in `.astro` files:
1. Builtin modules
2. Third-party modules
3. `@data/*`
4. `@layouts/*`
5. `@pages/*`
6. `@components/*`
7. `@scripts/*`, `@styles/*`
8. Relative imports

## Performance Optimizations

### Build-time Compression
- **playformCompress**: Minifies HTML/JS
- **astro-compressor**: Brotli + Gzip compression
- **Image optimization**: AVIF/WebP with fallbacks

### Prefetching
Aggressive prefetch strategy enabled:
```javascript
prefetch: {
  prefetchAll: true,
  defaultStrategy: 'viewport'
}
```

## Canvas Effects
- **Starfield**: `src/scripts/starfield.ts` (Hero section)
- **Gridfield**: `src/scripts/gridfield.ts` (Contact section)

Both are TypeScript classes instantiated in section components.

## Common Gotchas

1. **Trailing slashes**: Sitemap config removes them via custom serialize function
2. **HTML compression**: `compressHTML: false` in astro.config (handled by playformCompress)
3. **Image paths**: Must use glob patterns for dynamic imports from `src/images/`
4. **Locale data structure**: Nested objects in JSON require `returnObjects: true` in `t()` calls

## External Dependencies
- **sanitize.css**: Base CSS normalization
- **astro-tunnel**: Local dev tunneling for testing
- **astro-seo-schema**: Auto-generates schema.org markup
- **astro-sitemap**: XML sitemap with i18n support
