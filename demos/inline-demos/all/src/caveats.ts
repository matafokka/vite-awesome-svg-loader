// @ts-ignore
import lineWidth from "@/assets/caveats/line-width.svg?preserve-line-width&set-current-color";
import lineWidthCaveatOrig from "@/assets/caveats/line-width.svg?set-current-color";
import brokenLineWidth from "@/assets/caveats/broken-line-width.svg?preserve-line-width";

// @ts-ignore
import onlyStrokesSupported from "@/assets/caveats/only-strokes-supported.svg?preserve-line-width&set-current-color";
import onlyStrokesSupportedOrig from "@/assets/caveats/only-strokes-supported.svg?set-current-color";

import transparentColors from "@/assets/caveats/white-fill.svg?set-current-color";
import transparentColorsOrig from "@/assets/caveats/white-fill.svg";

import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";
import { setSrcOnCheckboxChange } from "@/utils/dom";
import { onAstroSamePageLoad } from "utils";

export function caveats() {
  onAstroSamePageLoad(() => {
    (function strokeWidthInCssPixels() {
      const image = new SvgImage(lineWidth, "#line-width-images");
      image.getSvgEl().classList.add("standalone-image");
      setSrcOnCheckboxChange(image, "line-width-checkbox", lineWidthCaveatOrig, lineWidth);
      new SvgImage(brokenLineWidth, "#broken-line-width").getSvgEl().classList.add("image");
    })();

    (function preLineWidthWorksOnlyOnStrokes() {
      const image = new SvgImage(onlyStrokesSupported, "#only-strokes-supported-images");
      image.getSvgEl().classList.add("standalone-image");
      setSrcOnCheckboxChange(image, "only-strokes-supported-checkbox", onlyStrokesSupportedOrig, onlyStrokesSupported);
    })();

    (function transparentColorsShouldBeOmitted() {
      const image = new SvgImage(transparentColors, "#transparent-colors-images");
      image.getSvgEl().classList.add("standalone-image");
      setSrcOnCheckboxChange(image, "transparent-colors-checkbox", transparentColorsOrig, transparentColors);
    })();
  });
}
