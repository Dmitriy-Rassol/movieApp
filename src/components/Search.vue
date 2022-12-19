<template>
  <form class="form-search" @submit.prevent="emit('submit')">
    <input
      class="input-search"
      placeholder="search"
      type="search"
      v-model="searchQuery"
    />
    <input class="input-btn" type="submit" value="Search" />
  </form>
</template>
  
<script setup>
import { computed, watch } from "vue";
import { useMovieStore } from "../stores/MovieStore";

const movieStore = useMovieStore();
const emit = defineEmits(["submit"]);

const searchQuery = computed({
  get() {
    return movieStore.searchQuery;
  },
  set(newValue) {
    movieStore.setSearchQuery(newValue);
  },
});

watch(
  () => searchQuery.value,
  (value) => {
    if (!value) {
      movieStore.fetchCollection();
    }
  }
);
</script>
  
  
<style lang="scss" scoped>
.form-search {
  width: 40%;
  display: flex;
}

.input {
  &-search {
    width: 100%;
    padding: 10px 12px 10px 30px;
    outline: none;
    border-radius: 15px;
    font-size: 20px;
    font-family: var(--poppins-font);
    background: transparent;
    border: 1px solid #323b54;
    color: var(--color);
    margin-right: 20px;
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
    &::placeholder {
      color: rgba(142, 149, 169);
      text-transform: capitalize;
      transition: 0.15s;
      font-size: 18px;
      opacity: 1;
    }
  }
  &-btn {
    border-radius: 15px;
    padding: 10px 30px;
    font-size: 20px;
    color: var(--color);
    background: var(--btn);
    font-family: var(--poppins-font);
    border: none;
    outline: none;
    text-shadow: var(--text-shadow);
    cursor: pointer;
  }
}
</style>