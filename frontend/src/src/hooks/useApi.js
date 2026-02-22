import { useState, useCallback } from 'react';

// Custom hook for handling API calls with loading states and error handling
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeApiCall = useCallback(async (apiCall, onSuccess, onError) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      console.error('API call failed:', err);
      setError(err.message || 'An error occurred');
      if (onError) {
        onError(err);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    executeApiCall,
    resetError
  };
};

// Hook for handling authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      // This would normally make an API call
      // For now, we'll simulate a successful login
      const userData = {
        id: 1,
        user: {
          username: credentials.username,
          first_name: 'Demo',
          last_name: 'User',
          email: 'demo@example.com'
        },
        role: 'user',
        is_blocked: false
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('token', 'demo-token');
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      try {
        // Try to get current user to validate token
        // For now, we'll use mock data
        const userData = {
          id: 1,
          user: {
            username: 'demo_user',
            first_name: 'Demo',
            last_name: 'User',
            email: 'demo@example.com'
          },
          role: 'user',
          is_blocked: false
        };
        
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth
  };
};