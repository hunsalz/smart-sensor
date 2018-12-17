import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/places-icons.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-toast/paper-toast.js';

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

        .content-area {
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

        paper-toast {
          width: 100%;
          text-align: center;
        }
      </style>
      
      <div class="content-area">
        <div class="container">
          <iron-icon class="logo" icon="places:all-inclusive"></iron-icon>
          <div style="margin-top: 4vh">
            <paper-input label="Username" value="{{username}}"></paper-input>
            <paper-input label="Password" type="password" value="{{password}}"></paper-input>
          </div>
          <div style="margin-top: 8vh">
            <paper-button on-click="__submit">LOGIN</paper-button>
          </div>
        </div>
        <paper-toast id="toast" text="Login failed." duration="3000"></paper-toast>
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

    this._loginListener = this.__handleLoginFailure.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('login-failed', this._loginListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('login-failed', this._loginListener);
  }

  __handleLoginFailure(event) {
    this.$.toast.open();
  }

  __submit() {

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