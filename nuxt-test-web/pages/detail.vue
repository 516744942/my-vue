<template>
  <div>
    <h2>detail page</h2>
    {{goodInfo}}
    <!-- nuxt-child表示嵌套关系 -->
    <!-- 类似router-view -->
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodInfo: {}
    };
  },
  async asyncData({ $axios, params, error }) {
    if (params.id) {
      //  asyncDate中不能使用this获取组件实例
      //  但是可以通过上下文获取相关数据
      const { data: goodInfo } = await $axios.get("api/detail", { params });
      if (goodInfo) {
        return { goodInfo };
      }
      error({ statusCode: 400, message: "商品详情查询失败" });
    } else {
      return { goodInfo: null };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
