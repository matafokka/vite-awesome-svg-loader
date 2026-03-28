import { transformVanillaDemos } from "@/demos/transformVanillaDemos";

const modules = import.meta.glob("@/../../../demos/vanilla-js/**/dist/index.js", {
  eager: true,
  import: "default",
});

const appModules = import.meta.glob("@/../../../demos/vanilla-js/**/dist/App.astro", {
  eager: true,
  import: "default",
});

export default transformVanillaDemos(modules, appModules, "vanilla-js");
