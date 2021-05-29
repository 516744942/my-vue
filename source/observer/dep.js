let uid = 0
export default class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub: Watcher) {
    remove(this.subs, sub)
  }

  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (var i = 0; i < subs.length; i++) {
      subs[i].upDate()
    }
  }
}
/**
 * 在watcher数组this.subs中找到这个 watch 
 * 根据索引移出
 */

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}