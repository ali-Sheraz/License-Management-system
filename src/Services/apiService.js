// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:9092/license-server/v1';

const apiService = {
  get: async (url, params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${url}`, { params });
      return response.data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${url}`, data, config);
      return response.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await axios.put(`${API_BASE_URL}${url}`, data, config);
      return response.data;
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  },
  
  putWithFile: async (url, file, config = {}) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.put(`${API_BASE_URL}${url}`, formData, config);
      return response.data;
    } catch (error) {
      console.error('PUT request with file error:', error);
      throw error;
    }
  }
};

export default apiService;
