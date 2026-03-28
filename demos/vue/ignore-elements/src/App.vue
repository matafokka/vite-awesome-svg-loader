<template>
  <demo-checkbox
    label="Show original image"
    :checked="isOriginalShown"
    @change="isOriginalShown = $event.checked"
  />

  <SvgImage
    :src="isOriginalShown ? originalImageSrc : imageSrc"
    class="standalone-image"
    style="color: red; margin-top: 24px"
  />
</template>

<script setup lang="ts">
import imageSrc from "@/assets/ignore-elements.svg";
import originalImageSrc from "@/assets/ignore-elements-original.svg";
import { ref } from "vue";
import { SvgImage } from "vite-awesome-svg-loader/vue-integration";

const isOriginalShown = ref(false);
</script>
