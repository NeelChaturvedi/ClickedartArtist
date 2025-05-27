import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const useBlogsStore = create(set => ({
  blogs: [],
  loading: false,
  error: null,

  fetchBlogs: async authorId => {
    set({loading: true, error: null});
    try {
      const res = await api.get(`/blog/get-my-blogs?author=${authorId}`);
      set({blogs: res.data?.blogs, loading: false});
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
}));
