/**
 *  因为将回调添加到任务队列中
 *  只会向队列中添加一个任务
 *  此外, Vue.js 内部有一个列表用来存储vm.$nextTick参数中提供的回调
 * 在一轮事件循环中,vm.$nextTick只会向任务队列添加一个任务
 * 多次使用vm.$nextTick只会讲回调添加到队回调列表中缓存起来
 * 当任务触发时,一次执行列表中的所有回调并清空列表
 */

import { resolve } from "path/posix";

/**
 * 通过数组callbacks来存储用户注册的回调,
 * 声明了变量pending来标记是否向任务队列中添加了一个任务
 * 每当向任务队列中插入任务时,将pending设置为true
 * 每当任务队列中插入任务时,将pending设置为true,每当任务被执行将pendingfalse
 * 这将就可以判断是否需要向任务队列中添加任务
 */
const callbacks = [];
let pending = false;

function flushCallbacks(params) {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
/**
 * 
 */

/**
 * 
 */
let microTimerFunc
let macroTimerFunc
let useMacroTask = false // 宏任务代码

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
  }
} else {
  microTimerFunc = macroTimerFunc
}
/**
 * 宏任务代码
 * 作用是给给回调函数做一层包装
 * 保证在整个回调函数构成中
 * 如果修改了状态(数据)
 * 那么更新DOM的操作会被推送到宏任务队列中
 * 也就是说,更新DOM的执行时间会晚于函数的执行时间
 */
/**
 * 更新DOM的回调也是使用nextTick将任务添加到任务队列中
 * 包括 更新DOM的回调和用户使用 vm.$nextTick注册的回调等
 */

export function withMacroTask(fn) {
  return fn.withTask || (fn._withTask = function () {
    useMacroTask = true
    const res = fn.apply(null, arguments);
    useMacroTask = false
    return res
  })
}
/**
 * macroTimerFunc是如何将回调添加到宏任务队列
 * vue.js优先使用setImmediate
 * 但是他存在缓存兼容性问提 只能在IE中使用
 * 所以使用MessageChannel
 * 最后用setTimeout来
 * 
 */


/**
 * 如果咩有回调函数且支持Promise的环境中
 * 则返回一个Promise
 */

export function nextTick(cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx)
    } else if (_resolve) {
      _resolve(true)
    } {
    }
  })
  if (!pending) {
    pending = true
    /**
   * 如果触发了DOM更新 而useMacroTask是true 会被添加到宏任务队列中
   */
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

/**
 * 测试
 */
nextTick(function (params) {
  console.log(this.name); // berwin
}, { name: 'berwin' })

/**
 * 申明了函数flushCallbacks
 * 这就是我们所有的被注册的那个函数
 * 当这个函数呗触发时,会将callbacks中所有函数一次执行,然后清空callbacks
 * 并将pending设置为false,也就是说一轮事件中flushCallbacks只会执行一次
 *
 */
/**
 * 申明microTimerFunc函数,
 * 他的作用是使用promise.resolve.then 讲flushCallbacks添加到微任务队列中
 *
 */

/**
  * 前面提到microTimer的实现原理是用Promise.then
 * 当不是所有浏览器都支持Promise.then
 * 不支持的时,会降级成macroTimerFunc
 */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  /**
   * macroTimerFunc被执行时,会将flushCallbacks添加到宏任务队列中
   * 
   */
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}