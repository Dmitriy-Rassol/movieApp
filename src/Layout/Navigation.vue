<template>
  <div class="
      h-screen
      z-20
      w-28
      fixed
      top-0
      left-0
      bg-black bg-clip-padding
      backdrop-filter backdrop-blur-sm
      bg-opacity-30
      overflow-x-hidden
      shadow-4xl
      py-10
      flex
      flex-col
      items-center
      justify-between
      md:flex-row
      md:w-full
      md:h-14 
      md:bottom-0
      md:top-auto 
      md:bg-opacity-90
      md:py-0
      md:pl-6
      md:pr-6
    ">
    <div class="z-20 relative flex flex-col items-center pt-6 md:pt-0 md:flex-row md:justify-between md:w-full">
      <div v-if="userStore.userSession" class="mb-10 md:mb-0 md:pr-[10%] xs:pr-4" v-for="(nav, i) in NAV_MENU" :key="i">
        <router-link class="flex flex-col items-center" :to="{ name: nav.pathName }">
          <img :src="`${nav.query}`" class="w-8 md:w-6 xs:w-5" :alt="nav.pathName"/>
          <p class="text-sm  md:text-xs xs:text-[8px] text-[#69717F] font-bold">{{ $t(nav.title) }}</p>
          </router-link>
      </div>
    </div>
    <div class="z-20 relative flex justify-center items-center pt-6 md:pt-0"> 
      <label class="relative cursor-pointer">
        <input @click="emit('switchLang')" type="checkbox" value="" class="sr-only peer" :checked="!isChecked">        
        <div
          class="
          w-6 h-11
          flex
          items-center
          flex-col
          md:flex-row
          md:w-11
          md:h-6
          md:justify-between
          bg-orange-600 
          rounded-full 
          peer-checked:after:translate-y-full 
          md:peer-checked:after:translate-x-full
          md:peer-checked:after:translate-y-0
          peer-checked:after:border-white 
          after:content-[''] 
          after:absolute 
          after:bg-white 
          after:border-gray-300 
          after:border 
          after:top-0.5
          md:after:left-0.5
          after:rounded-full 
          after:h-5 
          after:w-5 
          after:transition-all
          after:ease-in-out 
          dark:border-gray-600
          "> 
          <span class="z-20 mt-1 pb-1 text-xs font-bold text-black dark:text-gray-300 md:mt-0 md:pb-0 md:pl-1">RU</span>
           <span class="z-20 mb-1 text-xs font-bold text-black dark:text-gray-300 md:mb-0 md:pr-1">EN</span>
        </div>
       
      </label> 
    </div>
  </div>
</template>

<script setup>
import home from "@/assets/svg/home.svg";
import bookmarkMovies from "@/assets/svg/bookmark.svg";
import watchedMovies from "@/assets/svg/eye.svg";
import user from "@/assets/svg/user-nav.svg";
import { useUserStore } from "@/stores/UserStore";
import { useI18n } from 'vue-i18n';
import { computed } from "vue";

const userStore = useUserStore();
const emit = defineEmits(["switchLang"]);
const { locale } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})

const NAV_MENU = [
  { pathName: "Home", query: home , title: "nav.home"},
  { pathName: "User", query: user , title: "nav.user"},
  { pathName: "Bookmark", query: bookmarkMovies , title: "nav.bookmark" },
  { pathName: "Watched", query: watchedMovies, title: "nav.watched" },
];

const isChecked = computed(() => {
  return locale.value === 'ru' ? true : false
})

</script>

<style lang="css" scoped>

</style>