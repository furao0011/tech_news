import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
    lastUpdate: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchNews() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(`${API_BASE}/news`);
        
        if (response.data.success) {
          this.news = response.data.data.items;
          this.lastUpdate = response.data.data.lastUpdate;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Failed to fetch news:', error);
      } finally {
        this.loading = false;
      }
    },

    async refreshNews() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.post(`${API_BASE}/news/refresh`);
        
        if (response.data.success) {
          this.news = response.data.data.items;
          this.lastUpdate = response.data.data.lastUpdate;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Failed to refresh news:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  getters: {
    newsBySource: (state) => {
      const grouped = {};
      state.news.forEach(item => {
        if (!grouped[item.source]) {
          grouped[item.source] = [];
        }
        grouped[item.source].push(item);
      });
      return grouped;
    },

    newsCount: (state) => state.news.length
  }
});
