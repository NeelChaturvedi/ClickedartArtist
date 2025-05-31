import {create} from 'zustand';
import api from 'src/utils/apiClient';

export const useBlogsStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  pageNumber: 1,
  pageCount: 1,

  fetchBlogs: async (authorId, pageSize = 18) => {
    set({loading: true, error: null});
    try {
      const res = await api.get(
        `/blog/get-my-blogs?author=${authorId}&pageSize=${pageSize}&pageNumber=1`,
      );
      set({
        blogs: res.data?.blogs || [],
        loading: false,
        pageNumber: 1,
        pageCount: res.data?.pageCount || 1,
      });
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },

  fetchMoreBlogs: async (authorId, pageSize = 18) => {
    const {pageNumber, pageCount, loading} = get();
    if (loading || pageNumber >= pageCount) return;

    set({loading: true, error: null});
    try {
      const nextPage = pageNumber + 1;
      const res = await api.get(
        `/blog/get-my-blogs?author=${authorId}&pageSize=${pageSize}&pageNumber=${nextPage}`,
      );

      const newBlogs = res.data?.blogs || [];
      set(state => ({
        blogs: [...state.blogs, ...newBlogs],
        loading: false,
        pageNumber: nextPage,
        pageCount: res.data?.pageCount || pageCount,
      }));
    } catch (error) {
      set({error: error.response || error.message || error, loading: false});
    }
  },
  clearBlogs: () => {
    set({
      blogs: [],
      loading: false,
      error: null,
      pageNumber: 1,
      pageCount: 1,
    });
  },
}));
