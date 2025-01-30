import logging

from fastapi import APIRouter, Depends

from core.models.profile.responses import ProfileResponse
from core.models.task.requests import CreateTaskRequest, UpdateTaskRequest, CompleteTaskRequest
from core.models.task.responses import TaskResponse, CompleteTaskResponse, CompleteTaskIdResponse
from core.services.profile.services import get_current_profile_service
from core.services.task.services import get_all_task_service, get_task_by_id_service, create_task_service, \
    update_task_service, delete_task_service, complete_task_service, get_profile_progress_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/task", tags=["Task"])


@router.get("/all", response_model=list[TaskResponse])
async def get_all_tasks():
    return await get_all_task_service()


@router.get("/get_by_id/{task_id}", response_model=TaskResponse)
async def get_task_by_id(task_id: int) -> TaskResponse:
    return await get_task_by_id_service(task_id)


@router.post("/create", response_model=TaskResponse)
async def create_task(task: CreateTaskRequest,
                      profile: ProfileResponse = Depends(get_current_profile_service)) -> TaskResponse:
    return await create_task_service(task)


@router.put("/update/{task_id}", response_model=TaskResponse)
async def update_task(task_id: int, task: UpdateTaskRequest,
                      profile: ProfileResponse = Depends(get_current_profile_service)) -> TaskResponse:
    return await update_task_service(task_id, task)


@router.delete("/delete/{project_id}", response_model=TaskResponse)
async def delete_task(task_id: int, profile: ProfileResponse = Depends(get_current_profile_service)) -> TaskResponse:
    return await delete_task_service(task_id)


@router.patch("/complete", response_model=CompleteTaskResponse)
async def complete_task(task: CompleteTaskRequest,
                        profile: ProfileResponse = Depends(get_current_profile_service)) -> CompleteTaskResponse:
    return await complete_task_service(task, profile)


@router.get("/get_completed_tasks", response_model=CompleteTaskIdResponse)
async def get_completed_tasks(
        profile: ProfileResponse = Depends(get_current_profile_service)) -> CompleteTaskIdResponse:
    return await get_profile_progress_service(profile)
