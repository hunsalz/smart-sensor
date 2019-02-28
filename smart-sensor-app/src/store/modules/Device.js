import Parse from 'parse'

const DEVICE = Parse.Object.extend("Device"); // declare Device subclass

export const ACTIONS = {
  loadDevices: 'loadDevices',
  saveDevices: 'saveDevices'
}

export const GETTERS = {
  getDevices: 'getDevices'
}

export const MUTATIONS = {
  setDevices: 'setDevices'
}

export default {
  namespaced: true,
  state: {
    devices: []
  },
  actions: {
    [ACTIONS.loadDevices]({ commit }) {

      // try to fetch all devices
      const query = new Parse.Query(DEVICE);
      query.find()
        .then(results => {
          let devices = [];
          results.forEach(e => {
            devices.push(e.attributes);
          });
          commit(MUTATIONS.setDevices, devices);
        })
      error => {
        // eslint-disable-next-line no-console
        console.error("Query " + DEVICE + " entries failed.", error);

        // TODO -> logout
      };
    },
    [ACTIONS.saveDevices]({ commit }, { devices }) {
    }
  },
  getters: {
    [GETTERS.getDevices]: (state) => {
      return state.devices;
    }
  },
  mutations: {
    [MUTATIONS.setDevices](state, devices) {
      state.devices = devices;
    }
  }
};