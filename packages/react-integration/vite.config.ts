import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "unplugin-dts/vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin(), dts()],
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
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        ...Object.keys(pkgJson.dependencies),
        ...Object.keys(rootPkgJson.dependencies),
      ],
      output: {
        globals: {
          "react": "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
