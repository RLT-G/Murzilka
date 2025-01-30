from datetime import datetime

from core.common import BaseSchema
from core.models.history.enums import ActivityType


class HistoryDB(BaseSchema):
    id: int
    profile_id: int
    activity: ActivityType
    number_of_mzk: int
    create_date: datetime

