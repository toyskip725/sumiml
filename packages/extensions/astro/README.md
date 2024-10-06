# @sumiml/astro-integration

## install / setup

(1) Install `@sumiml/astro-integration` package to yout project:

``` shell
npm install <path to @sumiml/astro-integration tarball>
```

(2) Apply the integration to your `astro.config.mjs` file:

``` javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sumiml from '@sumiml/astro-integration';

export default defineConfig({
  integrations: [sumiml()],
  ...
});
```

(3) Add type declaration for `.suml` files. Create `sumiml.d.ts` at the root of your project, and copy the code below into it:

``` typescript
declare module "*.suml" {
  const frontmatter: Record<string, unknown>;
  const content: string;

  export default content;
};
```

(4) Now you can import your `.suml` file to `.astro` component:

``` astro
---
import Document from "./document.suml";
---
<html>
  <head>
   ...
  </head>
  <body>
    <Document />
  </body>
</html>

<style>
...
</style>
```