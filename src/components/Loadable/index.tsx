import Loader from '../Loader';
import {
  Suspense,
  LazyExoticComponent,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  PropsWithRef,
  ComponentProps
} from 'react';

// project imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = <C extends ComponentType<any>, LC extends LazyExoticComponent<C>>(Component: LC) =>
  function Loaded(props: ComponentProps<C>) {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
