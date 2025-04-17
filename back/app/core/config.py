from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  ENV: str
  DB_HOST: str
  DB_PORT: int
  DB_USER: str
  DB_PASSWORD: str
  DB_NAME: str
  FILE_STORAGE_PATH: str
  LIBREOFFICE_PATH: str
  ALLOWED_ORIGINS: list[str]
  DATABASE_URL: str
  POPPLER_PATH: str

  class Config:
    env_file = ".env"

settings = Settings()