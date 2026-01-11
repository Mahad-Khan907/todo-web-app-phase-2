from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import Task, TaskCreate, TaskUpdate, TaskPublic, User
from ..database import get_session
from ..auth import get_current_user
from datetime import datetime, timedelta

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("/", response_model=List[TaskPublic])
async def get_tasks(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the current user.

    Args:
        current_user: The authenticated user (from JWT token)
        session: Database session dependency

    Returns:
        List of tasks belonging to the current user
    """
    tasks = session.query(Task).filter(Task.user_id == current_user.id).all()
    return tasks


@router.post("/", response_model=TaskPublic)
async def create_task(
    task_create: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the current user.

    Args:
        task_create: Task creation data
        current_user: The authenticated user (from JWT token)
        session: Database session dependency

    Returns:
        The created task
    """
    task = Task(
        **task_create.dict(exclude_unset=True),
        user_id=current_user.id
    )

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.get("/{task_id}", response_model=TaskPublic)
async def get_task(
    task_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID.

    Args:
        task_id: The ID of the task to retrieve
        current_user: The authenticated user (from JWT token)
        session: Database session dependency

    Returns:
        The requested task if it belongs to the current user

    Raises:
        HTTPException: If task doesn't exist or doesn't belong to the user
    """
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Check if task belongs to current_user
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this task"
        )

    return task


@router.patch("/{task_id}", response_model=TaskPublic)
async def update_task(
    task_id: str,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID.

    Args:
        task_id: The ID of the task to update
        task_update: Task update data
        current_user: The authenticated user (from JWT token)
        session: Database session dependency

    Returns:
        The updated task

    Raises:
        HTTPException: If task doesn't exist or doesn't belong to the user
    """
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Check if task belongs to current_user before updating
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field == "completed" and value is True and task.completed is False:
            task.completed_at = datetime.utcnow()
        elif field == "completed" and value is False and task.completed is True:
            task.completed_at = None
        setattr(task, field, value)

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/{task_id}")
async def delete_task(
    task_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID.

    Args:
        task_id: The ID of the task to delete
        current_user: The authenticated user (from JWT token)
        session: Database session dependency

    Returns:
        Success message

    Raises:
        HTTPException: If task doesn't exist or doesn't belong to the user
    """
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Check ownership before deletion
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this task"
        )

    session.delete(task)
    session.commit()

    return {"message": "Task deleted successfully"}