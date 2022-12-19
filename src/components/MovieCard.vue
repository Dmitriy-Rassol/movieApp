<template>
  <router-link
    class="movie-card"
    :to="{
      name: 'MovieView',
      params: { type: movie.media_type, id: movie.id },
    }"
    v-if="movie.poster_path"
  >
    <div class="movie-card__block--img">
      <span class="movie-card__type">{{ movie.media_type }}</span>
      <img
        class="movie-card__img"
        :src="`${IMAGE_URL.w500}${movie.poster_path}`"
        :alt="title"
      />
    </div>
    <div class="movie-card__info">
      <span class="movie-card__title">{{ title }}</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { IMAGE_URL } from "../constant";

const props = defineProps({
  movie: {
    type: Object,
  },
});

const title = computed(() => {
  const data = props.movie.title || props.movie.name;
  return data;
  //.length > 26 ? data.substr(0, 26) + "..." : data;
});
</script>

<style lang="scss" scoped>
.movie-card {
  border-radius: 20px;
  background-color: var(--bg-card);
  padding: 10px;
  transition: 0.2s;
  box-shadow: 0px 0px 100px 1px rgb(0 0 0);

  &:hover {
    -webkit-box-shadow: 0px 9px 25px -3px var(--box-shadow);
    -moz-box-shadow: 0px 9px 25px -3px var(--box-shadow);
    box-shadow: 0px 9px 25px -3px var(--box-shadow);
  }

  &__img {
    border-radius: 10px;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    padding: 10px 5px;
  }
  &__block--img {
    position: relative;
  }
  &__title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__type {
    position: absolute;
    text-transform: uppercase;
    border: 1px solid var(--color);
    border-radius: 5px;
    line-height: 1em;
    padding: 2px;
    right: 10px;
    top: 10px;
    z-index: 1;
  }
}
</style>