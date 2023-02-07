<template>
  <form class="relative flex w-full input-before" @submit.prevent="emit('submit')">
    <img class="absolute top-3 left-3 w-6 xs:top-2" src="@/assets/svg/search.svg" alt="">
    <input
      class="
        outline-none
        pl-12
        placeholder-gray
        xs:placeholder:text-lg
        w-full
        py-2
        xs:py-1
         rounded-lg
        text-gray

      "
      :placeholder="$t('home.search.placeholder')"
      type="text"
      v-model="searchQuery"
    />
  </form>
</template>
  
<script setup>
import { computed } from "vue";
import { useFilterStore } from "@/stores/FilterStore";

const filterStore = useFilterStore();
const emit = defineEmits(["submit"]);

const searchQuery = computed({
  get() {
    return filterStore.searchQuery;
  },
  set(newValue) {
    filterStore.setSearchQuery(newValue);
  },
});
</script>
  
  
<style lang="scss" scoped>
</style>