import { XastElement } from "svgo/lib/types";

const TAGS_TO_PRESERVE_LINE_WIDTH_OF: Record<string, true> = {
  circle: true,
  ellipse: true,
  foreignObject: true,
  image: true,
  line: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  text: true,
  textPath: true,
  tspan: true,
  use: true,
};

export function preserveLineWidth(node: XastElement, path: string) {
  if (!TAGS_TO_PRESERVE_LINE_WIDTH_OF[node.name]) {
    return;
  }

  const vectorEffectAttr = node.attributes["vector-effect"];

  if (vectorEffectAttr && vectorEffectAttr !== "non-scaling-stroke") {
    console.warn(
      `"${path}": Element "${node.name}" already contains "vector-effect" property. Please remove it, ` +
        "so it can scale correctly. This element will not be transformed.",
    );
  } else {
    node.attributes["vector-effect"] = "non-scaling-stroke";
  }
}
