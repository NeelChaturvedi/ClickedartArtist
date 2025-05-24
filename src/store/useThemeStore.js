
import { create } from 'zustand';
import { Appearance } from 'react-native';

const systemColorScheme = Appearance.getColorScheme();

export const useThemeStore = create(set => ({
  theme: systemColorScheme || 'light',
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));
