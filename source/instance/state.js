import { set,del } from '../observer'
import Watcher from '../observer/watcher'

/**
 * 
 *.1 用法 vm.$watch(exporFn:string|Function,callback:function|Object,
 *options:{
 * deep:true,
 * immediate
 * }:object)
 * 2.  返回值 function  unwatch
 * 3. 用法 用于观察一个表达式或computed函数在vue.js实例上的变化。
 * 回调函数调用时 会从参数得到新数据和 新数组(new)和旧数组(old)
 * 可以接受分隔的路径 a.b.c。如果是一个比较复杂的表达式,可以用函数代替表达式
 * 返回一个取消观察函数,用来停止出发回调
 * 列子
 * var unwatch = wm.$watch('a.b.c',function(newVal,oldVal){
 *   做点什么
 *   
 * })
 * unwatch()
 * depp 为瞭发现对象内部值的变化
 * 可以在选择参数中制定deep:true
 * 这里需要注意的是,监听数组变动不需要这么做
 * immediate 在选择参数中指定 immediate:true 将立即以表达式的当前值出发回调
 * vm.$watch 其实是对Watcher的一种封装
 * 在vue原型上挂一个方法
 */

Vue.prototype.$watch = function (
  expOrfn: string | Function,
  cb: any,
  option?: Object // deep和 immediate
): Funtion {
  // 获取组件实例
  const vm: Compomemt = this
  option = options || {}
  const watcher = new Watcher(vm, expOrFn, cb, options)
  // 如果有immediate属性立即执行
  if(options.immediate){
    try {
      cb.call(vm,watcher.value)
    } catch (error) {
      new Error(`callback for immediate watcher ${watcher.expression}`)
    } finally {
      
    }
  }
  /**
   * unwatcheFn的原理
   * 执行watcher中的teardown()
   * 告诉所有的Dep管家移除自己 this.dep.removeSub(this)
   * removeSub 在 watcher数组中找到自己 并移除 断开联系
   */
  return  function unwatchFn() {
    watcher.teardown() //拆除
  }
}
//

Vue.prototype.$set = set
Vue.prototype.$delete = del
