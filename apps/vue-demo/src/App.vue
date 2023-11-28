<template>
  <article class="main">
    <h1>Vue awesome SVG loader demo</h1>

    <p>
      This project demonstrates <span class="mono">vite-awesome-svg-loader</span> capabilities, and how it works with
      different SVG images.
    </p>

    <p>As an example, actual icons, oversize lineart and actual lineart images are present.</p>

    <h2>Basic functionality and configuration via import URL</h2>

    <p>
      Imports used in this section can be configured using regexes in plugin config. Later we'll demonstrate how this
      configuration works.
    </p>

    <h3>Original files</h3>

    <div class="images">
      <!-- These URLs are imported in <script> tag -->
      <img
        :src="origMusicIconUrl"
        class="image"
      />
      <img
        :src="origStarIconUrl"
        class="image"
      />
      <img
        :src="origVideoIconUrl"
        class="image"
      />

      <!-- We can also import URLS like so: -->
      <img
        src="@/assets/import-demo/lineart/ghost.svg?url"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/sun.svg?url"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/diamond.svg?url"
        class="image"
      />
    </div>

    <h3>Preserve line width</h3>

    <p>
      Note that some images have too thick lines, and some are cropped. Please make sure that line width is proportional
      to the image size, and images have a bit of safe spacing.
    </p>

    <div class="images">
      <img
        src="@/assets/import-demo/icons/music.svg?url&preserve-line-width"
        class="image"
      />
      <img
        src="@/assets/import-demo/icons/star.svg?url&preserve-line-width"
        class="image"
      />
      <img
        src="@/assets/import-demo/icons/video.svg?url&preserve-line-width"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/ghost.svg?url&preserve-line-width"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/sun.svg?url&preserve-line-width"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/diamond.svg?url&preserve-line-width"
        class="image"
      />
    </div>

    <h3>Original files in <span class="mono">SvgImage</span> component</h3>

    <p>This component will render SVG source code into a SVG symbol, so you'll have more freedom to manipulate it.</p>

    <div class="images">
      <SvgImage
        :src="origMusicIconSrc"
        class="image"
      />
      <SvgImage
        :src="origStarIconSrc"
        class="image"
      />
      <SvgImage
        :src="origVideoIconSrc"
        class="image"
      />
      <SvgImage
        :src="origGhostImageSrc"
        class="image"
      />
      <SvgImage
        :src="origSunImageSrc"
        class="image"
      />
      <SvgImage
        :src="origDiamondImageSrc"
        class="image"
      />
    </div>

    <h3>Preserve line width and use <span class="mono">SvgImage</span> component</h3>

    <div class="images">
      <SvgImage
        :src="preWidthMusicIconSrc"
        class="image"
      />
      <SvgImage
        :src="preWidthStarIconSrc"
        class="image"
      />
      <SvgImage
        :src="preWidthVideoIconSrc"
        class="image"
      />
      <SvgImage
        :src="preWidthGhostImageSrc"
        class="image"
      />
      <SvgImage
        :src="preWidthSunImageSrc"
        class="image"
      />
      <SvgImage
        :src="preWidthDiamondImageSrc"
        class="image"
      />
    </div>

    <h3>
      Preserve line width, replace colors with <span class="mono">currentColor</span> and use
      <span class="mono">SvgIcon</span> component
    </h3>

    <p>Basically this example shows how to use icons.</p>

    <div class="images">
      <SvgIcon
        :src="preWidthReplaceColorMusicIconSrc"
        size="var(--image-size)"
        color="#00988a"
      />
      <SvgIcon
        :src="preWidthReplaceColorStarIconSrc"
        size="var(--image-size)"
        color="orange"
      />
      <SvgIcon
        :src="preWidthReplaceColorVideoIconSrc"
        size="var(--image-size)"
        color="hotpink"
      />
      <SvgIcon
        :src="preWidthReplaceColorGhostImageSrc"
        size="var(--image-size)"
        color="purple"
      />
      <SvgIcon
        :src="preWidthReplaceColorSunImageSrc"
        size="var(--image-size)"
        color="green"
      />
      <SvgIcon
        :src="preWidthReplaceColorDiamondImageSrc"
        size="var(--image-size)"
        color="coral"
      />
    </div>

    <h3>Animate color and use <span class="mono">SvgIcon</span> component</h3>

    <p>The example above but we'll animate colors using CSS.</p>

    <div class="images color-animation">
      <SvgIcon
        :src="preWidthReplaceColorMusicIconSrc"
        size="var(--image-size)"
      />
      <SvgIcon
        :src="preWidthReplaceColorStarIconSrc"
        size="var(--image-size)"
      />
      <SvgIcon
        :src="preWidthReplaceColorVideoIconSrc"
        size="var(--image-size)"
      />
      <SvgIcon
        :src="preWidthReplaceColorGhostImageSrc"
        size="var(--image-size)"
      />
      <SvgIcon
        :src="preWidthReplaceColorSunImageSrc"
        size="var(--image-size)"
      />
      <SvgIcon
        :src="preWidthReplaceColorDiamondImageSrc"
        size="var(--image-size)"
      />
    </div>

    <h3>Reuse same SVG in multiple symbols</h3>

    <p>
      This example demonstrates that one SVG is being reused in multiple
      <span class="mono">SvgImage</span>
      and
      <span class="mono">SvgIcon</span>
      components.
    </p>

    <p>
      You can verify that images are reused by finding
      <span class="mono">&lt;symbol&gt;</span>
      element with the same ID as
      <span class="mono">href</span> attribute of the
      <span class="mono">&lt;use&gt;</span>
      elements. There should be only one
      <span class="mono">&lt;symbol&gt;</span>
      element with that ID.
    </p>

    <div class="buttons-container">
      <button @click="reusedImagesCount++">Add image</button>
      <button
        :disabled="reusedImagesCount <= 1"
        @click="reusedImagesCount = Math.max(reusedImagesCount - 1, 1)"
      >
        Remove image
      </button>
    </div>

    <h4><span class="mono">SvgImage</span></h4>

    <div class="images">
      <SvgImage
        v-for="i in reusedImagesCount"
        :key="i"
        :src="preWidthMusicIconSrc"
        class="image"
      />
    </div>

    <h4><span class="mono">SvgIcon</span></h4>

    <div class="images">
      <SvgIcon
        v-for="i in reusedImagesCount"
        :key="i"
        :src="preWidthStarIconSrc"
        size="var(--image-size)"
        class="image"
      />
    </div>

    <h2>Plugin config demo</h2>

    <p>
      All images transformations are configured at <span class="mono">vite.config.ts</span> file. All files in each
      entry are actually different files in different directories: one directory for each section.
    </p>

    <p>Each directory also contains following files:</p>

    <ol>
      <li>
        <span class="mono">skip-transforms.svg</span> - configured to be skipped while transforming. This is the last
        file in each entry.
      </li>

      <li>
        <span class="mono">skip-loading.svg</span> - configured to not be loaded by
        <span class="mono">vite-awesome-svg-loader</span>. We'll show how it works in the last section.
      </li>
    </ol>

    <h3>Preserve line width</h3>

    <div class="images">
      <SvgImage
        :src="cfgPreWidthMusicIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgPreWidthStarIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgPreWidthVideoIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgPreWidthGhostImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgPreWidthSunImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgPreWidthDiamondImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgPreWidthSkipTransformsImageSrc"
        class="image"
      />
    </div>

    <h3>Replace color</h3>

    <div class="images cfg-replace-color">
      <SvgImage
        :src="cfgReplaceColorMusicIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgReplaceColorStarIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgReplaceColorVideoIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgReplaceColorGhostImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgReplaceColorSunImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgReplaceColorDiamondImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgReplaceColorSkipTransformsImageSrc"
        class="image"
      />
    </div>

    <h3>Every transform: preserve line width and replace color</h3>

    <div class="images cfg-replace-color">
      <SvgImage
        :src="cfgAllMusicIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgAllStarIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgAllVideoIconSrc"
        class="image"
      />
      <SvgImage
        :src="cfgAllGhostImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgAllSunImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgAllDiamondImageSrc"
        class="image"
      />
      <SvgImage
        :src="cfgAllSkipTransformsImageSrc"
        class="image"
      />
    </div>

    <h3>Skip loading entirely</h3>

    <p>
      These files are configured to be skipped by <span class="mono">vite-awesome-svg-loader</span> entirely. This is
      useful, for example, when you want to use other loader.
    </p>

    <p>Since we're not using any other loader, we'll just get file path.</p>

    <p>Here's the list of these files:</p>

    <ol>
      <li
        v-for="res of [cfgPreWidthSkipLoading, cfgReplaceColorSkipLoading, cfgAllSkipLoading]"
        :key="res"
      >
        <span class="mono">
          {{ res }}
        </span>
      </li>
    </ol>

    <h2>Named async icons example</h2>

    <p>This is just an example, you should implement your own component</p>

    <Suspense>
      <div class="images">
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
    </Suspense>

    <h2>Put SVG into the DOM</h2>

    <p>This is what essentially all UI frameworks do. However, this approach is recommended only when you need full control over SVGs. For other purposes, use other loading methods such as URL or symbols.</p>

    <div class="images svg-in-dom">
      <div
        v-html="preWidthMusicIconSrc"
        class="image"
      />
      <div
        v-html="preWidthStarIconSrc"
        class="image"
      />
      <div
        v-html="preWidthVideoIconSrc"
        class="image"
      />
      <div
        v-html="preWidthGhostImageSrc"
        class="image"
      />
      <div
        v-html="preWidthSunImageSrc"
        class="image"
      />
      <div
        v-html="preWidthDiamondImageSrc"
        class="image"
      />
    </div>

    <h2>Less common loading types</h2>

    <p>So far we've demonstrated two loading types: URL and source code that's being reused as a symbol.</p>

    <p>
      SVGs can be loaded as a
      <a
        href="https://en.wikipedia.org/wiki/Data_URI_scheme"
        target="_blank"
      >
        Data URI
      </a>

      and displayed by setting
      <span class="mono">&lt;img src="data:image/svg+xml;..."&gt;</span>
      or
      <span class="mono">background-image: url("data:image/svg+xml;...")</span>
      <span>.</span>
    </p>

    <p>
      <span class="mono">vite-awesome-svg-loader</span> supports source code and base64 Data URIs. It also can load raw
      base64.
    </p>

    <h3>Source code data URI, original files</h3>

    <div class="images">
      <img
        src="@/assets/import-demo/icons/music.svg?source-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/icons/star.svg?source-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/icons/video.svg?source-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/ghost.svg?source-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/sun.svg?source-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/diamond.svg?source-data-uri"
        class="image"
      />
    </div>

    <h3>Base64 data URI, original files</h3>

    <div class="images">
      <img
        src="@/assets/import-demo/icons/music.svg?base64-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/icons/star.svg?base64-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/icons/video.svg?base64-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/ghost.svg?base64-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/sun.svg?base64-data-uri"
        class="image"
      />
      <img
        src="@/assets/import-demo/lineart/diamond.svg?base64-data-uri"
        class="image"
      />
    </div>

    <h3>Base64, original file</h3>

    <p class="mono">
      <span v-show="false">There's base64 data that's replaced with this text for assistive technologies.</span>

      <span aria-hidden="true">
        {{ origMusicIconBase64 }}
      </span>
    </p>

    <ImageSizeAdjustment />
  </article>
