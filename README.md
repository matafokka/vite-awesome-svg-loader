# vite-awesome-svg-loader

[![Documentation](https://img.shields.io/badge/Documentation-royalblue?logo=readthedocs)](https://matafokka.github.io/vite-awesome-svg-loader/)
[![React](https://img.shields.io/badge/React-004961?logo=react)](https://matafokka.github.io/vite-awesome-svg-loader/react/quick-start/)
[![Vue](https://img.shields.io/badge/Vue-00523b?logo=vuedotjs)](https://matafokka.github.io/vite-awesome-svg-loader/vue/quick-start/)
[![Web Components](https://img.shields.io/badge/Web%20Components-572300?logo=html5&logoColor=orange)](https://matafokka.github.io/vite-awesome-svg-loader/web-components/general-guide/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-525200?logo=javascript)](https://matafokka.github.io/vite-awesome-svg-loader/vanilla/quick-start/)
[![Any framework](https://img.shields.io/badge/Any%20Framework-560063?logo=vite&logoColor=f9c7ff)](https://matafokka.github.io/vite-awesome-svg-loader/other-frameworks/quick-start/)

A framework-agnostic Vite plugin that:

1. Can import SVGs as:
   1. Source code (default import type).
   1. URL to a static asset.
   1. Source code [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
   1. Source code base64.
   1. Source code base64 [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
1. Can [improve performance](https://matafokka.github.io/vite-awesome-svg-loader/guides/svg-loading-methods/)
of your website by using an alternative SVG loading method.
1. Can preserve line width. Images will retain line width regardless of the size.
1. Can replace colors with `currentColor` or a custom color.
1. Will automatically minimize your SVGs using [SVGO](https://github.com/svg/svgo).
1. Allows you to create
[SVG sprites](https://matafokka.github.io/vite-awesome-svg-loader/guides/svg-loading-methods/#svg-symbols-sprites)
using optional integrations.

## A quick glance

### Basic inline imports

Set import type in import query:

```ts
import image from "./image.svg?url";
import image from "./image.svg?source";
import image from "./image.svg?source-data-uri";
import image from "./image.svg?base64";
import image from "./image.svg?base64-data-uri";
```

### Basic inline transformations

Apply transformations in import query:

```ts
import image from "./image.svg?preserve-line-width";
import image from "./image.svg?set-current-color";
import image from "./image.svg?skip-transforms";
import image from "./image.svg?skip-awesome-svg-loader";
```

### Combined inline imports

Combine import type with multiple transformations:

```ts
import image from "./image.svg?url&preserve-line-width&set-current-color";
```

### Configuration (recommended)

To avoid repeating import queries for each image, configure default transformations and use inline import queries
only to override configuration:

```ts
// vite.config.ts

import { defineConfig } from "vite";
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    viteAwesomeSvgLoader({
      preserveLineWidthList: [/preserve-line-width\//, /all\//],
      replaceColorsList: [/set-current-color\//, /all\//],
      urlImportsInLibraryMode: "emit-files",
    }),
  ],
});
```

### SVG symbols

This is how to display SVG images and icons with SVG symbols:

<details>
<summary>React</summary>

```tsx
import image from "./image.svg";
import icon from "./image.svg";

import { SvgImage, SvgIcon } from "vite-awesome-svg-loader/react-integration";

export default function App() {
  return (
    <Fragment>
      <SvgImage src={image} />
      <SvgIcon src={icon} size="48px" color="red" />
    <Fragment>
  )
}
```
</details>

<details>
<summary>Vue</summary>

```vue
<template>
  <SvgImage :src="image" />
  <SvgIcon :src="icon" size="48px" color="red" />
</template>

<script lang="ts" setup>
import image from "./image.svg";
import icon from "./image.svg";

import { SvgImage, SvgIcon } from "vite-awesome-svg-loader/vue-integration";
</script>
```
</details>

<details>
<summary>Web components (custom elements)</summary>

```ts
import image from "./image.svg";
import icon from "./image.svg";

import esc from "escape-html";
import { SvgImage, SvgIcon } from "vite-awesome-svg-loader/web-components-integration";

SvgImage.define();
SvgIcon.define();

document.getElementById("app")!.innerHTML += `
  <svg-image src="${esc(image)}"></svg-image>
  <svg-icon src="${esc(icon)}" size="48px" color="red"></svg-icon>
`
```
</details>

<details>
<summary>Vanilla JS (classic API)</summary>

```ts
import image from "./image.svg";
import icon from "./image.svg";

import { SvgImage, SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";

new SvgImage(image, "#app");
new SvgIcon(image, "#app").setSize("48px").setColor("red");
```
</details>

## Installation

1. Run:

   ```sh
   npm i vite-awesome-svg-loader
   ```

1. Update `vite.config.ts`:

   ```ts
   import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

   export default defineConfig({
     plugins: [
       viteAwesomeSvgLoader(),
       // Other plugins...
     ],
     // Other configuration options...
   });
   ```

## Documentation

The [documentation website](https://matafokka.github.io/vite-awesome-svg-loader/) is the central knowledge base for `vite-awesome-svg-loader`.

### Quick links

#### Loader

- [Home](https://matafokka.github.io/vite-awesome-svg-loader/)
- [Getting started](https://matafokka.github.io/vite-awesome-svg-loader/guides/getting-started/)
- [Configuration](https://matafokka.github.io/loader-api-reference/interfaces/svgloaderoptions/)

#### Examples and demos

- [React](https://matafokka.github.io/vite-awesome-svg-loader/react/quick-start/)
- [Vue](https://matafokka.github.io/vite-awesome-svg-loader/vue/quick-start/)
- [Web components (custom elements)](https://matafokka.github.io/vite-awesome-svg-loader/web-components/general-guide/)
- [Vanilla JS](https://matafokka.github.io/vite-awesome-svg-loader/vanilla-js/quick-start/)
- [Other frameworks](https://matafokka.github.io/vite-awesome-svg-loader/other-frameworks/quick-start/)
