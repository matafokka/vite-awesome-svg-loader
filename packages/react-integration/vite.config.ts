import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";

export default defineConfig({
  plugins: [react(), dts()],
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
