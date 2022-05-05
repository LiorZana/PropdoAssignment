import { FC, PropsWithChildren, useContext, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from './ColorMode';
import { ThemeMode } from '.';
import palette from './Palette';
import LoraFont_VF from '/fonts/Lora-VariableFont_wght.ttf';
import LoraRegular from '/fonts/Lora-Regular.ttf';
import QuickSandFont_VF from '/fonts/Quicksand-VariableFont_wght.ttf';
import QuickSandFont from '/fonts/Quicksand-Regular.ttf';

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
    },
    typography: {
      fontFamily: 'QuickSand, Verdana'
    },
    components: {
      MuiOutlinedInput: { styleOverrides: { root: { borderRadius: '10px' } } },
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Lora';
          src: url(${LoraFont_VF}) format('truetype supports variations'),
          url(${LoraFont_VF}) format('truetype-variations'), url(${LoraRegular}) format('truetype');
          font-weight: 400 700;
          font-display: swap;
          font-style: normal;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'QuickSand';
          src: url(${QuickSandFont_VF}) format('truetype supports variations'),
          url(${QuickSandFont_VF}) format('truetype-variations'), url(${QuickSandFont}) format('truetype');
          font-weight: 400 700;
          font-display: swap;
          font-style: normal;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        `
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
