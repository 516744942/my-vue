// 在对象上定义反应性。
// Define a reactive property on an Object.
import { isObject } from 'node:util';
import { def, hasProto } from '../util';
import { arrayMethods } from './array';
import Dep from './dep'
// 过度反应 
export function defineReactive(data, key, val) {
  //如果是对象就递归子属性
  if (typeof val === 'object') {
    new Observer(val)
  }
  let childOb = Observer(val)  //dep实例保存在Observe上面
  // let dep = [] //新增   但是为了解决耦合问题 把Dep封装成一个类
  let dep = new Dep(); // 修改
  Object.defineProperty(data, key, {
    enumerable: true, // 是否可以通过for-in循环返回
    configurable: true, // 是否可以删除
    writable: true,  // 是否可以修改
    // value

    // 收集依赖
    get: function () {
      dep.depend()
      if (childOb) {
        childOb.dep.depend() // 数组的依赖收集
      }
      dep.depend() //收集依赖
      // 这里收集数组的依赖

      return val
    },
    // 发送通知
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      // for (var i = 0; i < dep.length; i++) {
      //   dep[i](newVal, val)  //触发收集到的依赖
      // }
      val = newVal
      dep.notify() // 发送通知
    }
  })
}

/**
 * Observer 类会附加到每一个被侦测的object上
 * 一旦被附加上,Observer会将object的所有属性转换为getter/setter的形式
 * 来手机属性的依赖,并且当属性发生变化时会通知这些依赖
 * 
 */
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
export class Observer {
  vmCount: number; // number of vms that have this object as root $data

  constructor(value) {
    this.value = value
    this.dep = new Dep();//  新增dep,这是数组的dep(依赖) 因为数组的拦截器也在这里
    this.vmCount = 0
    // 在this上读到Observer的实例 ##在拦截中获取Observer实例 
    // 在value上面添加一个不可枚举的属性__ob__,就是observer实例
    // 可以通过数组的__ob__属性.dep 就可以拿到依赖了
    // 也可以标记当前的value是否已经被Observer转换成响应式数据
    // 
    def(value, '__ob__', this)// 
    // 不是数组就规格
    if (Array.isArray(value)) {
      // 覆盖Array.Prototype
      // 通过_proto__今天很巧妙的实现覆盖value原型的功能
      // _proto_其实是Object.getPrototypeOf和Object.setPrototypeOf早期的实现 但是es6支持并不理想
      //  如果不能使用_proto_,就直接将arrayMethods身上的这些方法设置到被监测的数组上面
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)

    }
  }
  /**
   *  walk会将每一个属性都转换成 getter/setter的形式来侦测变化
   *  这个方法只有在数据类型为Object时被调用 
   *  
   */
  walk(obj) {
    const keys = object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], object[keys[i]])
    }
  }
  //侦测Array中的每一项
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
/**
 * object 问题
 * methods:{
 *   action(){
 *      this.obj.name ='ber win'
 *      delete this.obj.name
 *   }
 *
 * }
 * action方法中增加一个name属性,vue js无法检测到这个变化,所以不会想依赖发送通知
 * 删除补发检测到这个变化,所以我们不会想依赖发送通知
 * 解决方法 提供 vm.$set和vm.#delete
 */

function protoAugment(target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

/**
 * 尝试为value创建一个Observer实例
 * 如果创建成功,直接放回新创建的Observer实例
 * 如果value已经存在一个Observer实例,则直接返回它
 */
export function observe(value, asRootData) {
  // 如果是响应式数据,不需要再次创建Observe实例
  // 直接返回 避免重复侦测value的变化

  if (!isObject(value)) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * vm.$set 的用法如下
 * 参数
 * {Object|Array} target
 * {string|number} key
 * {any} value
 * 返回值  {Function} unwatch
 * 用法  在object上设置一个属性 如果object是响应式的,vuejs会保证属性被创建后也是响应式的,并且会触发视图更新
 * 这个方法主要用来避开vue.js不能侦测 属性被加的限制
 * 提供元编程的能力,所以根本无法侦测object什么时候被添加瞭一个新属性
 * 而vm.$set就是为了解决这个问题而出现的。
 * 可以为object新增属性,然后vue,js就可以将这个新增属性转换成响应式的
 * 
 */
/**
 * Array的处理
 * 
 */
export function set(target, key, val) {
  // 
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    /**
     * 如果 target是数组 并且key是一个有效的索引值
     * 就先设置length属性
     * 就先设置length属性
     * 这样如果我们传递的索引值大于当前数组的length,
     * 就需要让target的length等于索引值
     * 数额拦截器会侦测到target发生瞭变化 ,并且val会转会为响应式 
     * 执行 ob.observeArray
     */
    target.length = Math.max(target, length, key);
    target.splice(key, 1, val) // 执行替换
    return val
  }
  /**
   * key 已经存在与target中
   * 在实例上不在原型上
   * 这里可以用 hasOwnProperty来判断
   * 这种情况属于修改数据 直接使用key和val就可以了
   * 所以数据发生变化瞭后,会自动想依赖发送通知
   */

  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  /**
   * 处理新增的属性
   * 获取target的__ob__属性(实例)
   * target.__isVue是不是vue实例
   * ob.vmCount来判断它是不是根数据对象
   * this.$data就是根数据
   */
  const ob = target.__ob__
  if (target.__isVue || (ob && ob.vmCount)) {
    return val
  }
  /**
   * 不是响应式直接设置就可以了
   * 
   */
  if (!ob) {
    target[key] = val
    return val
  }
  /**
   * 增加依赖收集
   * notify发送通知 通知watcher
   */
  defineReactive(ob.value, key.val)
  ob.dep.notify()
  return val
}

/**
 * vm.delete(
 * target:Object|Array, 
 * key:string|number) key/index
 * 作用 删除数据的某个属性
 * 为了发现数据发生了变化
 * 用法 删除对象的属性,如果对象是响应式的,需要确保删除能触发更新视图
 * es6 之前没有办法侦测到一个属性在object中被删除
 * 如果使用delete来删除一个属性
 * vue.js根本不知道这个属性被删除
 */
export function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = target.__ob__;
  if (target.__isVue || (ob && ob.vmCount)) {
    return val
  }
  /**
   * 如果key不是target自身的属性,则终于程序继续执行
   * 
   */
  if (!has(target, key)) {
    return
  }
  delete target[key];
  /**
   * 不是响应式就
   *  如果ob不存在,则直接终止程序
   */
  if(!ob){
    return
  }
  ob.dep.notify()
}
