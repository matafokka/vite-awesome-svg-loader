<template>
  <p class="demo-section-caption">Click on the rectangles to change their colors:</p>

  <div class="images">
    <div
      v-html="imageSrc"
      class="standalone-image"
      @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">
import imageSrc, { prefix as imagePrefix } from "@/assets/targeting-demo.svg";

const createColorGetter = (colors: string[]) => {
  let index = 0;

  return () => {
    index++;

    if (index === colors.length) {
      index = 0;
    }

    return colors[index];
  };
};

const leftElementClass = imagePrefix + "left-element";
const rightElementClass = imagePrefix + "right-element";
const getLeftElementColor = createColorGetter(["#ffd6d6", "#e8ffd6", "#d6efff"]);
const getRightElementColor = createColorGetter(["#f3d6ff", "#ffffd6", "#dad6ff"]);

const onClick = (e: MouseEvent) => {
  if (!(e.target instanceof SVGElement)) {
    return;
  }

  if (e.target.classList.contains(leftElementClass)) {
    e.target.style.fill = getLeftElementColor();
  } else if (e.target.classList.contains(rightElementClass)) {
    e.target.style.fill = getRightElementColor();
  }
};
</script>
