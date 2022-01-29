import { LitElement, html, css } from 'lit';

export class WellComponent extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                border-radius: 50%;
                width: 32px;
                height: 32px;
                cursor: pointer;
            }

            .checked {
                background-color: #72D38D;
                border: none;
            }

            .unchecked {
                background-color: white;
                border: solid 1px #A4A4A4;
                border-style: dashed;
            }
        `;
    }

    static get properties() {
        return {
            checked: { type: Boolean },
            rowIndex: { type: Number },
            columnIndex: { type: Number },
            selectNewWells: { type: Function },
        };
    }

    constructor() {
        super();

        this.checked = false;

        this.rowIndex = 0;
        this.columnIndex = 0;

        this.selectNewWells = () => {};
    }

    render() {
        return html`
            <div
                class="wrapper ${this.checked? "checked": "unchecked"}"
                @click=${this.onClick}
            >
            </div>
        `;
    }

    onClick = () => {
        this.checked = !this.checked;
        this.selectNewWells(this.checked, this.rowIndex, this.columnIndex);
    }
}
 
customElements.define('well-component', WellComponent);
 