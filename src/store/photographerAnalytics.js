import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const useAnalyticsStore = create(set => ({
  stats: null,
  loading: false,
  error: null,

  fetchStats: async photographerId => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/photographeranalytics/get-photographer-analytics?photographer=${photographerId}`,
      );
      set({stats: res.data, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
  clearStats: () => set({stats: null, loading: false, error: null}),
}));
