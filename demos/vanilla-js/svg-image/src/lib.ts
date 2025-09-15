import fsData from "demo-fs-data";
import type { DemoExport } from "types/demos";

export default fsData satisfies Omit<DemoExport, "App">;
