<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2 @click="$store.commit('add')">{{$store.state.count}}</h2>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  // 约定预取逻辑编写在预取钩子asyncData中 // 触发 action 后，返回 Promise 以便确定请求结果
  asyncData({store, route}) {  
    console.log(route)
    return store.dispatch('getCount')
  },
}
</script>
