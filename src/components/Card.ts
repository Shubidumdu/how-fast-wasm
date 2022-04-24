export default class FlipCard extends HTMLElement {
  $container: HTMLDivElement;

  constructor() {
    super();
    this.$container = document.createElement('div');
    this.$container.className = 'card';
  }

  render() {
    if (this.flipped) {
      this.$container.classList.add('flipped');
    }
    else {
      this.$container.classList.remove('flipped');
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
