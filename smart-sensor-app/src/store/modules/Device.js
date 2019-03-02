import Parse from 'parse'
import { handleParseError } from "@/plugins/parse"

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
        handleParseError(error);
      };
    },
    [ACTIONS.saveDevices]({ commit }, { devices }) {

      // TODO
      for (let i in devices) {
        // eslint-disable-next-line no-console
        console.log(devices[i])
        //devices[i].save();
      }
      commit(MUTATIONS.setDevices, devices);
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