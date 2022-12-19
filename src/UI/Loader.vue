<template>
  <div class="loader-container">
    <span class="loader"></span>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.loader-container {
  display: flex;
  justify-content: center;
}
.loader {
  color: #fff;
  position: relative;
  font-size: 11px;
  background: #fff;
  animation: escaleY 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
  left: 2em;
  background: #fff;
  width: 1em;
  height: 4em;
  animation: escaleY 1s infinite ease-in-out;
}
.loader:before {
  left: -2em;
  animation-delay: -0.32s;
}

@keyframes escaleY {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>