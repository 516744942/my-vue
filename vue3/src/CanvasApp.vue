<template>
  <div>
    <piechart
      @click="handleClick"
      :data="state.data"
      :x="200"
      :y="200"
    ></piechart>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const stata = reactive({
      data: [
        { name: "大专", count: 200, color: "brown" },
        { name: "本科", count: 400, color: "yellow" },
        { name: "硕士", count: 100, color: "pink" },
        { name: "博士", count: 50, color: "skyblue" },
      ],
    });
    function handleClick() {
      state.data.push({
        name: "其他",
        count: 30,
        color: "orange",
      });
    }
    return {
      stata,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>