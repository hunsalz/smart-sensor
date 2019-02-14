import Vue from 'vue'
import Parse from 'parse'

export default {
  namespaced: true,
  mutations: {
    setBME280(state, bme280) {
      Vue.set(state, bme280.get('device'), bme280.attributes);
    }
  },
  actions: {
    subscribeToRecentBME280Entry({ commit }, device) {
      // declare BME280 subclass
      const BME280 = Parse.Object.extend("BME280");
      // define an intital fallback entry
      var bme280 = new BME280();
      bme280.set("device", device);
      bme280.set("temperature", "NaN");
      bme280.set("humidity", "NaN");
      bme280.set("pressure", "NaN");
      bme280.set("altitude", "NaN");
      // commit initial entry
      commit("setBME280", bme280);
      // try to fetch recent BME280 entry
      const query = new Parse.Query(BME280);
      query.equalTo("device", device)
        .descending("createdAt")
        .first()
        .then(bme280 => {
          if (bme280) {
            commit("setBME280", bme280);
          }
        })
        .then(() => {
          // subscribe to changes
          query.subscribe().on("create", bme280 => {
            commit("setBME280", bme280);
          });
          query.subscribe().on('update', bme280 => {
            commit("setBME280", bme280);
          });
        }),
        error => {
          // eslint-disable-next-line no-console
          console.error("Query " + BME280 + " entries failed.", error);

          // TODO -> loqout
        };
    }
  },
  getters: {
    getData: (state) => (device) => {
      return state[device];
    }
  }
};