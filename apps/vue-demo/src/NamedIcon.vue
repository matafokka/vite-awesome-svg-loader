<template>
  <SvgIcon
    :src="src"
    v-bind="$props"
  />
</template>

<script lang="ts" setup>
import { SvgIcon, type SvgIconProps } from "vite-awesome-svg-loader/vue-integration";
import { ref, watch } from "vue";

// Use same props as SvgIcon, but replace src with name
interface Props extends Omit<SvgIconProps, "src"> {
  name: string;
}

const props = defineProps<Props>();

// See: https://vitejs.dev/guide/features#glob-import
// I wasn't able to use dynamic imports for this
const icons: any = import.meta.glob("/src/assets/import-demo/icons/*.svg", {
  // Put URL here or setup your imports via vite-awesome-svg-loader configuration
  query: "?preserve-line-width&set-current-color",
});

const src = ref(""); // SVG source code

// Make it reactive

const onNameChange = async (name: string) => {
  // Fetch SVG source code.
  // This may throw an error because icon might not be found, or user has been disconnected.
  // You may need to handle this case, for example, don't show an image.
  // Also, while loading, you may want to use some kind of animation.
  const code = (await icons[`/src/assets/import-demo/icons/${name}.svg`]()).default;

  // Verify that name hasn't changed. If it did, set its source code. Otherwise other onNameChange()
  // call will handle the changes.
  if (name === props.name) {
    src.value = code;
  }
}

// Fetch new icon whenever name changes
watch(() => props.name, () => onNameChange(props.name));

// Fetch initial icon.
// If you'll provide a loading fallback, you may replace this with watch(..., { immediate: true })
await onNameChange(props.name);
</script>
