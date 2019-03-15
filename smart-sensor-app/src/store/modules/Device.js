import Parse from "parse";
import { DEVICE, handleParseError } from "@/plugins/parse";

export const ACTIONS = {
  subscribeToDevices: "subscribeToDevices",
  saveDevices: "saveDevices"
};

export const GETTERS = {
  getDevices: "getDevices"
};

export const MUTATIONS = {
  setDevices: "setDevices",
  setLabel: "setLabel",
  pushDevice: "pushDevice"
};

export default {
  namespaced: true,
  state: {
    devices: []
  },
  actions: {
    [ACTIONS.subscribeToDevices]({ commit }) {
      // try to fetch all devices
      const query = new Parse.Query(DEVICE);
      query
        .find()
        .then(results => {
          let devices = [];
          results.forEach(entity => {
            let device = Object.assign({}, entity.attributes);
            device.id = entity.id;
            devices.push(device);
          });
          commit(MUTATIONS.setDevices, devices);
        })
        .then(() => {
          // subscribe to new values
          query.subscribe().on("create", entity => {
            let device = Object.assign({}, entity.attributes);
            device.id = entity.id;
            commit(MUTATIONS.pushDevice, device);
          });
        }),
        error => {
          handleParseError(this, error);
        };
    },
    [ACTIONS.saveDevices]({ state }) {
      // process all devices
      state.devices.forEach(device => {
        // process each entity
        const query = new Parse.Query(DEVICE);
        query.get(device.id).then(entity => {
          // update entity if label changed
          if (entity.get("label") != device.label) {
            entity.set("label", device.label);
            entity.save().then(
              () => {
                // success
              },
              error => {
                // eslint-disable-next-line no-console
                console.error("Updating failed", error);
              }
            );
          }
        });
      });
    }
  },
  getters: {
    [GETTERS.getDevices]: state => {
      return state.devices;
    }
  },
  mutations: {
    [MUTATIONS.setDevices](state, devices) {
      state.devices = devices;
    },
    [MUTATIONS.setLabel](state, { index, label }) {
      state.devices[index].label = label;
    },
    [MUTATIONS.pushDevice](state, device) {
      let x = state.devices.push(device);
    }
  }
};
