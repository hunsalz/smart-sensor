import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/places-icons.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-styles/paper-styles.js';


class LoginPage extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          @apply --paper-font-common-base;
        }

        @media screen and (orientation: landscape) {
          .logo {
            width: 8vw;
            height: auto;
            margin-top: 4vw;
          }
        }

        @media screen and (orientation: portrait) {
          .logo {
            width: 24vw;
            height: auto;
            margin-top: 8vw;
          }
        }

        .full-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          background: var(--paper-blue-500);
        }

        .container {
          width: 80%;
          height: auto;
          max-width: 300px;
        }

        .logo {
          color: white;
          border: 4px solid white;
          border-radius: 50%;
          padding: 1em;
        }

        .background {
          color: var(--paper-blue-100);
        }

        paper-input {
          --primary-text-color: white;
          --paper-input-container-color: white;
          --paper-input-container-focus-color: white;
          --paper-input-container-invalid-color: white;   
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
      
      <div class="full-page">
        <div class="container">
          <iron-icon class="logo" icon="places:all-inclusive"></iron-icon>
          <div style="margin-top: 4vh">
            <paper-input label="Username" value="{{username}}"></paper-input>
            <paper-input label="Password" type="password" value="{{password}}"></paper-input>
          </div>
          <div style="margin-top: 8vh">
            <paper-button on-click="submit">LOGIN</paper-button>
          </div>
        </div>
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

  submit() {
    
    self.dispatchEvent(new CustomEvent('login-event', {
      bubbles: true, 
      composed: true, 
      detail: {
        username: this.username,
        password: this.password
      }
    }));
  }
}

window.customElements.define('login-page', LoginPage);