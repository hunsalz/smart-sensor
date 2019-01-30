import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/app-layout/app-grid/app-grid-style.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/hardware-icons.js';

import '@polymer/paper-styles/paper-styles.js';

import './bme280-widget.js';
import './widget-layout.js';

class WidgetsPage extends PolymerElement {
  static get template() {
    return html`
      <style include="app-grid-style">
        :host {
          display: block;
          color: var(--paper-blue-grey-700);
          @apply --paper-font-common-base;
          --app-grid-columns: 2;
          --app-grid-item-height: 100%;
          --app-grid-gutter: 5px;
        }

        @media screen and (min-width: 1200px) {
          :host {
            --app-grid-columns: 3;
          }
        }

        @media screen and (max-width: 700px) {
          :host {
            --app-grid-columns: 1;
          }
        }

        .content-area {
          background-color: white;
        }

        .header {
          @apply --layout-flex;
          @apply --layout-horizontal;
        }

        .info {
          width: 100%;
          @apply --layout-vertical;
          @apply --layout-center;
        }

        .label {
          font-size: 2em;
          font-weight: 500;
          text-align: center;
        }

        .key {
          font-size: 0.8em;
          text-align: center;
        }

        .details {
          font-size: 0.8em;
          width: 100%;
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .column {
          padding-left: 5px;
          padding-right: 5px;
          @apply --layout-vertical;
        }

        .footer {
          color: var(--paper-blue-grey-200);
          font-size: 0.8em;
          text-align: center;
        }
      </style>

      <div class="content-area">
        <div id="_grid" class="app-grid">

          <dom-repeat items="[[__fetchBME280Devices()]]">
            <template strip-whitespace>
              <widget-layout key="[[item.key]]">
              
                <div slot="header" class="header">
                  <div class="info">
                    <div class="label">[[item.label]]</div>
                    <div class="key">[[item.key]]</div>
                  </div>
                  <div class="details">
                    <div class="column">
                      <div>Temperature</div>
                      <div>Humidity</div>
                      <div>Pressure</div>
                      <div>Altitude</div>
                    </div>
                    <div class="column">
                      <div>[[item.temperature]]</div>
                      <div>[[item.humidity]]</div>
                      <div>[[item.pressure]]</div>
                      <div>[[item.altitude]]</div>
                    </div>
                  </div>
                </div>

                <bme280-widget
                  device="[[item.key]]"
                  last-temperature="{{item.temperature}}" 
                  last-humidity="{{item.humidity}}" 
                  last-pressure="{{item.pressure}}" 
                  last-altitude="{{item.altitude}}"
                  last-update="{{item.updatedAt}}">
                </bme280-widget>

                <div slot="footer" class="footer">
                  Last update: [[item.updatedAt]]
                </div>
              </widget-layout>
            </template>
          </dom-repeat>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      collapsed: {
        type: Boolean,
        notify: true
      }
    };
  }

  constructor() {
    super();

    // add tasks after next render ...
    afterNextRender(this, function () {
      // listen to window resizing events
      this.__updateGridStyles = this.__updateGridStyles || function () {
        this.updateStyles();
      }.bind(this);
      window.addEventListener('resize', this.__updateGridStyles);
      // initial compute of collapsed state
      this.__computeCollapsedState();
    });
  }

  __fetchBME280Devices() {

    // only proceed if user is known
    if (Parse.User.current()) {
      // TODO fetch all avaialable BME280 devices and remove hard coded array
    }

    return [
      { key: "ESP-000023f09d", label: "ESP-01", temperature: NaN, humidity: NaN, pressure: NaN, altitude: NaN, updatedAt: NaN },
      { key: "ESP-0023a4ae30", label: "ESP-02", temperature: NaN, humidity: NaN, pressure: NaN, altitude: NaN, updatedAt: NaN }
    ];
  }

  /**
   * compute collapsed state according to all containing widgets
   */
  __computeCollapsedState() {

    var nodes = this.$._grid.querySelectorAll('widget-layout');
    var state = 0;
    for (var i = 0; i < nodes.length; i++) {
      state += nodes[i].isCollapsed();
    }
    this.collapsed = state === 0 ? false : true;
  }

  /*
   * toggle all widgets synchronous
   */
  __toggleWidgets() {

    var nodes = this.$._grid.querySelectorAll('widget-layout');
    this.collapsed = !this.collapsed;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].collapse(this.collapsed);
    }
  }
}

window.customElements.define('widgets-page', WidgetsPage);