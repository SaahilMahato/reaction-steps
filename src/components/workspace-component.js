import { LitElement, html, css } from 'lit';

export class WorkspaceComponent extends LitElement {
    static get styles() {
        return css`
            
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

                >
                </plate-component>
                <table-component></table-component>
            </div>
        `;
    }
}
 
customElements.define('workspace-component', WorkspaceComponent);
 