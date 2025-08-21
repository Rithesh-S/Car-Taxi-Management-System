import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Your backend URL
});

// Request Interceptor: Attaches JWT token to headers before request is sent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Configure the header to match what the Spring Security backend expects
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;