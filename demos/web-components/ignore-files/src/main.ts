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

import esc from "escape-html";
import { SvgImage } from "vite-awesome-svg-loader/web-components-integration";

export function main() {
  SvgImage.define();
  const skippedFiles = [skipLoadingOriginal, skipLoadingPreLineWidth, skipLoadingSetCurrentColor, skipLoadingAll];

  // Helpers

  const maxLen = 40;
  const minCutCharacters = 5;

  const cutString = (str: string) => {
    if (str.length - maxLen < minCutCharacters) {
      return str;
    }

    return str.substring(0, maxLen - 1) + "…";
  };

  document.getElementById("app")!.innerHTML += `
    <p class="demo-section-caption">Original images:</p>

    <div class="images">
      <svg-image src="${esc(starOriginal)}"></svg-image>
      <svg-image src="${esc(colorsNotReplacedOriginal)}"></svg-image>
      <svg-image src="${esc(lineWidthNotPreservedOriginal)}"></svg-image>
      <svg-image src="${esc(skipTransformsOriginal)}"></svg-image>
    </div>

    <p class="demo-section-caption">Preserve line width:</p>

    <div class="images">
      <svg-image src="${esc(starPreLineWidth)}"></svg-image>
      <svg-image src="${esc(colorsNotReplacedPreLineWidth)}"></svg-image>
      <svg-image src="${esc(lineWidthNotPreservedPreLineWidth)}"></svg-image>
      <svg-image src="${esc(skipTransformsPreLineWidth)}"></svg-image>
    </div>

    <p class="demo-section-caption">Set current color:</p>

    <div class="images">
      <svg-image
        src="${esc(starSetCurrentColor)}"
        style="color: #00988a"
      ></svg-image>

      <svg-image
        src="${esc(colorsNotReplacedSetCurrentColor)}"
        style="color: orange"
      ></svg-image>

      <svg-image
        src="${esc(lineWidthNotPreservedSetCurrentColor)}"
        style="color: hotpink"
      ></svg-image>

      <svg-image
        src="${esc(skipTransformsSetCurrentColor)}"
        style="color: purple"
      ></svg-image>
    </div>

    <p class="demo-section-caption">All transformations:</p>

    <div class="images">
      <svg-image
        src="${esc(starAll)}"
        style="color: #00988a"
      ></svg-image>

      <svg-image
        src="${esc(colorsNotReplacedAll)}"
        style="color: orange"
      ></svg-image>

      <svg-image
        src="${esc(lineWidthNotPreservedAll)}"
        style="color: hotpink"
      ></svg-image>

      <svg-image
        src="${esc(skipTransformsAll)}"
        style="color: purple"
      ></svg-image>
    </div>

    <p class="demo-section-caption">Skip loading entirely</p>

    <p>
      vite-awesome-svg-loader won't load these files so they will be passed down to another loader. In case of this
      documentation, Astro's loader will load these files like so:
    </p>

    <ol
      role="figure"
      aria-label="Import results. Content is irrelevant for the documentation."
    >
      ${skippedFiles
        .map(
          (importResult) => `
            <li aria-hidden="true">
              <code>${cutString(importResult)}</code>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}
