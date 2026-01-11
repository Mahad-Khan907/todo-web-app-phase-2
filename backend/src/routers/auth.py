from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import timedelta
from ..models import User, UserCreate, UserPublic
from ..database import get_session
from ..security import get_password_hash, create_access_token, verify_password
from ..auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

class Token(BaseModel):
    """
    Token response model.
    """
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    """
    Token data model.
    """
    username: Optional[str] = None

class LoginRequest(BaseModel):
    """
    Login request model.
    """
    email: str
    password: str


@router.post("/register", response_model=UserPublic)
async def register(user_create: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user.

    Args:
        user_create: User creation data (email, password, first_name, last_name)
        session: Database session dependency

    Returns:
        The created user (without password)

    Raises:
        HTTPException: If user with email already exists
    """
    # Check if user with email already exists
    existing_user = session.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )

    # Hash the password
    hashed_password = get_password_hash(user_create.password)

    # Create the new user
    user = User(
        email=user_create.email,
        hashed_password=hashed_password,
        first_name=user_create.first_name,
        last_name=user_create.last_name
    )

    # Add to database and commit
    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.post("/login", response_model=Token)
async def login(login_request: LoginRequest, session: Session = Depends(get_session)):
    """
    Login endpoint that returns a JWT access token.

    Args:
        login_request: Login credentials (email, password)
        session: Database session dependency

    Returns:
        JWT access token

    Raises:
        HTTPException: If credentials are invalid
    """
    # Find user by email
    user = session.query(User).filter(User.email == login_request.email).first()

    # Verify user exists
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Verify password
    if not verify_password(login_request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)  # Use default or from env
    access_token = create_access_token(
        data={"sub": str(user.id)},  # Convert UUID to string
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserPublic)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """
    Get current user's information.

    Args:
        current_user: The authenticated user (from JWT token)

    Returns:
        Current user's information
    """
    return current_user