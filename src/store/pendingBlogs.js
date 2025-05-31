import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const usePendingBlogsStore = create(set => ({
  pendingBlogs: [],
  loading: false,
  error: null,

  fetchPendingBlogs: async authorId => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/blog/get-my-pending-blogs?author=${authorId}`,
      );
      set({pendingBlogs: res.data?.blogs, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },

  clearPendingBlogs: () => {
    set({
      pendingBlogs: [],
      loading: false,
      error: null,
    });
  },
}));
