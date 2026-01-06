import { SvgIconStyleProps } from "./types";

/**
 * Converts `SvgIcon` props into a key-value pairs that should be passed to the element's `style` attribute.
 *
 * Keys format:
 *
 * 1. CSS variables are in snake case: `--var-name`.
 * 1. CSS properties are in camel case: `minWidth`.
 *
 * @param props `SvgIcon` props
 * @param options Conversion options
 * @returns Style map
 */
export function getSvgIconStyle(props: SvgIconStyleProps) {
  const style: Record<string, string> = {};

  if (props.size && props.size !== "unset") {
    for (const param of ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"]) {
      style[param] = props.size;
    }
  }

  if (props.color) {
    style["--icon-color"] = props.color;
  }

  style["--icon-transition"] = props.colorTransition || "0.3s linear";

  return style;
}
