import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/style.scss";
import "../node_modules/nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import router from "./router";
import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
