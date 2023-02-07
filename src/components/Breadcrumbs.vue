<template>
  <div class="max-w-2xl bg-zinc-900 relative z-10 rounded-xl px-7 py-5 mb-7 md:text-xl md:py-3 xs:text-base xs:mb-2">
    <div class="flex my-1">
      <template v-if="type">
        <router-link
          to="/"
          class="
            capitalize
            transition
            duration-200
            ease-in-out
            hover:text-orange-400
          "
        >
          {{ $t("breadcrumbs.home") }}
        </router-link>
        <span class="px-2"> / </span>
        <p class="uppercase text-orange-400">{{ typeShow }}</p>
      </template>
      <template v-else>
        <button
          class="
            flex
            items-center
            font-medium
            transition
            duration-200
            ease-in-out
            hover:text-orange-400
            btn-back
          "
          @click="$router.back() || $router.push({ name: 'Home' })"
        >
        &#8592
        {{ $t("breadcrumbs.back") }}
        </button>
      </template>
    </div>
    <h2 v-if="title" class="text-2xl font-semibold md:text-xl xs:text-base">{{ title }}</h2>
    <div
      v-else
      class="w-full h-10 animate-pulse bg-slate-600 rounded-lg mt-2"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n({
  inheritLocale: true,
  useScope: 'global'})
const props = defineProps({
  type: String,
  title: String,
});

const typeShow = computed(() => {
  if (props.type === "movie") {
    return t("movie.movieType")
  } else {
    return t("movie.tvType")
  }
})
</script>

<style lang="scss" scoped>
</style>