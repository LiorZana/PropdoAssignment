import { useRoutes, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/'
  }
];

const Routes = () => useRoutes(routes);

export default Routes;
