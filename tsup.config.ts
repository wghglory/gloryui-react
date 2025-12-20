import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';
import type { Plugin } from 'esbuild';

const postcssPlugin: Plugin = {
  name: 'postcss',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      try {
        // Dynamically import postcss and plugins to avoid bundling issues
        const postcss = (await import('postcss')).default;
        const tailwindcss = (await import('tailwindcss')).default;
        const autoprefixer = (await import('autoprefixer')).default;

        const css = readFileSync(args.path, 'utf8');
        const result = await postcss([tailwindcss(), autoprefixer()]).process(css, {
          from: args.path
        });
        return {
          contents: result.css,
          loader: 'css'
        };
      } catch (error) {
        // Fallback: return CSS as-is if PostCSS isn't available
        console.warn('PostCSS/Tailwind not available, using raw CSS. Please run: npm install');
        const css = readFileSync(args.path, 'utf8');
        return {
          contents: css,
          loader: 'css'
        };
      }
    });
  }
};

export default defineConfig((options) => {
  const isWatch = options.watch;

  return [
    // CJS build
    {
      entry: ['src/index.ts', 'src/styles/globals.css'],
      format: 'cjs',
      outDir: 'dist/cjs',
      outExtension: () => ({ js: '.js' }),
      splitting: false,
      sourcemap: true,
      external: ['react', 'react-dom'],
      treeshake: true,
      clean: !isWatch,
      minify: !isWatch,
      esbuildPlugins: [postcssPlugin]
    },
    // ESM build
    {
      entry: ['src/index.ts', 'src/styles/globals.css'],
      format: 'esm',
      outDir: 'dist/esm',
      splitting: false,
      sourcemap: true,
      external: ['react', 'react-dom'],
      treeshake: true,
      clean: false,
      minify: !isWatch,
      esbuildPlugins: [postcssPlugin]
    },
    // TypeScript declarations
    {
      entry: ['src/index.ts'],
      dts: {
        resolve: true
      },
      outDir: 'dist',
      external: ['react', 'react-dom']
    }
  ];
});
