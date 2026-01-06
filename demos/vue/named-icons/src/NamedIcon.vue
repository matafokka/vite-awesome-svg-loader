<template>
  <SvgIcon
    v-bind="props"
    :src
  />
</template>

<script lang="ts" setup>
import loadingIcon from "@/assets/icons/hourglass.svg";
import errorIcon from "@/assets/icons/broken-image.svg";
import { SvgIcon, type SvgIconProps } from "vite-awesome-svg-loader/vue-integration";
import { ref, watch } from "vue";

// Use same props as SvgIcon, but replace "src" with "name"
export interface NamedIconProps extends Omit<SvgIconProps, "src"> {
  name: string;
}

const props = defineProps<NamedIconProps>();

// See: https://vitejs.dev/guide/features#glob-import
const rawIcons: any = import.meta.glob("/src/assets/icons/*.svg", {
  // Put URL here or setup your imports via vite-awesome-svg-loader configuration
  query: "?preserve-line-width&set-current-color",
});

// Transform keys from paths to file-based icon names

const icons: any = {};

for (const path in rawIcons) {
  let name = path.split("/").pop() || "";
  name = name.substring(0, name.lastIndexOf("."));
  icons[name] = rawIcons[path];
}

const src = ref(loadingIcon); // SVG source code

// Make name reactive

const onNameChange = async (name: string) => {
  let code = errorIcon;

  try {
    code = (await icons[name]()).default; // Fetch SVG source code
  } catch (e) {
    console.error(e);
    code = errorIcon; // Provide a fallback for when icon could not be loaded
  }

  // Verify that name hasn't changed. If it didn't, set its source code. Otherwise other onNameChange()
  // call will handle the changes.
  if (name === props.name) {
    src.value = code;
  }
};

watch(() => props.name, onNameChange, { immediate: true });
</script>
