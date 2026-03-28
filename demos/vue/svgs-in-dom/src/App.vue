<template>
  <p class="demo-section-caption">Original images:</p>

  <div class="images">
    <div v-html="musicIconSrc" />
    <div v-html="starIconSrc" />
    <div v-html="videoIconSrc" />
    <div v-html="ghostImgSrc" />
    <div v-html="sunImgSrc" />
  </div>

  <p class="demo-section-caption">Preserve line width:</p>

  <div class="images">
    <div v-html="musicIconPreWidthSrc" />
    <div v-html="starIconPreWidthSrc" />
    <div v-html="videoIconPreWidthSrc" />
    <div v-html="ghostImgPreWidthSrc" />
    <div v-html="sunImgPreWidthSrc" />
  </div>

  <p class="demo-section-caption">Set current color:</p>

  <div class="images">
    <div
      v-html="musicIconCurrentColorSrc"
      style="color: #00988a"
    />
    <div
      v-html="starIconCurrentColorSrc"
      style="color: orange"
    />
    <div
      v-html="videoIconCurrentColorSrc"
      style="color: hotpink"
    />
    <div
      v-html="ghostImgCurrentColorSrc"
      style="color: purple"
    />
    <div
      v-html="sunImgCurrentColorSrc"
      style="color: green"
    />
  </div>

  <p class="demo-section-caption">All transformations:</p>

  <div class="images">
    <div
      v-html="musicIconAllSrc"
      style="color: #00988a"
    />
    <div
      v-html="starIconAllSrc"
      style="color: orange"
    />
    <div
      v-html="videoIconAllSrc"
      style="color: hotpink"
    />
    <div
      v-html="ghostImgAllSrc"
      style="color: purple"
    />
    <div
      v-html="sunImgAllSrc"
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
