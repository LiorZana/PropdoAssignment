import { FC } from 'react';
import Routes from './Routes';
import { ColorMode, ThemeProvider } from '@/providers/theme';
import { BrowserRouter } from 'react-router-dom';
import { RootStoreProvider } from './providers/RootStore';

console.log(import.meta.env);

const App: FC = () => {
  return (
    <ColorMode>
      <ThemeProvider>
        <RootStoreProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </RootStoreProvider>
      </ThemeProvider>
    </ColorMode>
  );
};

export default App;
