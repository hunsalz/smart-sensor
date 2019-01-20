import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { afterNextRender, flush } from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-tabs/paper-tabs.js';

import 'parse/dist/parse.min.js';
import 'chart.js/dist/Chart.bundle.min.js';

class Bme680Widget extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
      <style> 
        :host {
          display: block;
        }

        .container {
          margin-top: 4vh;
        }

        paper-tabs {
          --paper-tabs-selection-bar-color: var(--paper-blue-500);
        }

        .title {
          text-align: center;
          color: var(--paper-blue-grey-700);
          font-size: 0.8em;
          @apply --layout-flex;
          width: 100%;
        }
      </style>

      <app-localstorage-document key="[[__computeKey(device)]]" data="{{selected}}"></app-localstorage-document>

      <paper-tabs selected="{{selected}}" fallback-selection="0">
        <paper-tab>Last 4h</paper-tab>
        <paper-tab>Last 24h</paper-tab>
        <paper-tab>Last 7days</paper-tab>
        <paper-tab>Last 10 values</paper-tab>
      </paper-tabs>

      <div class="container">
        <div class="title">Temperature</div>
        <canvas id="chart1" aria-label="Temperature chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="title">Humidity</div>
        <canvas id="chart2" aria-label="Humidity chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="title">Pressure</div>
        <canvas id="chart3" aria-label="Pressure chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="title">Gas</div>
        <canvas id="chart4" aria-label="Gas chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="title">Altitude</div>
        <canvas id="chart5" aria-label="Altitude chart" role="chart"></canvas>
      </div>
    `;
  }

  static get properties() {
    return {
      device: {
        type: String
      },
      temperatures: {
        type: Object
      },
      lastTemperature: {
        type: String,
        value: 'N/A',
        notify: true
      },
      humidities: {
        type: Array
      },
      lastHumidity: {
        type: String,
        value: 'N/A',
        notify: true
      },
      pressures: {
        type: Array
      },
      lastPressure: {
        type: String,
        value: 'N/A',
        notify: true
      },
      gases: {
        type: Array
      },
      lastGas: {
        type: String,
        value: 'N/A',
        notify: true
      },
      altitudes: {
        type: Array
      },
      lastAltitude: {
        type: String,
        value: 'N/A',
        notify: true
      },
      lastUpdate: {
        type: String,
        value: 'N/A',
        notify: true
      },
      query: {
        type: Object
      },
      from: {
        type: Date
      },
      limit: {
        type: Number
      },
      selected: {
        type: Number,
        value: 0,
        observer: '__handleSelectedChanged'
      },
      initialized: {
        type: Boolean,
        value: false,
        readOnly: true
      }
    };
  }

  constructor() {
    super();

    this._authListener = this.__initData.bind(this);
    Chart.defaults.global.legend.display = false; // disable chart legend
    afterNextRender(this, function () {
      // initialize temperature chart
      var ctx = this.$.chart1.getContext('2d');
      this.temperatures = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Temperature',
            borderColor: '#e57373',
            borderWidth: 1,
            backgroundColor: 'rgba(229, 115, 115, 0.2)',
            data: []
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      // initialize humidity chart
      var ctx = this.$.chart2.getContext('2d');
      this.humidities = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Humidity',
            borderColor: '#4fc3f7',
            borderWidth: 1,
            backgroundColor: 'rgba(79, 195, 247, 0.2)',
            data: []
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      // initialize pressure chart
      var ctx = this.$.chart3.getContext('2d');
      this.pressures = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Pressure',
            borderColor: '#7986cb',
            borderWidth: 1,
            backgroundColor: 'rgba(121, 134, 203, 0.2)',
            data: []
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      // initialize gas chart
      var ctx = this.$.chart4.getContext('2d');
      this.gases = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Gas',
            borderColor: '#7986cb',
            borderWidth: 1,
            backgroundColor: 'rgba(121, 134, 203, 0.2)',
            data: []
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      // initialize altitude chart
      var ctx = this.$.chart5.getContext('2d');
      this.altitudes = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Altitude',
            borderColor: '#ffb74d',
            borderWidth: 1,
            backgroundColor: 'rgba(255, 183, 77, 0.2)',
            data: []
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      // handle resize event
      this.addEventListener('iron-resize', () => {
        this.temperatures.resize();
        this.humidities.resize();
        this.gases.resize();
        this.pressures.resize();
        this.altitudes.resize();
      });
    });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('user-authenticated', this._authListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('user-authenticated', this._authListener);
  }

  __computeKey(device) {
    return device + '/selected';
  }

  __initData() {

    if (!this.initialized) {

      this.query = this.__computeQuery();
      this.__queryData();
      this.__subscribeData();
      this._setInitialized(true);
    }
  }

  __handleSelectedChanged() {

    // only call if first initialization is already done
    if (this.initialized) {
      // compute query
      this.query = this.__computeQuery();
      // query data
      this.__queryData();
    }
  }

  __computeQueryParams() {

    let date = new Date();
    let limit = 1000;
    switch (this.selected) {
      case 0:
        date.setHours(date.getHours() - 4); // 4 hours
        break;
      case 1:
        date.setHours(date.getHours() - 24); // 24 hours
        break;
      case 2:
        date.setHours(date.getHours() - 24 * 7); // week
        break;
      default:
        limit = 10;
        date = new Date('January 1, 1970 00:00:00'); // since 'The Epoch'
        break;
    }
    this.from = date;
    this.limit = limit;
  }

  __computeQuery() {

    // compute query params
    this.__computeQueryParams();
    // query BME680 entries
    const BME680 = Parse.Object.extend('BME680');
    const query = new Parse.Query(BME680);
    // narrow by device
    if (this.device) {
      query.equalTo("device", this.device);
    }
    query.greaterThan("createdAt", this.from);
    query.descending("createdAt");
    query.limit(this.limit);

    return query;
  }

  __queryData() {

    console.log(this.device, this.query);

    // only proceed if user is known
    if (Parse.User.current()) {
      // be sure that element is ready
      afterNextRender(this, function () {
        // reset any existing data sets
        this.temperatures.data.labels = [];
        this.temperatures.data.datasets[0].data = [];
        let lastTemperature = 'N/A';
        this.humidities.data.labels = [];
        this.humidities.data.datasets[0].data = [];
        let lastHumidity = 'N/A';
        this.pressures.data.labels = [];
        this.pressures.data.datasets[0].data = [];
        let lastPressure = 'N/A';
        this.gases.data.labels = [];
        this.gases.data.datasets[0].data = [];
        let lastGas = 'N/A';
        this.altitudes.data.labels = [];
        this.altitudes.data.datasets[0].data = [];
        let lastAltitude = 'N/A';
        let lastUpdate = 'N/A';
        // query entries and fill charts
        this.query.find().then((results) => {
          if (results.length > 0) {
            // add each entry
            results.forEach(e => {
              let label = this.__getShortTime(e.get('createdAt'));
              // update temperature chart
              this.temperatures.data.labels.push(label);
              this.temperatures.data.datasets[0].data.push(e.get('temperature'));
              // update humidity chart
              this.humidities.data.labels.push(label);
              this.humidities.data.datasets[0].data.push(e.get('humidity'));
              // update pressure chart
              this.pressures.data.labels.push(label);
              this.pressures.data.datasets[0].data.push(e.get('pressure'));
              // update pressure chart
              this.gases.data.labels.push(label);
              this.gases.data.datasets[0].data.push(e.get('gas'));
              // update altitude chart
              this.altitudes.data.labels.push(label);
              this.altitudes.data.datasets[0].data.push(e.get('altitude'));
            });
            // save latest values
            lastTemperature = results[0].get('temperature') + ' °';
            lastHumidity = results[0].get('humidity') + ' %';
            lastPressure = results[0].get('pressure') + ' Pa';
            lastGas = results[0].get('gas') + ' Ω';
            lastAltitude = results[0].get('altitude') + ' m';
            lastUpdate = this.__formatDateTime(results[0].get('createdAt'));
          }
          // update latest values
          this.lastTemperature = lastTemperature;
          this.lastHumidity = lastHumidity;
          this.lastPressure = lastPressure;
          this.lastGas = lastGas;
          this.lastAltitude = lastAltitude;
          this.lastUpdate = lastUpdate;
          // update charts
          this.temperatures.update();
          this.humidities.update();
          this.pressures.update();
          this.gases.update();
          this.altitudes.update();
        }, (error) => {
          console.error("Query BME680 entries failed.", error);
          this.__handleParseError(error);
        });
      });
      flush(); // flush render-status of all '__queryData' calls
    }
  }

  __subscribeData() {

    // only proceed if user is known
    if (Parse.User.current()) {
      // subscribe for new entries
      var subscription = this.query.subscribe();
      var self = this;
      subscription.on('create', function (bme680) {
        // be sure that element is ready
        afterNextRender(this, function () {
          // add new entry and drop the oldest one
          let label = self.__getShortTime(bme680.get('createdAt'));
          // update temperature chart
          self.temperatures.data.labels.unshift(label);
          self.temperatures.data.labels.pop();
          self.temperatures.data.datasets[0].data.unshift(bme680.get('temperature'));
          self.temperatures.data.datasets[0].data.pop();
          // update humidity chart
          self.humidities.data.labels.unshift(label);
          self.humidities.data.labels.pop();
          self.humidities.data.datasets[0].data.unshift(bme680.get('humidity'));
          self.humidities.data.datasets[0].data.pop();
          // update pressure chart
          self.pressures.data.labels.unshift(label);
          self.pressures.data.labels.pop();
          self.pressures.data.datasets[0].data.unshift(bme680.get('pressure'));
          self.pressures.data.datasets[0].data.pop();
          // update altitude chart
          self.gases.data.labels.unshift(label);
          self.gases.data.labels.pop();
          self.gases.data.datasets[0].data.unshift(bme680.get('gas'));
          self.gases.data.datasets[0].data.pop();
          // update altitude chart
          self.altitudes.data.labels.unshift(label);
          self.altitudes.data.labels.pop();
          self.altitudes.data.datasets[0].data.unshift(bme680.get('pressure'));
          self.altitudes.data.datasets[0].data.pop();
          // update latest values
          self.lastTemperature = bme680.get('temperature');
          self.lastHumidity = bme680.get('humidity');
          self.lastPressure = bme680.get('pressure');
          self.lastGas = bme680.get('gas');
          self.lastAltitude = bme680.get('altitude');
          self.lastUpdate = self.__formatDateTime(bme680.get('createdAt'));
          // update charts
          self.temperatures.update();
          self.humidities.update();
          self.pressures.update();
          self.gases.update();
          self.altitudes.update();
        });
      });
    }
  }

  __handleParseError(error) {

    switch (error.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        // logout current user
        self.dispatchEvent(new CustomEvent('logout-event', { bubbles: true, composed: true }));
        break;
    }
  }

  __formatDateTime(date) {
    return date.toDateString().substring(0, 15) + ' at ' + this.__getShortTime(date);
  }

  __getShortTime(date) {
    return date.toTimeString().substring(0, 8);
  }
}

window.customElements.define('bme680-widget', Bme680Widget);