<template>
  <div>
    <h3>parent</h3>
    <!-- 属性展开 -->
    {{$attrs}}
    <Child2 v-bind="$attrs" v-on="$listeners"></Child2>
  </div>
</template>

<script>
  import Child2 from '@/components/communication/Child2.vue';
  
  export default {
    provide:{
      foo:123,
    },
    props: {
      msg: {
        type: Number,
      },
    },
    components: {
      Child2
    },
  };
</script>

<style lang="scss" scoped>

</style>