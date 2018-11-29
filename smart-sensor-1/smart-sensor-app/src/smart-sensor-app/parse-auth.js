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
        type: Object,
        notify: true
      },
      login: {
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

  __auth(app) {

    var self = this;
    app.User.logIn(this.user, this.password).then(function (user) {
      self._setLogin(true);
      // notify about successful authentication
      self.dispatchEvent(new CustomEvent('parse-authenticated', { bubbles: true, composed: true }));
      console.info("Login successful.", user);
    }, function (error) {
      self._setLogin(false);
      console.error("Login failed.", error);
    });
  }
}

window.customElements.define('parse-auth', ParseAuth);