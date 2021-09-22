<template>
  <div>
    <div @click="emitB">添加嘻嘻</div>
    <div @click="emitB1">添加哈哈</div>
    <div @click="emitD">消除</div>
    <div @click="emitE">消除全部嘻嘻</div>
    <div @click="emitE1">消除全部内容</div>
  </div>
</template>

<script>
export default {
  name: "myEmitterComponent",
  created() {
    this.emitB();
    this.emitA();
    console.log(this._events);
  },
  methods: {
    emitA() {
      this.$emit("xixi", 1);
    },
    emitB() {
      this.$on("xixi", this.emitC);
      console.log(this._events);
    },
    emitB1() {
      this.$on("haha", this.emitC);
      console.log(this._events);
    },
    emitC() {
      console.log("嘻嘻哈哈");
    },
    emitD() {
      this.$off("xixi",this.emitC);
      console.log(this._events);
    },
    emitE() {
      this.$off("xixi");
      console.log(this._events);
    },
    emitE1() {
      this.$off();
      console.log(this._events);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>