<template>
  <div>
    <!-- $listeners会被展开并监听 -->
    <h3 v-on="$listeners">child2</h3>
    <button @click="sendToChild1">给child1发送消息</button>
    <!-- $attrs -->
    <p>{{$attrs.msg}}</p>
    <!-- provide/inject -->
    <p>嘻嘻哈{{foo1}}</p>
  </div>
</template>

<script>
export default {
  inject: {
    foo1: {
      form: 'foo',
      default: 123
    }
  },
  mounted() {
    console.log("父亲", this.$parent);
  },
  methods: {
    sendToChild1() {
      // 利用事件总线发送事件
      // this.$bus.$emit('event-from-child2', 'some msg from child2')
      this.$parent.$emit("event-from-child2", "some msg from child2","wqeqwe");
    }
  }
};
</script>

<style scoped>
</style>