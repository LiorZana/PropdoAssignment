import { Outlet } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import OutletContainer from '../components/OutletContainer';
import AppBarBase from '../components/AppBarBase';
import LayoutRoot from '../components/LayoutRoot';

const appBarHeight = '50px';

const MinimalLayout: (props: PropsWithChildren<{}>) => JSX.Element = () => {
  return (
    <LayoutRoot>
      <AppBarBase height={appBarHeight} backgroundColor='transparent' />
      <OutletContainer appBarHeight={appBarHeight}>
        <Outlet />
      </OutletContainer>
    </LayoutRoot>
  );
};

export default MinimalLayout;
