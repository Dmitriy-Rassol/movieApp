<template>
  <div class="container">
    <Header/>
    <Navigation @switchLang="switchLang"/>
    <main class="ml-28 md:ml-0 md:pb-14">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </main>
    <HandleErrorMessage/>
  </div>
</template>


<script setup>
import Header from "@/Layout/Header.vue";
import Navigation from "@/Layout/Navigation.vue";
import HandleErrorMessage from "@/components/HandleErrorMessage.vue";
import {useI18n} from 'vue-i18n';
import config from "@/shared/config";
import { useMovieStore } from "@/stores/MovieStore";

const {t, locale} = useI18n({
  inheritLocale: true,
  useScope: 'global'})

const movieStore = useMovieStore();

const switchLang = () => {
  locale.value === 'ru' ? locale.value = 'en' : locale.value = 'ru';
  config.langDefault === 'ru-RU' ? config.langDefault = 'en-US': config.langDefault = 'ru-RU';
  localStorage.setItem('lang', locale.value );
  localStorage.setItem('langDB', config.langDefault );
  movieStore.fetchCollection()
}
</script>

<style lang="scss" scoped>
</style>
