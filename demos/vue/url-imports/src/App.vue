<template>
  <p class="demo-section-caption">Original images:</p>

  <div class="images">
    <!-- Write URLs directly -->

    <img
      src="@/assets/icons/music.svg?url"
      class="image"
    />
    <img
      src="@/assets/icons/star.svg?url"
      class="image"
    />
    <img
      src="@/assets/icons/video.svg?url"
      class="image"
    />

    <!-- Or import in script and pass to the img tag -->

    <img
      :src="ghostImgUrl"
      class="image"
    />
    <img
      :src="sunImgUrl"
      class="image"
    />
  </div>

  <p class="demo-section-caption">Preserved line width:</p>

  <div class="images">
    <img
      src="@/assets/icons/music.svg?url&preserve-line-width"
      class="image"
    />
    <img
      src="@/assets/icons/star.svg?url&preserve-line-width"
      class="image"
    />
    <img
      src="@/assets/icons/video.svg?url&preserve-line-width"
      class="image"
    />
    <img
      src="@/assets/lineart/ghost.svg?url&preserve-line-width"
      class="image"
    />
    <img
      src="@/assets/lineart/sun.svg?url&preserve-line-width"
      class="image"
    />
  </div>
</template>

<script setup lang="ts">
import ghostImgUrl from "@/assets/lineart/ghost.svg?url";
import sunImgUrl from "@/assets/lineart/sun.svg?url";
</script>
