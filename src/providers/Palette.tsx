import { Palette } from '@mui/material';
import { cyan, orange } from '@mui/material/colors';

const lightPalette: Partial<Palette> = {
  primary: {
    light: '#62efff',
    main: cyan[500],
    dark: '#008ba3',
    contrastText: '#000000'
  },
  secondary: { light: '#ffd95b', main: orange[400], dark: '#c77800', contrastText: '#000000' },
  text: { primary: '#7c9aa0', secondary: '#7c9aa0', disabled: '#394142' },
  background: { default: '#f7f7f1', paper: '#ffffff' }
};

const darkPallette: Partial<Palette> = {
  background: {
    default: '#303030',
    paper: '#242526'
  },
  primary: {
    light: '#ffba47',
    main: '#ff8906',
    dark: '#c55a00',
    contrastText: '#000000'
  },
  secondary: { light: '#d9dbf1', main: '#a7a9be', dark: '#787a8e', contrastText: '#000000' }
  //   primary: {
  //     main: '#003b44'
  //   } as Palette['primary']
};

const palatte = {
  light: lightPalette,
  dark: darkPallette
};

export default palatte;
