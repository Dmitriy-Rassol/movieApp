<template >
  <router-link
    class="flex flex-col actor-hover "
    :to="{
      name: 'ActorView',
      params: { id: actor.id },
    }"
  >
   <div class=" overflow-hidden rounded-lg " >
    <img
      class="transition duration-200 ease-in-out "
      :src="
        actor.profile_path
          ? `${IMAGE_URL.w300}${actor.profile_path}`
          : `../../src/assets/img/no-pic.png`
      "
      :alt="actor.original_name"
    />
   
   </div>
    <div class="pt-2 text-lg overflow-hidden mt-auto">
      <p>{{ actor.original_name }}</p>
      <p class="text-[#bdbdbd] truncate text-sm">{{ actor.character }}</p>
    </div>
  </router-link>
</template>
  
  <script setup>
import { IMAGE_URL } from "@/shared/constant";
const props = defineProps({
  actor: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>
  
  <style lang="scss" scoped>
</style>