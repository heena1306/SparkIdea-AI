import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Save, 
  Sparkles, 
  Brain, 
  Clock, 
  ArrowRight,
  Layout,
  Zap,
  Star,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import IdeaCard from '../components/IdeaCard';

const Dashboard = () => {
  const { user, isAuthenticated, generatedCount } = useAuth();
  const [stats, setStats] = useState({ generated: 0, saved: 0, active: 0 });
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const saved = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
      const active = parseInt(localStorage.getItem('activeProjects') || '0');
      
      // Get last generated idea from localStorage (we'll need to store this in GeneratorPage)
      const lastGenerated = JSON.parse(localStorage.getItem('lastGeneratedIdea') || 'null');
      const lastSaved = saved.length > 0 ? saved[saved.length - 1] : null;

      const activity = [];
      if (lastGenerated) activity.push({ type: 'Last Generated', title: lastGenerated.title, time: 'Recently' });
      if (lastSaved) activity.push({ type: 'Last Saved', title: lastSaved.title, time: lastSaved.savedAt || 'Recently' });

      setSavedIdeas(saved);
      setStats({
        generated: generatedCount || 0,
        saved: saved.length,
        active
      });
      setRecentActivity(activity);
    }
  }, [isAuthenticated, generatedCount]);

  if (!isAuthenticated) return null;

  const avatarInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '?';

  return (
    <div className="min-h-screen pb-24 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Welcome Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 text-white shadow-2xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-4xl font-black text-white">{avatarInitial}</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-[900] tracking-tight mb-2">
                Welcome, <span className="text-primary-light text-blue-400">{user?.name || 'Developer'}</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium">{user?.email}</p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </motion.section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-1">{stats.generated}</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Ideas Generated</p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 flex flex-col items-center text-center group hover:border-emerald-300 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Save className="w-7 h-7" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-1">{stats.saved}</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Saved Ideas Count</p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 flex flex-col items-center text-center group hover:border-amber-300 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layout className="w-7 h-7" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-1">{stats.active}</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Active Projects</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Ideas Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-[900] text-slate-900 flex items-center gap-3">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                Saved Ideas
              </h2>
              <Link to="/saved" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedIdeas.length > 0 ? (
                savedIdeas.slice(0, 4).map((idea) => (
                  <IdeaCard key={idea.id || idea.title} idea={idea} />
                ))
              ) : (
                <div className="col-span-full py-12 glass-card flex flex-col items-center justify-center text-slate-400 border-dashed">
                  <Plus className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold">No ideas saved yet</p>
                  <Link to="/generate" className="mt-4 text-primary text-sm font-black hover:underline">
                    Start generating →
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Recent Activity */}
            <section className="glass-card p-8 space-y-6">
              <h2 className="text-xl font-[900] text-slate-900 flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((act, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {act.type.includes('Saved') ? <Save className="w-5 h-5 text-emerald-500" /> : <Sparkles className="w-5 h-5 text-blue-500" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{act.type}</p>
                        <h3 className="font-bold text-slate-900 truncate">{act.title}</h3>
                        <p className="text-slate-400 text-[10px] font-medium">{act.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm font-medium text-center py-4">No recent activity</p>
                )}
              </div>
            </section>

            {/* AI Suggestions */}
            <section className="glass-card p-8 space-y-6 bg-gradient-to-br from-white to-blue-50/30">
              <h2 className="text-xl font-[900] text-slate-900 flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-500" />
                AI Suggestions
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary transition-colors">Try advanced ideas</h3>
                  <p className="text-slate-500 text-xs">Push your limits with complex architectures</p>
                </button>
                <button className="w-full text-left p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary transition-colors">Explore AI + Web projects</h3>
                  <p className="text-slate-500 text-xs">Integrate LLMs into your next web app</p>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Primary Action */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-4"
        >
          <Link 
            to="/generate" 
            className="glow-button group px-10 py-5 text-xl font-black rounded-2xl flex items-center gap-3 shadow-xl hover:shadow-primary/20 transition-all"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
            Generate New Project
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
