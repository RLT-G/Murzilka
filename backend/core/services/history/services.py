from core.models.history.responses import HistoryResponse
from core.models.profile.responses import ProfileResponse
from core.registry import history_storage


async def get_profile_history_service(profile: ProfileResponse) -> list[HistoryResponse] | None:
    return await history_storage.get_all_by_id(profile.id)
