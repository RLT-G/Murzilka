from core.models.project.domains import UpdateProject
from core.models.project.requests import CreateProjectRequest, UpdateProjectRequest
from core.models.project.responses import ProjectResponse, ProjectNamesResponse
from core.registry import project_storage


async def get_all_project_service() -> list[ProjectResponse] | None:
    return await project_storage.get_all()


async def get_all_project_names_service() -> list[ProjectNamesResponse] | None:
    return await project_storage.get_all_names()


async def get_project_by_name_service(project_name: str) -> ProjectResponse | None:
    return await project_storage.get_by_name(project_name)


async def create_project_service(project: CreateProjectRequest) -> ProjectResponse:
    return await project_storage.create(**project.model_dump())


async def update_project_service(project_id: int, project_update_request: UpdateProjectRequest) -> ProjectResponse:
    project_update = UpdateProject(**project_update_request.model_dump())
    return await project_storage.update(project_id, project_update)


async def delete_project_service(project_id: int) -> ProjectResponse:
    return await project_storage.delete(project_id)
