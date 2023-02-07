<template >
  <div v-for="q in quantity" :key="q" class="w-full animate-pulse">
    <div class="rounded-lg h-auto w-full object-cover">
      <img
        class="rounded-lg"
        src="@/assets/img/image-skeleton.png"
        alt="skeleton actor"
      />
    </div>
    <div class="w-full">
      <div class="mt-1 rounded-lg bg-[#69717f] h-7"></div>
      <div class="mt-1 rounded-lg bg-[#69717f] h-7"></div>
    </div>
  </div>
</template>
    
<script setup>
const props = defineProps({
  quantity: Number,
});
</script>
    
    <style lang="scss" scoped>
</style>