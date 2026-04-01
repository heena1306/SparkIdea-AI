import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop"
  }
};

const LandingPage = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center flex-grow text-center mt-8 md:mt-16 relative z-10 px-4"
    >
      
      <motion.div animate={floatingAnimation} className="w-full flex flex-col items-center">
        <motion.div variants={itemVariants} className="group inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl mb-8 shadow-sm relative transition-all duration-500 hover:shadow-lg hover:border-primary/40">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs md:text-sm font-black tracking-widest text-primary uppercase">AI-Powered Project Architect</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tighter mb-6 leading-[1.1] text-[#0F172A] flex flex-col items-center">
          <span>Generate Your Next</span>
          <span className="text-glow pb-2">Big Idea Instantly.</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-slate-500 max-w-3xl mb-12 font-medium leading-relaxed">
          Stop staring at a blank screen. Let our AI architect your next production-ready SaaS, tool, or app in seconds.
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
          <Link to="/generate" className="w-full sm:w-auto glow-button px-10 py-5 text-xl flex items-center justify-center gap-3 group relative border border-white/20 shadow-2xl">
            <Play className="w-5 h-5 fill-current" />
            Get Started Free
          </Link>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
          <Link to="/saved" className="w-full sm:w-auto px-10 py-5 text-xl font-black text-slate-700 transition-all bg-white border-2 border-slate-200 hover:border-primary/40 hover:text-primary rounded-full shadow-sm flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5" />
            View Library
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust Badge/Social Proof placeholder */}
      <motion.div variants={itemVariants} className="mt-20 pt-10 border-t border-slate-100 w-full max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Trusted by developers from</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
          <span className="text-xl font-black tracking-tighter">GITHUB</span>
          <span className="text-xl font-black tracking-tighter">VERCEL</span>
          <span className="text-xl font-black tracking-tighter">STRIPE</span>
          <span className="text-xl font-black tracking-tighter">OPENAI</span>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default LandingPage;
