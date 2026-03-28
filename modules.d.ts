declare module "imurmurhash";

declare module "rollup-plugin-sourcemaps2" {
  import type { Plugin } from "vite";
  function sourcemaps(): Plugin;
  export default sourcemaps;
}
