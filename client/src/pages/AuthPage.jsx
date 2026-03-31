import React, { useState } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden font-sans">
      
      {/* Intense localized Bright-Mode Aura behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/10 via-primary/20 to-secondary/10 rounded-full blur-[80px] pointer-events-none animate-glow-pulse"></div>

      {/* Main Glass Login Card */}
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full max-w-[420px] px-6 mt-[-80px]"
      >
        <div className="w-full glass-card border border-white/60 p-8 sm:p-12 shadow-[0_30px_60px_rgba(59,130,246,0.1),_inset_0_2px_10px_rgba(255,255,255,1)] bg-white/60 backdrop-blur-2xl">
          
          {/* Logo Block */}
          <div className="flex flex-col items-center justify-center mb-10 group">
            <div className="relative w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
               {/* Base glowing shadow */}
               <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
               {/* Geometric Pills matching image */}
               <div className="absolute top-1 left-2 w-10 h-4 bg-gradient-to-r from-secondary to-primary rounded-full transform -rotate-45 shadow-sm border border-white/60"></div>
               <div className="absolute top-6 left-2 w-10 h-4 bg-gradient-to-r from-primary to-secondary rounded-full transform -rotate-45 shadow-sm border border-white/60"></div>
            </div>
            <h1 className="text-charcoal text-base font-[900] tracking-[0.1em] uppercase mb-1">
              SHRUHH
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-center text-charcoal text-2xl font-[800] mb-10 tracking-tight font-sans">
            {isLogin ? 'Welcome Back, Rahul' : 'Create An Account'}
          </h2>

          {/* Form */}
          <form className="space-y-6">
            
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-500 font-bold ml-1">Full Name</label>
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="text" 
                  className="w-full bg-white/80 border border-slate-200/60 rounded-xl px-5 py-4 text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-semibold"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-500 font-bold ml-1">Email address</label>
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                type="email" 
                className="w-full bg-white/80 border border-slate-200/60 rounded-xl px-5 py-4 text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-semibold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-500 font-bold ml-1">Password</label>
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                type="password" 
                className="w-full bg-white/80 border border-slate-200/60 rounded-xl px-5 py-4 text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-semibold"
              />
            </div>
            
            {isLogin && (
              <div className="w-full pt-1">
                 <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors font-bold">Forget Password ?</a>
              </div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button" 
              className="w-full glow-button py-4 rounded-xl mt-6 font-[900] text-[1.1rem] tracking-wide"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </motion.button>
          </form>

          {/* Footer Text */}
          <div className="mt-10 text-center text-sm font-medium text-slate-500">
            {isLogin ? 'Are You New Member ? ' : 'Already Customizing ? '} 
            <button 
               type="button"
               onClick={() => setIsLogin(!isLogin)} 
               className="font-[900] text-charcoal hover:text-primary transition-colors cursor-pointer"
            >
               {isLogin ? 'Sign UP' : 'Login'}
            </button>
          </div>

        </div>
      </motion.div>

    </div>
  );
};

export default AuthPage;
