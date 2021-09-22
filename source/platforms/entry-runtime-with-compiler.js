/**
 * vm.$mount
 * 我们不用这个方法,原因是如果在实例化Vue.js时设置了el选项,会自动把vue.js实例挂载到DOM元素上
 * 因为无论我们在实例化vue.js时是否设置了el选项,想让Vue.js实例具有相关的DOM元素,只有使用vm.$mount方法这一种途径
 * 想让vue.js实例具有关联的DOM元素,只有使用vm.$mount方法这一种途径
 */
/**
 * 使用
 * vm.$mount([elementOrSelector])
 * 返回值:vm,即实例自身
 * 用法: vue.js 如果vue.js实例化没有收到el选项,贼它处于未挂载状态,
 * 没有关联的DOM元素,我们可以使用vm.$mount手动挂载一个未加载的实例
 * 如果没有提供elementOrSelector参数
 * 模板江北渲染为文档之外的元素,并且必须使用原生DOM的API把他插入文档中。
 * 这个方法返回实例自身,因为可以链式调用其他实例方法
 */

import { query } from "./util"

/**
 * 示例
 */
var myComponent = vue.extend({
  template: '<div>Hello!</div>'
})
// 创建并挂载到#app(会替换#app);
new myComponent().$mount('#app')
// 创建并在到#app(会替换#app)
new myComponent({ el: '#app' })
// 或者,在文档之外渲染并且随后挂载
var component = new myComponent().$mount()
document.getElementById('app').append(component.$el);

/**
 * 完整版本 vue.js 和包含运行时版本(vue.runtime.js)
 * 完整版本和运行版本之间的差异在于是否有编译器
 * 而编译器的的差异主要在于vm.$mount方法的表现形式
 * 
 */
/**
 * 完整版本
 * 首先会检查template 或者el选项所 提供的模板是否已经转换成渲染函数(render函数)
 * 没有如果则立即进入编译过程
 * 将模板编译成渲染函数
 * 完成之后再进入挂载与渲染的流程中
 */
/**
 * 包含运行时vm.$mount没有贬义步骤
 * 它会默认实例上已经存在渲染函数,如果没有则会设置一个,并且这个渲染函数在执行时 会返回一个空节点的VNode
 * 以保证执行时 不会因为函数不存在而保存
 * 如果在开发环境 vue.js会警告，提示我们当前使用的是只包含运行时版本,会让我们提供渲染函数,或者去使用完整构建版
 * 
 */
/**
 * 1. 完整版vm.$mount的实现原理
 * 
 */
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el) {
  el = el && query(el)
  /**
   * 是否存在渲染函数,
   * 只有不存在时,才会将模板编译成渲染函数
   * 如果给出了render选项,那么 template其实是无效的,因为不会进入模板编译的流程
   * 而是直接使用render选项中提供的渲染函数赋值给render选项
   */
  const options = this.$options
  if (!options.render) {
    // 将模板编译成渲染函数并赋值给options.render
    let template = options.template
    if (template) {
      // 做些什么
      /**
       * template 选项可以直接设置成字符串模板,也可以设置为以#开头的选择符
       * 还可以设置成DOM元素
       * 
       */
      if (template) {
        /**
           * 如果是template选项的类型不是字符串
           * 则判断它是否是一个DOM元素
           * 如果是,则使用DOM元素的innerHTML作为模板
           * 如果不是,值需要判断它是否具备nodeType属性即可
        */
        if (typeof template === 'string') {
          if (template.charAt(0) === '#') {
            template = idToTemplate(template)
          }
        } else if (template.nodeType) {

          template = template.innerHTML
        } else {
          return this
        }
      }

    } else if (el) {
      /**
       * 如果没有设置template选项
       * 那么使用getOuterHTML方法从用户提供的el的选项中获取模板
       * 
       */
      template = getOuterHTML(el)
    }
    // 新增编译相关逻辑
    if (template) {
      const { render } = compileToFunction(
        template,
        // {...},
        this,
      )
      options.render = render
    }
  }


  return mount.call(this, el)
}

/**
 * 在上面的代码中,我们将Vue原型上的$mount方法保存在mount中
 * 以便后续使用,然后再Vue原型上的$被一个新的方法覆盖了,新方法中会原始的方法,这种做法通常被称为函数劫持
 * vm.$mount的原始方法就是mount的核心功能,而在完整版中需要将编译功能新增到核心功能上去
 */






/**
 * getOuterHTML方法的实现如下
 */
function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

function idToTemplate(id) {
  const el = query(id)
  return el && el.innerHTML
}