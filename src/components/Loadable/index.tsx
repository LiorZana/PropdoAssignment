import Loader from '../Loader';
import { Suspense, LazyExoticComponent, ComponentType, PropsWithChildren } from 'react';

// project imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<React.ReactNode>) =>
  function Loaded(props: PropsWithChildren<unknown>) {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
