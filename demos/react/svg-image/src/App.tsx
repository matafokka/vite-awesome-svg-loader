import musicIconSrc from "@/assets/original/icons/music.svg";
import starIconSrc from "@/assets/original/icons/star.svg";
import videoIconSrc from "@/assets/original/icons/video.svg";
import ghostImgSrc from "@/assets/original/lineart/ghost.svg";
import sunImgSrc from "@/assets/original/lineart/sun.svg";

import musicIconPreWidthSrc from "@/assets/preserve-line-width/icons/music.svg";
import starIconPreWidthSrc from "@/assets/preserve-line-width/icons/star.svg";
import videoIconPreWidthSrc from "@/assets/preserve-line-width/icons/video.svg";
import ghostImgPreWidthSrc from "@/assets/preserve-line-width/lineart/ghost.svg";
import sunImgPreWidthSrc from "@/assets/preserve-line-width/lineart/sun.svg";

import musicIconCurrentColorSrc from "@/assets/set-current-color/icons/music.svg";
import starIconCurrentColorSrc from "@/assets/set-current-color/icons/star.svg";
import videoIconCurrentColorSrc from "@/assets/set-current-color/icons/video.svg";
import ghostImgCurrentColorSrc from "@/assets/set-current-color/lineart/ghost.svg";
import sunImgCurrentColorSrc from "@/assets/set-current-color/lineart/sun.svg";

import musicIconAllSrc from "@/assets/all/icons/music.svg";
import starIconAllSrc from "@/assets/all/icons/star.svg";
import videoIconAllSrc from "@/assets/all/icons/video.svg";
import ghostImgAllSrc from "@/assets/all/lineart/ghost.svg";
import sunImgAllSrc from "@/assets/all/lineart/sun.svg";

import { SvgImage } from "vite-awesome-svg-loader/react-integration";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <p className="demo-section-caption">Original images:</p>

      <div className="images">
        <SvgImage
          src={musicIconSrc}
          className="image"
        />
        <SvgImage
          src={starIconSrc}
          className="image"
        />
        <SvgImage
          src={videoIconSrc}
          className="image"
        />
        <SvgImage
          src={ghostImgSrc}
          className="image"
        />
        <SvgImage
          src={sunImgSrc}
          className="image"
        />
      </div>

      <p className="demo-section-caption">Preserve line width:</p>

      <div className="images">
        <SvgImage
          src={musicIconPreWidthSrc}
          className="image"
        />
        <SvgImage
          src={starIconPreWidthSrc}
          className="image"
        />
        <SvgImage
          src={videoIconPreWidthSrc}
          className="image"
        />
        <SvgImage
          src={ghostImgPreWidthSrc}
          className="image"
        />
        <SvgImage
          src={sunImgPreWidthSrc}
          className="image"
        />
      </div>

      <p className="demo-section-caption">Set current color:</p>

      <div className="images">
        <SvgImage
          src={musicIconCurrentColorSrc}
          className="image"
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={starIconCurrentColorSrc}
          className="image"
          style={{ color: "orange" }}
        />
        <SvgImage
          src={videoIconCurrentColorSrc}
          className="image"
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={ghostImgCurrentColorSrc}
          className="image"
          style={{ color: "purple" }}
        />
        <SvgImage
          src={sunImgCurrentColorSrc}
          className="image"
          style={{ color: "green" }}
        />
      </div>

      <p className="demo-section-caption">All transformations:</p>

      <div className="images">
        <SvgImage
          src={musicIconAllSrc}
          className="image"
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={starIconAllSrc}
          className="image"
          style={{ color: "orange" }}
        />
        <SvgImage
          src={videoIconAllSrc}
          className="image"
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={ghostImgAllSrc}
          className="image"
          style={{ color: "purple" }}
        />
        <SvgImage
          src={sunImgAllSrc}
          className="image"
          style={{ color: "green" }}
        />
      </div>
    </Fragment>
  );
}
