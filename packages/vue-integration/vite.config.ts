import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: "./tsconfig.app.json", processor: "vue" })],
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
      formats: ["es"],
    },

    rollupOptions: {
      external: ["vue", ...Object.keys(pkgJson.dependencies), ...Object.keys(rootPkgJson.dependencies)],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
