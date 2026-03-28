import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  experimentalWebKitSupport: true,

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },

  reporter: "min",
});
