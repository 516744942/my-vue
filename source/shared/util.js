export function isObject(obj: mixed) {
  // 不是null类型 是对象类型
  return obj !== null && typeof obj === 'object'
}

/**
 * 检查Val是否是有效的数组索引。
 */
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function isDef(v) {
  return v != undefined && v != null
}

export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * remove方法将vm从parent.$children中删除了
 * 其中remove方法的实现原理如下
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}