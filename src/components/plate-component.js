import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit-html/directives/style-map.js';

export class PlateComponent extends LitElement {

    /**
     * Set styles of the app componenet
     * 
     * @returns {css} - css
     */
    static get styles() {
        return css`
            table {
                margin: 0 auto;
                width: 600px;
                height: 300px;
            }

            th {
                text-align: center;
                padding: 8px;
                color: #616161;
            }

            td {
                padding: 0.5%;
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
             * The number of rows that the plate will have.
             * 
             * @type {Number}
             */
            rows: { type: Number },

            /**
             * The number of columns that the plate will have.
             * 
             * @type {Number}
             */
            columns: { type: Number },

            /**
             * The number of wells that the plate will have.
             * 
             * @type {Number}
             */
            numberOfWells: { type: Number },

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

        this.rows = 0;
        this.columns = 0;

        this.rowTitle = [];
        this.columnTitle = [];

        this.numberOfWells = 0;

        this.selectNewWells = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        this.calculateTableHeads();
        const cellStyle = this.calculateCellSize();
        return html`
            <div class="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            ${this.columnTitle.map(cTitle => html`<th scope="col">${cTitle}</th>`)}
                        </tr>
                    </thead>
                    <tbody>
                        ${this.rowTitle.map((rTitle, rIndex) => html`
                            <tr>
                                <th scope="row">${rTitle}</th>
                                ${this.columnTitle.map((cTitle, cIndex)=> html`
                                    <td style=${styleMap(cellStyle)}>
                                        <well-component
                                            .checked=${false}
                                            .wellIndex=${((rIndex*this.columns)+cIndex)<this.numberOfWells?(rIndex*this.columns)+cIndex: -1}
                                            .selectNewWells=${this.selectNewWells}
                                        >
                                        </well-component>
                                    </td>
                                `)}
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * Calculate the headings of the wells and adds
     * to the rowTitle and columnTitle based on 
     * the number of rows and columns.
     */
    calculateTableHeads = () => {
        const alpha = Array.from(Array(this.rows)).map((e, i) => i + 65);
        const alphabets = alpha.map((x) => String.fromCharCode(x));
        this.rowTitle = [...alphabets];

        const columns = [];
        for (let i=1; i<this.columns+1; i++)
            columns.push(i);
        this.columnTitle = [...columns];
    }

    /**
     * Updated lifecycle event that
     * fetches all well component inside this component and
     * sets its checked property to false and removes 
     * checked from class list and adds unchecked to class list.
     */
    updated() {
        const wells = this.shadowRoot.querySelectorAll("well-component");
        for (let i=0; i<wells.length; i++) {
            wells[i].checked = false;
            const well = wells[i].shadowRoot.querySelector(".wrapper");
            if(well) {
                well.classList.remove("checked");
                well.classList.add("unchecked");
            }
        }
    }

    /**
     * Calculates the size of each cell based on the number of rows and columns.
     * 
     * @returns {object} - object that has the values of width and height.
     */
    calculateCellSize = () => {
        const width = 600/this.columns;
        const height = 300/this.rows;

        const style = {
            width: parseInt(width) + 'px',
            height: parseInt(height) - 15 + 'px'
        }
        return style;
    }
}
 
customElements.define('plate-component', PlateComponent);
 