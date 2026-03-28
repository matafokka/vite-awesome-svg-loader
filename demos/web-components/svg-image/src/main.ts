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

import esc from "escape-html";
import { SvgImage } from "vite-awesome-svg-loader/web-components-integration";

export function main() {
  SvgImage.define();

  document.getElementById("app")!.innerHTML += `
    <p class="demo-section-caption">Original images:</p>

    <div class="images">
      <svg-image src="${esc(musicIconSrc)}"></svg-image>
      <svg-image src="${esc(starIconSrc)}"></svg-image>
      <svg-image src="${esc(videoIconSrc)}"></svg-image>
      <svg-image src="${esc(ghostImgSrc)}"></svg-image>
      <svg-image src="${esc(sunImgSrc)}"></svg-image>
    </div>

    <p class="demo-section-caption">Preserve line width:</p>

    <div class="images">
      <svg-image src="${esc(musicIconPreWidthSrc)}"></svg-image>
      <svg-image src="${esc(starIconPreWidthSrc)}"></svg-image>
      <svg-image src="${esc(videoIconPreWidthSrc)}"></svg-image>
      <svg-image src="${esc(ghostImgPreWidthSrc)}"></svg-image>
      <svg-image src="${esc(sunImgPreWidthSrc)}"></svg-image>
    </div>

    <p class="demo-section-caption">Set current color:</p>

    <div class="images">
      <svg-image
        src="${esc(musicIconCurrentColorSrc)}"
        style="color: #00988a;"
      ></svg-image>

      <svg-image
        src="${esc(starIconCurrentColorSrc)}"
        style="color: orange;"
      ></svg-image>

      <svg-image
        src="${esc(videoIconCurrentColorSrc)}"
        style="color: hotpink;"
      ></svg-image>

      <svg-image
        src="${esc(ghostImgCurrentColorSrc)}"
        style="color: purple;"
      ></svg-image>

      <svg-image
        src="${esc(sunImgCurrentColorSrc)}"
        style="color: green;"
      ></svg-image>
    </div>

    <p class="demo-section-caption">All transformations:</p>

    <div class="images">
      <svg-image
        src="${esc(musicIconAllSrc)}"
        style="color: #00988a;"
      ></svg-image>
      <svg-image
        src="${esc(starIconAllSrc)}"
        style="color: orange;"
      ></svg-image>
      <svg-image
        src="${esc(videoIconAllSrc)}"
        style="color: hotpink;"
      ></svg-image>
      <svg-image
        src="${esc(ghostImgAllSrc)}"
        style="color: purple;"
      ></svg-image>
      <svg-image
        src="${esc(sunImgAllSrc)}"
        style="color: green;"
      ></svg-image>
    </div>
  `;
}
