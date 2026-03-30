import styles from "@/assets/icons.scss?inline";

import { createStyle } from "common-utils";
import { SvgIconStyleProps } from "./types";

/**
 * ID of a `<style>` element that contains SVG icons' styles
 */
export const SVG_ICONS_STYLE_ID = "vite-awesome-svg-loader-icons-styles";

/**
 * Default `SvgIcon` color transition
 */
export const SVG_ICON_DEFAULT_COLOR_TRANSITION = "0.3s linear";

/**
 * Initializes SVG icons. Must be called in component's constructor function. Executes only once, so it may be called
 * multiple times.
 */
export function initSvgIcons() {
  if (typeof window !== "undefined") {
    createStyle(SVG_ICONS_STYLE_ID, styles);
  }
}

/**
 * Converts `SvgIcon` props into a "CSS variable -> value" pairs that should be passed to the element's `style`
 * attribute.
 *
 * Example value:
 *
 * ```ts
 * {
 *   "--size": "48rem",
 *   "--color": "red",
 * }
 * ```
 *
 * @param props `SvgIcon` props
 * @returns Icon style
 */
export function getSvgIconStyle(props: SvgIconStyleProps) {
  const style: Record<string, string> = {};

  if (props.size) {
    style["--size"] = props.size;
  }

  if (props.color) {
    style["--color"] = props.color;
  }

  style["--color-transition"] = props.colorTransition || SVG_ICON_DEFAULT_COLOR_TRANSITION;

  return style;
}
