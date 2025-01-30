from pydantic import PostgresDsn
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: PostgresDsn | None = None
    secret_key: str = "mA4yd4nCnVVYN3BAsDSyNvAcavMPq6XJT4GyUwvpETEnmYsXSvwNSp6vU7zFLquf"
    cookie_key: str = "access_token"
    access_token_expire_days: int = 1

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


CONFIG = Settings()
