/**
 * 可以看到, 当函数initMixin被调用时,会向Vue构造函数的prototype属性添加__init方法
 * 执行 new Vue()时,会调用这个_init方法,这个方法实现了一系列初始化的操作
 * 包括整个生命周期的流程以及响应式系统流程的启动
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm._event = Object.create(null)
  }
}