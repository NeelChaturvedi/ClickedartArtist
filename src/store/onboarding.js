import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useOnboardingStore = create((set) => ({
  isOnboardingCompleted: false,

  setOnboardingCompleted: async () => {
    await AsyncStorage.setItem('isOnboardingCompleted', 'true');
    set({isOnboardingCompleted: true});
  },

  loadOnboardingStatus: async () => {
    const status = await AsyncStorage.getItem('isOnboardingCompleted');
    set({isOnboardingCompleted: status === 'true'});
  },
}));
