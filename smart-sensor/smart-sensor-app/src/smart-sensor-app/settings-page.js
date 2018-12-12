import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-styles/paper-styles.js';

class SettingsPage extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          @apply --paper-font-common-base;
        }

        @media screen and (orientation: landscape) {
 
        }

        @media screen and (orientation: portrait) {

        }

        .content-area {
          
        }

        paper-button {
          margin: 0;
          border: 2px solid white;
          border-radius: 2em;
          background: var(--paper-blue-500);
          color: white;
          width: 100%;
        }
      </style>
      
      <div class="content-area">
        TODO
      </div>
    `;
  }
  static get properties() {
    return {
      username: {
        type: String
      },
      password: {
        type: String
      }
    };
  }

  constructor() {
    super();

  }

  __submit() {
    
  }
}

window.customElements.define('settings-page', SettingsPage);