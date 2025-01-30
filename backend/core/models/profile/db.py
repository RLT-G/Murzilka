from core.common import BaseSchema


class ProfileDB(BaseSchema):
    id: int | None
    wallet: str | None
    total_staked: float | None = None
    total_pics: float | None = None
