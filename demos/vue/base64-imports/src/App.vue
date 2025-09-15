<template>
  <code
    class="mono"
    role="figure"
    aria-label="Base64 representation of an image"
  >
    {{ imgBase64 }}
  </code>
</template>

<script setup lang="ts">
import imgBase64 from "@/assets/star.svg?base64";
</script>
