<template>
  <p class="demo-section-caption">Original images:</p>

  <div class="images">
    <SvgImage
      :src="starOriginal"
      class="image"
    />
    <SvgImage
      :src="colorsNotReplacedOriginal"
      class="image"
    />
    <SvgImage
      :src="lineWidthNotPreservedOriginal"
      class="image"
    />
    <SvgImage
      :src="skipTransformsOriginal"
      class="image"
    />
  </div>

  <p class="demo-section-caption">Preserve line width:</p>

  <div class="images">
    <SvgImage
      :src="starPreLineWidth"
      class="image"
    />
    <SvgImage
      :src="colorsNotReplacedPreLineWidth"
      class="image"
    />
    <SvgImage
      :src="lineWidthNotPreservedPreLineWidth"
      class="image"
    />
    <SvgImage
      :src="skipTransformsPreLineWidth"
      class="image"
    />
  </div>

  <p class="demo-section-caption">Set current color:</p>

  <div class="images">
    <SvgImage
      :src="starSetCurrentColor"
      class="image"
      style="color: #00988a"
    />
    <SvgImage
      :src="colorsNotReplacedSetCurrentColor"
      class="image"
      style="color: orange"
    />
    <SvgImage
      :src="lineWidthNotPreservedSetCurrentColor"
      class="image"
      style="color: hotpink"
    />
    <SvgImage
      :src="skipTransformsSetCurrentColor"
      class="image"
      style="color: purple"
    />
  </div>

  <p class="demo-section-caption">All transformations:</p>

  <div class="images">
    <SvgImage
      :src="starAll"
      class="image"
      style="color: #00988a"
    />
    <SvgImage
      :src="colorsNotReplacedAll"
      class="image"
      style="color: orange"
    />
    <SvgImage
      :src="lineWidthNotPreservedAll"
      class="image"
      style="color: hotpink"
    />
    <SvgImage
      :src="skipTransformsAll"
      class="image"
      style="color: purple"
    />
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
    <li
      v-for="(importResult, i) of skippedFiles"
      :key="i"
      aria-hidden="true"
    >
      <code>
        {{ importResult }}
      </code>
    </li>
  </ol>
</template>

<script setup lang="ts">
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

import { SvgImage } from "vite-awesome-svg-loader/vue-integration";

// Cut skipped files import results

const maxLen = 40;
const minCutCharacters = 5;

const cutString = (str: string) => {
  if (str.length - maxLen < minCutCharacters) {
    return str;
  }

  return str.substring(0, maxLen - 1) + "…";
};

const skippedFiles = [skipLoadingOriginal, skipLoadingPreLineWidth, skipLoadingSetCurrentColor, skipLoadingAll].map(
  cutString,
);
</script>
