from fastapi import APIRouter, Depends

from core.models.profile.responses import ProfileResponse
from core.services.auth.services import get_access_token
from core.services.profile.services import get_current_profile_service

router = APIRouter(tags=["Sign in and Sign up"])


@router.post("/token")
async def login(response: str = Depends(get_access_token)):
    return response


@router.get("/check_cookie")
async def check_cookie(profile: ProfileResponse = Depends(get_current_profile_service)):
    return bool(profile.wallet)
