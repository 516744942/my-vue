/**
 * 什么是vnode
 * 使用它可以实例化不同类型的vnode实例
 * 而不同的实例各自表示不同类型的DOM元素
 * 
 */
/**
 * Vnode本质是一个普通的对象
 * 是从Vnode类实例化的对象,我们用这个javaScript对象来描述一个真实DOm元素的话
 * 那么该DOM元素上的所有属性在VNode这个对象上都村子啊对应的属性
 */
/**
 * vnode可以理解成节点描述对象
 * 描述了应该怎么去创建真实的DOM节点
 * 所有的真实的DOM节点都使用vnode创建并插入到页面中
 * vnode(create)->DOm(insert)->视图
 * 
 */
/**
 * 作用
 * 由于每次渲染试图都是先创建vnode
 * vnode和试图是一一对应的
 * 每次渲染视图都是先创建vnode
 * 然后使用它创建真实DOM到页面中,所以可以将上一次渲染视图所创建的vnode缓存起来
 * 之后每当重新渲染试图时,将新创建的vnode和上一次缓存的vnode进行对比
 * 查看它们之间有哪些不一样的地方并给予此去修改真是的DOM
 * 
 * 
 */
/**
 * 目前状态的侦测策略采用瞭中等粒度
 * 当状态发生变化时,只通知到组件级别,
 * 然后组建内使用虚拟DOM来渲染视图
 * 当某个状态发生改变时,只通知使用了这个状态的组件
 * 也就是说,只要组建使用的众多状态中有一个发生了变化,那么整个组建就要重新渲染
 * 如果组件只有一个节点发生瞭变化,那么重新渲染整个组建的所有节点,
 * 很明显会草成很大的性能浪费，因此,对vnode进行缓存,并将上一次缓存的vnode和当前新创建的vnode进行对比,
 * 只更新发生变化的节点就变得尤为重要,这也是vnode最重要的一个作用
 * 
 */
/**
 * Vnode的类型(tag)
 * 
 * 注释节点
 * 文本节点
 * 元素节点
 * 组件节点
 * 函数式组件
 * 克隆节点
 * 
 * 不同节点之间有效属性不同
 * 准确地说是有效属性不同
 * 使用VNode类创建一个vnode时,通过参数为实例设置属性时,
 * 无效的属性会默认被赋值为undefined或false,
 * 对于vnode身上的无效属性,直接忽略就好
 * 接下来,我们详细讨论这些类型的vnode都有哪些有效属性
 * 
 */

/**
 *   注释节点
 */
export const createEmptyVnode = text => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
/**
 * 注释节点
 *  <!- 注释节点  -->
 *  {
 *    text:'注释节点',
 *    isComment:true 
 *  }
 */
/**
 * 文本节点
 * 只有一个text属性
 * {
 *   text:"hello Barwin"
 * }
 * 
 */
 export function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

/**
 * 克隆节点
 * 克隆节点是将现有节点的属性复制到新节点中
 * 让创建的节点和被克隆节点的属性保持一致
 * 从而实现克隆效果
 * 它的作用是优化静态节点和插槽节点(slot node)
 * 已静态节点为列,当组件内的某个状态发生变化后,当前组建会通过虚拟DOM重新渲染试图
 * 静态节点因为他的内容不会改变,所以除了首次渲染许哟啊执行许阿然函数获取vnode之外,
 * 后续不需要执行渲染函数重新生成vnode
 * 因此这时候就会使用创建克隆节点的方法将vnode克隆一份,使用克隆节点进行渲染
 * 这样就不需要重新执行渲染函数生成的新的静态节点的vnode,从而提升一定程度的性能
 * 唯一的区别是isClone属性,克隆节点怼isCloned 为true  被克隆的原始节点的isCloned为false
 */
export function cloneVNode(vnode) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}

/**
 * 元素节点
 * tag: tag就是一个节点的名称 p、ul、li、div
 * data: 属性  
 * children:当前节点的子节点
 * context: 当前组建的vue.js实例
 */

/**
 * 组件节点
 * 和元素即节点类似,
 * 有一下两个独有的属性
 * componentOptions： 就是组件节点的选项参数, 其中包含propsData、tag和children
 * componentInstance: 组件的实例, 每个组件都是一个vue.js实例
 * {
 * componentOptions：:{...}
 * componentInstance:{...}
 * context:{...}
 * data:{...}
 * tag:"vue-component-1-children"
 * }
 */
/**
 * 函数式组件
 * functionalContext
 * functionalOptions
 * {
 * functionalContext
 * functionalOptions
 *   context:{...}
 * data:{...}
 * tag:"vue-component-1-children"
 * }
 */

export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child(): Component | void {
    return this.componentInstance
  }
}