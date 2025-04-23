import { User } from '../types';
import { mockUsers } from '../data/mockData';

// In a real application, these would make API calls to your backend
export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, authentication would happen on the server
  const user = mockUsers.find(user => user.email === email);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // This is a demo, so we're not actually checking passwords
  // In a real app, you would verify the password here or on the server
  return { ...user, password: undefined };
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: 'employee', // Default role
    createdAt: new Date().toISOString(),
  };
  
  // Add to mock data for this session
  mockUsers.push(newUser);
  
  return { ...newUser, password: undefined };
};

export const logout = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, you would invalidate the session on the server
  return;
};