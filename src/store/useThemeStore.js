import {create} from 'zustand';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'user-theme-preference';

const getSystemTheme = () => Appearance.getColorScheme() || 'light';

export const useThemeStore = create((set, get) => {
  const applySystemTheme = () => {
    const current = get();
    if (current.userPreference === 'system') {
      const newSystemTheme = getSystemTheme();
      set({theme: newSystemTheme});
    }
  };

  Appearance.addChangeListener(applySystemTheme);

  (async () => {
    const savedPref = await AsyncStorage.getItem(THEME_KEY);
    if (savedPref) {
      set({
        userPreference: savedPref,
        theme: savedPref === 'system' ? getSystemTheme() : savedPref,
      });
    }
  })();

  return {
    theme: getSystemTheme(),
    userPreference: 'system',

    setTheme: async preference => {
      await AsyncStorage.setItem(THEME_KEY, preference);
      set({
        userPreference: preference,
        theme: preference === 'system' ? getSystemTheme() : preference,
      });
    },

    toggleTheme: async () => {
      const {userPreference} = get();
      const newPref = userPreference === 'light' ? 'dark' : 'light';
      await AsyncStorage.setItem(THEME_KEY, newPref);
      set({
        userPreference: newPref,
        theme: newPref,
      });
    },
  };
});
