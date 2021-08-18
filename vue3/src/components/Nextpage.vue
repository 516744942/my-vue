<template>
  <div>this is next-page</div>
</template>

<script>
import { emitter } from "./HelloWorld.vue";
export default {
  mounted() {
    emitter.on("someEvent", (msg) => {
      console.log(msg);
    });
  },
  setup() {
    return {};
  },
};
</script>

<style  scoped>
</style>