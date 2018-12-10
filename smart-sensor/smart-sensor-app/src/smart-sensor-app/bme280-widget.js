import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/paper-styles/paper-styles.js';

import 'parse/dist/parse.min.js';
import 'chart.js/dist/Chart.bundle.min.js';

class Bme280Widget extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
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
      ticks: {
        type: Number,
        value: 5
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
      }
    };
  }

  constructor() {
    super();

    this._authListener = this.__isUserAuthenticated.bind(this);

    afterNextRender(this, function () {
      // global chart properties
      Chart.defaults.global.legend.display = false; // disable chart legend   
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

  __isUserAuthenticated() {
    this.__queryBME280Entries(this.ticks);
  }

  async __queryBME280Entries(limit) {

    console.log(Parse.Session.current());


    // proceed if user is available
    if (Parse.User.current()) {
      // try to query BME280 entries
      const BME280 = Parse.Object.extend('BME280');
      const query = new Parse.Query(BME280);
      query.descending("createdAt");
      query.limit(limit);

      // initially query all entries to draw chart once
      query.find().then((results) => {
        if (results.length > 0) {
          // add each entry
          results.forEach(e => {
            let label = self.__getShortTime(e.get('createdAt'));
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
          this.lastUpdate = self.__getShortDate(results[0].get('createdAt'));
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
        console.error("Query BME280 entries failed.", error);
        this.__handleParseError(error);
      });

      // subscribe to get updates
      var subscription = query.subscribe();
      // handle incoming event
      var self = this;
      subscription.on('create', function (bme280) {
        // add new entry and drop the oldest one
        let label = self.__getShortTime(bme280.get('createdAt'));
        // update temperature chart
        self.temperatures.data.labels.unshift(label);
        self.temperatures.data.labels.pop();
        self.temperatures.data.datasets[0].data.unshift(bme280.get('temperature'));
        self.temperatures.data.datasets[0].data.pop();
        // update humidity chart
        self.humidities.data.labels.unshift(label);
        self.humidities.data.labels.pop();
        self.humidities.data.datasets[0].data.unshift(bme280.get('humidity'));
        self.humidities.data.datasets[0].data.pop();
        // update pressure chart
        self.pressures.data.labels.unshift(label);
        self.pressures.data.labels.pop();
        self.pressures.data.datasets[0].data.unshift(bme280.get('pressure'));
        self.pressures.data.datasets[0].data.pop();
        // update altitude chart
        self.altitudes.data.labels.unshift(label);
        self.altitudes.data.labels.pop();
        self.altitudes.data.datasets[0].data.unshift(bme280.get('pressure'));
        self.altitudes.data.datasets[0].data.pop();
        // update charts
        self.temperatures.update();
        self.humidities.update();
        self.pressures.update();
        self.altitudes.update();
        // update last update date
        self.lastUpdate = self.__getShortDate(bme280.get('createdAt'));
        // update last temperature value
        self.lastTemperature = bme280.get('temperature');
        // update last humidity value
        self.lastHumidity = bme280.get('humidity');
        // update last pressure value
        self.lastPressure = bme280.get('pressure');
        // update last altitude value
        self.lastAltitude = bme280.get('altitude');
      });
    }
  }

  __getShortDate(date) {
    return date.toDateString().substring(0, 15);
  }

  __getShortTime(date) {
    return date.toTimeString().substring(0, 8);
  }

  __handleParseError(error) {
    
    switch (error.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        // logout current user
        self.dispatchEvent(new CustomEvent('logout-event', { bubbles: true, composed: true }));
        break;
    }
  }
}

window.customElements.define('bme280-widget', Bme280Widget);