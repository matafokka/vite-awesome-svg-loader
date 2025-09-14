import { useEffect, useState, AllHTMLAttributes } from "react";
import { SvgImage } from "./SvgImage";
import { SvgIconProps as SvgIconPropsRaw } from "types";

export interface SvgIconProps extends SvgIconPropsRaw, Omit<AllHTMLAttributes<HTMLSpanElement>, "size" | "src"> {}

export function SvgIcon({ src, size, color, colorTransition, ...attrs }: SvgIconProps) {
  const getIconStyle = () => {
    const style: Record<string, any> = {};

    if (size && size !== "unset") {
      for (const param of ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"]) {
        style[param] = size;
      }
    }

    if (color) {
      style["--icon-color"] = color;
    }

    style["--icon-transition"] = colorTransition || "0.3s linear";

    return style;
  };

  const [iconStyle, setIconStyle] = useState(getIconStyle);
  useEffect(() => setIconStyle(getIconStyle()), [size, color, colorTransition]);

  return (
    <span
      {...attrs}
      className={"awesome-svg-loader-icon icon " + attrs.className}
      style={{ ...attrs.style, ...iconStyle }}
    >
      <SvgImage
        src={src}
        aria-hidden="true"
      />
    </span>
  );
}
