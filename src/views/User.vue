
<template>
  <form class="flex flex-col max-w-sm md:w-full relative overflow-hidden" @submit.prevent="">
    <div class="
        w-48 
        h-48
        xs:w-32
        xs:h-32
        bg-white
        relative
        flex
        justify-center
        border-2 border-zinc-400
        rounded-full
        overflow-hidden
        mb-4
      ">
      <img class="w-full object-cover" :src="previewFilePath" alt="preview" />
      <label class="cursor-pointer absolute w-full h-full" for="file">
        <img class="w-10 xs:w-8 p-[2px] m-auto absolute bottom-0 left-1/2 -translate-x-1/2 rounded-lg mb-1"
          src="@/assets/svg/upload.svg" alt="upload" />
      </label>
      <input class="hidden absolute" @change="uploadFile" type="file" accept="image/*" name="file" id="file" />
    </div>
    <div class="flex relative items-center">
      <label class="text-[#a0a0a0] font-semibold my-2 xs:text-base" for="name">{{ $t('user.name') }}:</label>
      <input class="
          w-full
          bg-transparent
          p-2
          rounded-md
          font-semibold
          text-xl
          fill-text-white
          focus:outline-none
          xs:text-base
          xs:w-2/3
        " type="text" id="name" v-model="reviews.nameProfile" ref="name" />
      <button class="absolute right-2 cursor-auto">
        <img class="w-6 xs:w-4" src="@/assets/svg/edit.svg" alt="edit" />
      </button>
    </div>
    <div class="flex">
      <label class="text-[#a0a0a0] font-semibold my-2 xs:text-base" for="email">Email:</label>
      <input class="bg-transparent p-2 inline-flex rounded-md font-semibold text-xl xs:text-base" type="text" id="email"
        :disabled="true" :value="userStore.userData?.email" />
    </div>
    <div class="flex flex-col">
      <button type="submit" class="
          bg-orange-700
          max-w-max
          px-2
          py-1
          my-2
          rounded-lg
          hover:bg-orange-600
          transition
          duration-200
          ease-in-out
          xs:text-base
        " @click="submitFile">
        {{ $t('auth.buttons.save') }}
      </button>
    </div>
  </form>
  <button class="
      flex
      items-center
      mt-10
      mr-4
      hover:text-orange-400
      transition
      duration-200
      ease-in-out
      xs:text-base
    " @click="userStore.logoutUser" v-if="userStore.userData">
    {{ $t('auth.buttons.signout') }}
    <img src="@/assets/svg/logout.svg" class="w-5 ml-4 xs:w-4" alt="logout" />
  </button>
  <Loader :loader="reviews.loader" />
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import Loader from "../components/Loader.vue";
import skeletonProfile from "@/assets/img/avatar.png";
import { reactive, computed, onMounted } from "vue";


const userStore = useUserStore();
const reviews = reactive({
  photo: null,
  preview: null,
  editProfile: true,
  nameProfile: "",
  loader: false,
});

onMounted(() => {
  reviews.nameProfile = userStore.userData.displayName;
});

const previewFilePath = computed(() => {
  if (reviews.preview) {
    return URL.createObjectURL(reviews.preview);
  }
  if (userStore.userPhoto !== null) {
    return (reviews.preview = userStore.userPhoto);
  }
  return skeletonProfile;
});

function uploadFile(e) {
  let files = e.target.files || e.dataTransfer.files;
  const file = files[0];
  const idx = file.name.lastIndexOf('.');
  const fileName = file.name;
  const extFile = fileName.substr(idx, fileName.length).toLowerCase();

  if (extFile == ".jpg" || extFile == ".jpeg" || extFile == ".png" || extFile == ".webp" || extFile == '.svg') {
    [reviews.preview] = files;
    createImage(files[0]);
  } else {
    userStore.errMsg = "error.userPhoto";
  }
}

function createImage(file) {
  let reader = new FileReader();
  reader.onload = function (e) {
    reviews.photo = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function submitFile() { 
    reviews.loader = true;
    await userStore.editUserProfile(reviews.photo, reviews.nameProfile);
    reviews.editProfile = true;
    reviews.loader = false;
    userStore.errMsg = "msg.done"
}
</script>
