import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AwesomeSvgLoaderVueIntegration",
      fileName: "index",
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
