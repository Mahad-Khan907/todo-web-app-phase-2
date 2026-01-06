import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, clear it and redirect to login
      localStorage.removeItem('access_token');
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Authentication API functions
export const authAPI = {
  // Register a new user
  register: (userData: { email: string; password: string; first_name?: string; last_name?: string }) => {
    return api.post('/auth/register', userData);
  },

  // Login user and get JWT token
  login: (credentials: { email: string; password: string }) => {
    return api.post('/auth/token', credentials);
  },

  // Get current user info
  getCurrentUser: () => {
    return api.get('/auth/me');
  },
};

// Task API functions
export const taskAPI = {
  // Get all tasks for current user
  getTasks: () => {
    return api.get('/tasks');
  },

  // Create a new task
  createTask: (taskData: { title: string; description?: string; completed?: boolean; priority?: string; due_date?: string }) => {
    return api.post('/tasks', taskData);
  },

  // Get a specific task
  getTask: (taskId: string) => {
    return api.get(`/tasks/${taskId}`);
  },

  // Update a specific task
  updateTask: (taskId: string, taskData: { title?: string; description?: string; completed?: boolean; priority?: string; due_date?: string }) => {
    return api.patch(`/tasks/${taskId}`, taskData);
  },

  // Delete a specific task
  deleteTask: (taskId: string) => {
    return api.delete(`/tasks/${taskId}`);
  },
};