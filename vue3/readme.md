```
  npm init vite-app <project-name>
  cd <project-name>
  npm install 
  npm run dev
```


```
createApp(App).mount('#app')
```



### Fragments 可以拥有多个根


### 自定义渲染器(custom renderer)

1. 把数据渲染到canvas上
2. 想要渲染一个piechart的组件(我们不需要单独申明该组件),因为我们只想要把他携带的数据渲染到canvas上,创建CanvasApp.vue


###  Global API 为改为应用程序实例调用

Vue2 中有很多全局api可以改变vue的行为, 比如Vue.component等
vue2没有app概念,new Vue()得到的根实例被作为app,
这样的话所有创建的根实例是共享相同的配置,
这在测试时会污染其他测试用例,导致测试变得困难

全局配置也导致没有办法在单页面创建不同全局配置多个app实例
vue3中 使用createApp 返回app实例, 由它暴露一系列全局api

<!-- vue2和vue3差异 -->
 | vue2                      | vue3                       |
 | ------------------------- | -------------------------- |
 | Vue.config                | app.config                 |
 | vue.config.productionTip  | removed                    |
 | vue.config.ignoredElement | app.config.isCustomElement |
 | vue.component             | app.component              |
 | vue.directive             | app.directive              |
 | vue.mixin                 | app.mixin                  |
 | vue.use                   | app.use(see below)         |
 | vue.filter                | removed                    |

#### Global and internal APIs重构为可做摇树优化
vue2 中不少global-api vue静态函数直接挂载在构造函数上的
例如 Vue.nextTick(),如果我们从未在代码中使用过它们,就会形成所谓的 dead code
这类global-api造成的 dead code无法使用webpack的tree-shaking排除删掉 
```
import Vue from 'vue'
Vue.nextTick(()=>{
  // something something DOM-related
})

```
vue3中做了响应的变化, 将它们抽取成为独立函数,这样打包工具的摇树优化可以将这些dead code 排除掉
import {nextTick} from 'vue';
nextTick(()=>{
  // something something DOM-related
})
受影响api:
```
Vue.nextTick
Vue.version
Vue.compile(only in full build)
Vue.set (only in compat build)
Vue.delete (only in compat build)
```


### model 选项和v-bind的修饰符被移除  统一为v-model参数形式
vue2中. sync和v-model功能有重叠,容易混淆 vue3做了统一

```
    <div id="app">
      <h3>{{data}}</h3>
      <!--等效于-->
      <comp v-model="data/>
      <!--等效于-->
      <comp  :modelValue @update:modelValue="data=$event"/>
    </div>
```

app.component('comp',{
  template:`
    <div @click="$emit(update:modelValue,'new value')">
        i am comp,{{modelValue}}
    </div>
  `,
  props:['modelValue']
})

### 渲染函数API 修改
1. 渲染函数变得更简单好用了,修改主要有以下几点
2. 不再传入h函数,需要我们手动导入:拍平的prop结构。scopedSlots删除了,统一到slots



### 函数组件 仅通过简单函数方式创建,functional选项废弃
####  函数式组件变化较大比较,主要有以下几点
1. 性能提升在vue3中可忽略不计, 所以vue3中推荐使用状态组件
2. 函数时组件仅通过纯函数形式声明,接受props和contest两个参数
3. SFC中<template> 不能添加functional 特性声明函数组件
4. {functional:true}组件选择移除


### 异步组件的使用
#### 异步组件要求使用defineAsyncComponent方法创建
1. 由于vue3中函数式组件必须定义为纯函数,异步组件定义时有如下变化
2. 必须有明确使用defineAsyncComponent包裹
3. component 选项重名为 loader
4. Loader函数不在接受resolve and reject 且必须返回一个Promise
   
#### 定义一个异步组件

```
import {defineAsyncComponent} from 'Vue'
const asyncPage = defineAsyncComponent(()=>import('./NextPage.vue))

```

#### 待配置的异步组件,loader选项是以前的component
```
import ErrorComponent from './components/ErrorComponent.vue'
import loadingComponent from './components/LoadingComponent.vue'

const asyncPageWithOptions = defineAsyncComponent({
  loader:()=>import('./nextPage.vue),
  delay:200,
  timeout:3000,
  errorComponent:ErrorComponent,
  loadingComponent:loadingComponent
})

```

 
###  组件data选项应该总是声明为函数
``` 
 createApp({
   data(){
     return {
       apiKey:'123ad'
     }
   }
 }).mount('#app')
```

### 自定义组件白名单
vue3中自定义元素检测发生在模板编译时
如果要添加一些vue之外的自定义元素
需要在编译器选项中设置 isCustomElement选项
使用构建工具时,模板都会用vue-loader预编译,设置它提供的compilerOptions 即可
```
  rules:[
    test:/.vue$/,
    use:'vue-loader',
    options:{
      compilerOptions:{
        isCustomElement:tag => tag ==='plastic-button'
      }
    }
  ]
```


is 属性仅限于用在component 标签上
vue3 中设置动态组件时 is属性仅能用于component标签上
<component is="comp"></component>

dom内模板解析使用 v-is代替
```
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

仅限in-dom模板,因此我们测试放到独立页测试,index2.html
```
 <div id="app">
 </div>

 <table>
   <tr v-is="'row'" v-for="item in items" :data="item"> 

   </tr>
 </table>
```

```
.component("row",{
  props:['data'],
  template:"<tr><td>{{this.data}}</td></tr>"
})
```

$scopedSlots 属性被移除, 都用$slots代替
vue3中统一普通插槽和作用域插槽到$slots,具体变化如下:
1. 插槽均以函数形式暴露
2. $scopeSlots 移除


### 自定义指令API和组件保持一致

1. bind -> beforeMont
2. inserted -> mounted
3. beforeUpdate ->


### transition类名变化(动画)

v-enter -> v-enter-from
v-leave -> v-leave-from


#### 组件watch 选项和实例方法$watch 不再支持点分隔符字符串路径

this.$watch(()=>this.foo.bar,(v1,v2)=>{
  console.log(this.foo.bar)
})

### keyCode作为v-on 修饰符被移除
```
<!-- 不能使用 -->
<input v-on:keyup.13="submit">
<!-- 只能使用alias方式 -->
<input v-on:keyup.enter ="submit">
```

#### event api filter等移除一览
<!-- npm i mitt  安装代替-->