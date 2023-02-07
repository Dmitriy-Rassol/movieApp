<template>
  <div class="overflow-hidden relative rounded-xl z-0">
    <div class="absolute top-2 right-2 flex">
      <div
        class="
          flex
          items-center
          uppercase
          bg-[#050f18]
          hover:bg-[#252525]
          text-[#ffad49]
          rounded-md
          text-sm
          mr-1
          z-10
        "
      >
        <button @click="toggleActiveWatched(movie.watched)">
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            stroke-width="0.00016"
            :class="[
              'w-6 h-6 p-1 stroke-white',
              { 'fill-orange-400': movie.watched },
            ]"
          >
            <g fill-rule="evenodd" clip-rule="evenodd">
              <path
                d="M8 5a3 3 0 100 6 3 3 0 000-6zM6.5 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
              />
              <path
                d="M8 2C5.422 2 3.43 3.32 2.112 4.65A10.948 10.948 0 00.596 6.564c-.173.28-.31.536-.407.75a3 3 0 00-.122.31C.04 7.705 0 7.846 0 8s.041.296.067.375a3 3 0 00.122.31c.097.215.234.471.407.751.346.56.854 1.246 1.516 1.914C3.43 12.68 5.422 14 8 14s4.57-1.32 5.888-2.65a10.952 10.952 0 001.516-1.914c.173-.28.31-.536.407-.75.048-.107.09-.212.122-.31.026-.08.067-.221.067-.376s-.041-.296-.067-.375a2.978 2.978 0 00-.122-.31 6.777 6.777 0 00-.407-.751 10.952 10.952 0 00-1.516-1.914C12.57 3.32 10.578 2 8 2zM1.556 7.933a2.314 2.314 0 00-.03.067l.03.067c.065.145.17.344.316.58a9.45 9.45 0 001.306 1.647C4.332 11.458 5.964 12.5 8 12.5s3.668-1.042 4.822-2.206a9.45 9.45 0 001.306-1.646A5.336 5.336 0 0014.473 8a5.335 5.335 0 00-.346-.648 9.452 9.452 0 00-1.305-1.646C11.668 4.542 10.036 3.5 8 3.5S4.332 4.542 3.178 5.706a9.45 9.45 0 00-1.306 1.646 5.316 5.316 0 00-.316.58z"
              />
            </g>
          </svg>
        </button>
      </div>
      <div
        class="
          flex
          items-center
          uppercase
          bg-[#050f18]
          hover:bg-[#252525]
          text-[#ffad49]
          rounded-md
          text-sm
          z-10
        "
      >
        <button @click="toggleActiveBookmark(movie.bookmark)">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              'w-6 h-6 p-1 stroke-white',
              { 'stroke-orange-400 fill-orange-400': movie.bookmark },
            ]"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M5 6C5 4.34315 6.34315 3 8 3H16C17.6569 3 19 4.34315 19 6V20.0568C19 20.8702 18.0806 21.3433 17.4188 20.8705L12.5812 17.4152C12.2335 17.1668 11.7665 17.1668 11.4188 17.4152L6.58124 20.8705C5.91937 21.3433 5 20.8702 5 20.0568V6Z"
                stroke-width="2"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
    <router-link
      :to="{
        name: 'MovieView',
        params: { type: movie.media_type, id: movie.id },
      }"
    >
      <div class="absolute top-2 left-2 flex">
        <div
          class="
            flex
            items-center
            uppercase
            p-1
            bg-[#050f18]
            text-[#ffad49]
            rounded-md
            text-sm
            z-10  
          "
        >
          <img class="block pr-1 w-4" src="@/assets/svg/star.svg" alt="star" />
          <span class="leading-none text-base">{{ rating }}</span>
        </div>
      </div>
      <div
        class="
          relative
          rounded-lg
          transition
          duration-200
          ease-in-out 
          hover:scale-105 hover:z-5
        "
      >
        <img
          class="object-cover scale-105 max-w-full"
          :src="image"
          :alt="title"
        />
        <p class="text-lg p-4 absolute bottom-0" v-if="!movie.poster_path">
          {{ title }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { IMAGE_URL } from "@/shared/constant";
import { useMovieStore } from "@/stores/MovieStore";
import { useUserStore } from "@/stores/UserStore";
import { getDatabase, ref, set, remove} from "firebase/database";
import noPoster from "@/assets/img/no-pic.png";

const movieStore = useMovieStore();
const userStore = useUserStore();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: "",
  },
});

const title = computed(() => {
  return props.movie.title || props.movie.name;
});

const rating = computed(() => {
  return props.movie.vote_average?.toFixed(1) || 0;
});

const image = computed(() => {
  return props.movie.poster_path !== null
    ? `${IMAGE_URL.w500}${props.movie.poster_path}`
    : noPoster;
});

async function setFavoritesMovies(movie) {
  const database = getDatabase();
  const found = await movieStore.moviesFilter.find(
    (element) => element.id === movie.id
  );
  if (!movie.watched && !movie.bookmark) {
    remove(
      ref(
        database, `/users/${userStore.userData.uid}/movies/favorites/${movie.id}`
      ),
      {
        ...movie,
      }
    );
  } else {
    set(
      ref(
        database, `/users/${userStore.userData.uid}/movies/favorites/${movie.id}`
      ),
      {
        ...movie,
      }
    );
  }

  if (!movieStore.moviesFilter.length || !found) {
    movieStore.moviesFilter.unshift(movie);
  }

}

function toggleActiveWatched(watched) {
  watched = !watched;
  props.movie.watched = watched;
  setFavoritesMovies(props.movie);
}

function toggleActiveBookmark(bookmark) {
  bookmark = !bookmark;
  props.movie.bookmark = bookmark;
  setFavoritesMovies(props.movie);
}
</script>

<style lang="scss" scoped>
</style>