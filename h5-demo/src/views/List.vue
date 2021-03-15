<template>
  <div>
    <h1></h1>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default { 
  name: "List",
  created() {
    this.getList()
  },
  methods: {
    getList(){
      console.log('123')
    }
  },
 };

</script>

<style lang="scss" scoped>

</style>