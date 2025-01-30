from datetime import datetime
from typing import Optional

from core.models.project.db import ProjectDB, ProjectNameDB
from core.models.project.domains import UpdateProject
from core.storage.db.postgres import DB
from core.utils import throw_not_found, throw_bad_request


class ProjectStorage:
    def __init__(self, db: DB) -> None:
        self.db = db

    async def get_all(self) -> list[ProjectDB]:
        sql = "SELECT * FROM api_project"
        rows = await self.db.fetch(sql)
        if not rows:
            throw_not_found("No projects!")

        projects: list[ProjectDB] = []
        for row in rows:
            projects.append(ProjectDB.model_validate(dict(row)))
        return projects

    async def get_all_names(self) -> list[ProjectNameDB]:
        sql = "SELECT id, name FROM api_project"
        rows = await self.db.fetch(sql)
        if not rows:
            throw_not_found("No projects!")

        projects_names: list[ProjectNameDB] = []
        for row in rows:
            projects_names.append(ProjectNameDB.model_validate(dict(row)))
        return projects_names

    async def get_by_name(
            self, project_name: str
    ) -> Optional[ProjectDB]:
        sql = "SELECT * FROM api_project WHERE (name = $1)"
        row = await self.db.fetch_row(sql, project_name)
        if not row:
            throw_not_found("No user with this id!")
        return ProjectDB.model_validate(dict(row))

    async def create(
            self,
            name: str,
            description: str | None,
            end_event: datetime,
            start_event: datetime,
            logo_url: str | None,
            website_url: str | None,
            whitepaper_url: str | None,
            token: str | None,
            status: str | None
    ) -> ProjectDB:
        sql = """
        INSERT INTO api_project
        VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        """
        try:
            row = await self.db.fetch_row(
                sql,
                name,
                description,
                end_event,
                start_event,
                logo_url,
                website_url,
                whitepaper_url,
                token,
                status
            )
            return ProjectDB.model_validate(dict(row))
        except:  # TODO handle specific error
            throw_bad_request("Project with this name already exists!")

    async def update(self, project_id: str, project: UpdateProject) -> ProjectDB:
        sql = (
            "UPDATE api_project "
            "SET name = $2,"
            "description = $3,"
            "end_event = $4,"
            "start_event = $5,"
            "logo_url = $6,"
            "website_url = $7,"
            "whitepaper_url = $8 "
            "WHERE id = $1 "
            "RETURNING *"
        )
        updated_project = await self.db.fetch_row(
            sql,
            project_id,
            project.name,
            project.description,
            project.end_event,
            project.start_event,
            project.logo_url,
            project.website_url,
            project.whitepaper_url,
        )
        return ProjectDB.model_validate(dict(updated_project))

    async def delete(
            self,
            project_id: int
    ) -> ProjectDB:
        sql = "DELETE FROM api_project WHERE id = $1 RETURNING *"
        row = await self.db.fetch_row(sql, project_id)
        if not row:
            throw_not_found("There is'nt project with this id")
        return ProjectDB.model_validate(dict(row))
