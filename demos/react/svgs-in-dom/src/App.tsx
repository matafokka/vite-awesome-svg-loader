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

import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <p className="demo-section-caption">Original images:</p>

      <div className="images">
        <div dangerouslySetInnerHTML={{ __html: musicIconSrc }} />
        <div dangerouslySetInnerHTML={{ __html: starIconSrc }} />
        <div dangerouslySetInnerHTML={{ __html: videoIconSrc }} />
        <div dangerouslySetInnerHTML={{ __html: ghostImgSrc }} />
        <div dangerouslySetInnerHTML={{ __html: sunImgSrc }} />
      </div>

      <p className="demo-section-caption">Preserve line width:</p>

      <div className="images">
        <div dangerouslySetInnerHTML={{ __html: musicIconPreWidthSrc }} />
        <div dangerouslySetInnerHTML={{ __html: starIconPreWidthSrc }} />
        <div dangerouslySetInnerHTML={{ __html: videoIconPreWidthSrc }} />
        <div dangerouslySetInnerHTML={{ __html: ghostImgPreWidthSrc }} />
        <div dangerouslySetInnerHTML={{ __html: sunImgPreWidthSrc }} />
      </div>

      <p className="demo-section-caption">Set current color:</p>

      <div className="images">
        <div
          dangerouslySetInnerHTML={{ __html: musicIconCurrentColorSrc }}
          style={{ color: "#00988a" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: starIconCurrentColorSrc }}
          style={{ color: "orange" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: videoIconCurrentColorSrc }}
          style={{ color: "hotpink" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: ghostImgCurrentColorSrc }}
          style={{ color: "purple" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: sunImgCurrentColorSrc }}
          style={{ color: "green" }}
        />
      </div>

      <p className="demo-section-caption">All transformations:</p>

      <div className="images">
        <div
          dangerouslySetInnerHTML={{ __html: musicIconAllSrc }}
          style={{ color: "#00988a" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: starIconAllSrc }}
          style={{ color: "orange" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: videoIconAllSrc }}
          style={{ color: "hotpink" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: ghostImgAllSrc }}
          style={{ color: "purple" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: sunImgAllSrc }}
          style={{ color: "green" }}
        />
      </div>
    </Fragment>
  );
}
