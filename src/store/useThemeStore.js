import {create} from 'zustand';
import {Appearance} from 'react-native';

const getInitialTheme = () => Appearance.getColorScheme() || 'light';

export const useThemeStore = create(set => {
  Appearance.addChangeListener(({colorScheme}) => {
    if (colorScheme) {
      set({theme: colorScheme});
    }
  });

  return {
    theme: getInitialTheme(),

    toggleTheme: () =>
      set(state => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),

    setTheme: theme => set({theme}),
  };
});
