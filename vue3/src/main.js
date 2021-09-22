import { createApp, createRenderer, h, render } from 'vue'
import App from './App.vue'
import './index.css'
import CanvasApp from './CanvasApp.vue'
import EditTodo from './components/todos/EditTodo.vue';
createApp(App)
  .component('com', {
    render() {
      return h('div', 'I am comp')
    }
  })
  .component('EditTodo', EditTodo)
  .directive('highlight', {
    beforeMount(el, binding, vnode) {
      el.style.background = binding.value
    }
  })
  .mount('#app')


/**
 *
// 自定义渲染器
const nodeOps = {
  createElement(tag) {
    // 处理元素创建逻辑
    return {
      tag
    }
  },
  insert(child, parent, anchor) {
    // 处理元素的插入逻辑
    // 1.如果是子元素,不是真实dom,此时只需要将数据保存到前面虚拟对象上即可
    child.parent = parent
    if (!parent.childs) {
      parent.childs = [child]
    } else {
      parent.childs.push(child)
    }
    // 2. 如果是真实dom元素,在这里会是canvas,需要绘制
    if (parent.nodeType == 1) {
      draw(child)
      // 事件处理
      if (child.onClick) {
        canvas.addEventListener('click', () => {
          child.onClick();
          setTimeout(() => {
            draw(child)
          }, 0);
        })
      }
    }

    // 2.
    return
  },
  remove: () => { },
  createText: text => { },
  createComment: text => { },
  setText: (node, text) => { },
  setElementText: (el, text) => { },
  parentNode: node => { },
  nextSibling: node => { },
  querySelector: selector => { },
  setScopeId(el, id) { },
  insertStaticContent(content, parent, anchor, isSVG) { },
  patchProp(el, key, prevValue, nextValue) {
    // 属性的更新
    el[key] = nextValue
  }
}
const renderer = createRenderer(nodeOps)
// const app = renderer.createApp(CanvasApp)

// 绘制方法： el就是自元素
const draw = (el, noClear) => {
  if (!noClear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  if (el.tag == 'piechart') {
  }
}


let ctx, canvas

// 扩展mount: 首先创建一个画布元素
function createCanvasApp(App) {
  const app = render.createApp(App)
  const mount = aoo.mount
  app.mount = function (selector) {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d');
    canvas.width = 600
    canvas.height = 600
    document.querySelector(selector).appendChild(canvas);
    mount(canvas)
  }

}
createCanvasApp(CanvasApp).mount('#demo')

 */
