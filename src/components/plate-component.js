import { LitElement, html, css } from 'lit';

export class PlateComponent extends LitElement {
    static get styles() {
        return css`
            table {
                margin: 0 auto;
            }

            th {
                width: 10px;
                text-align: start;
                padding-left: 12px;
            }

            td {
                width: 10px;
            }

            paper-checkbox {
                border-radius: 50%;
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
                            ${this.columnTitle.map(title => html`<th scope="col">${title}</th>`)}
                        </tr>
                    </thead>
                    <tbody>
                        ${this.rowTitle.map(rowTitle => html`
                            <tr>
                                <th scope="row">${rowTitle}</th>
                                ${this.columnTitle.map(columnTitle=> html`
                                    <td>
                                        <div>
                                            <well-component type="checkbox"
                                                .checked=${false}
                                                .value=${rowTitle+columnTitle}
                                                .selectNewWells=${this.selectNewWells}
                                            >
                                            </well-component>
                                        </div>
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
}
 
customElements.define('plate-component', PlateComponent);
 