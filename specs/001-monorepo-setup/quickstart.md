# Quickstart Guide: Phase 2 Infrastructure & Setup

## Prerequisites
- Python 3.13+ installed
- Node.js 18+ and npm installed
- `uv` package manager installed globally
- Git installed

## Setup Instructions

### 1. Clone or Initialize Repository
```bash
# If starting fresh:
mkdir todo-web-app
cd todo-web-app
git init
```

### 2. Backend Setup
```bash
# Create and navigate to backend directory
mkdir backend
cd backend

# Initialize uv project
uv init

# Set Python version to 3.13
echo "3.13" > .python-version

# Install required dependencies
uv add fastapi uvicorn sqlmodel psycopg2-binary python-jose[cryptography] python-dotenv python-multipart passlib[bcrypt] bcrypt==3.2.0

# Verify installation
python -c "import fastapi, sqlmodel, jose"
```

### 3. Frontend Setup
```bash
# From project root, create and setup frontend
cd ..
mkdir frontend
cd frontend

# Initialize Next.js app
npx create-next-app@latest . --typescript --tailwind --eslint --app

# Install required dependencies
npm install better-auth lucide-react @tanstack/react-query axios

# Optional: Install Shadcn/UI components
npx shadcn-ui@latest init
```

### 4. Project Structure Verification
After setup, your project should have the following structure:
```
todo-web-app/
├── backend/
│   ├── main.py
│   ├── pyproject.toml
│   └── src/
│       ├── auth.py
│       ├── database.py
│       ├── models.py
│       └── routers/
│           ├── auth.py
│           └── tasks.py
├── frontend/
│   ├── lib/
│   │   ├── api.ts
│   │   └── auth-client.tsx
│   └── src/
│       ├── app/
│       └── components/
├── CLAUDE.md
└── .env
```

### 5. Environment Configuration
Create a `.env` file in the project root with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
SECRET_KEY=your-super-secret-jwt-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 6. Running the Applications
Backend:
```bash
cd backend
uv run uvicorn src.main:app --reload
```

Frontend:
```bash
cd frontend
npm run dev
```

## Next Steps
1. Implement the User and Task models in `backend/src/models.py`
2. Create the database connection in `backend/src/database.py`
3. Implement authentication logic in `backend/src/auth.py`
4. Create the auth and tasks routers
5. Connect the frontend to the backend API