import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // You don't need to change this, we need it for our deployment workflow
  plugins: [
    // Use vite-awesome-svg-loader
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
      setCurrentColorList: [/config-demo\/set-current-color\//, /config-demo\/all\//],

      // A list of files to skip while replacing colors. Overrides setCurrentColorList.
      skipSetCurrentColorList: [/colors-not-preserved\.svg/],

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

      // These two options are not recommended due to architectural and performance considerations (see JSDoc):

      // A list of selectors to skip while replacing colors. Same format as above.
      skipSetCurrentColorSelectors: ['*[data-original-color="true"], *[data-original-color="true"] *'],

      // A list of selectors to skip while transforming. Same format as above.
      skipTransformsSelectors: ['*[data-no-transforms="true"], *[data-no-transforms="true"] *'],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
