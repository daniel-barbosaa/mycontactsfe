import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

import './lib/EventManager';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
