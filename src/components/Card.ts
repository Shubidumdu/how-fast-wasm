const unFlippedStyle = {
  background: 'white',
  transform: 'rotateY(0deg)',
};

const flippedStyle = {
  background: 'lightgrey',
  transform: 'rotateY(180deg)',
};

const defaultStyle = {
  ...unFlippedStyle,
  paddingBottom: '100%',
};

export default class FlipCard extends HTMLElement {
  $container: HTMLDivElement;

  constructor() {
    super();
    this.$container = document.createElement('div');
    this.$container.className = 'card';
    Object.assign(this.$container.style, defaultStyle);
  }

  render() {
    if (this.flipped) {
      this.$container.animate([
        defaultStyle,
        flippedStyle,
      ], {
        duration: 300,
        fill: 'forwards'
      });
    }
    else {
      this.$container.animate([
        flippedStyle,
        defaultStyle,
      ], {
        duration: 300,
        fill: 'forwards'
      });
    }
  }
  
  connectedCallback() {
    this.append(this.$container);
  }

  static get observedAttributes() {
    return ['flipped'];
  }

  attributeChangedCallback() {
    this.render();
  }

  set flipped(value: unknown) {
    const isFlipped = Boolean(value);
    if (isFlipped) {
      this.setAttribute('flipped', '');
    }
    else {
      this.removeAttribute('flipped');
    }
  }

  get flipped(): boolean {
    return this.hasAttribute('flipped');
  }
}
