import musicIconSrc from "@/assets/icons/music.svg";
import starIconSrc from "@/assets/icons/star.svg";
import videoIconSrc from "@/assets/icons/video.svg";
import ghostImgSrc from "@/assets/lineart/ghost.svg";
import sunImgSrc from "@/assets/lineart/sun.svg";

import esc from "escape-html";
import { SvgIcon } from "vite-awesome-svg-loader/web-components-integration";

export function main() {
  SvgIcon.define();

  document.getElementById("app")!.innerHTML += `
    <div class="images">
      <button
        id="cycle-button"
        class="demo-button"
      >
        Cycle colors
      </button>

      <svg-icon src="${esc(musicIconSrc)}"></svg-icon>
      <svg-icon src="${esc(starIconSrc)}"></svg-icon>
      <svg-icon src="${esc(videoIconSrc)}"></svg-icon>
      <svg-icon src="${esc(ghostImgSrc)}"></svg-icon>
      <svg-icon src="${esc(sunImgSrc)}"></svg-icon>
    </div>
  `;

  const colors = ["red", "green", "blue"];
  let colorIndex = 0;

  const cycleColors = () => {
    colorIndex += 1;

    if (colorIndex === colors.length) {
      colorIndex = 0;
    }

    updateColor();
  };

  const updateColor = () => {
    const color = colors[colorIndex];
    const icons = document.getElementsByTagName("svg-icon");

    for (const icon of icons) {
      icon.color = color;
    }
  };

  document.getElementById("cycle-button")!.addEventListener("click", cycleColors);
  updateColor();
}
