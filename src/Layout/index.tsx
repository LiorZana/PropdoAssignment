import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import styles from './index.module.scss';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Fragment, PropsWithChildren } from 'react';
import { useColorMode } from '@/providers/theme';
import Logo from '@/components/Logo';
import Link from '@/components/Link';

const Layout: (props: PropsWithChildren<any>) => JSX.Element = () => {
  const { mode, toggleMode } = useColorMode();
  const leftButtons: { label: string; href: string }[] = [
    { label: 'Listings', href: '/real-estate' },
    { label: 'Map', href: '/map' }
  ];
  return (
    <div className={styles.layoutRoot}>
      <AppBar
        classes={{ root: styles.appBarRoot }}
        css={theme =>
          css`
            background-color: ${theme.palette.primary.dark};
          `
        }
        enableColorOnDark
        elevation={0}
        variant='outlined'
      >
        <Toolbar
          css={css`
            min-height: 100% !important;
            max-height: 100% !important;
          `}
        >
          <nav>
            <Button
              LinkComponent={Link}
              variant='text'
              href='/'
              color='secondary'
              sx={{
                py: 0,
                px: 2,
                borderRadius: 0
              }}
            >
              <Logo />
            </Button>
          </nav>
          <nav
            css={css`
              display: flex;
              align-items: flex-end;
              height: 80%;
            `}
          >
            {/* <Divider
              sx={{ borderWidth: 2, borderRadius: 10, borderColor: 'text.primary' }}
              flexItem
              orientation='vertical'
            /> */}
            {leftButtons.map(({ label, href }, i) => (
              <Fragment key={i}>
                <nav>
                  <Button
                    LinkComponent={Link}
                    sx={{
                      textTransform: 'none',
                      py: 0,
                      // mx: 0.1,
                      borderRadius: 0
                      // borderWidth: '0 1px',
                      // borderStyle: 'solid',
                      // borderColor: 'secondary.dark'
                    }}
                    href={href}
                    size='large'
                  >
                    <Typography letterSpacing={2} color='black' variant='h6'>
                      {label}
                    </Typography>
                  </Button>
                </nav>
                {/* <Divider flexItem orientation='vertical' /> */}
              </Fragment>
            ))}
          </nav>
          <IconButton
            size='large'
            onClick={() => toggleMode()}
            sx={{
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
