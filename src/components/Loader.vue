<template>
   <div v-if="loader" class=" absolute w-full h-full bg-black bg-opacity-30 top-0 left-0 z-20 flex justify-center items-center">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script setup>
const props = defineProps({
  loader: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped>

</style>