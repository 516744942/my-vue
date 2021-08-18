export function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // 将用户传入的数据  进行格式化

  let pathList = oldPathList || []
  let pathMap = oldPathMap || Object.create(null);
  let nameMap = oldNameMap || Object.create(null);
  routes.forEach(route => {
    // 添加路由记录
    addRouteRecord(pathList, pathMap, nameMap, route)
  });
  console.log(pathList)
  return {
    pathList,
    pathMap,
    nameMap
  }
}


function addRouteRecord(
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  // matchAs
) {
  console.log('parent.pathparent.pathparent.path', parent)
  parent ? parent.path = parent.path.replace(/\/$/, '') : ''
  let path = parent ? `${parent.path}/${route.path}` : route.path;
  const record = {
    path,
    component: route.component || { default: route.component }
  }
  console.log('path',path)
  if (!pathMap[path]) {
    pathList.push(path)   // 将路由添加到path
    pathList[path] = record;
  }
  console.log('pathList',pathList)
  
  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(pathList, pathMap, nameMap, child, record)
    })
  }

}