import musicIconSrc from "@/assets/icons/music.svg";
import starIconSrc from "@/assets/icons/star.svg";
import videoIconSrc from "@/assets/icons/video.svg";
import ghostImgSrc from "@/assets/lineart/ghost.svg";
import sunImgSrc from "@/assets/lineart/sun.svg";

import { SvgIcon } from "vite-awesome-svg-loader/react-integration";
import { Fragment, useState } from "react";

const colors = ["red", "green", "blue"];

export default function App() {
  const [colorIndex, setColorIndex] = useState(0);
  const color = colors[colorIndex];

  const cycleColors = () => {
    let index = colorIndex + 1;

    if (index === colors.length) {
      index = 0;
    }

    setColorIndex(index);
  };

  return (
    <Fragment>
      <div className="images">
        <button
          className="demo-button"
          onClick={cycleColors}
        >
          Cycle colors
        </button>

        <SvgIcon
          src={musicIconSrc}
          color={color}
        />
        <SvgIcon
          src={starIconSrc}
          color={color}
        />
        <SvgIcon
          src={videoIconSrc}
          color={color}
        />
        <SvgIcon
          src={ghostImgSrc}
          color={color}
        />
        <SvgIcon
          src={sunImgSrc}
          color={color}
        />
      </div>
    </Fragment>
  );
}
