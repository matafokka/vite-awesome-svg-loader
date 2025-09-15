import { transformDemos } from "@/demos/transformDemos";

const modules = import.meta.glob("@/../../../demos/vanilla-js/**/dist/index.js", {
  eager: true,
  import: "default",
});

const appModules = import.meta.glob("@/../../../demos/vanilla-js/**/dist/App.astro", {
  eager: true,
  import: "default",
});

const transformedModules = transformDemos(modules, "vanilla-js");
const transformedApps = transformDemos(appModules, "vanilla-js");

for (const name in transformedModules) {
  const app = transformedApps[name];

  if (!app) {
    console.error(transformedModules, transformedApps);
    throw new Error(`Mismatch between modules and apps, app "${name}" not found. See modules and apps above.`);
  }

  (transformedModules[name] as any).App = app;
}

export default transformedModules;
