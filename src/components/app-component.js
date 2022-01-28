import { LitElement, html, css } from 'lit';


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

    this.reactions = [
      {
        name: 'Reaction 1',
        value: 1,
        rows: 2,
        columns: 4,
        selected: true,
      },
      {
        name: 'Reaction 2',
        value: 2,
        rows: 4,
        columns: 6,
        selected: false,
      },
      {
        name: 'Reaction 3',
        value: 3,
        rows: 5,
        columns: 8,
        selected: false,
      },
      {
        name: 'Reaction 4',
        value: 4,
        rows: 8,
        columns: 12,
        selected: false,
      },
    ];

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
        this.selectedReaction = {...temp[i]};
      }
      else
        temp[i].selected = false;
    this.reactions = [...temp];
  };
}

customElements.define('app-component', AppComponent);
