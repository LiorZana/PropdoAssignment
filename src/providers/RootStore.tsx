import { RootStoreType } from '@/stores/RootStore';
import { createContext, ReactNode } from 'react';
import rootStore from '@/stores/RootStore';

const rootStoreContext = createContext({} as RootStoreType);

const { Provider } = rootStoreContext;
export const { Consumer: RootStoreConsumer } = rootStoreContext;
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={rootStore}>{children}</Provider>;
};
export default rootStoreContext;
