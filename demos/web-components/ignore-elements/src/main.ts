import imageSrc from "@/assets/ignore-elements.svg";
import originalImageSrc from "@/assets/ignore-elements-original.svg";

import esc from "escape-html";
import { SvgImage } from "vite-awesome-svg-loader/web-components-integration";

export function main() {
  SvgImage.define();

  document.getElementById("app")!.innerHTML += `
    <demo-checkbox
      id="checkbox"
      label="Show original image"
    ></demo-checkbox>

    <svg-image
      src="${esc(imageSrc)}"
      class="standalone-image"
      style="color: red; margin-top: 24px;"
    ></svg-image>
  `;

  const image = document.getElementById("app")!.getElementsByTagName("svg-image")[0]!;

  document
    .getElementById("checkbox")!
    .addEventListener("change", (e: any) => (image.src = e.checked ? originalImageSrc : imageSrc));
}
