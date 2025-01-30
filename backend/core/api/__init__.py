from fastapi import APIRouter
from .profile import profile_router
from .auth import auth_router
from .project import project_router
from .tasks import task_router


router = APIRouter(prefix="/api")
router.include_router(auth_router)
router.include_router(profile_router)
router.include_router(project_router)
router.include_router(task_router)
