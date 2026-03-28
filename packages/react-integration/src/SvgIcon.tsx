import { useEffect, useState, AllHTMLAttributes } from "react";
import { SvgImage } from "./SvgImage";
import { getSvgIconStyle, initSvgIcons, SvgIconProps as SvgIconPropsRaw } from "integration-utils";

export interface SvgIconProps extends SvgIconPropsRaw, Omit<AllHTMLAttributes<HTMLSpanElement>, "size" | "src"> {}

export function SvgIcon({ src, size, color, colorTransition, ...attrs }: SvgIconProps) {
  initSvgIcons();

  const getIconStyle = () => getSvgIconStyle({ size, color, colorTransition });
  const [iconStyle, setIconStyle] = useState(getIconStyle());
  useEffect(() => setIconStyle(getIconStyle()), [size, color, colorTransition]);

  return (
    <span
      {...attrs}
      className={"vite-awesome-svg-loader-icon " + attrs.className}
      style={{ ...attrs.style, ...iconStyle }}
    >
      <SvgImage
        src={src}
        aria-hidden="true"
      />
    </span>
  );
}
