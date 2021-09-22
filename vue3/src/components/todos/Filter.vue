<template>
  <p class="filters">
    <span
      v-for="item in items"
      :key="item"
      @click="$emit('update:modelValue', item.value)"
      :class="{ selected: modelValue === item.value }"
      >{{ item.label }}</span
    >
  </p>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props:['items','modelValue'],
  emits:['update:modelValue'],
  setup () {
    const state = reactive({
      count: 0,
    })
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style  scoped>
.selected{
  color: red;
}
</style>