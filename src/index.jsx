import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './components/app/App';
import './style/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename='/Rick-and-Morty'>
        <App />
    </BrowserRouter>
);

