import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class ParseApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
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

  isCollapsed() {
    return !this.$.collapse_id.opened;
  }
}

window.customElements.define('parse-app', ParseApp);