import Vue from "vue";

// component imports
import "./components";

// plugin imports
import "./plugins";

// application imports
import App from "./App";
import i18n from "@/i18n";
import router from "@/router";
import store from "@/store";

Vue.prototype.$eventHub = new Vue(); // global event bus

// service worker
import "./registerServiceWorker";

Vue.config.productionTip = process.env.NODE_ENV !== "production";

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
