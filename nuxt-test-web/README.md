# nuxt-test

> My supreme Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## 目录就是 组件路由
表示嵌套关系
_id 占位符 id

## 其他页面都会进行预加载

##  nuxt.config.js 里面可以写配置
路由别名
```
router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/foo',
        component: resolve(__dirname, 'pages/othername.vue')
      })
    },
    // middleware: ['auth']
  },
```
###  布局页面更改 组件内部
layout: "blank",


### 错误页面 
props: ['error'],
layout: "blank",


## 接口服务器 nodemon api.js
http://localhost:8080/api/goods

## 代理
  modules: [
    '@nuxtjs/axios',
    "cookie-universal-nuxt"
  ],
  axios: {
    proxy: true
  },
  proxy: {
    "/api": "http://localhost:8080"
  },
## 中间件(是个函数)
中间件会在一个页面或一组页面渲染之前运行我们定义的函数,常用于权限的控制、校验等任务

router 里面配置是全局配置  // middleware: ['auth']

单个配置:页面里面配置是 middleware: ['auth']


### 插件的概念 
nust.js会在运行应用之前执行插件函数,需要饮用或设置vue插件、自定义模块和第三方模块的特别有用
目录 plugins
```
export default ({ $axios }, inject) => {
  // 将来this.$login
  inject("login", user => {
    return $axios.$post("/api/login", user);
  });
};
```
```
nuxt.config
plugins: [
  '@/plugins/element-ui',
  '@/plugins/api-inject',
  '@/plugins/interceptor',
],
```
### 添加请求拦截器附加token,创建plugins/interceptor.js

### 登陆状态初始化
只能写在 store/index.js 
安装依赖  cookie-universal-nuxt

注册 nuxt.config
modules: [
    "cookie-universal-nuxt"
  ],
## 发布部署
### 服务器渲染应用部署
npm run build 
npm run start
生产的内容在.nuxt/dist中
### 静态应用部署
npm  run generate
nuxt.js 可依据路由配置将应用静态化,使得我们可以将应用部署至任何一个静态站点主机服务商
会把所有的页面跑一边 生成静态页面
因为渲染和接口服务器都需要处于启动状态
生成内容再dist中
