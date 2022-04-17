export default class HowFastWasm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <custom-button></custom-button>
    `;
  }
}

customElements.define('how-fast-wasm', HowFastWasm);
