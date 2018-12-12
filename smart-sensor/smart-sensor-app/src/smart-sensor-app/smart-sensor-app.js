import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

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

import './settings-page.js';
import './widgets-page.js';

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
      </style>
      
      <!-- app routing -->

      <app-route route="{{subroute}}" pattern="/:page" data="{{routeData}}"></app-route>

      <!-- UI components -->

      <app-header-layout fullbleed>
        
        <!-- header area -->
        <app-header slot="header" condenses fixed effects="resize-title">
          <app-toolbar>
            <paper-icon-button
              id="__back" 
              icon="icons:chevron-left" 
              on-tap="__showDashboard" 
              role="button" 
              tabindex="0" 
              aria-disabled="false"
              hidden>
            </paper-icon-button>
            <div spacer condensed-title>[[app_title]]</div>
            <paper-icon-button 
              id="__collapse"
              icon="[[__computeCollapseIcon(collapsed)]]" 
              on-tap="__toggleWidgets" 
              role="button" 
              tabindex="0" 
              aria-disabled="false">
            </paper-icon-button>
            <paper-icon-button
              id="__settings" 
              icon="icons:more-vert" 
              on-tap="__showSettings" 
              role="button" 
              tabindex="0" 
              aria-disabled="false">
            </paper-icon-button>
          </app-toolbar>
          <app-toolbar>
            <div spacer main-title>[[app_title]]</div>
          </app-toolbar>
        </app-header>

        <div class="content-area">
          <iron-pages attr-for-selected="id" selected="{{routeData.page}}">
            <widgets-page id="dashboard" collapsed="{{collapsed}}" ticks={{ticks}}></widgets-page>
            <settings-page id="settings" ticks={{ticks}}></settings-page>
          </iron-pages>
        </div>

      </app-header-layout>
    `;
  }

  static get properties() {
    return {
      subroute: {
        type: Object,
        notify: true
      },
      routeData: {
        type: Object,
        value: function() {
          return { page: 'dashboard' }; // default page
        },
        observer: '__computeAppIcons'
      },
      app_title: {
        type: String,
        value: 'Smart-Sensor',
      }
    };
  }

  /**
   * compute app icons according to route data
   */
  __computeAppIcons(routeData) {

    if (this.routeData.page === 'settings') {
      this.$.__back.hidden = false;
      this.$.__collapse.hidden = true;
      this.$.__settings.hidden = true;
    } else {
      this.$.__back.hidden = true;
      this.$.__collapse.hidden = false;
      this.$.__settings.hidden = false;
    }
  }

  /**
   * compute icon according to collapsed state
   */
  __computeCollapseIcon(collapsed) {
    return collapsed ? 'icons:expand-more' : 'icons:expand-less';
  }

  /*
   * toggle all widgets synchronous
   */
  __toggleWidgets() {
    this.$.dashboard.__toggleWidgets();
  }

  __showDashboard() {  
    this.set('route.path', '/main/dashboard');
  }

  __showSettings() {
    this.set('route.path', '/main/settings');
  }
}

window.customElements.define('smart-sensor-app', SmartSensorApp);