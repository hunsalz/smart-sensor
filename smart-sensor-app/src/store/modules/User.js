import Parse from 'parse'
import router from '@/router'

export const ACTIONS = {
  login: 'login',
  logout: 'logout'
}

export const GETTERS = {
  isAuthenticated: 'isAuthenticated'
}

export const MUTATIONS = {
  setAuthenticated: 'setAuthenticated'
}

export default {
  namespaced: true,
  state: {
    authenticated: false
  },
  actions: {
    [ACTIONS.login]({ commit }, { email, password }) {
      Parse.User.logIn(email, password)
        .then(() => {
          commit(MUTATIONS.setAuthenticated, true);
          router.push({ name: "home" });
        })
        .catch(function () {
          commit(MUTATIONS.setAuthenticated, false);
        });
    },
    [ACTIONS.logout]({ commit }) {
      Parse.User.logOut()
        .then(() => {
          // nothing else
        })
        .catch(function () {
          // nothing else
        });
      commit(MUTATIONS.setAuthenticated, false);
      router.push({ name: 'login' });
    }
  },
  getters: {
    [GETTERS.isAuthenticated](state) {
      return state.authenticated;
    }
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    }
  }
};