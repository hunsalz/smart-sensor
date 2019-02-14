import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import BME280 from './modules/BME280'
import Device from './modules/Device'
import User from './modules/User'

Vue.use(Vuex)

const STORE_KEY = 'smart-sensor';

const vuexCookie = new VuexPersistence({
  key: STORE_KEY,
  // eslint-disable-next-line no-unused-vars
  restoreState: (key, storage) => Cookies.getJSON(key),
  // eslint-disable-next-line no-unused-vars
  saveState: (key, state, storage) => Cookies.set(key, state, {
    expires: 7 // valid for 7 days
  }),
  modules: ['User']
})

const vuexLocal = new VuexPersistence({
  key: STORE_KEY,
  storage: window.sessionStorage,
  modules: ['BME280', 'Device']
})

const store = new Vuex.Store({
  // eslint-disable-next-line no-undef
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  modules: {
    BME280,
    Device,
    User
  },
  plugins: [vuexCookie.plugin, vuexLocal.plugin]
})

export default store
