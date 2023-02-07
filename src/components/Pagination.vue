<template>
  <div class="flex items-center justify-end py-2">
    <button class="
        px-2
        py-1
        md:px-1
        md:py-0
        disabled:opacity-40
         hover:disabled:bg-transparent
        [text-shadow:_1px_1px_4px_rgba(0,0,0,0.69)]
         border-none
         text-lg
         md:text-base
         font-medium
         rounded-lg
         hover:bg-orange-700
          transition duration-200 ease-out

      " :disabled="page === 1" type="button" @click="emit('prev')">
      {{ $t("pagination.prev") }}
    </button>
    <span class=" p-2 md:text-base"> {{ page }} {{$t("pagination.of")}} {{ totalPage }}</span>

    <button class="
      px-2
        py-1
        md:px-1
        md:py-0
        disabled:opacity-40
        [text-shadow:_1px_1px_4px_rgba(0,0,0,0.69)]
         border-none
         text-lg
         md:text-base
         font-medium
         rounded-lg
         hover:bg-orange-700
          transition duration-200 ease-out
      " :disabled="page === totalPage || totalPage === 0" type="button" @click="emit('next')">
      {{ $t("pagination.next") }}
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

</style>