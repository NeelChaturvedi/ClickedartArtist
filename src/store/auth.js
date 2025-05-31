import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'src/utils/apiClient';
import useCartStore from './cart';
import {usePhotosStore} from './photos';
import {useCataloguesStore} from './catalogues';
import {useBlogsStore} from './blogs';
import {usePendingBlogsStore} from './pendingBlogs';
import {useAnalyticsStore} from './photographerAnalytics';
import {usePendingPhotosStore} from './pendingPhotos';

export const useUserStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setUser: user => set({user}),

  setToken: async token => {
    await AsyncStorage.setItem('token', token);
    set({token});
  },

  clearUser: async () => {
    const {clearCart} = useCartStore.getState();
    const {clearPhotos} = usePhotosStore.getState();
    const {clearCatalogues} = useCataloguesStore.getState();
    const {clearBlogs} = useBlogsStore.getState();
    const {clearPendingBlogs} = usePendingBlogsStore.getState();
    const {clearPendingPhotos} = usePendingPhotosStore.getState();
    const {clearStats} = useAnalyticsStore.getState();

    await AsyncStorage.removeItem('token');

    clearCart();
    clearPhotos();
    clearPendingPhotos();
    clearCatalogues();
    clearBlogs();
    clearPendingBlogs();
    clearStats();

    set({user: null, token: null});
  },

  loadToken: async () => {
    set({loading: true, error: null});
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        set({token});
        await get().fetchUserFromToken(token);
      }
    } catch (error) {
      set({error: error.message || error});
    } finally {
      set({loading: false});
    }
  },

  fetchUserFromToken: async (tokenParam = null) => {
    const {token} = get();
    const {clearCart} = useCartStore.getState();
    const validToken = tokenParam || token;

    if (validToken) {
      set({loading: true, error: null});
      try {
        const res = await api.get('/user/get-user-profile-by-token');
        set({user: res.data.user});
      } catch (error) {
        console.log('Failed to fetch user:', error.response);
        await get().clearUser();
        set({error: error.message || error});
      } finally {
        set({loading: false});
      }
    } else {
      clearCart();
    }
  },
}));
