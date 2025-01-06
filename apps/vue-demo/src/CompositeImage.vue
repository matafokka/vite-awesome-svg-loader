<template>
  <div class="image composite-image">
    <SvgImage
      :src="multicolorPrimaryImageSrc"
      :style="{ color: primary }"
    />

    <SvgImage
      :src="multicolorSecondaryImageSrc"
      :style="{ color: secondary }"
    />

    <SvgImage
      :src="multicolorTertiaryImageSrc"
      :style="{ color: tertiary }"
    />
  </div>
</template>

<script setup lang="ts">
import multicolorPrimaryImageSrc from "@/assets/recipes/multicolor/primary.svg?set-current-color";
import multicolorSecondaryImageSrc from "@/assets/recipes/multicolor/secondary.svg?set-current-color";
import multicolorTertiaryImageSrc from "@/assets/recipes/multicolor/tertiary.svg?set-current-color";
import { SvgImage } from "vite-awesome-svg-loader/vue-integration";

export interface CompositeImageProps {
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

withDefaults(defineProps<CompositeImageProps>(), {
  primary: "red",
  secondary: "blue",
  tertiary: "green",
});
</script>

<style lang="scss" scoped>
// Overlay images with positions hack
.composite-image {
  position: relative;

  & > :deep(*) {
    position: absolute;
  }
}
</style>
