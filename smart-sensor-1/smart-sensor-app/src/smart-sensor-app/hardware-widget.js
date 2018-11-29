import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class HardwareWidget extends PolymerElement {
  static get template() {
    return html`
      <style> 
        :host {
          display: block;
        }

        table {
          width: 100%;
        }
  
        td {
          padding: 0.5em;
        }
  
        th {
          text-align: left;
        }
  
        tr:nth-child(odd) td {
          background-color: var(--paper-grey-100);
        }
  
        tr:nth-child(even) td {
          background-color: var(--paper-grey-200);
        }
      </style>

      <table>
        <tr>
          <th>Parameter</th>
          <th>Value</th>
        </tr>
        <template is="dom-repeat" items="{{data}}">
          <tr>
            <td>{{item.$key}}</td>
            <td>{{item.$val}}</td>
          </tr>
        </template>
      </table>
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        notify: true,
        observer: "handle"
      }
    };
  }

  handle(event) {
    console.log(event);
  }
}

window.customElements.define('hardware-widget', HardwareWidget);