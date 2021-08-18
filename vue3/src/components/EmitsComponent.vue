<template>
  <div @click="$emit('my-click',123)">
    <h3>自定义事件</h3>
  </div>
</template>

<script>
export default {
  emits: ["my-click"],
  setup() {
    return {};
  },
};
</script>

<style  scoped>
</style>