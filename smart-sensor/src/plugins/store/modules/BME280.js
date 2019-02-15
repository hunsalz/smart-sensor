import Vue from 'vue'
import Parse from 'parse'

export default {
  namespaced: true,
  mutations: {
    setValue(state, { device, entry }) {
      Vue.set(state, device, entry);
    },
    // store any kind of series by a synthetic key of device&label syntax 
    // no nested dynamic extension possible
    setValues(state, { device, label, entries }) {
      Vue.set(state, [device + '&' + label], entries);
    }
  },
  actions: {
    subscribeToValues({ commit }, device) {
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
      commit("setValue", bme280);
      // try to fetch recent BME280 entry
      const query = new Parse.Query(BME280);
      query.equalTo("device", device)
        .descending("createdAt")
        .first()
        .then(bme280 => {
          if (bme280) {
            commit("setValue", {
              device: bme280.get('device'),
              entry: bme280.attributes
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
    loadValues({ commit }, { device, label, createdAt, limit = 1000 }) {

      const BME280 = Parse.Object.extend("BME280");
      new Parse.Query(BME280)
        .equalTo("device", device)
        .greaterThan("createdAt", createdAt)
        .descending("createdAt")
        .limit(limit)
        .find().then((results) => {
          let data = [];
          results.forEach(e => {
            let x = e.attributes.createdAt;
            let y = e.attributes.temperature;

            data.push({ x: x, y: y });

          });
          commit("setValues", {
            device: device,
            label: label,

            entries: data
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
    getValue: (state) => (device) => {
      return state[device];
    },
    getValuesByLabel: (state) => (device, label) => {

      return state[device + '&' + label];

      // console.log(values);

      // let labels = [];
      // let series = [];
      // values.forEach(e => {
      //   labels.push(e.createdAt);
      //   series.push(e.temperature);
      // });

      // return { labels: labels, series: series };
    },
  }
};