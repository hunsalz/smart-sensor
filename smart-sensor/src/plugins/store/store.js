import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import BME280 from './modules/BME280'
import User from './modules/User'

Vue.use(Vuex)

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) => Cookies.set(key, state, {
    expires: 3
  }),
  modules: ['User']
})

const vuexLocal= new VuexPersistence({
  key: 'smart-sensor',
  storage: window.sessionStorage,
  modules: ['BME280']
})

const store = new Vuex.Store({
  // eslint-disable-next-line no-undef
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  modules: {
    User,
    BME280
  },
  mutations: {

  },
  actions: {
    queryDevices({ commit }) {

      // Parse.Cloud.run("getBME280Devices")
      //   .then(function(results) {
      //     console.log(results);
      //   })
      //   .catch(function(error) {
      //     console.error(error);
      //   }); 
    }
  },
  plugins: [vuexCookie.plugin, vuexLocal.plugin]
})

export default store
