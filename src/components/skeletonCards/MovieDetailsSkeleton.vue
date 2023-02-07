<template>
  <div class="my-14">
    <div class="
    relative 
    animate-pulse
        [text-shadow:_1px_1px_4px_rgba(0,0,0,0.69)]
        grid grid-cols-info
        lg:grid-cols-1
        lg:mb-24 
        gap-x-10
        p-14
        md:px-10
        md:py-10
        xxs:px-4">
      <img src="@/assets/img/image-skeleton.png" alt="skeleton image" class="rounded-lg w-full lg:w-full lg:h-3/3 object-cover" />
      <div class="relative lg:mt-2 ">
        <div class="bg-[#69717f] h-12 rounded-lg"></div>
        <div class=" mt-7 bg-[#69717f] rounded-lg h-1/3"></div>
        <div class="bg-[#69717f] mt-7 rounded-lg h-10 w-1/6"></div>
        <div class="grid grid-cols-2 gap-2">
          <template v-for="i in 4" :key="i">
            <div>
              <div class="
              bg-[#69717f] h-8 mt-5 rounded-lg"></div>
              <div class="
              bg-[#69717f] h-8 mt-3 rounded-lg"></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scope>

</style>