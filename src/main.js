import { createApp } from "vue";
import App from "@/App.vue";
import pinia from "@/stores/store.js";
import {createI18n, useI18n} from "vue-i18n"
import router from "@/router";
import "@/assets/styles/style.css";
import "../node_modules/nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import {languages} from './i18n';
import {defaultLocale} from './i18n';

const localStorageLang = localStorage.getItem('lang')

const messages = Object.assign(languages)
const i18n = createI18n({
  legacy: false,
  locale: localStorageLang || defaultLocale,
  fallbackLocale: 'ru',
  messages
})

const app = createApp(App,{
  setup() {
    const {t} = useI18n()
    return {t}
  }
})

app.use(pinia)
app.use(i18n)
app.use(router)
router.isReady().then(() => {
    app.mount("#app");
  });