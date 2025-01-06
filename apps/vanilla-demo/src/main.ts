import "./styles.scss";

// Import original images as URLs
import origMusicIconUrl from "@/assets/import-demo/icons/music.svg?url";
import origStarIconUrl from "@/assets/import-demo/icons/star.svg?url";
import origVideoIconUrl from "@/assets/import-demo/icons/video.svg?url";
import origGhostImageUrl from "@/assets/import-demo/lineart/ghost.svg?url";
import origSunImageUrl from "@/assets/import-demo/lineart/sun.svg?url";

// Import original images as URLs and preserve line width
import preWidthMusicIconUrl from "@/assets/import-demo/icons/music.svg?url&preserve-line-width";
import preWidthStarIconUrl from "@/assets/import-demo/icons/star.svg?url&preserve-line-width";
import preWidthVideoIconUrl from "@/assets/import-demo/icons/video.svg?url&preserve-line-width";
import preWidthGhostImageUrl from "@/assets/import-demo/lineart/ghost.svg?url&preserve-line-width";
import preWidthSunImageUrl from "@/assets/import-demo/lineart/sun.svg?url&preserve-line-width";

// Import original images as sources
import origMusicIconSrc from "@/assets/import-demo/icons/music.svg";
import origStarIconSrc from "@/assets/import-demo/icons/star.svg";
import origVideoIconSrc from "@/assets/import-demo/icons/video.svg";
import origGhostImageSrc from "@/assets/import-demo/lineart/ghost.svg";
import origSunImageSrc from "@/assets/import-demo/lineart/sun.svg";

// Import images as sources and preserve line width
import preWidthMusicIconSrc from "@/assets/import-demo/icons/music.svg?preserve-line-width";
import preWidthStarIconSrc from "@/assets/import-demo/icons/star.svg?preserve-line-width";
import preWidthVideoIconSrc from "@/assets/import-demo/icons/video.svg?preserve-line-width";
import preWidthGhostImageSrc from "@/assets/import-demo/lineart/ghost.svg?preserve-line-width";
import preWidthSunImageSrc from "@/assets/import-demo/lineart/sun.svg?preserve-line-width";

// Import images as sources, preserve line width and replace stroke and fill colors with currentColor.
// Because of TypeScript limitations, we have to put @ts-ignore before the import.
// To avoid doing that, use loader configuration.

// @ts-ignore
import preWidthReplaceColorMusicIconSrc from "@/assets/import-demo/icons/music.svg?preserve-line-width&set-current-color";
// @ts-ignore
import preWidthReplaceColorStarIconSrc from "@/assets/import-demo/icons/star.svg?preserve-line-width&set-current-color";
// @ts-ignore
import preWidthReplaceColorVideoIconSrc from "@/assets/import-demo/icons/video.svg?preserve-line-width&set-current-color";
// @ts-ignore
import preWidthReplaceColorGhostImageSrc from "@/assets/import-demo/lineart/ghost.svg?preserve-line-width&set-current-color";
// @ts-ignore
import preWidthReplaceColorSunImageSrc from "@/assets/import-demo/lineart/sun.svg?preserve-line-width&set-current-color";

// Configuration import demo. Note: there's no configuration in URL, everything's set in vite.config.ts file.

import cfgPreWidthMusicIconSrc from "@/assets/config-demo/preserve-line-width/icons/music.svg";
import cfgPreWidthStarIconSrc from "@/assets/config-demo/preserve-line-width/icons/star.svg";
import cfgPreWidthVideoIconSrc from "@/assets/config-demo/preserve-line-width/icons/video.svg";
import cfgPreWidthGhostImageSrc from "@/assets/config-demo/preserve-line-width/lineart/ghost.svg";
import cfgPreWidthSunImageSrc from "@/assets/config-demo/preserve-line-width/lineart/sun.svg";
import cfgPreWidthSkipTransformsImageSrc from "@/assets/config-demo/preserve-line-width/skip-transforms.svg";
import cfgPreWidthSkipLoading from "@/assets/config-demo/preserve-line-width/skip-loading.svg";

