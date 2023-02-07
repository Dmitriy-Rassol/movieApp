import { defineStore } from "pinia";
import { HTTP, FIREBASE } from "@/api";
import config from "@/shared/config";
import { useFilterStore } from "./FilterStore";
import { useUserStore } from "./UserStore";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    movies: [],
    moviesFilter: [],
    filterStore: useFilterStore(),
    userStore: useUserStore(),
  }),
  actions: {
    async fetchCollection() {
      this.movies = "";
      this.filterStore.notFound = true;
      const searchType =
        this.filterStore.currentCategory === "all"
          ? "multi"
          : this.filterStore.currentCategory;

      const url = this.filterStore.searchQuery
        ? `/search/${searchType}${config.KEY}&query=${this.filterStore.searchQuery}`
        : `/trending/${this.filterStore.currentCategory}/day${config.KEY}`;

      const page = `&page=${this.filterStore.page}`;
      try {
        const res = await HTTP.get(`${url}${page}`, {
          params: { language: config.langDefault },
        });
        const data = res.data;
        this.filterStore.totalPage = data.total_pages;
        this.movies = data.results.map((el) =>
          Object.assign(
            el,
            this.filterStore.currentCategory !== "multi" &&
              this.filterStore.currentCategory !== "all"
              ? { media_type: this.filterStore.currentCategory }
              : ""
          )
        );
        this.getFavoritesMovies();
        this.filterStore.notFound = false;
      } catch (error) {
        if (error) {
          this.userStore.errMsg = "error.server";
        }
      }
    },

    async getDetails(type, id) {
      try {
        const res = await HTTP.get(`/${type}/${id}${config.KEY}`, {
          params: { language: config.langDefault },
        });
        const data = await res.data;
        return data;
      } catch (error) {
        if (error) {
          this.userStore.errMsg = "error.server";
        }
      }
    },

    async getContent(type, id, collection) {
      try {
        const res = await HTTP.get(
          `/${type}/${id}/${collection}${config.KEY}`,
          { params: { language: config.langDefault } }
        );
        const data = await res.data;
        this.movies = data.results;
        this.getFavoritesMovies();
        return this.movies || data.cast;
      } catch (error) {
        if (error) {
          this.userStore.errMsg = "error.server";
        }
      }
    },

    async getActor(id, credits) {
      try {
        const res = await HTTP.get(`/person/${id}${credits}${config.KEY}`, {
          params: { language: config.langDefault },
        });
        const data = await res.data;
        return data;
      } catch (error) {
        if (error) {
          this.userStore.errMsg = "error.server";
        }
      }
    },

    async getFavoritesMovies() {
      if (!this.userStore.userData) return;
      this.filterStore.notFound = true;
      const firebaseDB = await FIREBASE.get(
        `/users/${this.userStore.userData.uid}/movies/favorites.json`
      );
      const favoritesMovie = await firebaseDB.data;
      this.moviesFilter =
        (await favoritesMovie) !== null ? Object.values(favoritesMovie) : [];

      if (this.movies) {
        this.movies.map((el) => {
          ({
            ...el,
            watched: false,
            bookmark: false,
          });

          this.moviesFilter.map((el1) => {
            el.id === el1.id
              ? ((el.watched = el1.watched), (el.bookmark = el1.bookmark))
              : (el.watched, el.bookmark);
          });
        });
      }
      this.filterStore.notFound = false;
    },
  },
});
