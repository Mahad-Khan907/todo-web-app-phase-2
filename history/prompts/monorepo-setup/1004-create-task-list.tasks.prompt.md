---
id: 1004
title: Create task list
stage: tasks
date: 2025-12-28
surface: agent
model: claude-sonnet-4-5-20250929
feature: monorepo-setup
branch: 001-monorepo-setup
user: Mahad-Khan907
command: /sp.tasks
labels: ["tasks", "implementation", "planning", "setup"]
links:
  spec: specs/001-monorepo-setup/spec.md
  plan: specs/001-monorepo-setup/plan.md
  tasks: specs/001-monorepo-setup/tasks.md
  adr: null
  pr: null
files:
 - specs/001-monorepo-setup/tasks.md
tests:
 - none
---

## Prompt

# ==========================================================
# DETAILED TASK LIST: Phase II Todo Web App (Claude CLI)
# Goal: Multi-user Auth + Persistent DB + Next.js UI
# ==========================================================

## PHASE 1: WORKSPACE & ENVIRONMENT SETUP (PRIORITY: CRITICAL)
- [ ] Task 1.1: Initialize Clean Monorepo Structure
      - Create root folder and sub-folders: /backend, /frontend.
      - Create CLAUDE.md (Constitution) and .env (Root variables).
- [ ] Task 1.2: Initialize Frontend (Next.js)
      - Command: `npx create-next-app@latest frontend --typescript --tailwind --eslint --app`
      - Options: Use 'src/' directory, No 'experimental' flags.
- [ ] Task 1.3: Install Frontend Dependencies
      - `npm install better-auth lucide-react @tanstack/react-query axios zod react-hook-form`
- [ ] Task 1.4: Initialize Backend (UV)
      - Navigate to /backend and run `uv init`.
      - Set `.python-version` to "3.13".
- [ ] Task 1.5: Install Backend Dependencies via UV
      - `uv add fastapi uvicorn[standard] sqlmodel psycopg2-binary python-jose[cryptography] passlib[bcrypt] python-dotenv python-multipart`

## PHASE 2: DATABASE & CORE MODELS
- [ ] Task 2.1: Database Configuration (`backend/src/database.py`)
      - Define SQLModel engine for Neon/Postgres.
      - Implement `create_db_and_tables()` function.
      - Implement `get_session()` dependency for FastAPI routes.
- [ ] Task 2.2: Identity & Resource Models (`backend/src/models.py`)
      - [User Model]: id (UUID/Int), email (Unique), hashed_password.
      - [Task Model]: id, title, description, is_completed, user_id (FK -> User.id).
      - [Schemas]: UserCreate, UserPublic, TaskCreate, TaskUpdate.
- [ ] Task 2.3: Password Security (`backend/src/security.py`)
      - Implement `get_password_hash(password: str)`.
      - Implement `verify_password(plain, hashed)`.

## PHASE 3: AUTHENTICATION SYSTEM (JWT)
- [ ] Task 3.1: Token Logic (`backend/src/auth.py`)
      - Define SECRET_KEY and ALGORITHM (HS256).
      - Implement `create_access_token(data: dict)`.
- [ ] Task 3.2: Auth Dependency (`backend/src/auth.py`)
      - Implement `get_current_user` to validate 'Authorization: Bearer <token>' header.
      - Raise HTTP 401 if token is invalid or user is missing.
- [ ] Task 3.3: Auth Routes (`backend/src/routers/auth.py`)
      - POST `/register`: Check for existing user, hash password, save user.
      - POST `/token`: Validate credentials, return JWT access token.

## PHASE 4: TASK API & DATA ISOLATION
- [ ] Task 4.1: Task CRUD Implementation (`backend/src/routers/tasks.py`)
      - GET `/tasks`: Query filter where `Task.user_id == current_user.id`.
      - POST `/tasks`: Set `new_task.user_id = current_user.id` automatically.
      - PATCH `/tasks/{id}`: Check if task belongs to current_user before updating.
      - DELETE `/tasks/{id}`: Check ownership before deletion.
- [ ] Task 4.2: Main API Assembly (`backend/main.py`)
      - Initialize FastAPI app.
      - Include Auth and Task routers.
      - Setup CORS middleware to allow `http://localhost:3000`.

## PHASE 5: FRONTEND UI & INTEGRATION
- [ ] Task 5.1: API Service Layer (`frontend/lib/api.ts`)
      - Create Axios instance with interceptors to automatically attach JWT to requests.
- [ ] Task 5.2: Authentication UI
      - Build Signup and Login forms using Tailwind and Zod for validation.
      - Implement persistent login (save JWT to localStorage or Cookie).
- [ ] Task 5.3: Todo Dashboard UI
      - Fetch tasks using TanStack Query.
      - Create components: `TaskItem`, `AddTaskForm`, and `DeleteButton`.
      - Add "Protected Route" logic to redirect unauthenticated users to /login.

## PHASE 6: QUALITY ASSURANCE (NO ERRORS)
- [ ] Task 6.1: Run `uvicorn` and verify backend logs for successful DB connection.
- [ ] Task 6.2: Run `npm run build` to verify TypeScript/ESLint compliance.
- [ ] Task 6.3: Perform E2E test: Register User A -> Create Task -> Logout -> Register User B -> Verify Task A is NOT visible.

## Response snapshot

Created comprehensive task list for Phase 2 Infrastructure & Setup with proper organization by user stories and dependencies.

## Outcome

- ✅ Impact: Created complete task list at specs/001-monorepo-setup/tasks.md with 25 tasks organized by phases and user stories
- 🧪 Tests: none
- 📁 Files: specs/001-monorepo-setup/tasks.md
- 🔁 Next prompts: Ready for /sp.implement to execute the implementation
- 🧠 Reflection: Tasks organized by user stories with proper dependencies and parallel execution opportunities identified

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A