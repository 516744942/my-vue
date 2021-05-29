## 1 如何追中变化

Object.defineProperty
ES6和Proxy

### 检测Array的变化侦测
```
  this.list.push(1);
  push方法来改变数组,并不会出发 getter/setter
  Array的原型方法改变数组的内容,所以Object的getter/setter的方法就行不通了
```

