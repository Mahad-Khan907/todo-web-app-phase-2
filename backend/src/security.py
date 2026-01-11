import bcrypt
from typing import Union
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# JWT configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-jwt-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))


def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt.
    Truncates the password to 72 bytes as per bcrypt's limitation.

    Args:
        password: The plain text password to hash

    Returns:
        The hashed password
    """
    # Truncate password to 72 bytes as bcrypt has a limitation
    truncated_password = password.encode('utf-8')[:72]
    # bcrypt.hashpw expects bytes, bcrypt.gensalt() also produces bytes
    return bcrypt.hashpw(truncated_password, bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.

    Args:
        plain_password: The plain text password to verify
        hashed_password: The hashed password to compare against

    Returns:
        True if the password matches, False otherwise
    """
    # bcrypt.checkpw expects bytes for both arguments
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    """
    Create a JWT access token.

    Args:
        data: The data to encode in the token
        expires_delta: Optional expiration time delta (defaults to ACCESS_TOKEN_EXPIRE_MINUTES)

    Returns:
        The encoded JWT token as a string
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_access_token(token: str) -> Union[dict, None]:
    """
    Verify a JWT access token and return the payload if valid.

    Args:
        token: The JWT token to verify

    Returns:
        The token payload if valid, None if invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None