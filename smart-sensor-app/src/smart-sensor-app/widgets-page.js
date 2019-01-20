import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/hardware-icons.js';

import '@polymer/paper-styles/paper-styles.js';

import './bmp280-widget.js';
import './bme280-widget.js';
import './bme680-widget.js';
import './hardware-widget.js';
import './widget-layout.js';

class WidgetsPage extends PolymerElement {
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

        .content-area {
          background-color: white;
        }

        .header {
          color: var(--paper-blue-grey-700);
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .title {
          font-size: 2em;
          font-weight: 500;
          width: 100%;
          text-align: center;
        }

        table {
          font-size: 0.8em;
          width: 100%;
        }

        .footer {
          color: var(--paper-blue-grey-200);
          font-size: 0.8em;
          width: 100%;
          text-align: center;
        }
      </style>

      <div class="content-area">
        <div id="_grid" class="app-grid">

          <widget-layout key="ESP-2391099">

            <div slot="header" class="header">
              <div class="title">Kitchen</div>
              <table>
                <tr><td>Temperature</td><td>[[__ESP-2391099_temperature]] °</td><tr>
                <tr><td>Humidity</td><td>[[__ESP-2391099_humidity]] %</td><tr>
                <tr><td>Pressure</td><td>[[__ESP-2391099_pressure]] Pa</td><tr>
                <tr><td>Altitude</td><td>[[__ESP-2391099_altitude]] m</td><tr>
              </table>
            </div>

            <bme280-widget 
              device="ESP-2391099"
              last-temperature="{{__ESP-2391099_temperature}}" 
              last-humidity="{{__ESP-2391099_humidity}}" 
              last-pressure="{{__ESP-2391099_pressure}}" 
              last-altitude="{{__ESP-2391099_altitude}}"
              last-update="{{__ESP-2391099_last_update}}"
              ticks="{{ticks}}">
            </bme280-widget>

            <div slot="footer" class="footer">
              Last update: [[__ESP-2391099_last_update]]
            </div>
          </widget-layout>

          <widget-layout key="ESP-2355357">

            <div slot="header" class="header">
              <div class="title">Bedroom</div>
              <table>
                <tr><td>Temperature</td><td>[[__ESP-2355357_temperature]] °</td><tr>
                <tr><td>Humidity</td><td>[[__ESP-2355357_humidity]] %</td><tr>
                <tr><td>Pressure</td><td>[[__ESP-2355357_pressure]] Pa</td><tr>
                <tr><td>Altitude</td><td>[[__ESP-2355357_altitude]] m</td><tr>
              </table>
            </div>

            <bme280-widget 
              device="ESP-2355357"
              last-temperature="{{__ESP-2355357_temperature}}" 
              last-humidity="{{__ESP-2355357_humidity}}" 
              last-pressure="{{__ESP-2355357_pressure}}" 
              last-altitude="{{__ESP-2355357_altitude}}"
              last-update="{{__ESP-2355357_last_update}}"
              ticks="{{ticks}}">
            </bme280-widget>

            <div slot="footer" class="footer">
              Last update: [[__ESP-2355357_last_update]]
            </div>
          </widget-layout>

        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      ticks: {
        type: Number,
        notify: true
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