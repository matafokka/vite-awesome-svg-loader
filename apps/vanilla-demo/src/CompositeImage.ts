import multicolorPrimaryImageSrc from "@/assets/recipes/multicolor/primary.svg?set-current-color";
import multicolorSecondaryImageSrc from "@/assets/recipes/multicolor/secondary.svg?set-current-color";
import multicolorTertiaryImageSrc from "@/assets/recipes/multicolor/tertiary.svg?set-current-color";

import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export interface CompositeImageProps {
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

export class CompositeImage {
  private container = document.createElement("div");

  constructor(mountTo: string | Element, props: CompositeImageProps = {}) {
    const createImg = (src: string, color: string) => {
      const img = new SvgImage(src, this.container);
      const svg = img.getSvgEl();
      svg.style.color = color;
      svg.style.position = "absolute";
      return img;
    };

    this.container.className = "image";
    this.container.style.position = "relative";

    createImg(multicolorPrimaryImageSrc, props.primary || "red");
    createImg(multicolorSecondaryImageSrc, props.secondary || "blue");
    createImg(multicolorTertiaryImageSrc, props.tertiary || "green");

    (typeof mountTo === "string" ? document.querySelector(mountTo) : mountTo)?.appendChild(this.container);
  }
}
