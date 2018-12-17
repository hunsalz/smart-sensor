import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-styles/paper-styles.js';

class SettingsPage extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          @apply --paper-font-common-base;
          font-size: 1em;
          color: var(--paper-blue-grey-700);
          font-weight: normal;
        }

        @media screen and (orientation: landscape) {
 
        }

        @media screen and (orientation: portrait) {

        }

        .content-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
        }

        .container {
          margin-top: 4vh;
          width: 80%;
          height: auto;
          max-width: 300px;
        }

        paper-slider {
          margin: 0;
          width: 100%;
        }
      </style>
      
      <div class="content-area">
        <div class="container">
          <paper-slider min="4" max="80" value="{{ticks}}" pin></paper-slider>
          <span>Current ticks: [[ticks]]</span>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      ticks: {
        type: Number,
        value: function () {
          // search for stored ticks
          let ticks = window.localStorage.getItem('__ticks');
          // otherwise use a default value
          if (!ticks) {
            ticks = 12;
          }
          return Number(ticks);
        },
        observer: function () {
          window.localStorage.setItem('__ticks', this.ticks);
        },
        notify: true
      },
      verbose: {
        type: Boolean,
        value: false
      }
    };
  }
}

window.customElements.define('settings-page', SettingsPage);