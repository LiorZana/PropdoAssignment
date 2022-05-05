import { Palette } from '@mui/material';
import { cyan, orange } from '@mui/material/colors';

const lightPalette: Partial<Palette> = {
  background: { default: '#f7f7f1', paper: '#ffffff' },
  primary: {
    light: '#62efff',
    main: cyan[500],
    dark: '#008ba3',
    contrastText: '#000000'
  },
  secondary: { light: '#ffd95b', main: orange[400], dark: '#c77800', contrastText: '#000000' },
  text: { primary: '#7c9aa0', secondary: '#7c9aa0', disabled: '#394142' }
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
  secondary: { light: '#6aaaff', main: '#067cff', dark: '#0051cb', contrastText: '#000000' }
};

const palatte = {
  light: lightPalette,
  dark: darkPallette
};

export default palatte;
