import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(set => ({
  user: null,
  token: null,

  setUser: user => set({user}),
  setToken: token => {
    AsyncStorage.setItem('token', token); // persist
    set({token});
  },
  clearUser: async () => {
    await AsyncStorage.removeItem('token');
    set({user: null, token: null});
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      set({token});
    }
  },
}));
