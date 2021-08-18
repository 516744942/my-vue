import { initMixin } from "./init"
import { stateMixin } from "./state"
import { eventsMixin } from "./event"


function Vue(options) {
  if (process.env.NODE_env !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options);
}


/**
 * 这5个函数的作用就是向Vue的原型中挂载方法
 */

/**
 * 生命周期相关  forceUpdate 和destroy   nextTick 和destroy
 * mount 是在跨平台的代码中挂在到Vue构造函数的prototype
 */
initMixin(Vue); //初始化(原型方法)(new Vue)时调用
stateMixin(Vue); //数据相关  vm.$watch、  vm.$set 和 vm.$delete (原型方法)
eventsMixin(Vue); // 事件
lifecycleMixin(Vue); //生命周期 forceUpdate 和和destroy
renderMixin(Vue)   // 渲染函数  nextTick 

export default Vue

