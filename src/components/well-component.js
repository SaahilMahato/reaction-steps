import { LitElement, html, css } from 'lit';

export class WellComponent extends LitElement {
    /**
     * Set styles of the app componenet
     * 
     * @returns {css} - css
     */
    static get styles() {
        return css`
            .wrapper {
                border-radius: 50%;
                width: 100%;
                height: 100%;
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

    /**
     * Sets properties of the component.
     * 
     * @returns {Object} - An object that contains all the properties
     */
    static get properties() {
        return {
            /**
             * The state of the well.
             * 
             * @type {Boolean}
             */
            checked: { type: Boolean },

            /**
             * The row index of the well.
             * 
             * @type {Number}
             */
            rowIndex: { type: Number },

            /**
             * The column index of the well.
             * 
             * @type {Number}
             */
            columnIndex: { type: Number },

            /**
             * The method that adds new wells to the reaction.
             * 
             * @type {Function}
             */
            selectNewWells: { type: Function },
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.rowIndex = 0;
        this.columnIndex = 0;

        this.checked = false;

        this.selectNewWells = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        return html`
            <div
                class="wrapper ${this.checked? "checked": "unchecked"}"
                @click=${this.onClick}
            >
            </div>
        `;
    }

    /**
     * Click event of the well.
     * Changes checked state and call selectNewWells() from reaction component.
     */
    onClick = () => {
        this.checked = !this.checked;
        this.selectNewWells(this.checked, this.rowIndex, this.columnIndex);
    }
}
 
customElements.define('well-component', WellComponent);
 