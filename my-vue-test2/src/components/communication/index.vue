<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <!-- 事件总线 -->
    <Child2 msg="some msg from parent" @click="onClick"></Child2>
    <!-- $children -->
    <button @click="goHome">回家吃饭</button>
    <Parent :msg="123" dfgd="123"></Parent>
  </div>
</template>

<script>
import Child1 from "@/components/communication/Child1.vue";
import Child2 from "@/components/communication/Child2.vue";
import Parent from "@/components/communication/Parent.vue";

export default {
  name: "communication",
  provide() {
    return {
      foo: "foooooooooo"
    };
  },
  components: {
    Child1,
    Child2,
    Parent
  },
  methods: {
    onSomeEvent(msg) {
      console.log("Communition:", msg);
    },
    goHome() {
      // $children
      this.$children[0].eat();
    },
    onClick() {
      console.log("来自老爹的回调函数处理", this);
    }
  },
  mounted() {
    console.log("儿子", this.$children);
    // this.$children[1].sendToChild1();
    // this.$refs.child2.sendToChild1();
  }
};
</script>

<style scoped>
</style>