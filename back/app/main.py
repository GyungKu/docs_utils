from fastapi import FastAPI
from app.api import document
from contextlib import asynccontextmanager
from app.db.base import Base
from app.db.session import engine
from app.core.config import settings
from app.core.exceptions.exception_handler import register_exception_handlers
from app.task.docs_cleaner import start_scheduler
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
  if settings.ENV == "dev":
    async with engine.begin() as conn:
      await conn.run_sync(Base.metadata.create_all)
  start_scheduler()
  yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(document.router)
register_exception_handlers(app)