// client/src/utils/ideaUtils.js
// Reusable functions for idea scoring, analytics, recommendations

export const TRENDING_KEYWORDS = [
  'AI', 'ML', 'Automation', 'Data', 'Web3', 'Blockchain', 'Cloud'
];

export const generateIdeaScore = (idea, userSkills = []) => {
  let score = 5; // base

  const text = (idea.title + ' ' + idea.description).toLowerCase();
  
  // Priority 1: User skills match (highest +2 per match, max +4)
  let skillMatches = 0;
  userSkills.forEach(skill => {
    if (text.includes(skill.toLowerCase())) skillMatches++;
  });
  score += Math.min(skillMatches * 2, 4);

  // Priority 2: Trending keywords (+2 if any)
  const hasTrending = TRENDING_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
  if (hasTrending) score += 2;

  // Generic penalty (common words like 'app', 'build', 'simple')
  const genericWords = ['app', 'build', 'simple', 'basic', 'tracker'];
  const genericCount = genericWords.filter(word => text.includes(word)).length;
  score -= Math.min(genericCount, 1);

  // Clamp 0-10
  score = Math.max(0, Math.min(10, score));

  // Derive levels
  const demandLevel = score >= 8 ? 'High' : score >= 5 ? 'Medium' : 'Low';
  const difficulty = idea.difficulty || (score > 7 ? 'Hard' : score > 4 ? 'Medium' : 'Easy');
  const uniqueness = score > 6 || hasTrending ? 'Unique' : 'Common';

  return {
    rating: Math.round(score * 10) / 10,
    demandLevel,
    difficulty,
    uniqueness
  };
};

export const getProgress = (status) => {
  switch (status) {
    case 'Completed': return 100;
    case 'Started': return 50;
    case 'Pending': return 10;
    default: return 0;
  }
};

export const generateRecommendations = (userSkills = [], savedIdeas = []) => {
  // Simple: base on skills + saved tags, return 3 mock ideas
  const recCount = 3;
  const skillFocus = userSkills[0] || 'React';
  const ideas = [];
  
  // Mock templates similar to server baseIdeas
  const templates = [
    {
      title: `${skillFocus} SaaS Dashboard`,
      description: `Advanced dashboard using ${skillFocus} with real-time analytics.`,
      techStack: [skillFocus, 'Tailwind', 'Chart.js'],
      difficulty: 'Medium'
    },
    {
      title: `AI-Powered ${skillFocus} Tool`,
      description: `Integrate AI/ML with ${skillFocus} for intelligent automation.`,
      techStack: [skillFocus, 'OpenAI', 'Node.js'],
      difficulty: 'Hard'
    },
    {
      title: `Portfolio ${skillFocus} App`,
      description: `Modern portfolio showcasing ${skillFocus} projects and skills.`,
      techStack: [skillFocus, 'Vite', 'Framer Motion'],
      difficulty: 'Easy'
    }
  ];

  return templates.slice(0, recCount).map((tmpl, i) => ({
    ...tmpl,
    id: `rec-${i}`,
    rating: 8.5,
    demandLevel: 'High',
    uniqueness: 'Unique',
    status: 'Pending',
    progress: 0
  }));
};

export const computeAnalytics = (savedIdeas = []) => {
  const totalIdeas = savedIdeas.length;
  const pending = savedIdeas.filter(i => i.status === 'Pending').length;
  const started = savedIdeas.filter(i => i.status === 'Started').length;
  const completedIdeas = savedIdeas.filter(i => i.status === 'Completed').length;
  const completionRate = totalIdeas > 0 ? Math.round((completedIdeas / totalIdeas) * 100) : 0;

  // Average rating
  const avgRating = totalIdeas > 0 ? (savedIdeas.reduce((sum, i) => sum + (i.rating || 0), 0) / totalIdeas).toFixed(1) : 0;

  // Unique/Common
  const uniqueCount = savedIdeas.filter(i => i.uniqueness === 'Unique').length;
  const commonCount = totalIdeas - uniqueCount;

  // Most used skill
  const allTags = savedIdeas.flatMap(i => i.tags || i.techStack || []);
  const tagFreq = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const mostUsedSkill = Object.entries(tagFreq).sort(([,a], [,b]) => b - a)[0]?.[0] || 'React';

  // Dominant category
  const categories = { AI: 0, Web: 0, Mobile: 0, SaaS: 0 };
  savedIdeas.forEach(idea => {
    const text = (idea.title + ' ' + idea.description).toLowerCase();
    if (text.includes('ai') || text.includes('ml')) categories.AI++;
    if (text.includes('web') || text.includes('react')) categories.Web++;
    if (text.includes('mobile') || text.includes('app')) categories.Mobile++;
    if (text.includes('saas')) categories.SaaS++;
  });
  const dominantCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Web';

  // Suggestion
  const suggestion = `You tend to prefer ${dominantCategory.toLowerCase()}, consider exploring ${dominantCategory === 'AI' ? 'Web/SaaS' : 'AI/ML'} projects for balance.`;

  return {
    totalIdeas,
    pending,
    started,
    completedIdeas,
    completionRate,
    avgRating,
    uniqueCount,
    commonCount,
    mostUsedSkill,
    dominantCategory,
    suggestion,
    ideaStats: {
      pending,
      started,
      completed: completedIdeas
    }
  };
};

