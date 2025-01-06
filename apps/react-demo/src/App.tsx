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

// Import helper components

import { SvgIcon, SvgImage } from "vite-awesome-svg-loader/react-integration";

// Page setup
import { CSSProperties, useState } from "react";
import { NamedIcon } from "./NamedIcon";
import { Checkbox } from "./Checkbox";
import { CompositeImage } from "./CompositeImage";

export default function App() {
  const [reusedImagesCount, setReusedImagesCount] = useState(3);
  const [skipElementsShowOriginal, setSkipElementsShowOriginal] = useState(false);
  const [caveatsLineWidthShowOriginal, setCaveatsLineWidthShowOriginal] = useState(false);
  const [caveatsOnlyStrokesSupportedShowOriginal, setCaveatsOnlyStrokesSupportedShowOriginal] = useState(false);
  const [whiteFillShowOriginal, setWhiteFillShowOriginal] = useState(false);

  return (
    <article className="main">
      <h1>React awesome SVG loader demo</h1>

      <p>
        This project demonstrates{" "}
        <a
          href="https://github.com/matafokka/vite-awesome-svg-loader"
          className="mono"
        >
          vite-awesome-svg-loader
        </a>{" "}
        capabilities, and how it works with different SVG images.
      </p>

      <p>As an example, actual icons and line art images are present.</p>

      <h2>
        Import images via URL and render with regular <span className="mono">&lt;img&gt;</span> tag
      </h2>

      <p>
        Imports used in this section can be configured using regexes in plugin config (see{" "}
        <span className="mono">vite.config.ts</span> file).
      </p>

      <h3>Original files</h3>

      <div className="images">
        <img
          src={origMusicIconUrl}
          className="image"
        />
        <img
          src={origStarIconUrl}
          className="image"
        />
        <img
          src={origVideoIconUrl}
          className="image"
        />
        <img
          src={origGhostImageUrl}
          className="image"
        />
        <img
          src={origSunImageUrl}
          className="image"
        />
      </div>

      <h3>Preserve line width</h3>

      <p>
        Try scaling images using slider at the bottom of the screen. Line width will stay the same despite image size.
      </p>

      <div className="images">
        <img
          src={preWidthMusicIconUrl}
          className="image"
        />
        <img
          src={preWidthStarIconUrl}
          className="image"
        />
        <img
          src={preWidthVideoIconUrl}
          className="image"
        />
        <img
          src={preWidthGhostImageUrl}
          className="image"
        />
        <img
          src={preWidthSunImageUrl}
          className="image"
        />
      </div>

      <h2>
        Render images with <span className="mono">SvgImage</span> component
      </h2>

      <p>
        This component will render SVG source code into a SVG symbol, so you'll have more freedom to manipulate it. Most
        importantly, it allows you to set custom colors.
      </p>

      <h3>Original files</h3>

      <div className="images">
        <SvgImage
          src={origMusicIconSrc}
          className="image"
        />
        <SvgImage
          src={origStarIconSrc}
          className="image"
        />
        <SvgImage
          src={origVideoIconSrc}
          className="image"
        />
        <SvgImage
          src={origGhostImageSrc}
          className="image"
        />
        <SvgImage
          src={origSunImageSrc}
          className="image"
        />
      </div>

      <h3>Preserve line width</h3>

      <div className="images">
        <SvgImage
          src={preWidthMusicIconSrc}
          className="image"
        />
        <SvgImage
          src={preWidthStarIconSrc}
          className="image"
        />
        <SvgImage
          src={preWidthVideoIconSrc}
          className="image"
        />
        <SvgImage
          src={preWidthGhostImageSrc}
          className="image"
        />
        <SvgImage
          src={preWidthSunImageSrc}
          className="image"
        />
      </div>

      <h3>Preserve line width and replace colors</h3>

      <div className="images">
        <SvgImage
          src={preWidthReplaceColorMusicIconSrc}
          className="image"
          style={{ color: "#00988a" }}
        />
        <SvgImage
          src={preWidthReplaceColorStarIconSrc}
          className="image"
          style={{ color: "orange" }}
        />
        <SvgImage
          src={preWidthReplaceColorVideoIconSrc}
          className="image"
          style={{ color: "hotpink" }}
        />
        <SvgImage
          src={preWidthReplaceColorGhostImageSrc}
          className="image"
          style={{ color: "purple" }}
        />
        <SvgImage
          src={preWidthReplaceColorSunImageSrc}
          className="image"
          style={{ color: "green" }}
        />
      </div>

      <h2>
        Render icons with <span className="mono">SvgIcon</span> component
      </h2>

      <p>This component simplifies icons colorization and sizing.</p>

      <p>
        It makes sense to always preserve icon's line width. In real project this should be done via config (see{" "}
        <span className="mono">vite.config.ts</span> file).
      </p>

      <h3>Original files</h3>

      <div className="images">
        <SvgIcon
          src={origMusicIconSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={origStarIconSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={origVideoIconSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={origGhostImageSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={origSunImageSrc}
          size="var(--image-size)"
        />
      </div>

      <h3>Preserve line width and replace colors</h3>

      <div className="images">
        <SvgIcon
          src={preWidthReplaceColorMusicIconSrc}
          size="var(--image-size)"
          color="#00988a"
        />
        <SvgIcon
          src={preWidthReplaceColorStarIconSrc}
          size="var(--image-size)"
          color="orange"
        />
        <SvgIcon
          src={preWidthReplaceColorVideoIconSrc}
          size="var(--image-size)"
          color="hotpink"
        />
        <SvgIcon
          src={preWidthReplaceColorGhostImageSrc}
          size="var(--image-size)"
          color="purple"
        />
        <SvgIcon
          src={preWidthReplaceColorSunImageSrc}
          size="var(--image-size)"
          color="green"
        />
      </div>

      <h3>Animate color</h3>

      <p>The example above but we'll animate colors using CSS.</p>

      <div className="images color-animation">
        <SvgIcon
          src={preWidthReplaceColorMusicIconSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={preWidthReplaceColorStarIconSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={preWidthReplaceColorVideoIconSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={preWidthReplaceColorGhostImageSrc}
          size="var(--image-size)"
        />
        <SvgIcon
          src={preWidthReplaceColorSunImageSrc}
          size="var(--image-size)"
        />
      </div>

      <h2>Automatically reuse same SVG in multiple symbols</h2>

      <p>
        This example demonstrates that one SVG is being reused in multiple <span className="mono">SvgImage</span> and{" "}
        <span className="mono">SvgIcon</span> components.
      </p>

      <p>
        You can verify that images are reused by finding <span className="mono">&lt;symbol&gt;</span> element with the{" "}
        same ID as <span className="mono">href</span> attribute of the <span className="mono">&lt;use&gt;</span>{" "}
        elements. There should be only one <span className="mono">&lt;symbol&gt;</span> element with that ID.
      </p>

      <div className="buttons-container">
        <button onClick={() => setReusedImagesCount(() => reusedImagesCount + 1)}>Add image</button>
        <button
          disabled={reusedImagesCount <= 1}
          onClick={() => setReusedImagesCount(() => Math.max(reusedImagesCount - 1, 1))}
        >
          Remove image
        </button>
      </div>

      <h3>
        <span className="mono">SvgImage</span>
      </h3>

      <div className="images">
        {(() => {
          const images: any[] = [];

          for (let i = 0; i < reusedImagesCount; i++) {
            images.push(
              <SvgImage
                key={i}
                src={preWidthMusicIconSrc}
                className="image"
              />,
            );
          }

          return images;
        })()}
      </div>

      <h3>
        <span className="mono">SvgIcon</span>
      </h3>

      <div className="images">
        {(() => {
          const images: any[] = [];

          for (let i = 0; i < reusedImagesCount; i++) {
            images.push(
              <SvgIcon
                key={i}
                src={preWidthStarIconSrc}
                size="var(--image-size)"
              />,
            );
          }

          return images;
        })()}
      </div>

      <h2>Plugin config demo</h2>

      <p>
        All images transformations are configured at <span className="mono">vite.config.ts</span> file. All files in
        each entry are actually different files in different directories: one directory for each section.
      </p>

      <p>Each directory contains following files:</p>

      <ol>
        <li>
          <span className="mono">skip-transforms.svg</span> - configured to be skipped while transforming. This is the
          last file in each entry.
        </li>

        <li>
          <span className="mono">skip-loading.svg</span> - configured to not be loaded by{" "}
          <span className="mono">vite-awesome-svg-loader</span>. We'll show how it works in the last section.
        </li>
      </ol>

      <p>
        Directory <span className="mono">config-demo/all</span> additionally contains following files:
      </p>

      <ol>
        <li>
          <span className="mono">colors-not-preserved.svg</span> - configured to be skipped while replacing colors.
        </li>

        <li>
          <span className="mono">line-width-not-preserved.svg</span> - configured to be skipped while preserving line
          width.
        </li>

        <li>
          <span className="mono">ignore-elements.svg</span> - file is transformed, but certain elements are ignored.
        </li>
      </ol>

      <h3>Preserve line width</h3>

      <div className="images">
        <SvgImage
          src={cfgPreWidthMusicIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgPreWidthStarIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgPreWidthVideoIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgPreWidthGhostImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgPreWidthSunImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgPreWidthSkipTransformsImageSrc}
          className="image"
        />
      </div>

      <h3>Replace color</h3>

      <div className="images cfg-replace-color">
        <SvgImage
          src={cfgReplaceColorMusicIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgReplaceColorStarIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgReplaceColorVideoIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgReplaceColorGhostImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgReplaceColorSunImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgReplaceColorSkipTransformsImageSrc}
          className="image"
        />
      </div>

      <h3>Every transform: preserve line width and replace color</h3>

      <div className="images cfg-replace-color">
        <SvgImage
          src={cfgAllMusicIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgAllStarIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgAllVideoIconSrc}
          className="image"
        />
        <SvgImage
          src={cfgAllGhostImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgAllSunImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgColorsNotPreservedImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgLineWidthNotPreservedImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgAllSkipTransformsImageSrc}
          className="image"
        />
      </div>

      <h3>All transforms except certain SVG elements</h3>

      <p>
        It's possible to skip transforms per-element and per-element-per-file. See{" "}
        <span className="mono">vite.config.ts</span> file for examples.
      </p>

      <Checkbox
        checked={skipElementsShowOriginal}
        onChange={setSkipElementsShowOriginal}
        label="Show original image"
      />

      <div className="images">
        <SvgImage
          src={skipElementsShowOriginal ? cfgIgnoreElementsOrigImageSrc : cfgIgnoreElementsImageSrc}
          width="256"
          height="128"
          className="standalone-image skip-elements-image"
        />
      </div>

      <h3>Skip loading entirely</h3>

      <p>
        These files are configured to be skipped by <span className="mono">vite-awesome-svg-loader</span> entirely. This
        is useful, for example, when you want to use other loader.
      </p>

      <p>Since we're not using any other loader, we'll just get file path.</p>

      <p>Here's the list of these files:</p>

      <ol>
        {[cfgPreWidthSkipLoading, cfgReplaceColorSkipLoading, cfgAllSkipLoading].map((res, i) => (
          <li key={i}>
            <span className="mono">{res}</span>
          </li>
        ))}
      </ol>

      <h2>Named icons with dynamic imports inside icon component</h2>

      <p>This is just an example, you should implement your own component that handles loading state, errors, etc.</p>

      <div className="images">
        <NamedIcon
          name="music"
          size="var(--image-size)"
          color="orange"
        />
        <NamedIcon
          name="star"
          size="var(--image-size)"
          color="orange"
        />
        <NamedIcon
          name="video"
          size="var(--image-size)"
          color="orange"
        />
      </div>

      <h2>Other rendering methods</h2>

      <p>
        So far we've demonstrated two rendering methods: URL and source code that's being reused as a symbol. Let's see
        how else we can render images.
      </p>

      <p>
        These methods are less performant than what we've already discussed. However, they may have their use-cases.
      </p>

      <h3>Put SVG directly into the DOM</h3>

      <p>
        This is what all UI frameworks do. However, this approach is recommended only when you need full control over
        SVGs. For other purposes, use other rendering methods such as URL or symbols.
      </p>

      <div className="images svg-in-dom">
        <div
          dangerouslySetInnerHTML={{ __html: preWidthMusicIconSrc }}
          className="image"
        />
        <div
          dangerouslySetInnerHTML={{ __html: preWidthStarIconSrc }}
          className="image"
        />
        <div
          dangerouslySetInnerHTML={{ __html: preWidthVideoIconSrc }}
          className="image"
        />
        <div
          dangerouslySetInnerHTML={{ __html: preWidthGhostImageSrc }}
          className="image"
        />
        <div
          dangerouslySetInnerHTML={{ __html: preWidthSunImageSrc }}
          className="image"
        />
      </div>

      <h3>Data URI</h3>

      <p>
        SVGs can be loaded as a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Data_URI_scheme"
          target="_blank"
        >
          Data URI
        </a>{" "}
        and displayed by setting <span className="mono">&lt;img src="data:image/svg+xml;..."&gt;</span> or{" "}
        <span className="mono">background-image: url("data:image/svg+xml;...")</span>
        <span>.</span>
      </p>

      <p>
        <span className="mono">vite-awesome-svg-loader</span> supports source code and base64 Data URIs. It also can
        load raw base64.
      </p>

      <h4>Source code data URI, original files</h4>

      <div className="images">
        <img
          src={srcDataUriMusicIcon}
          className="image"
        />
        <img
          src={srcDataUriStarIcon}
          className="image"
        />
        <img
          src={srcDataUriVideoIcon}
          className="image"
        />
        <img
          src={srcDataUriGhostImage}
          className="image"
        />
        <img
          src={srcDataUriSunImage}
          className="image"
        />
      </div>

      <h4>Base64 data URI, original files</h4>

      <div className="images">
        <img
          src={base64DataUriMusicIcon}
          className="image"
        />
        <img
          src={base64DataUriStarIcon}
          className="image"
        />
        <img
          src={base64DataUriVideoIcon}
          className="image"
        />
        <img
          src={base64DataUriGhostImage}
          className="image"
        />
        <img
          src={base64DataUriSunImage}
          className="image"
        />
      </div>

      <h3>Base64 string, original file</h3>

      <p className="mono">
        <span className="hidden">There's base64 data that's replaced with this text for assistive technologies.</span>

        <span aria-hidden="true">{origMusicIconBase64}</span>
      </p>

      <h2>Caveats</h2>

      <h3>Stroke width should be in CSS pixels</h3>

      <p>
        When preserving line width, stroke width should be in CSS pixels. Image size doesn't matter. This is how it
        looks like:
      </p>

      <Checkbox
        checked={caveatsLineWidthShowOriginal}
        onChange={setCaveatsLineWidthShowOriginal}
        label="Show original image"
      />

      <div className="images">
        <SvgImage
          src={caveatsLineWidthShowOriginal ? lineWidthCaveatOrigImageSrc : lineWidthCaveatImageSrc}
          className="text-color standalone-image"
        />
      </div>

      <p>Incorrect stroke width will result in something like this:</p>

      <div className="images">
        <img
          src={brokenLineWidthImageUrl}
          className="image standalone-image"
        />
      </div>

      <h3>Preserving line width works only on strokes</h3>

      <p>Create your images with strokes instead of filled path to preserve line width.</p>

      <p>Toggle original image to see that there's no difference when stroke is not preserved.</p>

      <Checkbox
        checked={caveatsOnlyStrokesSupportedShowOriginal}
        onChange={setCaveatsOnlyStrokesSupportedShowOriginal}
        label="Show original image"
      />

      <div className="images">
        <SvgImage
          src={
            caveatsOnlyStrokesSupportedShowOriginal
              ? onlyStrokesSupportedCaveatOrigImageSrc
              : onlyStrokesSupportedCaveatImageSrc
          }
          className="text-color standalone-image"
        />
      </div>

      <h3>
        Transparent colors should be omitted or set as <span className="mono">none</span> or{" "}
        <span className="mono">transparent</span>
      </h3>

      <p>
        Quite common catch is to set white color and then wonder why image is messed up. If you don't want fill, omit it
        or set to <span className="mono">none</span> or <span className="mono">transparent</span>.
      </p>

      <Checkbox
        checked={whiteFillShowOriginal}
        onChange={setWhiteFillShowOriginal}
        label="Show original image"
      />

      <div className="images">
        <SvgImage
          src={whiteFillShowOriginal ? whiteFillCaveatOrigImageSrc : whiteFillCaveatImageSrc}
          className="text-color standalone-image"
        />
      </div>

      <h2>Recipes</h2>

      <h3>Multicolored icons</h3>

      <p>Here we'll see how we can implement icons that have multiple colors, for example:</p>

      <div className="images">
        <img
          src={multicolorOriginalImageUrl}
          className="image"
        />
      </div>

      <p>
        Our solution should be extensible, i.e. if accent color changes, we as developers should change only one line of
        code.
      </p>

      <h4>CSS variables</h4>

      <p>
        Classic solution is to use variables in SVG files and render then directly. We'll use CSS variables as well but
        leverage SVG symbols to improve rendering performance. This is done by using{" "}
        <span className="mono">SvgImage</span> or <span className="mono">SvgIcon</span> components.
      </p>

      <p>
        <span className="mono">setCurrentColorList</span> option should not be used for multicolored icons because
        recoloring is done via CSS variables.
      </p>

      <p>Here's the result where we can manipulate colors however we wish:</p>

      <div className="images">
        <SvgIcon
          src={multicolorVarsImageSrc}
          size="var(--image-size)"
          style={
            {
              "--primary-color": "red",
              "--secondary-color": "blue",
              "--tertiary-color": "green",
            } as CSSProperties
          }
        />

        <SvgIcon
          src={multicolorVarsImageSrc}
          size="var(--image-size)"
          style={
            {
              "--primary-color": "magenta",
              "--secondary-color": "cyan",
              "--tertiary-color": "yellow",
            } as CSSProperties
          }
        />
      </div>

      <p>
        Since we're using variables instead of single color, for icons it's recommended to create a wrapper around{" "}
        <span className="mono">SvgIcon</span> and omit <span className="mono">color</span> prop.
      </p>

      <h4>Composite images</h4>

      <p>We can create separate SVG files and overlay them on top of each other.</p>

      <p>
        This allows us not to modify SVG files which is good for complex images. However, creating a good abstraction
        over layers can be quite challenging.
      </p>

      <p>Here's how composite image may look like:</p>

      <div className="images">
        <CompositeImage />

        <CompositeImage
          primary="magenta"
          secondary="cyan"
          tertiary="yellow"
        />
      </div>

      <h4>Antipatterns</h4>

      <p>
        Colorize some elements and ignore others with <span className="mono">skipSetCurrentColorSelectors</span> or{" "}
        <span className="mono">skipTransformsSelectors</span> options. This will not be extensible, and it'll hurt build
        performance. Don't use these options to achieve any such functionality.
      </p>
    </article>
  );
}
