import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Grid, LogOut, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  // First letter of user's name for avatar
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : '?');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="fixed top-0 w-full z-50 glass-card bg-white/70 backdrop-blur-xl border-b border-white/40 !rounded-none !border-x-0 !border-t-0 shadow-[0_4px_30px_rgba(0,0,0,0.02)] px-6 sm:px-8 py-4"
    >
      <div className="max-w-[90rem] mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-11 h-11 rounded-[1rem] bg-gradient-to-tr from-secondary to-primary flex items-center justify-center shadow-md border border-white/60 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-charcoal tracking-tighter hidden sm:block">SparkIdea</span>
        </Link>

        {/* Center nav pills - Only show if logged in */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-1.5 bg-slate-50/80 p-1.5 rounded-[1.5rem] border border-slate-200/50 backdrop-blur-3xl shadow-sm">
            <Link
              to="/dashboard"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all tracking-wide flex items-center gap-2 ${
                location.pathname === '/dashboard'
                  ? 'bg-white text-primary shadow-sm border border-slate-100'
                  : 'text-slate-500 hover:text-primary hover:bg-white/60'
              }`}
            >
              <Layout className="w-4 h-4" /> Dashboard
            </Link>
            <Link
              to="/generate"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all tracking-wide flex items-center gap-2 ${
                location.pathname === '/generate'
                  ? 'bg-white text-primary shadow-sm border border-slate-100'
                  : 'text-slate-500 hover:text-primary hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Generator
            </Link>
            <Link
              to="/saved"
              className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all tracking-wide ${
                location.pathname === '/saved'
                  ? 'bg-white text-primary shadow-sm border border-slate-100'
                  : 'text-slate-500 hover:text-primary hover:bg-white/60'
              }`}
            >
              <Grid className="w-4 h-4" /> Library
            </Link>
          </div>
        )}

        {/* Right: auth actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isAuthenticated ? (
            <>
              {/* User avatar + name */}
              <div className="hidden sm:flex items-center gap-2.5 mr-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-white font-black text-sm shadow-sm border border-white/40 flex-shrink-0">
                  {initial}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-charcoal max-w-[120px] truncate leading-none mb-0.5">{user.name || 'Developer'}</span>
                  <span className="text-[10px] font-medium text-slate-400 truncate leading-none">{user.email}</span>
                </div>
              </div>

              {/* Logout button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-red-200 hover:text-red-500 transition-all shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Logout</span>
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/auth"
                className="px-8 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-charcoal transition-all text-sm tracking-wide shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
