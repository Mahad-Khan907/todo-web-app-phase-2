from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
from contextlib import contextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///:memory:")

# Create the database engine
engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    """
    Create database tables.
    This function should be called on application startup.
    """
    from .models import User, Task  # Import here to avoid circular imports
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """
    Get a database session.
    This function is used as a FastAPI dependency.
    """
    with Session(engine) as session:
        yield session

@contextmanager
def get_session_context():
    """
    Get a database session as a context manager.
    Useful for non-FastAPI contexts.
    """
    with Session(engine) as session:
        yield session