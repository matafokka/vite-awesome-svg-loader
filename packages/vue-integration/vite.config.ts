import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "unplugin-dts/vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    // externalizeDeps({useFile: join(process.cwd(), 'package.json')}),
    dts({ tsconfigPath: "./tsconfig.app.json", processor: "vue" }),
  ],
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
      external: ["vue", ...Object.keys(pkgJson.dependencies), ...Object.keys(rootPkgJson.dependencies)],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
