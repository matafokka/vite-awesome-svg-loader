import starOriginal from "@/assets/original/star.svg";
import colorsNotReplacedOriginal from "@/assets/original/colors-not-replaced.svg";
import lineWidthNotPreservedOriginal from "@/assets/original/line-width-not-preserved.svg";
import skipTransformsOriginal from "@/assets/original/skip-transforms.svg";
import skipLoadingOriginal from "@/assets/original/skip-loading.svg";

import starPreLineWidth from "@/assets/preserve-line-width/star.svg";
import colorsNotReplacedPreLineWidth from "@/assets/preserve-line-width/colors-not-replaced.svg";
import lineWidthNotPreservedPreLineWidth from "@/assets/preserve-line-width/line-width-not-preserved.svg";
import skipTransformsPreLineWidth from "@/assets/preserve-line-width/skip-transforms.svg";
import skipLoadingPreLineWidth from "@/assets/preserve-line-width/skip-loading.svg";

import starSetCurrentColor from "@/assets/set-current-color/star.svg";
import colorsNotReplacedSetCurrentColor from "@/assets/set-current-color/colors-not-replaced.svg";
import lineWidthNotPreservedSetCurrentColor from "@/assets/set-current-color/line-width-not-preserved.svg";
import skipTransformsSetCurrentColor from "@/assets/set-current-color/skip-transforms.svg";
import skipLoadingSetCurrentColor from "@/assets/set-current-color/skip-loading.svg";

import starAll from "@/assets/all/star.svg";
import colorsNotReplacedAll from "@/assets/all/colors-not-replaced.svg";
import lineWidthNotPreservedAll from "@/assets/all/line-width-not-preserved.svg";
import skipTransformsAll from "@/assets/all/skip-transforms.svg";
import skipLoadingAll from "@/assets/all/skip-loading.svg";

import { SvgImage } from "vite-awesome-svg-loader/react-integration";
import { Fragment } from "react";

// Cut skipped files import results

const maxLen = 40;
const minCutCharacters = 5;

function cutString(str: string) {
  if (str.length - maxLen < minCutCharacters) {
    return str;
  }

  return str.substring(0, maxLen - 1) + "…";
}

const skippedFiles = [skipLoadingOriginal, skipLoadingPreLineWidth, skipLoadingSetCurrentColor, skipLoadingAll].map(
  cutString,
);

export default function App() {
  return (
    <Fragment>
      <p className="demo-section-caption">Original images:</p>

      <div className="images">
        <SvgImage
          src={starOriginal}
          className="image"
        />
        <SvgImage
          src={colorsNotReplacedOriginal}
          className="image"
        />
        <SvgImage
          src={lineWidthNotPreservedOriginal}
          className="image"
        />
        <SvgImage
          src={skipTransformsOriginal}
          className="image"
        />
      </div>

      <p className="demo-section-caption">Preserve line width:</p>

      <div className="images">
        <SvgImage
          src={starPreLineWidth}
          className="image"
        />
        <SvgImage
          src={colorsNotReplacedPreLineWidth}
          className="image"
        />
        <SvgImage
          src={lineWidthNotPreservedPreLineWidth}
          className="image"
        />
        <SvgImage
          src={skipTransformsPreLineWidth}
          className="image"
        />
      </div>

      <p className="demo-section-caption">Set current color:</p>

      <div className="images">
        <SvgImage
          src={starSetCurrentColor}
          className="image"
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={colorsNotReplacedSetCurrentColor}
          className="image"
          style={{ color: "orange" }}
        />
        <SvgImage
          src={lineWidthNotPreservedSetCurrentColor}
          className="image"
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={skipTransformsSetCurrentColor}
          className="image"
          style={{ color: "purple" }}
        />
      </div>

      <p className="demo-section-caption">All transformations:</p>

      <div className="images">
        <SvgImage
          src={starAll}
          className="image"
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={colorsNotReplacedAll}
          className="image"
          style={{ color: "orange" }}
        />
        <SvgImage
          src={lineWidthNotPreservedAll}
          className="image"
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={skipTransformsAll}
          className="image"
          style={{ color: "purple" }}
        />
      </div>

      <p className="demo-section-caption">Skip loading entirely</p>

      <p>
        vite-awesome-svg-loader won't load these files so they will be passed down to another loader. In case of this
        documentation, Astro's loader will load these files like so:
      </p>

      <ol
        role="figure"
        aria-label="Import results. Content is irrelevant for the documentation."
      >
        {skippedFiles.map((importResult, i) => (
          <li
            key={i}
            aria-hidden="true"
          >
            <code>{importResult}</code>
          </li>
        ))}
      </ol>
    </Fragment>
  );
}
