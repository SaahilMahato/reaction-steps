import { LitElement, html, css } from 'lit';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

export class PlateComponent extends LitElement {

    /**
     * Set styles of the app componenet
     * 
     * @returns {css} - css
     */
    static get styles() {
        return css`
            .wrapper {
                display: flex;
                justify-content: space-evenly;
            }

            table {
                width: 720px;
                height: 480px;
                table-layout: fixed ;
            }

            th {
                text-align: center;
                padding: 8px;
                color: #616161;
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

            /**
             * The method that changes palte Config.
             * 
             * @type {Function} 
             */
            changePlateConfig: { type: Function },
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

        this.changePlateConfig = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        this.calculateTableHeads();
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
                                    <td>
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

                <paper-dropdown-menu label="Layout">
                    <paper-listbox slot="dropdown-content" selected="-1">
                        <paper-item @click=${()=>this.changePlateConfig({rows: 2, columns: 4})}>Rows: 2, Columns: 4</paper-item>
                        <paper-item @click=${()=>this.changePlateConfig({rows: 3, columns: 6})}>Rows: 3, Columns: 6</paper-item>
                        <paper-item @click=${()=>this.changePlateConfig({rows: 4, columns: 8})}>Rows: 4, Columns: 8</paper-item>
                        <paper-item @click=${()=>this.changePlateConfig({rows: 6, columns: 10})}>Rows: 6, Columns: 10</paper-item>
                        <paper-item @click=${()=>this.changePlateConfig({rows: 8, columns: 12})}>Rows: 8, Columns: 12</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
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
    updated(changedProps) {
        if (changedProps.has("rows") || changedProps.has("columns")) {
            const wells = this.shadowRoot.querySelectorAll("well-component");
            for (let i=0; i<wells.length; i++) {
                wells[i].checked = false;
                const well = wells[i].shadowRoot.querySelector(".checked");
                if(well) {
                    well.classList.remove("checked");
                    well.classList.add("unchecked");
                }
            }
        }
    }
}
 
customElements.define('plate-component', PlateComponent);
 