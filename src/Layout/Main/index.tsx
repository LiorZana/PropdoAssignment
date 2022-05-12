import { Button, IconButton, Typography, useMediaQuery, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import Link from '@/components/Link';
import OutletContainer from '../components/OutletContainer';
import AppBarBase from '../components/AppBarBase';
import LayoutRoot from '../components/LayoutRoot';
import DrawerList from './DrawerList';
import navButtons from './navButtons';

const appBarHeight = '60px';

const MainLayout: (props: PropsWithChildren<{}>) => JSX.Element = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isSm && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [isDrawerOpen, isSm]);

  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={handleCloseDrawer}>
        <DrawerList onClose={handleCloseDrawer} />
      </Drawer>
      <LayoutRoot>
        <AppBarBase height={appBarHeight} backgroundColor={theme.palette.primary.main}>
          {isSm ? (
            <IconButton name='Open menu button' title='Open menu button' onClick={() => setDrawerOpen(open => !open)}>
              <MenuIcon />
            </IconButton>
          ) : (
            navButtons.map(({ label, href }, i) => (
              <Fragment key={i}>
                <nav>
                  <Button
                    LinkComponent={Link}
                    sx={{
                      textTransform: 'none',
                      py: 0,
                      borderRadius: 0
                    }}
                    href={href}
                    size='large'
                  >
                    <Typography letterSpacing={2} color='black' variant='h6'>
                      {label}
                    </Typography>
                  </Button>
                </nav>
              </Fragment>
            ))
          )}
        </AppBarBase>
        <OutletContainer appBarHeight={appBarHeight}>
          <Outlet />
        </OutletContainer>
      </LayoutRoot>
    </>
  );
};

export default MainLayout;
