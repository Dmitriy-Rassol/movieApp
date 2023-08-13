# Для корректной работы и подключения к базе требуется VPN

# [MovieDB-vue3](https://movie-9107a.web.app/)

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


## install project 

```
npm init
```

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
- [Pinia](https://pinia.esm.dev) - Intuitive, type safe, light and flexible Store for Vue using the composition api
- [Vue i18n](https://vue-i18n.intlify.dev/)
- [Swiper](https://swiperjs.com/)
- [nprogress](https://vuepress.vuejs.org/plugin/official/plugin-nprogress.html)

### Style 

- [Tailwind](https://tailwindcss.com/docs/guides/vite)


### To work with the application, create a project in Firebase and an account on The Movie Database
 
firebaseConfig.js
```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

config.js
The movie database api
```
  KEY : "?api_key=",  
  baseURL :"https://api.themoviedb.org/3",
  firebaseDB: "",  // FIREBASE realtime database url
```

