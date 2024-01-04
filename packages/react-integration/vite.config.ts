import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      rollupTypes: true,
      bundledPackages: ["types"],
    }),
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
      external: ["react", "react/jsx-runtime", "react-dom"],
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
