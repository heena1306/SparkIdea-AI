import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
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
  y: [0, -15, 0],
  transition: {
    duration: 6,
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
      className="flex flex-col items-center justify-center flex-grow text-center mt-16 md:mt-24 relative z-10 box-border"
    >
      
      <motion.div animate={floatingAnimation} className="w-full flex flex-col items-center">
        <motion.div variants={itemVariants} className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl mb-12 shadow-sm relative transition-all duration-500 hover:shadow-lg hover:border-primary/40">
          <Sparkles className="w-5 h-5 dual-tone-icon animate-pulse" />
          <span className="text-sm md:text-base font-bold tracking-widest text-primary uppercase">AI Powered Architecture</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-[6.5rem] lg:text-[8rem] font-[900] tracking-tighter mb-8 leading-[1.05] text-[#0F172A] flex flex-col items-center drop-shadow-sm">
          <span>Generate Next</span>
          <span className="text-glow pb-4 inline-block">Unicorn Project.</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl md:text-3xl text-slate-500 max-w-4xl mb-16 font-medium leading-relaxed drop-shadow-sm">
          Deep multi-modal intelligence instantly architects your production-ready SaaS specifications.
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-8 w-full justify-center px-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/generate" className="w-full sm:w-auto glow-button px-14 py-6 text-2xl flex items-center justify-center gap-4 group backdrop-blur-3xl overflow-hidden relative border border-white/60">
            Start Building Now
            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/saved" className="w-full sm:w-auto px-14 py-6 text-2xl font-black text-slate-800 transition-all bg-white/50 border-2 border-slate-300 hover:border-primary/40 hover:text-primary hover:bg-white/80 rounded-[2rem] backdrop-blur-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] flex justify-center">
            View Examples
          </Link>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default LandingPage;
