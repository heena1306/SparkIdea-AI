import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import Dashboard from './pages/Dashboard';
import IdeaDetail from './pages/IdeaDetail';
import SavedIdeasPage from './pages/SavedIdeasPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/idea/:id" element={<IdeaDetail />} />
        <Route path="/generate" element={<GeneratorPage />} />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedIdeasPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen relative flex flex-col font-sans">
      {/* Background Mesh */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E0F2FE] rounded-full mix-blend-multiply opacity-50 animate-glow-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ECFDF5] rounded-full mix-blend-multiply opacity-50 animate-glow-pulse" style={{ animationDelay: '3s', animationDuration: '10s' }} />
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-[#F3E8FF] rounded-full mix-blend-multiply opacity-50 animate-glow-pulse" style={{ animationDelay: '1.5s', animationDuration: '12s' }} />
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col pt-32 pb-24 px-4 sm:px-12 max-w-[95rem] mx-auto w-full relative z-10 overflow-x-hidden">
        <AnimatedRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
