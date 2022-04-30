import CustomButton from './components/Button';
import CardGrid from './components/Grid';
import { ResponseEventData } from './workers/dfsWorker';

const dfsWorker = new Worker(new URL('./workers/dfsWorker.ts', import.meta.url));
const dfsWasmWorker = new Worker(new URL('./workers/dfsWorker.wasm.ts', import.meta.url));

const INITIAL_ROW_SIZE = 50;
const INITIAL_COL_SIZE = 50;
export default class HowFastWasm extends HTMLElement {
  #dfsButton: CustomButton;
  #dfsWasmButton: CustomButton;
  #grid: CardGrid;

  constructor() {
    super();
    this.#dfsButton = document.createElement('button', { is: 'custom-button' });
    this.#dfsButton.innerText = 'DFS';
    this.#dfsWasmButton = document.createElement('button', { is: 'custom-button' });
    this.#dfsWasmButton.innerText = 'DFS with WASM';
    this.#grid = new CardGrid([INITIAL_ROW_SIZE, INITIAL_COL_SIZE]);
  }

  connectedCallback() {
    this.render();
    this.#dfsButton.addEventListener('click', this._onClickDfs);
    this.#dfsWasmButton.addEventListener('click', this._onClickDfsWasm);
  }

  _onClickDfs = () => {
    dfsWorker.addEventListener('message', ({
      data,
    }: MessageEvent<ResponseEventData>) => {
      const { type, performance, position } = data;
      const [row, col] = position;
      if (type === 'search') {
        this.#grid.flip(row, col);
      }
      if (type === 'finish') {
        console.log(type, row, col, performance);
      }
    });
    dfsWorker.postMessage({
      start: [0, 0],
      size: this.#grid.size,
      target: [9, 0],
    });
  };

  _onClickDfsWasm = () => {
    dfsWasmWorker.addEventListener('message', ({
      data,
    }: MessageEvent<ResponseEventData>) => {
      const { type, performance, position } = data;
      const [row, col] = position;
      if (type === 'search') {
        this.#grid.flip(row, col);
      }
      if (type === 'finish') {
        console.log(type, row, col, performance);
      }
    });
    dfsWasmWorker.postMessage({
      start: [0, 0],
      size: this.#grid.size,
      target: [49, 0],
    });
  };

  render() {
    while (this.firstChild) this.removeChild(this.firstChild);
    this.append(this.#dfsButton, this.#grid);
    this.append(this.#dfsWasmButton, this.#grid);
  }
}

customElements.define('how-fast-wasm', HowFastWasm);
