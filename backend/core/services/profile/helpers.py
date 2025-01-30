from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext

from config import CONFIG
from core.utils import throw_credential_exception

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def decode_jwt(
        token: str, secret_key: str = CONFIG.secret_key
) -> tuple[str, str]:
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        wallet: str = payload.get("sub")
        token_expires: str = payload.get("exp")
        if not wallet:
            throw_credential_exception()
        return wallet, token_expires
    except JWTError:
        throw_credential_exception()


def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, CONFIG.secret_key, algorithm="HS256")
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)
