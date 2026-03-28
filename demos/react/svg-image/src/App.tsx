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
        <SvgImage src={musicIconSrc} />
        <SvgImage src={starIconSrc} />
        <SvgImage src={videoIconSrc} />
        <SvgImage src={ghostImgSrc} />
        <SvgImage src={sunImgSrc} />
      </div>

      <p className="demo-section-caption">Preserve line width:</p>

      <div className="images">
        <SvgImage src={musicIconPreWidthSrc} />
        <SvgImage src={starIconPreWidthSrc} />
        <SvgImage src={videoIconPreWidthSrc} />
        <SvgImage src={ghostImgPreWidthSrc} />
        <SvgImage src={sunImgPreWidthSrc} />
      </div>

      <p className="demo-section-caption">Set current color:</p>

      <div className="images">
        <SvgImage
          src={musicIconCurrentColorSrc}
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={starIconCurrentColorSrc}
          style={{ color: "orange" }}
        />
        <SvgImage
          src={videoIconCurrentColorSrc}
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={ghostImgCurrentColorSrc}
          style={{ color: "purple" }}
        />
        <SvgImage
          src={sunImgCurrentColorSrc}
          style={{ color: "green" }}
        />
      </div>

      <p className="demo-section-caption">All transformations:</p>

      <div className="images">
        <SvgImage
          src={musicIconAllSrc}
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={starIconAllSrc}
          style={{ color: "orange" }}
        />
        <SvgImage
          src={videoIconAllSrc}
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={ghostImgAllSrc}
          style={{ color: "purple" }}
        />
        <SvgImage
          src={sunImgAllSrc}
          style={{ color: "green" }}
        />
      </div>
    </Fragment>
  );
}
