import { LitElement, html, css } from 'lit';

import { reactions } from '../constants/constants';

export class AppComponent extends LitElement {

    /**
     * Set styles of the app componenet
     * 
     * @returns {css} - css
     */
    static get styles() {
        return css`
            .container {
                width: 100vw;
                height: 100vh;
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
             * The array that contains all reaction data.
             *
             * @type {Array}
             */
            reactions: { type: Array },

            /**
             * The reaction that is currently selected by the user.
             * 
             * @type {Object}
             */
            selectedReaction: { type: Object },
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.reactions = reactions; // fetched from constants

        this.selectedReaction = this.reactions[0]; // default reaction will be the first reaction in the array
    }

    /**
     * Renders the component.
     * 
     * @returns {html} - The markup of the component.
     */
    render() {
        return html`
            <div class="container">
                <header-component
                    .reactions=${this.reactions}
                    .onReactionBoxClick=${this.onReactionBoxClick}
                ></header-component>

                <reaction-component
                    .selectedReaction=${this.selectedReaction}
                    .selectedWells=${[]}
                >
                </reaction-component>
            </div>
        `;
    }

    /**
     * Triggers event when a reaction is clicked and changes the reaction.
     * 
     * @param {Number} clickedBox - The index of the selected reaction.
     */
    onReactionBoxClick = (clickedBox) => {
        const temp = [...this.reactions]; // declare a temp array and copy reaction to prevent mutation

        // loop through all reaction
        for (let i = 0; i < temp.length; i++) {
            if (i === clickedBox) {
                temp[i].selected = true; // set selected property of reaction to true
                this.selectedReaction = { ...temp[i] }; // set the reaction to selectedReaction property
            } 
            else 
                temp[i].selected = false; // if not clicked set selected to false
        }
        this.reactions = [...temp]; // after looping set the reactions property to temp
    };
}

customElements.define('app-component', AppComponent);
