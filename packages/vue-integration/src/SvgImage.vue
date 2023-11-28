<template>
  <svg v-bind="{ alt: '', ...$attrs, ...svgAttrs }">
    <use
      :href="'#' + id"
      v-bind="useElAttrs || {}"
    />
  </svg>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { onSrcUpdate as onSrcUpdateRaw, onUnmount as onUnmountRaw } from "integration-utils";
import { SvgImageProps } from "./types";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<SvgImageProps>();
const id = ref("");
const svgAttrs = ref<Record<string, any>>({});

const onSrcUpdate = (prevSrc: string | undefined, src: string) => {
  const res = onSrcUpdateRaw(prevSrc, src);

  if (res.id) {
    id.value = res.id;
  }

  if (res.attrs) {
    svgAttrs.value = res.attrs;
  }
};

watch(
  () => props.src,
  (newSrc, oldSrc) => onSrcUpdate(oldSrc, newSrc),
);

// onBeforeMount doesn't trigger DOM update in Nuxt 3.8.2
onMounted(() => onSrcUpdate(undefined, props.src));
onBeforeUnmount(() => onUnmountRaw(id.value));
</script>
