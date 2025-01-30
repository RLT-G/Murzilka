from datetime import datetime

from ...common import BaseSchema


class ProjectResponse(BaseSchema):
    id: int
    name: str
    description: str | None
    end_event: datetime
    start_event: datetime
    logo_url: str | None
    website_url: str | None
    whitepaper_url: str | None
    token: str | None
    status: str | None = None


class CreateProjectResponse(BaseSchema):
    id: int
    name: str
    description: str | None
    end_event: datetime
    start_event: datetime
    logo_url: str | None
    website_url: str | None
    whitepaper_url: str | None
    token: str | None
    status: str | None = None


class ProjectNamesResponse(BaseSchema):
    id: int
    name: str
