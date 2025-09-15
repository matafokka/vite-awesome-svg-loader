import musicIconUrl from "@/assets/icons/music.svg?url";
import starIconUrl from "@/assets/icons/star.svg?url";
import videoIconUrl from "@/assets/icons/video.svg?url";
import ghostImgUrl from "@/assets/lineart/ghost.svg?url";
import sunImgUrl from "@/assets/lineart/sun.svg?url";

import musicIconPreWidthUrl from "@/assets/icons/music.svg?url&preserve-line-width";
import starIconPreWidthUrl from "@/assets/icons/star.svg?url&preserve-line-width";
import videoIconPreWidthUrl from "@/assets/icons/video.svg?url&preserve-line-width";
import ghostImgPreWidthUrl from "@/assets/lineart/ghost.svg?url&preserve-line-width";
import sunImgPreWidthUrl from "@/assets/lineart/sun.svg?url&preserve-line-width";

export function main() {
  document.getElementById("app")!.innerHTML += `
    <p class="demo-section-caption">Original images:</p>

    <div class="images">
      <img
        alt=""
        src="${musicIconUrl}"
        class="image"
      />
      <img
        alt=""
        src="${starIconUrl}"
        class="image"
      />
      <img
        alt=""
        src="${videoIconUrl}"
        class="image"
      />
      <img
        alt=""
        src="${ghostImgUrl}"
        class="image"
      />
      <img
        alt=""
        src="${sunImgUrl}"
        class="image"
      />
    </div>

    <p class="demo-section-caption">Preserved line width:</p>

    <div class="images">
      <img
        alt=""
        src="${musicIconPreWidthUrl}"
        class="image"
      />
      <img
        alt=""
        src="${starIconPreWidthUrl}"
        class="image"
      />
      <img
        alt=""
        src="${videoIconPreWidthUrl}"
        class="image"
      />
      <img
        alt=""
        src="${ghostImgPreWidthUrl}"
        class="image"
      />
      <img
        alt=""
        src="${sunImgPreWidthUrl}"
        class="image"
      />
    </div>
  `;
}
