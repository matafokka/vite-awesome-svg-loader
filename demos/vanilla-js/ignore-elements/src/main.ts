import imageSrc from "@/assets/ignore-elements.svg";
import originalImageSrc from "@/assets/ignore-elements-original.svg";
import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export function main() {
  document.getElementById("app")!.innerHTML += `
    <demo-checkbox
      id="checkbox"
      label="Show original image"
    ></demo-checkbox>
  `;

  const image = new SvgImage(imageSrc, "#app");
  const svgEl = image.getSvgEl();
  svgEl.classList.add("standalone-image");
  svgEl.style.color = "red";
  svgEl.style.marginTop = "24px";

  document
    .getElementById("checkbox")!
    .addEventListener("change", (e: any) => image.setSrc(e.checked ? originalImageSrc : imageSrc));
}
