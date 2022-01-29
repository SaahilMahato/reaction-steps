import { LitElement, html, css } from 'lit';

export class TableComponent extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                margin-top: 20px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
            }

            th {
                padding: 8px;
                color: #75757E;
                background-color: #F5F5F5;
                border: 1px solid #E8E8E8;
            }

            td {
                padding: 8px;
                color: #3F3F46;
                border: 1px solid #E8E8E8;
            }

            .text {
                text-align: center;
            }

            .number {
                text-align: end;
            }

            .structure-img {
                max-width: 150px;
                max-height: 100px;
            }
        `;
    }

    static get properties() {
        return {
            selectedWells: { type: Array },
        };
    }

    constructor() {
        super();

        this.selectedWells = [];
    }

    render() {
        return html`
            <div class="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Reagent Name</th>
                            <th>Structure</th>
                            <th>Barcode</th>
                            <th>Equivalents</th>
                            <th>Density</th>
                            <th>Purity</th>
                            <th>mmol Per Reaction</th>
                            <th>Total Reagent Needed (g)</th>
                            <th>Desired Reagent Concentration (M)</th>
                            <th>Molecular Weight (MW)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.selectedWells.map(well => html`
                            <tr>
                                <td class="text">${well.reagentName}</td>
                                <td class="text"><img class="structure-img" src=${well.structure}></td>
                                <td class="text">${well.barcode}</td>
                                <td class="number">${well.equivalents}</td>
                                <td class="number">${well.density}</td>
                                <td class="number">${well.purity}</td>
                                <td class="number">${well.mmolPerReaction}</td>
                                <td class="number">${well.totalReagentNeeded}</td>
                                <td class="number">${well.desiredReagentConcentration}</td>
                                <td class="number">${well.molecularWeight}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        `;
    }
}
 
customElements.define('table-component', TableComponent);
 