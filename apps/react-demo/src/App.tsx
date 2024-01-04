// Import original images as URLs
import origMusicIconUrl from "@/assets/import-demo/icons/music.svg?url";
import origStarIconUrl from "@/assets/import-demo/icons/star.svg?url";
import origVideoIconUrl from "@/assets/import-demo/icons/video.svg?url";
import origGhostImageUrl from "@/assets/import-demo/lineart/ghost.svg?url";
import origSunImageUrl from "@/assets/import-demo/lineart/sun.svg?url";
import origDiamondImageUrl from "@/assets/import-demo/lineart/diamond.svg?url";

// Import original images as URLs and preserve line width
import preWidthMusicIconUrl from "@/assets/import-demo/icons/music.svg?url&preserve-line-width";
import preWidthStarIconUrl from "@/assets/import-demo/icons/star.svg?url&preserve-line-width";
import preWidthVideoIconUrl from "@/assets/import-demo/icons/video.svg?url&preserve-line-width";
import preWidthGhostImageUrl from "@/assets/import-demo/lineart/ghost.svg?url&preserve-line-width";
import preWidthSunImageUrl from "@/assets/import-demo/lineart/sun.svg?url&preserve-line-width";
import preWidthDiamondImageUrl from "@/assets/import-demo/lineart/diamond.svg?url&preserve-line-width";

// Import original images as sources
import origMusicIconSrc from "@/assets/import-demo/icons/music.svg";
import origStarIconSrc from "@/assets/import-demo/icons/star.svg";
import origVideoIconSrc from "@/assets/import-demo/icons/video.svg";
import origGhostImageSrc from "@/assets/import-demo/lineart/ghost.svg";
import origSunImageSrc from "@/assets/import-demo/lineart/sun.svg";
import origDiamondImageSrc from "@/assets/import-demo/lineart/diamond.svg";

// Import images as sources and preserve line width
import preWidthMusicIconSrc from "@/assets/import-demo/icons/music.svg?preserve-line-width";
import preWidthStarIconSrc from "@/assets/import-demo/icons/star.svg?preserve-line-width";
import preWidthVideoIconSrc from "@/assets/import-demo/icons/video.svg?preserve-line-width";
import preWidthGhostImageSrc from "@/assets/import-demo/lineart/ghost.svg?preserve-line-width";
import preWidthSunImageSrc from "@/assets/import-demo/lineart/sun.svg?preserve-line-width";
import preWidthDiamondImageSrc from "@/assets/import-demo/lineart/diamond.svg?preserve-line-width";

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
// @ts-ignore
import preWidthReplaceColorDiamondImageSrc from "@/assets/import-demo/lineart/diamond.svg?preserve-line-width&set-current-color";

// Configuration import demo. Note: there's no configuration in URL, everything's set in vite.config.ts file.

import cfgPreWidthMusicIconSrc from "@/assets/config-demo/preserve-line-width/icons/music.svg";
import cfgPreWidthStarIconSrc from "@/assets/config-demo/preserve-line-width/icons/star.svg";
import cfgPreWidthVideoIconSrc from "@/assets/config-demo/preserve-line-width/icons/video.svg";
import cfgPreWidthGhostImageSrc from "@/assets/config-demo/preserve-line-width/lineart/ghost.svg";
import cfgPreWidthSunImageSrc from "@/assets/config-demo/preserve-line-width/lineart/sun.svg";
import cfgPreWidthDiamondImageSrc from "@/assets/config-demo/preserve-line-width/lineart/diamond.svg";
import cfgPreWidthSkipTransformsImageSrc from "@/assets/config-demo/preserve-line-width/skip-transforms.svg";
import cfgPreWidthSkipLoading from "@/assets/config-demo/preserve-line-width/skip-loading.svg";

import cfgReplaceColorMusicIconSrc from "@/assets/config-demo/set-current-color/icons/music.svg";
import cfgReplaceColorStarIconSrc from "@/assets/config-demo/set-current-color/icons/star.svg";
import cfgReplaceColorVideoIconSrc from "@/assets/config-demo/set-current-color/icons/video.svg";
import cfgReplaceColorGhostImageSrc from "@/assets/config-demo/set-current-color/lineart/ghost.svg";
import cfgReplaceColorSunImageSrc from "@/assets/config-demo/set-current-color/lineart/sun.svg";
import cfgReplaceColorDiamondImageSrc from "@/assets/config-demo/set-current-color/lineart/diamond.svg";
import cfgReplaceColorSkipTransformsImageSrc from "@/assets/config-demo/set-current-color/skip-transforms.svg";
import cfgReplaceColorSkipLoading from "@/assets/config-demo/preserve-line-width/skip-loading.svg";

import cfgAllMusicIconSrc from "@/assets/config-demo/all/icons/music.svg";
import cfgAllStarIconSrc from "@/assets/config-demo/all/icons/star.svg";
import cfgAllVideoIconSrc from "@/assets/config-demo/all/icons/video.svg";
import cfgAllGhostImageSrc from "@/assets/config-demo/all/lineart/ghost.svg";
import cfgAllSunImageSrc from "@/assets/config-demo/all/lineart/sun.svg";
import cfgAllDiamondImageSrc from "@/assets/config-demo/all/lineart/diamond.svg";
import cfgAllSkipTransformsImageSrc from "@/assets/config-demo/all/skip-transforms.svg";
import cfgAllSkipLoading from "@/assets/config-demo/preserve-line-width/skip-loading.svg";

