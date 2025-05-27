import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const usePhotosStore = create(set => ({
  photos: [],
  loading: false,
  error: null,

  fetchPhotos: async photographerId => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/images/get-images-by-photographer?photographer=${photographerId}&pageSize=1000`,
      );
      set({photos: res.data?.photos, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
}));
