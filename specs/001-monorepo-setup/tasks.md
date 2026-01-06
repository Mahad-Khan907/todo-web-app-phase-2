# Task List: Phase 2 Infrastructure & Setup

**Feature**: Phase 2 Infrastructure & Setup | **Branch**: 001-monorepo-setup
**Created**: 2025-12-28 | **Input**: Feature specification and user-provided task list

## Dependencies

- User Story 1 (P1) must complete before User Story 2 and 3
- User Story 2 (P1) and User Story 3 (P1) must complete before User Story 4 (P2)
- All foundational setup tasks must complete before user story implementation

## Parallel Execution Examples

- T002 [P] and T003 [P] can execute in parallel (different directories)
- T004 [P] and T005 [P] can execute in parallel (different directories)
- T201 [P] [US2] and T301 [P] [US3] can execute in parallel (different components)

## Implementation Strategy

MVP scope includes User Story 1 (monorepo structure) and User Story 2 (backend dependencies) to establish the foundation. Each user story is designed to be independently testable and deliver value.

## Phase 1: Workspace & Environment Setup

- [x] T001 Initialize Clean Monorepo Structure
- [x] T002 [P] Initialize Frontend (Next.js)
- [x] T003 [P] Install Frontend Dependencies
- [x] T004 [P] Initialize Backend (UV)
- [x] T005 [P] Install Backend Dependencies via UV

## Phase 2: Database & Core Models

- [x] T101 Database Configuration (`backend/src/database.py`)
- [x] T102 Identity & Resource Models (`backend/src/models.py`)
- [x] T103 Password Security (`backend/src/security.py`)

## Phase 3: User Story 1 - Initialize Monorepo Structure (P1)

**Goal**: Initialize a fresh monorepo environment for the Todo Web App with FastAPI backend and Next.js frontend

**Independent Test**: Can be fully tested by verifying the directory structure exists with proper backend and frontend applications initialized, and that both can be built and run independently.

- [x] T201 [US1] Create project structure with /backend and /frontend directories
- [x] T202 [US1] Create CLAUDE.md (Constitution) and .env (Root variables)

## Phase 4: User Story 2 - Configure Backend Dependencies (P1)

**Goal**: Configure the backend with proper dependencies using `uv` to have a properly managed Python environment with all required packages

**Independent Test**: Can be fully tested by verifying all required dependencies are installed and the backend application can import all necessary modules without errors.

- [x] T301 [US2] Configure UV in backend directory with Python 3.13
- [x] T302 [US2] Install backend dependencies: fastapi, uvicorn[standard], sqlmodel, psycopg2-binary, python-jose[cryptography], passlib[bcrypt], python-dotenv, python-multipart

## Phase 5: User Story 3 - Configure Frontend Dependencies (P1)

**Goal**: Configure the frontend with proper dependencies including UI components and auth integration to build a responsive web interface

**Independent Test**: Can be fully tested by verifying all required dependencies are installed and the frontend application can be built and run without errors.

- [x] T401 [US3] Initialize Next.js application with TypeScript and Tailwind
- [x] T402 [US3] Install frontend dependencies: better-auth, lucide-react, @tanstack/react-query, axios, zod, react-hook-form

## Phase 6: User Story 4 - Establish Authentication Foundation (P2)

**Goal**: Establish the foundation for JWT-based authentication with User and Task models to implement secure user management and task CRUD operations

**Independent Test**: Can be fully tested by verifying the authentication endpoints exist and properly handle JWT token generation and validation.

- [x] T501 [US4] Database Configuration (`backend/src/database.py`)
- [x] T502 [US4] Identity & Resource Models (`backend/src/models.py`)
- [x] T503 [US4] Password Security (`backend/src/security.py`)
- [x] T504 [US4] Token Logic (`backend/src/auth.py`)
- [x] T505 [US4] Auth Dependency (`backend/src/auth.py`)
- [x] T506 [US4] Auth Routes (`backend/src/routers/auth.py`)
- [x] T507 [US4] Task CRUD Implementation (`backend/src/routers/tasks.py`)
- [x] T508 [US4] Main API Assembly (`backend/main.py`)

## Phase 7: Frontend UI & Integration

- [x] T601 API Service Layer (`frontend/lib/api.ts`)
- [x] T602 Authentication UI components for signup and login
- [x] T603 Todo Dashboard UI with task management components

## Phase 8: Quality Assurance & Testing

- [ ] T701 Run `uvicorn` and verify backend logs for successful DB connection
- [ ] T702 Run `npm run build` to verify TypeScript/ESLint compliance
- [ ] T703 Perform E2E test: Register User A -> Create Task -> Logout -> Register User B -> Verify Task A is NOT visible