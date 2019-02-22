import Parse from 'parse'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    authenticated: false
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      Parse.User.logIn(email, password)
        .then(() => {
          commit('setAuthenticated', true);
          router.push({ name: "home" });
        })
        .catch(function () {
          commit('setAuthenticated', false);
        });
    },
    logout({ commit }) {
      Parse.User.logOut()
        .then(() => {
          // nothing else
        })
        .catch(function () {
          // nothing else
        });
      commit('setAuthenticated', false);
      router.push({ name: 'login' });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    }
  }
};