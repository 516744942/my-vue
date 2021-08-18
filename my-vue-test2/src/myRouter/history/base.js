import { createRoute } from '../util/route';

export default class History {
  constructor(router) {
    this.router = router;
    // 默认 路由中 应该保存一个当前的路径,后续会更改这个路径

    this.current = {
      path: '/',
      matched: []
    }
  };
  /**
   * location 当前跳转的目的地
   * complete 当前跳转成功后执行的方法
   */

  /**
   *  {
   *   path :'/about/a',
   *   matched:['about',about]
   * }
   */

  transitionTo(location, onComplete) {
    this.router.math(location); //我要用当前路径  找出对应的记录
    onComplete && onComplete()
  }
}