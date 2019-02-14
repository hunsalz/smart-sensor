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
    // TODO
    test({ commit }) {
      Parse.Cloud.run("getBME280Devices")
        .then(function (results) {
          // eslint-disable-next-line no-console
          console.log(results);
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    },
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

        // TODO -> loqout
      };
    }
  },
  getters: {
    getDevices: (state) => {
      return state.devices;
    }
  }
};