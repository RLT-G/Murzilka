from datetime import datetime

from core.common import BaseSchema


class CreateProjectRequest(BaseSchema):
    name: str
    description: str | None = None
    end_event: datetime
    start_event: datetime
    logo_url: str | None = None
    website_url: str | None = None
    whitepaper_url: str | None = None
    token: str | None = None
    status: str | None = None


class UpdateProjectRequest(BaseSchema):
    name: str
    description: str | None = None
    end_event: datetime
    start_event: datetime
    logo_url: str | None = None
    website_url: str | None = None
    whitepaper_url: str | None = None
    token: str | None = None
    status: str | None = None
