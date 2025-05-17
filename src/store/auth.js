import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'src/utils/apiClient';

export const useUserStore = create((set, get) => ({
  user: null,
  token: null,

  setUser: user => set({user}),

  setToken: async token => {
    await AsyncStorage.setItem('token', token);
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
      await get().fetchUserFromToken(token);
    }
  },

  fetchUserFromToken: async (tokenParam = null) => {
    const {token} = get();
    const validToken = tokenParam || token;

    if (validToken) {
      try {
        const res = await api.get('/user/get-user-profile-by-token');
        set({user: res.data.user});
      } catch (error) {
        console.error('Failed to fetch user:', error.response);
        await get().clearUser();
      }
    }
  },
}));