import cfgReplaceColorMusicIconSrc from "@/assets/config-demo/set-current-color/icons/music.svg";
import cfgReplaceColorStarIconSrc from "@/assets/config-demo/set-current-color/icons/star.svg";
import cfgReplaceColorVideoIconSrc from "@/assets/config-demo/set-current-color/icons/video.svg";
import cfgReplaceColorGhostImageSrc from "@/assets/config-demo/set-current-color/lineart/ghost.svg";
import cfgReplaceColorSunImageSrc from "@/assets/config-demo/set-current-color/lineart/sun.svg";
import cfgReplaceColorSkipTransformsImageSrc from "@/assets/config-demo/set-current-color/skip-transforms.svg";
import cfgReplaceColorSkipLoading from "@/assets/config-demo/preserve-line-width/skip-loading.svg";

import cfgAllMusicIconSrc from "@/assets/config-demo/all/icons/music.svg";
import cfgAllStarIconSrc from "@/assets/config-demo/all/icons/star.svg";
import cfgAllVideoIconSrc from "@/assets/config-demo/all/icons/video.svg";
import cfgAllGhostImageSrc from "@/assets/config-demo/all/lineart/ghost.svg";
import cfgAllSunImageSrc from "@/assets/config-demo/all/lineart/sun.svg";
import cfgColorsNotPreservedImageSrc from "@/assets/config-demo/all/colors-not-preserved.svg";
import cfgLineWidthNotPreservedImageSrc from "@/assets/config-demo/all/line-width-not-preserved.svg";
import cfgAllSkipTransformsImageSrc from "@/assets/config-demo/all/skip-transforms.svg";
import cfgAllSkipLoading from "@/assets/config-demo/preserve-line-width/skip-loading.svg";
import cfgIgnoreElementsImageSrc from "@/assets/config-demo/all/ignore-elements.svg";
import cfgIgnoreElementsOrigImageSrc from "@/assets/config-demo/all/ignore-elements-orig.svg";

// Import images as source code data URI
import srcDataUriMusicIcon from "@/assets/import-demo/icons/music.svg?source-data-uri";
import srcDataUriStarIcon from "@/assets/import-demo/icons/star.svg?source-data-uri";
import srcDataUriVideoIcon from "@/assets/import-demo/icons/video.svg?source-data-uri";
import srcDataUriGhostImage from "@/assets/import-demo/lineart/ghost.svg?source-data-uri";
import srcDataUriSunImage from "@/assets/import-demo/lineart/sun.svg?source-data-uri";

// Import images as base64 data URI
import base64DataUriMusicIcon from "@/assets/import-demo/icons/music.svg?source-data-uri";
import base64DataUriStarIcon from "@/assets/import-demo/icons/star.svg?source-data-uri";
import base64DataUriVideoIcon from "@/assets/import-demo/icons/video.svg?source-data-uri";
import base64DataUriGhostImage from "@/assets/import-demo/lineart/ghost.svg?source-data-uri";
import base64DataUriSunImage from "@/assets/import-demo/lineart/sun.svg?source-data-uri";

// Import image as base64
import origMusicIconBase64 from "@/assets/import-demo/icons/music.svg?base64";

// Line width caveat

// @ts-ignore
import lineWidthCaveatImageSrc from "@/assets/caveats/line-width.svg?preserve-line-width&set-current-color";
import lineWidthCaveatOrigImageSrc from "@/assets/caveats/line-width.svg?set-current-color";
import brokenLineWidthImageUrl from "@/assets/caveats/broken-line-width.svg?url&preserve-line-width";

// @ts-ignore
import onlyStrokesSupportedCaveatImageSrc from "@/assets/caveats/only-strokes-supported.svg?preserve-line-width&set-current-color";
import onlyStrokesSupportedCaveatOrigImageSrc from "@/assets/caveats/only-strokes-supported.svg?set-current-color";

import whiteFillCaveatImageSrc from "@/assets/caveats/white-fill.svg?set-current-color";
import whiteFillCaveatOrigImageSrc from "@/assets/caveats/white-fill.svg";

import multicolorOriginalImageUrl from "@/assets/recipes/multicolor/original.svg?url";
import multicolorVarsImageSrc from "@/assets/recipes/multicolor/vars.svg";

