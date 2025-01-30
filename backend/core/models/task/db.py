from datetime import datetime

from core.common import BaseSchema
from core.models.task.enums import CheckType


class TaskDB(BaseSchema):
    id: int
    title: str
    description: str | None
    reward: int | None
    check_type: CheckType | None


class TaskProgressDB(BaseSchema):
    id: int
    user_id: int
    task_id: int
    is_done: bool
    created_at: datetime
    task_link: str


class CompleteTaskDB(BaseSchema):
    completed_task_id_list: list[int] | None
