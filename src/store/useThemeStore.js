import {create} from 'zustand';
import {Appearance} from 'react-native';

const getSystemTheme = () => Appearance.getColorScheme() || 'light';

export const useThemeStore = create((set, get) => {
  const applySystemTheme = () => {
    const current = get();
    if (current.userPreference === 'system') {
      set({theme: getSystemTheme()});
    }
  };

  Appearance.addChangeListener(applySystemTheme);

  return {
    theme: getSystemTheme(),
    userPreference: 'system',

    setTheme: (preference) => {
      set({
        userPreference: preference,
        theme: preference === 'system' ? getSystemTheme() : preference,
      });
    },

    toggleTheme: () => {
      const {userPreference} = get();
      const newPref = userPreference === 'light' ? 'dark' : 'light';
      set({
        userPreference: newPref,
        theme: newPref,
      });
    },
  };
});
