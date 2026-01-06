---
id: 1002
title: Create phase2 infrastructure spec
stage: spec
date: 2025-12-28
surface: agent
model: claude-sonnet-4-5-20250929
feature: monorepo-setup
branch: 001-monorepo-setup
user: Mahad-Khan907
command: /sp.specify
labels: ["specification", "monorepo", "infrastructure", "setup"]
links:
  spec: specs/001-monorepo-setup/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-monorepo-setup/spec.md
 - specs/001-monorepo-setup/checklists/requirements.md
tests:
 - none
---

## Prompt

# Phase 2 Infrastructure & Setup Specification (Claude CLI)

## 1. Goal
Initialize a fresh monorepo environment for the Todo Web App using Claude CLI, establishing a FastAPI backend managed by `uv` and a Next.js 16+ frontend.

## 2. Monorepo Directory Structure
The following structure must be created to support Phase 2 requirements:

├── backend/                # FastAPI Application
│   ├── main.py             # Entry point
│   ├── pyproject.toml      # UV dependency file
│   └── src/
│       ├── auth.py         # JWT & Security logic
│       ├── database.py     # SQLModel engine & session
│       ├── models.py       # SQLModel tables (User, Task)
│       ├── security.py     # Password hashing logic
│       └── routers/
│           ├── auth.py     # Auth endpoints (/auth/register, /auth/login)
│           └── tasks.py    # Task CRUD endpoints (/tasks)
├── frontend/               # Next.js Application
│   ├── lib/
│   │   ├── api.ts          # Axios/Fetch wrapper
│   │   └── auth-client.tsx # Auth context provider
│   └── src/
│       ├── components/     # UI Components (TaskCard, TaskList, etc.)
│       └── app/
│           ├── (auth)/     # Auth route group
│           │   ├── login/page.tsx
│           │   └── signup/page.tsx
│           └── dashboard/  # Protected dashboard
│               └── page.tsx
└── CLAUDE.md               # Project Constitution (Claude Rules)

## 3. Mandatory Installations

### 3.1 Backend Setup (using `uv`)
Navigate to the `/backend` directory and execute:

1. Initialize project:
   `uv init`

2. Set Python version:
   Set `.python-version` to `3.13`.

3. Install Core Dependencies:
   `uv add fastapi uvicorn sqlmodel psycopg2-binary python-jose[cryptography] python-dotenv python-multipart passlib[bcrypt] bcrypt==3.2.0`

### 3.2 Frontend Setup (Next.js)
Navigate to the `/frontend` directory and execute:

1. Initialize Next.js:
   `npx create-next-app@latest . --typescript --tailwind --eslint --app`

2. Install UI & Logic Dependencies:
   `npm install better-auth lucide-react @tanstack/react-query axios`

3. Install Shadcn/UI (Optional but recommended):
   `npx shadcn-ui@latest init`

## 4. Implementation Steps for Claude CLI

### Step 1: Constitution Update
Run `/sp.constitution` to ensure Claude follows the "No Error" policy and uses `uv` for all backend tasks.

### Step 2: Specification Refining
Run `/sp.specify` with the following intent:
"Define the Phase 2 data model where a Task belongs to a User (user_id foreign key) and the API uses JWT Bearer tokens for authentication."

### Step 3: Planning
Run `/sp.plan` to generate the technical roadmap for:
- Connecting to Neon PostgreSQL via SQLModel.
- Implementing JWT login/registration flow.
- Building the responsive Next.js dashboard.

### Step 4: Tasks & Implementation
Run `/sp.tasks` to generate the file-by-file ch

## Response snapshot

Created a comprehensive specification for Phase 2 Infrastructure & Setup, including user stories, functional requirements, and success criteria.

## Outcome

- ✅ Impact: Created complete specification at specs/001-monorepo-setup/spec.md with user scenarios, functional requirements, and success criteria
- 🧪 Tests: none
- 📁 Files: specs/001-monorepo-setup/spec.md, specs/001-monorepo-setup/checklists/requirements.md
- 🔁 Next prompts: Ready for /sp.plan to generate technical roadmap
- 🧠 Reflection: Specification captures all necessary infrastructure setup requirements with clear acceptance criteria

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A