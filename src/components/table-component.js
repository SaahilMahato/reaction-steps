import { LitElement, html, css } from 'lit';

export class TableComponent extends LitElement {
    static get styles() {
        return css`
            
        `;
    }

    static get properties() {
        return {

        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="wrapper">
                Hello Table
            </div>
        `;
    }
}
 
customElements.define('table-component', TableComponent);
 