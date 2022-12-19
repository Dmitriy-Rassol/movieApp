import { defineStore } from "pinia";
import { baseURL, KEY } from "../api";
import { MEDIA_TYPES } from "../constant";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    movies: [],
    activeTab: 0,
    type: "all",
    page: 1,
    totalPage: 0,
    searchQuery: "",
  }),
  actions: {
    async fetchCollection() {
      const searchType = this.type === "all" ? "multi" : this.type;
      const url = this.searchQuery
        ? `/search/${searchType}${KEY}&query=${this.searchQuery}&page=${this.page}`
        : `/trending/${this.type}/day${KEY}&page=${this.page}`;
      const res = await fetch(`${baseURL}${url}`);
      const data = await res.json();
      this.totalPage = data.total_pages;
      console.log(typeof this.page);
      this.movies = data.results.map((el) =>
          Object.assign(
            el,
            this.type !== "multi" && this.type !== "all"
              ? { media_type: this.type }
              : ""
          )
        );
        console.log(this.movies);
      return this.movies;
    },

    async getDetails(type, id) {
      const res = await fetch(`${baseURL}/${type}/${id}${KEY}&append_to_response=videos`);
      const data = await res.json();
      return data;
    },

    async getContent(type, id, collection) {
      const res = await fetch(`${baseURL}/${type}/${id}/${collection}${KEY}`);
      const data = await res.json();
      return data.results || data.cast;
    },

    async getActor( id, credits) {
      const res = await fetch(`${baseURL}/person/${id}${credits}${KEY}`);
      const data = await res.json();
      return data;
    },

    setActiveTab(id, type) {
      this.activeTab = id;
      this.type = type;
      this.fetchCollection();
    },

    setSearchQuery(search) {
      this.searchQuery = search;
    },

    increasePage() {
      this.page += 1
    },
    decreasePage() {
      this.page -= 1
    },

    setPage(page) {
      this.page = page
    },
  },
});
