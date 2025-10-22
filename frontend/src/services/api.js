import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  // Query API
  async submitQuery(query) {
    const response = await api.post('/query', { query });
    return response.data;
  },

  // Schemes API
  async getSchemes(filters = {}) {
    const response = await api.get('/schemes', { params: filters });
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/schemes/categories');
    return response.data;
  },

  // Dashboard API
  async getDashboardData() {
    const response = await api.get('/dashboard');
    return response.data;
  }
};

export default api;