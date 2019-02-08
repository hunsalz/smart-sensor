import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Parse from 'parse'
import router from '../router'

Vue.use(Vuex)

const STORAGE_KEY = 'smart-sensor'
const vuexPersist = new VuexPersistence({
  key: STORAGE_KEY,
  storage: window.localStorage
})

const store = new Vuex.Store({
  // eslint-disable-next-line no-undef
  strict: process.env.NODE_ENV !== 'production',
  state: {
    authenticated: false,
    devices: [] 
  },
  modules: {
    bme280: () => import('./modules/BME280')
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
    setBME280(state, bme280) {
      state.bme280.device = bme280.device;
      state.bme280.temperature = bme280.temperature;
    }
  },
  actions: {
    userLogin({ commit }, { email, password }) {
      // eslint-disable-next-line no-console
      console.log('userLogin called', commit, email, password);

      Parse.User.logIn(email, password)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log("Login successful.");

          commit('setAuthenticated', true);
          router.push({ name: "home" });
        })
        .catch(function (e) {
          // eslint-disable-next-line no-console
          console.error("Login failed:", e);

          commit('setAuthenticated', false);
        });
    },
    userLogout({ commit }) {
      // eslint-disable-next-line no-console
      console.log('userLogout called', commit);

      Parse.User.logOut()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log("Logout successful.");
        })
        .catch(function (e) {
          // eslint-disable-next-line no-console
          console.error("Logout failed:", e);
        });
      commit('setAuthenticated', false);
      router.push({ name: 'login' });
    },
    first({ commit }, { device }) {

      // eslint-disable-next-line no-console
      console.log('first called', commit, device);


      commit('setBME280', {device: 'ESP-000023f09d', temperature: 23.4});
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated
    }
  },
  plugins: [vuexPersist.plugin]
})

export default store
