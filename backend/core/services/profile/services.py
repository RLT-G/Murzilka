import logging

from fastapi import Request

from core.registry import profile_storage, history_storage
from .helpers import decode_jwt
from ...models.profile.requests import CreateProfileRequest, StakeCoinRequest, UnstakeCoinRequest
from ...models.profile.responses import CreateProfileResponse, ProfileResponse
from ...utils import throw_credential_exception, throw_bad_request

logger = logging.getLogger(__name__)


async def get_current_profile_service(
        request: Request
) -> ProfileResponse:
    token = request.cookies.get("access_token")
    if not token:
        throw_credential_exception()

    wallet, _ = decode_jwt(token)
    profile = await profile_storage.get_by_wallet(wallet=wallet)
    if not profile:
        throw_credential_exception()
    profile = ProfileResponse(**profile.model_dump())
    return profile


async def get_profile_by_wallet_service(wallet: ProfileResponse) -> ProfileResponse:
    profile = await profile_storage.get_by_wallet(wallet=wallet.wallet)
    return ProfileResponse(**profile.model_dump())


async def create_profile(data: CreateProfileRequest) -> CreateProfileResponse:
    profile = await profile_storage.create(
        **data.dict()
    )
    return CreateProfileResponse(**profile.model_dump())


async def stake_coins_service(data: StakeCoinRequest, profile: ProfileResponse) -> ProfileResponse:
    if data.murzilka_coins > profile.total_staked:
        return throw_bad_request("There are more coins in the request than in the profile!")

    updated_pics, updated_stake = profile.total_pics + data.murzilka_coins, profile.total_staked - data.murzilka_coins

    profile = await profile_storage.update(profile_id=profile.id, total_staked=updated_stake, total_pics=updated_pics)
    await history_storage.create(profile_id=profile.id, activity='staked', number_of_mzk=data.murzilka_coins)

    return ProfileResponse(**profile.model_dump())


async def unstake_coins_service(data: UnstakeCoinRequest, profile: ProfileResponse) -> ProfileResponse:
    if data.pics_coins > profile.total_pics:
        return throw_bad_request("There are more coins in the request than in the profile!")

    updated_pics, updated_stake = profile.total_pics - data.pics_coins, profile.total_staked + data.pics_coins

    profile = await profile_storage.update(profile_id=profile.id, total_staked=updated_stake, total_pics=updated_pics)
    await history_storage.create(profile_id=profile.id, activity='unstaked', number_of_mzk=data.pics_coins)

    return ProfileResponse(**profile.model_dump())
