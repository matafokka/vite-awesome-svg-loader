import fsData from "demo-fs-data";
import type { DemoExport } from "internal-utils";

export default fsData satisfies Omit<DemoExport, "App">;
