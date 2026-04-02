import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [generatedCount, setGeneratedCount] = useState(() => parseInt(localStorage.getItem('generatedCount') || '0'));
  const [savedCount, setSavedCount] = useState(() => {
    try {
      const stored = localStorage.getItem('savedIdeas');
      return stored ? JSON.parse(stored).length : 0;
    } catch {
      return 0;
    }
  });

  const refreshSavedCount = useCallback(() => {
    const stored = localStorage.getItem('savedIdeas');
    setSavedCount(stored ? JSON.parse(stored).length : 0);
  }, []);

  const [ideaStats, setIdeaStats] = useState(() => {
    try {
      const stored = localStorage.getItem('ideaCategories');
      return stored ? JSON.parse(stored) : { started: 0, pending: 0, completed: 0 };
    } catch {
      return { started: 0, pending: 0, completed: 0 };
    }
  });

  const updateIdeaStats = useCallback((category) => {
    setIdeaStats(prev => {
      const newStats = { ...prev, [category]: (prev[category] || 0) + 1 };
      localStorage.setItem('ideaCategories', JSON.stringify(newStats));
      return newStats;
    });
  }, []);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    const count = parseInt(localStorage.getItem('generatedCount') || '0');
    const categories = JSON.parse(localStorage.getItem('ideaCategories') || '{"started":0,"pending":0,"completed":0}');
    setGeneratedCount(count);
    setIdeaStats(categories);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, generatedCount, savedCount, refreshSavedCount, ideaStats, updateIdeaStats, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};
