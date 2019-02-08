import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Parse from 'parse'
import router from './router'

Vue.use(Vuex)

const STORAGE_KEY = 'smart-sensor'
const vuexPersist = new VuexPersistence({
  key: STORAGE_KEY,
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    setAuthenticated (state, payload) {
      state.authenticated = payload
    }
  },
  actions: {
    userLogin ({ commit }, { email, password }) {
      // eslint-disable-next-line no-console
      console.log('userLogin called', commit, email, password)

      // set up Parse
      Parse.initialize(
        '1IFq8uk57NzXVMvzb1EYtytchOCj4OEUMyCawK1a',
        'jtl8Wgy2RajOIMqxlQjuAjJFqfZoMLLlL5yLWooY'
      )
      Parse.serverURL = 'https://smart-sensor.back4app.io'
      Parse.liveQueryServerURL = 'wss://smart-sensor.back4app.io'

      // Parse.User.logIn(email, password)
      //     .then(() => {

      //         console.log("Login successful.");

      //         commit('setAuthenticated', true);
      //         router.push({ name: "home" });
      //     })
      //     .catch(function (e) {

      //         console.error("Login failed:", e);

      //         commit('setAuthenticated', false);
      //     });

      commit('setAuthenticated', true)
      router.push({ name: 'home' })
    },
    userLogout ({ commit }) {
      // TODO
      // eslint-disable-next-line no-console
      console.log('logout')
      commit('setAuthenticated', false)
      router.push({ name: 'login' })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.authenticated
    }
  },
  plugins: [vuexPersist.plugin]
})

export default store
