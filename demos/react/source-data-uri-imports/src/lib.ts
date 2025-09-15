import App from "@/App.tsx";
import fsData from "demo-fs-data";
import type { DemoExport } from "types/demos";

export default {
  ...fsData,
  App,
} satisfies DemoExport;
