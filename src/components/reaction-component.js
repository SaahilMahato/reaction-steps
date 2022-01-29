import { LitElement, html, css } from 'lit';

export class ReactionComponent extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                padding: 20px;
            }
        `;
    }

    static get properties() {
        return {
            selectedReaction: { type: Object },
            selectedWells: { type: Array },
        };
    }

    constructor() {
        super();

        this.selectedReaction = {};

        this.selectedWells = [];
    }

    render() {
        return html`
            <div class="wrapper">
                <plate-component
                    .rows=${this.selectedReaction.rows}
                    .columns=${this.selectedReaction.columns}
                    .selectNewWells=${this.selectNewWells}
                >
                </plate-component>
                <table-component
                    .selectedWells=${this.selectedWells}
                ></table-component>
            </div>
        `;
    }

    selectNewWells = (checked, rowIndex, columnIndex) => {
        const newWell = this.selectedReaction.wells[rowIndex][columnIndex];
        if (checked)
            this.selectedWells = [...this.selectedWells, newWell];
        else
            this.selectedWells = this.selectedWells.filter(well => well !== newWell);
    };
}
 
customElements.define('reaction-component', ReactionComponent);
 