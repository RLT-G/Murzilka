import logging

from fastapi import APIRouter, Depends

from core.models.profile.responses import ProfileResponse
from core.models.project.requests import CreateProjectRequest, UpdateProjectRequest
from core.models.project.responses import ProjectResponse, ProjectNamesResponse
from core.services.profile.services import get_current_profile_service
from core.services.project.services import get_all_project_service, get_project_by_name_service, create_project_service, \
    update_project_service, delete_project_service, get_all_project_names_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/project", tags=["Project"])


@router.get("/all", response_model=list[ProjectResponse])
async def get_all_project():
    return await get_all_project_service()


@router.get("/all_names", response_model=list[ProjectNamesResponse])
async def get_all_project_names():
    return await get_all_project_names_service()


@router.get("/get_by_name/{project_name}", response_model=ProjectResponse)
async def get_project_by_name(project_name: str):
    return await get_project_by_name_service(project_name)


@router.post("/create", response_model=ProjectResponse)
async def create_project(project: CreateProjectRequest,
                         profile: ProfileResponse = Depends(get_current_profile_service)) -> ProjectResponse:
    return await create_project_service(project)


@router.put("/update/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: int, project: UpdateProjectRequest,
                         profile: ProfileResponse = Depends(get_current_profile_service)) -> ProjectResponse:
    return await update_project_service(project_id, project)


@router.delete("/delete/{project_id}", response_model=ProjectResponse)
async def delete_project(project_id: int,
                         profile: ProfileResponse = Depends(get_current_profile_service)) -> ProjectResponse:
    return await delete_project_service(project_id)
