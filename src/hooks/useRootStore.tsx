import rootStoreContext from '@/providers/RootStore';
import { useContext } from 'react';

const useRootStore = () => useContext(rootStoreContext);
export default useRootStore;
