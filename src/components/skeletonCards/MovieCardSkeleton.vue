<template>
  <div v-for="q in quantity" :key="q" class=" animate-pulse">
    <img
      class="object-cover w-full h-auto rounded-lg"
      src="@/assets/img/image-skeleton.png"
      alt="skeleton image"
    />
  </div>
</template>
  
  <script setup >
const props = defineProps({
  quantity: Number,
});
</script>

  <style lang="scss" scoped>
</style>