import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import IdeaCard from '../components/IdeaCard';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Save, 
  Sparkles, 
  Brain, 
  Clock, 
  ArrowRight,
  Zap,
  Star,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated, generatedCount, savedCount, completedCount, savedIdeas, ideaStats, analytics, recommendations, userSkills } = useAuth();
  const [recentActivity, setRecentActivity] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    if (isAuthenticated) {
      // Get last generated idea from localStorage
      const lastGenerated = JSON.parse(localStorage.getItem('lastGeneratedIdea') || 'null');
      const lastSaved = savedIdeas.length > 0 ? savedIdeas[savedIdeas.length - 1] : null;

      const activity = [];
      if (lastGenerated) activity.push({ type: 'Last Generated', title: lastGenerated.title, time: 'Recently' });
      if (lastSaved) activity.push({ type: 'Last Saved', title: lastSaved.title, time: lastSaved.savedAt || 'Recently' });

      setRecentActivity(activity);
    }
  }, [isAuthenticated, savedIdeas]);

  if (!isAuthenticated) return null;

  const avatarInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '?';

  const stats = [
    {
      id: 'completion',
      title: 'Completion Rate',
      value: `${analytics.completionRate || 0}%`,
      subtext: `You completed ${analytics.completedIdeas || 0}/${analytics.totalIdeas || 0} ideas`,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      count: analytics.completionRate || 0
    },
    {
      id: 'saved',
      title: 'Saved Ideas Library',
      value: savedCount,
      subtext: `${savedCount} ideas in your collection`,
      icon: Save,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      count: savedCount
    },
    {
      id: 'pipeline',
      title: 'Pipeline Overview',
      value: `${analytics.mostUsedSkill || 'React'}`,
      subtext: `${ideaStats.pending} pending • Focus: ${analytics.dominantCategory || 'Web'}`,
      icon: Brain,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      count: ideaStats.started
    }
  ];

  const handleStatClick = (id) => {
    if (id === 'completion' || id === 'saved' || id === 'pipeline') {
      const section = document.getElementById('project-library');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Welcome Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-12 text-slate-900 shadow-xl border border-slate-100"
        >
          <motion.div 
            initial={{ scale: 0.95 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.3 }} 
            className="mx-auto max-w-md text-center"
          >
            <Link 
              to="/generate" 
              className="glow-button w-full px-12 py-6 text-xl font-black rounded-3xl flex items-center justify-center gap-4 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
            >
              <Plus className="w-8 h-8" />
              + Generate New Idea
              <Sparkles className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" />
            </Link>
          </motion.div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-4xl font-black text-white">{avatarInitial}</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-[900] tracking-tight mb-2">
                Welcome, <span className="text-blue-600">{user?.name || 'Developer'}</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium">{user?.email}</p>
              <p className="text-slate-400 text-xl mt-1 font-medium">Turn your ideas into impactful real-world solutions 🚀</p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -ml-32 -mb-32" />
        </motion.section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (i + 1) }}
                onClick={() => handleStatClick(stat.id)}
                className="glass-card p-8 flex flex-col group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden cursor-pointer"
              >
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-xs font-medium">{stat.subtext}</p>
                
                {stat.id === 'generated' && (
                  <div className="grid grid-cols-3 gap-2 w-full pt-6 mt-6 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-emerald-500">{ideaStats.completed || 0}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Done</span>
                    </div>
                    <div className="flex flex-col border-x border-slate-100 px-2">
                      <span className="text-sm font-black text-blue-500">{ideaStats.started || 0}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Started</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-amber-500">{ideaStats.pending || 0}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Pending</span>
                    </div>
                  </div>
                )}
                
                {/* Decorative background element */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} rounded-full opacity-10 group-hover:scale-150 transition-transform`} />
              </motion.div>
            );
          })}
        </div>

        <div id="project-library" className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-12">
          {/* Saved Ideas Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-[900] text-slate-900 flex items-center gap-3">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                Your Project Library
              </h2>
              <div className="flex items-center gap-4">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 outline-none focus:border-primary transition-colors"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Started">Started</option>
                  <option value="Completed">Completed</option>
                </select>
                <Link to="/saved" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedIdeas?.length > 0 ? (
                savedIdeas
                  .sort((a, b) => (userSkills?.some(skill => b.tags?.some(tag => tag.toLowerCase().includes(skill.toLowerCase())) ? 1 : 0) - (userSkills?.some(skill => a.tags?.some(tag => tag.toLowerCase().includes(skill.toLowerCase())) ? 1 : 0)))
                  .filter(idea => filterStatus === 'All' || idea.status === filterStatus)
                  .slice(0, 4)
                  .map((idea) => (
                    <IdeaCard key={idea.title} idea={idea} />
                  ))
              ) : (
                <div className="col-span-full py-20 glass-card flex flex-col items-center justify-center text-slate-400 border-dashed border-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="font-bold text-slate-500">No projects found</p>
                  <p className="text-xs font-medium text-slate-400 mb-6">Start by generating a new idea</p>
                  <Link to="/generate" className="glow-button px-8 py-3 rounded-xl font-black text-sm">
                    Generate Idea
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
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-bold text-slate-500">Recent Activity</span>
                      {/* Clear button removed as activity is derived state */}
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50">
                      {recentActivity.map((act, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          className="flex gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-100 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 hover:border-primary/30"
                        >
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0">
                            {act.type.includes('Saved') ? <Save className="w-5 h-5 text-emerald-500" /> : <Sparkles className="w-5 h-5 text-primary" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">{act.type}</p>
                            <h3 className="font-bold text-slate-900 text-base leading-tight truncate">{act.title}</h3>
                            <p className="text-slate-400 text-xs font-medium mt-1">{act.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-sm font-medium">No recent activity</p>
                    <p className="text-xs text-slate-500 mt-1">Your saved/generated ideas will appear here</p>
                  </div>
                )}
              </div>
            </section>

            {/* Analytics Insights */}
            <section className="glass-card p-8 space-y-6">
              <h2 className="text-xl font-[900] text-slate-900 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Analytics Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-xl flex flex-col">
                  <span className="font-bold text-emerald-600 text-lg mb-1">Total Ideas</span>
                  <span className="font-black text-2xl">{analytics.totalIdeas || 0}</span>
                </div>
                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col">
                  <span className="font-bold text-blue-600 text-lg mb-1">Avg Rating</span>
                  <span className="font-black text-2xl">{analytics.avgRating || 0}</span>
                </div>
                <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-xl flex flex-col">
                  <span className="font-bold text-orange-600 text-lg mb-1">Unique Ideas</span>
                  <span className="font-black text-2xl">{analytics.uniqueCount || 0}</span>
                </div>
                <div className="p-5 bg-slate-50/50 border border-slate-100 rounded-xl flex flex-col">
                  <span className="font-bold text-slate-600 text-lg mb-1">Completion</span>
                  <span className="font-black text-2xl">{analytics.completionRate || 0}%</span>
                </div>
                <p className="col-span-full text-slate-600 mt-4 text-sm">{analytics.suggestion}</p>
              </div>
            </section>

            {/* Recommended for You */}
            <section className="glass-card p-8 space-y-6">
              <h2 className="text-xl font-[900] text-slate-900 flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 gap-6 h-[28rem] overflow-hidden">
                {recommendations.slice(0, 3).map((recIdea, i) => (
                  <motion.div 
                    key={recIdea.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * i }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <IdeaCard idea={recIdea} />
                  </motion.div>
                ))}
                {recommendations.length === 0 && (
                  <div className="text-center py-12 text-slate-400 col-span-1">
                    <Zap className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-sm font-medium">Generate ideas to unlock personalized recommendations</p>
                  </div>
                )}
              </div>
              {recommendations.length === 0 && (
                <p className="text-slate-400 text-sm text-center py-8">Generate some ideas to get personalized recommendations</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

