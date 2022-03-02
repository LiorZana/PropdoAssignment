// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as emotion from '@emotion/react';

declare module '@emotion/react' {
  type MuiTheme = import('@mui/material/styles/createTheme').Theme;
  interface Theme extends MuiTheme {}
}
