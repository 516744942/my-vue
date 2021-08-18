
<script>
// vue3中函数式组件只能用函数式方法声明
import { h } from "vue";
function Heading(props, context) {
  console.log("context", context);
  return h(`h${props.level}`, context.attrs, context.slots);
}
Heading.props = ["level"]; //静态属性进行申明
console.dir('Heading',Heading)
export default Heading;
/**
 * listeners合并到了 attrs
 */
</script>

<style  scoped>
</style>

