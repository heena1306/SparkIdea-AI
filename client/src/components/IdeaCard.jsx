import React, { useState } from 'react';
import { Layers, Box, Check, Cpu, Clock, Activity, ChevronDown, ChevronUp, Save, FileCode2, Copy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isSaved, setIsSaved] = useState(false);

  if (!idea) return null;

  const handleSave = () => {
    let saved = JSON.parse(localStorage.getItem('savedIdeas')) || [];
    // Check if duplicate
    if (!saved.find(i => i.id === idea.id)) {
       // Attach a local timestamp
       const ideaToSave = { ...idea, generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
       saved.push(ideaToSave);
       localStorage.setItem('savedIdeas', JSON.stringify(saved));
    }
    setIsSaved(true);
  };

  const generateReadmeText = () => {
    return `# ${idea.title}\n\n${idea.description}\n\n## 🚀 Tech Stack\n${idea.techStack ? idea.techStack.map(t => `- ${t}`).join('\n') : ''}\n\n## ✨ Features\n${idea.features ? idea.features.map(f => `- ${f}`).join('\n') : ''}\n\n## 📂 Architecture\n\`\`\`\n${idea.githubStructure ? idea.githubStructure.join('\n') : ''}\n\`\`\`\n\n## 🗺️ Build Roadmap\n${idea.roadmap ? idea.roadmap.map(r => `### Step ${r.step}: ${r.title}\n${r.desc}\n`).join('\n') : ''}\n`;
  };

  const copyReadme = () => {
    navigator.clipboard.writeText(generateReadmeText());
    alert("README Copied to Clipboard!");
  };

  return (
    <>
    <motion.div 
      variants={cardVariants}
      layout
      className="w-full glass-card hover:border-blue-400 hover:shadow-2xl p-8 relative overflow-hidden group/card transition-all duration-700 h-full flex flex-col"
    >
      <div className="relative z-10 w-full flex-grow flex flex-col">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 mb-6">
          <div className="flex flex-wrap gap-2 items-center justify-between w-full">
             <div className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded w-max border border-blue-100 shadow-sm">
               <SparkleIcon /> {idea.id || 'Project Scope'}
             </div>
             
             <div className="flex items-center gap-2">
                 <button onClick={handleSave} disabled={isSaved} className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all border ${isSaved ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary shadow-sm'}`}>
                    <Save className="w-3.5 h-3.5" /> {isSaved ? 'Saved' : 'Save'}
                 </button>
                 <button onClick={() => setShowReadme(true)} className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all border bg-slate-900 border-slate-800 text-white shadow-sm hover:scale-105">
                    <FileCode2 className="w-3.5 h-3.5" /> README
                 </button>
             </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-[900] text-charcoal tracking-tight leading-[1.1]">{idea.title}</h2>
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
             <div className={`flex items-center gap-1.5 text-xs font-[800] px-2.5 py-1 rounded-full border ${idea.difficulty === 'Advanced' ? 'bg-red-50 text-red-600 border-red-200' : idea.difficulty === 'Intermediate' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                <Activity className="w-3.5 h-3.5" /> {idea.difficulty}
             </div>
             <div className="flex items-center gap-1.5 text-xs font-[800] px-2.5 py-1 rounded-full border bg-blue-50 text-blue-600 border-blue-200">
                <Clock className="w-3.5 h-3.5" /> {idea.estimatedTime}
             </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-8">
          {idea.description}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
            {idea.techStack && idea.techStack.map(tech => (
            <motion.span whileHover={{ scale: 1.05 }} key={tech} className="bg-white/80 text-[#0F172A] border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-default hover:bg-blue-50 hover:text-primary hover:border-blue-200 transition-colors">
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Bento Lists in Stacked Layout */}
        <div className="flex flex-col gap-6 flex-grow">
           
           <div className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-blue-100 glow-border hover:shadow-lg hover:border-primary/40 transition-all duration-300">
              <h3 className="text-lg font-[800] mb-5 flex items-center gap-2 text-charcoal">
                <Layers className="w-5 h-5 dual-tone-icon" /> Key Features
              </h3>
              <ul className="space-y-4">
                {idea.features && idea.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                    <div className="mt-0.5"><Check className="w-4 h-4 text-primary stroke-[3px]" /></div>
                    <span className="font-bold leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
           </div>
           
           <div className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-purple-100 glow-border font-mono hover:shadow-lg hover:border-secondary/40 transition-all duration-300">
              <h3 className="text-lg font-[800] mb-5 flex items-center gap-2 font-sans text-charcoal">
                <Box className="w-5 h-5 dual-tone-icon" /> Architecture
              </h3>
              <div className="space-y-2.5 border-l-2 border-slate-200 pl-4 text-xs tracking-wide font-medium relative">
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

        {/* Expandable Roadmap Accordion */}
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
                      className="border-t border-slate-200 relative"
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

    {/* OVERLAY MODAL FOR README */}
    <AnimatePresence>
       {showReadme && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
         >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-2xl font-[900] text-charcoal tracking-tight flex items-center gap-3">
                     <FileCode2 className="w-6 h-6 text-primary" /> Generated README.md
                  </h2>
                  <button onClick={() => setShowReadme(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                     <X className="w-5 h-5 text-slate-600" />
                  </button>
               </div>
               
               <div className="flex-grow p-6 overflow-y-auto bg-slate-900 text-slate-300 font-mono text-sm leading-relaxed tracking-wide">
                  <pre className="whitespace-pre-wrap">{generateReadmeText()}</pre>
               </div>
               
               <div className="p-6 border-t border-slate-200 bg-white flex justify-end">
                  <button onClick={copyReadme} className="glow-button px-8 py-3.5 text-sm font-bold flex items-center gap-2">
                     <Copy className="w-4 h-4" /> Copy Entire File
                  </button>
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
