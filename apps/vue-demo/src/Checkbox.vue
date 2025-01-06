<template>
  <label class="checkbox">
    <input
      v-model="model"
      type="checkbox"
    />

    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
export interface CheckboxProps {
  label: string;
}

defineProps<CheckboxProps>();
const model = defineModel<boolean>();
</script>
