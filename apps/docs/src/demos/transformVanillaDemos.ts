import { transformDemos } from "@/demos/transformDemos";

export function transformVanillaDemos(
  modules: Record<string, any>,
  appModules: Record<string, any>,
  framework: string,
) {
  const transformedModules = transformDemos(modules, framework);
  const transformedApps = transformDemos(appModules, framework);

  for (const name in transformedModules) {
    const app = transformedApps[name];

    if (!app) {
      console.error(transformedModules, transformedApps);
      throw new Error(`Mismatch between modules and apps, app "${name}" not found. See modules and apps above.`);
    }

    (transformedModules[name] as any).App = app;
  }

  return transformedModules;
}
