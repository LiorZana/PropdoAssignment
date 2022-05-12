import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Loadable from '@/components/Loadable';
import MainLayout from '@/Layout/Main';

const RealEstate = Loadable(lazy(() => import('@/views/RealEstate')));
const MapRoute = Loadable(lazy(() => import('@/views/MapRoute')));

const subscriberRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/real-estate',
      element: <RealEstate />
    },
    {
      path: '/map',
      element: <MapRoute />
    },
    {
      path: '/map/:lngLat',
      element: <MapRoute />
    }
  ]
};

export default subscriberRoutes;
