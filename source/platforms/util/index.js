/**
 * 这里我们使用query获取DOM元素,其实现方式如下
 * 上面的代码对el进行类别判断
 * 
 */

export function query (el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
/**
 * 
 */
