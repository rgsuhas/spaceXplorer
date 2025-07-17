# GEMINI this is for you

# GEMINI.md

## 🚀 Project Purpose

- Create an engaging, visually impressive, and educational single-page web app about asteroids.
- Automate all data and visuals via trusted NASA APIs.
- Deliver clarity, fun, and instant engagement—minimal manual effort, no feature bloat.
- Code must be clean, maintainable, tested, and easy to showcase in a developer portfolio.

## 🛠️ Tech Stack

- **Framework:** Next.js (or React if necessary).
- **Styling:** CSS Modules, Tailwind, or Bootstrap. Follow modular, maintainable approaches.
- **API:** NASA NeoWs for asteroid data, NASA Media API for images.
- **Charts:** Chart.js or lightweight SVG.
- **Testing:** Jest and React Testing Library.
- **Deployment:** Vercel or Netlify, with Git-based auto-deploy.

## 📝 Coding Standards

- **Naming:**  
  - File/folder: kebab-case  
  - JS variables: camelCase  
  - Components: PascalCase
- **Comments:** All functions and complex sections must be documented.
- **Accessibility:** Semantic HTML, `aria` labels where appropriate.
- **No hardcoded secrets:** Use `.env.local` for API keys.
- **ESLint/Prettier:** Enforce formatting/linting.

## ✔️ Developer Workflow

1. **Atomic Tasks:**  
   - Each prompt to Gemini must tackle only one feature or change at a time.
   - Example: "Fetch and display Asteroid of the Day from NASA NeoWs, with image and quick facts."

2. **Test-First Development:**  
   - Write a failing unit/integration test before implementing any new feature or UI.
   - Run `npm test` after each automatic code gen.

3. **Manual Review:**  
   - Every code suggestion is to be reviewed and tested by developer before merging.

4. **Checkpointing:**  
   - Before major changes, always create a checkpoint or Git commit to facilitate rollback.

5. **Automation:**  
   - Content (e.g., facts, charts) must update via API only—no manual refresh or edits required.

6. **Visual Simplicity and Focus:**  
   - Only clearly visible, high-impact, instantly understandable data/charts.
   - Minimal options/settings—prioritize “wow” over technical depth.

7. **Shareability:**  
   - Every factoid/visual must be instantly sharable via social buttons, with catchy captions.

## 🔍 Non-Negotiables

- No feature bloat: Only implement and keep essential, visually impressive features.
- No generic or AI-generated code that is not standards-compliant—review and test everything for correctness and design.
- Do not include experimental, unproven, or undocumented APIs/libraries.
- No login or user account functionality (unless justified by user feedback later).
- Only NASA/ESA or officially sourced data.

## 💡 Required Features

| Feature                | Must-Have Checklist                                   |
|------------------------|------------------------------------------------------|
| Asteroid of the Day    | Pull from NASA API; display image, facts; sharable   |
| Close Approaches List  | Auto-updating via NASA API                           |
| Fun Fact Section       | Rotates from trusted data or static list             |
| Visual Comparison      | Show asteroid vs. familiar object (e.g. buses)       |
| Risk Meter             | Simple, clear; emoji + plain speech                  |
| Social Share           | Prominent; with snappy, fun captions                 |
| About Section          | Briefly explain project, APIs, automation            |

## 📚 Documentation & Collaboration

- All PRs must pass all tests and manual review.
- Update this GEMINI.md with any major new standard, tool, or process.
- Major architectural decisions or new dependencies go in `/docs` or README.

**Always refer to this GEMINI.md in every Gemini CLI prompt to anchor output to trusted developer best practices, enforce test-first and atomic workflows, and guarantee clean, reviewable, portfolio-ready code.**

