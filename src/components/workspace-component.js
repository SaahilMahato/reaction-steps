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
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="wrapper">
                <plate-component
                    .rows=${this.selectedReaction.rows}
                    .columns=${this.selectedReaction.columns}
                >
                </plate-component>
                <table-component></table-component>
            </div>
        `;
    }
}
 
customElements.define('workspace-component', WorkspaceComponent);
 