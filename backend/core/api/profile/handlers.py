import logging

from fastapi import APIRouter, Response, Depends

from config import CONFIG
from core.models.history.responses import HistoryResponse
from core.models.profile.requests import CreateProfileRequest, ProfileRequest, StakeCoinRequest, UnstakeCoinRequest
from core.models.profile.responses import (
    CreateProfileResponse, ProfileResponse,
)
from core.services.history.services import get_profile_history_service
from core.services.profile.services import (
    create_profile as create_profile_service, get_profile_by_wallet_service,
    get_current_profile_service, stake_coins_service, unstake_coins_service,
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/current", response_model=ProfileResponse)
async def get_current_profile(profile: ProfileResponse = Depends(get_current_profile_service)) -> ProfileResponse:
    return profile


@router.get("/get_by_wallet", response_model=ProfileResponse)
async def get_profile_by_wallet(profile: ProfileResponse = Depends(get_current_profile_service)) -> ProfileResponse:
    return await get_profile_by_wallet_service(profile)


@router.post("/create", response_model=CreateProfileResponse)
async def create_profile(data: CreateProfileRequest) -> CreateProfileResponse:
    return await create_profile_service(data)


@router.post("/logout")
async def logout(response: Response, profile: ProfileResponse = Depends(get_current_profile_service)):
    response.delete_cookie(key=CONFIG.cookie_key)
    logout_string = "User: " + profile.wallet + " logged out!"
    logger.info(logout_string)
    return logout_string


@router.put("/stake", response_model=ProfileResponse)
async def steak_coins(data: StakeCoinRequest, profile: ProfileResponse = Depends(get_current_profile_service)):
    return await stake_coins_service(data, profile)


@router.put("/unstake", response_model=ProfileResponse)
async def unsteak_coins(data: UnstakeCoinRequest, profile: ProfileResponse = Depends(get_current_profile_service)):
    return await unstake_coins_service(data, profile)


@router.get("/get_history", response_model=list[HistoryResponse])
async def get_history(profile: ProfileResponse = Depends(get_current_profile_service)):
    return await get_profile_history_service(profile)
