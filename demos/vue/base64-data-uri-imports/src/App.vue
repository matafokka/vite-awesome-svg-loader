<template>
  <p class="demo-section-caption">Original images:</p>

  <div class="images">
    <!-- Write URLs directly -->

    <img
      src="@/assets/icons/music.svg?base64-data-uri"
      alt=""
    />
    <img
      src="@/assets/icons/star.svg?base64-data-uri"
      alt=""
    />
    <img
      src="@/assets/icons/video.svg?base64-data-uri"
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
      src="@/assets/icons/music.svg?base64-data-uri&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/icons/star.svg?base64-data-uri&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/icons/video.svg?base64-data-uri&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/lineart/ghost.svg?base64-data-uri&preserve-line-width"
      alt=""
    />
    <img
      src="@/assets/lineart/sun.svg?base64-data-uri&preserve-line-width"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import ghostImgUrl from "@/assets/lineart/ghost.svg?base64-data-uri";
import sunImgUrl from "@/assets/lineart/sun.svg?base64-data-uri";
</script>
