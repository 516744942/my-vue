<template>
  <div>
    <!-- 自定义组件双向绑定：:value  @input -->
    <!-- v-bind="$attrs"展开$attrs -->
    {{$attrs}}
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  mixins: [emitter],
  inheritAttrs: false, // 设置为false避免设置到根元素上
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      placeholder: "value"
    };
  },
  methods: {
    onInput(e) {
      // 派发一个input事件即可
      this.$emit("input", e.target.value);

      // 通知父级执行校验
      // this.$parent.$emit("validate");
      this.dispatch("KFormItem", "validate");
    }
  }
};
</script>

<style scoped>
</style>