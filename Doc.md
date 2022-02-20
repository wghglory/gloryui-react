## Init Project and Create Components

```bash
npm init
npm i react typescript @types/react -D
```

File structure:

```
📦src
 ┣ 📂components
 ┃ ┗ 📂DrButton
 ┃ ┃ ┣ 📜DrButton.css
 ┃ ┃ ┗ 📜DrButton.tsx
 ┗ 📜index.ts
```

## Create a button component

`src/components/DrButton/DrButton.tsx`:

```tsx
import React from 'react';

export interface ButtonProps {
  label: string;
}

const DrButton = (props: ButtonProps) => {
  return <button>{props.label}</button>;
};

export default DrButton;
```

finally export all components:

`src/index.ts`:

```ts
export {default as DrButton} from './components/DrButton/DrButton';
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

2 Optimizing plugins:

- rollup-plugin-peer-deps-external - With rollup's peer dependencies plugin we can tell the projects that are using our
  libraries which dependencies are required (like React) but won't actually bundle a copy of React with the library
  itself. If the consumer already has React in their project it will use that, otherwise it will get installed when they
  run npm install.
- rollup-plugin-terser - minify our bundle and reduce the overall file size

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

Thanks to `rollup-plugin-peer-deps-external`, we can move react from `devDependencies` to `peerDependencies`.

The most important changes are as follows:

- "main" -- We have defined the output path for commonjs modules
- "module" -- We have defined the output path for es6 modules
- "files" -- We have defined the output directory for our entire library
- "types" -- We have defined the location for our library's types
- "scripts" -- `rollup -c` means **use the rollup configuration file**

File structure:

```
├── src
│   ├── components
|   │   ├── DrButton
|   |   │   └── DrButton.tsx
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
 ┃ ┃ ┃ ┗ 📂DrButton
 ┃ ┃ ┃ ┃ ┗ 📜DrButton.d.ts
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.js.map
 ┣ 📂esm
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📂DrButton
 ┃ ┃ ┃ ┃ ┗ 📜DrButton.d.ts
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.js.map
 ┗ 📜index.d.ts
```

## Publish NPM package

Now follow the instructions on Github shown in your new repository for committing your code.

We need to update `package.json` with that information:

```json
{
  "name": "@YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME",
  "version": "0.0.1",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/YOUR_GITHUB_USERNAME"
  }
}
```

You will be updating the field `name` value and adding a new field called `publishConfig`. Note the values above in caps
are meant to be replaced with your own values. For example my `name` field value would be `@wghlory/dr-components`.
Notice the `packageConfig` also has your Github account name in it as well, but that value does not lead with the @
symbol.

Now that we have configured out project, we need to configure our local install of NPM itself to be authorized to
publish to your Github account. To do this we use a .npmrc file.

This file is **NOT PART OF OUR PROJECT**. This is a global file in a central location. For Mac/Linux users it goes in
your home directory ~/.npmrc.

```
registry=https://registry.npmjs.org/
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN
```

Go to your Github profile: **Settings -> Developer Settings -> Personal access tokens**. Or just
[click this link Click Generate new token](https://github.com/settings/tokens). Give it a name that suits the project
you are building. Give it an expiry date (Github recommends you don't create tokens with an infinite lifespan for
security reasons, but that's up to you).

The most important thing is to click the `write:packages` access value. This will give your token permission to read &
write packages to your Github account.

Now run `npm publish`!

> If you get prompted for login credentials, the username is your Github username and your password is the access token
> you generated

You can see your package in github: https://github.com/wghglory/dr-components/packages/1263810

You can view it on your Github account by going to your main account dashboard and clicking "packages" along the top to
the right of "repositories".

## Using Your Library

Now that your library is live, you'll want to use it!

Note that the instructions for using your library are slightly different if you published to a private repository.
Everyone (aside from your own machine) who tries to import it is going to get a 404 Not Found error if they are not
authorized.

Those users also need to add a `~/.npmrc` file with the same information. To be more secure however you can provide
those users with an access token that has only **read privileges**, not write.

## Further Enhancement

If you choose to continue, we will look at how to expand our component library to include a number of extremely useful
features such as:

- CSS: For exporting components with style
- Storybook: For testing our components within the library itself as we design them
- React Testing Library & Jest: For testing our components

## Adding CSS

Before we do any additional configuration, we'll begin by creating a CSS file that will apply some styles to our Button.
Inside of the Button directory where our component lives, we'll create a file called: Button.css:

`src/components/DrButton/DrButton.css`:

```css
button {
  font-size: 60px;
}
```

Notice that you will have build error due to the css import in DrButton.tsx:

```diff
+ import './DrButton.css';

const DrButton = (props: ButtonProps) => {
  return <button>{props.label}</button>;
};
```

Now we need to tell rollup how to process that syntax. To do that we use a plugin called `rollup-plugin-postcss`. Run
the following command:

```bash
npm install rollup-plugin-postcss --save-dev
```

Now the `rollup.config.js` is like:

```diff
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import {terser} from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

+ import postcss from 'rollup-plugin-postcss';

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
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({tsconfig: './tsconfig.json'}),
      terser(),
+      postcss(),
    ],
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
+    external: [/\.css$/],
  },
];
```

In the dts config we need to specify that `.css` modules are external and should not be processed as part of our type
definitions (otherwise we will get an error).

Finally we need to update the version number in our package.json file. Remember we are publishing a package so when we
make changes, we need to ensure we don't impact users of previous versions of our library. Every time we publish we
should increment the version number:

`package.json`:

```diff
{
+  "version": "0.0.2",
-  "version": "0.0.1",
  ...
}
```

Now run these commands:

```bash
npm run rollup
npm publish
```

In the testing app, upgrade the library and verify.
