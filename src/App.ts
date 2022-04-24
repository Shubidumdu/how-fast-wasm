import CustomButton from './components/Button';
import CardGrid from './components/Grid';
import { ResponseEventData } from './workers/dfsWorker';

const dfsWorker = new Worker(new URL('./workers/dfsWorker.ts', import.meta.url));

const INITIAL_ROW_SIZE = 100;
const INITIAL_COL_SIZE = 100;
export default class HowFastWasm extends HTMLElement {
  #button: CustomButton;
  #grid: CardGrid;

  constructor() {
    super();
    this.#button = document.createElement('button', { is: 'custom-button' });
    this.#button.innerText = 'DFS';
    this.#grid = new CardGrid([INITIAL_ROW_SIZE, INITIAL_COL_SIZE]);
  }

  connectedCallback() {
    this.render();
    this.#button.addEventListener('click', this._onClickButton);
  }

  _onClickButton = () => {
    dfsWorker.postMessage({
      start: [0, 0],
      size: this.#grid.size,
      target: [99, 99],
    });
    dfsWorker.addEventListener('message', ({
      data,
    }: MessageEvent<ResponseEventData>) => {
      const { type, performance, position } = data;
      const [row, col] = position;
      console.log(type, row, col, performance);
      if (type === 'search') {
        this.#grid.flip(row, col);
      }
    });
  };

  render() {
    while (this.firstChild) this.removeChild(this.firstChild);
    this.append(this.#button, this.#grid);
  }
}

customElements.define('how-fast-wasm', HowFastWasm);
