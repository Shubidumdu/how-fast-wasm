import App from './App';
import { useComponents } from './components';

useComponents();

const root = document.querySelector('#root');
const app = new App();

root.append(app);
