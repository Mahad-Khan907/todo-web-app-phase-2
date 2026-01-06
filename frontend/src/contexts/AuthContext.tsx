'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';
import { z } from 'zod';

// Define user type
interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, first_name?: string, last_name?: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props type
interface AuthProviderProps {
  children: ReactNode;
}

// Create provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      try {
        setToken(storedToken);
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        // Token is invalid or expired, clear it
        localStorage.removeItem('access_token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { access_token } = response.data;

      // Save token to localStorage
      localStorage.setItem('access_token', access_token);
      setToken(access_token);

      // Get user data
      const userResponse = await authAPI.getCurrentUser();
      setUser(userResponse.data);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const register = async (email: string, password: string, first_name?: string, last_name?: string) => {
    try {
      await authAPI.register({ email, password, first_name, last_name });
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    register,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};