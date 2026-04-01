import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Check, Clock, Box, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { idea } = location.state || {};

  if (!idea) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <ArrowLeft className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Idea not found</h1>
          <button onClick={() => navigate('/dashboard')} className="glow-button px-6 py-2 font-bold">
            Back to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  const [isRoadmapOpen, setIsRoadmapOpen] = React.useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Back header */}
      <div className="glass-card border-b border-slate-200 p-6 sticky top-0 z-10 backdrop-blur-xl">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        <div className="flex flex-wrap gap-3 items-center">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
            idea.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' 
            : idea.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700'
            : 'bg-green-100 text-green-700'
          }`}>
            {idea.difficulty}
          </span>
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {idea.estimatedTime}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Title & Description */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight mb-6">
            {idea.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            {idea.description}
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Layers className="w-8 h-8 text-primary opacity-80" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {idea.techStack?.map((tech, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm font-semibold text-slate-800 hover:shadow-md hover:border-primary/50 transition-all"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Check className="w-8 h-8 text-emerald-500" />
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {idea.features?.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
            <button 
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-colors"
              onClick={() => setIsRoadmapOpen(!isRoadmapOpen)}
            >
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Box className="w-8 h-8 opacity-70" />
                Execution Roadmap
              </h2>
              {isRoadmapOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
            <AnimatePresence>
              {isRoadmapOpen && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="divide-y divide-slate-100">
                    {idea.roadmap?.map((step, i) => (
                      <div key={i} className="p-8 hover:bg-slate-50 transition-colors">
                        <div className="flex gap-4 items-start mb-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white font-black text-lg border-4 border-white shadow-lg">
                            {step.step}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* GitHub Structure */}
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            📁 Recommended Folder Structure
          </h2>
          <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl font-mono text-sm border border-slate-800">
            <pre className="whitespace-pre-wrap leading-relaxed">
{idea.githubStructure?.map(line => `  ${line}`).join('\n') || 'client/\nserver/\ndocs/'}
            </pre>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default IdeaDetail;

