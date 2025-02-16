# vite-awesome-svg-loader

A Vite plugin that:

1. Can import SVGs as:
   1. Source code (default import type).
   1. URL to a static asset.
   1. Source code [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
   1. Source code base64.
   1. Source code base64 [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
1. Can preserve line width, i.e. make icons and line art have same line width when scaling.
1. Can replace colors with `currentColor` or a custom color via configuration (see `replaceColorsList` option).
1. Will automatically minimize your SVGs using [SVGO](https://github.com/svg/svgo).
1. Allows you to create SVG sprites using provided integrations.

`vite-awesome-svg-loader` is framework-agnostic. All integrations are done in form of subpath imports (for example, `vite-awesome-svg-loader/vue-integration`). This means that you'll get only what you need in your app bundle. This also means that you can develop your own integration using `vite-awesome-svg-loader/integration-utils` import.

## Examples and demos

- Vanilla JS: [source](apps/vanilla-demo/README.md), [demo](https://matafokka.github.io/vite-awesome-svg-loader/vanilla-demo), [docs](https://matafokka.github.io/vite-awesome-svg-loader/vanilla-integration-docs).
- Vue 3: [source](apps/vue-demo/README.md), [demo](https://matafokka.github.io/vite-awesome-svg-loader/vue-demo).
- React: [source](apps/react-demo/README.md), [demo](https://matafokka.github.io/vite-awesome-svg-loader/react-demo).

## Usage

1. Grab this plugin from NPM: `npm i vite-awesome-svg-loader`.
2. Add it to `vite.config.js` or `vite.config.ts` (whatever you use):

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    vue(), // Or whatever framework you're using
    viteAwesomeSvgLoader(), // This plugin
    // Other plugins...
  ],
  // Rest of the configuration...
});
```

3. Optional, TypeScript only. Add some _(unfortunately, it's impossible to implement all)_ of the import types to make TypeScript happy:

   1. Create `env.d.ts` file or use existing file where you store [triple slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).
   2. Add following string to it: `/// <reference types="vite-awesome-svg-loader" />`.
   3. Open `tsconfig.json` and add `env.d.ts` to the `include` property: ` { "include": ["env.d.ts"] }`.

4. Use it to import files:

```ts
// Source code
import imageSrc from "./path/to/image.svg";

// URL
import imageUrl from "./path/to/image.svg?url";

// Source code Data URI
import imageSrcDataUri from "./path/to/image.svg?source-data-uri";

// Base64
import imageBase64 from "./path/to/image.svg?base-64";

// Base64 data URI
import imageBase64DataUri from "./path/to/image.svg?base-64-data-uri";

// Preserve line width
import imagePreWidthSrc from "./path/to/image.svg?preserve-line-width";

// Replace fill, stroke and stop-color with currentColor
import imageCurColorSrc from "./path/to/image.svg?set-current-color";

// Mix and match. We need @ts-ignore here because it's impossible to generate types for all possible URLs.
// It is recommended to configure paths to avoid putting @ts-ignore for every import and writing long URLs.
// @ts-ignore
import transformedImageUrl from "./path/to/image.svg?url&preserve-line-width&set-current-color";

// explicitly disable any parameter by setting it to false. This takes precedence over config.
import initialLineWidthImageUrl from "./path/to/image.svg?url&preserve-line-width=false";
```

5. Optional, but highly recommended. Configure loader, so you can import SVGs without URL parameters:

```ts
viteAwesomeSvgLoader({
  // Set default import type. "source" is the default value.
  //
  // Available values:
  // source - load SVG source code.
  // url - load URL pointing to the SVG file. Loader will generate that file for you.
  // source-data-uri - Source code put into a data URI.
  // base64 - SVG source code encoded in base64.
  // base64-data-uri - SVG source code in base64 put into a data URI.
  defaultImport: "source",

  // A list of files or directories to preserve line width of.
  preserveLineWidthList: [/config-demo\/preserve-line-width\//, /config-demo\/all\//],

  // A list of files to skip while preserving line width. Overrides preserveLineWidthList.
  skipPreserveLineWidthList: [/line-width-not-preserved\.svg/],

  // A list of files or directories to preserve color of
  replaceColorsList: [
    // File names
    "some-file.svg",

    // Regexes that are checked against whole path and file name with extension
    /config-demo\/set-current-color\//,
    /config-demo\/all\//,

    // Map of color replacements. Key is an original color, value is its replacement. Both can be any values:
    // HEX, name, rgb() or arbitrary custom values. Applied to all files.
    {
      "#003147": "red",
      "rgb(0, 49, 71)": "#003147",
      "myCustomColor": "var(--some-color-var)",
    },

    // Map of color replacements per files
    {
      files: ["vars.svg"], // File names or regexes, same format as above

      // Replacements, same format as above
      replacements: {
        red: "var(--primary-color)",
        green: "var(--secondary-color)",
        blue: "var(--tertiary-color)",
      },

      // Default value for colors that are not in replacements map. Set an empty string to preserve original colors.
      // Default value is "currentColor",
      default: "currentColor"
    },
  ],

  // A list of files to skip while replacing colors. Overrides replaceColorsList.
  skipReplaceColorsList: [/colors-not-preserved\.svg/],

  // A list of files to skip while transforming. File skip-transforms.svg is present in every directory.
  skipTransformsList: [/skip-transforms\.svg/, /ignore-elements-orig\.svg/],

  // A list of files to skip loading of. File skip-loading.svg is present in every directory.
  skipFilesList: [/skip-loading\.svg/],

  // A list of selectors to skip while preserving line width
  skipPreserveLineWidthSelectors: [
    // It can be a list of CSS selectors like this one. Every element in every file will be checked against it.
    '*[data-original-line-width="true"], *[data-original-line-width="true"] *',

    // Or it can be configured on per-file basis:
    {
      files: [/ignore-elements\.svg/, /some-other-file\.svg/],
      selectors: ['*[data-original-line-width="true"], *[data-original-line-width="true"] *'],
    },
  ],

  // These options are not recommended due to architectural and performance reasons (see JSDoc):

  // A list of selectors to skip while replacing colors. Same format as above.
  skipReplaceColorsSelectors: ['*[data-original-color="true"], *[data-original-color="true"] *'],

  // A list of selectors to skip while transforming. Same format as above.
  skipTransformsSelectors: ['*[data-no-transforms="true"], *[data-no-transforms="true"] *'],
})
```

6. Optional. Use integrations to create sprite sheets. Or [write your own integration](#custom-integration).

## Integrations

All integrations work only on client side. However, they won't break SSR.

### Vanilla JS

**Warning**: do NOT use this package to create custom integrations, use `vite-awesome-svg-loader/integration-utils` instead.

Make sure to check the [docs](https://matafokka.github.io/vite-awesome-svg-loader/vanilla-integration-docs).

1. Import classes:

```ts
import {
  SvgImage, // Basically implements SVG sprites
  SvgIcon, // Basic SVG icon that uses SvgImage class internally
} from "vite-awesome-svg-loader/vanilla-integration";
```

2. Import images:

```ts
import imageSrc from "@/path/to/image.svg";
```

3. Use classes:

```ts
new SvgImage(imageSrc, "#my-container"); // Create an image and mount it to the element with "my-container" id.

new SvgIcon(imageSrc, "#my-container") // Create an icon and mount it to the element with "my-container" id.
  .setSize("24px") // Set 24px size
  .setColor("red") // Set red color
  .setColorTransition("0.3s ease-out"); // Set color transition
```

See full example: [source](apps/vanilla-demo/README.md), [demo](https://matafokka.github.io/vite-awesome-svg-loader/vanilla-demo).

### Vue 3

1. Import components:

```ts
import {
  SvgImage, // Basically implements SVG sprites
  SvgIcon, // Basic SVG icon that uses SvgImage component internally
} from "vite-awesome-svg-loader/vue-integration";
```

2. Import images:

```ts
import imageSrc from "@/path/to/image.svg";
```

3. Use components:

```vue
<template>
  <div class="main">
    <SvgImage :src="imageSrc" />

    <SvgIcon
      :src="imageSrc"
      size="24px"
      color="red"
      color-transition="0.3s ease-out"
    />
  </div>
</template>
```

See full example: [source](apps/vue-demo/README.md), [demo](https://matafokka.github.io/vite-awesome-svg-loader/vue-demo).

### React


1. Import components:

```ts
import {
  SvgImage, // Basically implements SVG sprites
  SvgIcon, // Basic SVG icon that uses SvgImage component internally
} from "vite-awesome-svg-loader/react-integration";
```

2. Import images:

```ts
import imageSrc from "@/path/to/image.svg";
```
3. Use components:

```tsx
export function MyComponent() {
  return (
    <div class="main">
      <SvgImage src={imageSrc} />

      <SvgIcon
        src={imageSrc}
        size="24px"
        color="red"
        colorTransition="0.3s ease-out"
      />
    </div>
  )
}
```

See full example: [source](apps/react-demo/README.md), [demo](https://matafokka.github.io/vite-awesome-svg-loader/react-demo).

### Custom integration

1. Import helper functions and styles:

```ts
import "integration-utils/styles.css";

// There function will run only on client side. However, they won't break SSR.

import {
  onSrcUpdate, // Should be called when component is mounted, and source code is updated
  onUnmount, // Should be called when component is unmounted
} from "integration-utils";
```

2. Write your integration. Use [vue-integration](packages/vue-integration/README.md) as an example.

3. Please, submit your integration in a PR. Or just create an issue and provide the source code if you don't have time
   or don't want to deal with this project's development process.

## Additional information

### What are loading/import types (url, source, etc)?

Let's see how we can load SVGs, and what tradeoffs do they have:

1. Put whole SVG source code into the DOM every time image is displayed. This is the most popular method.
   1. Advantages:
      1. Simplicity.
      1. Great customization. This is actually the only option, if you need to manipulate the content, or need more than just CSS styles.
   1. Disadvantages:
      1. Very bad performance. Browser needs to parse and update good number of DOM nodes. It doesn't really matter when images count is low, but it may slow down the page when 1000+ images are used. Another loading method is always preferred when customization is not required.
1. Link an image like so: `<img href="/image.svg">` or `background-image: url("/image.svg")`.
   1. Advantages:
      1. Simplicity.
      1. Great performance thanks to instancing.
   2. Disadvantages:
      1. Lack of any customization, good only for static images. You can't modify external assets using JS or CSS. The only thing you can do is filters. _**Note:** don't try to implement icons this way. Browsers implement filters incorrectly, it's impossible to write 100% correct color to filter conversion function. This discrepancies are often way off the desired result. If you try to fix them, you'll lose all performance benefits. Trust me, I've tried implementing such system, wasted a lot of time and horribly failed._
1. Symbols: put all images into a single `<svg>` node and wrap each image with a `<symbol>` element.
   1. Advantages:
      1. Performance is way better than when using whole SVG each time.
      1. Images can be customized via CSS, for example, you can set custom stroke and fill colors.
   1. Disadvantages:
      1. Requires a bit of maintenance in form of using provided integrations.
      1. Performance is worse than when linking an image.
      1. Customization is not that great when using whole SVG source code.
1. Data URI: either use source code or base64 in a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
   1. Advantages:
      1. Great performance, although a tiny bit worse than when linking an image.
   2. Disadvantages:
      1. Lack of any customization, good only for static images.
      2. Increased memory and traffic usage when linking images.

To summarize:

1. If you don't need customization, i.e. you want to display static images, use linking method.
1. If you only need CSS customization, use symbols. This is preferred option for icons and line art that's needed to be customized.
1. If you need heavy customization and interactivity, put whole SVG source code into the DOM.
1. As for the data URI, not sure why you would need it. It's implemented just for completeness sake. If you have a use for it, please, notify me.

### Can this loader put whole SVG source code every time I use an image?

Yes, load an image as a source code and insert that code into the DOM like shown in the demos.

### Should I always import my images like shown in the examples? Can I simplify this?

Yes, use `import.meta.glob()` like shown in the demos.

Such components are not present in the integrations because glob imports do not support variable interpolation.
See: https://vitejs.dev/guide/features#glob-import

**Note**: if you want to support browsers without [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), use [@vitejs/plugin-legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy) as shown in the demos.

### For library authors

If your icon set is not extensible, just add `vite-awesome-svg-loader` and build your library.

If your icon set is extensible, you'll need to:

1. Provide a plugin that wraps `vite-awesome-svg-loader` and sets your settings.
1. Tell your users to use your plugin, import icons as source code and pass it to your components.

### Comparison with other loaders

**[vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)**

Implements a portion `vite-awesome-svg-loader` functionality. This loader can also import SVGs as Vue components.

Due to framework-agnostic nature of `vite-awesome-svg-loader` and relative simplicity of outputting raw HTML, this task is delegated to the user, and can be done as easy as you would with [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) as shown in the [Vue demo](apps/vue-demo/README.md):

```vue
<template>
  <div v-html="imageSrc" />
</template>

<script lang="ts" setup>
import imageSrc from "./path/to/image.svg";
</script>
```

Similar approach can be applied to any other framework or vanilla JS.

**[@poppanator/sveltekit-svg](https://github.com/poppa/sveltekit-svg), [vite-plugin-react-svg](https://github.com/damianstasik/vite-svg), [@svgx/vite-plugin-react](https://github.com/salihbenlalla/svgx), [rollup-plugin-svelte-svg](https://www.npmjs.com/package/rollup-plugin-svelte-svg), [vite-plugin-solid-svg](https://github.com/jfgodoy/vite-plugin-solid-svg) and many more**

Same as above, but for other frameworks.

**[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/), [vite-plugin-magical-svg](https://github.com/cyyynthia/vite-plugin-magical-svg), [vite-plugin-svg-sprite](https://github.com/meowtec/vite-plugin-svg-sprite)**

Implements a portion `vite-awesome-svg-loader` functionality.

**Other loaders and plugins**

Same as above. If your loader is different, and you want it to get roasted, or if it kills `vite-awesome-svg-loader`, please, let the community know by creating an issue :p

### How can I help?

1. Create an integration with your favorite framework.
1. Add new functionality to the loader itself.
1. Report bugs.
1. Create feature requests by creating an issue.

### I want to participate in vite-awesome-svg-loader development. Where do I start?

Start by reading [README_DEV.md](README_DEV.md). Then go on and do your thing :)
