<template>
  <div class="movie-details">
    <Breadcrumbs :type="type" :title="title"/>
    <div
      v-show="details.backdrop_path"
      class="movie-details__content"
      :style="{
        backgroundImage: `url(${IMAGE_URL.original}${details.backdrop_path})`,
      }"
    >
      <img
        v-if="details.poster_path"
        :src="
          details.poster_path
            ? `${IMAGE_URL.w500}${details.poster_path}`
            : `/public/img/no-pic.png`
        "
        :alt="title"
        class="movie-details__img"
      />
      <div class="movie-details__info">
        <h2 class="movie-details__title">
          {{ title }}
        </h2>
        <p class="movie-details__tagline" v-if="tagline">{{ tagline }}</p>
        <p class="movie-details__overview">{{ details.overview }}</p>
        <div class="movie-details__rating">
          <img src="/public/svg/star.svg" alt="rating">
          <span class="movie-details__rating--count">{{rating}}</span>
        </div>
        <div class="movie-details__characters--list">
          <template v-for="(characteristic, i) in characteristics" :key="i">
            <div
              class="movie-details__characters--item"
              v-if="characteristic.description"
            >
              <div class="movie-details__characters--title">
                {{ characteristic.title }}:
              </div>
              <div class="movie-details__characters--description">
                {{ characteristic.description }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <YouTubeVideo :videos="details.videos" :title="details.title || details.name" />
    </div>
    <AppTitle v-if="actors.length" title="Actors" />
    <swiper
      :slidesPerView="6"
      :spaceBetween="20"
      :freeMode="true"
      :scrollbar="{ draggable: true }"
      :mousewheel="true"
      :modules="modules"
      class="actor-content scroll-active"
    >
      <template v-for="actor in actors" :key="actor.id">
        <swiper-slide v-if="actor.profile_path">
          <ActorCard class="swiper-slide" :actor="actor" />
        </swiper-slide>
      </template>
    </swiper>
    <AppTitle  v-if="similar.length" :title="`Similar ${route.params.type}`" />
    <div class="movie-content">
      <template v-for="movie in similar" :key="movie.id">
        <MovieCard :movie="movie" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/MovieStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import { IMAGE_URL } from "../constant";

import Breadcrumbs from "../UI/Breadcrumbs.vue";
import MovieCard from "../components/MovieCard.vue";
import ActorCard from "../components/ActorCard.vue";
import YouTubeVideo from "../components/YouTubeVideo.vue";
import AppTitle from "../UI/AppTitle.vue";

const modules = [FreeMode, Scrollbar, Mousewheel];
const movieStore = useMovieStore();
const route = useRoute();

const details = ref({});
const similar = ref({});
const actors = ref({});

const title = computed(() => {
  return details.value?.title || details.value?.name;
});

const rating = computed(() => {
  return details.value.vote_average?.toFixed(1) || 0
})

const genres = computed(() => {
  const data =
    details.value.genres
      ?.map((el) => {
        return el.name;
      })
      .join(", ") || "";
  return data;
});

const type = computed(() => {
  return route.params.type || details.value?.media_type;
});

const tagline = computed(() => {
  return details.value?.tagline || null;
});

const runtime = computed(() => {
  return details.value?.runtime ? `${details.value?.runtime} min` : null;
});

const isInProduction = computed(() => {
  return details.value?.in_production ? "Yes" : "No";
});

const characteristics = computed(() => {
  return [
    {
      title: "Type",
      description: type.value,
    },
    {
      title: "Runtime",
      description: runtime.value || null,
    },
    {
      title: "Status",
      description: details.value?.status || null,
    },
    {
      title: "Release Date",
      description: details.value?.release_date || null,
    },
    {
      title: "Episodes",
      description: details.value?.number_of_episodes || null,
    },
    {
      title: "First Air Date",
      description: details.value?.first_air_date || null,
    },
    {
      title: "Last Air Date",
      description: details.value?.last_air_date || null,
    },
    {
      title: "Seasons",
      description: details.value?.number_of_seasons || null,
    },
    {
      title: "In Production",
      description: isInProduction.value,
    },
    {
      title: "Genres",
      description: genres.value || null,
    },
  ];
});

async function fetchDetails() {
  const data = await movieStore.getDetails(route.params.type, route.params.id);
  details.value = data;
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

  actors.value = credits;
  similar.value = movie.map((el) =>
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
</script>

<style lang="scss" scoped>
.movie-details {
  margin: 60px 0;

  &__content {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 40px;
    padding: 60px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
    text-shadow: var(--text-shadow);
    z-index: 0;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(0, 0, 0, 0.6);
      box-shadow: 0px 0px 100px 1px rgb(0, 0, 0);
      border-radius: 20px;
    }
  }
  &__img {
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0);
    border-radius: 10px;
    grid-area: 1 / 1 / 2 / 2;
  }

  &__info {
    grid-area: 1 / 2 / 2 / 3;
    position: relative;
  }

  &__title {
    font-weight: 600;
  }

  &__tagline {
    margin: 20px 0;
    font-size: 24px;
    font-weight: bold;
  }

  &__overview {
    margin: 20px 0;
    font-size: 24px;
    color: rgb(142 149 169);
  }

  &__rating {
    max-width: max-content;
    padding: 5px 15px;
    border-radius: 10px;
    background: rgb(5,15,24);
    &--count {
      padding-left: 5px;
      color: rgb(255, 173, 73);
    }
  }

  &__characters--list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__characters--item {
    padding-bottom: 10px;
  }

  &__characters--title {
    color: rgb(142 149 169);
    font-weight: 600;
  }

  &__characters--description {
    text-transform: capitalize;
    font-size: 24px;
  }
}

.swiper {
  margin-top: 30px;
  &-slide {
    margin-bottom: 10px;
  }
}
.scroll-active {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 50px;
    height: 100%;
    background: rgb(18, 24, 41);
    background: linear-gradient(
      90deg,
      rgba(18, 24, 41, 0) 0%,
      rgba(18, 24, 41, 0.6) 50%,
      rgba(18, 24, 41, 1) 100%
    );
    top: 0;
    right: 0;
    z-index: 2;
  }
}
</style>