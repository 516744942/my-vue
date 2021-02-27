export default function (obj) {
  console.log(obj)
  // ···
}

export function each(obj, iterator, context) {
  console.log(obj)
  // ···
}

export { each as forEach };