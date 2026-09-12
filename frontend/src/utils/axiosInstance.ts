import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;


const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

//Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        console.error('Unauthorized access - perhaps redirect to login');
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        console.error('Server error - please try again later');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - please try again');
    } else {
      console.error('Network error - please check your connection');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;