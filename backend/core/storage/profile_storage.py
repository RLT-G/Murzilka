from core.models.profile.db import ProfileDB
from core.storage.db.postgres import DB
from core.utils import throw_not_found


class ProfileStorage:
    def __init__(self, db: DB) -> None:
        self.db = db

    async def get_by_wallet(
            self, wallet: str
    ) -> ProfileDB:
        sql = "SELECT * FROM api_profile WHERE (wallet = $1)"
        row = await self.db.fetch_row(sql, wallet)
        if not row:
            throw_not_found("No user with this id!")
        return ProfileDB.model_validate(dict(row))

    async def create(self, wallet: str) -> ProfileDB:
        sql = """
        INSERT INTO api_profile
        VALUES (default, $1)
        RETURNING *
        """
        row = await self.db.fetch_row(sql, wallet)
        profile = ProfileDB.model_validate(dict(row))
        return profile

    async def update(self, profile_id: int, total_staked: int, total_pics: int) -> ProfileDB:
        sql = """UPDATE api_profile SET total_staked=$2, total_pics=$3 WHERE id=$1 RETURNING * """
        row = await self.db.fetch_row(sql, profile_id, total_staked, total_pics)
        profile = ProfileDB.model_validate(dict(row))
        return profile

    async def add_reward_to_balance(self, profile_id: int, reward: int):
        sql = "UPDATE api_profile SET total_pics=$1 WHERE id=$2 RETURNING *"
        await self.db.fetch_row(sql, reward, profile_id)
