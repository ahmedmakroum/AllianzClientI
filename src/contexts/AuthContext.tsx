import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('medtracker_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userData = await loginApi(email, password);
      setUser(userData);
      localStorage.setItem('medtracker_user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  
  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await registerApi(name, email, password);
      setUser(userData);
      localStorage.setItem('medtracker_user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Registration failed');
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      localStorage.removeItem('medtracker_user');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};