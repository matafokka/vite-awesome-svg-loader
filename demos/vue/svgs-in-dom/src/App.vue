<template>
  <p class="demo-section-caption">Original images:</p>

  <div class="images">
    <div
      v-html="musicIconSrc"
      class="image"
    />
    <div
      v-html="starIconSrc"
      class="image"
    />
    <div
      v-html="videoIconSrc"
      class="image"
    />
    <div
      v-html="ghostImgSrc"
      class="image"
    />
    <div
      v-html="sunImgSrc"
      class="image"
    />
  </div>

  <p class="demo-section-caption">Preserve line width:</p>

  <div class="images">
    <div
      v-html="musicIconPreWidthSrc"
      class="image"
    />
    <div
      v-html="starIconPreWidthSrc"
      class="image"
    />
    <div
      v-html="videoIconPreWidthSrc"
      class="image"
    />
    <div
      v-html="ghostImgPreWidthSrc"
      class="image"
    />
    <div
      v-html="sunImgPreWidthSrc"
      class="image"
    />
  </div>

  <p class="demo-section-caption">Set current color:</p>

  <div class="images">
    <div
      v-html="musicIconCurrentColorSrc"
      class="image"
      style="color: #00988a"
    />
    <div
      v-html="starIconCurrentColorSrc"
      class="image"
      style="color: orange"
    />
    <div
      v-html="videoIconCurrentColorSrc"
      class="image"
      style="color: hotpink"
    />
    <div
      v-html="ghostImgCurrentColorSrc"
      class="image"
      style="color: purple"
    />
    <div
      v-html="sunImgCurrentColorSrc"
      class="image"
      style="color: green"
    />
  </div>

  <p class="demo-section-caption">All transformations:</p>

  <div class="images">
    <div
      v-html="musicIconAllSrc"
      class="image"
      style="color: #00988a"
    />
    <div
      v-html="starIconAllSrc"
      class="image"
      style="color: orange"
    />
    <div
      v-html="videoIconAllSrc"
      class="image"
      style="color: hotpink"
    />
    <div
      v-html="ghostImgAllSrc"
      class="image"
      style="color: purple"
    />
    <div
      v-html="sunImgAllSrc"
      class="image"
      style="color: green"
    />
  </div>
</template>

<script setup lang="ts">
import musicIconSrc from "@/assets/original/icons/music.svg";
import starIconSrc from "@/assets/original/icons/star.svg";
import videoIconSrc from "@/assets/original/icons/video.svg";
import ghostImgSrc from "@/assets/original/lineart/ghost.svg";
import sunImgSrc from "@/assets/original/lineart/sun.svg";

import musicIconPreWidthSrc from "@/assets/preserve-line-width/icons/music.svg";
import starIconPreWidthSrc from "@/assets/preserve-line-width/icons/star.svg";
import videoIconPreWidthSrc from "@/assets/preserve-line-width/icons/video.svg";
import ghostImgPreWidthSrc from "@/assets/preserve-line-width/lineart/ghost.svg";
import sunImgPreWidthSrc from "@/assets/preserve-line-width/lineart/sun.svg";

import musicIconCurrentColorSrc from "@/assets/set-current-color/icons/music.svg";
import starIconCurrentColorSrc from "@/assets/set-current-color/icons/star.svg";
import videoIconCurrentColorSrc from "@/assets/set-current-color/icons/video.svg";
import ghostImgCurrentColorSrc from "@/assets/set-current-color/lineart/ghost.svg";
import sunImgCurrentColorSrc from "@/assets/set-current-color/lineart/sun.svg";

import musicIconAllSrc from "@/assets/all/icons/music.svg";
import starIconAllSrc from "@/assets/all/icons/star.svg";
import videoIconAllSrc from "@/assets/all/icons/video.svg";
import ghostImgAllSrc from "@/assets/all/lineart/ghost.svg";
import sunImgAllSrc from "@/assets/all/lineart/sun.svg";
</script>
