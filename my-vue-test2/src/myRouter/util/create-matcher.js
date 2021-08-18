import { createRouteMap } from "./create-route-map";
export function createMatcher(routes) {
  // routes 用户当前传入的配置
  //  扁平化用户传入的数据 创建路由映射方法

  // pathList =['/about','about/a']
  // {/:记录,/about:记录}
  let { pathList, pathMap, nameMap } = createRouteMap(routes);
  console.log(pathList,  nameMap)
  console.log('pathMappathMap',pathMap)
  //  用来匹配的方法
  function match() {

  }

  // 动态添加的方法
  function addRoutes(routes) {
    let { pathList, pathMap, nameMap } = createRouteMap(routes, pathList, pathMap, nameMap);
  }
  // 用来匹配的放啊
  function match(location) {  
      // 找到当前的记录
      // 1.需要找到对应的记录,并且要根据记录产生一个匹配数据
  }

  return {
    match,
    addRoutes
  }
}