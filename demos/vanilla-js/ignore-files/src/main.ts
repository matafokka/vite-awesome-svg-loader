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

import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export function main() {
  // Initial markup

  document.getElementById("app")!.innerHTML += `
    <p class="demo-section-caption">Original images:</p>
    <div class="images" id="original-images"></div>

    <p class="demo-section-caption">Preserve line width:</p>
    <div class="images" id="preserve-line-width"></div>

    <p class="demo-section-caption">Set current color:</p>
    <div class="images" id="set-current-color"></div>

    <p class="demo-section-caption">All transformations:</p>
    <div class="images" id="all"></div>

    <p class="demo-section-caption">Skip loading entirely</p>

    <p>
      vite-awesome-svg-loader won't load these files so they will be passed down to another loader. In case of this
      documentation, Astro's loader will load these files like so:
    </p>

    <ol
      id="import-results"
      role="figure"
      aria-label="Import results. Content is irrelevant for the documentation."
    ></ol>
  `;

  // Create images

  const colors = ["#00988a", "orange", "hotpink", "purple", "green"];

  const setColor = (img: SvgImage, index: number) => {
    img.getSvgEl().style.color = colors[index];
    return img;
  };

  [
    new SvgImage(starOriginal, "#original-images"),
    new SvgImage(colorsNotReplacedOriginal, "#original-images"),
    new SvgImage(lineWidthNotPreservedOriginal, "#original-images"),
    new SvgImage(skipTransformsOriginal, "#original-images"),

    new SvgImage(starPreLineWidth, "#preserve-line-width"),
    new SvgImage(colorsNotReplacedPreLineWidth, "#preserve-line-width"),
    new SvgImage(lineWidthNotPreservedPreLineWidth, "#preserve-line-width"),
    new SvgImage(skipTransformsPreLineWidth, "#preserve-line-width"),

    ...[
      new SvgImage(starSetCurrentColor, "#set-current-color"),
      new SvgImage(colorsNotReplacedSetCurrentColor, "#set-current-color"),
      new SvgImage(lineWidthNotPreservedSetCurrentColor, "#set-current-color"),
      new SvgImage(skipTransformsSetCurrentColor, "#set-current-color"),
    ].map(setColor),

    ...[
      new SvgImage(starAll, "#all"),
      new SvgImage(colorsNotReplacedAll, "#all"),
      new SvgImage(lineWidthNotPreservedAll, "#all"),
      new SvgImage(skipTransformsAll, "#all"),
    ].map(setColor),
  ].forEach((img) => img.getSvgEl().classList.add("image"));

  // Print skipped files import results

  const maxLen = 40;
  const minCutCharacters = 5;

  const cutString = (str: string) => {
    if (str.length - maxLen < minCutCharacters) {
      return str;
    }

    return str.substring(0, maxLen - 1) + "…";
  };

  const skippedFiles = [skipLoadingOriginal, skipLoadingPreLineWidth, skipLoadingSetCurrentColor, skipLoadingAll];
  const importResults = document.getElementById("import-results")!;

  for (const importResult of skippedFiles) {
    importResults.innerHTML += `
    <li aria-hidden="true">
      <code>
        ${cutString(importResult)}
      </code>
    </li>
  `;
  }
}
