import { LitElement, html, css } from 'lit';

export class WorkspaceComponent extends LitElement {
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
                <table-component></table-component>
            </div>
        `;
    }

    selectNewWells = (checked, newWell) => {
        if (checked)
            this.selectedWells = [...this.selectedWells, newWell];
        else {
            this.selectedWells = this.selectedWells.filter(well => well !== newWell);
        }

        console.log(this.selectedWells);
    };
}
 
customElements.define('workspace-component', WorkspaceComponent);
 