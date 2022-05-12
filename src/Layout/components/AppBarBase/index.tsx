import { useColorMode } from '@/providers/theme';
import { AppBar, css, IconButton, Theme, Toolbar, useMediaQuery } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { SystemCssProperties } from '@mui/system';
import LogoButton from '../LogoButton';
import { ReactNode } from 'react';

export interface AppBarBaseProps {
  height: string | number;
  backgroundColor: string & SystemCssProperties['color'];
  children?: ReactNode | ReactNode[];
}

const AppBarBase = ({ height, backgroundColor, children }: AppBarBaseProps) => {
  const isSm = useMediaQuery<Theme>(({ breakpoints }) => breakpoints.down('sm'));
  const { toggleMode } = useColorMode();
  return (
    <AppBar
      css={css`
        background-color: ${backgroundColor};
        border: none;
        height: ${height};
        padding-right: 0 !important;
      `}
      enableColorOnDark
      elevation={0}
      variant='outlined'
    >
      <Toolbar
        css={css`
          min-height: 100% !important;
          max-height: 100% !important;
        `}
        sx={{ pl: { xs: 1, md: 2 } }}
      >
        <nav style={{ flexGrow: +isSm }}>
          <LogoButton />
        </nav>
        <nav
          css={css`
            display: flex;
            align-items: flex-end;
            height: 80%;
          `}
        >
          {children}
        </nav>
        <IconButton
          size='large'
          name='Light mode button'
          title='Light mode button'
          onClick={() => toggleMode()}
          sx={{
            marginLeft: isSm ? 0 : 'auto'
          }}
        >
          <LightbulbOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarBase;
