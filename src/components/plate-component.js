import { LitElement, html, css } from 'lit';

export class PlateComponent extends LitElement {
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
                Hello Plate
            </div>
        `;
    }
}
 
customElements.define('plate-component', PlateComponent);
 