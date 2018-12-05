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
      valid: {
        type: Boolean,
        value: false,
        notify: true,
        readOnly: true,
        reflectToAttribute: true
      },
      user: {
        type: String
      },
      password: {
        type: String
      }
    };
  }

  static get observers() {
    return [
      '__auth(app)'
    ]
  }

  __auth() {

    if (Parse.User.current()) {
        // TODO https://docs.parseplatform.org/js/guide/#handling-invalid-session-token-error

        console.log(Parse.User.current().getSessionToken());

        // reflect and notify authentication state
        this._setValid(true);
        this.dispatchEvent(new CustomEvent('parse-authenticated', { bubbles: true, composed: true }));
    } else {
      this.__login();
    }
  }

  __login() {
    
    var self = this;
    Parse.User.logIn(this.user, this.password).then(function(user) {
      // reflect and notify authentication state
      self._setValid(true);
      self.dispatchEvent(new CustomEvent('parse-authenticated', { bubbles: true, composed: true }));
      console.info("Login successful.", user);
    }, function (error) {
      self._setLogin(false);
      console.error("Login failed.", error);
    });
  }

}

window.customElements.define('parse-auth', ParseAuth);