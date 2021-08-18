<template>
  <div>
      <button @click="modelOpen=true">{{modelOpen}}弹出一个模态窗口</button>
      <teleport to="body">
        <div v-if="modelOpen" class="model">
            <div class="content">
                这是一个弹窗
                我的父元素是body
            </div>
            <button @click="modelOpen=false">关闭</button>
        </div>
      </teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name:'myTeleport',
  setup () {
    const modelOpen =ref(false)
    return {
      modelOpen
    }
  }
}
</script>

<style  scoped>
.model{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
}
.model{
  width: 300px;
  height: 300px;
  padding: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

</style>