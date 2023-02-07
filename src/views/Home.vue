<template>
  <div class="mb-8 max-w-xl">
    <h1 class="mb-8 text-[54px] md:text-4xl font-bold leading-[70px] md:max-w-sm">
      {{ $t("home.title") }}
    </h1>
    <Search @submit="handleSubmit" />
  </div>

  <Tabs class="mb-8" @click="handleCategoryClick" />

  <AppTitle :title="!titleSearchCategories ? `${$t('home.popular')}` : 'Search'" />

  <div class="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xxs:grid-cols-2 gap-3" v-if="!filterStore.notFound">
    <template v-for="movie in movieStore.movies" :key="movie.id">
      <MovieCard :movie="movie"/>
    </template>
  </div>

  <div class="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xxs:grid-cols-2 gap-3" v-else>
    <SkeletonMovieCard :quantity="20" />
  </div>

  <h2 class=" text-orange-500" v-if="!filterStore.notFound && !movieStore.movies.length">
    Search returned no results, please try again
  </h2>

  <Pagination
    :page="filterStore.page"
    :totalPage="filterStore.totalPage"
    @next="handleNextClick"
    @prev="handlePrevClick"
    v-if="filterStore.totalPage"
  />
</template>

<script setup>
import { watch, computed, ref, onMounted } from "vue";
import { useMovieStore } from "@/stores/MovieStore";
import { useFilterStore } from "@/stores/FilterStore";
import MovieCard from "@/components/MovieCard.vue";
import SkeletonMovieCard from "@/components/skeletonCards/MovieCardSkeleton.vue";
import Tabs from "@/components/Tabs.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";
import AppTitle from "../components/AppTitle.vue";

const movieStore = useMovieStore();
const filterStore = useFilterStore();
const searchQuery = computed(() => filterStore.searchQuery);
const titleSearchCategories = ref(false);

onMounted(() => {
  movieStore.fetchCollection();
})

function handleSubmit() {
  filterStore.setPage(1);
  movieStore.fetchCollection();
  titleSearchCategories.value = true;
}

function scrollToFirstCardsRow() {
  window.scrollTo({ top: 300, behavior: "smooth" });
}

function handleCategoryClick() {
  filterStore.setPage(1);
  movieStore.fetchCollection();
}

function handleNextClick() {
  if (filterStore.page !== filterStore.totalPage) {
    filterStore.increasePage();
    movieStore.fetchCollection();
    scrollToFirstCardsRow();
  }
  return;
}

function handlePrevClick() {
  if (filterStore.page === 1) return;
  filterStore.decreasePage();
  movieStore.fetchCollection();
  scrollToFirstCardsRow();
}

watch(
  () => searchQuery.value,
  (value) => {
    if (!value) {
      movieStore.fetchCollection();
      filterStore.setPage(1);
      titleSearchCategories.value = false;
    }
  }
);

</script>

<style lang="scss">
</style>

