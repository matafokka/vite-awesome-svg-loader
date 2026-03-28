<template>
  <div class="images">
    <button
      class="demo-button"
      @click="cycleColors"
    >
      Cycle colors
    </button>

    <SvgIcon
      :src="musicIconSrc"
      :color="color"
    />
    <SvgIcon
      :src="starIconSrc"
      :color="color"
    />
    <SvgIcon
      :src="videoIconSrc"
      :color="color"
    />
    <SvgIcon
      :src="ghostImgSrc"
      :color="color"
    />
    <SvgIcon
      :src="sunImgSrc"
      :color="color"
    />
  </div>
</template>

<script setup lang="ts">
import musicIconSrc from "@/assets/icons/music.svg";
import starIconSrc from "@/assets/icons/star.svg";
import videoIconSrc from "@/assets/icons/video.svg";
import ghostImgSrc from "@/assets/lineart/ghost.svg";
import sunImgSrc from "@/assets/lineart/sun.svg";

import { ref, computed } from "vue";
import { SvgIcon } from "vite-awesome-svg-loader/vue-integration";

const colors = ["red", "green", "blue"];
const colorIndex = ref(0);
const color = computed(() => colors[colorIndex.value]);

const cycleColors = () => {
  colorIndex.value++;

  if (colorIndex.value === colors.length) {
    colorIndex.value = 0;
  }
};
</script>
