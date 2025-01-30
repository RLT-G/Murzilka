from ...common import BaseSchema


class ProfileResponse(BaseSchema):
    id: int
    wallet: str
    total_staked: int
    total_pics: int


class CreateProfileResponse(BaseSchema):
    id: int
    wallet: str
    total_staked: int
    total_pics: int
