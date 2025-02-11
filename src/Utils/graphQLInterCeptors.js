import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL_GQL;

const gqlInstance = axios.create({
  baseURL: URL,
  headers:{
    'Content-Type': 'application/json', 
  }
});

gqlInstance.interceptors.request.use(
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

gqlInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location.href = '/';
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default gqlInstance;