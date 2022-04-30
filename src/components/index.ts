import CustomButton from './Button';
import FlipCard from './Card';
import CardGrid from './Grid';

export const useComponents = () => {
  customElements.define('custom-button', CustomButton, { extends: 'button' });
  customElements.define('flip-card', FlipCard);
  customElements.define('card-grid', CardGrid);
};

export const Button = CustomButton;
