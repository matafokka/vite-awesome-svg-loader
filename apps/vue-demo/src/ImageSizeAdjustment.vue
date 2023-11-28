<template>
  <!-- Size adjustment component. This is not important for the demo. -->

  <Teleport to="#adjustment-container">
    <div class="adjustment-content">
      <label for="size-input">Image size (px):</label>

      <input
        v-model="size"
        type="range"
        :min="min"
        :max="max"
        step="1"
        tabindex="0"
        aria-hidden="true"
      />

      <input
        v-model="size"
        type="number"
        :min="min"
        :max="max"
        step="10"
        id="size-input"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const min = 10;
const max = 500;
const size = ref(100);

watch(size, () => document.documentElement.style.setProperty("--image-size", size.value + "px"), {
  immediate: true,
});
</script>
