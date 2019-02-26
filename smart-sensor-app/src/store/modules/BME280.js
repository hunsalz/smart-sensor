import Vue from 'vue'
import Parse from 'parse'
import router from '@/router'

const SEPARATOR = '-';
const BME280 = Parse.Object.extend("BME280"); // declare BME280 subclass

export default {
  namespaced: true,
  mutations: {
    // store recent value
    setValue(state, bme280) {
      Vue.set(state, bme280.get('device'), bme280.attributes);
    },
    // store any kind of series by a synthetic key of 'device{SEPARATOR}key' syntax
    setSeries(state, { device, key, series }) {
      Vue.set(state, [device + SEPARATOR + key], series);
    },
    // update all existing series with a new value
    updateSeries(state, bme280) {
      let device = bme280.get('device');
      // loop over all existing keys of current state
      for (const key of Object.keys(state)) {
        // unshift new value to all keys that match appropriate 'device{SEPARATOR}' tuple
        if (key.indexOf(device + SEPARATOR) !== -1) {
          // unshift new value 
          let series = state[key];
          series.labels.unshift(bme280.get('createdAt'));
          series.temperatures.unshift(bme280.get('temperature'));
          series.humidities.unshift(bme280.get('humidity'));
          series.pressures.unshift(bme280.get('pressure'));
          series.altitudes.unshift(bme280.get('altitude'));
          // call reducer function to define if any former values needs to be removed
          let i = series.reduceFunction(series, series.offsetFromNowInMillis, series.limit);
          // remove amout of former values accordingly
          let start = i * -1;
          series.labels.splice(start, i);
          series.temperatures.splice(start, i);
          series.humidities.splice(start, i);
          series.pressures.splice(start, i);
          series.altitudes.splice(start, i);
        }
      }
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
            commit("setValue", bme280);
          }
        })
        .then(() => {
          // subscribe to new values
          query.subscribe().on("create", bme280 => {
            commit("setValue", bme280);
            commit("updateSeries", bme280);
          });
        }),
        error => {
          // eslint-disable-next-line no-console
          console.error("Query " + BME280 + " entries failed.", error);

          // TODO -> logout
        };
    },
    loadSeries({ commit }, { device, key, offsetFromNowInMillis, limit, reduceFunction }) {
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
              altitudes: altitudes,
              offsetFromNowInMillis: offsetFromNowInMillis,
              limit: limit,
              reduceFunction: reduceFunction
            }
          });
        }),
        error => {
          // eslint-disable-next-line no-console
          console.error("Query " + BME280 + " entries failed.", error);

          // TODO extract 
          commit('setAuthenticated', false);
          router.push({ name: 'login' });
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
        altitudes: [],
        offsetFromNowInMillis: NaN,
        limit: 1000,
        reduceFunction: () => { }
      } : state[device + SEPARATOR + key];
    }
  }
};