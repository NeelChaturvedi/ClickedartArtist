import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const usePendingPhotosStore = create(set => ({
  pendingPhotos: [],
  loading: false,
  error: null,

  fetchPendingPhotos: async photographerId => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/photographer/get-pending-images-by-photographer?photographer=${photographerId}`,
      );
      set({pendingPhotos: res.data?.pendingImages, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
}));
