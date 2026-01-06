import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://phase-2-backend-productions.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
      }
    }
    return config as InternalAxiosRequestConfig;
  }
);

export const authAPI = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const tasksAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (taskData: any) => api.post('/tasks', taskData),
  updateTask: (id: string, taskData: any) => api.patch(`/tasks/${id}`, taskData),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};