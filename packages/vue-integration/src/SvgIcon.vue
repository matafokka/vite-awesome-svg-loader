<template>
  <span
    class="awesome-svg-loader-icon icon"
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
import { getSvgIconStyle, SvgIconProps } from "integration-utils";

const props = defineProps<SvgIconProps>();
const iconStyle = computed(() => getSvgIconStyle(props));
</script>
