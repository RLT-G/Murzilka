from core.common import BaseSchema
from core.models.task.enums import CheckType


class CreateTaskRequest(BaseSchema):
    title: str
    description: str
    reward: int | None
    check_type: CheckType


class UpdateTaskRequest(BaseSchema):
    title: str
    description: str
    reward: int | None
    check_type: CheckType


class CompleteTaskRequest(BaseSchema):
    task_id: int
    task_link: str
    reward: int
