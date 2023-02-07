<template>
  <div class="mb-14">
    <Breadcrumbs :type="type" :title="title" />
    <div
      v-if="skeleton"
      class="
        relative
        [text-shadow:_1px_1px_4px_rgba(0,0,0,0.69)]
        grid grid-cols-info
        lg:grid-cols-1
        gap-x-10
        p-14
        md:px-10
        md:py-10
        xxs:px-4
        bg-no-repeat bg-cover bg-center bg-zinc-900
        shadow-3xl
        rounded-2xl
        before:content-['']
        before:absolute
        before:w-full
        before:h-full
        before:bg-[#0f0f0f93]
        before:z-1
        before:rounded-2xl
      "
      :style="{
        backgroundImage: `url(${IMAGE_URL.original}${state.details.backdrop_path})`,
      }"
    >
      <div class="mx-auto">
        <div class="relative mb-6">
          <img
            v-if="state.details.poster_path"
            :src="
              state.details.poster_path ? poster : `@/assets/img/no-pic.png`
            "
            :alt="title"
            class="shadow-4xl rounded-lg lg:h-2/3"
          />
          <button
            v-if="videos.length"
            class="
              absolute
              bg-orange-700
              flex
              items-center
              leading-none
              p-2
              rounded-md
              bottom-2
              left-2
              transition
              duration-200
              ease-in-out
              hover:bg-orange-600
            "
            @click="isOpen = true"
          >
            {{ $t("trailer") }} <img class="pl-1 w-5" src="@/assets/svg/play.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="relative">
        <h2 class="text-3xl font-extrabold md:text-2xl xs:text-xl">
          {{ title }}
        </h2>
        <p class="my-5 text-2xl font-bold md:text-xl xs:text-lg  md:my-2" v-if="tagline">{{ tagline }}</p>
        <p class="my-5 text-2xl  md:text-xl xs:text-lg md:my-2">{{ state.details.overview }}</p>
        <div
          class="
            flex
            items-center
            leading-none
            max-w-max
            py-2
            px-3
            rounded-lg
            bg-[#050f18]
            text-[#ffad49]
          "
        >
          <img class="w-4 md:w-3" src="@/assets/svg/star.svg" alt="rating" />
          <span class="pl-1 md:text-base">{{ rating }}</span>
        </div>
        <div class="mt-5 grid grid-cols-2 ">
          <template v-for="(characteristic, i) in characteristics" :key="i">
            <div class="pb-3" v-if="characteristic.description">
              <div class="font-normal text-[#a0a0a0] md:text-base">
                {{ $t(characteristic.title) }}:
              </div>
              <div class="capitalize md:text-base ">
                {{ characteristic.description }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <SkeletonMovieDetails v-else />
    <transition name="bounce" mode="out-in" to="body" v-show="isOpen">
      <div
        class="fixed z-50 top-0 left-0 w-full h-screen bg-opacity-80 bg-black"
        @click="isOpen = false"
      >
        <button
          class="absolute top-6 right-6 cursor-pointer z-10"
          @click="isOpen = false"
        >
          <svg
          class="transition duration-200 ease-in-out hover:fill-orange-400"
            fill="#ffffff"
            height="34px"
            width="34px"
            version="1.1"
            id="XMLID_314_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_iconCarrier">
              <g id="close">
                <g>
                  <polygon
                    points="20.3,21.7 12,13.4 3.7,21.7 2.3,20.3 10.6,12 2.3,3.7 3.7,2.3 12,10.6 20.3,2.3 21.7,3.7 13.4,12 21.7,20.3 "
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
        <YouTubeVideo
          v-if="isOpen"
          class="relative rounded-lg"
          :videos="state.details.videos"
          :title="state.details.title || state.details.name"
        />
      </div>
    </transition>
    <div v-if="state.actors.length !== 0 ">
      <AppTitle v-if="state.actors.length" :title="$t('movie.actors')" />
    <SkeletonAppTitle v-else />

    <swiper
      :slidesPerView="2.5"
      :breakpoints="{720 :{slidesPerView: 4.5}, 500: {slidesPerView: 3.5}}"
      :spaceBetween="20"
      :freeMode="true"
      :modules="modules"
      v-if="state.actors.length"
    >
      <template v-for="actor in state.actors" :key="actor.id">
        <swiper-slide>
          <ActorCard class="swiper-slide" :actor="actor" />
        </swiper-slide>
      </template>
    </swiper>
    <template v-else>
      <div class="overflow-hidden">
        <div class="flex gap-5 w-[110%]">
          <SkeletonActorCard :quantity="5" />
        </div>
      </div>
    </template>
    </div>

    <AppTitle
      v-if="state.similar.length"
      :title="`${typeShow}` "
    />
    <SkeletonAppTitle v-else />

    <div class="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xxs:grid-cols-2 gap-3">
      <template v-if="state.similar.length">
        <MovieCard
          v-for="movie in state.similar"
          :key="movie.id"
          :movie="movie"
        />
      </template>
        <SkeletonMovieCard :quantity="20" v-else/>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/MovieStore";

import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import {useI18n} from 'vue-i18n';

import { IMAGE_URL } from "@/shared/constant";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import MovieCard from "@/components/MovieCard.vue";
import ActorCard from "@/components/ActorCard.vue";
import YouTubeVideo from "@/components/YouTubeVideo.vue";
import AppTitle from "@/components/AppTitle.vue";
import SkeletonMovieDetails from "@/components/skeletonCards/MovieDetailsSkeleton.vue";
import SkeletonActorCard from "@/components/skeletonCards/ActorCardSkeleton.vue";
import SkeletonMovieCard from "@/components/skeletonCards/MovieCardSkeleton.vue";
import SkeletonAppTitle from "@/components/skeletonCards/AppTitleSkeleton.vue";


const {t} = useI18n({
  inheritLocale: true,
  useScope: 'global'})

const modules = [FreeMode, Scrollbar, Mousewheel];
const movieStore = useMovieStore();
const route = useRoute();
const isOpen = ref(false);
const state = reactive({
  details: {},
  similar: {},
  actors: {},
  lang: ''
});

const langDB = computed (()=> {
  return state.lang = t("lang")
})

const skeleton = computed(() => {
  return Object.keys(state.details).length;
});

const videos = computed(() => {
  return state.details.videos.results;
});

const title = computed(() => {
  return state.details.title || state.details.name;
});

const rating = computed(() => {
  return state.details.vote_average.toFixed(1) || 0;
});
const genres = computed(() => {
  const data =
    state.details.genres
      .map((el) => {
        return el.name;
      })
      .join(", ") || "";
  return data;
});
const type = computed(() => {
  return route.params.type === 'tv' ? t("type.tv") : t("type.movie") || state.details.media_type;
});

const status = computed(()=> {
  return state.details.status === "Post Production" ? t("characteristics.released.no") : t("characteristics.released.yes")
});

const typeShow = computed(() => {
  return route.params.type === 'tv' ? t("similar.tv") : t("similar.movies")
})

const poster = computed(() => {
  return `${IMAGE_URL.w500}${state.details.poster_path}`;
});

const tagline = computed(() => {
  return state.details.tagline || null;
});
const runtime = computed(() => {
  return state.details.runtime ? `${state.details.runtime} ${t('characteristics.min')}` : null;
});
const isInProduction = computed(() => {
  return state.details.in_production ? t("characteristics.yes") : t("characteristics.no");
});



const characteristics = computed(() => {
  return [
    {
      title: "characteristics.type",
      description: type.value,
    },
    {
      title: "characteristics.runtime",
      description: runtime.value || null,
    },
    {
      title: "characteristics.status",
      description: status.value || null,
    },
    {
      title: "characteristics.releaseDate",
      description: state.details.release_date || null,
    },
    {
      title: "characteristics.episodes",
      description: state.details.number_of_episodes || null,
    },
    {
      title: "characteristics.firstDate",
      description: state.details.first_air_date || null,
    },
    {
      title: "characteristics.lastDate",
      description: state.details.last_air_date || null,
    },
    {
      title: "characteristics.seasons",
      description: state.details.number_of_seasons || null,
    },
    {
      title: "characteristics.production",
      description: isInProduction.value,
    },
    {
      title: "characteristics.genres",
      description: genres.value || null,
    },
  ];
});
async function fetchDetails() {
  localStorage.getItem('langDB')
  const data = await movieStore.getDetails(route.params.type, route.params.id);
  state.details = data || {};
}
async function fetchContent() {
  const credits = await movieStore.getContent(
    route.params.type,
    route.params.id,
    "credits"
  );
  const movie = await movieStore.getContent(
    route.params.type,
    route.params.id,
    "similar"
  );

  state.actors = credits || {};
  state.similar = movie.map((el) =>
    Object.assign(el, { media_type: route.params.type })
  );
}
watch(
  () => route.params.id,
  () => {
    if (route.params.type && route.params.id) {
      fetchDetails();
      fetchContent();
    }
  },
  { immediate: true }
);

watch(
  () => langDB,
  (value) => {
    if (value) {
      fetchDetails();
      fetchContent();
    }
  },
  {deep: true}
);
</script>

<style lang="scss" scoped>
</style>