</template>

<script setup lang="ts">
// Import original icons as URLs.
import origMusicIconUrl from "@/assets/import-demo/icons/music.svg?url";
import origStarIconUrl from "@/assets/import-demo/icons/star.svg?url";
import origVideoIconUrl from "@/assets/import-demo/icons/video.svg?url";

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

// Import image as base64
import origMusicIconBase64 from "@/assets/import-demo/icons/music.svg?base64";

// Import helper components

import { SvgIcon, SvgImage } from "vite-awesome-svg-loader/vue-integration";

// Page setup

import NamedIcon from "@/NamedIcon.vue";
import ImageSizeAdjustment from "@/ImageSizeAdjustment.vue";
import { ref } from "vue";

const reusedImagesCount = ref(3);
</script>

<style scoped lang="scss">
// Set fixed images size

.image {
  min-width: var(--image-size);
  min-height: var(--image-size);
  width: var(--image-size);
  height: var(--image-size);
  max-width: var(--image-size);
  max-height: var(--image-size);
}

// Make SVGs in DOM fit container
.svg-in-dom :deep(svg) {
  width: 100%;
  height: 100%;
}

// Color animation

@keyframes color1 {
  0% {
    color: red;
  }

  25% {
    color: yellow;
  }

  50% {
    color: greenyellow;
  }

  75% {
    color: blue;
  }

  100% {
    color: purple;
  }
}

@keyframes color2 {
  0% {
    color: red;
  }

  100% {
    color: blue;
  }
}

// You can apply animation to the whole container
.color-animation {
  animation: color1 1s linear infinite;
}

// Or, if you want to be really precise, select actual <use> element to animate.

.color-animation :nth-child(2n) {
  animation: color2 1s linear infinite;
}
</style>
