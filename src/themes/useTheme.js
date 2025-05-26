import {useThemeStore} from 'src/store/useThemeStore';
import { darkTheme, lightTheme } from './theme';

export const useTheme = () => {
  const themeMode = useThemeStore(state => state.theme);
  return themeMode === 'light' ? darkTheme : lightTheme;
};
