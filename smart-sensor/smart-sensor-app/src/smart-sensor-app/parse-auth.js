import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import 'parse/dist/parse.min.js';

class ParseAuth extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: none;
        }
      </style>
    `;
  }

  static get properties() {
    return {
      app: {
        type: Object
      },
      authenticated: {
        type: Boolean,
        value: false,
        notify: true,
        readOnly: true
      }
    };
  }

  static get observers() {
    return [
      '__isCurrentUserKnown(app)'
    ]
  }

  constructor() {
    super();

    this._boundListener = this.__handleLoginEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('login-event', this._boundListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('login-event', this._boundListener);
  }

  __isCurrentUserKnown() {

    if (Parse.User.current()) {
        // TODO handle invalid session token: https://docs.parseplatform.org/js/guide/#handling-invalid-session-token-error
        // reflect and notify authentication state
        this._setAuthenticated(true);
        this.dispatchEvent(new CustomEvent('user-authenticated', { bubbles: true, composed: true }));
    }
  }

  __handleLoginEvent(event) {
    this.__login(event.detail.username, event.detail.password);
  }

  __login(username, password) {
    
    var self = this;
    Parse.User.logIn(username, password).then(function(user) {
      // reflect and notify authentication state
      self._setAuthenticated(true);
      self.dispatchEvent(new CustomEvent('user-authenticated', { bubbles: true, composed: true }));
      console.info("Login successful.", user);
    }, function (error) {
      self._setAuthenticated(false);
      self.dispatchEvent(new CustomEvent('login-failed', { bubbles: true, composed: true }));
      console.error("Login failed.", error);
    });
  }
}

window.customElements.define('parse-auth', ParseAuth);