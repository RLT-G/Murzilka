import datetime

from fastapi import Depends, Response
from fastapi.security import OAuth2PasswordRequestForm

from config import CONFIG
from core.models.profile.db import ProfileDB
from core.registry import profile_storage

from ..profile.helpers import create_access_token


def get_token(profile: ProfileDB) -> str:
    started_at = datetime.datetime.now(datetime.UTC)
    token_expires = started_at + datetime.timedelta(
        days=CONFIG.access_token_expire_days
    )
    token = create_access_token(data={"sub": str(profile.wallet), "exp": token_expires})
    return token


async def get_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends()) -> str:
    profile = await profile_storage.get_by_wallet(form_data.username)
    access_token = get_token(profile)
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True)
    return "Log in"
