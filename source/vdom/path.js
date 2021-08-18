/**
 * path本身就有补丁、修补等意思
 * 其实际作用是在现有DOM上进行修改来实现更新视图的节点进行更新
 * 
 * 使用的原因,DOM操作的执行速度远不如JavaScript的运算速度快
 * 把大量的DOM操作搬运到JavaScript中
 * 使用patching算法来计算出真正需要更新的节点 最大限度的减少DOM操作,从而提升性能,
 * 本质是是用JavaScript的运算正本来替换Dom操作的成本
 * 
 */

import { isDef } from "../shared/util";

/**
 * pathch介绍
 * 手段:对比两个vnode之间的差异只是patch的一部分
 * 目的 修改DOm节点,也可以理解为渲染视图,  
 * 不是替换,是对DOM上进行修改来达到渲染视图的目的
 * 对现有DOM进行修改需要做三件事
 */
/**
 * patch对现有DOm进行修改需要做三件事
 * 
 * 创建新增的节点
 * 删除已经废弃的节点
 * 修改需要更新的节点
 */

/**
 * patch算法是为了性能考虑的
 * 最新的vnode来创建的,而不是oldVnode
 * 
 */

/**
 * 1 新增节点
 * 1.1 oldVnode 不存在 而vnode存在时
 * 1.2 vnode和oldVnode完全不是同一个节点时,需要使用vnode生成真是的DOM元素并将其插入到视图当中
 */

/**
 * 首次渲染,使用vnode直接 创建和渲染
 */

/**
 * 删除节点
 * oldVnode存在,vnode中不存在的节点
 * 节点不同时,先插入旧节点旁边,然后再将旧节点删除,从而完成替换过程
 */

/**
 * 更新节点
 * 两个新旧节点是同一个节点。
 * 当新旧两个接地那是相同的节点时,
 * 我们需要对这两个节点进行比较细致的比对,
 * 然后对oldVnode在视图中对应的真实节点进行更新
 * 都是文本节点,但是对应的内容不一样,我们需要重新设置oldVnode在视图中所对应的真实Dom节点的文本
 * 
 */
/**
 * 更新节点 
 * 静态节点
 * <p>静态节点</p>
 * 
 */
/**
 * 新虚拟节点有文本属性
 * 是否有text属性(文本节点)
 * 新生成的vnode 有text属性 不管是什么节点 直接调用setTextContent方法(浏览器是node.textContent)
 * 
 */
/**
 * 新虚拟节点无文本属性
 * 如果新创建的虚拟节点 没有text属性,那么它就有一个元素节点
 * 元素即诶单, 那么元素节点通常会有自节点，也就是children属性,也有可能没有自节点,所以存在两种不同的情况
 * 1. 有children的情况
 *  
 * 
 * 2.无children的情况
 *  没有text属性 有饿没有children属性时,
 */

/**
 * 创建节点
 * 创建到渲染的整个过程
 * 三种会被创建并传入到DOM中,元素节点,注释节点和文本节点
 * 元素节点,是否具有tag属性,在对应环境下走createElement方法
 * 渲染到视图: 当前环境下的appendChild方法(浏览器环境下就调用parentNode.appendChild)来创建真实的dom
 * 创建子节点并插入到改节点下面(递归的过程)
 * 创建节点->创建元素节点->创建子节点->插入到parentNode中
 */


/**
 * 删除节点
 * 删除虚拟dom数组中 从startIdx索引开始endIdx指定位置的内容
 * 用于删除一组指定的节点
 * 
 */
 function removeVnodes(vnodes, startIdx, endIdx) {
  for (; startIdx < endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    if (isDef(ch)) {
      removeNode(ch.elm)
    }
  }
}
/**
 *  更新节点
 *  vnode 是否相等 
 *  是否静态属性
 *  是否有text属性
 *  有  是否相同  否  把新的node.text渲染出来
 *  否  是否有children 
 *      没有  oldVnode是否有子节点 
 *           有 清空
 *           没有 有文本  清空DOM
 *     有   oldVnode是否有子节点
 *          否  oldVnode 有文本  
 *                有 清空
 *                没有 有文本  清空DOM
 *          有   不相同  更新
 *             
 * 
 */

/**
 * 更新有4种 更新节点、新增节点、删除节点、 移动节点
 * 
 */
/**
 * 1. 创建节点   放在未处理前面(为什么 因为多个)
 * 2. 更新子节点 本质 同事存在 newChildren和oldChildren中
 * 3. 移动子节点 同一个节点但是,但位置不同 通过node.insertBefore()方法
 *    方法从左到右循环newChildren  移动到未处理节点的最前面
 * 4. 删除子节点 oldChildren有  newChildren 没有 newChildren循环一边后 oldChildren还有没有处理的 都是可以删除的
 */

/**
 * 优化策略 
 * 位置是不变的节点,那么这些节点就不需要循环来查找
 * newStartIndex  oldStartIndex   newEndIndex  oldEndIndex
 * 新前 与 旧前    
 * 新后 与 旧后
 * 新后 与 旧前
 * 新前 与 旧后
 */
/**
 * 未处理的节点
 * 由于优化策略 两边像中间
 * oldStartIdx 和newStartIdx 像右移动
 * oldStartIdx 和 oldEndIdx 像左移动
 * while(oldStartIndx<=oldEndIdx&&newStartIdx<=newEndIdx){
 * 
 * }
 * new和 old只要有一个循环完毕 就会退出循环
 * old 多 则删除未处理节点
 * new 多 则添加未处理节点
 */

/**
 * nodeOps是对节点操作的封装
 * 为什么 不使用parent.removeChild(child)删除节点
 * 涉及跨平台的知识,阿里开发的Weex可以让我们使用相同的组件模型为IOS和Android编写原生渲染的应用
 * 
 */
const nodeOps ={
  removeChild(node,child){
    node.removeChild(child)
  }
}
/**
 * 用于删除试图中的单个节点
 * 
 * 
 */

function removeNode(el) {
  const parent = nodeOps.parentNode(el)
  // element may have already been removed due to v-html / v-text
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el)
  }
}