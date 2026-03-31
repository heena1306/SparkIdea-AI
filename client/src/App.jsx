import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import SavedIdeasPage from './pages/SavedIdeasPage';
import AuthPage from './pages/AuthPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GeneratorPage />} />
        <Route path="/saved" element={<SavedIdeasPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen relative flex flex-col font-sans">
      
      {/* Ultimate Bright-Mode Background Mesh Canvas */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
          
          {/* Luminous Orbs: Azure, Mint Green, Lavender */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E0F2FE] rounded-full mix-blend-multiply opacity-50 animate-glow-pulse"></div>
          
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ECFDF5] rounded-full mix-blend-multiply opacity-50 animate-glow-pulse" style={{animationDelay: '3s', animationDuration: '10s'}}></div>
          
          <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-[#F3E8FF] rounded-full mix-blend-multiply opacity-50 animate-glow-pulse" style={{animationDelay: '1.5s', animationDuration: '12s'}}></div>
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
      <AppContent />
    </Router>
  );
}

export default App;