// Import components
import { SvgImage, SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";
import { NamedIcon } from "./NamedIcon";

// Import demo-related stuff

import "ui/styles.scss";
import "./dev-tests";
import { initImageSizeAdjustment } from "ui/image-size-adjustment";
import { Checkbox } from "./Checkbox";
import { CompositeImage } from "./CompositeImage";
initImageSizeAdjustment();

// -------------
// Insert imported images as URLs
// -------------

// We'll use functions like this to simplify image creation for our needs

function createImage(url: string, container: Element) {
  const img = document.createElement("img");
  img.className = "image";
  img.src = url;
  container.appendChild(img);
}

function createImages(urls: string[], container: Element) {
  for (const url of urls) {
    createImage(url, container);
  }
}

// Original files
createImages(
  [origMusicIconUrl, origStarIconUrl, origVideoIconUrl, origGhostImageUrl, origSunImageUrl],
  document.getElementById("url-original")!,
);

// Preserve line width
createImages(
  [preWidthMusicIconUrl, preWidthStarIconUrl, preWidthVideoIconUrl, preWidthGhostImageUrl, preWidthSunImageUrl],
  document.getElementById("url-pre-width")!,
);

// -------------
// Render images with SvgImage
// -------------

function initSvgImages(srcs: string[], mountTo: Element) {
  const images: SvgImage[] = [];

  for (const src of srcs) {
    const img = new SvgImage(src, mountTo);
    img.getSvgEl()?.classList.add("image");
    images.push(img);
  }

  return images;
}

// Original files
initSvgImages(
  [origMusicIconSrc, origStarIconSrc, origVideoIconSrc, origGhostImageSrc, origSunImageSrc],
  document.getElementById("svg-image-original")!,
);

// Preserve line width
initSvgImages(
  [preWidthMusicIconSrc, preWidthStarIconSrc, preWidthVideoIconSrc, preWidthGhostImageSrc, preWidthSunImageSrc],
  document.getElementById("pre-width-svg-image")!,
);

// Preserve line width and replace colors
const allTransformsImgs = initSvgImages(
  [
    preWidthReplaceColorMusicIconSrc,
    preWidthReplaceColorStarIconSrc,
    preWidthReplaceColorVideoIconSrc,
    preWidthReplaceColorGhostImageSrc,
    preWidthReplaceColorSunImageSrc,
  ],
  document.getElementById("pre-width-replace-color-svg-image")!,
);

const allTransformsColors = ["#00988a", "orange", "hotpink", "purple", "green"];

for (let i = 0; i < allTransformsImgs.length; i++) {
  allTransformsImgs[i].getSvgEl().style.color = allTransformsColors[i];
}

// -------------
// Render icons with SvgIcon component
// -------------

function initIcons(icons: SvgIcon[], mountTo: Element) {
  for (const icon of icons) {
    icon.mount(mountTo).setSize("var(--image-size)");
  }
}

// Original files
initIcons(
  [
    new SvgIcon(origMusicIconSrc),
    new SvgIcon(origStarIconSrc),
    new SvgIcon(origVideoIconSrc),
    new SvgIcon(origGhostImageSrc),
    new SvgIcon(origSunImageSrc),
  ],
  document.getElementById("svg-icons-orig")!,
);

// Preserve width and replace colors
initIcons(
  [
    new SvgIcon(preWidthReplaceColorMusicIconSrc).setColor("#00988a"),
    new SvgIcon(preWidthReplaceColorStarIconSrc).setColor("orange"),
    new SvgIcon(preWidthReplaceColorVideoIconSrc).setColor("hotpink"),
    new SvgIcon(preWidthReplaceColorGhostImageSrc).setColor("purple"),
    new SvgIcon(preWidthReplaceColorSunImageSrc).setColor("green"),
  ],
  document.getElementById("svg-icons-pre-width-replace-color")!,
);

// Animate color
initIcons(
  [
    new SvgIcon(preWidthReplaceColorMusicIconSrc),
    new SvgIcon(preWidthReplaceColorStarIconSrc),
    new SvgIcon(preWidthReplaceColorVideoIconSrc),
    new SvgIcon(preWidthReplaceColorGhostImageSrc),
    new SvgIcon(preWidthReplaceColorSunImageSrc),
  ],
  document.getElementById("svg-icons-animated-color")!,
);

// -------------
// Automatically reuse same SVG in multiple symbols
// -------------

const dynamicImagesContainer = document.getElementById("dynamic-images")!;
const dynamicIconsContainer = document.getElementById("dynamic-icons")!;
const addButton = document.getElementById("add-button")!;
const removeButton = document.getElementById("remove-button")!;
const dynamicImages: { image: SvgImage; icon: SvgIcon }[] = [];

function updateRemoveButton() {
  if (dynamicImages.length <= 1) {
    removeButton.setAttribute("disabled", "true");
  } else {
    removeButton.removeAttribute("disabled");
  }
}

function addDynamicImage() {
  const image = new SvgImage(preWidthMusicIconSrc, dynamicImagesContainer);
  image.getSvgEl()?.classList.add("image");

  dynamicImages.push({
    image,
    icon: new SvgIcon(preWidthStarIconSrc, dynamicIconsContainer).setSize("var(--image-size)"),
  });

  updateRemoveButton();
}

function removeDynamicImage() {
  if (dynamicImages.length > 1) {
    const { image, icon } = dynamicImages.pop()!;
    image?.unmount();
    icon.unmount();
  }

  updateRemoveButton();
}

addButton?.addEventListener("click", addDynamicImage);
removeButton?.addEventListener("click", removeDynamicImage);

for (let i = 0; i < 3; i++) {
  addDynamicImage();
}

// -------------
// Plugin config demo
// -------------

// Preserve line width
initSvgImages(
  [
    cfgPreWidthMusicIconSrc,
    cfgPreWidthStarIconSrc,
    cfgPreWidthVideoIconSrc,
    cfgPreWidthGhostImageSrc,
    cfgPreWidthSunImageSrc,
    cfgPreWidthSkipTransformsImageSrc,
  ],
  document.getElementById("cfg-pre-width")!,
);

// Replace color
initSvgImages(
  [
    cfgReplaceColorMusicIconSrc,
    cfgReplaceColorStarIconSrc,
    cfgReplaceColorVideoIconSrc,
    cfgReplaceColorGhostImageSrc,
    cfgReplaceColorSunImageSrc,
    cfgReplaceColorSkipTransformsImageSrc,
  ],
  document.getElementById("cfg-replace-color")!,
);

// Every transform: preserve line width and replace color
initSvgImages(
  [
    cfgAllMusicIconSrc,
    cfgAllStarIconSrc,
    cfgAllVideoIconSrc,
    cfgAllGhostImageSrc,
    cfgAllSunImageSrc,
    cfgColorsNotPreservedImageSrc,
    cfgLineWidthNotPreservedImageSrc,
    cfgAllSkipTransformsImageSrc,
  ],
  document.getElementById("cfg-all")!,
);

// All transforms except certain SVG elements
const allTransformsSvgImage = new SvgImage(cfgIgnoreElementsImageSrc, "#skip-elements-image");
allTransformsSvgImage.getSvgEl().classList.add("standalone-image", "skip-elements-image");

Checkbox.svgCheckbox({
  selector: "#per-element-transforms-checkbox",
  svg: allTransformsSvgImage,
  src1: cfgIgnoreElementsImageSrc,
  src2: cfgIgnoreElementsOrigImageSrc,
});

// Skip loading entirely, output path to the file
const skipLoadingContainer = document.getElementById("skip-loading")!;

for (const res of [cfgPreWidthSkipLoading, cfgReplaceColorSkipLoading, cfgAllSkipLoading]) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.className = "mono";
  span.innerText = res;
  li.appendChild(span);
  skipLoadingContainer.appendChild(li);
}

