<template>
  <div class="tabs-form">
    <div
      v-for="(tab, i) in MEDIA_TYPES"
      :key="i"
      :class="['tabs-btn', { 'btn-active': movieStore.activeTab === i }]"
      @click="setTab(i, tab.type)"
    >
      {{ tab.title }}
    </div>
  </div>
</template>

<script setup>
import { MEDIA_TYPES } from "../constant";
import { useMovieStore } from "../stores/MovieStore";

const movieStore = useMovieStore();

const setTab = (id, type) => {
  movieStore.setActiveTab(id, type);
};
</script>

<style lang="scss" scoped>
.tabs {
  &-form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 5px;
    border-radius: 20px;
    text-align: center;
    background: rgb(10, 5, 17);
  }
  &-btn {
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 15px;
  }
}

.btn-active {
  background: var(--btn);
}
</style>