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

          // TODO -> logout
        };
    },
    loadSeries({ commit }, { device, key, offsetFromNowInMillis, limit }) {
      let query = new Parse.Query(BME280);
      if (offsetFromNowInMillis) {
        var millis = Date.now() - offsetFromNowInMillis;
        query.greaterThan("createdAt", new Date(millis));
      }
      query
        .equalTo("device", device)
        .descending("createdAt")
        .limit(limit)
        .find().then((results) => {
          let labels = [];
          let temperatures = [];
          let humidities = [];
          let pressures = [];
          let altitudes = [];
          results.forEach(e => {
            labels.push(e.attributes.createdAt);
            temperatures.push(e.attributes.temperature);
            humidities.push(e.attributes.humidity);
            pressures.push(e.attributes.pressure);
            altitudes.push(e.attributes.altitude);
          });
          commit("setSeries", {
            device: device,
            key: key,
            series: {
              labels: labels,
              temperatures: temperatures,
              humidities: humidities,
              pressures: pressures,
              altitudes: altitudes
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
        temperatures: [],
        humidities: [],
        pressures: [],
        altitudes: []
      } : state[device + SEPARATOR + key];
    }
  }
};