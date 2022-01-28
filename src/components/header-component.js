import { LitElement, html, css } from 'lit';

export class HeaderComponent extends LitElement {
    static get styles() {
        return css`
            .wrapper {
                padding: 20px;
            }

            .wrapper h1 {
                font-size: 18px;
            }

            .reactions-wrapper {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .reaction-box {
                padding: 5px 10px;
                border-radius: 5px;
                margin-right: 15px;
                cursor: pointer;
                min-width: 150px;
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            }

            .reaction-box p {
                margin: 2px;
            }

            .reaction-box-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .reaction-box-header img {
                width: 14px;
                height: 14px;
            }

            .reaction-box-content {
                font-weight: bold;
            }

            .reaction-box-unselected {
                border: 2px solid #8FA6D6;;
                background: #DCE3F2;
            }

            .reaction-box-selected {
                border: 2px solid #E8AF89;
                background: #F8E5D7;
            }
        `;
    }

    static get properties() {
        return {
            reactions: { type: Array },
            onReactionBoxClick : { type: Function },
        };
    }

    constructor() {
        super();

        this.reactions = [];
        
        this.onReactionBoxClick = () => {};
    }

    render() {
        return html`
            <div class="wrapper">
                <h1>Reactions</h1>
                <div class="reactions-wrapper">
                    ${this.reactions.map((reaction, index) => html`
                        <div 
                            class="reaction-box ${reaction.selected?'reaction-box-selected': 'reaction-box-unselected'}"
                            id=${index}
                            @click=${e => this.onReactionBoxClick(parseInt(e.currentTarget.id))}
                        >
                            <p class="reaction-box-header">${reaction.name} <img src="./images/dots.png"></p>
                            <p class="reaction-box-content">${reaction.value}</p>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
}
 
customElements.define('header-component', HeaderComponent);
 