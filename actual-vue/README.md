# study-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### vue.config.js
module.exports ={
  publicPath:'/best-practice', //上下文
  devServer:{
    port:7070
  }
  <!-- webpack -->
  configureWebpack:{
    resolve:{
      name:'vue项目最佳实践',// <%= webpackConfig.name %> 
      alias:{
        comps:require('path).join(_dirname,'src/components')  //当前文件下 comps/
      }
    }
  }
  
}
```
module.exports = {
  configureWebpack: config => {
    // development  测试环境
    if (process.env.NODE_ENV === 'production') {
      config.name ='最佳实践'
      // 为生产环境修改配置...
    } else {
      config.name ='vue best practice'

      // 为开发环境修改配置...
    }
  }
}
```

链式调用
```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```

### svg-sprite-loader
#### 当前文件
function resolve(dir) {
  return path.join(__dirname, dir)
}
```
  chainWebpack(config) {
    // 1. 项目中默认svg加载rule 排除掉icons/svg
    
    config.module.rule('svg') // 找到规则
      .exclude.add(resolve('./src/icons')) //  要加的地址
    // 2. svg-loader配置
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons')).end()   // 添加的地址 end 回退到上一级的上下文
      .use('svg-sprite-loader')    // 使用 loader
      .loader('svg-sprite-loader')  // 找到他
      .options({ symbolId: 'icon-[name]' }) // 添加选项 图标的名称
  }
```
### 检查  vue inspect > output.json
### 查看规则 vue inspect --rules 
### 查看规则 vue inspect --rule svg


### 环境变量和模式
1. development  dev
1. production   build
1. test         test

#### 定义⼀个开发时可⽤的配置项 创建.env.dev

.env.dev
```
# 只能⽤于服务端
foo=bar
# 可⽤于客户端
VUE_APP_DONG=dong
```
#### 修改mode选项覆盖模式名称，package.json
"serve": "vue-cli-service serve --mode dev"
vue.config
console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)

bar
dong

在vue中使用
undefined
dong

### 两种路由
constantRoutes  默认路由可直接访问
asyncRoutes    后者中定义的路由需要登录


### mock easy-mock

### 跨域 doServer

### 单元测试 test

```
// 测试套件
describe('Kaikeba.vue', () => {
  // 测试用例
  test('测试add函数', () => {
    // 断言
    // expect(add(1,3)).toBe(3)
    expect(add(1,3)).toBe(4)
    expect(add(-2,3)).toBe(1)
  })
  
  test('要求组件必须有created选项', () => {
    expect(typeof Kaikeba.created).toBe('function')

    const defData = Kaikeba.data()
    expect(defData.message).toBe('vue-text')
  })

```

### 测试套件
import {mount} from '@vue/test-utils'
### collectCoverageFrom
看是否可靠

<!-- coverage 里面会有一个报表 -->