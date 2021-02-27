<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <CourseList :courses="courses"></CourseList>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CourseList from "@/components/CourseList.vue";
import { getCourse } from "@/api/course";

export default {
  name: "Home",
  data() {
    return {
      title: `"开课吧购物车"`,
      courses: [{
        name: 'vue.js'
      }, {
        name: 'index.html'
      }],
    }
  },
  components: {
    HelloWorld,
    CourseList
  },
  async created() {
    const courses = await getCourse();
    this.getCourse = courses
    console.log(this.getCourse)
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
::v-deep .change {
  color: red;
}
</style>

