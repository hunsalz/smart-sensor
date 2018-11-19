import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/resize-title.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import '@polymer/iron-icons/iron-icons.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/paper-styles.js';

import 'parse/dist/parse.min.js';

import './bmp280-widget.js';
import './hardware-widget.js';
import './widget-layout.js';

class SmartSensorApp extends GestureEventListeners(PolymerElement) {
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

        app-header {
          color: white;
          background-color: var(--paper-blue-500);
          z-index: 1;
        }

        [main-title] {
          font-size: 2em;
          font-weight: bold;
        }

        [condensed-title] {
          font-size: 1em;
          font-weight: normal;
        }

        @media screen and (orientation: landscape) {
        }

        @media screen and (orientation: portrait) {
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
      
      <!-- service components -->



      <!-- UI components -->
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

        <!-- content area -->
        <div class="content-area">
          <div id="_grid" class="app-grid">

            <widget-layout key="__bmp280">
              <div slot="title">
                <div>Temperature [[temperature]]°</div>
                <div>Pressure [[pressure]] Pa</div>
                <div>Altitude [[altitude]] m</div>
              </div>
              <div class="widget-label" slot="label">
                <div>BMP280</div>
                <iron-icon icon="icons:assessment"></iron-icon>
              </div>
              <bmp280-widget last-temperature="{{temperature}}" last-pressure="{{pressure}}" last-altitude="{{altitude}}"></bmp280-widget>
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
        value: true,
        notify: true
      }
    };
  }

  constructor() {
    super();
    
    // set passive gestures globally for all elements using Polymer gestures
    setPassiveTouchGestures(true);

    Parse.initialize("1IFq8uk57NzXVMvzb1EYtytchOCj4OEUMyCawK1a", "jtl8Wgy2RajOIMqxlQjuAjJFqfZoMLLlL5yLWooY");
    Parse.serverURL = "https://smart-sensor.back4app.io";
    Parse.liveQueryServerURL = 'wss://smart-sensor.back4app.io';

    Parse.User.logIn("app", "123456789").then(function(user) {
      console.info("Login successful.");
    }, function(error) {
      console.error("Login failed.", error);
    });

    // add tasks after next render ...
    afterNextRender(this, function () {
      // listen to toggle events from widgets
      this.addEventListener('iron-resize', e => { this.__applyIconToggle() });
      // listen to window resizing events
      this.__updateGridStyles = this.__updateGridStyles || function () {
        this.updateStyles();
      }.bind(this);
      window.addEventListener('resize', this.__updateGridStyles);
      // apply icon toogle state initially
      this.__applyIconToggle();
    });
  }

  /**
   * true if all widgets are collapsed
   */
  __isCollapsed(collapsed) {
    return collapsed ? 'icons:expand-more' : 'icons:expand-less';
  }

  /**
   * apply icon toggle according to all containing widgets
   */
  __applyIconToggle() {
    // compute toggle state of all <widget-layout> elements
    var nodes = this.$._grid.querySelectorAll('widget-layout');
    var state = 0;
    for (var i = 0; i < nodes.length; i++) {
      state += nodes[i].isCollapsed();
    }
    // switch toggle according to state result
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

  __handleFirebaseAuthError(event) {
    console.warn("Firebase auth error: " + event);
  }
}

window.customElements.define('smart-sensor-app', SmartSensorApp);