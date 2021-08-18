<template>
  <div id="demo1">
    <button @click="show = !show">Toggle</button>
    <transition name="fade">
      <div v-if="show">1111</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>