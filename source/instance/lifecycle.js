export function lifecycleMixin() {

  /**
   * 作用是迫使Vue.js实例从新渲染
   * 注意他仅仅影响 实例本身以及插入插槽内容的子组件,而不是所有子组件
   * 我们只需要执行实例watcher的update方法,就可以让实例重新渲染
   * 
   */
  Vue.prototype.$forceUpdate = function () {
    const vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  }

  /**
   * 他会清理该实例与其他实例的连接
   * 并解绑其 全部指令及监听器
   * 同时会触发beforeDestroy和destroy的钩子函数
   * 大部分时候不需要使用
   * 使用v-if 或者v-for 即可
   * 
   */
  Vue.prototype.$destroy = function () {
    const vm = this;
    /**
     * 为了防止vm.destroy被重复使用
     * 
     */
    if (vm.isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    /**
     * 首先
     * 我们 需要清理当前组件与父组件之间的连接
     * 组件就是Vue.js 的实例
     * 所以要清理当前组件与伏组件之间的连接
     * 只需要将当前组件实例从父组件实例的$children属性中删除即可
     * 
     */
    const parent = vm.$parent
    /**
     * 1.如果当前实例有父级
     * 2.父组件没有被销毁
     * 3.不是抽象组件
     * 那么将自己从父级的子级别列表中删除
     * 也就是将自己从父级的¥children属性中删除
     * 
     */
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    /**
     * 销毁实例上的所有watcher 
     * 将所有依赖追踪断掉
     */
    if(vm._watcher){
      vm._watcher.teardown()
    }
    /**
     * 问题
     * 如何知道用户创建了多少个watcher?
     * 在初始化的时候,在this上添加一个_watchers属性
     * 每当用户添加watcher实例时,都会将watcher实例添加
     *
     */
  }

}