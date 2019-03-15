export const GETTERS = {
  getPanels: "getPanels"
};

export const MUTATIONS = {
  setPanels: "setPanels"
};

export default {
  namespaced: true,
  state: {
    panels: []
  },
  getters: {
    [GETTERS.getPanels]: state => {
      // TODO: workaround - return a copy to avoid vuex mutation errors while array is used for two-way v-model binding; vuex stated error in strict mode when leaving page
      return state.panels.slice();
    }
  },
  mutations: {
    [MUTATIONS.setPanels](state, panels) {
      state.panels = panels;
    }
  }
};
