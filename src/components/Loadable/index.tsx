import Loader from '../Loader';
import { Suspense, LazyExoticComponent, ComponentType, PropsWithChildren, ReactElement } from 'react';
import { PropsOf } from '@emotion/react';

// project imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: LazyExoticComponent<() => ReactElement> | ComponentType<React.PropsWithChildren<any>>) =>
  function Loaded(props: PropsWithChildren<unknown>) {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
