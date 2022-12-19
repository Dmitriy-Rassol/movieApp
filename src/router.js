import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import MovieView from "./views/MovieView.vue"
import ActorView from "./views/ActorView.vue"
import NotFound from "./views/NotFound.vue"
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/view/:type/:id",
      name: "MovieView",
      component: MovieView,
    },
    {
      path: "/view/actor/:id",
      name: "ActorView",
      component: ActorView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
  })
  
  router.afterEach(() => {
    NProgress.done()
  })

export default router;
