import App from "@/App.vue";
import fsData from "demo-fs-data";
import type { DemoExport } from "types/demos";

export default {
  ...fsData,
  App,
} satisfies DemoExport;
