<template>
  <div v-if="modelValue" @click="$emit('update:modelValue', modelValue + 1)">
    count:{{ modelValue }}
  </div>
  <div v-if="counter" @click="$emit('update:counter', counter + 1)">count:{{ counter }}</div>
</template>

<script>
export default {
  name: "VmodelTest",
  props: {
    counter: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style  scoped >
</style>