<template>
  <iframe class="trailer"
    v-if="video?.key"
    :src="`https://www.youtube-nocookie.com/embed/${video.key}`"
    frameborder="0"
    allowfullscreen
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    :title="title"
  ></iframe>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  videos: {
    type: Object,
  },
  title: {
    type: String,
  },
});

const video = computed(() => {
  return (
    props.videos?.results.find(({ name, type }) => {
      return name.includes("Official Trailer") || type.includes("Trailer");
    }) || props.videos?.results[0]
   
  );
});
</script>

<style lang="scss" scoped>
.trailer {
    width: 100%;
    grid-area: 2 / 1 / 3 / 3;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgb(0 0 0);
}
</style>