import { useRoutes } from 'react-router';
import mainRoutes from './routes/main';
import subscriberRoutes from './routes/subscriber';

const Routes = () => useRoutes([mainRoutes, subscriberRoutes]);

export default Routes;
