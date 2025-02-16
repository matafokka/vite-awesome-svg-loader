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
          default: "currentColor",
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
    }),

    // Optional. Make app work with old browsers. ES modules do work as well. You may use your own targets.
    legacy({
      targets: [
        "chrome >= 51",
        "and_chr >= 51",
        "edge >= 15",
        "safari >= 10",
        "firefox >= 54",
        "opera >= 38",
        "android >= 4.4",
        "op_mob >= 73",
        "ios_saf >= 10",
        "and_qq >= 13.1",
        "baidu >= 13.18",
        "kaios >= 3.1",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
