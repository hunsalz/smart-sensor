import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/resize-title.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import '@polymer/iron-icons/iron-icons.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/paper-styles.js';

import './bmp280-widget.js';
import './bme280-widget.js';
import './bme680-widget.js';
import './hardware-widget.js';
import './widget-layout.js';

class SensorViewer extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style include="app-grid-style">
        :host {
          display: block;
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

        app-header {
          color: white;
          background-color: var(--paper-blue-500);
          z-index: 1;
        }

        .content-area {
          background-color: white;
        }

        .widget-label {
          margin: 0px 2px 0px 2px;
          padding: 5px 15px 5px 15px;
          border-radius: 20px;
          background-color: var(--paper-red-500);
          color: white;
          font-size: 0.8em;
          font-weight: 500;
          line-height: 1.5em;
          white-space: nowrap;
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .spacer {
          @apply --layout-flex;
          width: 100%;
        }
      </style>
      
      <app-header-layout fullbleed>
        
        <!-- header area -->
        <app-header slot="header" condenses fixed effects="resize-title">
          <app-toolbar>
            <div spacer condensed-title>[[app_title]]</div>
            <paper-icon-button icon="{{__isCollapsed(collapsed)}}" on-tap="__toggleAllWidgets" role="button" tabindex="0" aria-disabled="false"></paper-icon-button>
          </app-toolbar>
          <app-toolbar>
            <div spacer main-title>[[app_title]]</div>
          </app-toolbar>
        </app-header>

        <div class="content-area">
          <div id="_grid" class="app-grid">

            <!--widget-layout key="__bmp280">
              <div slot="title">
                <div>Temperature [[__bmp280_temperature]]°</div>
                <div>Pressure [[__bmp280_pressure]] Pa</div>
                <div>Altitude [[__bmp280_altitude]] m</div>
              </div>
              <div class="widget-label" slot="label">
                <div>BMP280</div>
                <iron-icon icon="icons:assessment"></iron-icon>
              </div>
              <bmp280-widget ticks="24" last-temperature="{{__bmp280_temperature}}" last-pressure="{{__bmp280_pressure}}" last-altitude="{{__bmp280_altitude}}"></bmp280-widget>
            </widget-layout-->

            <!--widget-layout key="__bme280">
              <div slot="title">
                <div>Temperature [[__bme280_temperature]]°</div>
                <div>Humidity [[__bme280_humidity]] %</div>
                <div>Pressure [[__bme280_pressure]] Pa</div>
                <div>Altitude [[__bme280_altitude]] m</div>
              </div>
              <div class="widget-label" slot="label">
                <div>BME280</div>
                <iron-icon icon="icons:assessment"></iron-icon>
              </div>
              <bme280-widget ticks="24" last-temperature="{{__bme280_temperature}}" last-humidity="{{__bme280_humidity}}" last-pressure="{{__bme280_pressure}}" last-altitude="{{__bme280_altitude}}"></bme280-widget>
            </widget-layout-->

            <widget-layout key="__bmp6280">
              <div slot="title">
                <div>Temperature [[__bme680_temperature]]°</div>
                <div>Humidity [[__bme680_humidity]] %</div>
                <div>Pressure [[__bme680_pressure]] Pa</div>
                <div>Gas resistance [[__bme680_gas]] Ω</div>
                <div>Altitude approx. [[__bme680_altitude]] m</div>
              </div>
              <div class="widget-label" slot="label">
                <div>BME680</div>
                <iron-icon icon="icons:assessment"></iron-icon>
              </div>
              <bme680-widget ticks="24" last-temperature="{{__bme680_temperature}}" last-humidity="{{__bme680_humidity}}" last-pressure="{{__bme680_pressure}}" last-gas="{{__bme680_gas}}" last-altitude="{{__bme680_altitude}}"></bme680-widget>
            </widget-layout>

            <widget-layout key="__hardware">
              <div slot="title">
                <div>Hardware diagnostics</div>
              </div>
              <div class="widget-label" slot="label">
                <div>ESP8266</div>
                <iron-icon icon="icons:settings"></iron-icon>
              </div>
              <hardware-widget></hardware-widget>
            </widget-layout>
          </div>
        </div>
      </app-header-layout>
    `;
  }
  static get properties() {
    return {
      app_title: {
        type: String,
        value: 'Smart-Sensor',
      },
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
      // listen to toggle events from widgets
      this.addEventListener('iron-resize', e => { this.__computeCollapsedState() });
      // listen to window resizing events
      this.__updateGridStyles = this.__updateGridStyles || function () {
        this.updateStyles();
      }.bind(this);
      window.addEventListener('resize', this.__updateGridStyles);
      // initial compute of collapsed state
      this.__computeCollapsedState();
    });
  }

  /**
   * true if all widgets are collapsed
   */
  __isCollapsed(collapsed) {
    return collapsed ? 'icons:expand-more' : 'icons:expand-less';
  }

  /**
   * compute collapsed state according to all containing widgets
   */
  __computeCollapsedState() {
    // compute collapsed state of all <widget-layout> elements
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
  __toggleAllWidgets() {
    // toggle all <widget-layout> elements
    var nodes = this.$._grid.querySelectorAll('widget-layout');
    this.collapsed = !this.collapsed;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].collapse(this.collapsed);
    }
  }
}

window.customElements.define('sensor-viewer', SensorViewer);