<template>
  <h3 class="mt-6 text-3xl  md:text-xl xs:text-lg font-bold mb-6">
    {{title}}
  </h3>
 
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  }
});
</script>

<style lang="scss" scoped>
</style>