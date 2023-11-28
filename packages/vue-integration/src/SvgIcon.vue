<template>
  <span
    class="icon"
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
import { SvgIconProps } from "./types";

const props = defineProps<SvgIconProps>();

const iconStyle = computed(() => {
  const style: Record<string, any> = {};

  if (props.size && props.size !== "unset") {
    for (const param of ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"]) {
      style[param] = props.size;
    }
  }

  if (props.color) {
    style["--icon-color"] = props.color;
  }

  style["--icon-transition"] = props.colorTransition || "0.3s linear";

  return style;
});
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  color: var(--icon-color);
}

:deep(svg) {
  vertical-align: top;
}

:deep(use) {
  transition: color var(--icon-transition);
}
</style>
