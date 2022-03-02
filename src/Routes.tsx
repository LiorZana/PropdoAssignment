import { lazy } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import Loadable from './components/Loadable';
import Layout from './Layout';

const RealEstate = Loadable(lazy(() => import('@/views/RealEstate')));
const Map = Loadable(lazy(() => import('@/views/Map')));

const routes: RouteObject = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/real-estate',
      element: <RealEstate />
    },
    {
      path: '/map',
      element: <Map />
    }
  ]
};

const Routes = () => useRoutes([routes]);

export default Routes;
