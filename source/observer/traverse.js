import { isObject } from "../util"

const seenObjects = new Set()

/**
 * 横 traverse 
 * 递归value的所有子值来触发他们收集的功能
 * 
 */
export function traverse(value: any) {
  _traverse(val, seenObjects)
  seenObjects.clear()
}
/**
 * 看 seen
 * 
 */
function _traverse(val, seen) {
  let i, keys
  const isA = Array.isArray(val) //是否数组
  // 不是数组也不是对象 或者是冻结对象
  if ((!isA && !isObject(val) || Object.isFrozen(val))) {
    return
  }
  // 有observer 实例
  if (val.__ob__) {
    const depId = val.__obj__.dep.id
    // 集合上是否有管家id 
    if (seen.has(depId){
      return
    }
    // 没有就添加管家id
    seen.add(depId)
  }
  // 如果是数组就递归
  if (isA) {
    i = val.length
    while (i--) {
      _traverse(val[i], seen)
    }
  } else {
    // 对象
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      // val[keys[i]]会触发getter 也就是收集依赖的操作 所有的属性都会收集这个watcher
      // 这时候window.target还没有被清空 会将当前的watcher收集进去
      // 这样就可以实现deeo参数来监听所有子值的变化
      _traverse(val[keys[i]], seen)
    }
  }
}
