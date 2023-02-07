
<template>
  <div class=" relative grid grid-cols-1 grid-rows-auth max-w-lg">
    <KeepAlive :max="10">
      <transition name="fade" mode="out-in">
      <component :is="activeComponent"> </component>
    </transition>
    </KeepAlive>
    <div class="bottom-0 absolute">
      <button
        :class="['mr-4 hover:text-orange-400 transition duration-200 ease-in-out xs:text-base', {'text-orange-400': current === i }]"
        v-for="(tab, i) in tabs" :key="tab" @click="nameComponent = tab.component, current = i">
        {{ $t(tab.page) }}
      </button>
    </div>
  </div>
</template>
  
<script>
import Registration from "@/components/authComponents/Registration.vue";
import Login from "@/components/authComponents/Login.vue";
import { computed } from "vue";
import { AUTH_TABS } from "@/shared/constant";

export default {
  data() {
    return {
      nameComponent: "Login",
      tabs: AUTH_TABS,
      current: 0
    };
  },
  computed: {
    activeComponent() {
      return this.nameComponent;
    }
  },
  components: {
    Login,
    Registration,
  },
};
</script>