// -------------
// Named icons with dynamic imports. See example icon at src/NamedIcon.ts.
// -------------

function createNamedIcons(names: string[], container: Element) {
  for (const name of names) {
    new NamedIcon(name, container).setSize("var(--image-size)").setColor("orange");
  }
}

createNamedIcons(["music", "star", "video"], document.getElementById("named-icons")!);

// -------------
// Put SVG directly into the DOM
// -------------

const svgInDomContainer = document.getElementById("svg-in-dom")!;

for (const src of [
  preWidthMusicIconSrc,
  preWidthStarIconSrc,
  preWidthVideoIconSrc,
  preWidthGhostImageSrc,
  preWidthSunImageSrc,
]) {
  const div = document.createElement("div");
  div.className = "image";
  div.innerHTML = src;
  svgInDomContainer.appendChild(div);
}

// -------------
// Insert images loaded as source code data URI
// -------------

createImages(
  [srcDataUriMusicIcon, srcDataUriStarIcon, srcDataUriVideoIcon, srcDataUriGhostImage, srcDataUriSunImage],
  document.getElementById("source-data-uri")!,
);

// -------------
// Insert images loaded as base64 data URI
// -------------

createImages(
  [
    base64DataUriMusicIcon,
    base64DataUriStarIcon,
    base64DataUriVideoIcon,
    base64DataUriGhostImage,
    base64DataUriSunImage,
  ],
  document.getElementById("base64-data-uri")!,
);

