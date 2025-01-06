import multicolorPrimaryImageSrc from "@/assets/recipes/multicolor/primary.svg?set-current-color";
import multicolorSecondaryImageSrc from "@/assets/recipes/multicolor/secondary.svg?set-current-color";
import multicolorTertiaryImageSrc from "@/assets/recipes/multicolor/tertiary.svg?set-current-color";

import "./CompositeImage.scss";

import { SvgImage } from "vite-awesome-svg-loader/react-integration";

export interface CompositeImageProps {
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

export function CompositeImage({ primary, secondary, tertiary }: CompositeImageProps) {
  return (
    <div className="image composite-image">
      <SvgImage
        src={multicolorPrimaryImageSrc}
        style={{ color: primary || "red" }}
      />

      <SvgImage
        src={multicolorSecondaryImageSrc}
        style={{ color: secondary || "blue" }}
      />

      <SvgImage
        src={multicolorTertiaryImageSrc}
        style={{ color: tertiary || "green" }}
      />
    </div>
  );
}
