from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING, List
from datetime import datetime
import uuid
from pydantic import BaseModel
from sqlalchemy import Column
from sqlalchemy.types import JSON

if TYPE_CHECKING:
    from .models import Task


class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class User(UserBase, table=True):
    """
    User model representing a registered user with authentication credentials.
    """
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str = Field(nullable=False)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to tasks
    tasks: list["Task"] = Relationship(back_populates="user")


class UserCreate(UserBase):
    """
    Schema for creating a new user.
    """
    password: str


class UserPublic(UserBase):
    """
    Schema for returning user data (without sensitive information).
    """
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class UserUpdate(SQLModel):
    """
    Schema for updating user information.
    """
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class TaskBase(SQLModel):
    title: str = Field(max_length=200)
    description: Optional[str] = None
    completed: bool = Field(default=False)
    priority: str = Field(default="medium", regex="^(low|medium|high)$")
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None


class Task(TaskBase, table=True):
    """
    Task model representing a todo item that belongs to a specific user.
    """
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))

    # Relationship to user
    user: User = Relationship(back_populates="tasks")


class TaskCreate(TaskBase):
    """
    Schema for creating a new task.
    """
    tags: List[str] = Field(default_factory=list)


class TaskUpdate(SQLModel):
    """
    Schema for updating a task.
    """
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = Field(default=None, regex="^(low|medium|high)$")
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    tags: Optional[List[str]] = None


class TaskPublic(TaskBase):
    """
    Schema for returning task data.
    """
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None
    tags: List[str] = Field(default_factory=list)