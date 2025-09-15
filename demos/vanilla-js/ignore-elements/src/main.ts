import imageSrc from "@/assets/ignore-elements.svg";
import originalImageSrc from "@/assets/ignore-elements-original.svg";
import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export function main() {
  document.getElementById("app")!.innerHTML += `
    <demo-checkbox
      id="checkbox"
      label="Show original image"
    ></demo-checkbox>

    <div
      id="images"
      class="images"
      style="color: red; margin-top: 24px;"
    ></div>
  `;

  const image = new SvgImage(imageSrc, "#images");

  document
    .getElementById("checkbox")!
    .addEventListener("change", (e: any) => image.setSrc(e.checked ? originalImageSrc : imageSrc));
}
