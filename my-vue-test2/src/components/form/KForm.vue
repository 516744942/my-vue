<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'KFrom',
  componentName:'KFrom',
  provide() {
    return {
      form: this
    };
  },
  data() {
    return {
      fileds: []
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  created() {
    this.$on('kkb.form.addField',(filed)=>{
      this.fileds.push(filed)
    })
  },
  mounted() {
    // this.$on("validate", () => {
    //   this.validate();
    // });
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      // [resultPromise]
      // const tasks = this.$children
      //   .filter(item => item.prop) // 过滤掉没有prop属性的Item
      //   .map(item => item.validate());
      const tasks= this.fileds.map(item => item.validate())
      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style scoped>
</style>