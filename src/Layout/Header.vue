<template>
  <header class="flex py-10 ml-28 md:ml-0 justify-between items-center">
    <router-link to="/" class="flex items-center font-bold text-2xl">
      <img class="w-16" src="@/assets/svg/logo.svg" alt="" srcset="" />
      <h1 class="xs:text-xl ">{{ title }}</h1>
    </router-link>
    <nav class="font-bold text-xl flex" v-if="userStore.userData">
      <router-link to="/user" class="flex mr-4 items-center">
        <img class="w-14 h-14 xs:w-11 xs:h-11 border-2 m-2 rounded-full object-cover" :src="photoUser" alt="profile" />
        <p class="xs:text-base xxs:hidden">{{ getUserName }}</p>
      </router-link>
      <button class="mr-4 hover:text-orange-400 transition duration-200 ease-in-out xxs:hidden"
        @click="userStore.logoutUser" v-if="userStore.userData">
        <img src="@/assets/svg/logout.svg" class="w-5" alt="logout" />
      </button>
    </nav>
  </header>
</template>

<script setup>

import { computed, onMounted, ref } from "vue";
import skeletonProfile from "@/assets/img/avatar.png"
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const userPhoto = ref(null);
const userName = ref(null);
const props = defineProps({
  title: {
    type: String,
    default: "MovieApp",
  }
});

onMounted(async () => {
  getUserName; 
  userStore.getProfileImage()
})

const getUserName = computed(() => {
  return userName.value = userStore.userData.displayName;
})

const photoUser = computed(() => {
 return userStore.userPhoto !== null ? userPhoto.value = userStore.userPhoto : skeletonProfile;    
})

</script>

<style lang="scss" scoped>

</style>
