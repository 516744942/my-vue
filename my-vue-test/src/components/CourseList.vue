<template>
  <div>
    <transition-group name="fade">
      <div
        v-for="(item, index) in courses"
        :key="item.title"
      >{{item.title}} {{item.price|currency('¥')}}</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    courses: {
      type: Array,
      default: []
    },
  },
  filters: {
    currency(value, symbol = '$') {
      return symbol + value;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>

  