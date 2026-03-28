<template>
  <span
    class="vite-awesome-svg-loader-icon"
    :style="iconStyle"
  >
    <SvgImage
      :src="src"
      aria-hidden="true"
    />
  </span>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import SvgImage from "./SvgImage.vue";
import { getSvgIconStyle, initSvgIcons, SvgIconProps } from "integration-utils";

const props = defineProps<SvgIconProps>();
initSvgIcons();
const iconStyle = computed(() => getSvgIconStyle(props));
</script>
