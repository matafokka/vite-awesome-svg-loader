import { transformDemos } from "@/demos/transformDemos";

const modules = import.meta.glob("@/../../../demos/vue/**/dist/index.js", { eager: true, import: "default" });
export default transformDemos(modules, "vue");
