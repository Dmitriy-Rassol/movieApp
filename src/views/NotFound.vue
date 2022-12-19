<template>
    <div class="">
      <picture>
        <source
          srcset="/public/img/not-found.webp"
          type="image/webp"
        >
        <img
          alt="Not Found"
          class=""
          height="320"
          src="/public/img/not-found.png"
          width="400"
        >
      </picture>
  
      <h2 class="">
        Lost your way?
      </h2>
      <p class="">
        Oops! This is awkward. You are looking for something that doesn't actually
        exist.
      </p>
  
      <button @click="$router.push({ name: 'Home' })">
        Go Home
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>