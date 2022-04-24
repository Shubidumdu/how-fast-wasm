import CustomButton from './components/Button';
import CardGrid from './components/Grid';
import { jsDfs } from './utils/jsDfs';

export default class HowFastWasm extends HTMLElement {
  #button: CustomButton;
  #grid: CardGrid;

  constructor() {
    super();
    this.#button = document.createElement('button', { is: 'custom-button' });
    this.#button.innerText = 'DFS';
    this.#grid = new CardGrid();
  }

  connectedCallback() {
    this.render();
    this.#button.addEventListener('click', this._onClickButton);
  }

  _onClickButton = () => {
    jsDfs({
      start: [0, 0],
      size: [100, 100],
      target: [99, 99],
      onSearch: async (row: number, col: number) => this.#grid.flip(row, col),
      onFinish: (row: number, col: number) => this.#grid.flip(row, col),
    });
  };

  render() {
    while (this.firstChild) this.removeChild(this.firstChild);
    this.append(this.#button, this.#grid);
  }
}

customElements.define('how-fast-wasm', HowFastWasm);
