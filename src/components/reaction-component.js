import { LitElement, html, css } from 'lit';

export class ReactionComponent extends LitElement {

    /**
     * Set styles of the app componenet
     * 
     * @returns {css} - css
     */
    static get styles() {
        return css`
            .wrapper {
                padding: 20px;
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
             * The reaction that the user selected.
             * 
             * @type {Object}
             */
            selectedReaction: { type: Object },

            /**
             * The wells that the user selected.
             * 
             * @type {Array}
             */
            selectedWells: { type: Array },
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.selectedReaction = {};

        this.selectedWells = [];
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        return html`
            <div class="wrapper">
                <plate-component
                    .rows=${this.selectedReaction.wells.length}
                    .columns=${this.selectedReaction.wells[0].length}
                    .selectNewWells=${this.selectNewWells}
                >
                </plate-component>
                <table-component
                    .selectedWells=${this.selectedWells}
                ></table-component>
            </div>
        `;
    }

    /**
     * Adds new well to the selectedWells property.
     * 
     * @param {Boolean} checked - denotes whether the well is checked or unchecked.
     * @param {*} rowIndex - the index of row of the well.
     * @param {*} columnIndex - the index of column of the well.
     */
    selectNewWells = (checked, rowIndex, columnIndex) => {
        const newWell = this.selectedReaction.wells[rowIndex][columnIndex]; // declare a new variable to prevent mutation
        if (checked)
            this.selectedWells = [...this.selectedWells, newWell]; // add well if checked
        else
            this.selectedWells = this.selectedWells.filter(well => well !== newWell); // filter well if checked
    };
}
 
customElements.define('reaction-component', ReactionComponent);
 