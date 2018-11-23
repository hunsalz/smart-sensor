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
        }

        .widget-header {
          background-color: white;
          border: 1px solid var(--paper-grey-100);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          font-size: 1em;
          color: var(--paper-blue-grey-700);
          font-weight: normal;
          cursor: pointer;
          width: 100%;
        }

        .header {
          padding: 10px;
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        iron-collapse {
          padding: 10px;
          border: 1px solid var(--paper-grey-100);
          border-top: none;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          @apply --shadow-elevation-2dp;
          height: 100%;
        }

        .spacer {
          @apply --layout-flex;
          width: 100%;
        }
      </style>

      <app-localstorage-document key="[[key]]" data="{{opened}}" log$={{verbose}}></app-localstorage-document>

      <div class="widget-header" on-tap="toggle">
        <div class="header">
          <slot name="title"></slot>
          <span>[[title]]</span>
          <span class="spacer"></span>
          <slot name="label"></slot>
        </div>
      </div>
      <iron-collapse id="collapse_id" opened="{{opened}}" tabindex="0">
        <slot></slot>
      </iron-collapse>
    `;
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      key: {
        type: String
      },
      verbose: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * true if widget is collapsed
   */
  isCollapsed() {
    return !this.$.collapse_id.opened;
  }

  /**
   * collapses widget more or less 
   */
  collapse(collapse) {
    this.$.collapse_id.opened = !collapse;
  }

  /**
   * toggle between collapsed or expanded widget
   */
  toggle() {
    this.$.collapse_id.toggle();
    this.$.collapse_id.notifyResize();
  }
}

window.customElements.define('widget-layout', WidgetLayout);