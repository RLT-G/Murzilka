from core.common import BaseSchema


class ProfileRequest(BaseSchema):
    wallet: str


class CreateProfileRequest(BaseSchema):
    wallet: str


class StakeCoinRequest(BaseSchema):
    murzilka_coins: int


class UnstakeCoinRequest(BaseSchema):
    pics_coins: int
