import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ColorMode, ThemeProvider } from '@/providers';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './main.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ColorMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorMode>
  </StrictMode>
);
