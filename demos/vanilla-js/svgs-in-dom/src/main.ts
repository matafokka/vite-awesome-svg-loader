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

export function main() {
  document.getElementById("app")!.innerHTML += `
    <p class="demo-section-caption">Original images:</p>

    <div class="images">
      <div class="image">${musicIconSrc}</div>
      <div class="image">${starIconSrc}</div>
      <div class="image">${videoIconSrc}</div>
      <div class="image">${ghostImgSrc}</div>
      <div class="image">${sunImgSrc}</div>
    </div>

    <p class="demo-section-caption">Preserve line width:</p>

    <div class="images">
      <div class="image">${musicIconPreWidthSrc}</div>
      <div class="image">${starIconPreWidthSrc}</div>
      <div class="image">${videoIconPreWidthSrc}</div>
      <div class="image">${ghostImgPreWidthSrc}</div>
      <div class="image">${sunImgPreWidthSrc}</div>
    </div>

    <p class="demo-section-caption">Set current color:</p>

    <div class="images">
      <div class="image" style="color: #00988a">${musicIconCurrentColorSrc}</div>
      <div class="image" style="color: orange">${starIconCurrentColorSrc}</div>
      <div class="image" style="color: hotpink">${videoIconCurrentColorSrc}</div>
      <div class="image" style="color: purple">${ghostImgCurrentColorSrc}</div>
      <div class="image" style="color: green">${sunImgCurrentColorSrc}</div>
    </div>

    <p class="demo-section-caption">All transformations:</p>

    <div class="images">
      <div class="image" style="color: #00988a">${musicIconAllSrc}</div>
      <div class="image" style="color: orange">${starIconAllSrc}</div>
      <div class="image" style="color: hotpink">${videoIconAllSrc}</div>
      <div class="image" style="color: purple">${ghostImgAllSrc}</div>
      <div class="image" style="color: green">${sunImgAllSrc}</div>
    </div>
  `;
}
