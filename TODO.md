# SparkIdea AI Upgrade - Implementation TODO

## Current Status: 🚀 Implementation Started

### Priority 1: Backend - Fix & Enhance Idea Generator (3 ideas w/ full details)
- [x] **server/controllers/ideaController.js**: Remove OpenAI/Gemini deps, implement dynamic template-based generator (skills/interest/level aware, always 3 unique ideas)
- [x] **server/package.json**: Remove AI deps (openai, @google/generative-ai)
- [x] Test: Generate 3 ideas with all fields (title, desc, techStack array, features array, difficulty, estimatedTime, roadmap array)

### Priority 2: Frontend - Enhance Generator & README
- [x] **client/src/pages/GeneratorPage.jsx**: Ensure 3-card grid, loading spinners, error handling
- [x] **client/src/components/IdeaCard.jsx**: Enhance README generator (include all new fields), add Copy button w/ toast
- [x] Add Download README as .md file feature

### Priority 3: Save Ideas System Improvements
- [ ] **client/src/components/IdeaCard.jsx** & **SavedIdeasPage.jsx**: No duplicates, delete/remove, persist across sessions
- [ ] localStorage schema validation

### Priority 4: Idea Detail Page
- [ ] **New: client/src/pages/IdeaDetail.jsx**: Full project view (expandable sections, full roadmap)
- [ ] Routing: Add `/idea/:id` route in App.jsx

### Priority 5: Dashboard Enhancements
- [ ] **New/Enhance: client/src/pages/Dashboard.jsx**: Welcome user, stats (total generated, saved count), recent 3 ideas
- [ ] **AuthContext.jsx**: Track generatedCount, persist stats

### Priority 6: Loading States & Empty States
- [ ] All pages: Spinners, empty messages, error boundaries

### Priority 7: Final UI Polish
- [ ] Spacing/alignment, hover animations (scale/glow), input focus effects
- [ ] Navbar responsiveness (mobile hamburger)
- [ ] Mobile-first responsiveness (stack cards, adjust paddings)

### Post-Implementation
- [ ] Full end-to-end test (login → generate → save → dashboard → detail)
- [ ] No console errors, responsive on mobile/desktop
- [ ] attempt_completion

**Guidelines:**
- Preserve existing theme/colors/gradients exactly
- Functionality first, polish second
- Simple, clean code
- Update this TODO.md after each major step ✓

