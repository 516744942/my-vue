
/**
 * 事例相关方法,分别是 
 * vm.$on 
 * vm.$once
 * vm.$off
 * vm.$emit 
 * 
 */

import { toArray } from "../shared/util";



export function eventsMixin(params) {
  /**
   * 用法
   * vm.$on(event,callback)
   * 监听当前实例上的自定义事件,事件可以由vm.$emit触发
   * 回调函数会接受所有传入事件所触发的函数的额外参数
   * 参数:
   * {string|Array<string>} event
   * {Function} callback
   * 示例 
   * vm.$on('test',function(msg)=>{
   *  console.log(msg)
   * })
   * vm.$emit('test,'hi')
   * // => 'hi'
   */
  /**
   * event 参数为数组时,需要遍历数组,递归调用vm.$on 
   * 使回调可以被注册到数组中每项事件名所指定的事件列表中
   * 不是数组时,像事件列表中添加回调(注册到事件列表中)
   */
  /**
   * vm.events是一个对象,用来存储事件
   * 如果不存在,则使用空数组初始化,然后再将回调函数添加到事件列表中
   * _event 在this._init方法进行一系列初始化操作
   */
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function) {
    const vm = this
    /**
     * 如果是数组的话就递归去循环事件数组
     * 如果是字符串,就在实例上属性上添加_event添加回调函数
     * 
     */
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$on(event[i], fn);
      }
    } else {
      /**
       * 数组存在就添加
       * 不存在先申明再添加
       * 
       */
      (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm
  }

  Vue.prototype.$on = function (event, fn) {
    const vm = this;
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._event[event] = [])).push(fn);
    }
    return vm
  }
  /**
   * 用法
   * vm.$once(event,callback)
   * 参数
   * {string|Array<string>}event
   * {function} callback
   * 用法
   * 监听一个自定义事件,但是触发一次,在第一次处罚之后移除监听器
   */

  /**
   * vm.$once和vm.$on的区别是vm.$once只能被触发一次
   * 将函数on注册到事件中,当自定义事件被触发时,会先执行函数on()
   * 然后手动执行函数fn,并且参数argument传递给函数fn
   * 这就可以实现vm.$once的功能
   * 
   */
  Vue.prototype.$once = function (event, fn) {
    const vm = this
    function on() {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = on
    vm.$on = (event, on)
    return vm
  }
  /**
   * 用法
   * vm.$off([event,callback])
   * 参数
   * {string|Array<string>} event
   * {Function} callback
   * 用法:移除自定义事件监听器
   * 如果没有提供参数,则移除所有的事件监听器
   * 如果只提供了事件,则移除改事件所有的监听器
   * 如果同时提供了事件和回调,则只移除了这个回调的监听器。
   */

  Vue.prototype.$off = function (event, fn) {
    const vm = this
    // 移除所有事件的监听器
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    /**
     * 如果有参数
     * 而且 event是数组的话
     * 只需要将数组遍历一遍,然后数组中的每一项依次调用vm.$off即可
     */
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$off(event[i], fn)
      }
      return vm
    }
    /**
     * 如果只提供了事件名,则移除该事件所有的监听器
     * 需要从this._events,将event重置为空即可
     */
    /**
     * 找不到监听,则什么都不需要做
     * 
     */
    const cbs = vm._event[event]
    if (!cbs) {
      return vm
    }
    /**
     * 移除改事件的所有监听器
     * arguments.length == 1||!fn
     * 移除该事件的所有监听器
     */
    if (arguments.length == 1) {
      vm._event[event] = null
      return vm
    }
    /**
     * 最后一种情况
     * 同时提供了事件与回调,那么只移除这个回调的监听器
     * 只需要使用参数提供的事件名从vm_events上去除事件列表
     * 然后从列表中找到与参数中提供的回调函数相同的那个函数
     * 将他从列表中移除
     * 
     */
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }

    return vm
  }
  /**
   * 用法
   * vm.$emit(event,[...args])
   * 参数:
   * {string}event
   * [...args]
   * 用法 
   * 触发当前实例上的事件,附加参数都会传给监听器回调。
   * 
   */
  /**
   * 所有的时间 回调都会存储在vm.events中,
   * 所以触发时间的思路是使用事件名 vm._events中取出对应的事件监听回调函数列表
   * 依次执行列表中的监听器回到并讲参数传递给监听器回调
   */

  /**
   * 
   */
  Vue.prototype.$off = function (event, fn) {
    const vm = this;
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        vm.$off(event[i], fn)
      }
    }
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    let cb, i = cbs.length
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn == fn) {
        cbs.splice(i)
        break
      }
    }
    return vm
  }



  Vue.prototype.$emit = function (event) {
    const vm = this
    let cbs = vm._event[event]
    if (cbs) {
      const args = toArray(argument, 1) // share下米娜的util.js 我觉得可以直接用Array.from()
      for (let i = 0; let  l = cbs.length ; i < l; i++) {
        try {
          cbs[i].apply(vm, args)
        } catch (e) {
          console.log('报错')
        } finally {

        }

      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event) {
    const vm = this;
    let cbs = vm._events[event];
    cbs = cbs.length > 1 ? toArray(cbs) : cbs
    const args = toArray(arguments, 1);
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        try {
          cbs[i].apply(vm, args)
        } catch (e) {
          console.log(err)
        } finally {
        }
      }
    }

    return vm
  }
}