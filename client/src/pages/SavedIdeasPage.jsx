import React, { useState, useEffect } from 'react';
import { Bookmark, ArrowUpRight, Cpu, Trash2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const SavedIdeasPage = () => {
  const [savedIdeas, setSavedIdeas] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('savedIdeas');
    if (data) {
      setSavedIdeas(JSON.parse(data));
    }
  }, []);

  const removeIdea = (id) => {
    const filtered = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(filtered);
    localStorage.setItem('savedIdeas', JSON.stringify(filtered));
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-[100rem] mx-auto flex-grow mt-12 sm:mt-16 px-4"
    >
      <motion.div variants={headerVariants} className="mb-16">
        <h1 className="text-5xl md:text-6xl font-[900] mb-6 tracking-tighter flex items-center gap-5 text-charcoal">
           <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
             <Bookmark className="dual-tone-icon w-8 h-8" /> 
           </div>
           Saved Library
        </h1>
        <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
          Access your generated architectural specifications persisted from local storage.
        </p>
      </motion.div>

      {savedIdeas.length === 0 ? (
         <motion.div variants={cardVariants} className="w-full py-20 flex flex-col items-center justify-center text-center glass-card border border-blue-100 bg-slate-50/50">
            <ShieldAlert className="w-16 h-16 text-primary/40 mb-6" />
            <h3 className="text-2xl font-[900] text-charcoal mb-2">Your library is empty.</h3>
            <p className="text-slate-500 max-w-md font-medium">Head back to the generator to map out some advanced architectures and save them here.</p>
         </motion.div>
      ) : (
         <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
           <AnimatePresence>
             {savedIdeas.map((idea) => (
               <motion.div 
                 variants={cardVariants} 
                 initial="hidden"
                 animate="visible"
                 exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                 whileHover={{ scale: 1.02, y: -5 }}
                 key={idea.id} 
                 className="glass-card bg-white p-8 border border-slate-200 hover:border-primary group shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
               >
                 
                 <div className="flex items-center justify-between mb-5">
                    <div className="text-xs font-bold tracking-[0.2em] text-primary uppercase bg-blue-50 px-3 py-1.5 rounded border border-blue-100">{idea.generatedAt || idea.estimatedTime || 'Saved'}</div>
                    <div className="flex gap-2">
                       <span className={`text-[10px] font-black tracking-wider px-2 py-1 rounded-full uppercase border ${idea.difficulty === 'Advanced' ? 'bg-red-50 text-red-600 border-red-200' : idea.difficulty === 'Intermediate' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                          {idea.difficulty || 'Intermediate'}
                       </span>
                    </div>
                 </div>
                 
                 <h3 className="text-2xl font-[900] text-charcoal mb-4 tracking-tight group-hover:text-primary transition-colors leading-[1.1]">
                   {idea.title}
                 </h3>
                 <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed flex-grow">{idea.description}</p>
                 
                 <div className="flex flex-wrap gap-2 mb-10">
                   {idea.techStack && idea.techStack.map(tech => (
                     <span key={tech} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors">
                       <Cpu className="w-3.5 h-3.5 dual-tone-icon group-hover:animate-pulse" /> {tech}
                     </span>
                   ))}
                 </div>
   
                 <div className="pt-6 border-t border-slate-100 flex items-center justify-between transition-colors">
                   <button onClick={() => removeIdea(idea.id)} className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Remove
                   </button>
                   <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-primary group-hover:border-none group-hover:text-white transition-all shadow-none group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] cursor-pointer">
                     <ArrowUpRight className="w-5 h-5 stroke-[3px]" />
                   </button>
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
         </motion.div>
      )}
    </motion.div>
  );
};
export default SavedIdeasPage;
