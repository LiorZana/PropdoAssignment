import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Loadable from '@/components/Loadable';
import MinimalLayout from '@/Layout/Minimal';

const Home = Loadable(lazy(() => import('@/views/Home')));

const mainRoutes: RouteObject = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    }
  ]
};

export default mainRoutes;
