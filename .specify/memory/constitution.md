<!--
SYNC IMPACT REPORT:
- Version change: 1.0.0 → 1.1.0
- Added sections: Project Overview, Technical Stack details, Operational Rules, CLI Commands
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->

# Claude CLI Todo Web App Constitution

## Project Overview

### Project Mission
To build a robust, full-stack monorepo Todo Web Application (FastAPI + Next.js) using the Claude CLI as the primary AI developer. The goal is to implement multi-user authentication, persistent storage, and a modern responsive UI.

## Technical Stack

### Backend (API Layer)
- **Runtime**: Python 3.13+
- **Management**: `uv` (Mandatory for environments and dependencies)
- **Framework**: FastAPI (High-performance REST API)
- **Database**: PostgreSQL (via Neon Serverless) with SQLModel ORM
- **Auth**: JWT-based security using `python-jose`

### Frontend (UI Layer)
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS + Shadcn/UI
- **State**: TanStack Query (Server-state management)
- **Auth**: Better Auth integration

## Operational Rules & "No Error" Policy

### Development Standards
- **Clean Architecture**: Strictly separate logic into `/backend` and `/frontend`.
- **Dependency Isolation**: All backend libraries must be managed via `uv`. Never use global pip.
- **Validation**: Every feature must pass a `/sp.specify` check before implementation to ensure no logical gaps.
- **Error-Free Code**: Claude must verify syntax, TypeScript types, and import paths before delivering code snippets to prevent build breaks.

### CLI Commands
- `/sp.constitution`: Update project rules.
- `/sp.specify`: Generate or refine feature requirements.
- `/sp.plan`: Create a technical roadmap.
- `/sp.tasks`: Generate a granular checklist for implementation.
- `/sp.implement`: Execute code generation based on tasks.

## Governance
All development must strictly adhere to this constitution to ensure alignment with project requirements. Constitution supersedes all other practices. All code generation must follow spec-driven development principles using Claude Code and Spec-Kit Plus tools. All PRs/reviews must verify compliance with these principles.

**Version**: 1.1.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-28