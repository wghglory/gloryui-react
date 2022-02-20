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
