import imageSrc from "@/assets/image.svg";

import esc from "escape-html";
import { SvgImage } from "vite-awesome-svg-loader/web-components-integration";

export function main() {
  SvgImage.define();

  document.getElementById("app")!.innerHTML += `
    <div class="images">
      <svg-image
        src="${esc(imageSrc)}"
        style="--primary-color: red; --secondary-color: green; --tertiary-color: blue;"
      ></svg-image>

      <svg-image
        src="${esc(imageSrc)}"
        style="--primary-color: magenta; --secondary-color: cyan; --tertiary-color: yellow;"
      ></svg-image>
    </div>
  `;
}
