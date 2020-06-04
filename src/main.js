import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
document.title = "反算求值";
new Vue({
  render: (h) => h(App),
}).$mount("#app");
