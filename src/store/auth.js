import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'src/utils/apiClient';
import useCartStore from './cart';

export const useUserStore = create((set, get) => ({
  user: null,
  token: null,

  setUser: user => set({user}),

  setToken: async token => {
    await AsyncStorage.setItem('token', token);
    set({token});
  },

  clearUser: async () => {
    const {clearCart} = useCartStore.getState();
    await AsyncStorage.removeItem('token');
    clearCart();
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
    const {clearCart} = useCartStore.getState();
    const validToken = tokenParam || token;

    if (validToken) {
      try {
        const res = await api.get('/user/get-user-profile-by-token');
        set({user: res.data.user});
      } catch (error) {
        console.log('Failed to fetch user:', error.response);
        await get().clearUser();
      }
    } else {
      clearCart();
    }
  },
}));
