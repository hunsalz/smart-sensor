import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/resize-title.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/paper-styles.js';

import './parse-app.js';
import './parse-auth.js';
import './sensor-viewer.js';

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

        iron-pages {
          transition: transform 0.3s;
        }
      </style>
      
      <!-- service components -->

      <parse-app
        app="{{app}}"
        application-id="1IFq8uk57NzXVMvzb1EYtytchOCj4OEUMyCawK1a" 
        java-script-key="jtl8Wgy2RajOIMqxlQjuAjJFqfZoMLLlL5yLWooY"
        server-url="https://smart-sensor.back4app.io"
        live-query-server-url="wss://smart-sensor.back4app.io"
        verbose>
      </parse-app>

      <parse-auth id="auth" app="{{app}}" user="app" password="123456789" valid></parse-auth>

      <!-- app routing -->

      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route route="{{route}}" pattern="/:page" data="{{routeData}}"></app-route>

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
          <iron-pages attr-for-selected="id" selected="{{routeData.page}}">
            <div id="login">LOGIN</div>
            <sensor-viewer id="dashboard" collapsed="{{collapsed}}"></sensor-viewer>
          </iron-pages>
        </div>

      </app-header-layout>
    `;
  }
  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      routeData: {
        type: Object,
        value: function() {
          return { page: '/login/' }; // default
        },
        observer: "__echo",
        notify: true
      },
      app_title: {
        type: String,
        value: 'Smart-Sensor',
      }
    };
  }

  __echo() {
    console.log(this.routeData);
  }

  ready() {
    super.ready();

    console.log(this.$.auth.valid);

    if (this.$.auth.valid) {
      this.set('route.path', '/dashboard');
    } else {
      this.set('route.path', '/login');
    }
  }

  constructor() {
    super();

    // set passive gestures globally for all elements using Polymer gestures
    setPassiveTouchGestures(true);
  }

  /**
   * true if all widgets are collapsed
   */
  __isCollapsed(collapsed) {
    return collapsed ? 'icons:expand-more' : 'icons:expand-less';
  }

  /*
   * toggle all widgets synchronous
   */
  __toggleAllWidgets() {
    this.$.dashboard.__toggleAllWidgets();
  }
}

window.customElements.define('smart-sensor-app', SmartSensorApp);