import { LitElement, html, css } from 'lit';

export class PlateComponent extends LitElement {
    static get styles() {
        return css`
            table {
                margin: 0 auto;
            }

            th {
                text-align: center;
                padding: 8px;
                color: #616161;
            }

            td {
                padding: 8px;
            }
        `;
    }

    static get properties() {
        return {
            rows: { type: Number },
            columns: { type: Number },
            selectNewWells: { type: Function },
        };
    }

    constructor() {
        super();

        this.rows = 0;
        this.columns = 0;

        this.rowTitle = [];
        this.columnTitle = [];

        this.selectNewWells = () => {};
    }

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
                                            .rowIndex=${rIndex}
                                            .columnIndex=${cIndex}
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

    calculateTableHeads = () => {
        const alpha = Array.from(Array(this.rows)).map((e, i) => i + 65);
        const alphabets = alpha.map((x) => String.fromCharCode(x));
        this.rowTitle = [...alphabets];

        const columns = [];
        for (let i=1; i<this.columns+1; i++)
            columns.push(i);
        this.columnTitle = [...columns];
    }

    updated() {
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
 
customElements.define('plate-component', PlateComponent);
 