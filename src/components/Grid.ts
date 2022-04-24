const INITIAL_ROW_SIZE = 10;
const INITIAL_COL_SIZE = 10;

const createGrid = (row: number, col: number) => Array.from(Array(row), () => Array(col).fill(false));

export default class CardGrid extends HTMLElement {
  _cards: boolean[][];

  constructor() {
    super();
    this.cards = createGrid(INITIAL_ROW_SIZE, INITIAL_COL_SIZE);
  }

  connectedCallback() {
    this.render();
  }

  
  set cards(value: boolean[][]) {
    this._cards = value;
    this.render();
  }
  
  get cards() {
    return this._cards;
  }
  
  render = () => {
    this.innerHTML = this._cards.map((row) => 
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
