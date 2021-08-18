export let _Vue
export function install(Vue) {
  _Vue =Vue
  //   在所有组件上 都增加了 _routerRoot 根实例
  //   执行了根实例的方法
  Vue.mixin({
    beforeCreate(){
      if(this.$options.router){ //根实例
        console.log('this.$options.routerthis.$options.routerthis.$options.router',this.$options.router)
        this._routerRoot = this;
        this._router  = this.$options.router
        console.log(' this._router', this._router)
        this._router.init(this) /* Vue component instance */
      }else{
        this._routerRoot =this.$parent&& this.$parent._routerRoot //子组件 
      }
    }   
  })
}