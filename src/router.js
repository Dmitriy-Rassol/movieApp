import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { start, done } from "nprogress";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/view/:type/:id",
      name: "MovieView",
      component: () => import("@/views/MovieView.vue"),
    },
    {
      path: "/view/actor/:id",
      name: "ActorView",
      component: () => import("@/views/ActorView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/watched",
      name: "Watched",
      component: () => import("@/views/Watched.vue"),
    },
    {
      path: "/user",
      name: "User",
      component: () => import("@/views/User.vue"),
    },
    {
      path: "/bookmark",
      name: "Bookmark",
      component: () => import("@/views/Bookmark.vue"),
    },
    {
      path: "/auth",
      name: "Auth",
      component: () => import("@/views/Auth.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const currentUser = await userStore.currentUser();
  
  if (to.path !== from.path) start();
  if (to.name !== "Auth" && !currentUser) {
    return { name: "Auth" };
  } else if (to.name === "Auth" && currentUser) {
    return { name: "Home" };
  }
});

router.afterEach(() => {
  done();
});

export default router;
