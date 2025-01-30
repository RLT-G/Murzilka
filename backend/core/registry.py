import datetime
import os

from core.storage.db import postgres
from core.storage.history_storage import HistoryStorage
from core.storage.profile_storage import ProfileStorage
from core.storage.project_storage import ProjectStorage
from core.storage.task_storage import TaskStorage

server_started = datetime.datetime.now()
VERSION = os.getenv("VERSION", "0")
ENV = os.environ.get("ENV", "LOCAL")
db: postgres.DB = postgres.get_database()
profile_storage = ProfileStorage(db)
project_storage = ProjectStorage(db)
task_storage = TaskStorage(db)
history_storage = HistoryStorage(db)
