## 概念
服务端渲染：将vue实例渲染为HTML字符串直接返回，在前端激活为交互程序

## 优点 
seo
首屏内容到达时间

## 基础的http 服务

// nodejs  代码
const express = require('express');

// 获取express 实力
const server = express()

// 编写路由处理不同url的请求
server.get('/', (req, res) => {
  res.send('<strong> hello world</strong>')
})

//  监听一个端口 在80 端口运行了一个服务器
server.listen(80, () => {
  console.log('server running');
})

## 基础实现
使用渲染器 将vue实列成HTML字符串并返回

##安装 vue-server-renderer
```
npm i  vue-server-renderer -s
```
1.  创建vue实列
2.  获取渲染器实例
3.  用渲染器渲染vue实例

<!-- 确保版本相同且匹配 -->

## 激活 
现在只有死的内容，如果要使程序可以交互还需要激活

## vue ssr
传统web开发，网页内容在服务端渲染完成，一次性传输到浏览器。

客户端 -> 访问url(请求) -> 服务器 -> 查询数据库，拼接html字符串(模板) ->给你html(响应)->客服端

🏠vue js和 渲染template

## 服务端渲染 Server Side Render
折中方案
1. SSR解决方案，后端渲染出完整的首屏的dom结构返回
2. 前端拿到的内容包括首屏及完整spa结构
3. 应用激活后依然按照spa方式运行，这种页面渲染方式被称为服务端渲染
客户端 -> 访问url(请求) -> 服务器 -> 查询数据库，拼接html字符串(模板) ->给你html(响应)->显示首屏、激活->客服端
4. 和传统不一样的是需要携带一写js代码(激活),新的spa 程序

## 同构开发SSR 应用 
依然使用webpack 打包, 我们要解决两个问题
服务端首屏渲染

客户端激活

### 构建流程
输入两个包 server Bundle(解决服务端渲染)
client Bundle(解决客户端激活)

```
src 
├── router 
├────── index.js # 路由声明 
├── store 
├────── index.js # 全局状态 
├── main.js # 用于创建vue实例 
├── entry-client.js # 客户端入口，用于静态内容“激活” 
└── entry-server.js # 服务端入口，用于首屏内容渲染
```

#### vue-ssr-outlet
宿主文件 <!--vue-ssr-outlet-->
最后需要定义宿主文件，修改./public/index.html

### 数据的预取问题

asyncData({store, route}) {  
  console.log(route)
  return store.dispatch('getCount')
}
在 entry-server.js 中去做