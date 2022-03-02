import { FC, useContext, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { createTheme, Palette } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@emotion/react';

import { ColorModeContext } from './ColorMode';
import { ThemeMode } from '.';

const lightPalette: Partial<Palette> = {
  background: {
    default: '#f0f0f0',
    paper: '#ffffff'
  },
  primary: {
    main: '#00b8d4'
  } as Palette['primary']
};

const darkPallette: Partial<Palette> = {
  background: {
    default: '#303030;',
    paper: '#242526'
  },
  primary: {
    main: '#003b44'
  } as Palette['primary']
};

const createThemeHelper = (mode: 'dark' | 'light') => {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      ...(isDark ? darkPallette : lightPalette),
      error: {
        main: 'rgb(232, 51, 51)'
      },
      success: {
        main: 'rgb(76,175,80)'
      }
    }
  });
};

const useCreateTheme = (mode: ThemeMode) => useMemo(() => createThemeHelper(mode), [mode]);

export const ThemeProvider: FC = ({ children }) => {
  const { mode } = useContext(ColorModeContext);
  const muiTheme = useCreateTheme(mode);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
