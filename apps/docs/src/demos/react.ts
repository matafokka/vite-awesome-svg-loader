import { transformDemos } from "@/demos/transformDemos";

const modules = import.meta.glob("@/../../../demos/react/**/dist/index.js", { eager: true, import: "default" });
export default transformDemos(modules, "react");