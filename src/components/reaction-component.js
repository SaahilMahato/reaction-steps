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

            /**
             * The number of rows of the plate.
             * 
             * @type {Number}
             */
            rows: { type: Number },

            /**
             * The number of columns of the plate.
             * 
             * @type {Number}
             */
            columns: { type: Number }
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.rows = 0;
        this.columns = 0;

        this.selectedReaction = {};

        this.selectedWells = [];
    
        this.allWells = [];

        this.isCustomLayout = false;

        this.defaultPlateConfigs = [
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
        if (!this.isCustomLayout) this.determinePlateConfig();
        this.isCustomLayout = false;
        this.allWells = [...this.selectedReaction.wells];
        return html`
            <div class="wrapper">
                <plate-component
                    .rows=${this.rows}
                    .columns=${this.columns}
                    .numberOfWells=${this.selectedReaction.wells.length}
                    .selectNewWells=${this.selectNewWells}
                    .changePlateConfig=${this.changePlateConfig}
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

    determinePlateConfig = () => {
        for(let i=0; i<this.defaultPlateConfigs.length; i++) {
            if(this.defaultPlateConfigs[i].rows * this.defaultPlateConfigs[i].columns >= this.selectedReaction.wells.length) {
                this.rows = this.defaultPlateConfigs[i].rows;
                this.columns = this.defaultPlateConfigs[i].columns;
                return;
            }
        }
    }

    changePlateConfig = (config) => {
        if (config.rows * config.columns < this.selectedReaction.wells.length) {
            alert("Invalid Configuration for this reaction");
            return;
        }
        this.isCustomLayout = true;
        this.rows = config.rows;
        this.columns = config.columns;
    }
}
 
customElements.define('reaction-component', ReactionComponent);
 