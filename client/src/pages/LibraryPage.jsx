import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bookmark, 
  Trash2, 
  Clock, 
  Activity, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Zap, 
  ShieldCheck, 
  Search, 
  Filter,
  X,
  Plus,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatusSelector from '../components/StatusSelector';

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

const SavedCard = ({ idea, onRemove, onUpdateStatus, onToggleFavorite = () => {}, isFavorite = false }) => {
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  const rating = idea.rating || 8.5;
  const isUnique = idea.isUnique !== undefined ? idea.isUnique : true;
  const recommendation = idea.recommendation || "Aligns with your AI development goals.";
  const status = idea.status || 'Pending';
  const progress = {
    Pending: 10,
    Started: 50,
    Completed: 100
  }[status] || 10;
  const impact = idea.impact || 'Useful for building real-world portfolio projects';

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      layout
      className="glass-card bg-white/80 p-7 border border-slate-200 hover:border-primary/40 group shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Top row: date badge + metadata */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold tracking-[0.15em] text-primary uppercase bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            {idea.savedAt || idea.estimatedTime || 'Saved'}
          </div>
          <div className="flex gap-2">
            <div className={`text-[10px] font-black tracking-wider px-2 py-1 rounded-full uppercase border ${isUnique ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
              {isUnique ? 'Unique' : 'Common'}
            </div>
            <div className="text-amber-600 text-[10px] font-black tracking-wider px-2 py-1 rounded-full uppercase border border-amber-100 bg-amber-50 flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-amber-500" /> {rating.toFixed(1)}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(idea.title);
              }}
              className={`p-1 rounded-full transition-all ${isFavorite ? 'bg-yellow-400 text-white shadow-lg' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
              title="Toggle favorite"
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Title & Status */}
      <div className="mb-4">
        <h3 className="text-xl font-[900] text-charcoal mb-3 tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">
          {idea.title}
        </h3>
        <StatusSelector 
          status={status} 
          onStatusChange={(newStatus) => onUpdateStatus(idea.title, newStatus)} 
        />
      </div>

      {/* Description */}
      <p className="text-slate-500 font-medium mb-2 text-sm leading-relaxed line-clamp-2">
        {idea.description}
      </p>

      {/* Impact line */}
      <p className="text-xs text-slate-600 font-semibold italic bg-slate-50 px-3 py-1.5 rounded-lg mb-5">
        {impact}
      </p>

      {/* Recommendation */}
      <div className="mb-5 p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <motion.div 
            className="h-2 bg-gradient-to-r from-primary to-emerald-500 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
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

      {/* Tech Stack / Tags */}
      {idea.tags && (
        <div className="flex flex-wrap gap-2 mb-5">
          {idea.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
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
            onClick={(e) => {
              e.stopPropagation();
              onRemove(idea.title);
            }}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
          >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </motion.button>
        <p className="text-[11px] text-slate-400 font-medium">Synced</p>
      </div>
    </motion.div>
  );
};

const LibraryPage = () => {
  const navigate = useNavigate();
  const { savedIdeas, removeIdea, updateIdeaStatus, isAuthenticated } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [filterUniqueness, setFilterUniqueness] = useState('All');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const savedFavorites = localStorage.getItem('savedFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedFavorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (ideaTitle) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(ideaTitle)) {
      newFavorites.delete(ideaTitle);
    } else {
      newFavorites.add(ideaTitle);
    }
    setFavorites(newFavorites);
  };

  const filteredIdeas = useMemo(() => {
    return (savedIdeas || []).filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           idea.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || filterStatus === 'Favorites' || idea.status === filterStatus;
      const matchesRating = filterRating === 'All' || (
        filterRating === 'High' ? idea.rating >= 9 :
        filterRating === 'Medium' ? (idea.rating >= 8 && idea.rating < 9) :
        idea.rating < 8
      );
      const matchesUnique = filterUniqueness === 'All' || (
        filterUniqueness === 'Unique' ? idea.isUnique : !idea.isUnique
      );
      const matchesFavorite = filterStatus !== 'Favorites' || favorites.has(idea.title);

      return matchesSearch && matchesStatus && matchesRating && matchesUnique && matchesFavorite;
    });
  }, [savedIdeas, searchTerm, filterStatus, filterRating, filterUniqueness, favorites]);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-[100rem] mx-auto flex-grow mt-8 sm:mt-12 px-4"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-[900] mb-3 tracking-tighter flex items-center gap-4 text-charcoal">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 flex items-center justify-center shadow-sm">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            Saved Library
          </h1>
          <p className="text-slate-500 text-base font-medium max-w-xl leading-relaxed">
            {(savedIdeas || []).length > 0
              ? `${(savedIdeas || []).length} idea${(savedIdeas || []).length > 1 ? 's' : ''} saved — manage your journey from concept to completion.`
              : 'Your generated project ideas, saved locally and synced with your account.'}
          </p>
        </motion.div>

        {/* Generate Button */}
        <Link
          to="/generate"
          className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-primary/50 hover:from-blue-600 hover:to-blue-700 flex items-center gap-3 transition-all duration-300 whitespace-nowrap group"
        >
          + Generate New Idea
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </Link>

        {/* Search & Filter Bar */}
        <motion.div variants={itemVariants} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search ideas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-full sm:w-64"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-primary outline-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Favorites">⭐ Favorites</option>
                <option value="Pending">Pending</option>
                <option value="Started">Started</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 sm:flex-none">
              <select 
                value={filterUniqueness}
                onChange={(e) => setFilterUniqueness(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-primary outline-none cursor-pointer"
              >
                <option value="All">All types</option>
                <option value="Unique">Unique</option>
                <option value="Common">Common</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results Section */}
      {(savedIdeas || []).length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="w-full py-24 flex flex-col items-center justify-center text-center glass-card border-dashed border-2 border-slate-200 bg-slate-50/50"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
            <Plus className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-2xl font-[900] text-charcoal mb-2">No saved ideas yet 🚀</h3>
          <p className="text-slate-500 max-w-sm font-medium text-sm mb-8">
            {!isAuthenticated ? 'Please login to see your saved ideas.' : 'Generate and save your first idea.'}
          </p>
          <Link
            to="/generate"
            className="px-10 py-4 bg-white border border-slate-200 text-charcoal font-black rounded-2xl hover:bg-slate-50 hover:border-primary/30 transition-all shadow-sm"
          >
            Go to Generator
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredIdeas.map((idea) => (
              <SavedCard 
                key={idea.title} 
                idea={idea} 
                onRemove={removeIdea} 
                onUpdateStatus={updateIdeaStatus}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.has(idea.title)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty Search State */}
      {(savedIdeas || []).length > 0 && filteredIdeas.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="w-full py-20 flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">No matches found</h3>
          <p className="text-slate-500 text-sm font-medium">Try adjusting your filters or search term.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LibraryPage;
