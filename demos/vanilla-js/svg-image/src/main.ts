import musicIconSrc from "@/assets/original/icons/music.svg";
import starIconSrc from "@/assets/original/icons/star.svg";
import videoIconSrc from "@/assets/original/icons/video.svg";
import ghostImgSrc from "@/assets/original/lineart/ghost.svg";
import sunImgSrc from "@/assets/original/lineart/sun.svg";

import musicIconPreWidthSrc from "@/assets/preserve-line-width/icons/music.svg";
import starIconPreWidthSrc from "@/assets/preserve-line-width/icons/star.svg";
import videoIconPreWidthSrc from "@/assets/preserve-line-width/icons/video.svg";
import ghostImgPreWidthSrc from "@/assets/preserve-line-width/lineart/ghost.svg";
import sunImgPreWidthSrc from "@/assets/preserve-line-width/lineart/sun.svg";

import musicIconCurrentColorSrc from "@/assets/set-current-color/icons/music.svg";
import starIconCurrentColorSrc from "@/assets/set-current-color/icons/star.svg";
import videoIconCurrentColorSrc from "@/assets/set-current-color/icons/video.svg";
import ghostImgCurrentColorSrc from "@/assets/set-current-color/lineart/ghost.svg";
import sunImgCurrentColorSrc from "@/assets/set-current-color/lineart/sun.svg";

import musicIconAllSrc from "@/assets/all/icons/music.svg";
import starIconAllSrc from "@/assets/all/icons/star.svg";
import videoIconAllSrc from "@/assets/all/icons/video.svg";
import ghostImgAllSrc from "@/assets/all/lineart/ghost.svg";
import sunImgAllSrc from "@/assets/all/lineart/sun.svg";

import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export function main() {
  // Initial markup

  document.getElementById("app")!.innerHTML += `
    <p class="demo-section-caption">Original images:</p>
    <div class="images" id="original-images"></div>

    <p class="demo-section-caption">Preserve line width:</p>
    <div class="images" id="preserve-line-width"></div>

    <p class="demo-section-caption">Set current color:</p>
    <div class="images" id="set-current-color"></div>

    <p class="demo-section-caption">All transformations:</p>
    <div class="images" id="all"></div>
  `;

  // Create images

  const colors = ["#00988a", "orange", "hotpink", "purple", "green"];

  const setColor = (img: SvgImage, index: number) => {
    img.getSvgEl().style.color = colors[index];
    return img;
  };

  [
    new SvgImage(musicIconSrc, "#original-images"),
    new SvgImage(starIconSrc, "#original-images"),
    new SvgImage(videoIconSrc, "#original-images"),
    new SvgImage(ghostImgSrc, "#original-images"),
    new SvgImage(sunImgSrc, "#original-images"),

    new SvgImage(musicIconPreWidthSrc, "#preserve-line-width"),
    new SvgImage(starIconPreWidthSrc, "#preserve-line-width"),
    new SvgImage(videoIconPreWidthSrc, "#preserve-line-width"),
    new SvgImage(ghostImgPreWidthSrc, "#preserve-line-width"),
    new SvgImage(sunImgPreWidthSrc, "#preserve-line-width"),

    ...[
      new SvgImage(musicIconCurrentColorSrc, "#set-current-color"),
      new SvgImage(starIconCurrentColorSrc, "#set-current-color"),
      new SvgImage(videoIconCurrentColorSrc, "#set-current-color"),
      new SvgImage(ghostImgCurrentColorSrc, "#set-current-color"),
      new SvgImage(sunImgCurrentColorSrc, "#set-current-color"),
    ].map(setColor),

    ...[
      new SvgImage(musicIconAllSrc, "#all"),
      new SvgImage(starIconAllSrc, "#all"),
      new SvgImage(videoIconAllSrc, "#all"),
      new SvgImage(ghostImgAllSrc, "#all"),
      new SvgImage(sunImgAllSrc, "#all"),
    ].map(setColor),
  ].forEach((img) => img.getSvgEl().classList.add("image"));
}
