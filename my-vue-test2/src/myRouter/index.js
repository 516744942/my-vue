import { install } from "./install";
import { createMatcher } from "./util/create-matcher";
import { HashHistory } from './history/hash'

export default class FengVueRouter {
  static install

  constructor(options) {
    console.log('options', options)
    // 1什么叫路由,根据不同的路径跳转不同的组件
    // match 负责匹配路径 {'/':'记录','abput':'记录'}
    // 将用户传递的routes 转换为更好维护的结构

    // match 负责匹配路径 
    // addRoutes 动态添加路由配置
    this.matcher = createMatcher(options.routes)

    // 创建路由系统
    let mode = options.mode || 'hash';
    this.history = new hashHistory(this);


  }
  init(app /* Vue component instance */) {
    //  如何初始化 先根据当前路径  显示到指定  组件
    const history = this.history;
    const setupListeners = () => {
        history.setup()
    }
    history.transitionTo(
      history.getCurrentLocation(),
      setupListeners
    )
  }
  math(location){
    return this.matcher.match()
  }
}

FengVueRouter.install = install