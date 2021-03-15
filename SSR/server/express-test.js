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
