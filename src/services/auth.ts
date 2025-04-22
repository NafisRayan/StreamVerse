import { delay } from '../utils/helpers';

// Mock authentication service (would connect to backend in real app)
export const login = async (email: string, password: string) => {
  // Simulate API call
  await delay(1000);

  // For demo purposes, accept any credentials
  // In a real app, this would validate against a backend
  
  if (email && password) {
    return {
      id: '1',
      name: email.split('@')[0],
      email,
    };
  }
  
  throw new Error('Invalid credentials');
};

export const register = async (name: string, email: string, password: string) => {
  // Simulate API call
  await delay(1500);

  // For demo purposes, accept any registration
  // In a real app, this would create a user in the backend
  
  if (name && email && password) {
    return {
      id: '1',
      name,
      email,
    };
  }
  
  throw new Error('Invalid registration data');
};

export const logout = async () => {
  // Simulate API call
  await delay(500);
  return true;
};