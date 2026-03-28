<template>
  <p class="demo-section-caption">Original images:</p>

  <div class="images">
    <!-- Write URLs directly -->

    <img
      src="@/assets/icons/music.svg?url"
      alt=""
    />
    <img
      src="@/assets/icons/star.svg?url"
      alt=""
    />
    <img
      src="@/assets/icons/video.svg?url"
      alt=""
    />

    <!-- Or import in script and pass to the img tag -->

    <img
      :src="ghostImgUrl"
      alt=""
    />
    <img
      :src="sunImgUrl"
      alt=""
    />
  </div>

  <p class="demo-section-caption">Preserved line width:</p>

  <div class="images">
    <img
      src="@/assets/icons/music.svg?url&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/icons/star.svg?url&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/icons/video.svg?url&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/lineart/ghost.svg?url&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/lineart/sun.svg?url&preserve-line-width"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import ghostImgUrl from "@/assets/lineart/ghost.svg?url";
import sunImgUrl from "@/assets/lineart/sun.svg?url";
</script>
