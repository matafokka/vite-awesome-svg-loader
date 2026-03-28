import App from "@/App.tsx";
import fsData from "demo-fs-data";
import type { DemoExport } from "internal-utils";

export default {
  ...fsData,
  App,
} satisfies DemoExport;
