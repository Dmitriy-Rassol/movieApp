<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__info">
      <template v-if="type !== 'actor'">
        <router-link to="/" class="breadcrumbs__home"> home </router-link>
        <span class="breadcrumbs__slash"> / </span>
        <p class="breadcrumbs__type">{{ type }}</p>
      </template>
      <template v-else>
        <button class="breadcrumbs__back" @click="$router.back()">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="breadcrumbs__back-img"
          >
            <path
              d="M9.57617 18.0695L3.50617 11.9995L9.57617 5.92946"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.5059 11.9995L3.67586 11.9995"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Back
        </button>
      </template>
    </div>
    <h2 class="breadcrumbs__title">{{ title }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
  title: String,
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  position: relative;
  background: #20283ecc;
  margin-bottom: 30px;
  max-width: 50%;
  padding: 20px 40px;
  border-radius: 20px;
  text-shadow: var(--text-shadow);
  z-index: 1;

  &__info {
    display: flex;
    margin: 5px 0;
    font-size: 20px;
  }
  &__home {
    text-transform: capitalize;
    color: rgb(255, 255, 255);
    transition: .2s;
    &:hover {
      color: var(--breadcrumbs-color);
    }
  }

  &__slash {
    padding: 0 10px;
  }

  &__type {
    text-transform: capitalize;
    color: var(--breadcrumbs-color);
  }

  &__back {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: 500;
    color: var(--color);
    font-weight: 600;

    transition: 0.2s;
    cursor: pointer;
    &:hover {
      color: var(--breadcrumbs-color);
      & .breadcrumbs__back-img path {
        stroke: var(--breadcrumbs-color);
      }
    }

    &-img {
      width: max-content;
      padding-right: 10px;
      path {
        stroke: #fff;
        transition: 0.2s;
      }
    }
  }
}
</style>