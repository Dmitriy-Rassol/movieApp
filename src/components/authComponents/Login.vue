<template>
  <div>
    <AppTitle :title="$t('auth.titleLogin')" />
    <form class="grid gap-4" @submit.prevent="handleLoginSubmit">
      <div class="relative input-before">
        <img class="absolute w-7 h-7 md:w-6 left-3 top-1/2 -translate-y-2/4 z-10" src="@/assets/svg/email.svg"
          alt="email" />
        <input class="
            outline-none
            pl-12
            placeholder-gray
            w-full
            py-3
            rounded-lg
            xxs:placeholder:text-lg
            xxs:py-1
            text-gray
          " type="email" placeholder="Email" v-model.trim="email" />
      </div>
      <div class="relative input-before">
        <img class="absolute w-11 md:w-8 md:left-2  h-10 left-1 top-1/2 -translate-y-2/4"
          src="@/assets/svg/password.svg" alt="password" />
        <input class="
            outline-none
            pl-12
            placeholder-gray
            w-full
            py-3
            xxs:placeholder:text-lg
            xxs:py-1
            rounded-lg
            text-gray
          " type="password" :placeholder="$t('auth.placeholders.password')" v-model.trim="password" />
      </div>


      <button class="
          bg-orange-500
          max-w-max
          px-2
          py-1
          rounded-lg
          hover:bg-orange-600
          transition
          duration-200
          ease-in-out
          xs:text-base
        " type="submit" :disabled="load">
        {{ $t("auth.buttons.signin") }}
      </button>
    </form>
  </div>
</template>

<script setup>
import AppTitle from "@/components/AppTitle.vue";
import { useUserStore } from "@/stores/UserStore";
import { ref } from "vue";

const userStore = useUserStore();
const email = ref("");
const password = ref("");
const load = ref(false);

const handleLoginSubmit = async () => {
  load.value = true
  await userStore.loginUser(email.value, password.value);
  load.value = false;
  if (!email.value || !password.value) {
    switch (userStore.errCode) {
      case "auth/email-already-exists":
        userStore.errMsg = 'error.existEmail';
        break;
      case "auth/wrong-password":
        userStore.errMsg = 'error.incorrectPass';
        break;
      case "auth/invalid-email":
        userStore.errMsg = 'error.invalidEmail';
        break;
      default:
        userStore.errMsg = 'error.incorrect';
        break;
    }
  }

};

</script>

<style scoped>

</style>