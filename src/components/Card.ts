export type FlipCardState = {
  isFlipped: boolean;
}

export type FlipCardProps = Partial<FlipCardState>;

export default class FlipCard extends HTMLElement {
  state: FlipCardState = {
    isFlipped: false,
  };
  
  constructor(props: FlipCardProps) {
    super();
    Object.assign(this.state, props);
    this.render();
  }

  render = () => {
    const { isFlipped } = this.state;
    this.innerHTML = `
      <div class="card">
        ${ isFlipped ? 'Back' : 'Front' }
      </div>
    `;
  };

  setState = (newState: Partial<FlipCardState>) => {
    Object.assign(this.state, newState);
    this.render();
  };
}
