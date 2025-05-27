import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const usePhotosStore = create(set => ({
  photos: [],
  loading: false,
  error: null,

  fetchPhotos: async (photographerId, pageSize = 20) => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/images/get-images-by-photographer?photographer=${photographerId}&pageSize=${pageSize}`,
      );
      set({photos: res.data?.photos, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
}));
