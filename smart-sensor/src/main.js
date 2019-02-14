import Vue from 'vue'
import App from './App.vue'
import './plugins/chartist'
import i18n from './plugins/i18n'
import './plugins/parse'
import router from './plugins/router'
import store from './plugins/store/store'
import './plugins/vee-validate'
import './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
