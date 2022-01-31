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
    
        this.allWells = [];

        this.defaultTableConfigs = [
            {rows: 2, columns: 4},
            {rows: 4, columns: 8},
            {rows: 8, columns: 12}
        ]
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        const config = this.determineTableConfig();
        this.allWells = [...this.selectedReaction.wells]
        return html`
            <div class="wrapper">
                <plate-component
                    .rows=${config.rows}
                    .columns=${config.columns}
                    .numberOfWells=${this.selectedReaction.wells.length}
                    .selectNewWells=${this.selectNewWells}
                >
                </plate-component>
                <table-component
                    .selectedWells=${this.selectedWells.length>0?this.selectedWells:this.allWells}
                ></table-component>
            </div>
        `;
    }

    /**
     * Adds new well to the selectedWells property.
     * 
     * @param {Boolean} checked - denotes whether the well is checked or unchecked.
     * @param {Number} wellIndex - the index of the well.
     */
    selectNewWells = (checked, wellIndex) => {
        const newWell = this.selectedReaction.wells[wellIndex]; // declare a new variable to prevent mutation
        if (checked)
            this.selectedWells = [...this.selectedWells, newWell]; // add well if checked
        else
            this.selectedWells = this.selectedWells.filter(well => well !== newWell); // filter well if checked
    };

    determineTableConfig = () => {
        for(let i=0; i<this.defaultTableConfigs.length; i++) {
            if(this.defaultTableConfigs[i].rows * this.defaultTableConfigs[i].columns >= this.selectedReaction.wells.length)
                return this.defaultTableConfigs[i];
        }
    }
}
 
customElements.define('reaction-component', ReactionComponent);
 