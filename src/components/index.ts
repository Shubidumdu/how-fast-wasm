import CustomButton from './Button';

export const useComponents = () => {
  customElements.define('custom-button', CustomButton, { extends: 'button' });
};

export const Button = CustomButton;
