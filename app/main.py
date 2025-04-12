from fastapi import FastAPI
from app.api import document
from contextlib import asynccontextmanager
from app.db.base import Base
from app.db.session import engine
from app.core.config import settings
from app.core.exceptions.exception_handler import register_exception_handlers
from app.task.docs_cleaner import start_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
  if settings.ENV == "dev":
    async with engine.begin() as conn:
      await conn.run_sync(Base.metadata.create_all)
      start_scheduler()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(document.router)
register_exception_handlers(app)