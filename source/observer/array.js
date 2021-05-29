/**
 * 如何追踪变化
 * 使用push操作数组的时候可以得到通知,就能实现同样的目的
 * 覆盖原声的原型方法
 * 用一个拦截器覆盖Array.prototype
 * 执行数组方法的时候
 * 其实都是执行原型中的方法
 * 比如push
 * 
 * 
 */

/**
 * 拦截器
 * 就是一个和Array.prototype一样的object
 * 某些改变数组自身的内容的方法是我们处理过的
 * 7个 方法 push、pop、shift、unshift、splice、sort、resolve
 * 
 */
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
  ;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
  ].forEach(function (method) {
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
      value: function mutator(...args) {
        // ..args 数组参数
        // mutator中执行的 original是原生的Array.prototype上的方法
        // 这里可以发送通知
        const result = original.apply(this, args)
        // 如果是Array拦截器,所以可以直接通过this.__obj__来访问observer实例
        const ob = this.__ob__
        /**
         * 新增数组的方法,检测新增元素的变化
         * push unshift splice
         * 则把参数中新增的元素拿过来,用Observer来侦测
         */
        let inserted
        switch (method) {
          case 'push':
            break;
          case 'unshift':
            inserted = args
            break;
          case 'case':
            // splice(替换,删除的个数,替换的元素) 2以后的元素
            inserted = args.slice(2) 
            break;
          default:
        }
        if(inserted) ob.observeArray(inserted) //来检测这些新增元素的变化

        ob.dep.notify() //像依赖发送消息
        return result
      },
      enumerable: false,
      writable: true,
      configurable: true
    })
  })

  /**
   * 问题
   * this.list[0] = 2 拦截不到 不会出发 render或者watch
   * this.list.length = 0 不会 render或者watch
   * es6 proxy实现这部分功能,从而解决了这个问题
   */

  /**
   * 总结
   * 和Object不一样。它是通过方法来改变内容的
   * 通过拦截器来追踪变化
   * 为了不污染全局  __proto__来覆盖原型方法
   * 不支持 __proto__直接顺换拦截,把拦截器方法直接设置到数组身上来拦截Array.prototype上的原声方法
   * 收集依赖一样 在getter中收集
   * 因为数组要在拦截器中向依赖发消息
   * 所以依赖不能像Object那样保存在defineReactive中,
   * 而是吧依赖保存在了Object实例上
   * 每个检测的数据都标记了 __ob__(observer实例)
   * 两个作用  
   * 1 标记数组是否被侦测了变化(只被侦测一次)
   * 2 可以很方便地通过数据取到__ob__,Observer实例
   * 数组调用observeArray方法将数组中的每一个元素都转换成响应式并侦测变化
   * push unshift splice方法从参数中将新增数组提取出来、然后使用observeArray对新增数据进行变化侦测
   * 不能清空数组特有的语法、使用length清空数组的操作就无法拦截
   * 
   */