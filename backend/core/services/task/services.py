from core.models.profile.requests import ProfileRequest
from core.models.profile.responses import ProfileResponse
from core.models.task.domains import UpdateTask
from core.models.task.requests import CreateTaskRequest, UpdateTaskRequest, CompleteTaskRequest
from core.models.task.responses import TaskResponse, CompleteTaskResponse, CompleteTaskIdResponse
from core.registry import task_storage, profile_storage


async def get_all_task_service() -> list[TaskResponse] | None:
    return await task_storage.get_all()


async def get_task_by_id_service(task_name: int) -> TaskResponse | None:
    return await task_storage.get_by_id(task_name)


async def create_task_service(task: CreateTaskRequest) -> TaskResponse:
    return await task_storage.create(**task.model_dump())


async def update_task_service(task_id: int, task_update_request: UpdateTaskRequest) -> TaskResponse:
    task_update = UpdateTask(**task_update_request.model_dump())
    return await task_storage.update(task_id, task_update)


async def delete_task_service(task_id: int) -> TaskResponse:
    return await task_storage.delete(task_id)


async def complete_task_service(task: CompleteTaskRequest, profile: ProfileResponse) -> CompleteTaskResponse:
    await profile_storage.add_reward_to_balance(profile.id, task.reward + profile.total_pics)
    return await task_storage.add_progress(task_id=task.task_id, task_link=task.task_link,
                                           is_done=True, profile_id=profile.id)


async def get_profile_progress_service(profile: ProfileResponse) -> CompleteTaskIdResponse:
    return await task_storage.get_progress(profile_id=profile.id)
