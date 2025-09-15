import type { DemoExport } from "types/demos";

export function transformDemos(modules: Record<string, any>, framework: string) {
  framework += "/";
  const demos: Record<string, DemoExport | undefined> = {};

  for (const path in modules) {
    const nameStart = path.indexOf(framework) + framework.length;
    const nameEnd = path.indexOf("/", nameStart);
    const origName = path.substring(nameStart, nameEnd);
    const nameParts = origName.split(/[-|_| |\\.]/);
    let name = "";

    for (const part of nameParts) {
      name += part[0].toUpperCase() + part.substring(1);
    }

    demos[name] = modules[path];
  }

  return demos;
}
