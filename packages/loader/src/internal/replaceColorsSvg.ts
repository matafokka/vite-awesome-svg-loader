import { XastChild, XastElement } from "svgo/lib/types";
import { IGNORE_COLORS, COLOR_ATTRS_TO_REPLACE } from "./const";
import { replaceColor } from "./misc";
import { ResolvedColorReplacements } from "./types";
import { replaceColorsCss } from "./replaceColorsCss";

/**
 * A list of elements which should have `fill` property to be forcefully replaced.
 *
 * Fill color of these elements defaults to black, if `fill` property is not defined.
 */
const ELEMENTS_TO_FORCE_SET_FILL_OF: Record<string, true> = {
  circle: true,
  ellipse: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  text: true,
  textPath: true,
  tref: true,
  tspan: true,
};

const COLOR_ATTRS_TO_REPLACE_SVG = { ...COLOR_ATTRS_TO_REPLACE };
delete COLOR_ATTRS_TO_REPLACE_SVG.fill; // Fill is handled separately

/**
 * Sets current color of a given node
 * @returns New value of `isFillSetOnRoot`.
 */
export function replaceColorsSvg(
  node: XastElement,
  isFillSetOnRoot: boolean,
  replacements: ResolvedColorReplacements,
  nodesWithOrigColors: XastChild[],
) {
  if (node.name === "style") {
    const firstChild: any = node.children[0];
    const newCss = replaceColorsCss(firstChild?.value, replacements, nodesWithOrigColors, false);

    if (newCss) {
      firstChild.value = newCss;
    }
  } else {
    const newCss = replaceColorsCss(node.attributes.style, replacements, nodesWithOrigColors, true);

    if (newCss) {
      node.attributes.style = newCss;
    }
  }

  const isRoot = node.name === "svg";
  const fillAttr = node.attributes.fill;

  // If fill is set on <svg>, it'll override default fill of all underlying elements. If that's the case,
  // we shouldn't forcefully replace fill color of elements that are filled by default but don't have a color set
  if (isRoot && fillAttr) {
    isFillSetOnRoot = true;
  }

  // Forcefully replace fill color unless we have what's described above
  if (
    ((isRoot && isFillSetOnRoot) || (!isRoot && !isFillSetOnRoot && ELEMENTS_TO_FORCE_SET_FILL_OF[node.name])) &&
    !IGNORE_COLORS[fillAttr]
  ) {
    node.attributes.fill = replaceColor(fillAttr, replacements);
  }

  // Replace rest of the colors
  for (const attr in COLOR_ATTRS_TO_REPLACE_SVG) {
    const attrsColor = node.attributes[attr];

    if (attrsColor && !IGNORE_COLORS[attrsColor]) {
      node.attributes[attr] = replaceColor(attrsColor, replacements);
    }
  }

  return isFillSetOnRoot;
}
