import React, { useState } from 'react';

const IdeaForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    skills: '',
    interest: '',
    level: 'beginner'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-8 relative group">
      {/* Animated glow behind the form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-3xl p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl">
        
        <div className="flex-1 w-full flex flex-col sm:flex-row gap-2 px-4 py-2">
          {/* Skills Input */}
          <div className="flex-1 relative">
            <span className="absolute left-0 top-3 text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </span>
            <input 
              type="text" 
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skills (e.g. React, Python)"
              className="w-full bg-transparent border-none text-slate-200 placeholder-slate-500 pl-8 pr-2 py-3 focus:outline-none focus:ring-0 text-sm md:text-base font-medium"
              required
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-slate-700/50 self-center"></div>

          {/* Interest Input */}
          <div className="flex-1 relative border-t border-slate-800 sm:border-none">
            <span className="absolute left-0 top-3 text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="Interest (e.g. AI, SaaS)"
              className="w-full bg-transparent border-none text-slate-200 placeholder-slate-500 pl-8 pr-2 py-3 focus:outline-none focus:ring-0 text-sm md:text-base font-medium"
              required
            />
          </div>
          
          <div className="hidden sm:block w-px h-8 bg-slate-700/50 self-center"></div>

          {/* Level Select */}
          <div className="flex-shrink-0 relative border-t border-slate-800 sm:border-none min-w-[140px]">
            <span className="absolute left-2 top-3 text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </span>
            <select 
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full bg-transparent border-none text-slate-300 pl-9 pr-6 py-3 focus:outline-none focus:ring-0 appearance-none text-sm md:text-base font-medium cursor-pointer"
            >
              <option value="beginner" className="bg-slate-800">Beginner</option>
              <option value="intermediate" className="bg-slate-800">Intermediate</option>
              <option value="advanced" className="bg-slate-800">Advanced</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group/btn hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-2 sm:mt-0"
        >
          {isLoading ? (
             <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span className="hidden sm:inline">Generate</span>
              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default IdeaForm;
