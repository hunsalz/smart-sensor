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
    [GETTERS.getPanels]: state => () => {
      // workaround for occuring mutations during v-expansion-panel unregister caused by two-way v-model binding of array
      return state.panels.slice();
    }
  },
  mutations: {
    [MUTATIONS.setPanels](state, panels) {
      state.panels = panels;
    }
  }
};
