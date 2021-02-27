import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './kstore'

// import store from "./store";
import create from './utils/create'
Vue.use(create)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
