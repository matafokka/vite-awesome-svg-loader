<template>
  <div class="images">
    <SvgImage
      :src="imageSrc"
      class="image"
      :style="{
        '--primary-color': 'red',
        '--secondary-color': 'green',
        '--tertiary-color': 'blue',
      }"
    />
    <SvgImage
      :src="imageSrc"
      class="image"
      :style="{
        '--primary-color': 'magenta',
        '--secondary-color': 'cyan',
        '--tertiary-color': 'yellow',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import imageSrc from "@/assets/image.svg";
import { SvgImage } from "vite-awesome-svg-loader/vue-integration";
</script>
