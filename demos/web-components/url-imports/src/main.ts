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
        src="${musicIconUrl}"
        alt=""
      />
      <img
        src="${starIconUrl}"
        alt=""
      />
      <img
        src="${videoIconUrl}"
        alt=""
      />
      <img
        src="${ghostImgUrl}"
        alt=""
      />
      <img
        src="${sunImgUrl}"
        alt=""
      />
    </div>

    <p class="demo-section-caption">Preserved line width:</p>

    <div class="images">
      <img
        src="${musicIconPreWidthUrl}"
        alt=""
      />
      <img
        src="${starIconPreWidthUrl}"
        alt=""
      />
      <img
        src="${videoIconPreWidthUrl}"
        alt=""
      />
      <img
        src="${ghostImgPreWidthUrl}"
        alt=""
      />
      <img
        src="${sunImgPreWidthUrl}"
        alt=""
      />
    </div>
  `;
}
