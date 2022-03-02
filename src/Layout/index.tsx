import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import styles from './index.module.scss';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { PropsWithChildren } from 'react';
import { useColorMode } from '@/providers';

const Layout: (props: PropsWithChildren<any>) => JSX.Element = () => {
  const { mode, toggleMode } = useColorMode();
  const leftButtons: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Real estate', href: '/real-estate' },
    { label: 'Map', href: '/map' }
  ];
  return (
    <div className={styles.layoutRoot}>
      <AppBar classes={{ root: styles.appBarRoot }} elevation={0} variant='outlined'>
        <Toolbar
          css={css`
            min-height: 100% !important;
            max-height: 100% !important;
          `}
        >
          {leftButtons.map(({ label, href }, i) => (
            <nav key={i}>
              <Button size='large' href={href} variant='text'>
                <Typography color='secondary.light'>{label}</Typography>
              </Button>
            </nav>
          ))}
          <IconButton
            size='large'
            onClick={() => toggleMode()}
            style={{
              marginLeft: 'auto',
              color: mode === 'dark' ? 'white' : 'black'
            }}
          >
            <LightbulbOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
