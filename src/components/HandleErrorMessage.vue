<template>
  <transition name="error" mode="in-out">
    <div v-if="active"
      class="absolute top-0 right-0 translate-y-5 py-2 pl-2 pr-6 
      bg-orange-500 rounded-l-md bg-opacity-75">
      <p>{{ $t(userStore.errMsg) }}</p>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();

const active = ref(false);

function isActive() {
  active.value = true;
  setTimeout(() => {
    active.value = false;
    userStore.errMsg = ''
  }, 5000);
}

watch(
  () => userStore.errMsg,
  (value) => {
    if (value) {
      isActive();
    }
  }
);

</script>
<style scoped>

</style>