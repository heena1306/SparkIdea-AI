import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Terminal, BookOpen, Layers, ArrowUp, Search, X, TrendingUp, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IdeaCard from '../components/IdeaCard';
import { useAuth } from '../context/AuthContext';

const SKILLS_SUGGESTIONS = [
  'React', 'Node.js', 'Python', 'AI', 'Machine Learning', 
  'Web Dev', 'Mobile Dev', 'AWS', 'Firebase', 'TypeScript',
  'Next.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker',
  'PyTorch', 'TensorFlow', 'OpenAI', 'LangChain', 'Vector DBs'
];

const INTERESTS_SUGGESTIONS = [
  'Fintech', 'Healthtech', 'E-commerce', 'Crypto', 'Gaming',
  'Education', 'Social Media', 'Productivity', 'Sustainability',
  'Cybersecurity', 'Automation', 'Real Estate', 'Travel', 'Music',
  'Generative AI', 'SaaS', 'DevOps', 'IoT', 'Data Science'
];

const TRENDING_IDEAS = [
  {
    title: "AI Code Reviewer for PRs",
    description: "An automated tool that uses LLMs to review pull requests, suggest optimizations, and catch security vulnerabilities before merge.",
    techStack: ["Node.js", "OpenAI", "GitHub API", "TypeScript"],
    features: ["Automated PR comments", "Security scanning", "Performance suggestions", "Style enforcement"],
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks",
    isTrending: true,
    rating: 9.2,
    isUnique: true,
    recommendation: "High demand in DevOps and large engineering teams."
  },
  {
    title: "Smart Health Diagnostic Bot",
    description: "A HIPAA-compliant chatbot that helps users understand symptoms and suggests when to see a doctor using medical knowledge graphs.",
    techStack: ["Python", "FastAPI", "React", "Vector DB"],
    features: ["Symptom analysis", "Medical history tracking", "Doctor appointment linking", "Encrypted data storage"],
    difficulty: "Advanced",
    estimatedTime: "2-3 months",
    isTrending: true,
    rating: 8.8,
    isUnique: true,
    recommendation: "Perfect for exploring AI in healthcare regulations."
  },
  {
    title: "Personalized AI Learning Path",
    description: "An educational platform that generates custom learning roadmaps based on a user's current skills and desired career goals.",
    techStack: ["Next.js", "LangChain", "PostgreSQL", "Tailwind"],
    features: ["Skill assessment quiz", "Dynamic roadmap generation", "Resource aggregation", "Progress tracking"],
    difficulty: "Intermediate",
    estimatedTime: "4-5 weeks",
    isTrending: true,
    rating: 9.5,
    isUnique: false,
    recommendation: "Taps into the massive EdTech boom and personalized learning trends."
  }
];

