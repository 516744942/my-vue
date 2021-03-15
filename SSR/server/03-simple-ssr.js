// node服务器：koa,express,egg.js
const express = require('express')
const app = express()

// 服务端渲染模块vue-server-renderer
const { createRenderer } = require('vue-server-renderer')
// 获取渲染器
const renderer = createRenderer()
// 创建vue实例
const Vue = require('vue')
// 创建一个路由器实例
const Router = require('vue-router');


//  第一个问题没有办法交互,样式和
// 第二个问题 路由是express管理
// 路由
app.get('*', async (req, res) => {
  // req.url

  // const router = new Router({
  //     routes: [
  //       { path: "/", component: { template: '<div>index page</div>' }},
  //       { path: "/detail", component: { template: '<div>detail page</div>' }}
  //   ]
  //   });
  // 创建一个vue应用
  const vm = new Vue({
    // router,
    data() {
      return {
        name: '村长'
      }
    },
    template: `
      <div>
        <router-link  to="/"> index</router-link>
        <div  to="/detail">detail</div>
        <div>{{name}}</div>
        <router-view></router-view>
      </div>
    `,
  })

  try {
    // 尝试路由的跳转
    // router.push(req.url)

    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器内部错误')
  }

})

// 监听
app.listen(3000)