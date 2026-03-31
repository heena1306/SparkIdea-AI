import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Terminal, BookOpen, Layers, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IdeaCard from '../components/IdeaCard';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const inputVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.2, type: "spring", stiffness: 120, damping: 20 } }
};

const GeneratorPage = () => {
  const [formData, setFormData] = useState({
    skills: '',
    interest: '',
    level: 'beginner'
  });
  
  // New Array payload hook for V8 execution
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };
    
    setIsLoading(true);
    setIdeas([]);
    setError(null);
    
    console.log("Transmitting generation payload:", dataToSubmit);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-idea', dataToSubmit);
      console.log("Received AI architecture data:", response.data);
      setIdeas(response.data);
    } catch (err) {
      console.error("API Generation Failure:", err);
      // Gracefully capture backend structure or generic network error
      const message = err.response?.data?.error || err.response?.data?.details || err.message || "Unknown Application Error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center w-full max-w-[100rem] mx-auto flex-grow mt-12 transition-colors duration-500"
    >
      
      {/* Background Mesh Acceleration Overlay Triggered by Focus */}
      <div className={`fixed inset-0 z-[-1] pointer-events-none transition-all duration-1000 ${isFocused ? 'opacity-100 scale-105 filter saturate-150' : 'opacity-0 scale-100'}`}>
         <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-[#3B82F6]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
         <div className="absolute top-1/3 right-1/4 w-[50%] h-[50%] bg-[#A855F7]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="text-center mb-16 relative z-10">
         <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[#0F172A] transition-colors duration-500"
         >
           What do you want to build?
         </motion.h1>
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-slate-500 text-lg transition-colors duration-500 font-medium"
         >
           Define parameters and let AI output the architecture.
         </motion.p>
      </div>

      <motion.div variants={inputVariants} className="w-full max-w-4xl relative z-20 mb-20 group">
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
         <form onSubmit={handleSubmit} className="relative glass-card !rounded-full p-2 pl-8 flex items-center border-slate-200 group/form focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300 bg-white/80 shadow-md">
            
            <div className="flex-1 flex items-center gap-4 w-full group/icon">
              <Terminal className="w-6 h-6 dual-tone-icon transition-colors" />
              <input required type="text" placeholder="Skills (React, AWS)" value={formData.skills} 
                 onChange={e => setFormData({...formData, skills: e.target.value})} 
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}
                 className="w-full bg-transparent border-none text-[#0F172A] focus:ring-0 focus:outline-none placeholder-slate-400 font-bold py-4 text-base md:text-lg" 
              />
            </div>
            
            <div className="hidden md:block w-[1px] h-10 bg-slate-200 mx-4"></div>
            
            <div className="hidden md:flex flex-1 items-center gap-4 px-2 w-full group/icon hover:-translate-y-0.5 transition-transform">
              <BookOpen className="w-6 h-6 dual-tone-icon transition-colors" />
              <input required type="text" placeholder="Interests (Crypto, AI)" value={formData.interest} 
                 onChange={e => setFormData({...formData, interest: e.target.value})} 
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}
                 className="w-full bg-transparent border-none text-[#0F172A] focus:ring-0 focus:outline-none placeholder-slate-400 font-bold py-4 text-base md:text-lg" 
              />
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-slate-200 mx-4"></div>

            <div className="hidden md:flex items-center gap-2 px-2 w-auto group/icon hover:-translate-y-0.5 transition-transform">
              <Layers className="w-6 h-6 dual-tone-icon" />
              <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} 
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}
                 className="bg-transparent border-none text-[#0F172A] focus:ring-0 focus:outline-none cursor-pointer py-4 appearance-none font-bold text-center text-base pr-6"
              >
                <option value="beginner" className="bg-white">Beginner</option>
                <option value="intermediate" className="bg-white">Intermediate</option>
                <option value="advanced" className="bg-white">Advanced</option>
              </select>
            </div>

            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               type="submit" 
               disabled={isLoading} 
               className={`ml-4 w-16 h-16 rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-lg ${isLoading ? 'bg-blue-50 text-primary animate-pulse cursor-not-allowed border border-blue-200' : 'glow-button border-none'}`}
            >
               {isLoading ? <Sparkles className="w-6 h-6" /> : <ArrowUp className="w-8 h-8 stroke-[3px]" />}
            </motion.button>
         </form>

         {/* Mobile Extra Fields (Floating Dropdown) */}
         <div className="md:hidden mt-4 flex flex-col gap-3">
             <div className="glass-card !rounded-[1.5rem] p-4 flex items-center gap-4 border border-slate-200 focus-within:border-blue-200 shadow-sm bg-white/80">
                <BookOpen className="w-5 h-5 dual-tone-icon" />
                <input required type="text" placeholder="Interests (Crypto, AI)" value={formData.interest} 
                   onChange={e => setFormData({...formData, interest: e.target.value})} 
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}
                   className="w-full bg-transparent border-none text-slate-800 focus:ring-0 focus:outline-none placeholder-slate-400 font-bold text-base" 
                />
             </div>
             <div className="glass-card !rounded-[1.5rem] p-4 flex items-center gap-4 border border-slate-200 focus-within:border-blue-200 shadow-sm bg-white/80">
                <Layers className="w-5 h-5 dual-tone-icon" />
                <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} 
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}
                   className="w-full bg-transparent border-none text-slate-800 focus:ring-0 focus:outline-none cursor-pointer appearance-none font-bold text-base"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
             </div>
         </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div layout className="w-full transition-all mt-4 relative z-10 mb-20">
           
           {/* Explicit Error Interface */}
           {error && !isLoading && (
              <motion.div 
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-3xl mx-auto glass-card border border-red-200 bg-red-50/80 p-6 flex items-start gap-4 shadow-sm mb-12"
              >
                 <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1 border border-red-200">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-[800] text-red-700 mb-2">Generation Failed</h3>
                    <p className="text-red-600/80 font-medium font-mono text-sm leading-relaxed p-3 bg-white/50 rounded-xl border border-red-100">{error}</p>
                 </div>
              </motion.div>
           )}

           {isLoading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 {[1,2,3].map(i => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       transition={{ delay: i * 0.1 }}
                       className="glass-card p-10 animate-pulse border-blue-100 bg-white/50 w-full"
                    >
                       <div className="h-6 w-32 bg-blue-50 border border-blue-100/50 rounded-full mb-6"></div>
                       <div className="h-10 w-3/4 bg-slate-100 rounded-lg mb-8"></div>
                       <div className="h-4 w-full bg-slate-100 rounded-lg mb-4"></div>
                       <div className="h-4 w-5/6 bg-slate-100 rounded-lg mb-4"></div>
                       <div className="grid grid-cols-1 gap-4 mt-12">
                         <div className="h-32 bg-blue-50/50 rounded-2xl border border-blue-100/30"></div>
                         <div className="h-32 bg-purple-50/50 rounded-2xl border border-purple-100/30"></div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           )}
           {ideas.length > 0 && !isLoading && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-8"
             >
                {ideas.map((idea, index) => (
                  <IdeaCard key={idea.id || index} idea={idea} />
                ))}
             </motion.div>
           )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
export default GeneratorPage;
