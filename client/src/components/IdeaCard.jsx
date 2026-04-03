import React, { useState } from 'react';
import { Layers, Box, Check, Clock, Activity, ChevronDown, ChevronUp, Save, FileCode2, Copy, X, Download, ArrowRight, Star, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProgress } from '../utils/ideaUtils';
import { Flame } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.1 } 
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const IdeaCard = ({ idea }) => {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [showReadme, setShowReadme] = useState(false);
  const navigate = useNavigate();
  const { user, saveIdea, savedIdeas, updateIdeaStatus } = useAuth();

  const savedIdea = savedIdeas.find(i => i.title === idea?.title);
  const isSaved = !!savedIdea;
  const currentStatus = savedIdea?.status || 'Pending';

  if (!idea) return null;

// Use real data, fallback minimal
  const rating = idea.rating || 5;
  const isUnique = idea.uniqueness === 'Unique';
  const demandLevel = idea.demandLevel || 'Medium';
  const progress = idea.progress || getProgress(idea.status || currentStatus || 'Pending');
  const recommendation = idea.recommendation || 'Recommended project idea.';

  const handleSave = () => {
    saveIdea({
      ...idea,
      rating,
      isUnique,
      recommendation,
      status: 'Pending'
    });
  };

  const generateReadmeText = () => {
    return `# ${idea.title}

${idea.description}

## 🚀 Tech Stack
${idea.techStack ? idea.techStack.map(t => `- ${t}`).join('\n') : ''}

## ✨ Features
${idea.features ? idea.features.map(f => `- ${f}`).join('\n') : ''}

## 📂 Architecture
\`\`\`
${idea.githubStructure ? idea.githubStructure.join('\n') : ''}
\`\`\`

## 🛠️ Installation Steps
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/${idea.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.git
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🗺️ Build Roadmap
${idea.roadmap ? idea.roadmap.map(r => `### Step ${r.step}: ${r.title}\n${r.desc}\n`).join('\n') : ''}
`;
  };

  const copyReadme = () => {
    navigator.clipboard.writeText(generateReadmeText());
    // Better toast feedback
    const original = document.activeElement?.textContent;
    const btn = document.querySelector('.glow-button') || event.target;
    btn.textContent = 'Copied!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = original || 'Copy README';
      btn.style.background = '';
    }, 1500);
  };

  const downloadReadme = () => {
    const content = generateReadmeText();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_readme.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        layout
        className="w-full glass-card hover:border-blue-300 hover:shadow-2xl p-8 relative overflow-hidden group/card h-full flex flex-col"
      >
        <div className="relative z-10 w-full flex-grow flex flex-col">

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 mb-6">
            <div className="flex flex-wrap gap-2 items-center justify-between w-full">
              <div className="flex gap-2">
                <div className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded w-max border border-blue-100 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> {idea.id || 'Idea'}
                </div>
                <div className={`text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 px-3 py-1.5 rounded w-max border shadow-sm ${isUnique ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                  {isUnique ? <Zap className="w-3 h-3 fill-purple-500" /> : <Layers className="w-3 h-3" />} {isUnique ? 'Unique' : 'Common'}
                </div>
                <div className="text-amber-600 text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded w-max border border-amber-100 shadow-sm">
                  <Star className="w-3 h-3 fill-amber-500" /> {rating.toFixed(1)}
                </div>
                <div className={`text-orange-600 text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded w-max border border-orange-100 shadow-sm ${
                  demandLevel === 'High' ? 'animate-pulse' : ''
                }`}>
                  <Flame className="w-3 h-3 fill-orange-500" /> {demandLevel}
                </div>
                {isSaved && (
                  <div className={`text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 px-3 py-1.5 rounded w-max border shadow-sm ${
                    currentStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    currentStatus === 'Started' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      currentStatus === 'Completed' ? 'bg-emerald-500' :
                      currentStatus === 'Started' ? 'bg-blue-500' :
                      'bg-amber-500'
                    }`} />
                    {currentStatus}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isSaved ? (
                  <select 
                    value={currentStatus}
                    onChange={(e) => updateIdeaStatus(idea.title, e.target.value)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all duration-300 border cursor-pointer outline-none ${
                      currentStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      currentStatus === 'Started' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      'bg-amber-50 text-amber-600 border-amber-200'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Started">Started</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all duration-300 border bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary hover:shadow-[0_0_8px_rgba(59,130,246,0.2)] shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </motion.button>
                )}
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/idea/${idea.id}`, { state: { idea } })}
                  className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all duration-300 border bg-primary text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:bg-blue-600"
                >
                  View Details
                </motion.button>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReadme(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all duration-300 border bg-slate-900 border-slate-800 text-white hover:shadow-[0_0_12px_rgba(15,23,42,0.3)]"
                >
                  <FileCode2 className="w-3.5 h-3.5" /> README
                </motion.button>
                <motion.button
                  onClick={downloadReadme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all duration-300 border bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </motion.button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-[900] text-charcoal tracking-tight leading-[1.1]">{idea.title}</h2>

            {/* Metadata Badges + Progress */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`flex items-center gap-1.5 text-xs font-[800] px-2.5 py-1 rounded-full border ${
                  idea.difficulty === 'Hard' || idea.difficulty === 'Advanced' ? 'bg-red-50 text-red-600 border-red-200'
                  : idea.difficulty === 'Medium' || idea.difficulty === 'Intermediate' ? 'bg-orange-50 text-orange-600 border-orange-200'
                  : 'bg-green-50 text-green-600 border-green-200'
                }`}>
                  <Activity className="w-3.5 h-3.5" /> {idea.difficulty}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-[800] px-2.5 py-1 rounded-full border bg-blue-50 text-blue-600 border-blue-200">
                  <Clock className="w-3.5 h-3.5" /> {idea.estimatedTime}
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-mono tracking-wider">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-6">
            {idea.description}
          </p>

          {/* Recommendation */}
          <div className="mb-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed">
              <span className="text-blue-600 uppercase tracking-wider text-[10px] block mb-1">Recommendation</span>
              {recommendation}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {idea.techStack && idea.techStack.map(tech => (
              <motion.span
                whileHover={{ scale: 1.05 }}
                key={tech}
                className="bg-white/80 text-[#0F172A] border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-default hover:bg-blue-50 hover:text-primary hover:border-blue-200 transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Bento Sections */}
          <div className="flex flex-col gap-6 flex-grow">
            <div className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-blue-100 glow-border hover:shadow-md hover:border-primary/30 transition-all duration-300">
              <h3 className="text-base font-[800] mb-4 flex items-center gap-2 text-charcoal">
                <Layers className="w-5 h-5 dual-tone-icon" /> Key Features
              </h3>
              <ul className="space-y-3">
                {idea.features && idea.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                    <div className="mt-0.5 flex-shrink-0"><Check className="w-4 h-4 text-primary stroke-[3px]" /></div>
                    <span className="font-semibold leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-purple-100 glow-border font-mono hover:shadow-md hover:border-secondary/30 transition-all duration-300">
              <h3 className="text-base font-[800] mb-4 flex items-center gap-2 font-sans text-charcoal">
                <Box className="w-5 h-5 dual-tone-icon" /> Architecture
              </h3>
              <div className="space-y-2 border-l-2 border-slate-200 pl-4 text-xs tracking-wide relative">
                {idea.githubStructure && idea.githubStructure.map((folder, index) => {
                  const parts = folder.split('/');
                  const depth = parts.length - 1;
                  const name = parts[parts.length - 1];
                  return (
                    <div key={index} className="flex items-center text-slate-600 py-0.5 font-bold truncate" style={{ marginLeft: `${depth * 16}px` }}>
                      <span className="text-secondary/50 mr-2 font-sans">├</span>
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Roadmap Accordion */}
          {idea.roadmap && (
            <div className="mt-6 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => setIsRoadmapOpen(!isRoadmapOpen)}
                className="w-full flex items-center justify-between p-5 bg-slate-50/50 hover:bg-blue-50/50 transition-colors cursor-pointer outline-none"
              >
                <span className="font-[900] text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
                  🗺️ Execution Roadmap
                </span>
                {isRoadmapOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              <AnimatePresence>
                {isRoadmapOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="border-t border-slate-200"
                  >
                    <div className="p-5 space-y-5">
                      {idea.roadmap.map((stepData) => (
                        <div key={stepData.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-black text-xs border border-blue-200">
                            {stepData.step}
                          </div>
                          <div>
                            <h4 className="font-[800] text-sm text-charcoal mb-1">{stepData.title}</h4>
                            <p className="text-xs font-medium text-slate-500 leading-relaxed">{stepData.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>

      {/* README Modal */}
      <AnimatePresence>
        {showReadme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowReadme(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
                <h2 className="text-xl font-[900] text-charcoal tracking-tight flex items-center gap-3">
                  <FileCode2 className="w-5 h-5 text-primary" /> Generated README.md
                </h2>
                <button
                  onClick={() => setShowReadme(false)}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="flex-grow p-6 overflow-y-auto bg-slate-900 text-slate-300 font-mono text-sm leading-relaxed">
                <pre className="whitespace-pre-wrap">{generateReadmeText()}</pre>
              </div>

              <div className="p-5 border-t border-slate-200 bg-white flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={copyReadme}
                  className="glow-button px-7 py-3 text-sm font-bold flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy README
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SparkleIcon = () => (
  <svg className="w-3.5 h-3.5 dual-tone-icon animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default IdeaCard;
