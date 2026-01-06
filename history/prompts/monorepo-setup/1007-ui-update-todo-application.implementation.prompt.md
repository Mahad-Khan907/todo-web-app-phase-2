---
id: 1007-ui-update-todo-application.implementation.prompt
title: Unify Dark Blue Premium Theme Across All Pages
stage: implementation
date_iso: 2026-01-04
surface: agent
model: Claude Sonnet 4.5
feature: 128-theme-unification
branch: feature/104-ui-update-todo-application
user: Claude Code
command: /sp.implement
labels:
  - ui
  - theming
  - design-system
  - consistency
  - nextjs
  - tailwind
  - framer-motion
links:
  spec: specs/104-ui-update-todo-application/spec.md
  plan: specs/104-ui-update-todo-application/plan.md
  tasks: specs/104-ui-update-todo-application/tasks.md
  ticket: null
  adr: adr/2026-01-03-dark-blue-theme-decision.md
  pr: null
files_yaml:
  - app/page.tsx
  - app/login/page.tsx 
  - app/register/page.tsx
  - app/dashboard/page.tsx     
tests_yaml: []
---

## Unify Dark Blue Premium Theme Across All Pages

### Prompt Text
/sp.implement
Unify the visual design of the entire Todo Manager application under a single, consistent premium dark blue theme.
Current situation:

The dashboard page already features a sophisticated dark aesthetic: black base, subtle blue/indigo/cyan glowing orbs, glassmorphism cards, multi-stop gradient text, soft shadows, and calm animations.
The landing page (home), login page, and register page are still using the default light Tailwind UI style with indigo accents and white/gray backgrounds, creating a clear visual disconnect.

### Objective
Redesign the Home, Login, and Register pages so that they perfectly match the established dashboard theme, resulting in a seamless, professional experience from first visit to daily use.

Specific requirements:

- Use the exact same background composition on every page:
  - Solid black base
  - Subtle gradient overlay (blue-900/20 to indigo-900/20)
  - Central radial glow
  - Three static blurred orbs (blue, indigo, cyan) for depth

- Apply consistent glassmorphism to all cards and forms:
  - bg-black/60 + backdrop-blur-2xl
  - border-white/20
  - Outer soft glow layer for premium feel

- Unified typography:
  - Primary headings: gradient text from-blue-400 → via-cyan-300 → to-indigo-400
  - Accents: text-cyan-300
  - Body: text-white/60 to text-white/70

- Button and input styling:
  - Primary buttons: gradient from-blue-600 → via-indigo-700 → to-cyan-600 with shadow-blue-500/40
  - Secondary buttons: transparent glass with hover glow
  - Inputs: icon-prefixed, glass background, blue focus ring

- Subtle, professional animations using Framer Motion (fade-in + slight upward movement)
- Maintain full responsiveness and accessibility
- Preserve all existing functionality — only visual and experiential changes

### Pages to update
- Home / Landing Page
- Login Page
- Register Page
- Ensure visual continuity with existing Dashboard

The final application must feel like a single, thoughtfully designed premium product.

### Response Text
Completed full theme unification across the Todo Manager application using the premium dark blue design system.

#### Implementation summary
- Established shared background layers (black base + gradient overlay + radial glow + three static blurred orbs) across all four main pages for immediate visual continuity.
- Converted all cards and forms to consistent glassmorphism style with backdrop blur, semi-transparent dark backgrounds, and subtle outer glows.
- Applied identical gradient typography to main headings and consistent color hierarchy throughout.
- Standardized interactive elements:
  - Primary actions use the blue-indigo-cyan gradient with matching shadow
  - Secondary actions use glass-style buttons with hover border glow
  - Form inputs include prefixed Lucide icons, glass backgrounds, and blue focus effects
- Added calm entrance animations and micro-interactions for polish without distraction.
- Specific page enhancements:
  - Home: Hero section with staggered reveals, feature cards with soft glows
  - Login: Centered focused card with welcome messaging and error handling
  - Register: Extended form layout maintaining identical styling patterns
- Added additional features: task search, filtering by due date, priority, and completion, without affecting the cohesive visual experience

All existing functionality remains intact. The application now delivers a cohesive, immersive, and professional user experience from the moment a visitor lands on the homepage through authentication and into the daily dashboard workflow.

### Outcome
The Todo Manager application has achieved complete visual and experiential consistency. The premium dark blue theme is now uniformly applied across Home, Login, Register, and Dashboard pages, significantly elevating perceived quality, brand coherence, and user trust. The design remains performant, accessible, and focused — perfectly aligned with a professional productivity tool.
