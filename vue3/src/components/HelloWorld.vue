<template>
  <h1>{{ ohters }}</h1>
  <h1>{{ counter }}</h1>
  <h1>{{ doubleCounter }}</h1>
  <button @click="ohters = '123'">count is: {{ counter }}</button>
  <!-- <piechart>piechart</piechart> -->
  <p ref="desc">123</p>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <TeleportButtom />
  <EmitsComponent @my-click="showValue" />
  <VmodelTest v-model="counter"></VmodelTest>
  <RenderDemo v-model:counter="counter">
    <template v-slot:default>title </template>
    <template v-slot:content>content...{{ doubleCounter }}</template>
  </RenderDemo>
  <VmodelTest v-model:counter="counter"></VmodelTest>
  <com></com>
  <!-- 函数式组件 -->
  <Functional level="1">这是一个动态h元素</Functional>

  <AsyncComp></AsyncComp>
  <TransitionTest></TransitionTest>
  <p v-highlight="'red'">高亮的信息来咯</p>
  <!-- 发送和监听事件 -->
  <button @click="sendMessage">emit event</button>
  <Todos />
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
  h,
  defineAsyncComponent,
} from "vue";
import TeleportButtom from "./teleport.vue";
import EmitsComponent from "./EmitsComponent.vue";
import VmodelTest from "./VmodelTest.vue";
import RenderDemo from "./RenderDemo.vue";
import Functional from "./Functional.vue";
import TransitionTest from "./TransitionTest.vue";
import Todos from "./todos/Todos.vue";
import mitt from "mitt";
export const emitter = mitt();
export default {
  name: "HelloWorld",
  components: {
    TeleportButtom,
    EmitsComponent,
    VmodelTest,
    TransitionTest,
    Functional,
    Todos,
    AsyncComp: defineAsyncComponent(() => import("./Nextpage.vue")),
    RenderDemo: {
      props: {
        counter: {
          type: Number,
          default: 0,
        },
      },
      render() {
        const emit = this.$emit;
        const { counter } = this;
        return h("div", [
          h(
            "div",
            { onClick: this.onClick },
            this.$slots.default(),
            this.$slots.content()
          ),
        ]);
      },
      methods: {
        onClick() {
          console.log("onClick", this.counter + 1);
          this.$emit("update:counter", this.counter + 1);
        },
      },
    },
  },
  props: {
    msg: String,
  },
  setup(props) {
    const { counter, doubleCounter } = useCounter();
    const ohters = ref("message");
    const desc = ref(null);
    watch(
      () => counter.value,
      (newVal, oldVal) => {
        let p = desc.value;
        p.textContent = `${oldVal} to ${newVal}`;
      }
    );
    let showValue = (e) => {
      console.log(e);
    };

    return {
      counter,
      doubleCounter,
      ohters,
      desc,
      showValue,
    };
  },
  methods: {
    sendMessage() {
      emitter.emit("someEvent", "foooo");
    },
  },
};

function useCounter() {
  const data = reactive({
    counter: 2,
    doubleCounter: computed(() => data.counter * 2),
  });
  let timer;
  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
  return { ...toRefs(data) };
}
</script>
