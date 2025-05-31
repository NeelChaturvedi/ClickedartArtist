import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const useCataloguesStore = create((set, get) => ({
  catalogues: [],
  loading: false,
  error: null,
  pageNumber: 1,
  pageCount: 1,

  fetchCatalogues: async (photographerId, pageSize = 6) => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/catalogue/get-catalogues-by-photographer?photographer=${photographerId}&pageSize=${pageSize}&pageNumber=1`,
      );
      set({
        catalogues: res.data?.catalogues || [],
        loading: false,
        pageNumber: 1,
        pageCount: res.data?.pageCount || 1,
      });
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },

  fetchMoreCatalogues: async (photographerId, pageSize = 6) => {
    const {pageNumber, pageCount, loading} = get();
    if (loading || pageNumber >= pageCount) {
      return;
    }

    set({loading: true, error: null});
    try {
      const nextPage = pageNumber + 1;
      const res = await api.get(
        `/catalogue/get-catalogues-by-photographer?photographer=${photographerId}&pageSize=${pageSize}&pageNumber=${nextPage}`,
      );

      const newCatalogues = res.data?.catalogues || [];
      set(state => ({
        catalogues: [...state.catalogues, ...newCatalogues],
        loading: false,
        pageNumber: nextPage,
        pageCount: res.data?.pageCount || pageCount,
      }));
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
  clearCatalogues: () => {
    set({
      catalogues: [],
      loading: false,
      error: null,
    });
  },
}));
