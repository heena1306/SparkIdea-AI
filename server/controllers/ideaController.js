import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ─── Fallback ideas (always safe, never empty) ───────────────────────────────
const fallbackIdeas = [
  {
    id: "fb-01",
    title: "AI Crop Monitoring Dashboard",
    description: "A real-time platform that uses computer vision and AI to monitor crop health, detect diseases early, and deliver actionable insights to farmers via an intuitive dashboard.",
    techStack: ["React", "Node.js", "TensorFlow", "MongoDB", "Python", "Chart.js"],
    features: [
      "Real-time crop health analysis via satellite imagery",
      "AI-powered disease and pest early detection alerts",
      "Weather data integration for predictive insights",
      "Export reports to PDF with historical trend charts"
    ],
    difficulty: "Intermediate",
    estimatedTime: "3 Weeks",
    roadmap: [
      { step: 1, title: "Project Setup & UI", desc: "Bootstrap the React frontend with dashboard layout, routing, and Tailwind CSS." },
      { step: 2, title: "Backend API", desc: "Build Express endpoints for crop data ingestion and AI model invocation." },
      { step: 3, title: "ML Integration", desc: "Integrate TensorFlow model for image classification and health scoring." },
      { step: 4, title: "Data Viz & Deploy", desc: "Add Chart.js graphs, historical trends, and deploy to Vercel + Railway." }
    ],
    githubStructure: [
      "client/src/components",
      "client/src/pages/Dashboard",
      "server/controllers",
      "server/routes",
      "ml/models",
      "ml/training_data"
    ]
  },
  {
    id: "fb-02",
    title: "Smart Resume Analyzer",
    description: "An AI-powered SaaS tool that parses developer resumes, scores them against job descriptions using NLP, and provides actionable improvement suggestions to maximize interview callbacks.",
    techStack: ["React", "Python", "FastAPI", "OpenAI", "PostgreSQL", "Docker"],
    features: [
      "Drag-and-drop PDF/DOCX resume upload",
      "ATS compatibility scoring with keyword gap analysis",
      "AI-generated tailored improvement suggestions per job role",
      "Side-by-side comparison of resume vs job description"
    ],
    difficulty: "Beginner",
    estimatedTime: "2 Weeks",
    roadmap: [
      { step: 1, title: "Frontend UI", desc: "Build the file upload interface, results dashboard, and score visualizations." },
      { step: 2, title: "FastAPI Backend", desc: "Create endpoints for file parsing, text extraction, and scoring logic." },
      { step: 3, title: "AI Integration", desc: "Connect to OpenAI API to generate contextual feedback and suggestions." },
      { step: 4, title: "Polish & Ship", desc: "Add user auth, history tracking, and containerize with Docker." }
    ],
    githubStructure: [
      "client/src/pages/Upload",
      "client/src/components/ScoreCard",
      "api/routers/resume.py",
      "api/services/nlp_engine.py",
      "docs/architecture"
    ]
  },
  {
    id: "fb-03",
    title: "AI Developer Health Assistant",
    description: "A conversational AI chatbot designed specifically for developers, providing ergonomic tips, burnout detection based on work patterns, and personalized wellness routines to boost productivity.",
    techStack: ["React", "Node.js", "OpenAI GPT-4", "Socket.io", "Redis", "MongoDB"],
    features: [
      "Real-time AI chat with streaming responses via WebSocket",
      "Work-pattern analysis with burnout risk scoring",
      "Personalized break reminders and ergonomic exercises",
      "Mood tracking journal with AI-powered weekly summaries"
    ],
    difficulty: "Advanced",
    estimatedTime: "4 Weeks",
    roadmap: [
      { step: 1, title: "Chat UI", desc: "Build a polished real-time chat interface with message streaming and history." },
      { step: 2, title: "WebSocket Layer", desc: "Implement Socket.io for bi-directional streaming AI responses." },
      { step: 3, title: "AI & Context Memory", desc: "Integrate GPT-4 with Redis-backed conversation memory per user session." },
      { step: 4, title: "Analytics & Auth", desc: "Add dashboard for pattern analysis, burnout scores, and secure user auth." }
    ],
    githubStructure: [
      "client/src/components/Chat",
      "client/src/pages/Wellness",
      "server/sockets/chatHandler.js",
      "server/services/ai/gpt.js",
      "server/models/Session.js",
      "server/utils/memory.js"
    ]
  }
];

// ─── Build the shared prompt ──────────────────────────────────────────────────
const buildPrompt = (skills, interest, level) => `
You are an elite Silicon Valley software architect. Generate exactly 3 distinct, creative, and professional SaaS/software project ideas.

User Parameters:
- Skills: ${skills && skills.length > 0 ? skills.join(', ') : 'General Programming'}
- Interests: ${interest || 'Software Engineering'}
- Difficulty Level: ${level || 'Intermediate'}

OUTPUT FORMAT — respond with ONLY a valid JSON array, no markdown, no extra text:
[
  {
    "id": "idea-01",
    "title": "Catchy project name",
    "description": "2-3 sentence description of what it does and why it is valuable.",
    "techStack": ["Tech1", "Tech2", "Tech3", "Tech4", "Tech5"],
    "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    "difficulty": "Beginner | Intermediate | Advanced",
    "estimatedTime": "e.g. 2 Weeks",
    "roadmap": [
      { "step": 1, "title": "Phase Name", "desc": "Phase description" },
      { "step": 2, "title": "Phase Name", "desc": "Phase description" },
      { "step": 3, "title": "Phase Name", "desc": "Phase description" }
    ],
    "githubStructure": ["folder/path1", "folder/path2", "folder/path3", "folder/path4", "folder/path5"]
  }
]
`;

// ─── Try Gemini ───────────────────────────────────────────────────────────────
const tryGemini = async (skills, interest, level) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  console.log('-> [Backend] Calling Gemini AI...');
  const result = await model.generateContent(buildPrompt(skills, interest, level));
  let rawText = result.response.text();

  // Strip markdown code fences if present
  rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  return JSON.parse(rawText);
};

// ─── Try OpenAI ───────────────────────────────────────────────────────────────
const tryOpenAI = async (skills, interest, level) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log('-> [Backend] Calling OpenAI...');
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: buildPrompt(skills, interest, level) }],
    temperature: 0.7,
  });

  let rawText = completion.choices[0].message.content;
  rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  return JSON.parse(rawText);
};

// ─── Main Controller ──────────────────────────────────────────────────────────
export const generateIdea = async (req, res) => {
  const { skills, interest, level } = req.body;

  console.log('-> [Backend] Generation Request received:', { skills, interest, level });

  const hasGemini = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10;
  const hasOpenAI = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10;

  // ── Try Gemini first ──
  if (hasGemini) {
    try {
      const ideas = await tryGemini(skills, interest, level);
      console.log('-> [Backend Success] Gemini returned', ideas.length, 'ideas. Sending to client.');
      return res.status(200).json(ideas);
    } catch (err) {
      console.error('-> [Backend] Gemini failed:', err.message, '— trying next option...');
    }
  }

  // ── Try OpenAI next ──
  if (hasOpenAI) {
    try {
      const ideas = await tryOpenAI(skills, interest, level);
      console.log('-> [Backend Success] OpenAI returned', ideas.length, 'ideas. Sending to client.');
      return res.status(200).json(ideas);
    } catch (err) {
      console.error('-> [Backend] OpenAI failed:', err.message, '— falling back to static ideas.');
    }
  }

  // ── Always-safe fallback ──
  console.warn('-> [Backend] No AI available or all AI calls failed. Returning static fallback ideas.');
  return res.status(200).json(fallbackIdeas);
};
