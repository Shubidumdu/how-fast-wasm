const INITIAL_ROW_SIZE = 10;
const INITIAL_COL_SIZE = 10;

const createGrid = (row: number, col: number) => Array.from(Array(row), () => Array(col).fill(false));

const style: Partial<CSSStyleDeclaration> = {
  display: 'grid',
  gap: '8px',
};

export default class CardGrid extends HTMLElement {
  #cards: boolean[][];

  constructor() {
    super();
    this.cards = createGrid(INITIAL_ROW_SIZE, INITIAL_COL_SIZE);
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
}
