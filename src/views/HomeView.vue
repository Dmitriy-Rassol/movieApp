<template>
  <div class="filter-content">
    <Search @submit="handleSubmit" />
    <Tabs @click="handleCategoryClick" />
  </div>
  <div class="movie-content">
    <template v-if="movieStore.movies.length">
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
      />
    </template>
  </div>
  <Pagination
    :page="movieStore.page"
    :totalPage="movieStore.totalPage"
    @next="handleNextClick"
    @prev="handlePrevClick"
  />
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useMovieStore } from "../stores/MovieStore";
import MovieCard from "../components/MovieCard.vue";
import Tabs from "../components/Tabs.vue";
import Search from "../components/Search.vue";
import Pagination from "../components/Pagination.vue";
const movieStore = useMovieStore();
const searchQuery = computed(() => movieStore.searchQuery);

function handleSubmit() {
  movieStore.setPage(1);
  movieStore.fetchCollection();
}

function scrollToFirstCardsRow() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleCategoryClick() {
  movieStore.setPage(1);
  movieStore.fetchCollection();
}

function handleNextClick() {
  if (movieStore.page !== movieStore.totalPage) {
    movieStore.increasePage();
    movieStore.fetchCollection();
    scrollToFirstCardsRow();
  }
  return;
}

function handlePrevClick() {
  if (movieStore.page === 1) return;
  movieStore.decreasePage();
  movieStore.fetchCollection();
  scrollToFirstCardsRow();
}

movieStore.fetchCollection();

watch(
  () => searchQuery.value,
  (value) => {
    if (!value) {
      movieStore.fetchCollection();
      movieStore.setPage(1);
    }
  }
);
</script>

<style lang="scss">
.movie-content {
  display: grid;
  grid-template-columns: repeat(4,minmax(0,1fr));
  gap: 20px;
  padding: 20px 0;
}

.filter-content {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
</style>

