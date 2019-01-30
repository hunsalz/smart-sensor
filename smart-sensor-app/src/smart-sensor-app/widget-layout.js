import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import '@polymer/paper-styles/paper-styles.js';

class WidgetLayout extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          background-color: white;
          border-radius: 5px;
          @apply --shadow-elevation-2dp;
        }

        *:focus {
          outline: none;
        }

        div {
          width: 100%;
        }

        .widget-header {
          padding-top: 5px;
          padding-bottom: 5px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        iron-collapse {
          padding-left: 5px;
          padding-right: 5px;
          height: 100%;
        }

        .widget-footer {
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      </style>

      <app-localstorage-document key="[[__computeKey(key)]]" data="{{opened}}"></app-localstorage-document>

      <div class="widget-header" on-tap="toggle">
        <slot name="header"></slot>
      </div>
      <iron-collapse id="collapse" opened="{{opened}}" tabindex="0">
        <slot></slot>
      </iron-collapse>
      <div class="widget-footer">
        <slot name="footer"></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      key: {
        type: String
      }
    };
  }

  /**
   * compute local storage key for widget collapse state
   * @param {*} key 
   */
  __computeKey(key) {
    return key + '/opened';
  }

  /**
   * true if widget is collapsed
   */
  isCollapsed() {
    return !this.$.collapse.opened;
  }

  /**
   * collapse widget more or less 
   */
  collapse(collapse) {
    this.$.collapse.opened = !collapse;
  }

  /**
   * toggle widget between collapsed and expanded
   */
  toggle() {
    this.$.collapse.toggle();
    this.$.collapse.notifyResize();
  }
}

window.customElements.define('widget-layout', WidgetLayout);