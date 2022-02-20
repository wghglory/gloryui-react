## Init Project and Create Components

```bash
npm init
npm i react typescript @types/react -D
```

File structure:

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Button.tsx
 ┃ ┗ 📜index.ts
 ┗ 📜index.ts
```

## Create a button component

`src/components/Button.tsx`:

```tsx
import React from 'react';

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button>{props.label}</button>;
};

export default Button;
```

`src/components/index.tsx`: export that button

```tsx
export {default as Button} from './Button';
```

finally export all components:

`src/index.ts`:

```ts
export * from './components';
```

## Adding typescript

```bash
npx tsc --init
```

That will create a `tsconfig.json` file for us in the root of our project that contains all the default configuration
options for Typescript.

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

You may notice depending on your IDE that immediately after initializing you begin to get errors in your project. There
are two reasons for that: the first is that Typescript isn't configuration to understand React by default, and the
second is that we haven't defined our method for handling modules yet: so it may not understand how to manage all of our
exports.

To fix this we are going to add the following values to `tsconfig.json`:

```json
{
  "compilerOptions": {
    // Default
    "target": "es5",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,

    // Added
    "jsx": "react",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "emitDeclarationOnly": true
  }
}
```

- "jsx": "react" -- Transform JSX into React code
- "module": "ESNext" -- Generate modern JS modules for our library
- "declaration": true -- Output a .d.ts file for our library types
- "declarationDir": "types" -- Where to place the .d.ts files
- "sourceMap": true -- Mapping JS code back to its TS file origins for debugging
- "outDir": "dist" -- Directory where the project will be generated
- "moduleResolution": "node" -- Follow node.js rules for finding modules
- "allowSyntheticDefaultImports": true -- Assumes default exports if none are created manually
- "emitDeclarationOnly": true -- Don't generate JS (rollup will do that) only export type declarations

## Add Rollup and dependencies

Rollup is great to build libraries. We need other rollup plugins for additional features like:

- Preventing bundling of peerDependencies
- Minifying the final bundle

- @rollup/plugin-node-resolve - Uses the node resolution algorithm for third-party dependencies in node_modules
- @rollup/plugin-typescript - Teaches rollup how to process Typescript files
- @rollup/plugin-commonjs - Converts commonjs modules to ES6 modules
- rollup-plugin-dts - rollup your .d.ts files

```bash
npm i -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-peer-deps-external rollup-plugin-terser rollup-plugin-dts
```

```ts
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import {terser} from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default [
  // this object defines how the actual Javascript code of our library is generated.
  {
    input: 'src/index.ts', // The entrypoint for our library (input) which exports all of our components.
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({tsconfig: './tsconfig.json'}), terser()],
    external: [
      'react',
      'react-dom',
      // 'styled-components'
    ],
  },
  // this object defines how our libraries types are distributed and uses the dts plugin to do so.
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts()],
  },
];
```

Next, update `package.json`

```diff
{
  "name": "dr-components",
  "version": "1.0.0",
  "description": "a react components library",
+  "main": "dist/cjs/index.js",
+  "module": "dist/esm/index.js",
+  "files": [
+    "dist"
+  ],
+  "types": "dist/index.d.ts",
+  "scripts": {
+    "rollup": "rollup -c"
+  },
  "author": "Guanghui Wang",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-commonjs": "^21.0.1",
    "@rollup/plugin-node-resolve": "^13.1.3",
    "@rollup/plugin-typescript": "^8.3.0",
    "@types/react": "^17.0.39",
-    "react": "^17.0.2",
    "rollup": "^2.67.3",
    "rollup-plugin-dts": "^4.1.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-terser": "^7.0.2",
    "typescript": "^4.5.5"
  },
+  "peerDependencies": {
+    "react": "^17.0.2"
+  },
}
```

he most important changes are as follows:

- "main" -- We have defined the output path for commonjs modules
- "module" -- We have defined the output path for es6 modules
- "files" -- We have defined the output directory for our entire library
- "types" -- We have defined the location for our library's types
- "scripts" -- `rollup -c` means **use the rollup configuration file**

File structure:

```
.
├── src
│   ├── components
|   │   ├── Button
|   │   └── index.ts
│   └── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── rollup.config.js
```

Run `npm run rollup` and see the `dist` folder:

```
📦dist
 ┣ 📂cjs
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Button.d.ts
 ┃ ┃ ┃ ┗ 📜index.d.ts
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.js.map
 ┣ 📂esm
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Button.d.ts
 ┃ ┃ ┃ ┗ 📜index.d.ts
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.js.map
 ┗ 📜index.d.ts
```