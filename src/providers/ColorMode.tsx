import { FC, createContext, Dispatch, SetStateAction, useContext, useCallback } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorage } from '@caldwell619/react-hooks';

export const ColorModeContext = createContext<IChosenTheme>({} as IChosenTheme);

export const ColorMode: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorage<ThemeMode>('theme', prefersDarkMode ? 'dark' : 'light', true);
  const toggleMode = () => setMode(t => (t === 'light' ? 'dark' : 'light'));

  return <ColorModeContext.Provider value={{ mode, setMode, toggleMode }}>{children}</ColorModeContext.Provider>;
};

export type ThemeMode = 'dark' | 'light';
interface IChosenTheme {
  mode: ThemeMode;
  setMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleMode: () => void;
}

export const useColorMode = () => useContext(ColorModeContext);
