/**
 * nextTick 接受一个回调函数作为参数
 * 作用 它是将回调延迟到下次DOM更新周期之后执行
 * 它与全局方法Vue.nextTick一样,不同的是回调的this自动绑定到调用他的实例上
 * 如果没有提供回到且在支持Promise的环境中, 则返回一个promise
 * 
 */

/**
 * 在开发中需要对新DOM做一些操作,但是这时我们其实获取不到更新后的DOM
 * 因为还没有重新渲染
 * 这个时候我们需要使用nextTick方法
 * 
 * */

/**
 * 每当需要渲染时,会将watcher推送到这个队列中,在下一次 
 * 事件渲染中再让watcher触发渲染的流程
 * 
 */

/**
 * 为什么 vue.js使用异步更新队列
 */
/**
 * 
 * 如果在同一轮事件循环中有两个数据发生了变化 
 * 那么组件的watcher会受到两份通知,从而进行两次渲染
 * 事实上并不需要两次渲染,虚拟DOM会对整个组件进行渲染
 * 所以只需要等待所有状态都修改完毕之后
 * 一次性将整个组件的DOM渲染到最新即可
 */
/**
 * 要解决这个问题,Vue.js的实现方式 是将受到通知的watcher实例添加到队列中缓存起来
 * 并且在添加到队列之前检查其中是否已经存在相同的watcher
 * 只有不存在,才将watcher实例添加到队列中
 * 这样就可以保证即便在同一事件循环中有两个状态发生了改变,watcher最后也只执行一次渲染流程
 */
/**
 * 事件循环
 * js是一门 单线程非阻塞的脚本语言
 * 都只有一个主线程来处理所有任务
 * 非阻塞是指当代码需要处理异步任务时,
 * 主线程会挂起 peding这个任务,当异步任务处理完毕之后,主线程再根据一定规则去执行相应回调
 */
/**
 * JavaScript会将这个事件加入一个队列中,我们称这个队列为事件队列
 * 被加入事件队列中的事件不会立刻执行其回调
 * 而是等待当前执行栈中的所有任务执行完毕后
 * 主线程回去查找事件队列中是否有任务
 */
/**
 * 类型 
 * 微任务和宏任务
 * 当 执行栈中所有任务都执行完毕后
 * 会检查微任务队列中是否有事件存在,如果存在
 * 则会一次执行微任务队列中事件对应的回调,直到为空
 * 然后去宏任务队列中取出一个事件,把对应的回调加入当前执行栈
 * 当栈中的所有任务都执行完毕之后,检查微任务队列中是否事件存在.无限重复此过程
 * 就形成了一个无限循环,这个循环就叫做事件循环
 */
/**
 * 微任务
 * promise.then()
 * MutationObserve() Mutation Observer
 * Object.observe
 * process,next
 */
/**
 * 宏任务
 * setTimeout
 * setInterval
 * setImmdediate
 * I/O
 * messageChannel
 * requestAnimationFrame
 * UI交互事件
 */

/**
 * 执行栈
 * 当执行一个方法时
 * 生成一个执行环境
 * 有这个方法的私有作用域
 * 执行环境会被添加到一个栈中
 */

/**
 * 下次DOM更新周期的
 * 意思
 * 其实是下次微任务执行时更新DOM
 * 其实是将回调添加到微任务中,只有特殊情况下才会降级成宏任务,默认都会添加到微任务中
 * 
 */
/**
 * vm.nextTick来获取更新后的DOM,则需要注意顺序的问题,
 * 因为不论是更新DOM的回调还是使用vm.$nextTick注册的回调,都是想微任务队列中添加任务,
 * 那个任务先添加到队列中,就先执行哪个任务
 */

/**
 * 1 DOM 更新了
 * this.message ="change"
 * this.$nextTick(function(){
 *   DOM 更新了
 * })
 *  
 * this.$nextTick(function(){
 *   DOM 没有更新
 * })
 *  this.message ="change"
 */

/**
 * this.$nextTick(function(){
 *   setTimeout(_=>{
 *     // DOM现在更新了
 *   },0)
 * })
 *  this.message ="change"
 */


import { nextTick } from "../util/index";

Vue.prototype.$nextTick = function (fn) {
  return nextTick(fn, this)
}