// -------------
// Insert image encoded as base64
// -------------

document.getElementById("base-64")!.innerText = origMusicIconBase64;

// -------------
// Stroke width should be in CSS pixels
// -------------

// Main demo
const strokeWidthImage = new SvgImage(lineWidthCaveatImageSrc, "#caveats-line-width");
const strokeWidthSvg = strokeWidthImage.getSvgEl();
strokeWidthSvg.classList.add("text-color", "standalone-image");

Checkbox.svgCheckbox({
  selector: "#caveats-line-width-show-original-checkbox",
  svg: strokeWidthImage,
  src1: lineWidthCaveatImageSrc,
  src2: lineWidthCaveatOrigImageSrc,
});

// Broken width example
createImage(brokenLineWidthImageUrl, document.getElementById("caveats-broken-line-width")!);

// -------------
// Preserving line width works only on strokes
// -------------

const strokesOnlyImage = new SvgImage(onlyStrokesSupportedCaveatImageSrc, "#caveats-only-strokes-supported");
const strokesOnlySvg = strokesOnlyImage.getSvgEl();
strokesOnlySvg.classList.add("text-color", "standalone-image");

Checkbox.svgCheckbox({
  selector: "#caveats-only-strokes-supported-checkbox",
  svg: strokesOnlyImage,
  src1: onlyStrokesSupportedCaveatImageSrc,
  src2: onlyStrokesSupportedCaveatOrigImageSrc,
});

// -------------
// Transparent colors and white fill
// -------------

const whiteFillImage = new SvgImage(whiteFillCaveatImageSrc, "#caveats-white-fill");
const whiteFillSvg = whiteFillImage.getSvgEl();
whiteFillSvg.classList.add("text-color", "standalone-image");

Checkbox.svgCheckbox({
  selector: "#caveats-white-fill-checkbox",
  svg: whiteFillImage,
  src1: whiteFillCaveatImageSrc,
  src2: whiteFillCaveatOrigImageSrc,
});

// -------------
// Multicolored icons
// -------------

// Original
createImage(multicolorOriginalImageUrl, document.getElementById("multicolor-original")!);

// CSS variables

const multicolorIconsContainer = document.getElementById("multicolor-vars")!;

function createMulticolorIcon(primary: string, secondary: string, tertiary: string) {
  const multicolorVarsWrapper = new SvgIcon(multicolorVarsImageSrc, multicolorIconsContainer)
    .setSize("var(--image-size)")
    .getWrapper();
  multicolorVarsWrapper.style.setProperty("--primary-color", primary);
  multicolorVarsWrapper.style.setProperty("--secondary-color", secondary);
  multicolorVarsWrapper.style.setProperty("--tertiary-color", tertiary);
}

createMulticolorIcon("red", "blue", "green");
createMulticolorIcon("magenta", "cyan", "yellow");

// -------------
// Composite images
// -------------

const compositeImagesContainer = document.getElementById("composite")!;

new CompositeImage(compositeImagesContainer);
new CompositeImage(compositeImagesContainer, {
  primary: "magenta",
  secondary: "cyan",
  tertiary: "yellow",
});
