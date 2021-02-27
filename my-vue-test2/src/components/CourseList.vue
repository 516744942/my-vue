<template>
  <div>
    <transition-group name="fade">
      <div v-for="(item, index) in courses" :key="index">
        <div>{{item.name}} {{item.price|currency('¥')}}</div>
        <a class="change" :class=[$style.red]>123123</a>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    courses: {
      type: Array,
      default: () => []
    },
  },
  created() {
    console.log(this.$style)
  },


  filters: {
    currency(value, symbol = '$') {
      return symbol + value ? value : '';
    }
  },
}
</script>

<style lang="scss" scoped>
</style>

<style module scoped>
.red {
  color: red;
}
</style>
  