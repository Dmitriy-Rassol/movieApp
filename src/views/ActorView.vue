<template>
  <Breadcrumbs :type="route.params.type" :title="state.person.name" />
  <div class="
      [text-shadow:_1px_1px_4px_rgba(0,0,0,0.69)]
      relative
      grid 
      grid-cols-info
      md:grid-cols-1
      gap-x-10
      py-14
    " v-if="skeleton">
    <img v-if="state.person.profile_path" :src="profileImage" :alt="state.person.name" class="shadow-4xl rounded-lg mb-3 md:w-1/2" />
    <div class="relative">
      <h2 class="text-3xl font-extrabold pb-7 md:pb-2 md:text-2xl xs:text-xl">
        {{ state.person.name }}
      </h2>
      <p class="my-5 text-2xl flex flex-col items-center md:text-xl xs:text-lg" :class="{ hide: state.readMoreActivated }">
        {{ biography }}
        <button v-if="isReadMoreShown" class=" text-orange-400 mt-5 w-max text-xl font-semibold border-none cursor-pointer xs:text-lg" type="button"
          @click="state.readMoreActivated = !state.readMoreActivated">
          {{ readMoreText }}
        </button>
      </p>

      <div class="
          flex
          items-center
          leading-none
          max-w-max
          py-2
          px-3
          rounded-lg
          bg-[#050f18]
          text-[#ffad49]
        ">
        <img class="w-4 md:w-3" src="@/assets/svg/star.svg" alt="rating" />
        <span class="pl-1 md:text-base">
          {{ rating }}
        </span>
      </div>
      <div class="mt-5 grid grid-cols-2">
        <template v-for="(characteristic, i) in characteristics" :key="i">
          <div class="pb-3" v-if="characteristic.description">
            <div class="font-normal text-[#a0a0a0] md:text-base">
              {{ characteristic.title }}:
            </div>
            <div class="capitalize text-lg md:text-base">
              {{ characteristic.description }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <SkeletonActorDetails v-else />

  <AppTitle :title="`${$t('actor.otherFilms')} ${state.person.name}`" />

  <div class="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xxs:grid-cols-2 gap-3">
    <template v-if="state.movies.length">
      <MovieCard v-for="movie in state.movies" :key="movie.id" :movie="movie" />
    </template>
    <SkeletonMovieCard :quantity="20" v-else />
  </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/MovieStore";
import { IMAGE_URL } from "@/shared/constant";
import MovieCard from "@/components/MovieCard.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SkeletonMovieCard from "@/components/skeletonCards/MovieCardSkeleton.vue";
import SkeletonActorDetails from "@/components/skeletonCards/ActorDetailsSkeleton.vue";
import AppTitle from "@/components/AppTitle.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})

const movieStore = useMovieStore();
const route = useRoute();

const state = reactive({
  person: {},
  movies: {},
  readMoreActivated: false,
  lang: ''
});

const langDB = computed(() => {
  return state.lang = t("lang")
})

const skeleton = computed(() => {
  return Object.keys(state.person).length;
});
const profileImage = computed(() => {
  return state.person.profile_path
    ? `${IMAGE_URL.w500}${state.person.profile_path}`
    : `../../src/assets/img/no-pic.png`;
});
const readMoreText = computed(() => {
  return state.readMoreActivated ? t("read.hide") : t("read.more");
});
const isReadMoreShown = computed(() => {
  return state.person && state.person.biography.length >= 480;
});

const biography = computed(() => {
  return state.person &&
    state.person.biography.length >= 480 &&
    !state.readMoreActivated
    ? `${state.person.biography?.slice(0, 480)}...`
    : state.person.biography;
});

const age = computed(() => {
  return state.person.birthday !== null
    ? new Date().getFullYear() - +state.person.birthday?.slice(0, 4)
    : "";
});

const rating = computed(() => {
  return state.person.popularity.toFixed(1) || 0;
});

const characteristics = computed(() => {
  return [
    {
      title: "Age",
      description: age.value,
    },
    {
      title: "Birthday",
      description: state.person.birthday,
    },
    {
      title: "Place of birth",
      description: state.person.place_of_birth,
    },
  ];
});

async function fetchPerson() {
  const data = await movieStore.getActor(route.params.id);
  state.person = data || {};
};

async function fetchMovies() {
  const data = await movieStore.getActor(route.params.id, "/combined_credits");
  state.movies = data.cast || {};
};

fetchPerson();
fetchMovies();

watch(
  () => langDB,
  (value) => {
    if (value) {
      fetchPerson();
      fetchMovies();
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>

</style>