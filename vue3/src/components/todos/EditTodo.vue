<template>
  <div>
    <input
      type="text"
      :value="todoTitle"
      @input="onInputChange"
      v-bind="$attrs"
      @keyup.enter="addTodo"
    />
  </div>
</template>

<script>
// 默认 modelValue
export default {
  emits: ["enterValue", "update:todoTitle"],
  props: {
    todoTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInputChange(e) {
      console.log(123);
      this.$emit("update:todoTitle", e.target.value);
    },
    addTodo(e) {
      this.$emit("enterValue", 123);
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>