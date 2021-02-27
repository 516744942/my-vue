// const obj = {}
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}:${val}`);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal
        // update()
      }
    }
  })
}
function set(obj, key, val) {
  defineReactive(...arguments)
}
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
// defineReactive(obj, 'foo', '')
// obj.foo = new Date().toLocaleTimeString()
const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
observe(obj)
set(obj, 'dong', 'dong')
console.log('obj', obj.dong);
// function update() {
//   app.innerText = obj.foo
// }
// setInterval(() => {
//   obj.foo = new Date().toLocaleTimeString()
//   console.log(obj.foo)
// }, 1000);