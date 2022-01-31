import { LitElement, html, css } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';

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
                background-color: lightgray;
                border: none;
            }

            .invalid {
                background-color: white;
                border: solid 1px #A4A4A4;
                border-style: dashed;
                cursor: auto !important;
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
             * The index of the well.
             * 
             * @type {Number}
             */
            wellIndex: { type: Number },

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

        this.wellIndex = 0;

        this.checked = false;

        this.selectNewWells = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        const classes = { invalid: this.wellIndex<0,
            checked: this.checked && !this.invalid,
            unchecked: !this.checked && !this.invalid
        }
        return html`
            <div
                class="wrapper ${classMap(classes)}"
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
        if(this.wellIndex<0)
            return;
        this.checked = !this.checked;
        this.selectNewWells(this.checked, this.wellIndex);
    }
}
 
customElements.define('well-component', WellComponent);
 