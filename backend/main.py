from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import create_db_and_tables
from src.routers import auth, tasks

# Initialize FastAPI app
app = FastAPI(title="Todo Web App API", version="1.0.0")

# Setup CORS middleware to allow http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Auth and Task routers
app.include_router(auth.router)
app.include_router(tasks.router)

@app.on_event("startup")
def on_startup():
    """
    Startup event handler.
    Creates database tables on application startup.
    """
    create_db_and_tables()

@app.get("/")
def read_root():
    """
    Root endpoint for health check.
    """
    return {"message": "Todo Web App API is running!"}

@app.get("/health")
def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy", "service": "Todo Web App API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
