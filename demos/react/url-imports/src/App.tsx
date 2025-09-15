import { Fragment } from "react";

import musicIconUrl from "@/assets/icons/music.svg?url";
import starIconUrl from "@/assets/icons/star.svg?url";
import videoIconUrl from "@/assets/icons/video.svg?url";
import ghostImgUrl from "@/assets/lineart/ghost.svg?url";
import sunImgUrl from "@/assets/lineart/sun.svg?url";

import musicIconPreWidthUrl from "@/assets/icons/music.svg?url&preserve-line-width";
import starIconPreWidthUrl from "@/assets/icons/star.svg?url&preserve-line-width";
import videoIconPreWidthUrl from "@/assets/icons/video.svg?url&preserve-line-width";
import ghostImgPreWidthUrl from "@/assets/lineart/ghost.svg?url&preserve-line-width";
import sunImgPreWidthUrl from "@/assets/lineart/sun.svg?url&preserve-line-width";

export default function App() {
  return (
    <Fragment>
      <p className="demo-section-caption">Original images:</p>

      <div className="images">
        <img
          src={musicIconUrl}
          className="image"
        />
        <img
          src={starIconUrl}
          className="image"
        />
        <img
          src={videoIconUrl}
          className="image"
        />
        <img
          src={ghostImgUrl}
          className="image"
        />
        <img
          src={sunImgUrl}
          className="image"
        />
      </div>

      <p className="demo-section-caption">Preserved line width:</p>

      <div className="images">
        <img
          src={musicIconPreWidthUrl}
          className="image"
        />
        <img
          src={starIconPreWidthUrl}
          className="image"
        />
        <img
          src={videoIconPreWidthUrl}
          className="image"
        />
        <img
          src={ghostImgPreWidthUrl}
          className="image"
        />
        <img
          src={sunImgPreWidthUrl}
          className="image"
        />
      </div>
    </Fragment>
  );
}
