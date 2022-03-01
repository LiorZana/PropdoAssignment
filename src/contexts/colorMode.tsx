import { createContext, useContext } from 'react';

const ColorModeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setColorMode: (mode: UTILS.ColorMode) =>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  mode: 'light' as UTILS.ColorMode
});

const useColorMode = () => useContext(ColorModeContext);

export { useColorMode };
export default ColorModeContext;
