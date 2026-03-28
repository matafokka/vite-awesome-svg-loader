<template>
  <full-comp v-bind="$props" />
</template>

<script setup lang="ts">
import { FullComponent } from "@/component/test-kit/FullComponent";

export interface TestComponentProps {
  withoutDefault?: string;
  withDefault?: string;
  prop1?: string;
  prop2?: string;
}

defineProps<TestComponentProps>();
FullComponent.define();
</script>
