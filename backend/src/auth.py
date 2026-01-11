from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional
from .models import User
from .security import verify_access_token
from .database import get_session

# HTTP Bearer token scheme
security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> User:
    """
    Get the current authenticated user based on the JWT token in the Authorization header.

    Args:
        credentials: The HTTP authorization credentials from the header
        session: Database session dependency

    Returns:
        The authenticated User object

    Raises:
        HTTPException: If token is invalid, expired, or user doesn't exist
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token = credentials.credentials

    # Verify the token and get the payload
    payload = verify_access_token(token)
    if payload is None:
        raise credentials_exception

    # Extract user ID from the payload
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    # Query the database for the user
    user = session.get(User, user_id)
    if user is None:
        raise credentials_exception

    return user