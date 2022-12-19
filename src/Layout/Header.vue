<template>
  <header class="header">
    <router-link to="/" class="header-logo">
      <img src="/public/svg/logo.svg" alt="" srcset="" />
      {{ title }}
    </router-link>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "MovieApp",
  },
});
</script>

<style lang="scss" scoped>
.header{ 
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    &-logo {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 24px;
        & img {
          width: 70px;
        }
    }
}
</style>
