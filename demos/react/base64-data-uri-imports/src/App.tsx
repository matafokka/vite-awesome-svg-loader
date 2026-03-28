import { Fragment } from "react";

import musicIconUrl from "@/assets/icons/music.svg?base64-data-uri";
import starIconUrl from "@/assets/icons/star.svg?base64-data-uri";
import videoIconUrl from "@/assets/icons/video.svg?base64-data-uri";
import ghostImgUrl from "@/assets/lineart/ghost.svg?base64-data-uri";
import sunImgUrl from "@/assets/lineart/sun.svg?base64-data-uri";

import musicIconPreWidthUrl from "@/assets/icons/music.svg?base64-data-uri&preserve-line-width";
import starIconPreWidthUrl from "@/assets/icons/star.svg?base64-data-uri&preserve-line-width";
import videoIconPreWidthUrl from "@/assets/icons/video.svg?base64-data-uri&preserve-line-width";
import ghostImgPreWidthUrl from "@/assets/lineart/ghost.svg?base64-data-uri&preserve-line-width";
import sunImgPreWidthUrl from "@/assets/lineart/sun.svg?base64-data-uri&preserve-line-width";

export default function App() {
  return (
    <Fragment>
      <p className="demo-section-caption">Original images:</p>

      <div className="images">
        <img
          src={musicIconUrl}
          alt=""
        />
        <img
          src={starIconUrl}
          alt=""
        />
        <img
          src={videoIconUrl}
          alt=""
        />
        <img
          src={ghostImgUrl}
          alt=""
        />
        <img
          src={sunImgUrl}
          alt=""
        />
      </div>

      <p className="demo-section-caption">Preserved line width:</p>

      <div className="images">
        <img
          src={musicIconPreWidthUrl}
          alt=""
        />
        <img
          src={starIconPreWidthUrl}
          alt=""
        />
        <img
          src={videoIconPreWidthUrl}
          alt=""
        />
        <img
          src={ghostImgPreWidthUrl}
          alt=""
        />
        <img
          src={sunImgPreWidthUrl}
          alt=""
        />
      </div>
    </Fragment>
  );
}
