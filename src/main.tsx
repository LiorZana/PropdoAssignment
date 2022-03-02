import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ColorMode, ThemeProvider } from '@/providers';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './main.css';

ReactDOM.render(
  <StrictMode>
    <ColorMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorMode>
  </StrictMode>,
  document.getElementById('root')
);
