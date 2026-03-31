import { GoogleGenerativeAI } from '@google/generative-ai';

// The exact Fallback array requested by the user, properly formatted to not break the UI grid
const fallbackIdeas = [
  {
    id: "fb-01",
    title: "AI Crop Monitoring Dashboard",
    description: "A system to monitor crop health using AI",
    techStack: ["React", "Node.js", "TensorFlow"],
    features: ["Crop detection", "Weather insights"],
    difficulty: "Intermediate",
    estimatedTime: "2-3 weeks",
    roadmap: [
      { step: 1, title: "Setup frontend", desc: "Build the React interface and dashboards." },
      { step: 2, title: "Build API", desc: "Construct the backend Node.js endpoints." },
      { step: 3, title: "Train model", desc: "Integrate initial machine learning models for analysis." }
    ],
    githubStructure: ["client/src/components", "server/controllers", "ml/models"]
  },
  {
    id: "fb-02",
    title: "Smart Resume Analyzer",
    description: "AI tool to analyze resumes",
    techStack: ["React", "Python", "NLP"],
    features: ["Resume scoring", "Suggestions"],
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    roadmap: [
      { step: 1, title: "UI setup", desc: "Develop the frontend upload capabilities." },
      { step: 2, title: "Backend logic", desc: "Integrate Python NLP libraries for parsing text." }
    ],
    githubStructure: ["client/src/pages", "api/nlp_engine", "docs/architecture"]
  },
  {
    id: "fb-03",
    title: "AI Health Assistant",
    description: "AI chatbot for health queries",
    techStack: ["React", "Node.js", "OpenAI"],
    features: ["Chatbot", "Health tips"],
    difficulty: "Advanced",
    estimatedTime: "3-4 weeks",
    roadmap: [
      { step: 1, title: "Chat UI", desc: "Build a responsive conversation interface." },
      { step: 2, title: "AI integration", desc: "Plug in generative models to handle dialogue securely." }
    ],
    githubStructure: ["client/src/utils/chat", "server/services/ai", "server/models/logs"]
  }
];

export const generateIdea = async (req, res) => {
  const { skills, interest, level } = req.body;
  
  console.log("-> [Backend] Received Generation Request:", { skills, interest, level });

  // Fallback trigger if no valid key is present
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('your_real_key_here')) {
    console.warn("-> [Backend Warning] Invalid GEMINI_API_KEY configuration. Resorting to Fallback.");
    return res.status(200).json(fallbackIdeas);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an elite Silicon Valley software architect and developer assistant. 
    The user wants to build a software project to improve their skills.
    
    User Parameters:
    - Primary Skills/Tech Stack: ${skills && skills.length > 0 ? skills.join(', ') : 'Not specified'}
    - Interests/Domain: ${interest || 'Software Engineering'}
    - Target Difficulty Level: ${level || 'Intermediate'}
    
    YOUR TASK:
    Generate exactly 3 distinct, highly creative, and professional SaaS/software project ideas based primarily on the user's parameters.

    OUTPUT FORMAT:
    You MUST output ONLY a pure JSON array containing exactly 3 objects. 
    Do not include any Markdown wrappers (like \`\`\`json), do not include any preface text, just a valid JSON string that can be parsed by JSON.parse().
    
    Each object in the array MUST adhere EXACTLY to this JSON schema:
    {
      "id": "A unique string ID (e.g., 'idea-01', 'idea-02')",
      "title": "A catchy, professional name for the project",
      "description": "A 2-3 sentence engaging description of what the project does and why it's valuable.",
      "techStack": ["Array", "of", "4-6", "specific", "technologies", "including user skills if applicable"],
      "features": ["Array", "of", "4", "specific", "core architecture features"],
      "difficulty": "Must be exactly one of: 'Beginner', 'Intermediate', or 'Advanced' based on the scope",
      "estimatedTime": "Est time to build (e.g., '2 Weeks', '1 Month')",
      "roadmap": [
        { "step": 1, "title": "Phase name", "desc": "Phase description" },
        { "step": 2, "title": "Phase name", "desc": "Phase description" }
      ],
      "githubStructure": [
        "Array of 5-8 strings representing the core folder structure",
        "e.g., 'client/src/components'"
      ]
    }
    `;

    console.log("-> [Backend] Executing generative prompt to Gemini engine...");
    
    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    
    // Safety sanitize: remove markdown blocks if Gemini stubbornly includes them
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    // Parse into JSON
    const ideasData = JSON.parse(rawText);

    console.log("-> [Backend Success] Successfully parsed Gemini AI Response. Transmitting to Client.");
    return res.status(200).json(ideasData);

  } catch (error) {
    // If the generation fundamentally breaks, fails to parse, or throws 404... fallback safely!
    console.error("-> [Backend Fatal AI Error]:", error);
    console.log("-> [Backend] Resorting to emergency Fallback pipeline.");
    
    // 200 OK Response guaranteeing the frontend NEVER crashes or blanks out.
    return res.status(200).json(fallbackIdeas);
  }
};
