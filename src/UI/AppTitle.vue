<template>
  <h3 class="title">
    {{title}}
  </h3>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.title {
    margin-top: 30px;
    font-size: 24px;
}
</style>