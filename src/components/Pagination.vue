<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      :disabled = "page === 1"
      type="button"
      @click="emit('prev')"
    >
      Prev
    </button>
    <span class="pagination__count"> {{ page }} of {{ totalPage }}</span>

    <button
      class="pagination__btn"
      :disabled="page === totalPage"
      type="button"
      @click="emit('next')"
    >
      Next
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  page: Number,
  totalPage: Number,
});
const emit = defineEmits(["prev", "next"]);
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
  &__btn {
    padding: 2px 15px;
    background-color: var(--bg-card);
    color: var(--color);
    text-shadow: var(--text-shadow);
    border: none;
    font-size: 20px;
    font-family: var(--poppins-font);
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    &:hover:not(:disabled) {
      color: rgb(150, 150, 150);
    }
    &:disabled {
        opacity: 0.4;
    }
  }
  &__count {
    padding: 10px;
  }
}
</style>