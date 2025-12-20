# gloryui-react

A modern React components library built with TypeScript, Tailwind CSS, and shadcn/ui patterns.

## 🚀 Getting Started

### Installation

```bash
npm install gloryui-react
```

### Development

This project uses a two-terminal workflow for development:

**Terminal 1 - Build Watch Mode:**

```bash
npm run dev
```

This runs `tsup --watch` which:

- Watches for file changes in `src/`
- Automatically rebuilds the library
- Outputs to `dist/` directory
- Does NOT open a URL (it's just a build tool)

**Terminal 2 - Storybook (Component Development):**

```bash
npm run storybook
```

This starts the Storybook dev server:

- Opens at **http://localhost:6006**
- Provides visual component development environment
- Hot reloads when you make changes
- Interactive component playground

### Build

```bash
npm run build
```

Builds the library for production:

- Generates CJS and ESM formats
- Outputs TypeScript declarations
- Processes Tailwind CSS
- Minifies code

### Other Scripts

```bash
npm test              # Run tests with Jest
npm run build-storybook  # Build static Storybook site
```

## 🛠️ Tech Stack

- **Build Tool**: tsup (modern, fast TypeScript bundler)
- **Styling**: Tailwind CSS with shadcn/ui design system
- **UI Primitives**: Headless UI, Radix UI
- **Component Development**: Storybook
- **Testing**: Jest + React Testing Library

## 📦 Components

### DrButton

A flexible button component with multiple variants and sizes.

```tsx
import { DrButton } from 'gloryui-react';

<DrButton label="Click me" variant="default" size="md" />;
```

**Props:**

- `label` (string, required) - Button text
- `variant` ('default' | 'outline' | 'ghost') - Button style variant
- `size` ('sm' | 'md' | 'lg') - Button size
- `className` (string, optional) - Additional CSS classes

### DrAspectRatio

Display a DOM element with fixed aspect ratios: `1:1`, `4:3`, or `16:9`.

```tsx
import { DrAspectRatio } from 'gloryui-react';

<DrAspectRatio ratio="16:9">
  <img src="image.jpg" alt="Example" />
</DrAspectRatio>;
```

**Props:**

- `ratio` ('1:1' | '4:3' | '16:9', required) - Aspect ratio
- `containerClass` (string, optional) - Additional CSS classes for container
- `children` (ReactNode, required) - Content to display
