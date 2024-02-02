import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './components/app/App';
import './style/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <HashRouter basename='/Rick-and-Morty' hashType='slash'>
        <App />
    </HashRouter>
);

