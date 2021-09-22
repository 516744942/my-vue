<template>
  <div><myEmitterComponent  @xixi="emitA" /></div>
</template>

<script>
import myEmitterComponent from "../components/myEmitterComponent.vue";
export default {
  name: "myEmitter",
  components: {
    myEmitterComponent
  },
  methods: {
    emitA() {
      this.$emit("xixi", 1);
    },
    emitB() {},
    emitC() {}
  }
};
</script>

<style lang="scss" scoped>
</style>