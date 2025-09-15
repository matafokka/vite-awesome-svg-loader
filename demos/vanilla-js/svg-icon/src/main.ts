import musicIconSrc from "@/assets/icons/music.svg";
import starIconSrc from "@/assets/icons/star.svg";
import videoIconSrc from "@/assets/icons/video.svg";
import ghostImgSrc from "@/assets/lineart/ghost.svg";
import sunImgSrc from "@/assets/lineart/sun.svg";

import { SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";

export function main() {
  // Initial markup

  document.getElementById("app")!.innerHTML += `
    <div
      id="icons"
      class="images"
    >
      <button
        id="cycle-button"
        class="demo-button"
      >
        Cycle colors
      </button>
    </div>
  `;

  // Create icons

  const icons = [
    new SvgIcon(musicIconSrc),
    new SvgIcon(starIconSrc),
    new SvgIcon(videoIconSrc),
    new SvgIcon(ghostImgSrc),
    new SvgIcon(sunImgSrc),
  ];

  const container = document.getElementById("icons")!;

  for (const icon of icons) {
    icon.getSvgEl().classList.add("image");
    icon.mount(container);
  }

  // Set icon color

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

    for (const icon of icons) {
      icon.setColor(color);
    }
  };

  document.getElementById("cycle-button")!.addEventListener("click", cycleColors);
  updateColor();
}
