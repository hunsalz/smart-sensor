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
      // eslint-disable-next-line no-console
      console.log('login called', commit, email, password);

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
    logout({ commit }) {
      // eslint-disable-next-line no-console
      console.log('logout called', commit);

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
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    }
  }
};