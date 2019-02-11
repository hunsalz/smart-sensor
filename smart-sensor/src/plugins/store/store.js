import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Parse from 'parse'
import router from '../router'

import BME280 from './modules/BME280';

Vue.use(Vuex)

const STORAGE_KEY = 'smart-sensor'
const vuexPersist = new VuexPersistence({
  key: STORAGE_KEY,
  storage: window.sessionStorage
})

const store = new Vuex.Store({
  // eslint-disable-next-line no-undef
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    authenticated: false
  },
  modules: {
    //bme280: () => import('./modules/BME280')
    BME280
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
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
  getters: {
    isAuthenticated(state) {
      return state.authenticated
    }
  },
  plugins: [vuexPersist.plugin]
})

export default store
