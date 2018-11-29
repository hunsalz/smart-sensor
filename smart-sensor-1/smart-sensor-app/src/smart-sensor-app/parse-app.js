import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import 'parse/dist/parse.min.js';

class ParseApp extends PolymerElement {
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
      applicationId: {
        type: String
      },
      javaScriptKey: {
        type: String
      },
      serverUrl: {
        type: String
      },
      liveQueryServerUrl: {
        type: String
      },
      app: {
        type: Object,
        notify: true,
        computed: '__computeApp(applicationId, javaScriptKey, serverUrl, liveQueryServerUrl)'
      }
    };
  }

  __computeApp(applicationId, javaScriptKey, serverUrl, liveQueryServerUrl) {

    if (applicationId && javaScriptKey && serverUrl) {
      Parse.initialize(applicationId, javaScriptKey);
      Parse.serverURL = serverUrl;
      Parse.liveQueryServerURL = liveQueryServerUrl;
      console.info("Parse initialized.", Parse);
      this.dispatchEvent(new CustomEvent('parse-initialized', { bubbles: true, composed: true }));
    } else {
      console.error("Initializing Parse failed! Check your attributes: 'applicationId', 'javaScriptKey', 'serverUrl' are mandatory.");
      return null;
    }

    return Parse;
  }
}

window.customElements.define('parse-app', ParseApp);