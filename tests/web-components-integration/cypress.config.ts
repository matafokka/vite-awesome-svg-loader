import { defineConfig } from "cypress";

export default defineConfig({
  experimentalWebKitSupport: true,

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },

  reporter: "min",
});
