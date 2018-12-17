import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/paper-styles.js';

import './login-page.js';
import './parse-app.js';
import './parse-auth.js';
import './smart-sensor-app.js';

class MainApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          @apply --paper-font-common-base;
        }
      </style>
      
      <!-- service components -->

      <parse-app
        app="{{app}}"
        application-id="1IFq8uk57NzXVMvzb1EYtytchOCj4OEUMyCawK1a" 
        java-script-key="jtl8Wgy2RajOIMqxlQjuAjJFqfZoMLLlL5yLWooY"
        server-url="https://smart-sensor.back4app.io"
        live-query-server-url="wss://smart-sensor.back4app.io">
      </parse-app>

      <parse-auth id="auth" app="{{app}}" authenticated="{{authenticated}}"></parse-auth>

      <!-- app routing -->

      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>

      <!-- UI components -->

      <div class="content-area">
        <iron-pages attr-for-selected="id" selected="{{routeData.page}}" fallback-selection="main">
          <login-page id="login"></login-page>
          <smart-sensor-app id="main" route="{{route}}" subroute={{subroute}}></smart-sensor-app>  
        </iron-pages>
      </div>
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
        value: function () {
          return { page: 'main' }; // default page
        }
      },
      authenticated: {
        type: Boolean,
        value: false,
        observer: "__isAuthenticated"
      }
    };
  }

  /**
   * Displays login page until authentication is successful
   */
  __isAuthenticated() {

    if (this.authenticated) {
      this.set('route.path', '/main');
    } else {
      this.set('route.path', '/login');
    }
  }

  constructor() {
    super();

    // set passive gestures globally for all elements using Polymer gestures
    setPassiveTouchGestures(true);
  }
}

window.customElements.define('main-app', MainApp);