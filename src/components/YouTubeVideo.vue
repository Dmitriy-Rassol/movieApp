<template>
  <div class="flex justify-center items-center h-full">
    <iframe
      class="w-3/4 rounded-lg shadow-4xl bg-black aspect-video"
      v-if="video?.key"
      :src="`https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1`"
      frameborder="0"
      allowfullscreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      :title="title"
    ></iframe>
  </div>
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
    props.videos.results.find(({ name, type }) => {
      return name.includes("Official Trailer") || type.includes("Trailer");
    }) || props.videos.results[0]
  );
});


</script>

<style lang="scss" scoped>
</style>