import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/paper-styles/paper-styles.js';

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
          margin-bottom: 4vh;
        }

        .subtitle {
          text-align: center;
          color: var(--paper-blue-grey-700);
          font-size: 0.8em;
          @apply --layout-flex;
          width: 100%;
        }
      </style>

      <div class="container">
        <div class="subtitle">Last temperature measured on
          <b>[[lastUpdate]]</b> is
          <b>[[lastTemperature]]°</b>
        </div>
        <canvas id="chart1" aria-label="Temperature chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="subtitle">Last humidity measured on
          <b>[[lastUpdate]]</b> is
          <b>[[lastHumidity]] %</b>
        </div>
        <canvas id="chart2" aria-label="Humidity chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="subtitle">Last pressure measured on
          <b>[[lastUpdate]]</b> is
          <b>[[lastPressure]] P</b>
        </div>
        <canvas id="chart3" aria-label="Pressure chart" role="chart"></canvas>
      </div>
      <div class="container">
        <div class="subtitle">Last altitude measured on
          <b>[[lastUpdate]]</b> is
          <b>[[lastAltitude]] m</b>
        </div>
        <canvas id="chart4" aria-label="Altitude chart" role="chart"></canvas>
      </div>
    `;
  }

  static get properties() {
    return {
      device: {
        type: String
      },
      temperatures: {
        type: Object,
        notify: true
      },
      lastTemperature: {
        type: String,
        value: 'n.a.',
        notify: true
      },
      humidities: {
        type: Array,
        notify: true
      },
      lastHumidity: {
        type: String,
        value: 'n.a.',
        notify: true
      },
      pressures: {
        type: Array,
        notify: true
      },
      lastPressure: {
        type: String,
        value: 'n.a.',
        notify: true
      },
      altitudes: {
        type: Array,
        notify: true
      },
      lastAltitude: {
        type: String,
        value: 'n.a.',
        notify: true
      },
      lastUpdate: {
        type: String,
        notify: true
      },
      ticks: {
        type: Number,
        notify: true,
        observer: '__handleTicksChanged'
      },
      query: {
        type: Object,
        notify: true,
        computed: '__computeQuery(ticks)'
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
      // initialize altitude chart
      var ctx = this.$.chart4.getContext('2d');
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

  __initData() {

    if (!this.initialized) {
      this.__queryData();
      this.__subscribeData();
      this._setInitialized(true);
    }
  }

  __handleTicksChanged() {

    // only call if first initialization is done
    if (this.initialized) {
      this.__queryData();
    }
  }

  __computeQuery(ticks) {

    // query BME680 entries
    const BME680 = Parse.Object.extend('BME680');
    const query = new Parse.Query(BME680);
    // narrow by device if given
    if (this.device) {
      query.equalTo("device", this.device);
    }
    query.descending("createdAt");
    query.limit(ticks);

    return query;
  }

  __queryData() {

    // only proceed if user is known
    if (Parse.User.current()) {
      // be sure that element is ready
      afterNextRender(this, function () {
        // reset chart entry points in case query is called again
        this.temperatures.data.labels = [];
        this.temperatures.data.datasets[0].data = [];
        this.humidities.data.labels = [];
        this.humidities.data.datasets[0].data = [];
        this.pressures.data.labels = [];
        this.pressures.data.datasets[0].data = [];
        this.altitudes.data.labels = [];
        this.altitudes.data.datasets[0].data = [];
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
              // update altitude chart
              this.altitudes.data.labels.push(label);
              this.altitudes.data.datasets[0].data.push(e.get('altitude'));
            });
            // update charts
            this.temperatures.update();
            this.humidities.update();
            this.pressures.update();
            this.altitudes.update();
            // update last update date
            this.lastUpdate = this.__getShortDate(results[0].get('createdAt'));
            // update last temperature value
            this.lastTemperature = results[0].get('temperature');
            // update last humidity value
            this.lastHumidity = results[0].get('humidity');
            // update last pressure value
            this.lastPressure = results[0].get('pressure');
            // update last altitude value
            this.lastAltitude = results[0].get('altitude');
          }
        }, (error) => {
          console.error("Query BME680 entries failed.", error);
          this.__handleParseError(error);
        });
      });
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
          self.altitudes.data.labels.unshift(label);
          self.altitudes.data.labels.pop();
          self.altitudes.data.datasets[0].data.unshift(bme680.get('pressure'));
          self.altitudes.data.datasets[0].data.pop();
          // update charts
          self.temperatures.update();
          self.humidities.update();
          self.pressures.update();
          self.altitudes.update();
          // update last update date
          self.lastUpdate = self.__getShortDate(bme680.get('createdAt'));
          // update last temperature value
          self.lastTemperature = bme680.get('temperature');
          // update last humidity value
          self.lastHumidity = bme680.get('humidity');
          // update last pressure value
          self.lastPressure = bme680.get('pressure');
          // update last altitude value
          self.lastAltitude = bme680.get('altitude');
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

  __getShortDate(date) {
    return date.toDateString().substring(0, 15);
  }

  __getShortTime(date) {
    return date.toTimeString().substring(0, 8);
  }
}

window.customElements.define('bme680-widget', Bme680Widget);