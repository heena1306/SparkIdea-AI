import crypto from 'crypto';

// ─── Dynamic Idea Templates ───────────────────────────────
const baseIdeas = {
  beginner: [
    {
      title: "Task Tracker Dashboard",
      description: "Modern task management app with drag-drop, priorities, and progress analytics.",
      baseTech: ["React", "Tailwind CSS", "localStorage"],
      features: ["Drag-drop reordering", "Categories", "Progress charts", "Export"],
      estimatedTime: "1 Week",
      roadmap: [
        { step: 1, title: "UI Components", desc: "Build task list, form, drag-drop." },
        { step: 2, title: "Persistence", desc: "localStorage + state management." },
        { step: 3, title: "Polish", desc: "Animations, responsive, dark mode." }
      ]
    },
    {
      title: "Weather Forecast App",
      description: "Real-time weather dashboard with forecasts and location alerts.",
      baseTech: ["React", "OpenWeather API", "Chart.js"],
      features: ["Live forecasts", "Alerts", "Maps", "Favorites"],
      estimatedTime: "5 Days",
      roadmap: [
        { step: 1, title: "API Setup", desc: "Weather API integration." },
        { step: 2, title: "UI Dashboard", desc: "Cards, charts, responsive." },
        { step: 3, title: "Features", desc: "Search, notifications." }
      ]
    },
    {
      title: "URL Shortener SaaS",
      description: "Custom branded link shortener with analytics and QR codes.",
      baseTech: ["React", "Node.js", "MongoDB"],
      features: ["Custom aliases", "Click analytics", "QR codes", "API"],
      estimatedTime: "1 Week",
      roadmap: [
        { step: 1, title: "Backend API", desc: "Express endpoints for links." },
        { step: 2, title: "Frontend", desc: "Dashboard, stats charts." },
        { step: 3, title: "Advanced", desc: "QR, custom domains." }
      ]
    },
    {
      title: "Expense Tracker PWA",
      description: "Progressive web app for tracking expenses with charts and budgets.",
      baseTech: ["React", "Chart.js", "IndexedDB"],
      features: ["Receipt scanner", "Budget alerts", "Reports", "PWA offline"],
      estimatedTime: "1 Week",
      roadmap: [
        { step: 1, title: "Core Tracking", desc: "Add/edit expenses UI." },
        { step: 2, title: "Charts Storage", desc: "IndexedDB + Chart.js." },
        { step: 3, title: "PWA", desc: "Service worker, offline." }
      ]
    }
  ],
  intermediate: [
    {
      title: "AI Content Generator SaaS",
      description: "Generate blog posts, social content, emails using smart templates.",
      baseTech: ["React", "Tailwind", "local LLM"],
      features: ["Multiple templates", "Tone control", "Export formats", "History"],
      estimatedTime: "2 Weeks",
      roadmap: [
        { step: 1, title: "Templates Engine", desc: "Smart fill-in-the-blank generator." },
        { step: 2, title: "UI Polish", desc: "Multi-step forms, previews." },
        { step: 3, title: "Advanced", desc: "User auth, saved prompts." }
      ]
    },
    {
      title: "E-commerce Admin Dashboard",
      description: "Complete admin panel for managing products, orders, customers.",
      baseTech: ["React", "Chart.js", "Tailwind"],
      features: ["Product CRUD", "Order tracking", "Analytics", "Inventory"],
      estimatedTime: "3 Weeks",
      roadmap: [
        { step: 1, title: "Data Models", desc: "Products, orders schema." },
        { step: 2, title: "Pages", desc: "Tables, forms, charts." },
        { step: 3, title: "Polish", desc: "Responsive, search, filters." }
      ]
    },
    {
      title: "Freelance Marketplace Clone",
      description: "Platform connecting freelancers with projects, payments, reviews.",
      baseTech: ["React", "Node.js", "Stripe"],
      features: ["Profiles", "Proposals", "Escrow payments", "Reviews"],
      estimatedTime: "3 Weeks",
      roadmap: [
        { step: 1, title: "Auth Profiles", desc: "User signup, profiles." },
        { step: 2, title: "Projects", desc: "Postings, proposals." },
        { step: 3, title: "Payments", desc: "Stripe integration." }
      ]
    }
  ],
  advanced: [
    {
      title: "Real-time Collaboration Tool",
      description: "Live document editor with cursors, chat, version history.",
      baseTech: ["React", "Socket.io", "Node.js", "Yjs"],
      features: ["Live editing", "Cursors", "Chat", "Versions"],
      estimatedTime: "4 Weeks",
      roadmap: [
        { step: 1, title: "Socket Backend", desc: "Real-time sync server." },
        { step: 2, title: "Editor UI", desc: "CodeMirror/Yjs integration." },
        { step: 3, title: "Features", desc: "Chat, history, permissions." }
      ]
    },
    {
      title: "AI Video Generator SaaS",
      description: "Text-to-video platform using AI models for marketing content.",
      baseTech: ["React", "Node.js", "FFmpeg", "RunwayML"],
      features: ["Text prompts", "Style templates", "Export 4K", "Queue system"],
      estimatedTime: "5 Weeks",
      roadmap: [
        { step: 1, title: "AI Pipeline", desc: "Video gen backend." },
        { step: 2, title: "Editor UI", desc: "Preview, timeline editor." },
        { step: 3, title: "Scale", desc: "Queue, credits system." }
      ]
    }
  ]
};

// ─── Mappers ───────────────────────────────
const techMapper = {
  react: ["React", "Tailwind", "Vite"],
  node: ["Node.js", "Express", "MongoDB"],
  python: ["Python", "FastAPI"],
  ai: ["OpenAI", "LangChain"],
  mobile: ["React Native", "Expo"]
};

const domainEnhancers = {
  saas: { descSuffix: 'as scalable SaaS platform', features: ["Stripe", "Auth0"] },
  ai: { descSuffix: 'AI-powered solution', features: ["ML inference", "Fine-tuning"] },
  fintech: { descSuffix: 'fintech application', features: ["Plaid", "KYC"] }
};

// ─── Generator ───────────────────────────────
const generateDynamicIdeas = (skills = [], interest = 'web', level = 'intermediate') => {
  const pool = baseIdeas[level] || baseIdeas.intermediate;
  const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 3);

  return selected.map((base, i) => ({
    id: crypto.randomUUID(),
    title: base.title,
    description: `${base.description}${domainEnhancers[interest.toLowerCase()]?.descSuffix ? ` ${domainEnhancers[interest.toLowerCase()].descSuffix}.` : ''}`,
    techStack: [...base.baseTech, ...skills.flatMap(s => techMapper[s.toLowerCase()] || [])].slice(0, 6),
    features: [...base.features, ...(domainEnhancers[interest.toLowerCase()]?.features || [])].slice(0, 6),
    difficulty: level.charAt(0).toUpperCase() + level.slice(1),
    estimatedTime: base.estimatedTime,
    roadmap: base.roadmap,
    githubStructure: [
      "client/src/",
      "server/",
      "docs/",
      "README.md"
    ]
  }));
};

// ─── Controller ───────────────────────────────
export const generateIdea = async (req, res) => {
  try {
    const { skills = [], interest = 'web', level = 'intermediate' } = req.body;
    const ideas = generateDynamicIdeas(skills, interest, level);
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Generation failed' });
  }
};

