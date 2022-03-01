import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import styles from './index.module.scss';
import { useColorMode } from '@/contexts/colorMode';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useChosenTheme } from '@/providers';

const MainLayout = () => {
  const theme = useChosenTheme();
  const { mode, toggleColorMode } = useColorMode();
  const leftButtons: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Contact', href: '/contact' }
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
            onClick={() => toggleColorMode()}
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

export default MainLayout;
