export default class HowFastWasm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <button is="custom-button">버튼</button>
    `;
  }
}

customElements.define('how-fast-wasm', HowFastWasm);
