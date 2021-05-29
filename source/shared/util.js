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