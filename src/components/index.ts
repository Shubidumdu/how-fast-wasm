import CustomButton from './Button';

export const useComponents = () => {
  customElements.define('custom-button', CustomButton);
};

export const Button = CustomButton;
