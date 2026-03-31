import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 w-full z-50 glass-card bg-white/70 backdrop-blur-xl border-b border-white/40 !rounded-none !border-x-0 !border-t-0 shadow-[0_4px_30px_rgba(0,0,0,0.02)] px-8 py-5"
    >
      <div className="max-w-[90rem] mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-tr from-secondary to-primary flex items-center justify-center shadow-md border border-white/60 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <span className="text-2xl font-black text-[#0F172A] tracking-tighter hidden sm:block">SparkIdea</span>
        </Link>

        {/* Floating Menu Block */}
        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-[1.5rem] border border-slate-200/50 backdrop-blur-3xl shadow-sm">
          <Link to="/generate" className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all tracking-wide ${location.pathname === '/generate' ? 'bg-white text-primary shadow-sm border border-slate-100' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>
            Generator
          </Link>
          <Link to="/saved" className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all tracking-wide group ${location.pathname === '/saved' ? 'bg-white text-primary shadow-sm border border-slate-100' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}>
            <Grid className={`w-4 h-4 dual-tone-icon`} /> Library
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/auth" className="px-8 py-3.5 rounded-full bg-white border border-slate-200 text-[#0F172A] font-bold hover:border-primary/50 hover:text-primary transition-all text-sm tracking-widest shadow-sm hover:shadow-md">
              LOGIN
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
export default Navbar;
