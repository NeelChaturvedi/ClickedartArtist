import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const useCataloguesStore = create(set => ({
  catalogues: [],
  loading: false,
  error: null,

  fetchCatalogues: async photographerId => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/catalogue/get-catalogues-by-photographer?photographer=${photographerId}`,
      );
      set({catalogues: res.data?.catalogues, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
}));
