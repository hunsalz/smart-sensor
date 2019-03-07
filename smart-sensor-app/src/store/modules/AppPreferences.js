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
      return state.panels;
    }
  },
  mutations: {
    [MUTATIONS.setPanels](state, panels) {
      state.panels = panels;
    }
  }
};
