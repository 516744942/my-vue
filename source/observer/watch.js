/**
 * 什么是watcher
 * 数据发送变化时通知它,然后它再通知其他地方
 * vm.$watch('a.b.c',function(newVal,olVal){
 *   做点什么
 * })
 * 数据发生了什么，触发第二个参数中的函数
 * 
 */

import Dep from "./dep";
import { traverse } from "./traverse";

//
/**
 * deep参数的原理
 * 收集以来和出发依赖
 * Watcher想监听某个数据就会出发某个数据依赖的逻辑
 * 将自己收集进去
 * 然后当他发生变化时,
 * 就会通知Watcher
 * deep 就是将停这个值的所有子值都触发一遍收集依赖逻辑
 * 所有子属性发生变化都会通知当前Watcher
 */


export default class Watcher {
  vm: Component;
  cb: Function;
  deep: boolean; // vm.$watcher options的参数
  deps: Array<Dep>;
  depIds: SimpleSet;
  // 
  constructor(
    vm,
    expOrFn: | string | Function,
    cb
  ) {
    this.vm = vm;
    this.cb = cb;
    /**
     * 每当watcher实例添加到vm.watchers中
     */
    vm._watchers.push(this)
    if (options) {
      this.deep = !!options.deep
    } else {
      this.deep = false
    }
    this.deps = []
    this.depIds = new Set();
    //执行this.getter() 
    // parsePath data.a.b.c的内容
    /**
     * 当 expOrFn是函数时,会发生很神奇的事情,
     * 他不只可以动态返回数据
     * 其中读取的所有数据也都会被watcher观察
     * vm.$watch(
     * function(){
     * // 表达式 `this.a + this.b` 每次得出一个不同的结果时
     * // 处理函数都会被调用。
     * // 这就像监听一个未被定义的计算属性
     *  return this.a +this.b
     * },
     */
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.cb = cb
    this.value = this.getter();
  }
  // 把watcher 挂在dep上面
  get() {
    //this 为 当前的watcher实例,然后再读一下 
    // data.a.b.c的值,这个肯定会触发getter 
    // ƒ () {
    // vm._update(vm._render(), hydrating);
    // }
    // 
    // 

    window.target = this
    let value = this.getter.call(this.vm, this.vm) //触发dep 收集依赖
    //收集所有的子依赖
    if (this.deep) {
      traverse(value);
    }
    window.target = undefined
    return value
  }
  update() {
    const oldValue = this.value
    this.value = this.get(); // 
    this.cb.call(this.vm, this.value, oldValue)
  }
  /**
   * 记录 watcher自己都订阅过那些Dep
   * 让他们把自己从以来列表中移除掉
   *  
   */
  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  // 用户执行这个函数时,实际上执行了watcher.teardown()来取消观察数据
  // 其本质是吧watcher实例从当前正在观察的状态的依赖列表中移除
  teardown() {
    let id = dep.id
    let i = this.deps.length
    while (i--) {
      this.deps[i].removeSub(this)
    }
  }
}
//  一个单词 word.对象的每一层
const bailRE = /[^\w.$]/
export function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.') //["data", "a", "b", "c")
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]  //["data"]
    }
    return obj   //最后的obj就是keypath想要拿到的数据
  }
}