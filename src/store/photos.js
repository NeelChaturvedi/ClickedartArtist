import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const usePhotosStore = create((set, get) => ({
  photos: [],
  loading: false,
  error: null,
  pageNumber: 1,
  pageCount: 1,

  fetchPhotos: async (photographerId, pageSize = 18) => {
    set({loading: true, error: null});
    console.log('Fetching photos for photographer:', photographerId);
    try {
      const res = await api.get(
        `/images/get-images-by-photographer?photographer=${photographerId}&pageSize=${pageSize}&pageNumber=1`,
      );

      set({
        photos: res.data?.photos || [],
        loading: false,
        pageNumber: 1,
        pageCount: res.data?.pageCount || 1,
      });
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },

  fetchMorePhotos: async (photographerId, pageSize = 18) => {
    const {pageNumber, pageCount, loading} = get();

    // Prevent fetching if already loading or no more pages
    if (loading || pageNumber >= pageCount) {
      return;
    }

    set({loading: true, error: null});
    try {
      const nextPage = pageNumber + 1;
      const res = await api.get(
        `/images/get-images-by-photographer?photographer=${photographerId}&pageSize=${pageSize}&pageNumber=${nextPage}`,
      );

      const newPhotos = res.data?.photos || [];
      set(state => ({
        photos: [...state.photos, ...newPhotos],
        loading: false,
        pageNumber: nextPage,
        pageCount: res.data?.pageCount || pageCount,
      }));
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
  clearPhotos: () => {
    set({
      photos: [],
      loading: false,
      error: null,
      pageNumber: 1,
      pageCount: 1,
    });
  },
}));
