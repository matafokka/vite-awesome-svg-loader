import starIconUrl from "@/assets/available-transformations/star.svg?url";
import starIconPreLineUrl from "@/assets/available-transformations/star.svg?url&preserve-line-width";
import starIconCurrentColor from "@/assets/available-transformations/star.svg?set-current-color";

import multicolorOrigUrl from "@/assets/available-transformations/multicolor-orig.svg?url";
import multicolorReplacedUrl from "@/assets/available-transformations/multicolor.svg?url";

import { createImage } from "@/utils/dom";
import { onAstroSamePageLoad } from "utils";

/**
 * Adds images to the "Available transformations" page
 */
export function availableTransformations() {
  onAstroSamePageLoad(() => {
    (function preserveLineWidth() {
      const entries: { id: string; url: string }[] = [
        { id: "pre-width-orig", url: starIconUrl },
        { id: "pre-width-transformed", url: starIconPreLineUrl },
      ];

      const sizes = [48, 86, 128];

      for (const { id, url } of entries) {
        const el = document.getElementById(id)!;

        for (const size of sizes) {
          const img = createImage(url);
          img.style.setProperty("--image-size", size + "px");
          el.appendChild(img);
        }
      }
    })();

    (function setCurrentColor() {
      const el = document.getElementById("set-current-color")!;
      el.innerHTML = starIconCurrentColor;
      const svg = el.getElementsByTagName("svg")[0];
      svg.classList.add("image");
      svg.parentElement!.insertBefore(createImage(starIconUrl), svg);
    })();

    (function replaceColors() {
      const el = document.getElementById("replace-colors")!;
      const urls = [multicolorOrigUrl, multicolorReplacedUrl];

      for (const url of urls) {
        el.appendChild(createImage(url));
      }
    })();
  });
}
