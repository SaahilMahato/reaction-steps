import { LitElement, html, css } from 'lit';

import { reactions } from '../constants/constants';

export class AppComponent extends LitElement {
    static get styles() {
        return css`
            .container {
                width: 100vw;
                height: 100vh;
        }
    `;
    }

    static get properties() {
        return {
            reactions: { type: Array },
            selectedReaction: { type: Object },
        };
    }

    constructor() {
        super();

        this.reactions = reactions;

        this.selectedReaction = this.reactions[0];
    }

    render() {
        return html`
            <div class="container">
                <header-component
                    .reactions=${this.reactions}
                    .onReactionBoxClick=${this.onReactionBoxClick}
                ></header-component>

                <workspace-component
                    .selectedReaction=${this.selectedReaction}
                    .selectedWells=${[]}
                >
                </workspace-component>
            </div>
        `;
    }

    onReactionBoxClick = (clickedBox) => {
        const temp = [...this.reactions];
        for (let i = 0; i < temp.length; i++)
            if (i === clickedBox) {
            temp[i].selected = true;
            this.selectedReaction = { ...temp[i] };
        } 
        else 
            temp[i].selected = false;
        this.reactions = [...temp];
    };
}

customElements.define('app-component', AppComponent);
