import { LitElement, html, css } from 'lit';

export class HeaderComponent extends LitElement {

    /**
     * Set styles of the app componenet
     * 
     * @returns {css} - css
     */
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
                flex-wrap: wrap;
            }

            .reaction-box {
                border-radius: 5px;
                margin-right: 15px;
                margin-bottom: 15px;
                cursor: pointer;
                min-width: 200px;
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            }

            .reaction-box p {
                margin: 8px;
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

    /**
     * Sets properties of the component.
     * 
     * @returns {Object} - An object that contains all the properties
     */
    static get properties() {
        return {
            /**
             * The array that contains all data of the reaction.
             * 
             * @type {Array}
             */
            reactions: { type: Array },

            /**
             * The method that is called when reaction box is clicked.
             * 
             * @type {Function}
             */
            onReactionBoxClick : { type: Function },
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.reactions = [];
        
        this.onReactionBoxClick = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
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
 