const GeneratorPage = () => {
  const { saveIdea, userSkills, updateUserSkills } = useAuth();
  const [formData, setFormData] = useState({
    skills: '',
    interest: '',
    level: 'beginner'
  });
  
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);
  
  const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
  const [showInterestsSuggestions, setShowInterestsSuggestions] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState(SKILLS_SUGGESTIONS);
  const [filteredInterests, setFilteredInterests] = useState(INTERESTS_SUGGESTIONS);
  
  const skillsRef = useRef(null);
  const interestsRef = useRef(null);

  useEffect(() => {
    const currentSkill = formData.skills.split(',').pop()?.trim().toLowerCase() || '';
    if (currentSkill) {
      setFilteredSkills(SKILLS_SUGGESTIONS.filter(s => s.toLowerCase().includes(currentSkill)));
    } else {
      setFilteredSkills(SKILLS_SUGGESTIONS);
    }
  }, [formData.skills]);

  useEffect(() => {
    const currentInterest = formData.interest.toLowerCase();
    if (currentInterest) {
      setFilteredInterests(INTERESTS_SUGGESTIONS.filter(i => i.toLowerCase().includes(currentInterest)));
    } else {
      setFilteredInterests(INTERESTS_SUGGESTIONS);
    }
  }, [formData.interest]);

  const generateSmartIdeas = (skills, interest, level, userSkills = []) => {
    // Skill matching score for prioritization
    const getSkillMatchScore = (ideaTags, userSkills) => {
      let score = 0;
      ideaTags.forEach(tag => {
        if (userSkills.some(skill => skill.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(skill.toLowerCase()))) {
          score += 2;
        }
      });
      return score;
    };

    // Base ideas
    const baseIdeas = [
      {
        title: `${interest} Analytics Platform`,
        description: `A sophisticated dashboard for tracking and analyzing ${interest} trends using ${skills[0] || 'modern tech'}.`,
        techStack: [...skills.slice(0, 3), 'React', 'Tailwind CSS', 'Chart.js'],
        features: ['Real-time data tracking', 'Predictive analytics', 'Custom report generation', 'User authentication'],
        difficulty: level.charAt(0).toUpperCase() + level.slice(1),
        estimatedTime: level === 'beginner' ? '2-3 weeks' : level === 'intermediate' ? '1-2 months' : '3-4 months',
        roadmap: [
          { step: 1, title: 'Project Setup', desc: 'Initialize the repository and setup the basic architecture.' },
          { step: 2, title: 'Core Implementation', desc: 'Build the primary data processing engines.' },
          { step: 3, title: 'UI/UX Polish', desc: 'Design and implement the user interface with smooth transitions.' }
        ],
        githubStructure: ['src/components', 'src/hooks', 'src/services', 'src/utils', 'api/routes'],
        skillScore: getSkillMatchScore([...skills.slice(0, 3), 'React', 'Tailwind CSS', 'Chart.js'], userSkills)
      },
      {
        title: `AI-Powered ${interest} Assistant`,
        description: `An intelligent assistant that helps users manage their ${interest} workflows more efficiently.`,
        techStack: [...skills.slice(0, 2), 'OpenAI API', 'Node.js', 'Next.js'],
        features: ['Natural language processing', 'Automated task scheduling', 'Smart recommendations', 'Multi-device sync'],
        difficulty: level.charAt(0).toUpperCase() + level.slice(1),
        estimatedTime: level === 'beginner' ? '3-4 weeks' : level === 'intermediate' ? '2-3 months' : '4-5 months',
        roadmap: [
          { step: 1, title: 'AI Integration', desc: 'Configure LLM endpoints and prompt engineering.' },
          { step: 2, title: 'Frontend Development', desc: 'Create a conversational UI for the assistant.' },
          { step: 3, title: 'Beta Testing', desc: 'Gather user feedback and optimize AI responses.' }
        ],
        githubStructure: ['src/ai', 'src/components', 'src/context', 'server/controllers', 'docs/api'],
        skillScore: getSkillMatchScore([...skills.slice(0, 2), 'OpenAI API', 'Node.js', 'Next.js'], userSkills)
      },
      {
        title: `Open Source ${interest} Tool`,
        description: `A community-driven tool designed to solve common problems in the ${interest} sector.`,
        techStack: [...skills.slice(0, 4), 'TypeScript', 'Docker', 'GitHub Actions'],
        features: ['Plugin architecture', 'Comprehensive API documentation', 'Community contribution guide', 'High performance'],
        difficulty: level.charAt(0).toUpperCase() + level.slice(1),
        estimatedTime: level === 'beginner' ? '1-2 weeks' : level === 'intermediate' ? '1 month' : '2-3 months',
        roadmap: [
          { step: 1, title: 'Discovery', desc: 'Identify core pain points in the current ecosystem.' },
          { step: 2, title: 'MVP Build', desc: 'Focus on the most critical feature for launch.' },
          { step: 3, title: 'Scaling', desc: 'Optimize for performance and add more advanced features.' }
        ],
        githubStructure: ['src/core', 'src/plugins', 'tests/unit', 'configs', 'scripts'],
        skillScore: getSkillMatchScore([...skills.slice(0, 4), 'TypeScript', 'Docker', 'GitHub Actions'], userSkills)
      }
    ];

    // Sort by skill match score (highest first)
    return baseIdeas.sort((a, b) => b.skillScore - a.skillScore);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
    
    setIsLoading(true);
    setIdeas([]);
    setError(null);
    
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedIdeas = generateSmartIdeas(skillsArray, formData.interest, formData.level, userSkills);
      setIdeas(generatedIdeas);
      
      // Track generated count
      const currentCount = parseInt(localStorage.getItem('generatedCount') || '0');
      localStorage.setItem('generatedCount', (currentCount + 1).toString());
      
      // Store last generated idea for dashboard
      localStorage.setItem('lastGeneratedIdea', JSON.stringify(generatedIdeas[0]));
      
    } catch (err) {
      setError("Failed to generate ideas. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (type, value) => {
    if (type === 'skills') {
      const current = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
      if (!current.includes(value)) {
        const newValue = [...current, value].join(', ');
        setFormData({ ...formData, skills: newValue });
      }
      setShowSkillsSuggestions(false);
    } else {
      setFormData({ ...formData, interest: value });
      setShowInterestsSuggestions(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[100rem] mx-auto flex-grow mt-12 px-4">
      
      <div className={`fixed inset-0 z-[-1] pointer-events-none transition-all duration-1000 ${isFocused ? 'opacity-100 scale-105 filter saturate-150' : 'opacity-0 scale-100'}`}>
         <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-[#3B82F6]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
         <div className="absolute top-1/3 right-1/4 w-[50%] h-[50%] bg-[#A855F7]/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="text-center mb-16">
         <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-[900] mb-4 tracking-tight text-[#0F172A]"
         >
           What do you want to build?
         </motion.h1>
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-lg font-medium"
         >
           Define your stack and interests, and let AI generate your next masterpiece.
         </motion.p>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-5xl mb-20">
         <form onSubmit={handleSubmit} className="glass-card !rounded-3xl md:!rounded-full p-2 md:pl-8 flex flex-col md:flex-row items-center border-slate-200 bg-white/80 shadow-xl relative z-30">
            
            <div className="w-full md:flex-1 relative" ref={skillsRef}>
              <div className="flex items-center gap-4 px-4 py-3 md:py-0">
                <Terminal className="w-6 h-6 text-primary" />
                <input 
                  required 
                  type="text" 
                  placeholder="Skills (React, Python...)" 
                  value={formData.skills} 
                  onChange={e => setFormData({...formData, skills: e.target.value})} 
                  onFocus={() => { setIsFocused(true); setShowSkillsSuggestions(true); }}
                  onBlur={() => { setIsFocused(false); setTimeout(() => setShowSkillsSuggestions(false), 200); }}
                  className="w-full bg-transparent border-none text-[#0F172A] focus:ring-0 focus:outline-none placeholder-slate-400 font-bold text-lg" 
                />
              </div>
              <AnimatePresence>
                {showSkillsSuggestions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2 grid grid-cols-2 sm:grid-cols-3 gap-1"
                  >
                    {filteredSkills.length > 0 ? filteredSkills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSuggestionClick('skills', skill)}
                        className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-primary rounded-xl transition-colors text-left"
                      >
                        {skill}
                      </button>
                    )) : (
                      <div className="col-span-full py-2 px-3 text-xs text-slate-400 font-bold italic">No matching skills found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden md:block w-[1px] h-10 bg-slate-200 mx-2"></div>
            
            <div className="w-full md:flex-1 relative" ref={interestsRef}>
              <div className="flex items-center gap-4 px-4 py-3 md:py-0">
                <BookOpen className="w-6 h-6 text-secondary" />
                <input 
                  required 
                  type="text" 
                  placeholder="Interests (Crypto, AI...)" 
                  value={formData.interest} 
                  onChange={e => setFormData({...formData, interest: e.target.value})} 
                  onFocus={() => { setIsFocused(true); setShowInterestsSuggestions(true); }}
                  onBlur={() => { setIsFocused(false); setTimeout(() => setShowInterestsSuggestions(false), 200); }}
                  className="w-full bg-transparent border-none text-[#0F172A] focus:ring-0 focus:outline-none placeholder-slate-400 font-bold text-lg" 
                />
              </div>
              <AnimatePresence>
                {showInterestsSuggestions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2 grid grid-cols-2 sm:grid-cols-3 gap-1"
                  >
                    {filteredInterests.length > 0 ? filteredInterests.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleSuggestionClick('interest', interest)}
                        className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-secondary rounded-xl transition-colors text-left"
                      >
                        {interest}
                      </button>
                    )) : (
                      <div className="col-span-full py-2 px-3 text-xs text-slate-400 font-bold italic">No matching interests found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-slate-200 mx-2"></div>

            <div className="w-full md:w-auto flex items-center gap-2 px-4 py-3 md:py-0">
              <Layers className="w-6 h-6 text-amber-500" />
              <select 
                value={formData.level} 
                onChange={e => setFormData({...formData, level: e.target.value})} 
                className="bg-transparent border-none text-[#0F172A] focus:ring-0 focus:outline-none cursor-pointer appearance-none font-bold text-lg pr-8"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               type="submit" 
               disabled={isLoading} 
               className={`w-full md:w-16 h-14 md:h-16 md:rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-lg rounded-2xl mt-2 md:mt-0 ${isLoading ? 'bg-blue-50 text-primary animate-pulse cursor-not-allowed' : 'glow-button border-none'}`}
            >
               {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div> : <ArrowUp className="w-8 h-8 stroke-[3px]" />}
            </motion.button>
         </form>
      </motion.div>

      <AnimatePresence mode="wait">
        <div className="w-full mb-20">
           {isLoading && (
              <div className="text-center py-20">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"
                />
                <h2 className="text-2xl font-black text-slate-900 animate-pulse">Generating ideas…</h2>
                <p className="text-slate-500 font-medium mt-2">Our AI is architecting your next project</p>
              </div>
           )}

           {ideas.length > 0 && !isLoading && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-8"
             >
                {ideas.map((idea, index) => {
                  const enhancedIdea = {
                    ...idea, 
                    id: index + 1,
                    skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                    interest: formData.interest
                  };
                  return <IdeaCard key={index} idea={enhancedIdea} />;
                })}
             </motion.div>
           )}

           {ideas.length === 0 && !isLoading && !error && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-10"
             >
               <div className="flex flex-col items-center text-center space-y-2">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
                   <TrendingUp className="w-3 h-3" /> Trending Now
                 </div>
                 <h2 className="text-3xl font-[900] text-slate-900 tracking-tight">Explore Popular AI Concepts</h2>
                 <p className="text-slate-500 font-medium max-w-lg">Get inspired by what's hot in the industry right now. These ideas are hand-picked for modern developers.</p>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 {TRENDING_IDEAS.map((idea, index) => (
                   <IdeaCard key={`trending-${index}`} idea={{...idea, id: `Trend ${index + 1}`}} />
                 ))}
               </div>

               <div className="text-center pt-8 opacity-20">
                 <Sparkles className="w-12 h-12 mx-auto mb-4" />
                 <p className="text-xl font-black">Or generate something unique above</p>
               </div>
             </motion.div>
           )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default GeneratorPage;
