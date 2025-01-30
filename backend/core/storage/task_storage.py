from typing import Optional

from core.models.task.db import TaskDB, TaskProgressDB, CompleteTaskDB
from core.models.task.domains import UpdateTask
from core.models.task.enums import CheckType
from core.storage.db.postgres import DB
from core.utils import throw_not_found, throw_bad_request


class TaskStorage:
    def __init__(self, db: DB) -> None:
        self.db = db

    async def get_all(self) -> list[TaskDB]:
        sql = "SELECT * FROM api_task"
        rows = await self.db.fetch(sql)
        if not rows:
            throw_not_found("No task!")

        tasks: list[TaskDB] = []
        for row in rows:
            tasks.append(TaskDB.model_validate(dict(row)))
        return tasks

    async def get_by_id(
            self, tasks_id: int
    ) -> Optional[TaskDB]:
        sql = "SELECT * FROM api_task WHERE (id = $1)"
        row = await self.db.fetch_row(sql, tasks_id)
        if not row:
            throw_not_found("No task with this id!")
        return TaskDB.model_validate(dict(row))

    async def create(
            self,
            title: str,
            description: str | None,
            reward: int | None,
            check_type: CheckType | None
    ) -> TaskDB:
        sql = """
        INSERT INTO api_task
        VALUES (DEFAULT, $1, $2, $3, $4::check_type)
        RETURNING *
        """
        try:
            row = await self.db.fetch_row(
                sql,
                title,
                description,
                reward,
                check_type
            )
            return TaskDB.model_validate(dict(row))
        except:  # TODO handle specific error
            throw_bad_request("Task with this name already exists!")

    async def update(self, task_id: str, task: UpdateTask) -> TaskDB:
        sql = (
            "UPDATE api_task "
            "SET title = $2,"
            "description = $3,"
            "reward = $4,"
            "check_type = $5::check_type "
            "WHERE id = $1 "
            "RETURNING *"
        )
        updated_task = await self.db.fetch_row(
            sql,
            task_id,
            task.title,
            task.description,
            task.reward,
            task.check_type
        )
        return TaskDB.model_validate(dict(updated_task))

    async def delete(
            self,
            task_id: int
    ) -> TaskDB:
        sql = "DELETE FROM api_task WHERE id = $1 RETURNING *"
        row = await self.db.fetch_row(sql, task_id)
        if not row:
            throw_not_found("There is'nt task with this id")
        return TaskDB.model_validate(dict(row))

    async def add_progress(
            self,
            profile_id: int,
            task_id: int,
            task_link: str,
            is_done: bool = True
    ) -> TaskProgressDB:
        sql = """
                INSERT INTO api_task_progress
                VALUES (DEFAULT, $1, $2, $3,DEFAULT, $4)
                RETURNING *
                """
        row = await self.db.fetch_row(sql, profile_id, task_id, is_done, task_link)
        if not row:
            throw_not_found("No progress recorded!")
        return TaskProgressDB.model_validate(dict(row))

    async def get_progress(
            self,
            profile_id: int
    ) -> CompleteTaskDB:
        sql = "SELECT array_agg(task_id) as task_ids_list FROM api_task_progress WHERE user_id = $1 AND is_done=TRUE"
        row = await self.db.fetch_row(sql, profile_id)
        return CompleteTaskDB(completed_task_id_list=row['task_ids_list'])
