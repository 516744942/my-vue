
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <communication></communication>
    <div class="class">区别</div>
    <myForm></myForm>
  </div>
</template>

<script>
import communication from "@/components/communication/index.vue";
import myForm from "@/components/form/index.vue";
export default {
  name: "",
  components: {
    communication,
    myForm
  }
};
</script>

<style lang="scss" scoped>
</style>