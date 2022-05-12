// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as emotion from '@emotion/react';
import * as Mui from '@mui/material';

declare module '@emotion/react' {
  interface Theme extends Mui.Theme {}
}

declare module '@mui/material' {}
