import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './providers/index.tsx';

import App from './App.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProviders>
);
