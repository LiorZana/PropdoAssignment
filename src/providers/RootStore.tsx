import { RootStoreType } from '@/stores/RootStore';
import { createContext, ReactNode, useEffect } from 'react';
import rootStore from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useTheme } from '@emotion/react';

const rootStoreContext = createContext({} as RootStoreType);

const { Provider } = rootStoreContext;
export const { Consumer: RootStoreConsumer } = rootStoreContext;
export const RootStoreProvider = observer(({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  useEffect(() => {
    rootStore.theme = theme;
  }, [theme]);
  return <Provider value={rootStore}>{children}</Provider>;
});
export default rootStoreContext;
