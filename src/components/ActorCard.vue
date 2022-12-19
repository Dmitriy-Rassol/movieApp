<template >
  <router-link class="actor-card" :to="{
      name: 'ActorView',
      params: { id: actor.id },
    }">
    <div class="actor-card__block--img">
      <img
        class="actor-card__img"
        :src="
          actor.profile_path
            ? `${IMAGE_URL.w300}${actor.profile_path}`
            : `/public/img/no-pic.png`
        "
        :alt="actor.original_name"
      />
    </div>
    <div class="actor-card__info">
      <p class="actor-card__title">{{ actor.original_name }}</p>
      <p class="actor-card__character">{{ actor.character }}</p>
    </div>
  </router-link>
</template>
  
  <script setup>
import { IMAGE_URL } from "../constant";
const props = defineProps({
  actor: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>
  
  <style lang="scss" scoped>
.actor-card {
  &__img {
    width: 100%;
    border-radius: 10px;
  }
  &__info {
    width: 100%;
    padding: 10px 5px;
    font-size: 18px;
  }
  &__block--img {
    width: 100%;
  }
  &__character {
    color: rgb(143, 143, 143);
    font-weight: 600;
  }
}


</style>