// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json', 
};


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => { 
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => { 
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  error => {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;
  