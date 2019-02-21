import Vue from 'vue'
import Parse from 'parse'

const SEPARATOR = '-';
const BME280 = Parse.Object.extend("BME280"); // declare BME280 subclass

export default {
  namespaced: true,
  mutations: {
    // store recent value
    setValue(state, { device, value }) {
      Vue.set(state, device, value);
    },
    // store any kind of series by a synthetic key of 'device{SEPARATOR}key' syntax 
    // note: no nested dynamic extensions are possible
    setSeries(state, { device, key, series }) {
      Vue.set(state, [device + SEPARATOR + key], series);
    }
  },
  actions: {
    subscribeToValues({ commit }, device) {
      // try to fetch recent BME280 entry
      const query = new Parse.Query(BME280);
      query.equalTo("device", device)
        .descending("createdAt")
        .first()
        .then(bme280 => {
          if (bme280) {
            commit("setValue", {
              device: bme280.get('device'),
              value: bme280.attributes
            });
          }
        })
        .then(() => {
          // subscribe to changes
          query.subscribe().on("create", bme280 => {
            commit("setValue", bme280);
          });
          query.subscribe().on('update', bme280 => {
            commit("setValue", bme280);
          });
        }),
        error => {
          // eslint-disable-next-line no-console
          console.error("Query " + BME280 + " entries failed.", error);

          // TODO -> loqout
        };
    },
    loadSeries({ commit }, { device, key, createdAt, limit }) {
      new Parse.Query(BME280)
        .equalTo("device", device)
        .greaterThan("createdAt", createdAt)
        .descending("createdAt")
        .limit(limit)
        .find().then((results) => {
          let labels = [];
          let data = [];
          results.forEach(e => {
            labels.push(e.attributes.createdAt);
            data.push(e.attributes.temperature);
          });
          commit("setSeries", {
            device: device,
            key: key,
            series: {
              labels: labels,
              data: data
            }
          });
        }),
        error => {
          // eslint-disable-next-line no-console
          console.error("Query " + BME280 + " entries failed.", error);

          // TODO -> logout
        };
    }
  },
  getters: {
    // return a fallback value or the recent stored value
    getValue: (state) => (device) => {
      return state[device] === undefined ? {
        device: device,
        temperature: NaN,
        humidity: NaN,
        pressure: NaN,
        altitude: NaN
      } : state[device];
    },
    // return a fallback series or the recent stored series
    getSeries: (state) => (device, key) => {
      return state[device + SEPARATOR + key] === undefined ? {
        labels: [],
        data: []
      } : state[device + SEPARATOR + key];
    }
  }
};