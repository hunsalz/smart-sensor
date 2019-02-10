import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Parse from 'parse'
import router from '../router'

Vue.use(Vuex)

const STORAGE_KEY = 'smart-sensor'
const vuexPersist = new VuexPersistence({
  key: STORAGE_KEY,
  storage: window.sessionStorage
})

const store = new Vuex.Store({
  // eslint-disable-next-line no-undef
  strict: process.env.NODE_ENV !== 'production',
  state: {
    authenticated: false
  },
  modules: {
    bme280: () => import('./modules/BME280')
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
    setBME280(state, bme280) {
      if (bme280) {
        state[bme280.get('device')] = bme280.attributes;
      }
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
    async queryDevices({ commit }) {

      // Parse.Cloud.run("getBME280Devices")
      //   .then(function(results) {
      //     console.log(results);
      //   })
      //   .catch(function(error) {
      //     console.error(error);
      //   }); 
    },
    async getCurrentBME280EntryByDevice({ commit }, device) {

      // build query to fetch last BME280 entry of according device
      const BME280 = Parse.Object.extend("BME280");
      const query = new Parse.Query(BME280);
      if (device) {
        query.equalTo("device", device);
      }
      query.descending("createdAt");
      // query data
      query
        .first()
        .then(bme280 => {
          commit("setBME280", bme280);
        })
        .then(() => {
          // subsrcibe to newer values too
          query.subscribe().on("create", bme280 => {
            commit("setBME280", bme280);
          });
        }),
        error => {
          // eslint-disable-next-line no-console
          console.error("Query BME280 entries failed.", error);

          // TODO -> loqout
        };

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
