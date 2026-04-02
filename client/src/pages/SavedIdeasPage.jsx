import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, Clock, Activity, Check, ChevronDown, ChevronUp, Star, Zap, ShieldCheck, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.08 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const SavedCard = ({ idea, onRemove }) => {
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  // Use saved data or fallback to defaults
  const rating = idea.rating || 8.5;
  const isUnique = idea.isUnique !== undefined ? idea.isUnique : true;
  const recommendation = idea.recommendation || "Aligns with your AI development goals.";

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      layout
      className="glass-card bg-white/80 p-7 border border-slate-200 hover:border-primary/40 group shadow-sm hover:shadow-xl transition-colors duration-300 flex flex-col h-full"
    >
      {/* Top row: date badge + difficulty */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold tracking-[0.15em] text-primary uppercase bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            {idea.savedAt || idea.estimatedTime || 'Saved'}
          </div>
          <div className="flex gap-2">
            <div className={`text-[10px] font-black tracking-wider px-2 py-1 rounded-full uppercase border ${isUnique ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
              {isUnique ? 'Unique' : 'Common'}
            </div>
            <div className="text-amber-600 text-[10px] font-black tracking-wider px-2 py-1 rounded-full uppercase border border-amber-100 bg-amber-50">
              <Star className="w-2.5 h-2.5 inline mr-1 fill-amber-500" /> {rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-[900] text-charcoal mb-3 tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">
        {idea.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 font-medium mb-5 text-sm leading-relaxed">{idea.description}</p>

      {/* Recommendation */}
      <div className="mb-5 p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Meta badges */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
          <Clock className="w-3 h-3" /> {idea.estimatedTime}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
          idea.difficulty === 'Advanced' ? 'bg-red-50 text-red-600 border-red-200'
          : idea.difficulty === 'Intermediate' ? 'bg-orange-50 text-orange-600 border-orange-200'
          : 'bg-green-50 text-green-600 border-green-200'
        }`}>
          <Activity className="w-3 h-3" /> {idea.difficulty}
        </div>
      </div>

      {/* Tech Stack */}
      {idea.techStack && (
        <div className="flex flex-wrap gap-2 mb-5">
          {idea.techStack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Features */}
      {idea.features && idea.features.length > 0 && (
        <div className="mb-5 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
          <h4 className="text-xs font-[800] text-charcoal uppercase tracking-wider mb-3">Key Features</h4>
          <ul className="space-y-2">
            {idea.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                <Check className="w-3.5 h-3.5 text-primary stroke-[3px] mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Roadmap accordion */}
      {idea.roadmap && idea.roadmap.length > 0 && (
        <div className="mb-5 border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setRoadmapOpen(!roadmapOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50/60 hover:bg-blue-50/50 transition-colors text-xs font-[800] text-charcoal uppercase tracking-wider"
          >
            🗺️ Roadmap
            {roadmapOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          <AnimatePresence>
            {roadmapOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="border-t border-slate-200"
              >
                <div className="p-4 space-y-4">
                  {idea.roadmap.map((step) => (
                    <div key={step.step} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center font-black text-[10px] border border-blue-200">
                        {step.step}
                      </div>
                      <div>
                        <p className="font-[800] text-xs text-charcoal mb-0.5">{step.title}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onRemove(idea.title)}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </motion.button>
        <p className="text-[11px] text-slate-400 font-medium">Saved locally</p>
      </div>
    </motion.div>
  );
};

const SavedIdeasPage = () => {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const { refreshSavedCount } = useAuth();

  useEffect(() => {
    try {
      const data = localStorage.getItem('savedIdeas');
      const user = JSON.parse(localStorage.getItem('authUser') || 'null');
      if (data) {
        let ideas = JSON.parse(data);
        if (user) {
          // If logged in, show only that user's saved ideas
          ideas = ideas.filter(i => i.userEmail === user.email);
        }
        setSavedIdeas(ideas);
      }
    } catch {
      setSavedIdeas([]);
    }
  }, []);

  // Remove by title and userEmail
  const removeIdea = (title) => {
    const user = JSON.parse(localStorage.getItem('authUser') || 'null');
    const allSaved = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    const filtered = allSaved.filter(idea => !(idea.title === title && (user ? idea.userEmail === user.email : true)));
    localStorage.setItem('savedIdeas', JSON.stringify(filtered));
    refreshSavedCount();
    
    // Update local state to reflect removal
    setSavedIdeas(savedIdeas.filter(idea => idea.title !== title));
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-[100rem] mx-auto flex-grow mt-8 sm:mt-12 px-2"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-[900] mb-3 tracking-tighter flex items-center gap-4 text-charcoal">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 flex items-center justify-center shadow-sm">
            <Bookmark className="w-6 h-6 dual-tone-icon" />
          </div>
          Saved Library
        </h1>
        <p className="text-slate-500 text-base font-medium max-w-xl leading-relaxed">
          {savedIdeas.length > 0
            ? `${savedIdeas.length} idea${savedIdeas.length > 1 ? 's' : ''} saved — persisted in your browser.`
            : 'Your generated project ideas, saved locally.'}
        </p>
      </motion.div>

      {/* Empty State */}
      {savedIdeas.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="w-full py-24 flex flex-col items-center justify-center text-center glass-card border border-blue-100 bg-white/60"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
            <Bookmark className="w-8 h-8 text-primary/40" />
          </div>
          <h3 className="text-2xl font-[900] text-charcoal mb-2">No saved ideas yet</h3>
          <p className="text-slate-500 max-w-sm font-medium text-sm">
            Go to the Generator, create some ideas and hit <strong>Save</strong> on any card — they'll appear here.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          <AnimatePresence>
            {savedIdeas.map((idea) => (
              <SavedCard key={idea.title} idea={idea} onRemove={removeIdea} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default SavedIdeasPage;
