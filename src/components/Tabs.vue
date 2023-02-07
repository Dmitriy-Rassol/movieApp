<template>
  <div class="grid grid-cols-3 text-center self-center max-w-xs md:text-base  rounded-xl">
    <button v-for="(tab, i) in MEDIA_TYPES" :key="i" :class="[
      'cursor-pointer p-1 transition duration-200 ease-in-out rounded-xl min-w-max mr-1 hover:bg-orange-700',
      { 'bg-orange-700': filterStore.activeTab === i },
    ]" @click="setTab(i, tab.type)">
      {{ $t(tab.title) }}
    </button>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/stores/MovieStore";
import {MEDIA_TYPES} from "@/shared/constant"
import { useFilterStore } from "@/stores/FilterStore";

const movieStore = useMovieStore();
const filterStore = useFilterStore();

const setTab = (id, type) => {
  filterStore.setActiveTab(id, type);
  movieStore.fetchCollection();
};

</script>



<style lang="scss" scoped>

</style>