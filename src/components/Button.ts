export type CustomButtonProps = {
  onClick: () => void;
  innerText: string;
}
export default class CustomButton extends HTMLButtonElement {
  constructor({ onClick, innerText }: CustomButtonProps) {
    super();
    this.className = 'button';
    this.onclick = onClick;
    if(innerText) this.innerText = innerText;
    this.addEventListener('click', onClick);
  }

}
