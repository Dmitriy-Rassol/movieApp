<template>
  <section class="flex gap-16 lg:flex-col lg:items-center">
    <div class="lg:order-2">
      <img class="lg:w-2/3 lg:mx-auto"
        src="@/assets/img/backToTheHomepage.webp"
        alt="Back to the Homepage"
      />
      <img class="lg:w-2/3 lg:mx-auto"
        src="@/assets/img//Delorean.webp"
        alt="Delorean, Doc & Marti McFly"
      />
    </div>
    <div class="text-6xl md:text-5xl xxs:text-3xl">
      <h1 class="text-9xl text-orange-700 lg:text-center md:text-8xl">404</h1>
      <div class=" lg:text-center lg:max-w-md ">
        <h2 >{{ $t("notFound.page") }}</h2>
      <button
          class="
            flex
            items-center
            font-medium
            transition
            duration-200
            ease-in-out
            hover:text-orange-400
            btn-back
            pt-10
            lg:mx-auto
          "
          @click="$router.back() || $router.push({ name: 'Home' })"
        > &#8592 {{ $t("breadcrumbs.back") }}
        </button>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
</script>
