import { LitElement, html, css } from 'lit';

export class PlateComponent extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                display: grid;
            }
        `;
    }

    static get properties() {
        return {
            rows: { type: Number },
            columns: { type: Number },
        };
    }

    constructor() {
        super();

        this.rows = 0;
        this.columns = 0;

        this.rowTitle = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.columnTitle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    render() {
        return html`
            <div class="wrapper">
                ${this.rows}
                ${this.columns}
            </div>
        `;
    }
}
 
customElements.define('plate-component', PlateComponent);
 