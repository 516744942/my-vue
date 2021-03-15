// 1创建一个vue实例
const Vue = require('vue');
const app = new Vue({
  template: '<div>hello world</div>'
})

// 2 获取渲染器实例
var { createRenderer } = require('vue-server-renderer');
const render = createRenderer()

// 3用渲染器渲染vue实例
render.renderToString(app).then(html => {
  console.log(html);

}).catch(err => {
  console.log(err)
})