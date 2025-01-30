from core.common import BaseSchema
from core.models.task.enums import CheckType


class UpdateTask(BaseSchema):
    title: str
    description: str
    reward: int | None
    check_type: CheckType
