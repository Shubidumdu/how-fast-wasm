import FlipCard from './Card';

const createGrid = (row: number, col: number) => Array.from(Array(row), () => Array(col).fill(false));

const style: Partial<CSSStyleDeclaration> = {
  display: 'grid',
  // gap: '8px',
};

export default class CardGrid extends HTMLElement {
  #cards: boolean[][];

  constructor([row, col]: [number, number]) {
    super();
    this.cards = createGrid(row, col);
    Object.assign(this.style, style);
  }

  connectedCallback() {
    this.render();
  }
  
  set cards(value: boolean[][]) {
    this.#cards = value;
    this.render();
  }
  
  get cards() {
    return this.#cards;
  }

  get size() {
    return [this.#cards.length, this.#cards[0].length];
  }
  
  render = () => {
    this.style.gridTemplateColumns = `repeat(${ this.cards[0].length }, 1fr)`;
    this.innerHTML = this.#cards.map((row) => 
      row.map((isFlipped) => `
        <flip-card ${isFlipped ? 'flipped' : ''}></flip-card>`
      ).join(''),
    ).join('');
  };

  resize = (row: number, col: number) => {
    this.cards = createGrid(row, col);
    this.render();
  };

  flip = (row: number, col: number) => {
    const index = row * (this.#cards[0].length) + col;
    const targetCard: FlipCard = this.querySelector(`flip-card:nth-child(${index + 1})`);
    targetCard.flipped = true;
  };
}
