import imageSrc from "@/assets/image.svg";
import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export function main() {
  document.getElementById("app")!.innerHTML += `<div id="images" class="images"></div>`;

  // Create two images with different colors

  const colorVars: Record<string, string>[] = [
    {
      "--primary-color": "red",
      "--secondary-color": "green",
      "--tertiary-color": "blue",
    },
    {
      "--primary-color": "magenta",
      "--secondary-color": "cyan",
      "--tertiary-color": "yellow",
    },
  ];

  const container = document.getElementById("images")!;

  for (let i = 0; i < colorVars.length; i++) {
    const svgEl = new SvgImage(imageSrc, container).getSvgEl();
    svgEl.classList.add("image");

    const vars = colorVars[i];

    for (const cssVar in vars) {
      svgEl.style.setProperty(cssVar, vars[cssVar]);
    }
  }
}
