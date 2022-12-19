<template>
  <div class="person">
    <Breadcrumbs :type="route.params.type" :title="person.name" />
    <div class="person__content">
      <img v-if="person.profile_path"
        :src="`${IMAGE_URL.w500}${person.profile_path}`"
        :alt="person.name"
        class="person__img"
      />
      <div class="person__info">
        <h2 class="person__title">
          {{ person.name }}
        </h2>
        <p class="person__biography">{{ person.biography }}</p>
        <div class="person__rating">
          <img src="/public/svg/star.svg" alt="rating" />
          <span class="person__rating--count">
            {{ rating }}
          </span>
        </div>
        <div class="person__characters--list">
          <template v-for="(characteristic, i) in characteristics" :key="i">
            <div
              class="person__characters--item"
              v-if="characteristic.description"
            >
              <div class="person__characters--title">
                {{characteristic.title}}:
              </div>
              <div class="person__characters--description">
                {{characteristic.description}}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="movie-content">
    <template v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </template>
  </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/MovieStore";
import MovieCard from "../components/MovieCard.vue";
import { IMAGE_URL } from "../constant";

import Breadcrumbs from "../UI/Breadcrumbs.vue";

const movieStore = useMovieStore();
const route = useRoute();

const person = ref({});
const movies = ref({});

const age = computed(() => {
  return (
    person.value &&
    new Date().getFullYear() - + person.value.birthday?.slice(0, 4)
  );
});

const rating = computed(() => {
  return person.value.popularity?.toFixed(1) || 0
})


const characteristics = computed(() => {
  return [
    {
      title: "Age",
      description: age,
    },
    {
      title: "Birthday",
      description: person.value.birthday,
    },
    {
      title: "Place of birth",
      description: person.value?.place_of_birth,
    },
  ];
});

(async function fetchPerson() {
  const data = await movieStore.getActor(route.params.id,);
  person.value = data;
})();

(async function fetchMovies() {
  const data = await movieStore.getActor(route.params.id, '/combined_credits');
  movies.value = data.cast;
})();

</script>

<style lang="scss" scoped>
.person {
  &__content {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 60px;
    grid-row-gap: 40px;
    padding: 60px 0;
    text-shadow: var(--text-shadow);
  }

  &__img {
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0);
    border-radius: 10px;
    width: 100%;
  }

  &__title {
    padding-bottom: 30px;
  }

  &__biography {
    font-size: 24px;
    color: rgb(142 149 169);
    padding-bottom: 30px;
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
</style>