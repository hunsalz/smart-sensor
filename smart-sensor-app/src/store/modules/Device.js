import Parse from 'parse'

export default {
  namespaced: true,
  state: {
    devices: []
  },
  mutations: {
    setDevices(state, devices) {
      state.devices = devices;
    }
  },
  actions: {
    getDevices({ commit }) {
      // declare BME280 subclass
      const Device = Parse.Object.extend("Device");
      // try to fetch all devices
      const query = new Parse.Query(Device);
      query.find()
        .then(results => {
          let devices = [];
          results.forEach(e => {
            devices.push(e.attributes);
          });
          commit("setDevices", devices);
        })
      error => {
        // eslint-disable-next-line no-console
        console.error("Query " + Device + " entries failed.", error);

        // TODO -> logout
      };
    }
  },
  getters: {
    getDevices: (state) => {
      return state.devices;
    }
  }
};