from core.models.history.db import HistoryDB
from core.models.history.enums import ActivityType
from core.storage.db.postgres import DB
from core.utils import throw_bad_request


class HistoryStorage:
    def __init__(self, db: DB) -> None:
        self.db = db

    async def get_all_by_id(self, profile_id: int) -> list[HistoryDB]:
        sql = "SELECT * FROM api_history WHERE profile_id=$1"
        rows = await self.db.fetch(sql, profile_id)

        history_rows: list[HistoryDB] = []

        if not rows:
            return history_rows

        for row in rows:
            history_rows.append(HistoryDB.model_validate(dict(row)))

        return history_rows

    async def create(
            self,
            profile_id: int,
            activity: ActivityType,
            number_of_mzk: int
    ) -> HistoryDB:
        sql = """
        INSERT INTO api_history
        VALUES (DEFAULT, $1, $2::activity_type, $3, DEFAULT)
        RETURNING *
        """
        try:
            row = await self.db.fetch_row(
                sql,
                profile_id,
                activity,
                number_of_mzk
            )
            return HistoryDB.model_validate(dict(row))
        except:  # TODO handle specific error
            throw_bad_request("History with this name already exists!")
