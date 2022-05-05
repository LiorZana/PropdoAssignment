import { FC, createContext, Dispatch, SetStateAction, useContext, PropsWithChildren, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ColorModeContext = createContext<ThemeColorMode>({} as ThemeColorMode);

const getLocalMode = () => {
  const mode = localStorage.getItem('themeMode') as ThemeMode;
  if (mode !== 'light' && mode !== 'dark') {
    return null;
  }
  return mode;
};

export const ColorMode: FC<PropsWithChildren<any>> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ThemeMode>(getLocalMode() || (prefersDarkMode ? 'dark' : 'light'));

  useEffect(() => {
    const localMode = localStorage.getItem('themeMode');
    if (localMode !== mode) {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  useEffect(() => {
    const manifest = document.getElementById('favicon') as HTMLLinkElement;
    if (mode === 'dark') {
      manifest.href = manifest.href.replace('light', 'dark');
    } else {
      manifest.href = manifest.href.replace('dark', 'light');
    }
  }, [mode]);

  const toggleMode = () => setMode(t => (t === 'light' ? 'dark' : 'light'));

  return <ColorModeContext.Provider value={{ mode, setMode, toggleMode }}>{children}</ColorModeContext.Provider>;
};

export type ThemeMode = 'dark' | 'light';
interface ThemeColorMode {
  mode: ThemeMode;
  setMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleMode: () => void;
}

export const useColorMode = () => useContext(ColorModeContext);
