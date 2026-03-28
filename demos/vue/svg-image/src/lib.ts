import App from "@/App.vue";
import fsData from "demo-fs-data";
import type { DemoExport } from "internal-utils";

export default {
  ...fsData,
  App,
} satisfies DemoExport;
