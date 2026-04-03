import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { generateIdeaScore, getProgress, generateRecommendations, computeAnalytics } from '../utils/ideaUtils';

const AuthContext = createContext(null);

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      const parsed = stored ? JSON.parse(stored) : null;
      // Ensure skills is array
      return parsed ? { ...parsed, skills: Array.isArray(parsed.skills) ? parsed.skills : [] } : null;
    } catch {
      return null;
    }
  });
  const [savedIdeas, setSavedIdeas] = useState(() => {
    try {
      const stored = localStorage.getItem('savedIdeas');
      const allIdeas = stored ? JSON.parse(stored) : [];
      const storedUser = localStorage.getItem(USER_KEY);
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        return allIdeas.filter(i => i.userEmail === user.email);
      }
      return [];
    } catch {
      return [];
    }
  });

  const [generatedCount, setGeneratedCount] = useState(() => parseInt(localStorage.getItem('generatedCount') || '0'));
  
  const savedCount = savedIdeas.length;
  const completedCount = savedIdeas.filter(i => i.status === 'Completed').length;

  const refreshSavedIdeas = useCallback(() => {
    try {
      const stored = localStorage.getItem('savedIdeas');
      const allIdeas = stored ? JSON.parse(stored) : [];
      if (user) {
        setSavedIdeas(allIdeas.filter(i => i.userEmail === user.email));
      } else {
        setSavedIdeas([]);
      }
    } catch (err) {
      console.error('Error refreshing saved ideas:', err);
    }
  }, [user]);

  const updateIdeaStatus = useCallback((ideaTitle, newStatus) => {
    try {
      const stored = localStorage.getItem('savedIdeas');
      let allIdeas = stored ? JSON.parse(stored) : [];
      
      allIdeas = allIdeas.map(idea => {
        if (idea.title === ideaTitle && (user ? idea.userEmail === user.email : true)) {
          return { ...idea, status: newStatus };
        }
        return idea;
      });

      localStorage.setItem('savedIdeas', JSON.stringify(allIdeas));
      setSavedIdeas(allIdeas.filter(i => user ? i.userEmail === user.email : true));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  }, [user]);

  const saveIdea = useCallback((idea) => {
    try {
      const stored = localStorage.getItem('savedIdeas');
      let allIdeas = stored ? JSON.parse(stored) : [];
      
      if (!allIdeas.find(i => i.title === idea.title && (user ? i.userEmail === user.email : true))) {
        // Generate enhanced fields
        const scoreData = generateIdeaScore(idea, user?.skills || []);
        const enhancedIdea = {
          ...idea,
          tags: idea.techStack || idea.tags || [],
          ...scoreData,
          progress: getProgress(idea.status || 'Pending'),
          status: idea.status || 'Pending',
          userEmail: user?.email || null,
          savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        allIdeas.push(enhancedIdea);
        localStorage.setItem('savedIdeas', JSON.stringify(allIdeas));
        setSavedIdeas(allIdeas.filter(i => user ? i.userEmail === user.email : true));
      }
    } catch (err) {
      console.error('Error saving idea:', err);
    }
  }, [user]);

  const removeIdea = useCallback((ideaTitle) => {
    try {
      const stored = localStorage.getItem('savedIdeas');
      let allIdeas = stored ? JSON.parse(stored) : [];
      
      const filtered = allIdeas.filter(idea => !(idea.title === ideaTitle && (user ? idea.userEmail === user.email : true)));
      
      localStorage.setItem('savedIdeas', JSON.stringify(filtered));
      setSavedIdeas(filtered.filter(i => user ? i.userEmail === user.email : true));
    } catch (err) {
      console.error('Error removing idea:', err);
    }
  }, [user]);

  const [ideaStats, setIdeaStats] = useState(() => ({ started: 0, pending: 0, completed: 0 }));

  // Migrate existing savedIdeas to new schema
  useEffect(() => {
    const migrateIdeas = () => {
      try {
        const stored = localStorage.getItem('savedIdeas');
        if (!stored) return;
        
        let allIdeas = JSON.parse(stored);
        let hasChanges = false;

        allIdeas = allIdeas.map(existing => {
          if (!existing.demandLevel || !existing.progress || !existing.tags) {
            hasChanges = true;
            return {
              ...existing,
              tags: existing.techStack || existing.tags || [],
              ...generateIdeaScore(existing, user?.skills || {}),
              progress: getProgress(existing.status || 'Pending')
            };
          }
          return existing;
        });

        if (hasChanges) {
          localStorage.setItem('savedIdeas', JSON.stringify(allIdeas));
          setSavedIdeas(allIdeas.filter(i => user ? i.userEmail === user.email : true));
        }
      } catch (err) {
        console.error('Migration error:', err);
      }
    };

    if (user) migrateIdeas();
  }, [user]);

  // Compute analytics and recommendations
  const [analytics, setAnalytics] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (savedIdeas.length > 0) {
      const computedAnalytics = computeAnalytics(savedIdeas);
      setAnalytics(computedAnalytics);
      setRecommendations(generateRecommendations(user?.skills || [], savedIdeas));
    }
  }, [savedIdeas, user?.skills]);

  useEffect(() => {
    const stats = {
      started: savedIdeas.filter(i => i.status === 'Started').length,
      pending: savedIdeas.filter(i => i.status === 'Pending').length,
      completed: savedIdeas.filter(i => i.status === 'Completed').length
    };
    setIdeaStats(stats);
  }, [savedIdeas]);

  const updateUserSkills = useCallback((skills) => {
    if (user) {
      const updatedUser = { ...user, skills };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  }, [user]);

  const login = useCallback((newToken, newUser) => {
    const userWithSkills = { ...newUser, skills: Array.isArray(newUser.skills) ? newUser.skills : [] };
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userWithSkills));
    const count = parseInt(localStorage.getItem('generatedCount') || '0');
    setGeneratedCount(count);
    setToken(newToken);
    setUser(userWithSkills);
    // Trigger savedIdeas refresh for migration
    refreshSavedIdeas();
  }, [refreshSavedIdeas]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      userSkills: user?.skills || [],
      updateUserSkills,
      generatedCount, 
      savedCount, 
      completedCount,
      savedIdeas,
      refreshSavedIdeas, 
      updateIdeaStatus,
      saveIdea,
      removeIdea,
      ideaStats, 
      analytics,
      recommendations,
      isAuthenticated: !!token, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};

