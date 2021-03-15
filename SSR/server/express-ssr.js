// nodejs  代码
const express = require('express');

// 获取express 实力
const server = express()

// 1创建一个vue实例
const Vue = require('vue');
// 2 获取渲染器实例
var { createRenderer } = require('vue-server-renderer');
const render = createRenderer()
// 编写路由处理不同url的请求
server.get('/', (req, res) => {
  // 
  const app = new Vue({
    template: '<div @click="onClick" >hello world {{msg}}</div>',
    data(){
      return{
        msg:'SSR'
      }
    },
    methods: {
      onClick(){
        console.log('do something')
      }
    }
  })
  // 3用渲染器渲染vue实例
  render.renderToString(app).then(html => {
    console.log(html);
    res.send(html)

  }).catch(err => {
    res.status(500)
    console.log(`Internal Server Error 500!`)
  })
})

//  监听一个端口 在80 端口运行了一个服务器
server.listen(80, () => {
  console.log('server running');

})



