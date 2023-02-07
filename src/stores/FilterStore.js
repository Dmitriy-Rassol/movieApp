import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    activeTab: 0,
    active: false,
    currentCategory: "all",
    page: 1,
    totalPage: 0,
    searchQuery: "",
    notFound: false,
    isBookmark: false,
    isWatched: false,
  }),

  actions: {
    setActiveTab(id, type) {
      this.activeTab = id;
      this.currentCategory = type;
      this.active = false;
    },

    setSearchQuery(search) {
      this.searchQuery = search;
    },

    increasePage() {
      this.page += 1;
    },
    decreasePage() {
      this.page -= 1;
    },

    setPage(page) {
      this.page = page;
    },

    setTotalPages(total) {
      this.totalPage = total;
    },
  },
});
