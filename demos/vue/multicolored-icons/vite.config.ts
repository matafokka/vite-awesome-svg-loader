import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    viteAwesomeSvgLoader({
      replaceColorsList: [
        {
          files: ["image.svg"], // File names or regexes

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

      urlImportsInLibraryMode: "emit-files",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
