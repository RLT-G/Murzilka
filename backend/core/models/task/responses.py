from datetime import datetime

from .enums import CheckType
from ...common import BaseSchema


class TaskResponse(BaseSchema):
    id: int
    title: str
    description: str
    reward: int | None = None
    check_type: CheckType


class CompleteTaskResponse(BaseSchema):
    id: int
    user_id: int
    task_id: int
    is_done: bool
    created_at: datetime
    task_link: str


class CompleteTaskIdResponse(BaseSchema):
    completed_task_id_list: list | None
