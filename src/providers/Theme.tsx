import { FC, PropsWithChildren, useContext, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { ColorModeContext } from './ColorMode';
import { ThemeMode } from '.';
import palette from './Palette';

const createThemeHelper = (mode: 'dark' | 'light') => {
  return createTheme({
    palette: {
      mode,
      ...palette[mode],
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

export const ThemeProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const { mode } = useContext(ColorModeContext);
  const muiTheme = useCreateTheme(mode);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
