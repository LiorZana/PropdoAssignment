import { lazy } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import Loadable from './components/Loadable';
import Layout from './Layout';

const RealEstate = Loadable(lazy(() => import('@/views/RealEstate')));

const routes: RouteObject = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/real-estate',
      element: <RealEstate />
    }
  ]
};

const Routes = () => useRoutes([routes]);

export default Routes;