// Import images as source code data URI
import srcDataUriMusicIcon from "@/assets/import-demo/icons/music.svg?source-data-uri";
import srcDataUriStarIcon from "@/assets/import-demo/icons/star.svg?source-data-uri";
import srcDataUriVideoIcon from "@/assets/import-demo/icons/video.svg?source-data-uri";
import srcDataUriGhostImage from "@/assets/import-demo/lineart/ghost.svg?source-data-uri";
import srcDataUriSunImage from "@/assets/import-demo/lineart/sun.svg?source-data-uri";
import srcDataUriDiamondImage from "@/assets/import-demo/lineart/diamond.svg?source-data-uri";

// Import images as base64 data URI
import base64DataUriMusicIcon from "@/assets/import-demo/icons/music.svg?source-data-uri";
import base64DataUriStarIcon from "@/assets/import-demo/icons/star.svg?source-data-uri";
import base64DataUriVideoIcon from "@/assets/import-demo/icons/video.svg?source-data-uri";
import base64DataUriGhostImage from "@/assets/import-demo/lineart/ghost.svg?source-data-uri";
import base64DataUriSunImage from "@/assets/import-demo/lineart/sun.svg?source-data-uri";
import base64DataUriDiamondImage from "@/assets/import-demo/lineart/diamond.svg?source-data-uri";

// Import image as base64
import origMusicIconBase64 from "@/assets/import-demo/icons/music.svg?base64";

// Import helper components

import { SvgIcon, SvgImage } from "vite-awesome-svg-loader/react-integration";

// Page setup
import { useState } from "react";
import { NamedIcon } from "./NamedIcon";

export default function App() {
  const [reusedImagesCount, setReusedImagesCount] = useState(3);

  return (
    <article className="main">
      <h1>React awesome SVG loader demo</h1>

      <p>
        This project demonstrates <span className="mono">vite-awesome-svg-loader</span> capabilities, and how it works{" "}
        with different SVG images.
      </p>

      <p>As an example, actual icons, oversize lineart and actual lineart images are present.</p>

      <h2>Basic functionality and configuration via import URL</h2>

      <p>
        Imports used in this section can be configured using regexes in plugin config. Later we'll demonstrate how this
        configuration works.
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
        <img
          src={origDiamondImageUrl}
          className="image"
        />
      </div>

      <h3>Preserve line width</h3>

      <p>
        Note that some images have too thick lines, and some are cropped. Please make sure that line width is{" "}
        proportional to the image size, and images have a bit of safe spacing.
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
        <img
          src={preWidthDiamondImageUrl}
          className="image"
        />
      </div>

      <h3>
        Original files in <span className="mono">SvgImage</span> component
      </h3>

      <p>This component will render SVG source code into a SVG symbol, so you'll have more freedom to manipulate it.</p>

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
        <SvgImage
          src={origDiamondImageSrc}
          className="image"
        />
      </div>

      <h3>
        Preserve line width and use <span className="mono">SvgImage</span> component
      </h3>

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
        <SvgImage
          src={preWidthDiamondImageSrc}
          className="image"
        />
      </div>

      <h3>
        Preserve line width, replace colors with <span className="mono">currentColor</span> and use{" "}
        <span className="mono">SvgIcon</span> component
      </h3>

      <p>Basically this example shows how to use icons.</p>

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
        <SvgIcon
          src={preWidthReplaceColorDiamondImageSrc}
          size="var(--image-size)"
          color="coral"
        />
      </div>

      <h3>
        Animate color and use <span className="mono">SvgIcon</span> component
      </h3>

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
        <SvgIcon
          src={preWidthReplaceColorDiamondImageSrc}
          size="var(--image-size)"
        />
      </div>

      <h3>Reuse same SVG in multiple symbols</h3>

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

      <h4>
        <span className="mono">SvgImage</span>
      </h4>

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

      <h4>
        <span className="mono">SvgIcon</span>
      </h4>

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

      <p>Each directory also contains following files:</p>

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
          src={cfgPreWidthDiamondImageSrc}
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
          src={cfgReplaceColorDiamondImageSrc}
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
          src={cfgAllDiamondImageSrc}
          className="image"
        />
        <SvgImage
          src={cfgAllSkipTransformsImageSrc}
          className="image"
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

      <h2>Named async icons example</h2>

      <p>This is just an example, you should implement your own component</p>

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

      <h2>Put SVG into the DOM</h2>

      <p>
        This is what essentially all UI frameworks do. However, this approach is recommended only when you need full{" "}
        control over SVGs. For other purposes, use other loading methods such as URL or symbols.
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
        <div
          dangerouslySetInnerHTML={{ __html: preWidthDiamondImageSrc }}
          className="image"
        />
      </div>

      <h2>Less common loading types</h2>

      <p>So far we've demonstrated two loading types: URL and source code that's being reused as a symbol.</p>

      <p>
        SVGs can be loaded as a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Data_URI_scheme"
          target="_blank"
        >
          Data URI
        </a>{" "}
        and displayed by setting
        <span className="mono">&lt;img src="data:image/svg+xml;..."&gt;</span> or{" "}
        <span className="mono">background-image: url("data:image/svg+xml;...")</span>
        <span>.</span>
      </p>

      <p>
        <span className="mono">vite-awesome-svg-loader</span> supports source code and base64 Data URIs. It also can
        load raw base64.
      </p>

      <h3>Source code data URI, original files</h3>

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
        <img
          src={srcDataUriDiamondImage}
          className="image"
        />
      </div>

      <h3>Base64 data URI, original files</h3>

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
        <img
          src={base64DataUriDiamondImage}
          className="image"
        />
      </div>

      <h3>Base64, original file</h3>

      <p className="mono">
        <span className="hidden">There's base64 data that's replaced with this text for assistive technologies.</span>

        <span aria-hidden="true">{origMusicIconBase64}</span>
      </p>
    </article>
  );
}
