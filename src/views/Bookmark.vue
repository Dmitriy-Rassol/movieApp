<template>
  <AppTitle :title="$t('bookmark')" />
  <div class="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xxs:grid-cols-2 gap-3">
    <template v-if="!favoritesMovies.length && !filterStore.notFound">
      <h2>{{ $t("listEmpty") }}</h2>
    </template>
    <template v-else-if="favoritesMovies.length">
      <MovieCard
        :movie="movie"
        v-for="movie in favoritesMovies"
        :key="movie.id"
      />
    </template>
    <template v-else>
      <SkeletonMovieCard :quantity="10" />
    </template>
  </div>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";
import AppTitle from "@/components/AppTitle.vue";
import SkeletonMovieCard from "@/components/skeletonCards/MovieCardSkeleton.vue";
import { useMovieStore } from "@/stores/MovieStore";
import { useFilterStore } from "@/stores/FilterStore";
import { computed, onMounted, ref } from "@vue/runtime-core";
const movieStore = useMovieStore();
const filterStore = useFilterStore();
const movies = ref([]);

onMounted(() => {
  movieStore.getFavoritesMovies();
});

const favoritesMovies = computed(() => {
  return (movies.value = movieStore.moviesFilter.filter(
    (el) => el.bookmark === true
  ));
});
</script>

<style>
</style>